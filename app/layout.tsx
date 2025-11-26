import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI Media Resume | 人工智能与数字媒体作品集",
    template: "%s | AI Media Resume"
  },
  description:
    "展示人工智能与数字媒体交叉背景的内容运营者，包括教育、经历、作品与可量化成果，支持后台实时更新。",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "AI Media Resume",
    description:
      "AI × 数字媒体 × 内容运营 —— 可后台维护的个人简历与作品集站点。",
    url: "https://example.com",
    siteName: "AI Media Resume",
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
    <html lang="zh-CN">
      <body className="bg-ink-950 text-white">{children}</body>
    </html>
  );
}

