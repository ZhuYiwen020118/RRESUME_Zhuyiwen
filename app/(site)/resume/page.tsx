import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getHeroContent,
  getAboutContent,
  getEducation,
  getExperiences,
  getHighlightMetrics
} from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function ResumePage() {
  const [hero, about, education, experiences, metrics] = await Promise.all([
    getHeroContent(),
    getAboutContent(),
    getEducation(),
    getExperiences(),
    getHighlightMetrics()
  ]);
  const resumePdf = "/media/resume-sample.pdf";

  return (
    <div className="py-10 text-white">
      <div className="mx-auto grid max-w-5xl gap-6 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <header className="flex flex-col gap-3 border-b border-white/[0.06] pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{hero.name}</h1>
              <p className="text-neon-300">{hero.slogan}</p>
            </div>
            <Button asChild variant="outline">
              <Link href={resumePdf} target="_blank">
                下载 PDF
              </Link>
            </Button>
          </header>

          <section className="mt-6 space-y-2">
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">简介</h2>
            <p className="text-sm text-white/70">{about.bio}</p>
            <div className="flex flex-wrap gap-1.5">
              {hero.tags?.map((tag: string) => (
                <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {metrics.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">关键数据</h2>
              <div className="mt-2 grid gap-3 md:grid-cols-3">
                {metrics.slice(0, 6).map((metric) => (
                  <div key={metric.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    <p className="text-xs text-white/40">{metric.label}</p>
                    <p className="mt-1 text-xl font-bold text-neon-300">{metric.value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-6 space-y-3">
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">工作经历</h2>
            {experiences.map((exp) => (
              <article key={exp.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-white">{exp.role}</h3>
                    <p className="text-sm text-neon-300">{exp.organization}</p>
                  </div>
                  <p className="text-xs text-white/40">
                    {formatDate(exp.startDate, "未定")} - {formatDate(exp.endDate, "至今")}
                  </p>
                </div>
                {exp.summary && <p className="mt-2 text-sm text-white/60">{exp.summary}</p>}
                {exp.achievements.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-white/50">
                    {exp.achievements.map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-neon-400/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>

          <section className="mt-6 space-y-3">
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">教育背景</h2>
            {education.map((edu) => (
              <div key={edu.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-white">{edu.school}</p>
                    <p className="text-sm text-white/60">{edu.degree} · {edu.major}</p>
                  </div>
                  <p className="text-xs text-white/40">
                    {formatDate(edu.startDate, "未定")} - {formatDate(edu.endDate, "至今")}
                  </p>
                </div>
                {edu.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-white/50">
                    {edu.highlights.map((highlight) => (
                      <li key={highlight}>· {highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h2 className="text-sm font-medium text-white/60">PDF 预览</h2>
          <div className="mt-3 h-[600px] overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <object
              data={`${resumePdf}#toolbar=0&navpanes=0`}
              type="application/pdf"
              className="h-full w-full"
            >
              <p className="p-4 text-sm text-white/60">
                <a className="underline" href={resumePdf} target="_blank" rel="noreferrer">
                  点击下载 PDF
                </a>
              </p>
            </object>
          </div>
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link href={resumePdf} target="_blank">
              下载 PDF
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

