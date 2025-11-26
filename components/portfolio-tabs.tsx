"use client";

import { PortfolioItem, PortfolioKind } from "@prisma/client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const labels: Record<PortfolioKind, string> = {
  PRESENTATION: "方案与 PPT",
  ARTICLE: "新闻与文章",
  VIDEO: "视频与活动",
  DATA_REPORT: "数据与分析",
  OTHER: "其他"
};

export function PortfolioTabs({ items }: { items: PortfolioItem[] }) {
  const kinds = useMemo(() => {
    const unique = new Set(items.map((item) => item.kind));
    return ["ALL", ...Array.from(unique)] as Array<"ALL" | PortfolioKind>;
  }, [items]);
  const [active, setActive] = useState<"ALL" | PortfolioKind>("ALL");
  const filtered =
    active === "ALL" ? items : items.filter((item) => item.kind === active);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        {kinds.map((kind) => (
          <button
            key={kind}
            onClick={() => setActive(kind)}
            className={cn(
              "rounded-full border px-4 py-1 text-sm transition",
              active === kind
                ? "border-neon-400 bg-neon-400/10 text-neon-300"
                : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
            )}
          >
            {kind === "ALL" ? "全部" : labels[kind]}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => {
          const isVideo = item.kind === "VIDEO" && item.linkUrl;
          return (
            <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              {labels[item.kind]}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
            {item.description && (
              <p className="mt-2 text-sm text-white/70">{item.description}</p>
            )}
            {item.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/60">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {isVideo ? (
              <div className="mt-4 space-y-3">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <video
                    src={item.linkUrl}
                    controls
                    poster={item.coverUrl ?? undefined}
                    className="h-56 w-full rounded-2xl object-cover"
                  />
                </div>
                {item.downloadUrl && (
                  <Button asChild variant="outline" className="text-xs">
                    <a href={item.downloadUrl} target="_blank" rel="noreferrer">
                      下载视频
                    </a>
                  </Button>
                )}
              </div>
            ) : (
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="primary" className="text-xs">
                  <a href={item.linkUrl} target="_blank" rel="noreferrer">
                    查看详情
                  </a>
                </Button>
                {item.downloadUrl && (
                  <Button asChild variant="outline" className="text-xs">
                    <a href={item.downloadUrl} target="_blank" rel="noreferrer">
                      下载
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        );
      })}
        {filtered.length === 0 && (
          <p className="text-white/60">暂无该分类内容，敬请期待。</p>
        )}
      </div>
    </div>
  );
}

