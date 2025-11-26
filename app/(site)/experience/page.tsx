import { getExperiences } from "@/lib/data";
import { Section } from "@/components/section";
import { ExperienceFilter } from "@/components/experience-filter";

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <Section
      eyebrow="Experience"
      title="项目 / 实习时间线"
      description="支持按标签快速筛选，聚焦阅读量、曝光量、粉丝增长等可量化指标。"
      className="space-y-10"
    >
      <ExperienceFilter experiences={experiences} />
    </Section>
  );
}

