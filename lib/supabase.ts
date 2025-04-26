import { createClient } from '@supabase/supabase-js';

// 使用环境变量获取 Supabase URL 和 Key
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
}

// 创建 Supabase 客户端
export const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);

// 排队系统的表名
export const QUEUE_TABLE = 'rewrite_queue';
export const RESULTS_TABLE = 'rewrite_results'; 