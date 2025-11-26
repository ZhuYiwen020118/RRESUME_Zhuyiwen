import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { HighlightGrid } from "@/components/highlight-grid";
import { ExperienceList } from "@/components/experience-list";
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
  const spotlightMetrics = metrics.slice(0, 2);
  const heroAvatar =
    (hero as { avatar?: string })?.avatar ?? "/media/profile-placeholder.svg";

  return (
    <div className="space-y-20">
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neon-300/80">AI MEDIA · PORTFOLIO</p>
            <h1 className="mt-5 font-display text-4xl leading-tight text-white md:text-6xl">
              {hero.name}
            </h1>
            <p className="mt-3 text-2xl text-neon-200">{hero.slogan}</p>
            <p className="mt-4 text-base text-white/80">{hero.intro}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-white/80">
            {hero.tags?.map((tag: string) => (
              <span key={tag} className="rounded-full border border-white/15 px-4 py-1">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/resume">查看在线简历</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/portfolio">浏览作品集</Link>
            </Button>
          </div>
          {spotlightMetrics.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {spotlightMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">{metric.label}</p>
                  <p className="mt-3 text-3xl font-display text-neon-200">{metric.value}</p>
                  {metric.description && (
                    <p className="mt-1 text-xs text-white/60">{metric.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-0 blur-3xl opacity-60">
            <div className="h-full w-full rounded-[40px] bg-gradient-to-br from-neon-400/30 to-transparent" />
          </div>
          <div className="relative rounded-[36px] border border-white/10 bg-white/5 p-4 shadow-floating">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-ink-900">
              <Image
                src={heroAvatar}
                alt={`${hero.name} portrait`}
                width={560}
                height={700}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Focus Now</p>
              <p>AI 叙事、数据故事化、跨平台运营策略。</p>
              <p className="text-white/60">正在与政务、新消费与教育品牌合作内容增长方案。</p>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Data Snapshot"
        title="关键指标 & 结果导向"
        description="以数据结果和方法论阐述内容价值：实时监测、策略复盘、对齐业务目标。"
      >
        <HighlightGrid metrics={metrics} />
      </Section>

      <Section
        eyebrow="Experience"
        title="多维经历 · AIGC × 新媒体"
        description="精选经历覆盖热点运营、AIGC 生产、数据分析与视频制作。"
      >
        <ExperienceList experiences={experiences} showFeaturedTag />
        <div className="mt-8 text-right">
          <Button asChild variant="ghost" className="text-sm text-white/70 hover:text-neon-300">
            <Link href="/experience">查看全部经历 →</Link>
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Portfolio"
        title="作品集快览"
        description="覆盖方案与 PPT、新闻报道、视频活动、数据报告等多种形式。"
      >
        {portfolio.length === 0 ? (
          <p className="text-sm text-white/60">暂无作品，新的案例即将发布。</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">{item.kind}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                {item.description && (
                  <p className="mt-2 text-sm text-white/70">{item.description}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button asChild variant="outline" className="mt-5 text-xs">
                  <a href={item.linkUrl} target="_blank" rel="noreferrer">
                    查看作品
                  </a>
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 text-right">
          <Button asChild variant="ghost" className="text-sm text-white/70 hover:text-neon-200">
            <Link href="/portfolio">进入作品库 →</Link>
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Media Coverage"
        title="媒体报道 & 新闻链接"
        description="真实案例来源于政务号、央媒客户端、品牌活动等渠道。"
      >
        {news.length === 0 ? (
          <p className="text-sm text-white/60">暂无媒体链接，欢迎稍后查看。</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {news.slice(0, 4).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-white/10 bg-white/5/40 p-6 transition hover:border-neon-300/60"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {link.platform ?? "媒体报道"}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{link.title}</h3>
                {link.summary && (
                  <p className="mt-2 text-sm text-white/70 line-clamp-3">{link.summary}</p>
                )}
              </a>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

