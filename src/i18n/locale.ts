import { hasLocale } from "next-intl";

import { routing, type AppLocale } from "./routing";

const directions = {
  en: "ltr",
  ar: "rtl",
} as const satisfies Record<AppLocale, "ltr" | "rtl">;

export function isAppLocale(value: string): value is AppLocale {
  return hasLocale(routing.locales, value);
}

export function resolveLocale(value: string | undefined): AppLocale {
  return value && isAppLocale(value) ? value : routing.defaultLocale;
}

export function getDirection(locale: AppLocale): "ltr" | "rtl" {
  return directions[locale];
}
