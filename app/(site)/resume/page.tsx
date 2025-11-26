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
    <div className="bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-white/5 p-8 shadow-floating backdrop-blur">
          <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neon-200/80">Resume</p>
              <h1 className="text-4xl font-semibold text-white">{hero.name}</h1>
              <p className="text-lg text-neon-200">{hero.slogan}</p>
            </div>
            <Button asChild variant="secondary">
              <Link href={resumePdf} target="_blank">
                下载 PDF
              </Link>
            </Button>
          </header>

          <section className="mt-8 space-y-3">
            <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-white/60">
              Profile
            </h2>
            <p className="text-base leading-relaxed text-white/80">{about.bio}</p>
            <div className="flex flex-wrap gap-2 text-sm text-white/70">
              {hero.tags?.map((tag: string) => (
                <span key={tag} className="rounded-full border border-white/15 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-white/60">
              Key Metrics
            </h2>
            <div className="mt-3 grid gap-4 md:grid-cols-3">
              {metrics.slice(0, 6).map((metric) => (
                <div key={metric.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase text-white/60">{metric.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-neon-200">{metric.value}</p>
                  {metric.description && (
                    <p className="text-xs text-white/60">{metric.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-white/60">
              Experience
            </h2>
            {experiences.map((exp) => (
              <article key={exp.id} className="space-y-2 rounded-2xl border border-white/5 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/5 pb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                    <p className="text-sm text-white/70">{exp.organization}</p>
                  </div>
                  <p className="text-sm text-white/60">
                    {formatDate(exp.startDate, "未定")} - {formatDate(exp.endDate, "至今")}
                  </p>
                </div>
                {exp.summary && <p className="text-sm text-white/80">{exp.summary}</p>}
                {exp.achievements.length > 0 && (
                  <ul className="list-disc space-y-1 pl-5 text-sm text-white/70">
                    {exp.achievements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-white/60">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="rounded-2xl border border-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-base font-semibold text-white">{edu.school}</p>
                    <p className="text-sm text-white/70">{edu.degree} · {edu.major}</p>
                  </div>
                  <p className="text-sm text-white/60">
                    {formatDate(edu.startDate, "未定")} - {formatDate(edu.endDate, "至今")}
                  </p>
                </div>
                {edu.highlights.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                    {edu.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-floating backdrop-blur">
          <h2 className="text-lg font-semibold text-white">PDF 预览</h2>
          <p className="mt-1 text-sm text-white/70">可直接浏览原始简历，无需跳转。</p>
          <div className="mt-4 h-[640px] overflow-hidden rounded-2xl border border-white/15 bg-white/5">
            <object
              data={`${resumePdf}#toolbar=0&navpanes=0`}
              type="application/pdf"
              className="h-full w-full"
            >
              <p className="p-4 text-sm text-white/80">
                无法在线预览时，可{" "}
                <a className="underline" href={resumePdf} target="_blank" rel="noreferrer">
                  点击下载
                </a>
                。
              </p>
            </object>
          </div>
          <Button asChild variant="primary" className="mt-4 w-full">
            <Link href={resumePdf} target="_blank">
              全屏查看 / 下载
            </Link>
          </Button>
          <p className="mt-3 text-xs text-white/60">
            将最新 PDF 放到 <code className="font-mono">public/media/</code> 并更新文件名即可替换预览。
          </p>
        </div>
      </div>
    </div>
  );
}

