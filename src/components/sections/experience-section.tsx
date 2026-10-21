import { getLocale, getTranslations } from "next-intl/server";

import { Reveal } from "@/components/animations/reveal";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { formatDateRange, portfolio } from "@/lib/portfolio";

export async function ExperienceSection() {
  const t = await getTranslations("Experience");
  const tCommon = await getTranslations("Common");
  const locale = await getLocale();

  return (
    <Section id="experience" ariaLabelledBy="experience-heading">
      <SectionHeading
        id="experience-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <ol className="space-y-0">
        {portfolio.experience.map((job) => (
          <Reveal key={job.id} as="li" className="border-t border-line py-8 first:border-t-0 first:pt-0">
            <div className="grid gap-4 md:grid-cols-[12rem_1fr] md:gap-10">
              <p className="font-mono text-xs tracking-wide text-muted uppercase">
                {formatDateRange(
                  job.startDate,
                  job.endDate,
                  locale,
                  tCommon("present"),
                )}
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {job.company}
                    <span className="mx-2 text-line">·</span>
                    {job.employmentType}
                    <span className="mx-2 text-line">·</span>
                    {job.location}
                  </p>
                </div>
                <ul className="space-y-2 text-sm leading-6 text-muted">
                  {job.highlights.slice(0, 3).map((item) => (
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
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
