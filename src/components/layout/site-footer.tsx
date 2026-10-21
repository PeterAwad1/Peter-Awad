import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { SiteLogo } from "@/components/shared/site-logo";
import { portfolio } from "@/lib/portfolio";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/60">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <a href="#home" className="inline-flex items-center gap-3">
            <SiteLogo size="lg" />
            <span className="font-display text-lg font-semibold tracking-tight text-ink">
              {portfolio.profile.name}
            </span>
          </a>
          <p className="text-sm text-muted">
            {t("tagline", {
              title: portfolio.profile.title,
              location: portfolio.profile.location,
            })}
          </p>
          <p className="text-xs text-muted">
            {t("copyright", { year, name: portfolio.profile.name })}
          </p>
        </div>

        <ul className="flex flex-wrap gap-4 text-sm">
          <li>
            <a
              href={portfolio.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={portfolio.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={`mailto:${portfolio.contact.email}`}
              className="text-muted transition-colors hover:text-accent"
            >
              {t("email")}
            </a>
          </li>
          <li>
            <a
              href={portfolio.contact.cv}
              download
              className="text-muted transition-colors hover:text-accent"
            >
              {t("cv")}
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
