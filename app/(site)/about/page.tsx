import { Section } from "@/components/section";
import { getAboutContent, getEducation, getHighlightMetrics } from "@/lib/data";
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

  const getInitials = (text: string) => {
    if (!text) return "·";
    return text.slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-8">
      {/* 个人简介 */}
      <Section eyebrow="关于" title="个人简介">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <p className="text-white/70">{about.bio}</p>
          {about.highlights && about.highlights.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-sm text-white/50">
              {about.highlights.map((item: string) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-neon-400/60" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      {/* 教育经历 */}
      <Section eyebrow="教育" title="教育背景">
        {education.length === 0 ? (
          <p className="text-sm text-white/40">暂无</p>
        ) : (
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white/80">
                      {getInitials(edu.school)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{edu.school}</p>
                      <p className="text-sm text-white/60">
                        {edu.degree} · {edu.major}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-white/40">
                    {formatDate(edu.startDate, "未定")} - {formatDate(edu.endDate, "至今")}
                  </p>
                </div>
                {edu.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-white/50">
                    {edu.highlights.map((h) => (
                      <li key={h}>· {h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* 技能 */}
      <Section eyebrow="技能" title="技能栈">
        <div className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="mb-3 text-xs font-medium text-white/40">{group.title}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/60">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 关键成果 */}
      {metrics.length > 0 && (
        <Section eyebrow="成果" title="关键数据">
          <div className="grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
                <p className="font-display text-3xl font-bold text-neon-300">{metric.value}</p>
                <p className="mt-1 text-xs text-white/40">{metric.label}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}



