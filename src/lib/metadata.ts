import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getPathname } from "@/i18n/navigation";
import { resolveLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";

type MetadataNamespace =
  | "Metadata"
  | "Home"
  | "About"
  | "Auth.Login"
  | "Auth.Register"
  | "Auth.ForgotPassword"
  | "Auth.ResetPassword"
  | "Auth.VerifyEmail";

type BuildLocaleMetadataOptions = {
  locale: string;
  pathname?: string;
  namespace?: MetadataNamespace;
};

export async function buildLocaleMetadata({
  locale,
  pathname = "/",
  namespace = "Metadata",
}: BuildLocaleMetadataOptions): Promise<Metadata> {
  const resolvedLocale = resolveLocale(locale);
  const t = await getTranslations({ locale: resolvedLocale, namespace });
  const tMeta = await getTranslations({
    locale: resolvedLocale,
    namespace: "Metadata",
  });

  const title = t("title");
  const description = t("description");
  const siteName = tMeta("siteName");
  const canonical = getPathname({ locale: resolvedLocale, href: pathname });

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [
      loc,
      getPathname({ locale: loc, href: pathname }),
    ]),
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": getPathname({
          locale: routing.defaultLocale,
          href: pathname,
        }),
      },
    },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      locale: resolvedLocale,
      alternateLocale: routing.locales.filter((loc) => loc !== resolvedLocale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
