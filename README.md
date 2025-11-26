# AI Media Resume · Next.js 15 全栈站点

面向「人工智能 × 数字媒体 × 新媒体运营」岗位的个人简历 + 作品集网站，内置可登录后台、Prisma 数据模型、Tailwind 设计系统以及可选静态预览。

## 功能概览

- **App Router + Server Components**：所有前台页面（首页 / 关于 / 经历 / 作品集 / 联系 / 在线简历）均由数据库驱动，默认中文内容字段并保留英文拓展位。
- **后台内容中台**：`/admin` 登录后可维护 Slogan、教育、经历、作品集、新闻链接、指标、联系方式等，所有字段均存入 Postgres。
- **Prisma + Vercel Postgres**：统一数据模型，附带 `seed` 脚本快速初始化示例内容与管理员账号。
- **身份认证**：邮箱 + 密码登录，使用安全 Session Cookie 与数据库 Session 表维护状态。
- **表单与 Server Actions**：后台 CRUD、联系表单均通过 Server Actions 执行并自动 `revalidatePath`，保证前台实时更新。
- **设计体系**：Tailwind + 自定义组件（按钮、标签、卡片等），营造深色媒体科技感；附带 `static-preview/index.html` 可双击预览视觉方向。

## 目录结构

```
app/
  (site)/           # 前台所有页面 + 布局（首页/关于/经历/作品/联系/简历/隐私等）
  admin/            # 后台登录与各 CRUD 页面
components/         # UI 组件、后台布局、富文本等
lib/                # Prisma 客户端、认证、数据获取、校验工具
prisma/             # Prisma schema + 种子脚本
public/             # 静态资源（logo、OG 图、media 目录下的 PDF/视频等）
static-preview/     # 可双击打开的静态视觉稿
tailwind.config.ts  # 设计令牌配置
```

## 环境依赖

- Node.js ≥ 18.18（建议 20.x）
- npm / pnpm / bun 任一包管理器
- Postgres 数据库（可直接使用 Vercel Postgres）

## 快速开始

1. **安装依赖**

   ```bash
   npm install
   # 或 pnpm install
   ```

2. **配置环境变量**

   - 复制 `.env.example` 为 `.env.local`
   - 设置 `DATABASE_URL`（Postgres 连接串）、`ADMIN_EMAIL`、`ADMIN_PASSWORD`

3. **初始化数据库 + 示例数据**

   ```bash
   npx prisma db push
   npm run seed
   ```

4. **启动开发服务器**

   ```bash
   npm run dev
   ```

   访问 `http://localhost:3000` 查看前台，`http://localhost:3000/admin/login` 登录后台。

## 媒体文件管理

- 所有原始素材（PDF、MP4、图片等）建议放入 `public/media/` 目录。示例项目附带：
  - `resume-sample.pdf`：提供给 `/resume` 页面嵌入的在线预览，可直接替换成你的最新简历。
  - `showcase-one.mp4` / `showcase-two.mp4`：作品集页的视频卡片直接站内播放，可覆盖为自己的 MP4。
- 后台「作品集」表单支持填写相对路径（如 `/media/video.mp4`），便于引用上述文件，也可以混合使用外链。
- 若要展示 PPT，建议转换为 PDF 或视频后放置在 `public/media/`，再在后台更新链接，前台即可同步展示。

## Static Preview

无需启动框架即可快速展示首页视觉：在 macOS / Windows 双击 `static-preview/index.html`，或浏览器打开 `static-preview/index.html` 路径即可。该文件只包含静态排版示意，不含动态数据或后台能力。

## 后台使用流程

1. 通过 `/admin/login` 使用 `.env` 中的管理员邮箱 + 密码登录。
2. 进入 Dashboard 查看概览与最新留言，可在侧边栏进入经历 / 作品集 / 链接 / 文案配置等页面。
3. 每个模块均支持新增 + 编辑 + 删除，字段均带占位提示；保存后即刻在前台生效。
4. 联系页面的访客留言存入数据库，可在 Dashboard 查看最近 5 条。

## 部署到 Vercel

1. 在 Vercel 新建项目，导入此仓库。
2. 在 **Settings → Environment Variables** 中配置：
   - `DATABASE_URL`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
3. 在 Vercel Dashboard 中创建或绑定 Postgres（Vercel 会提供连接串）。
4. 部署后执行：

   ```bash
   npx prisma migrate deploy
   npm run seed
   ```

5. 后续内容更新均通过后台完成，无需二次部署；若调整数据结构，请重新运行 `prisma migrate`.

## 设计与可扩展性

- 色板：深海蓝背景 + 霓虹蓝强调 + 银灰辅助，更贴近互联网大厂的沉稳简洁风。
- 字体：`Space Grotesk`（标题）+ `Inter`（正文），可在 Tailwind 中自定义。
- 多语言：所有内容字段均可扩展 `_en` 等字段；后台可继续添加对应输入框。
- 安全性：密码采用 `bcrypt` 哈希，Session 存入数据库；如需多管理员，可在用户表新增记录。

欢迎根据岗位需求继续扩展，如添加 NextAuth、文件上传、更多统计图表等。祝投递顺利！ 🎯

