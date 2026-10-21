import { getLocale, getTranslations } from "next-intl/server";

import { Reveal } from "@/components/animations/reveal";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { formatMonthYear, portfolio } from "@/lib/portfolio";

export async function AboutSection() {
  const t = await getTranslations("About");
  const tCommon = await getTranslations("Common");
  const locale = await getLocale();
  const military = portfolio.militaryService;

  return (
    <Section id="about" ariaLabelledBy="about-heading">
      <SectionHeading
        id="about-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("lead")}
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="space-y-6 lg:col-span-7">
          <p className="text-base leading-8 text-muted sm:text-lg sm:leading-8">
            {t("summary")}
          </p>
          <p className="text-base leading-8 text-muted sm:text-lg sm:leading-8">
            {portfolio.profile.summary}
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div>
              <p className="mb-1 font-mono text-xs tracking-[0.12em] text-muted uppercase">
                {t("languages")}
              </p>
              <p className="text-sm font-medium text-ink">
                {portfolio.profile.languages.join(" · ")}
              </p>
            </div>
            <div>
              <p className="mb-1 font-mono text-xs tracking-[0.12em] text-muted uppercase">
                {t("basedIn")}
              </p>
              <p className="text-sm font-medium text-ink">
                {portfolio.profile.location}
              </p>
            </div>
          </div>
          <a
            href={portfolio.contact.cv}
            download
            className="inline-flex h-11 items-center justify-center rounded-lg border border-line bg-surface px-5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {t("cv")}
          </a>
        </Reveal>

        <Reveal className="space-y-8 rounded-2xl border border-line bg-surface/80 p-6 sm:p-8 lg:col-span-5">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">
              {t("educationTitle")}
            </h3>
            <ul className="mt-4 space-y-4">
              {portfolio.education.map((item) => (
                <li
                  key={item.id}
                  className="border-t border-line pt-4 first:border-t-0 first:pt-0"
                >
                  <p className="text-sm font-medium text-ink">{item.degree}</p>
                  <p className="mt-1 text-sm text-muted">
                    {item.institution}
                    <span className="mx-2 text-line">·</span>
                    {item.location}
                  </p>
                  {item.endDate ? (
                    <p className="mt-1 font-mono text-xs text-muted">
                      {formatMonthYear(item.endDate, locale, tCommon("present"))}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-ink">
              {t("militaryTitle")}
            </h3>
            <p className="mt-3 text-sm text-muted">
              {t("militaryBody", {
                role: military.role,
                organization: military.organization,
              })}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">
              {formatMonthYear(military.startDate, locale, tCommon("present"))}
              {" – "}
              {formatMonthYear(military.endDate, locale, tCommon("present"))}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
