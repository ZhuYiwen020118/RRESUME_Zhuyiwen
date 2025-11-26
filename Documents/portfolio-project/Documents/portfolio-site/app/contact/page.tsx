import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-12 flex-1">
        <h1 className="text-3xl font-bold mb-6">联系我</h1>
        <p className="text-muted-foreground">邮箱与社交媒体链接。</p>
      </main>
      <Footer />
    </div>
  );
}
