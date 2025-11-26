import { getPortfolioItems, getExternalLinks } from "@/lib/data";
import { Section } from "@/components/section";
import { PortfolioTabs } from "@/components/portfolio-tabs";
import { Card } from "@/components/ui/card";

export default async function PortfolioPage() {
  const [items, links] = await Promise.all([getPortfolioItems(), getExternalLinks()]);

  return (
    <div className="space-y-20">
      <Section
        eyebrow="Portfolio"
        title="多形态作品库"
        description="PPT 方案、新闻稿、视频活动、数据报告等素材在同一视觉体系下展示，随时扩展。"
      >
        <PortfolioTabs items={items} />
      </Section>

      <Section eyebrow="Articles" title="外部报道 / 链接">
        {links.length === 0 ? (
          <p className="text-sm text-white/60">暂无新闻链接，稍后上线更多案例。</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {links.map((link) => (
              <Card key={link.id} className="bg-white/5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {link.platform ?? "媒介"}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{link.title}</h3>
                {link.summary && (
                  <p className="mt-2 text-sm text-white/70">{link.summary}</p>
                )}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm text-neon-200"
                >
                  打开链接 →
                </a>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

