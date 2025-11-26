import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Portfolio | AI & Digital Media Expert",
  description: "Portfolio of a Digital Media and AI Expert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={cn(inter.variable, "font-sans antialiased min-h-screen flex flex-col bg-background text-foreground")}>
        {children}
      </body>
    </html>
  );
}
