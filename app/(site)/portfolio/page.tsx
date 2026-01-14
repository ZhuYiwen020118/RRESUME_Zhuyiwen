import { getPortfolioItems, getExternalLinks } from "@/lib/data";
import { Section } from "@/components/section";
import { PortfolioTabs } from "@/components/portfolio-tabs";

export default async function PortfolioPage() {
  const [items, links] = await Promise.all([getPortfolioItems(), getExternalLinks()]);

  return (
    <div className="space-y-8">
      <Section eyebrow="作品" title="作品集">
        <PortfolioTabs items={items} />
      </Section>

      {links.length > 0 && (
        <Section eyebrow="报道" title="媒体报道">
          <div className="grid gap-4 md:grid-cols-2">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/10"
              >
                <p className="text-xs text-white/40">{link.platform}</p>
                <h3 className="mt-1 font-medium text-white group-hover:text-neon-300">{link.title}</h3>
                {link.summary && (
                  <p className="mt-2 text-sm text-white/50 line-clamp-2">{link.summary}</p>
                )}
              </a>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

