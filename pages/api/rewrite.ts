import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { getServerSession } from "next-auth/next";
import { Session } from 'next-auth';
import authOptions from "./auth/[...nextauth]"; // Use default import
import { queueService, RequestBody, RewriteStyle, RewriteDegree } from '../../lib/queue-service';
import { v4 as uuidv4 } from 'uuid';
import { supabase, QUEUE_TABLE } from '../../lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || undefined, // Use environment variable or OpenAI default
});

function getClientIp(req: NextApiRequest): string | null {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    // x-forwarded-for can be a comma-separated list of IPs
    return forwarded.split(',')[0].trim();
  }
  // Fallback to socket remote address, less reliable behind proxies
  return req.socket?.remoteAddress || null;
}

// --- OpenAI 处理逻辑 ---
async function processRewriteRequest(taskData: RequestBody): Promise<{ rewrittenText: string }> {
  const { text, style, degree } = taskData;
  if (!text || !style || !degree || !process.env.OPENAI_API_KEY) {
      throw new Error('Invalid task data or missing API key for queued task.');
  }
  const degreeInstruction = {
    slight: 'Make minimal changes, focusing on grammar and clarity.',
    moderate: 'Rewrite significantly for improved flow and impact, while preserving the core meaning.',
    significant: 'Reimagine the sentence structure and vocabulary substantially, while retaining the original intent.',
  }[degree];
  const prompt = `Rewrite the following text in a ${style} style. ${degreeInstruction}\n\nOriginal text: "${text}"\n\nRewritten text:`;

  const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-nano',
      messages: [
        {
          role: 'system',
          content: 'You are an expert sentence rewriter. Your task is to rewrite the user-provided text according to their specified style and degree of change.'
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const rewrittenText = completion.choices[0]?.message?.content?.trim();
    if (!rewrittenText) {
      throw new Error('Failed to get rewritten text from OpenAI for queued task');
    }
    return { rewrittenText };
}

// 处理队列中的下一个任务
export async function processNextInQueue() {
  const queueItem = await queueService.getNextQueueItem();
  if (!queueItem) return; // 队列为空

  console.log(`Processing queued task ${queueItem.task_id} for IP ${queueItem.ip_address}`);

  try {
    const resultData = await processRewriteRequest(queueItem.request_body);
    await queueService.saveTaskResult(queueItem.task_id, {
      status: 'completed',
      data: resultData
    });
    console.log(`Task ${queueItem.task_id} completed successfully.`);
  } catch (error: unknown) {
    console.error(`Error processing queued task ${queueItem.task_id}:`, error);
    let errorMessage = 'Failed to process queued request.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    await queueService.saveTaskResult(queueItem.task_id, {
      status: 'error',
      error: errorMessage
    });
  }
}

// 添加记录请求的函数
async function recordSuccessfulRequest(ip: string, userId?: string): Promise<void> {
  try {
    // 创建一个记录，表示这个请求已成功处理（不通过队列）
    const placeholderRequest = {
      task_id: uuidv4(),
      ip_address: ip,
      user_id: userId,
      request_body: { text: '', style: 'professional' as RewriteStyle, degree: 'moderate' as RewriteDegree },
      queued_at: new Date().toISOString(),
      status: 'completed'
    };
    
    await supabase
      .from(QUEUE_TABLE)
      .insert(placeholderRequest);
      
    console.log(`Recorded successful direct request for IP ${ip}`);
  } catch (error) {
    console.error('Failed to record successful request:', error);
    // 不抛出错误，因为这只是记录功能
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 随机触发数据清理
  if (Math.random() < 0.05) { // 5% 的概率运行
    queueService.cleanupOldData().catch(err => {
      console.error('Error during cleanup:', err);
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 检查用户会话
  const session = await getServerSession(req, res, authOptions) as Session | null;
  const userId = session?.user?.email as string | undefined;

  // 获取客户端 IP
  const ip = getClientIp(req);
  if (!ip) {
    console.warn("Could not determine client IP for rate limiting.");
    return res.status(400).json({ error: 'Could not determine client IP.' });
  }

  // 仅对未认证用户应用速率限制
  if (!session) {
    const limit = parseInt(process.env.UNAUTHENTICATED_REWRITE_LIMIT_PER_MINUTE || '5', 10);
    // 使用 Supabase 检查请求计数
    const requestCount = await queueService.getUserRequestCount(ip);
    console.log(`Request count for IP ${ip}: ${requestCount}/${limit}`);
    
    if (requestCount >= limit) {
      // 超出限制 - 将请求加入队列
      console.log(`Rate limit exceeded for IP: ${ip}. Queuing request.`);
      const requestBody: RequestBody = req.body;
      
      // 基本验证
      if (!requestBody.text || !requestBody.style || !requestBody.degree) {
        return res.status(400).json({ error: 'Missing required parameters for queued request.' });
      }
      
      try {
        // 先检查用户是否已经在队列中
        const isAlreadyQueued = await queueService.isUserInQueue(ip);
        if (isAlreadyQueued) {
          console.log(`User ${ip} already has a request in queue`);
          return res.status(429).json({ 
            error: 'You already have a request in the queue. Please wait for it to complete.',
            isQueued: true 
          });
        }
        
        // 不在队列中，添加到队列
        const taskId = await queueService.addToQueue(ip, userId, requestBody);
        console.log(`Added task ${taskId} to queue for IP ${ip}`);
        
        // 确保任务被添加后再返回响应
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // 在返回响应前触发队列处理（让队列处理异步运行）
        setTimeout(() => {
          processNextInQueue().catch(err => {
            console.error('Error processing queue after adding new task:', err);
          });
        }, 100);
        
        return res.status(202).json({ 
          message: 'Request queued due to rate limit. We will process it soon.',
          taskId,
          isQueued: true
        });
      } catch (error) {
        console.error('Error queuing request:', error);
        return res.status(500).json({ error: 'Failed to queue request. Please try again later.' });
      }
    }
  }

  const { text, style, degree }: RequestBody = req.body;

  // --- 直接处理逻辑 ---
  try {
    // 早期检查 API 密钥
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }
    const resultData = await processRewriteRequest({ text, style, degree });

    // 记录成功的请求（用于限流统计）
    if (!session) {
      await recordSuccessfulRequest(ip, userId);
    }

    // 成功 - 处理潜在队列
    processNextInQueue().catch(err => {
      console.error('Error processing next in queue:', err);
    });

    return res.status(200).json(resultData);

  } catch (error: unknown) {
    console.error('OpenAI API error:', error);
    let errorMessage = 'Failed to rewrite text';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else {
      errorMessage = 'An unknown error occurred.';
    }

    // 记录详细错误
    if (typeof error === 'object' && error !== null) {
      if ('response' in error) {
        const responseError = error as { response?: { status?: number; data?: unknown } };
        console.error('Status:', responseError.response?.status);
        console.error('Data:', responseError.response?.data);
      } else {
        console.error('Caught error object:', error);
      }
    } else {
      console.error('Caught error primitive:', error);
    }

    // 失败 - 仍尝试处理潜在队列
    processNextInQueue().catch(err => {
      console.error('Error processing next in queue after failure:', err);
    });

    return res.status(500).json({ error: errorMessage });
  }
} 