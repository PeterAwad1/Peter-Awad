import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { portfolio } from "@/lib/portfolio";

export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section
      id="home"
      aria-labelledby="hero-name"
      className="relative scroll-mt-24 overflow-hidden border-b border-line/70"
    >
      <HeroBackdrop />

      <Container className="hero-animate relative z-10 flex min-h-[min(88vh,52rem)] flex-col justify-center py-20 sm:py-28">
        <p className="mb-6 font-mono text-xs tracking-[0.12em] text-muted uppercase sm:text-sm">
          {t("meta", {
            title: portfolio.profile.title,
            location: portfolio.profile.location,
            tagline: portfolio.profile.tagline,
          })}
        </p>

        <h1
          id="hero-name"
          className="font-display max-w-5xl text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.95] font-bold tracking-tight text-ink"
        >
          {portfolio.profile.name}
        </h1>

        <p className="mt-8 max-w-3xl text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug font-medium text-ink/90">
          {t("headline")}
        </p>

        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {t("support")}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#work"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
          >
            {t("ctaWork")}
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-line bg-surface/80 px-6 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            {t("ctaContact")}
          </a>
        </div>
      </Container>
    </section>
  );
}
