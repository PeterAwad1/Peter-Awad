import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/animations/reveal";
import { ProjectListItem } from "@/components/projects/project-list-item";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { getMoreProjects } from "@/lib/portfolio";

export async function MoreWorkSection() {
  const t = await getTranslations("MoreWork");
  const projects = getMoreProjects();

  if (projects.length === 0) return null;

  return (
    <Section id="more-work" ariaLabelledBy="more-work-heading" className="pt-0">
      <SectionHeading
        id="more-work-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <Reveal>
        <ul>
          {projects.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
