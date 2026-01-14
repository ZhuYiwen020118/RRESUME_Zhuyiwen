import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { HighlightGrid } from "@/components/highlight-grid";
import { ExperienceList } from "@/components/experience-list";
import { Card } from "@/components/ui/card";
import {
  getHeroContent,
  getHighlightMetrics,
  getFeaturedExperiences,
  getPortfolioItems,
  getExternalLinks
} from "@/lib/data";

export default async function HomePage() {
  const [hero, metrics, experiences, portfolio, news] = await Promise.all([
    getHeroContent(),
    getHighlightMetrics(),
    getFeaturedExperiences(),
    getPortfolioItems(),
    getExternalLinks()
  ]);
  const heroAvatar =
    (hero as { avatar?: string })?.avatar ?? "/media/profile-placeholder.svg";
  const safeSlogan =
    hero.slogan === "AI × 数字媒体 × 内容运营"
      ? "内容策略 · 数据驱动 · 增长实战"
      : hero.slogan;
  const featureProject = {
    title: "政务热点全链路运营项目",
    role: "项目负责人 · 策略/数据/交付",
    time: "2024.03 - 2024.08",
    content: "组建 6 人小组，完成选题、脚本、拍摄与剪辑，单期曝光破 2.2 亿；沉淀 SOP 与脚本模板，交付效率提升 40%。",
    link: "/portfolio"
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-[300px] w-[300px] rounded-full bg-neon-400/8 blur-[100px]" />
          <div className="absolute -right-20 bottom-0 h-[200px] w-[200px] rounded-full bg-indigo-500/8 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            {/* 头像 - 移动端在上，桌面端在左 */}
            <div className="relative mx-auto w-[180px] flex-shrink-0 md:mx-0 md:w-[200px]">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-neon-400/15 to-indigo-500/15 blur-xl" />
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={heroAvatar}
                  alt={hero.name}
                  width={200}
                  height={250}
                  className="h-[230px] w-full object-cover md:h-[260px]"
                  priority
                />
              </div>
            </div>

            {/* 内容 */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-2">
                <h1 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {hero.name}
                </h1>
                <p className="text-lg text-neon-300 md:text-xl">{safeSlogan}</p>
                <p className="text-sm leading-relaxed text-white/60 md:text-base">
                  {hero.intro}
                </p>
              </div>

              {/* 标签 */}
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                {hero.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-xs text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 按钮 */}
              <div className="flex flex-wrap justify-center gap-2 pt-1 md:justify-start">
                <Button asChild>
                  <Link href="/resume">查看简历</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/portfolio">作品集</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/contact">联系我</Link>
                </Button>
              </div>

              {/* 关键数据 */}
              {metrics.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6 border-t border-white/[0.06] pt-4 md:justify-start">
                  {metrics.slice(0, 3).map((metric) => (
                    <div key={metric.id} className="text-center md:text-left">
                      <p className="font-display text-xl font-bold text-white">{metric.value}</p>
                      <p className="text-xs text-white/40">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 精选经历 */}
      <Section eyebrow="经历" title="工作经历">
        <ExperienceList experiences={experiences} showFeaturedTag />
        <div className="mt-6 text-right">
          <Button asChild variant="ghost">
            <Link href="/experience">查看全部 →</Link>
          </Button>
        </div>
      </Section>

      {/* 作品集 */}
      <Section eyebrow="作品" title="作品集">
        {portfolio.length === 0 ? (
          <p className="text-sm text-white/50">暂无作品</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col p-5 bg-white/[0.02] border-white/10">
              <span className="mb-3 w-fit rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60">
                项目经历
              </span>
              <h3 className="text-lg font-semibold text-white">{featureProject.title}</h3>
              <p className="mt-1 text-sm text-white/60">{featureProject.role}</p>
              <p className="text-xs text-white/40">{featureProject.time}</p>
              <p className="mt-3 flex-1 text-sm text-white/60 whitespace-pre-line">
                {featureProject.content}
              </p>
              <a
                href={featureProject.link}
                className="mt-4 text-sm text-neon-300 hover:underline"
              >
                查看详情 →
              </a>
            </Card>

            {portfolio.slice(0, 3).map((item) => (
              <Card key={item.id} className="flex flex-col p-5">
                <span className="mb-3 w-fit rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/50">
                  {item.kind}
                </span>
                <h3 className="font-semibold text-white">{item.title}</h3>
                {item.description && (
                  <p className="mt-2 flex-1 text-sm text-white/50 line-clamp-2">{item.description}</p>
                )}
                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 text-sm text-neon-300 hover:underline"
                >
                  查看 →
                </a>
              </Card>
            ))}
          </div>
        )}
        <div className="mt-6 text-right">
          <Button asChild variant="ghost" size="sm">
            <Link href="/portfolio">查看全部 →</Link>
          </Button>
        </div>
      </Section>

      {/* 媒体报道 */}
      {news.length > 0 && (
        <Section eyebrow="报道" title="媒体报道">
          <div className="grid gap-4 md:grid-cols-2">
            {news.slice(0, 4).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
              >
                <p className="text-xs text-white/40">{link.platform}</p>
                <h3 className="mt-1 font-medium text-white group-hover:text-neon-300">{link.title}</h3>
              </a>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-r from-neon-400/5 to-indigo-500/5 p-8 text-center md:p-12">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">感兴趣？</h2>
          <p className="mt-2 text-white/50">欢迎联系我洽谈合作</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild>
              <Link href="/contact">联系我</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/resume">查看简历</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

