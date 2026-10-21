"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";

type LocaleControlProps = {
  className?: string;
};

export function LocaleControl({ className }: LocaleControlProps) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  return (
    <nav
      aria-label={t("label")}
      className={cn("flex items-center gap-1 text-xs font-medium", className)}
    >
      {routing.locales.map((nextLocale) => {
        const isActive = nextLocale === locale;

        return (
          <Link
            key={nextLocale}
            href={{ pathname, query }}
            locale={nextLocale as AppLocale}
            hrefLang={nextLocale}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-md px-2.5 py-1.5 transition-colors",
              isActive
                ? "bg-ink text-surface"
                : "text-muted hover:bg-signal hover:text-ink",
            )}
          >
            {t(nextLocale)}
          </Link>
        );
      })}
    </nav>
  );
}
