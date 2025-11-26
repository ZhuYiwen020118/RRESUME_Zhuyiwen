import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Resume() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-12 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">在线简历</h1>
          <Button>下载 PDF</Button>
        </div>
        <div className="border p-8 rounded-lg bg-card">
          <p className="text-muted-foreground">简历内容区域...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
