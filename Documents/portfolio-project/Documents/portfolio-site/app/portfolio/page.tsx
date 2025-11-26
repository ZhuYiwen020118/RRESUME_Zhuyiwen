import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Portfolio() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-12 flex-1">
        <h1 className="text-3xl font-bold mb-6">作品集</h1>
        <p className="text-muted-foreground">此处展示 PPT 下载、视频链接与新闻报道。</p>
      </main>
      <Footer />
    </div>
  );
}
