import { getTranslations } from "next-intl/server";

import { FeaturedProject } from "@/components/projects/featured-project";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { getFeaturedProjects } from "@/lib/portfolio";

export async function SelectedWorkSection() {
  const t = await getTranslations("Work");
  const projects = getFeaturedProjects();

  return (
    <Section id="work" ariaLabelledBy="work-heading">
      <SectionHeading
        id="work-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <div>
        {projects.map((project, index) => (
          <FeaturedProject key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
