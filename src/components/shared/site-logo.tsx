import { portfolio } from "@/lib/portfolio";
import { cn } from "@/lib/utils/cn";

type SiteLogoProps = {
  className?: string;
  size?: "sm" | "lg";
};

/**
 * Geometric "P" monogram — framed like a product window,
 * with a teal craft accent. Uses currentColor for theme adaptation.
 */
export function SiteLogo({ className, size = "sm" }: SiteLogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={portfolio.profile.name}
      className={cn(
        "site-logo shrink-0 text-ink",
        size === "sm" && "h-8 w-8",
        size === "lg" && "h-10 w-10",
        className,
      )}
    >
      {/* Soft outer frame */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        stroke="currentColor"
        strokeWidth="1.75"
        opacity="0.35"
      />
      {/* Inner offset frame — layered UI feel */}
      <rect
        x="7"
        y="7"
        width="34"
        height="34"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.18"
      />
      {/* Geometric P */}
      <path
        d="M16 34V14h11.2c4.85 0 8.3 3.2 8.3 7.55 0 4.4-3.45 7.6-8.3 7.6H21.2"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Teal craft accent */}
      <circle cx="36.5" cy="13.5" r="2.6" className="fill-accent" />
    </svg>
  );
}
