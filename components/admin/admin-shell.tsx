"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "概览" },
  { href: "/admin/experience", label: "经历管理" },
  { href: "/admin/portfolio", label: "作品集" },
  { href: "/admin/links", label: "外部链接" },
  { href: "/admin/content", label: "文案配置" }
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="grid min-h-screen lg:grid-cols-[220px_1fr]">
      <aside className="border-r border-white/10 bg-ink-950/90 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neon-400">
          Admin
        </p>
        <h1 className="mt-2 font-display text-2xl text-white">内容中台</h1>
        <nav className="mt-8 flex flex-col gap-2 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-xl px-3 py-2 transition",
                pathname === item.href
                  ? "bg-neon-400/10 text-neon-300"
                  : "text-white/70 hover:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            className="mt-4 rounded-xl px-3 py-2 text-white/60 hover:bg-white/5"
          >
            ← 返回网站
          </Link>
        </nav>
      </aside>
      <main className="bg-ink-900/60 p-8">{children}</main>
    </div>
  );
}

