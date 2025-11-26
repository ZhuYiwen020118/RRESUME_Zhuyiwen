"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "@/app/admin/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const initialState = { ok: false, message: "" };

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.ok) {
      router.push("/admin/dashboard");
    }
  }, [state.ok, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
        <p className="text-sm uppercase tracking-[0.3em] text-neon-400">Admin Access</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">内容后台登录</h1>
        <p className="mt-2 text-sm text-white/60">
          仅限管理员使用。账号与密码可在数据库配置。
        </p>
        <form action={formAction} className="mt-8 space-y-4">
          <div>
            <label className="text-sm text-white/70">邮箱</label>
            <Input name="email" type="email" placeholder="you@domain.com" required />
          </div>
          <div>
            <label className="text-sm text-white/70">密码</label>
            <Input name="password" type="password" placeholder="•••••••" required />
          </div>
          <Button type="submit" fullWidth>
            登录
          </Button>
          {state.message && (
            <p className={`text-center text-sm ${state.ok ? "text-neon-300" : "text-red-300"}`}>
              {state.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

