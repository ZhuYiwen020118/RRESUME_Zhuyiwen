import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Experience() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-12 flex-1">
        <h1 className="text-3xl font-bold mb-6">实习与项目经历</h1>
        <p className="text-muted-foreground">此处展示时间线或卡片形式的经历列表。</p>
      </main>
      <Footer />
    </div>
  );
}
