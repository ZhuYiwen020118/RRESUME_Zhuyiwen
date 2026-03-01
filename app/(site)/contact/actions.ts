"use server";

import { contactFormSchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";

export async function submitContact(prevState: { ok: boolean; message: string }, formData: FormData) {
  try {
    const parsed = contactFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message")
    });

    await prisma.contactMessage.create({
      data: {
        email: parsed.email,
        name: parsed.name ?? "",
        phone: parsed.phone ?? "",
        message: parsed.message
      }
    });

    return { ok: true, message: "消息已收到，我会尽快回复你！" };
  } catch {
    return { ok: false, message: "提交失败，请检查信息或稍后再试。" };
  }
}

