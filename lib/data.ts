import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getHeroContent = cache(async () => {
  const block = await prisma.contentBlock.findUnique({ where: { key: "hero" } });
  return block?.payload ?? {
    name: "张三",
    slogan: "AI × 数字媒体 × 内容运营",
    tags: ["热点运营", "数据驱动", "AIGC 实践"],
    intro: "拥有人工智能与数字媒体背景，擅长将内容策略与数据增长结合。",
    avatar: "/media/profile-placeholder.svg"
  };
});

export const getAboutContent = cache(async () => {
  const block = await prisma.contentBlock.findUnique({ where: { key: "about" } });
  return block?.payload ?? {
    bio: "聚焦 AI 与数字媒体的复合型内容运营人，具备新闻采编与视频制作经验。",
    highlights: [
      "熟练运用 Python / SQL / Tableau 等数据分析工具",
      "精通热点捕捉与多平台内容分发策略",
      "AIGC 赋能选题策划与视觉生成"
    ]
  };
});

export const getContactContent = cache(async () => {
  const block = await prisma.contentBlock.findUnique({ where: { key: "contact" } });
  const contactLinks = await prisma.contactLink.findMany({
    orderBy: { priority: "desc" }
  });
  return {
    ...(block?.payload ?? { email: "hello@example.com", phone: "", note: "" }),
    links: contactLinks
  };
});

export const getEducation = cache(async () => {
  return prisma.education.findMany({
    orderBy: { orderIndex: "asc" }
  });
});

export const getExperiences = cache(async () => {
  return prisma.experience.findMany({
    orderBy: [{ featured: "desc" }, { startDate: "desc" }]
  });
});

export const getFeaturedExperiences = cache(async () => {
  return prisma.experience.findMany({
    where: { featured: true },
    orderBy: { startDate: "desc" },
    take: 3
  });
});

export const getPortfolioItems = cache(async () => {
  return prisma.portfolioItem.findMany({
    orderBy: { priority: "desc" }
  });
});

export const getExternalLinks = cache(async () => {
  return prisma.externalLink.findMany({
    orderBy: { publishDate: "desc" }
  });
});

export const getHighlightMetrics = cache(async () => {
  return prisma.highlightMetric.findMany({
    orderBy: { orderIndex: "asc" }
  });
});

