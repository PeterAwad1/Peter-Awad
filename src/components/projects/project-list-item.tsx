import { getTranslations } from "next-intl/server";

import { TechChip } from "@/components/ui/tech-chip";
import type { PortfolioProject } from "@/types/portfolio";

type ProjectListItemProps = {
  project: PortfolioProject;
};

export async function ProjectListItem({ project }: ProjectListItemProps) {
  const tCommon = await getTranslations("Common");

  return (
    <li className="group grid gap-3 border-t border-line py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent">
            {project.name}
          </h3>
          <span className="text-sm text-muted">{project.subtitle}</span>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-muted">{project.description}</p>
        <ul className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.slice(0, 5).map((tech) => (
            <li key={tech}>
              <TechChip label={tech} />
            </li>
          ))}
        </ul>
      </div>

      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
        >
          {tCommon("live")}
          <span aria-hidden>↗</span>
        </a>
      ) : (
        <span className="text-xs text-muted sm:justify-self-end">—</span>
      )}
    </li>
  );
}
