import type { MetadataRoute } from "next";

import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { publicSitemapPaths } from "@/lib/constants/routes";

const host = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

function localizeUrl(href: (typeof publicSitemapPaths)[number], locale: AppLocale) {
  return new URL(getPathname({ locale, href }), host).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return publicSitemapPaths.map((href) => ({
    url: localizeUrl(href, routing.defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, localizeUrl(href, locale)]),
      ),
    },
  }));
}
