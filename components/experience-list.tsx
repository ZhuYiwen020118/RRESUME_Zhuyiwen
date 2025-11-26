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
    return <p className="text-sm text-white/60">暂无经历，请在后台添加。</p>;
  }

  return (
    <div className="space-y-10">
      {experiences.map((item) => (
        <article
          key={item.id}
          className="relative rounded-3xl border border-white/10 bg-white/5/40 p-6 shadow-floating backdrop-blur"
        >
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-semibold text-white">{item.role}</h3>
            <p className="text-white/60">{item.organization}</p>
            {showFeaturedTag && item.featured && (
              <Badge className="border-neon-300/40 text-neon-200">精选</Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-white/50">
            {formatDate(item.startDate, "时间未定")} — {formatDate(item.endDate, "进行中")} ·{" "}
            {item.city ?? "远程"}
          </p>
          {item.summary && (
            <p className="mt-4 text-base text-white/80">{item.summary}</p>
          )}
          {item.domainTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.domainTags.map((tag) => (
                <Badge key={tag} className="border-white/20 text-white/70">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {item.achievements.length > 0 && (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
              {item.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

