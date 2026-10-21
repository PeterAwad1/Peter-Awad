import portfolioData from "@/data/portfolio.json";
import type { PortfolioData, PortfolioProject } from "@/types/portfolio";

export const portfolio = portfolioData as PortfolioData;

/** Featured showcase order: products and dashboards with previews first. */
const FEATURED_ORDER = [
  "luca-stay",
  "luca-stay-admin",
  "karat",
  "homes-admin",
  "pass-residency",
  "pass-wm",
  "academies-erp",
] as const;

export function getFeaturedProjects(): PortfolioProject[] {
  const byId = new Map(portfolio.projects.map((p) => [p.id, p]));
  return FEATURED_ORDER.map((id) => byId.get(id)).filter(
    (p): p is PortfolioProject => Boolean(p),
  );
}

export function getMoreProjects(): PortfolioProject[] {
  const featuredIds = new Set<string>(FEATURED_ORDER);
  return portfolio.projects.filter((p) => !featuredIds.has(p.id));
}

export function formatMonthYear(
  value: string | null,
  locale: string,
  presentLabel: string,
): string {
  if (!value) return presentLabel;
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return value;
  const date = new Date(year, month - 1, 1);
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateRange(
  start: string,
  end: string | null,
  locale: string,
  presentLabel: string,
): string {
  const startLabel = formatMonthYear(start, locale, presentLabel);
  const endLabel = end ? formatMonthYear(end, locale, presentLabel) : presentLabel;
  return `${startLabel} – ${endLabel}`;
}
