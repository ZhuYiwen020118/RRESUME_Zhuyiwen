import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-transparent">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left - Name */}
          <div className="text-center md:text-left">
            <p className="text-sm text-white/40">© 2024 个人作品集</p>
          </div>

          {/* Center - Quick Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/#home"
              className="text-sm text-white/40 transition-colors hover:text-white/70"
            >
              首页
            </Link>
            <Link
              href="/#education"
              className="text-sm text-white/40 transition-colors hover:text-white/70"
            >
              教育背景
            </Link>
            <Link
              href="/#experience"
              className="text-sm text-white/40 transition-colors hover:text-white/70"
            >
              工作经历
            </Link>
            <Link
              href="/#portfolio"
              className="text-sm text-white/40 transition-colors hover:text-white/70"
            >
              作品集
            </Link>
            <Link
              href="/#news"
              className="text-sm text-white/40 transition-colors hover:text-white/70"
            >
              媒体报道
            </Link>
            <Link
              href="/#interests"
              className="text-sm text-white/40 transition-colors hover:text-white/70"
            >
              兴趣爱好
            </Link>
            <Link
              href="/#contact"
              className="text-sm text-white/40 transition-colors hover:text-white/70"
            >
              联系我
            </Link>
          </nav>

          {/* Right - Contact */}
          <Link
            href="/#contact"
            className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-neon-300"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            联系
          </Link>
        </div>
      </div>
    </footer>
  );
}
