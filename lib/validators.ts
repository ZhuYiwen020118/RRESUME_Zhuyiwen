import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("请输入合法邮箱"),
  password: z.string().min(6, "密码至少 6 位")
});

export const experienceSchema = z.object({
  id: z.string().optional(),
  organization: z.string().min(1),
  role: z.string().min(1),
  city: z.string().optional(),
  domainTags: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  summary: z.string().optional(),
  achievements: z.string().optional(),
  metrics: z.string().optional(),
  featured: z.boolean().optional()
});

export const portfolioSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  kind: z.string().min(1),
  description: z.string().optional(),
  coverUrl: z.string().optional(),
  linkUrl: z.string().min(1),
  downloadUrl: z.string().optional(),
  tags: z.string().optional(),
  priority: z.coerce.number().optional()
});

export const externalLinkSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  platform: z.string().optional(),
  category: z.string().optional(),
  summary: z.string().optional(),
  url: z.string().url(),
  publishDate: z.string().optional(),
  tags: z.string().optional()
});

export const heroSchema = z.object({
  name: z.string().min(1),
  slogan: z.string().min(1),
  intro: z.string().min(1),
  tags: z.string().optional(),
  avatar: z.string().optional()
});

export const aboutSchema = z.object({
  bio: z.string().min(1),
  highlights: z.string().optional()
});

export const educationSchema = z.object({
  id: z.string().optional(),
  school: z.string().min(1),
  degree: z.string().min(1),
  major: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  highlights: z.string().optional(),
  orderIndex: z.coerce.number().optional()
});

export const highlightMetricSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1),
  value: z.string().min(1),
  description: z.string().optional(),
  orderIndex: z.coerce.number().optional()
});

export const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  note: z.string().optional()
});

export const contactFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5, "请至少填写 5 个字符的留言")
});

export const contactLinkSchema = z.object({
  id: z.string().optional(),
  platform: z.string().min(1),
  handle: z.string().optional(),
  url: z.string().url(),
  icon: z.string().optional(),
  priority: z.coerce.number().optional()
});

