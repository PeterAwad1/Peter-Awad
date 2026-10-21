import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic, Syne } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getTranslations } from "next-intl/server";

import { getDirection, isAppLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { buildLocaleMetadata } from "@/lib/metadata";
import { themeInitScript } from "@/lib/theme";
import { AppProviders } from "@/providers/app-providers";
import type { LocaleLayoutProps } from "@/types/next";

import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: isAppLocale(locale) ? locale : routing.defaultLocale,
    namespace: "Metadata",
  });

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    ),
    applicationName: t("siteName"),
    ...(await buildLocaleMetadata({ locale, pathname: "/" })),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={`dark ${geistSans.variable} ${geistMono.variable} ${syne.variable} ${notoSansArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="site-atmosphere flex min-h-full flex-col text-ink">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
