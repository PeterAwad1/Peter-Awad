import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/animations/reveal";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { TechChip } from "@/components/ui/tech-chip";
import { portfolio } from "@/lib/portfolio";

const GROUPS = [
  { key: "core" as const, items: portfolio.skills.core },
  { key: "uiAndForms" as const, items: portfolio.skills.uiAndForms },
  { key: "stateAndData" as const, items: portfolio.skills.stateAndData },
  { key: "tools" as const, items: portfolio.skills.tools },
];

export async function CraftSection() {
  const t = await getTranslations("Craft");

  return (
    <Section id="craft" ariaLabelledBy="craft-heading">
      <SectionHeading
        id="craft-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="grid gap-8 sm:grid-cols-2">
        {GROUPS.map((group) => (
          <Reveal key={group.key} className="space-y-3">
            <h3 className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
              {t(`groups.${group.key}`)}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <TechChip label={item} />
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
