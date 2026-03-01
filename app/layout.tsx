import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "个人简历与作品集 | Portfolio",
    template: "%s | Portfolio"
  },
  description:
    "个人简历与作品集，包含经历、作品、数据成果与联系方式，支持后台更新。",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "个人简历与作品集",
    description:
      "展示可验证的经历、作品、成果与联系方式的个人站点。",
    url: "https://example.com",
    siteName: "Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630
      }
    ],
    locale: "zh_CN",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="scroll-smooth" data-theme="dark">
      <body className="bg-animated bg-grid noise-overlay relative">{children}</body>
    </html>
  );
}

