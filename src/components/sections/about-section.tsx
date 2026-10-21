import { getLocale, getTranslations } from "next-intl/server";

import { Reveal } from "@/components/animations/reveal";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { CvLink } from "@/components/shared/cv-link";
import { formatMonthYear, portfolio } from "@/lib/portfolio";

export async function AboutSection() {
  const t = await getTranslations("About");
  const tCommon = await getTranslations("Common");
  const locale = await getLocale();
  const degree = portfolio.education[0];
  const military = portfolio.militaryService;

  const facts = [
    {
      label: t("basedIn"),
      value: portfolio.profile.location,
    },
    {
      label: t("languages"),
      value: portfolio.profile.languages.join(" · "),
    },
    degree
      ? {
          label: t("educationTitle"),
          value: `${degree.degree} — ${degree.institution}`,
          meta: degree.endDate
            ? formatMonthYear(degree.endDate, locale, tCommon("present"))
            : undefined,
        }
      : null,
    {
      label: t("militaryTitle"),
      value: t("militaryBody", {
        role: military.role,
        organization: military.organization,
      }),
      meta: `${formatMonthYear(military.startDate, locale, tCommon("present"))} – ${formatMonthYear(military.endDate, locale, tCommon("present"))}`,
    },
  ].filter(Boolean) as Array<{
    label: string;
    value: string;
    meta?: string;
  }>;

  return (
    <Section id="about" ariaLabelledBy="about-heading">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            id="about-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
          />
          <Reveal>
            <p className="max-w-md text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {t("summary")}
            </p>
            <CvLink className="mt-8 inline-flex h-11 items-center justify-center rounded-lg border border-line bg-surface px-5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent">
              {t("cv")}
            </CvLink>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <dl className="divide-y divide-line border-y border-line">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
              >
                <dt className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                  {fact.label}
                </dt>
                <dd>
                  <p className="text-sm font-medium text-ink sm:text-base">
                    {fact.value}
                  </p>
                  {fact.meta ? (
                    <p className="mt-1 font-mono text-xs text-muted">
                      {fact.meta}
                    </p>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
