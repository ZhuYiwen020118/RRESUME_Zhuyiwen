import { Section } from "@/components/section";
import { getAboutContent, getEducation, getHighlightMetrics } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

const skillGroups = [
  {
    title: "数据与编程",
    items: ["Python", "SQL", "Tableau", "Metabase", "Power BI"]
  },
  {
    title: "AIGC & 自动化",
    items: ["ChatGPT", "Midjourney", "Runway", "Prompt 编排", "工作流自动化"]
  },
  {
    title: "音视频制作",
    items: ["Premiere", "Final Cut", "After Effects", "CapCut", "Audition"]
  },
  {
    title: "内容排版",
    items: ["Notion", "Figma", "Canva", "Office 套件", "Trello"]
  }
];

export default async function AboutPage() {
  const [about, education, metrics] = await Promise.all([
    getAboutContent(),
    getEducation(),
    getHighlightMetrics()
  ]);

  return (
    <div className="space-y-20">
      <Section
        eyebrow="About"
        title="人工智能 × 数字媒体的复合背景"
        description="以多平台内容运营经验结合数据能力，为品牌与机构提供可验证的增长成果。"
      >
        <Card className="bg-white/5">
          <p className="text-lg text-white/80">{about.bio}</p>
          {about.highlights && (
            <ul className="mt-6 space-y-2 text-sm text-white/70">
              {about.highlights.map((item: string) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          )}
        </Card>
      </Section>

      <Section eyebrow="Education" title="教育经历">
        {education.length === 0 ? (
          <p className="text-sm text-white/60">教育经历尚未发布，敬请期待最新更新。</p>
        ) : (
          <div className="space-y-6">
            {education.map((edu) => (
              <Card key={edu.id}>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-white">{edu.school}</h3>
                  <Badge className="border-neon-400/40 text-neon-300">{edu.degree}</Badge>
                </div>
                <p className="mt-1 text-sm text-white/60">
                  {edu.major} · {edu.location ?? "远程"} ·{" "}
                  {formatDate(edu.startDate, "未知")} - {formatDate(edu.endDate, "至今")}
                </p>
                {edu.highlights.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/70">
                    {edu.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        )}
      </Section>

      <Section eyebrow="Skillset" title="能力与工具矩阵">
        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <Card key={group.title} className="bg-white/5">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">{group.title}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} className="border-white/15 text-white/70">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Impact" title="数据化成果">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.id} className="bg-gradient-to-br from-ink-800 to-ink-900">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                {metric.label}
              </p>
              <p className="mt-4 font-display text-4xl text-neon-300">{metric.value}</p>
              {metric.description && (
                <p className="mt-3 text-sm text-white/70">{metric.description}</p>
              )}
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

