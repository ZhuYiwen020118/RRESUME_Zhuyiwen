import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "关于我" },
  { href: "/experience", label: "工作经历" },
  { href: "/portfolio", label: "作品集" },
  { href: "/resume", label: "简历" },
  { href: "/contact", label: "联系方式" }
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-transparent">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left - Name */}
          <div className="text-center md:text-left">
            <Link href="/" className="font-display text-lg font-semibold text-white/90">
              朱译文
            </Link>
            <p className="mt-1 text-sm text-white/40">内容策略 · 增长实战</p>
          </div>

          {/* Center - Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/40 transition-colors hover:text-white/70"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right - Contact */}
          <Link
            href="/contact"
            className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-neon-300"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            联系我
          </Link>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-white/[0.06] pt-6 text-center">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} 朱译文 · Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
