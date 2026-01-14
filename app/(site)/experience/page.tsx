import { getExperiences } from "@/lib/data";
import { Section } from "@/components/section";
import { ExperienceFilter } from "@/components/experience-filter";

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <Section eyebrow="经历" title="工作经历">
      <ExperienceFilter experiences={experiences} />
    </Section>
  );
}

