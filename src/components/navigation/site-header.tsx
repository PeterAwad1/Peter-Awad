"use client";

import { Suspense, useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { LocaleControl } from "@/components/navigation/locale-control";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { CvLink } from "@/components/shared/cv-link";
import { SiteLogo } from "@/components/shared/site-logo";
import { SECTION_NAV, SPY_SECTION_IDS } from "@/lib/constants/nav";
import { portfolio } from "@/lib/portfolio";
import { cn } from "@/lib/utils/cn";
import { useSectionSpy } from "@/hooks/use-section-spy";

export function SiteHeader() {
  const t = useTranslations("Navigation");
  const activeId = useSectionSpy(SPY_SECTION_IDS);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const navActive = (id: string) => {
    if (id === "work") return activeId === "work" || activeId === "more-work";
    if (id === "about") return activeId === "about";
    if (id === "approach") return activeId === "approach" || activeId === "craft";
    return activeId === id;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/90 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <SiteLogo />
          <span className="font-display hidden text-sm font-semibold tracking-tight text-ink sm:inline">
            Peter
            <span className="text-accent">.</span>
          </span>
          <span className="sr-only sm:hidden">{portfolio.profile.name}</span>
        </a>

        <nav
          aria-label={t("primary")}
          className="hidden items-center gap-1 md:flex"
        >
          {SECTION_NAV.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                navActive(item.id)
                  ? "text-accent"
                  : "text-muted hover:text-ink",
              )}
              aria-current={navActive(item.id) ? "true" : undefined}
            >
              {t(item.labelKey)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Suspense fallback={null}>
            <LocaleControl />
          </Suspense>
          <CvLink className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent">
            {t("cv")}
          </CvLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-ink"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-transform",
                  open && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-transform",
                  open && "-translate-y-2 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id={menuId}
          className="border-t border-line bg-surface md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("primary")}
        >
          <Container className="flex flex-col gap-1 py-4">
            {SECTION_NAV.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                  navActive(item.id)
                    ? "bg-signal text-accent"
                    : "text-ink hover:bg-bg",
                )}
                onClick={() => setOpen(false)}
              >
                {t(item.labelKey)}
              </a>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-line pt-4">
              <Suspense fallback={null}>
                <LocaleControl />
              </Suspense>
              <CvLink
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
                onClick={() => setOpen(false)}
              >
                {t("cv")}
              </CvLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
