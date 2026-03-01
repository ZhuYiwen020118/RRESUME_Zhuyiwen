import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function AdminDashboardPage() {
  const [
    experienceCount,
    portfolioCount,
    linkCount,
    metricsCount,
    lastExperience,
    lastPortfolio,
    lastLink,
    contactMessages
  ] = await Promise.all([
    prisma.experience.count(),
    prisma.portfolioItem.count(),
    prisma.externalLink.count(),
    prisma.highlightMetric.count(),
    prisma.experience.findFirst({ orderBy: { updatedAt: "desc" } }),
    prisma.portfolioItem.findFirst({ orderBy: { updatedAt: "desc" } }),
    prisma.externalLink.findFirst({ orderBy: { updatedAt: "desc" } }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5
    })
  ]);

  const timestamps = [lastExperience?.updatedAt, lastPortfolio?.updatedAt, lastLink?.updatedAt]
    .filter(Boolean)
    .map((date) => date!.getTime());
  const lastUpdated = timestamps.length ? new Date(Math.max(...timestamps)) : null;

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neon-400">Dashboard</p>
          <h1 className="text-3xl font-semibold text-white">内容概览</h1>
          {lastUpdated && (
            <p className="text-sm text-white/60">
              最近更新：{lastUpdated.toLocaleString("zh-CN")}
            </p>
          )}
        </div>
        <LogoutButton />
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm text-white/60">经历条目</p>
          <p className="mt-2 text-4xl font-semibold text-white">{experienceCount}</p>
        </Card>
        <Card>
          <p className="text-sm text-white/60">作品数量</p>
          <p className="mt-2 text-4xl font-semibold text-white">{portfolioCount}</p>
        </Card>
        <Card>
          <p className="text-sm text-white/60">新闻链接</p>
          <p className="mt-2 text-4xl font-semibold text-white">{linkCount}</p>
        </Card>
        <Card>
          <p className="text-sm text-white/60">指标卡片</p>
          <p className="mt-2 text-4xl font-semibold text-white">{metricsCount}</p>
        </Card>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-white">最新留言</h2>
        <div className="mt-4 space-y-3">
          {contactMessages.length === 0 && (
            <p className="text-sm text-white/60">暂无访客留言。</p>
          )}
          {contactMessages.map((message) => (
            <div
              key={message.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/50">
                <span>{message.email}</span>
                <span>{message.createdAt.toLocaleString("zh-CN")}</span>
              </div>
              <p className="mt-2 text-base text-white/80">{message.message}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

