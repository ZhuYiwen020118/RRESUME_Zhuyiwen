"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/experience", label: "经历" },
  { href: "/portfolio", label: "作品集" },
  { href: "/resume", label: "简历" },
  { href: "/contact", label: "联系" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-wide">
          AI Media Hub
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition hover:text-neon-300",
                pathname === item.href ? "text-neon-200" : "text-white/70"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full border border-white/20 text-white md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="打开导航"
        >
          <span className="sr-only">切换导航</span>
          <span className="h-0.5 w-5 bg-white" />
          <span className="h-0.5 w-5 bg-white" />
          <span className="h-0.5 w-5 bg-white" />
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-ink-900 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

