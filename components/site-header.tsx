"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于我" },
  { href: "/experience", label: "工作经历" },
  { href: "/portfolio", label: "作品集" },
  { href: "/resume", label: "简历" },
  { href: "/contact", label: "联系方式" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-ink-950/90 backdrop-blur-xl shadow-lg shadow-ink-950/50"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        {/* Logo - 简洁的名字 */}
        <Link
          href="/"
          className="group font-display text-xl font-bold tracking-tight text-sky-400"
        >
          <span className="transition-colors group-hover:text-sky-300">朱译文</span>
          <span className="ml-2 text-xs font-normal text-white/40">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm transition-all duration-300",
                pathname === item.href
                  ? "text-white font-medium"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-neon-400/80 to-transparent" />
              )}
            </Link>
          ))}
          <ThemeToggle className="ml-2" />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border transition-all duration-300 md:hidden",
            open
              ? "border-neon-400/50 bg-neon-400/10"
              : "border-white/15 hover:border-white/25"
          )}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="切换导航"
        >
          <span
            className={cn(
              "h-0.5 w-4 rounded-full bg-white transition-all duration-300",
              open && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-4 rounded-full bg-white transition-all duration-300",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-4 rounded-full bg-white transition-all duration-300",
              open && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-ink-900/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2.5 text-sm transition-all duration-300",
                pathname === item.href
                  ? "bg-white/5 text-white"
                  : "text-white/60 hover:text-white"
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
