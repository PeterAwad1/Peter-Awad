import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/animations/reveal";
import { ProjectPreview } from "@/components/projects/project-preview";
import { TechChip } from "@/components/ui/tech-chip";
import type { PortfolioProject } from "@/types/portfolio";
import { cn } from "@/lib/utils/cn";

type FeaturedProjectProps = {
  project: PortfolioProject;
  index: number;
};

export async function FeaturedProject({ project, index }: FeaturedProjectProps) {
  const t = await getTranslations("Work");
  const tCommon = await getTranslations("Common");
  const reverse = index % 2 === 1;
  const highlights = project.highlights.slice(0, 3);
  const statusLabel =
    project.status === "in-progress"
      ? t("statusInProgress")
      : t("statusProduction");

  return (
    <Reveal
      as="article"
      className="border-t border-line py-14 first:border-t-0 first:pt-0 sm:py-16"
    >
      <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <div
          className={cn(
            "space-y-5 lg:col-span-5 lg:sticky lg:top-28",
            reverse ? "lg:order-2" : "lg:order-1",
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-signal px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-accent uppercase">
              {statusLabel}
            </span>
            <span className="text-xs text-muted">{tCommon("role")}</span>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {project.name}
            </h3>
            <p className="text-sm font-medium text-accent">{project.subtitle}</p>
            <p className="text-base leading-7 text-muted">{project.description}</p>
          </div>

          <div>
            <p className="mb-2 font-mono text-[0.65rem] tracking-[0.12em] text-muted uppercase">
              {t("techLabel")}
            </p>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech}>
                  <TechChip label={tech} />
                </li>
              ))}
            </ul>
          </div>

          {highlights.length > 0 ? (
            <div>
              <p className="mb-2 font-mono text-[0.65rem] tracking-[0.12em] text-muted uppercase">
                {t("highlightsLabel")}
              </p>
              <ul className="space-y-2 text-sm leading-6 text-muted">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {tCommon("live")}
              <span aria-hidden>↗</span>
            </a>
          ) : null}
        </div>

        <div
          className={cn(
            "lg:col-span-7",
            reverse ? "lg:order-1" : "lg:order-2",
          )}
        >
          {project.image ? (
            <ProjectPreview
              src={project.image}
              alt={`${project.name} — ${project.subtitle}`}
              priority={index === 0}
            />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-line bg-signal/60">
              <p className="font-display text-lg text-muted">{project.name}</p>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
