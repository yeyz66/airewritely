import { supabase, QUEUE_TABLE, RESULTS_TABLE } from './supabase';
import { v4 as uuidv4 } from 'uuid';

// 类型定义
export type RewriteStyle = 'formal' | 'casual' | 'professional' | 'creative' | 'concise';
export type RewriteDegree = 'slight' | 'moderate' | 'significant';

export interface RequestBody {
  text: string;
  style: RewriteStyle;
  degree: RewriteDegree;
}

export interface QueuedRequest {
  task_id: string;
  user_id?: string; // 用户ID，已登录用户
  ip_address: string; // 用户IP
  request_body: RequestBody;
  queued_at: string; // ISO 日期字符串
  status: 'queued' | 'processing' | 'completed' | 'error';
}

export interface TaskResult {
  task_id: string;
  status: 'completed' | 'error';
  data?: { rewrittenText: string };
  error?: string;
  completed_at: string; // ISO 日期字符串
}

// 常量
export const MAX_QUEUE_TIME_MS = 5 * 60 * 1000; // 5 分钟最大排队时间
export const MAX_RESULT_AGE_MS = 10 * 60 * 1000; // 保留结果 10 分钟
export const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 分钟限流窗口

// 队列服务
export class QueueService {
  // 将请求添加到队列
  async addToQueue(ip: string, userId: string | undefined, requestBody: RequestBody): Promise<string> {
    const taskId = uuidv4();
    
    const queueItem: QueuedRequest = {
      task_id: taskId,
      user_id: userId,
      ip_address: ip,
      request_body: requestBody,
      queued_at: new Date().toISOString(),
      status: 'queued'
    };
    
    const { error } = await supabase
      .from(QUEUE_TABLE)
      .insert(queueItem);
      
    if (error) {
      console.error('Error adding request to queue:', error);
      throw new Error('Failed to add request to queue');
    }
    
    return taskId;
  }
  
  // 获取下一个待处理的队列项
  async getNextQueueItem(): Promise<QueuedRequest | null> {
    // 使用事务来确保并发安全
    const { data, error } = await supabase
      .from(QUEUE_TABLE)
      .select('*')
      .eq('status', 'queued')
      .order('queued_at', { ascending: true })
      .limit(1);
      
    if (error || !data || data.length === 0) {
      return null;
    }
    
    const queueItem = data[0] as QueuedRequest;
    
    // 更新状态为处理中
    await supabase
      .from(QUEUE_TABLE)
      .update({ status: 'processing' })
      .eq('task_id', queueItem.task_id);
      
    return queueItem;
  }
  
  // 保存任务结果
  async saveTaskResult(taskId: string, result: { status: 'completed' | 'error', data?: { rewrittenText: string }, error?: string }): Promise<void> {
    const taskResult: TaskResult = {
      task_id: taskId,
      status: result.status,
      data: result.data,
      error: result.error,
      completed_at: new Date().toISOString()
    };
    
    // 更新队列项状态
    await supabase
      .from(QUEUE_TABLE)
      .update({ status: result.status })
      .eq('task_id', taskId);
      
    // 保存结果
    const { error } = await supabase
      .from(RESULTS_TABLE)
      .insert(taskResult);
      
    if (error) {
      console.error('Error saving task result:', error);
      throw new Error('Failed to save task result');
    }
  }
  
  // 获取任务结果
  async getTaskResult(taskId: string): Promise<TaskResult | null> {
    const { data, error } = await supabase
      .from(RESULTS_TABLE)
      .select('*')
      .eq('task_id', taskId)
      .single();
      
    if (error || !data) {
      return null;
    }
    
    return data as TaskResult;
  }
  
  // 检查任务状态
  async checkTaskStatus(taskId: string): Promise<{ status: 'queued' | 'processing' | 'completed' | 'error' | 'not_found', data?: any, error?: string }> {
    // 先检查结果表
    const resultData = await this.getTaskResult(taskId);
    if (resultData) {
      return {
        status: resultData.status,
        data: resultData.data,
        error: resultData.error
      };
    }
    
    // 再检查队列表
    const { data, error } = await supabase
      .from(QUEUE_TABLE)
      .select('*')
      .eq('task_id', taskId)
      .single();
      
    if (error || !data) {
      return { status: 'not_found' };
    }
    
    return { status: data.status as 'queued' | 'processing' };
  }
  
  // 清理过期的队列项和结果
  async cleanupOldData(): Promise<void> {
    const now = new Date();
    const queueCutoff = new Date(now.getTime() - MAX_QUEUE_TIME_MS).toISOString();
    const resultsCutoff = new Date(now.getTime() - MAX_RESULT_AGE_MS).toISOString();
    
    // 清理过期的队列项
    const { error: queueError } = await supabase
      .from(QUEUE_TABLE)
      .delete()
      .lt('queued_at', queueCutoff)
      .eq('status', 'queued');
    
    if (queueError) {
      console.error('Error cleaning up old queue items:', queueError);
    }
    
    // 清理过期的结果
    const { error: resultsError } = await supabase
      .from(RESULTS_TABLE)
      .delete()
      .lt('completed_at', resultsCutoff);
    
    if (resultsError) {
      console.error('Error cleaning up old results:', resultsError);
    }
  }
  
  // 检查用户是否在排队
  async isUserInQueue(ip: string, userId?: string): Promise<boolean> {
    let query = supabase
      .from(QUEUE_TABLE)
      .select('*')
      .eq('status', 'queued')
      .eq('ip_address', ip);
      
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error checking if user is in queue:', error);
      return false;
    }
    
    return data && data.length > 0;
  }
  
  // 获取用户的请求计数（用于限流）
  async getUserRequestCount(ip: string, userId?: string): Promise<number> {
    const timeWindow = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    
    // 计算队列中的请求（所有状态）- 包括等待中、处理中、已完成等
    let query = supabase
      .from(QUEUE_TABLE)
      .select('*', { count: 'exact' })
      .gt('queued_at', timeWindow)
      .eq('ip_address', ip);
      
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    const { count, error } = await query;
    
    if (error) {
      console.error('Error getting request count:', error);
      return 0;
    }
    
    console.log(`User ${ip} has made ${count || 0} requests in the last minute`);
    return count || 0;
  }
}

// 导出单例实例
export const queueService = new QueueService(); 