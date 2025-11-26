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
    <form action={formAction} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      <div>
        <label className="text-sm text-white/70">姓名</label>
        <Input name="name" placeholder="你的名字" />
      </div>
      <div>
        <label className="text-sm text-white/70">邮箱 *</label>
        <Input name="email" type="email" placeholder="name@email.com" required />
      </div>
      <div>
        <label className="text-sm text-white/70">联系方式</label>
        <Input name="phone" placeholder="可选：微信号 / 手机" />
      </div>
      <div>
        <label className="text-sm text-white/70">留言 *</label>
        <Textarea name="message" rows={4} placeholder="想合作的项目 / 想了解的内容..." required />
      </div>
      <Button type="submit" fullWidth>
        发送
      </Button>
      {state.message && (
        <p className={`text-center text-sm ${state.ok ? "text-neon-300" : "text-red-300"}`}>
          {state.message}
        </p>
      )}
      <p className="text-center text-xs text-white/50">
        提交内容会存储在数据库，方便及时跟进。
      </p>
    </form>
  );
}

