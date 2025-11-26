import "dotenv/config";
import { PrismaClient, PortfolioKind } from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: await hashPassword(adminPassword)
    }
  });

  await prisma.contentBlock.upsert({
    where: { key: "hero" },
    update: { payload: defaultHero },
    create: { key: "hero", payload: defaultHero }
  });

  await prisma.contentBlock.upsert({
    where: { key: "about" },
    update: { payload: defaultAbout },
    create: { key: "about", payload: defaultAbout }
  });

  await prisma.contentBlock.upsert({
    where: { key: "contact" },
    update: { payload: defaultContact },
    create: { key: "contact", payload: defaultContact }
  });

  await prisma.education.deleteMany();
  await prisma.education.createMany({ data: defaultEducation });

  await prisma.experience.deleteMany();
  await prisma.experience.createMany({ data: defaultExperience });

  await prisma.highlightMetric.deleteMany();
  await prisma.highlightMetric.createMany({ data: defaultMetrics });

  await prisma.portfolioItem.deleteMany();
  await prisma.portfolioItem.createMany({ data: defaultPortfolio });

  await prisma.externalLink.deleteMany();
  await prisma.externalLink.createMany({ data: defaultLinks });

  await prisma.contactLink.deleteMany();
  await prisma.contactLink.createMany({ data: defaultContactLinks });

  console.log("Seed data ready.");
}

const defaultHero = {
  name: "张三",
  slogan: "AI × 数字媒体 × 内容运营",
  intro: "聚焦 AIGC 与数据驱动的内容策略，擅长打造可复用的热点生产机制。",
  tags: ["热点运营", "数据分析", "AIGC 实践", "政务新媒体"]
};

const defaultAbout = {
  bio: "人工智能与数字媒体硕士，拥有新闻采编、视频制作与新媒体矩阵运营经验，熟悉 Python/SQL 数据分析与多模态 AIGC 工作流。",
  highlights: [
    "搭建热点追踪与数据看板，支撑选题决策",
    "构建 AIGC 模板库，将稿件交付周期缩短 40%",
    "主导百万级曝光的政务短视频与互动策划"
  ]
};

const defaultContact = {
  email: "hello@ai-media.me",
  phone: "微信：aimedia-career",
  note: "欢迎投递 / 面试沟通，如需 PPT 源文件或更多数据，可邮件联系。"
};

const defaultEducation = [
  {
    school: "XX 大学",
    degree: "硕士",
    major: "人工智能与数字媒体",
    location: "上海",
    startDate: new Date("2022-09-01"),
    endDate: new Date("2024-06-30"),
    highlights: ["奖学金", "数据新闻实验室核心成员"],
    orderIndex: 1
  },
  {
    school: "YY 大学",
    degree: "本科",
    major: "新闻传播",
    location: "北京",
    startDate: new Date("2018-09-01"),
    endDate: new Date("2022-06-30"),
    highlights: ["优秀毕业生", "校广播站台长"],
    orderIndex: 2
  }
];

const defaultExperience = [
  {
    organization: "字节跳动 · 今日头条",
    role: "热点运营实习生",
    city: "北京",
    domainTags: ["热点运营", "内容策划", "数据分析"],
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-12-01"),
    summary: "负责热点追踪脚本、AIGC 模板与专题策划，服务于 5 条重点垂类帐号。",
    achievements: ["打造热点提报机制，单条阅读 2200 万", "联动产品团队迭代标签体系"],
    metrics: { 阅读量: "2.2 亿+", 粉丝增长: "58%" },
    featured: true
  },
  {
    organization: "新华社新媒体中心",
    role: "视频内容编辑",
    city: "上海",
    domainTags: ["新闻采编", "视频制作"],
    startDate: new Date("2022-03-01"),
    endDate: new Date("2022-12-01"),
    summary: "承担重大活动直播与多终端内容分发，构建可复用的脚本模版。",
    achievements: ["推出冲突性脚本模板，完播率 +35%", "配合 AI 抽帧自动剪辑流程"],
    metrics: { 完播率: "+35%", 互动率: "+42%" },
    featured: true
  },
  {
    organization: "世界人工智能大会组委会",
    role: "传播策划",
    city: "上海",
    domainTags: ["活动运营", "数据可视化"],
    startDate: new Date("2021-05-01"),
    endDate: new Date("2021-08-01"),
    summary: "负责大会主论坛内容整理与多平台稿件协同，搭建数据看板。",
    achievements: ["建立跨平台数据监测仪表板", "AIGC 摘要工具缩短稿件制作 40%"],
    metrics: { 传播曝光: "5,600 万", 稿件提速: "-40%"},
    featured: false
  }
];

const defaultMetrics = [
  { label: "累计曝光", value: "3.2 亿+", description: "多平台热点专题总曝光", orderIndex: 1 },
  { label: "粉丝增长", value: "+78%", description: "政务号季度粉丝增幅", orderIndex: 2 },
  { label: "转化率提升", value: "+46%", description: "活动报名落地页 CTR", orderIndex: 3 },
  { label: "AIGC 节省", value: "-40%", description: "稿件交付周期缩短", orderIndex: 4 }
];

const defaultPortfolio = [
  {
    title: "2024 城市气象热点运营方案",
    kind: PortfolioKind.PRESENTATION,
    description: "结合气象热点与 GPT 生成内容的多平台运营策略。",
    coverUrl: null,
    linkUrl: "/media/resume-sample.pdf",
    downloadUrl: "/media/resume-sample.pdf",
    tags: ["运营方案", "AIGC"],
    priority: 10
  },
  {
    title: "政务短视频数据看板",
    kind: PortfolioKind.DATA_REPORT,
    description: "实时监控阅读、互动、粉丝增量的 BI 仪表盘。",
    coverUrl: null,
    linkUrl: "https://example.com/dashboard",
    downloadUrl: null,
    tags: ["数据分析", "Dashboard"],
    priority: 8
  },
  {
    title: "AI 城市观察新闻专题",
    kind: PortfolioKind.ARTICLE,
    description: "跨平台发布的系列报道，聚焦城市科技治理。",
    coverUrl: null,
    linkUrl: "https://example.com/article",
    downloadUrl: null,
    tags: ["新闻稿", "AI 城市"],
    priority: 6
  },
  {
    title: "热点洞察微纪录片",
    kind: PortfolioKind.VIDEO,
    description: "把 PPT 方案转为故事化视频脚本，展示可视化洞察。",
    coverUrl: null,
    linkUrl: "/media/showcase-one.mp4",
    downloadUrl: "/media/showcase-one.mp4",
    tags: ["视频制作", "转换效率"],
    priority: 5
  },
  {
    title: "校园赛事直播回顾",
    kind: PortfolioKind.VIDEO,
    description: "联合运营、拍摄、后期，输出 1 分钟快剪与竖屏版本。",
    coverUrl: null,
    linkUrl: "/media/showcase-two.mp4",
    downloadUrl: "/media/showcase-two.mp4",
    tags: ["活动", "短视频"],
    priority: 4
  }
];

const defaultLinks = [
  {
    title: "新华社：AI 城市治理的内容创新",
    platform: "新华社客户端",
    category: "政务新闻",
    summary: "报道使用 AIGC 辅助的栏目策划思路。",
    url: "https://news.example.com/ai",
    publishDate: new Date("2023-10-01"),
    tags: ["政务", "AI"]
  },
  {
    title: "世界人工智能大会活动回顾",
    platform: "人民日报客户端",
    category: "活动",
    summary: "展示活动传播数据和亮点。",
    url: "https://news.example.com/waic",
    publishDate: new Date("2023-07-20"),
    tags: ["活动"]
  }
];

const defaultContactLinks = [
  {
    platform: "LinkedIn",
    handle: "@ai-media",
    url: "https://linkedin.com/in/ai-media",
    priority: 2
  },
  {
    platform: "小红书",
    handle: "AI 媒体人",
    url: "https://www.xiaohongshu.com/user/aimedia",
    priority: 1
  }
];

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

