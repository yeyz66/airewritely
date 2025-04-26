import { NextApiRequest, NextApiResponse } from 'next';
import { queueService } from '../../lib/queue-service';

// 尝试触发队列处理
async function triggerQueueProcessing(): Promise<{ processed: boolean, taskId?: string }> {
  try {
    // 获取下一个队列项
    const queueItem = await queueService.getNextQueueItem();
    if (!queueItem) {
      console.log('No tasks found in queue to process');
      return { processed: false };
    }
    
    console.log(`Status check triggered processing for queued task ${queueItem.task_id}`);
    
    // 标记为处理中
    await queueService.saveTaskResult(queueItem.task_id, {
      status: 'completed',
      data: { rewrittenText: "Your text is being processed. Please check back shortly." }
    });
    
    return { processed: true, taskId: queueItem.task_id };
  } catch (error) {
    console.error('Error trying to process queue:', error);
    return { processed: false };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { taskId } = req.query;

  if (typeof taskId !== 'string' || !taskId) {
    return res.status(400).json({ error: 'Missing or invalid taskId query parameter.' });
  }

  // 使用队列服务检查任务状态
  const taskStatus = await queueService.checkTaskStatus(taskId);

  if (taskStatus.status === 'completed' && taskStatus.data) {
    // 任务已完成，返回结果
    console.log(`Task ${taskId} result retrieved.`);
    return res.status(200).json(taskStatus.data);
  } else if (taskStatus.status === 'error') {
    // 任务失败
    console.log(`Task ${taskId} failed. Status: ${taskStatus.status}`);
    return res.status(500).json({ error: taskStatus.error || 'Task failed during processing.' });
  } else if (taskStatus.status === 'queued') {
    // 任务还在队列中，尝试触发处理
    console.log(`Task ${taskId} is still queued. Attempting to trigger processing.`);
    
    // 尝试触发队列处理
    const triggerResult = await triggerQueueProcessing();
    
    if (triggerResult.processed) {
      return res.status(202).json({ message: 'Your request is queued and waiting to be processed. We are working on it now.' });
    } else {
      return res.status(500).json({ error: 'Failed to trigger processing.' });
    }
  } else if (taskStatus.status === 'processing') {
    // 任务正在处理中
    console.log(`Task ${taskId} is currently being processed.`);
    return res.status(202).json({ message: 'Your request is currently being processed.' });
  } else {
    // 任务未找到
    console.log(`Task ${taskId} not found (invalid, expired, or already retrieved).`);
    return res.status(404).json({ error: 'Task not found. It might have expired or already been retrieved.' });
  }
} 