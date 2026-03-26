# ToolHub

Free online tools for developers and everyone.

## Deploy to Cloudflare Pages

### Option 1: Using Cloudflare Dashboard (推荐)

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
3. 连接你的 GitHub/GitLab 仓库
4. 配置构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
5. 点击 **Save and Deploy**

### Option 2: Using Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署
npx wrangler pages deploy out --project-name=toolhub
```

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 支持的语言

- English (en)
- 简体中文 (zh)
- 日本語 (ja)
- Português (pt)
- Español (es)
- Русский (ru)
- العربية (ar)
