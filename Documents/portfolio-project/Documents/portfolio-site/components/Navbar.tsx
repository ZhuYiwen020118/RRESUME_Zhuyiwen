import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tighter">
          PORTFOLIO<span className="text-primary">.</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link href="/about" className="hover:text-primary transition-colors">关于我</Link>
          <Link href="/experience" className="hover:text-primary transition-colors">经历</Link>
          <Link href="/portfolio" className="hover:text-primary transition-colors">作品集</Link>
          <Link href="/resume" className="hover:text-primary transition-colors">简历</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">联系</Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" asChild>
             <Link href="/resume">下载简历</Link>
          </Button>
          {/* Mobile menu toggle would go here */}
        </div>
      </div>
    </nav>
  );
}
