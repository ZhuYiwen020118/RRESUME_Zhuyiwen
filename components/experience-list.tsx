import { Experience } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ExperienceList({
  experiences,
  showFeaturedTag = false
}: {
  experiences: Experience[];
  showFeaturedTag?: boolean;
}) {
  if (experiences.length === 0) {
    return <p className="text-sm text-white/40">暂无经历</p>;
  }

  const getInitials = (text: string) => {
    if (!text) return "·";
    return text.slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-4">
      {experiences.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
        >
          {/* 头部 */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white/80">
                {getInitials(item.organization ?? item.role)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{item.role}</h3>
                  {showFeaturedTag && item.featured && (
                    <Badge className="border-accent-gold/40 bg-accent-gold/10 text-accent-gold">
                      精选
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-neon-300">{item.organization}</p>
              </div>
            </div>

            <p className="text-right text-xs text-white/40">
              {formatDate(item.startDate, "未定")} - {formatDate(item.endDate, "至今")}
              {item.city && ` · ${item.city}`}
            </p>
          </div>

          {/* 内容 */}
          {item.summary && (
            <p className="mt-3 whitespace-pre-line text-sm text-white/60">{item.summary}</p>
          )}

          {/* 标签 */}
          {item.domainTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.domainTags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 成就 */}
          {item.achievements.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-white/50">
              {item.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-neon-400/60" />
                  {achievement}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
