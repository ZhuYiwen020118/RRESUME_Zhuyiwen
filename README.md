# 个人简历与作品集站（Next.js 15 + Prisma + Tailwind）

面向内容/新媒体/增长方向的全栈个人站点：前台（首页/关于/经历/作品集/联系/在线简历）+ 后台可维护内容 + Postgres 数据存储，可一键部署到 Vercel。

## 功能亮点
- **数据库驱动的前台**：所有文案、经历、作品、指标、媒体链接均来自数据库，改完后台即时生效。
- **后台内容中台**：`/admin` 登录后维护 Slogan、教育、经历、作品、媒体链接、指标、联系方式等。
- **身份认证**：邮箱+密码，Session 写入数据库，安全持久。
- **文件与媒体**：支持本地 PDF/MP4/图片（放 `public/media`），也可填外链。
- **设计系统**：Tailwind + 自定义组件（按钮/徽章/卡片/Section），深浅色切换，毛玻璃卡片。
- **静态预览**：`static-preview/index.html` 可直接双击查看视觉稿，无需启动服务。

## 技术栈
- Next.js 15（App Router, Server Components）
- TypeScript / Tailwind CSS
- Prisma / Postgres（默认兼容 Vercel Postgres）
- Server Actions + Zod 表单校验

## 目录结构
```
app/
  (site)/        前台页面（首页/关于/经历/作品/联系/简历）
  admin/         后台登录与 CRUD
  globals.css    全局样式
  layout.tsx     根布局
components/      UI 组件（按钮/卡片/Section 等）
lib/             Prisma 客户端、认证、数据读取、校验工具
prisma/          schema.prisma + seed.ts
public/          静态资源（media/ 下放 PDF/MP4/图片）
static-preview/  静态视觉稿，双击即可预览
tailwind.config.ts  Tailwind 配置与设计令牌
```

## 环境要求
- Node.js ≥ 18.18（推荐 20+）
- npm / pnpm / bun 任一包管理器
- Postgres 数据库（本地或 Vercel Postgres）

## 本地快速开始（小白指引）
1) 安装依赖  
```bash
npm install
# 或 pnpm install
```
2) 配置环境变量  
复制 `.env.example` 为 `.env.local`，至少填：  
- `DATABASE_URL`  Postgres 连接串  
- `ADMIN_EMAIL`   后台管理员邮箱  
- `ADMIN_PASSWORD` 后台管理员密码  

3) 初始化数据库 + 示例数据  
```bash
npx prisma db push
npm run seed
```

4) 启动开发  
```bash
npm run dev
```
默认端口 3000（若被占用会自动切换，如 3001）。前台 `http://localhost:3000`，后台登录 `http://localhost:3000/admin/login`。

## 部署到 Vercel（最简单）
1) Vercel 新建项目，导入本仓库。  
2) 在 **Settings → Environment Variables** 添加：`DATABASE_URL`、`ADMIN_EMAIL`、`ADMIN_PASSWORD`。  
3) 绑定/创建 Postgres（Vercel 提供连接串）。  
4) 部署完成后，在项目控制台运行：  
```bash
npx prisma migrate deploy
npm run seed
```
5) 后续改内容只需登录后台，无需再次部署。若改了数据模型，请重新执行上面两条命令。

## 内容修改指南（不改代码的方式）
后台地址：`/admin/login`  
登录后：
- **Hero/文案**：在「内容块」里修改 Slogan、简介、标签等。
- **教育/经历**：对应列表页新增/编辑；支持“精选”标记、时间、城市、成就列表。
- **作品集**：可填标题、描述、类型（视频/链接/PDF）、标签、外链或站内 `/media/...`。
- **媒体报道**：填写标题、平台、摘要、链接。
- **指标（Highlight）**：填写 label/value/description，首页会展示。
- **联系方式**：邮箱、电话/微信、社交链接。

媒体文件放 `public/media/` 后，在后台填写相对路径即可（如 `/media/resume.pdf` 或 `/media/showreel.mp4`）。不想进后台也可直接替换同名文件。

## 代码层常用修改
- **UI 主题/色板**：`tailwind.config.ts` + `app/globals.css`。浅色/深色变量在 `:root` 中定义。
- **按钮/卡片/徽章**：`components/ui/button.tsx`、`components/ui/card.tsx`、`components/ui/badge.tsx`。
- **首页结构**：`app/(site)/page.tsx`。
- **关于/经历/作品/联系/简历**：对应 `app/(site)/*/page.tsx`。
- **默认数据**：`lib/data.ts` 提供前台兜底文案；`prisma/seed.ts` 写入示例数据。
- **OG 图 / Logo**：`public/og-image.svg`、`public/media/*`。

## 常见问题
1) **端口被占用导致白屏**：终端会提示自动改到 3001，按提示访问新端口。  
2) **Tailwind 类不存在导致编译失败**：检查 `globals.css` 中的 `@apply` 是否用了自定义未声明的类。  
3) **后台密码忘记**：改 `.env.local` 的 `ADMIN_EMAIL/ADMIN_PASSWORD`，然后 `npm run seed` 重置。  
4) **数据库迁移**：改了 `schema.prisma` 后，开发环境跑 `npx prisma migrate dev`；生产跑 `npx prisma migrate deploy`。  
5) **静态预览打不开**：直接双击 `static-preview/index.html`，不依赖 Node 环境。  

## 设计说明
- 深浅色双主题，卡片统一毛玻璃（浅色下提高不透明度和阴影，深色下降低背景干扰）。
- 标题/正文字体：`Syne`（Display）+ `Outfit/Noto Sans SC`（正文）。
- 重点色：蓝（accent-1）+ 粉（accent-2），前景文字在两种主题下均保持可读对比度。

## 开发 & 提交建议
1) `npm run dev` 本地预览 → 确认无报错。  
2) `npm run lint` 保持代码规范。  
3) `git add . && git commit -m "feat: xxx"` → `git push`，Vercel 自动部署。  

## 致谢
感谢使用本模板，祝你的内容与作品脱颖而出！有新的需求（多语言、可视化报表、更多作品类型）可在此基础上继续迭代。 🎯
