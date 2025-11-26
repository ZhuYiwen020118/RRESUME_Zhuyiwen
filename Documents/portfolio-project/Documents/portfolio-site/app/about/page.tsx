import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-12 flex-1">
        <h1 className="text-3xl font-bold mb-6">关于我</h1>
        <p className="text-muted-foreground">此处展示详细的个人介绍、教育背景与技能栈。</p>
      </main>
      <Footer />
    </div>
  );
}
