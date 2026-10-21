import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import * as rootParams from "next/root-params";

import { routing } from "./routing";

async function resolveRequestLocale(override?: string) {
  if (hasLocale(routing.locales, override)) {
    return override;
  }

  try {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) {
      return paramValue;
    }
  } catch {
    // Root params are unavailable outside the [locale] segment.
  }

  return routing.defaultLocale;
}

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = await resolveRequestLocale(locale);

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  };
});
