import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container py-24 md:py-32 space-y-8">
          <div className="flex flex-col items-start gap-4 max-w-3xl">
             <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">
               AI × Digital Media × <span className="text-primary">Content Ops</span>
             </h1>
             <p className="text-xl text-muted-foreground leading-relaxed">
               我是 <strong>[Your Name]</strong>，一名专注于人工智能与数字媒体的内容运营专家。
               <br />
               擅长通过数据驱动洞察，利用 AIGC 提升内容效率，打造高转化率的新媒体内容。
             </p>
             <div className="flex gap-4 pt-4">
               <Button size="lg" asChild>
                 <Link href="/portfolio">查看作品集</Link>
               </Button>
               <Button size="lg" variant="outline" asChild>
                 <Link href="/resume">查看简历</Link>
               </Button>
             </div>
          </div>
        </section>
        
        {/* Featured Stats Example */}
        <section className="container py-12 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="space-y-2">
               <h3 className="text-3xl font-bold">100k+</h3>
               <p className="text-muted-foreground">Total Views</p>
             </div>
             <div className="space-y-2">
               <h3 className="text-3xl font-bold">50+</h3>
               <p className="text-muted-foreground">Projects</p>
             </div>
             <div className="space-y-2">
               <h3 className="text-3xl font-bold">30%</h3>
               <p className="text-muted-foreground">Conversion Uplift</p>
             </div>
             <div className="space-y-2">
               <h3 className="text-3xl font-bold">5yr</h3>
               <p className="text-muted-foreground">Experience</p>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
