import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} AI Media Resume · All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-neon-200">
            隐私
          </Link>
          <Link href="/contact" className="hover:text-neon-200">
            联系我
          </Link>
        </div>
      </div>
    </footer>
  );
}

