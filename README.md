# 句子重写应用

一个使用 OpenAI API 重写文本的简单应用。

## 特性

- 文本重写与不同的风格选项
- 带有队列系统的速率限制，防止滥用
- 使用 Supabase 持久化存储排队信息，防止用户更改 IP 绕过限制
- NextAuth 身份验证支持

## 设置

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件并填写以下内容：

```
# OpenAI API 配置
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-nano  # 或其他可用的 OpenAI 模型

# NextAuth 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth (可选)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Supabase 配置
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# 未认证用户每分钟请求限制
UNAUTHENTICATED_REWRITE_LIMIT_PER_MINUTE=5
```

### 3. 设置 Supabase

1. 创建 Supabase 账户并创建新项目：https://supabase.com/
2. 在 Supabase 项目中创建以下表：

#### 重写队列表 (rewrite_queue)

| 列名 | 类型 | 说明 |
|------|------|------|
| task_id | uuid | 主键 |
| user_id | text | 用户 ID（已登录用户） |
| ip_address | text | 用户 IP 地址 |
| request_body | jsonb | 请求内容 |
| queued_at | timestamptz | 排队时间 |
| status | text | 状态（queued, processing, completed, error） |

#### 重写结果表 (rewrite_results)

| 列名 | 类型 | 说明 |
|------|------|------|
| task_id | uuid | 主键 |
| status | text | 状态（completed, error） |
| data | jsonb | 结果数据 |
| error | text | 错误消息 |
| completed_at | timestamptz | 完成时间 |

3. 从 Supabase 项目设置获取 URL 和匿名密钥，填入环境变量。

### 4. 启动开发服务器

```bash
npm run dev
```

## 工作原理

### 排队系统

1. 未认证用户有请求速率限制。达到限制后，请求会进入队列。
2. 排队信息存储在 Supabase 数据库中，可防止用户通过更改 IP 地址绕过限制。
3. 系统跟踪用户 IP 和用户 ID（如果已登录），确保用户只能排队一次。
4. 后台处理队列中的请求，完成后保存结果。
5. 定期清理过期的队列项和结果。

## API 端点

- `POST /api/rewrite`: 重写文本，超出限制时将请求加入队列
- `GET /api/rewrite-status?taskId=xxx`: 检查排队任务的状态

## 部署

准备部署到生产环境：

1. 构建应用：
   ```bash
   npm run build
   ```

2. 确保所有环境变量在部署平台上正确设置。

## 许可证

MIT

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
