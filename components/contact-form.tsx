"use client";

import { useFormState } from "react-dom";
import { submitContact } from "@/app/(site)/contact/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const initialState = { ok: false, message: "" };

export function ContactForm() {
  const [state, formAction] = useFormState(submitContact, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <h3 className="mb-4 text-sm font-medium text-white/60">发送消息</h3>
      <div>
        <label className="text-xs text-white/40">姓名</label>
        <Input name="name" placeholder="你的名字" className="mt-1" />
      </div>
      <div>
        <label className="text-xs text-white/40">邮箱 *</label>
        <Input name="email" type="email" placeholder="name@email.com" required className="mt-1" />
      </div>
      <div>
        <label className="text-xs text-white/40">留言 *</label>
        <Textarea name="message" rows={3} placeholder="想了解的内容..." required className="mt-1" />
      </div>
      <Button type="submit" fullWidth>
        发送
      </Button>
      {state.message && (
        <p className={`text-center text-sm ${state.ok ? "text-neon-300" : "text-red-300"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}

