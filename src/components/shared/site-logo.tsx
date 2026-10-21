import { portfolio } from "@/lib/portfolio";
import { cn } from "@/lib/utils/cn";

type SiteLogoProps = {
  className?: string;
  size?: "sm" | "lg";
};

export function SiteLogo({ className, size = "sm" }: SiteLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG logo with theme CSS filters
    <img
      src="/logo.png"
      alt={portfolio.profile.name}
      className={cn(
        "site-logo",
        size === "lg" && "site-logo-lg",
        className,
      )}
      width={80}
      height={68}
    />
  );
}
