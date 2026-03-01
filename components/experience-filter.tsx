"use client";

import { Experience } from "@prisma/client";
import { useMemo, useState } from "react";
import { ExperienceList } from "@/components/experience-list";
import { cn } from "@/lib/utils";

export function ExperienceFilter({ experiences }: { experiences: Experience[] }) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    experiences.forEach((item) => item.domainTags.forEach((tag) => set.add(tag)));
    return ["全部", ...Array.from(set)];
  }, [experiences]);
  const [active, setActive] = useState("全部");

  const filtered =
    active === "全部"
      ? experiences
      : experiences.filter((item) => item.domainTags.includes(active));

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={cn(
              "rounded-full border px-4 py-1 text-sm transition",
              active === tag
                ? "border-neon-400 bg-neon-400/10 text-neon-300"
                : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
      <ExperienceList experiences={filtered} />
    </div>
  );
}

