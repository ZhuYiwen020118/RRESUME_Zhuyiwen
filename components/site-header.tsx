"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

type NavItem = {
  id: string;
  label: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "首页" },
  { id: "education", label: "教育背景" },
  { id: "experience", label: "工作经历" },
  { id: "portfolio", label: "作品集" },
  { id: "interests", label: "兴趣爱好" },
  { id: "contact", label: "联系我" }
];

interface SiteHeaderProps {
  slogan?: string;
}

export function SiteHeader({ slogan = "内容策略 · 数据驱动 · 增长实战" }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-ink-950/90 backdrop-blur-xl shadow-lg shadow-ink-950/50"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        {/* Logo - Slogan */}
        <button
          onClick={() => scrollToSection("home")}
          className="group font-display text-xl font-bold tracking-tight text-sky-400"
        >
          <span className="transition-colors group-hover:text-sky-300">{slogan}</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "relative text-sm transition-all duration-300",
                activeSection === item.id
                  ? "text-white font-medium"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-neon-400/80 to-transparent" />
              )}
            </button>
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
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "rounded-lg px-3 py-2.5 text-sm transition-all duration-300",
                activeSection === item.id
                  ? "bg-white/5 text-white"
                  : "text-white/60 hover:text-white"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
