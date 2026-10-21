import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/animations/reveal";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { portfolio } from "@/lib/portfolio";

export async function ContactSection() {
  const t = await getTranslations("Contact");

  const links = [
    {
      label: t("email"),
      href: `mailto:${portfolio.contact.email}`,
      value: portfolio.contact.email,
      external: false,
    },
    {
      label: t("phone"),
      href: `tel:${portfolio.contact.phone.replace(/\s/g, "")}`,
      value: portfolio.contact.phone,
      external: false,
    },
    {
      label: t("linkedin"),
      href: portfolio.contact.linkedin,
      value: "linkedin.com/in/peterawad2",
      external: true,
    },
    {
      label: t("github"),
      href: portfolio.contact.github,
      value: "github.com/PeterAwad1",
      external: true,
    },
  ];

  return (
    <Section id="contact" ariaLabelledBy="contact-heading">
      <SectionHeading
        id="contact-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <Reveal className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
        <p className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
          {t("availability")}
        </p>
        <p className="mt-2 text-sm font-medium text-accent">
          {portfolio.profile.availability}
        </p>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.label}>
              <p className="text-xs text-muted">{link.label}</p>
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="mt-1 inline-block text-base font-medium text-ink transition-colors hover:text-accent sm:text-lg"
              >
                {link.value}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={portfolio.contact.cv}
          download
          className="mt-10 inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
        >
          {t("cv")}
        </a>
      </Reveal>
    </Section>
  );
}
