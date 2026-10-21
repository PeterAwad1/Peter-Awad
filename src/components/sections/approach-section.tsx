import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/animations/reveal";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";

const APPROACH_KEYS = ["production", "components", "data", "rtl"] as const;

export async function ApproachSection() {
  const t = await getTranslations("Approach");

  return (
    <Section id="approach" ariaLabelledBy="approach-heading">
      <SectionHeading
        id="approach-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <ol className="grid gap-6 sm:grid-cols-2">
        {APPROACH_KEYS.map((key, index) => (
          <Reveal key={key} as="li" className="rounded-xl border border-line bg-surface/80 p-6">
            <p className="font-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display mt-3 text-lg font-semibold text-ink">
              {t(`items.${key}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {t(`items.${key}.body`)}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
