"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  loginSchema,
  experienceSchema,
  portfolioSchema,
  externalLinkSchema,
  heroSchema,
  aboutSchema,
  educationSchema,
  highlightMetricSchema,
  contactSchema,
  contactLinkSchema
} from "@/lib/validators";
import { verifyPassword, createSession, destroySession } from "@/lib/auth";
import { parseTags } from "@/lib/utils";
import { PortfolioKind } from "@prisma/client";

export async function loginAction(
  prevState: { ok: boolean; message: string },
  formData: FormData
) {
  try {
    const parsed = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password")
    });
    const user = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (!user) {
      return { ok: false, message: "账号不存在" };
    }
    const valid = await verifyPassword(parsed.password, user.passwordHash);
    if (!valid) {
      return { ok: false, message: "密码错误" };
    }
    await createSession(user.id);
    return { ok: true, message: "登录成功" };
  } catch {
    return { ok: false, message: "登录失败，请检查输入" };
  }
}

export async function logoutAction() {
  await destroySession();
}

export async function saveExperience(formData: FormData) {
  const parsed = experienceSchema.parse({
    id: formData.get("id")?.toString(),
    organization: formData.get("organization"),
    role: formData.get("role"),
    city: formData.get("city"),
    domainTags: formData.get("domainTags"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    summary: formData.get("summary"),
    achievements: formData.get("achievements"),
    metrics: formData.get("metrics"),
    featured: formData.get("featured") === "on"
  });

  const data = {
    organization: parsed.organization,
    role: parsed.role,
    city: parsed.city ?? null,
    domainTags: parseTags(parsed.domainTags),
    startDate: parsed.startDate ? new Date(parsed.startDate) : null,
    endDate: parsed.endDate ? new Date(parsed.endDate) : null,
    summary: parsed.summary ?? null,
    achievements: parseTags(parsed.achievements),
    metrics: safeJson(parsed.metrics),
    featured: parsed.featured ?? false
  };

  if (parsed.id) {
    await prisma.experience.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.experience.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/experience");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/experience");
}

export async function savePortfolio(formData: FormData) {
  const parsed = portfolioSchema.parse({
    id: formData.get("id")?.toString(),
    title: formData.get("title"),
    kind: formData.get("kind"),
    description: formData.get("description"),
    coverUrl: formData.get("coverUrl"),
    linkUrl: formData.get("linkUrl"),
    downloadUrl: formData.get("downloadUrl"),
    tags: formData.get("tags"),
    priority: formData.get("priority")
  });

  const data = {
    title: parsed.title,
    kind: parsed.kind as PortfolioKind,
    description: parsed.description ?? null,
    coverUrl: parsed.coverUrl || null,
    linkUrl: parsed.linkUrl,
    downloadUrl: parsed.downloadUrl || null,
    tags: parseTags(parsed.tags),
    priority: parsed.priority ?? 0
  };

  if (parsed.id) {
    await prisma.portfolioItem.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.portfolioItem.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function deletePortfolio(id: string) {
  await prisma.portfolioItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function saveExternalLink(formData: FormData) {
  const parsed = externalLinkSchema.parse({
    id: formData.get("id")?.toString(),
    title: formData.get("title"),
    platform: formData.get("platform"),
    category: formData.get("category"),
    summary: formData.get("summary"),
    url: formData.get("url"),
    publishDate: formData.get("publishDate"),
    tags: formData.get("tags")
  });

  const data = {
    title: parsed.title,
    platform: parsed.platform ?? null,
    category: parsed.category ?? null,
    summary: parsed.summary ?? null,
    url: parsed.url,
    publishDate: parsed.publishDate ? new Date(parsed.publishDate) : null,
    tags: parseTags(parsed.tags)
  };

  if (parsed.id) {
    await prisma.externalLink.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.externalLink.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function deleteExternalLink(id: string) {
  await prisma.externalLink.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function saveHeroContent(formData: FormData) {
  const parsed = heroSchema.parse({
    name: formData.get("name"),
    slogan: formData.get("slogan"),
    intro: formData.get("intro"),
    tags: formData.get("tags"),
    avatar: formData.get("avatar")
  });
  await prisma.contentBlock.upsert({
    where: { key: "hero" },
    update: { payload: { ...parsed, tags: parseTags(parsed.tags) } },
    create: { key: "hero", payload: { ...parsed, tags: parseTags(parsed.tags) } }
  });
  revalidatePath("/");
  revalidatePath("/resume");
}

export async function saveAboutContent(formData: FormData) {
  const parsed = aboutSchema.parse({
    bio: formData.get("bio"),
    highlights: formData.get("highlights")
  });
  await prisma.contentBlock.upsert({
    where: { key: "about" },
    update: { payload: { ...parsed, highlights: parseTags(parsed.highlights) } },
    create: { key: "about", payload: { ...parsed, highlights: parseTags(parsed.highlights) } }
  });
  revalidatePath("/about");
  revalidatePath("/resume");
}

export async function saveEducation(formData: FormData) {
  const parsed = educationSchema.parse({
    id: formData.get("id")?.toString(),
    school: formData.get("school"),
    degree: formData.get("degree"),
    major: formData.get("major"),
    location: formData.get("location"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    highlights: formData.get("highlights"),
    orderIndex: formData.get("orderIndex")
  });

  const data = {
    school: parsed.school,
    degree: parsed.degree,
    major: parsed.major ?? null,
    location: parsed.location ?? null,
    startDate: parsed.startDate ? new Date(parsed.startDate) : null,
    endDate: parsed.endDate ? new Date(parsed.endDate) : null,
    highlights: parseTags(parsed.highlights),
    orderIndex: parsed.orderIndex ?? 0
  };

  if (parsed.id) {
    await prisma.education.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.education.create({ data });
  }
  revalidatePath("/about");
  revalidatePath("/resume");
}

export async function deleteEducation(id: string) {
  await prisma.education.delete({ where: { id } });
  revalidatePath("/about");
  revalidatePath("/resume");
}

export async function saveMetric(formData: FormData) {
  const parsed = highlightMetricSchema.parse({
    id: formData.get("id")?.toString(),
    label: formData.get("label"),
    value: formData.get("value"),
    description: formData.get("description"),
    orderIndex: formData.get("orderIndex")
  });

  const data = {
    label: parsed.label,
    value: parsed.value,
    description: parsed.description ?? null,
    orderIndex: parsed.orderIndex ?? 0
  };

  if (parsed.id) {
    await prisma.highlightMetric.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.highlightMetric.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/resume");
}

export async function deleteMetric(id: string) {
  await prisma.highlightMetric.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/resume");
}

export async function saveContact(formData: FormData) {
  const parsed = contactSchema.parse({
    email: formData.get("email"),
    phone: formData.get("phone"),
    note: formData.get("note")
  });

  await prisma.contentBlock.upsert({
    where: { key: "contact" },
    update: { payload: parsed },
    create: { key: "contact", payload: parsed }
  });
  revalidatePath("/contact");
}

export async function saveContactLink(formData: FormData) {
  const parsed = contactLinkSchema.parse({
    id: formData.get("id")?.toString(),
    platform: formData.get("platform"),
    handle: formData.get("handle"),
    url: formData.get("url"),
    icon: formData.get("icon"),
    priority: formData.get("priority")
  });

  const data = {
    platform: parsed.platform,
    handle: parsed.handle ?? null,
    url: parsed.url,
    icon: parsed.icon ?? null,
    priority: parsed.priority ?? 0
  };

  if (parsed.id) {
    await prisma.contactLink.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.contactLink.create({ data });
  }
  revalidatePath("/contact");
}

export async function deleteContactLink(id: string) {
  await prisma.contactLink.delete({ where: { id } });
  revalidatePath("/contact");
}

function safeJson(payload?: string | null) {
  if (!payload) return null;
  try {
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

