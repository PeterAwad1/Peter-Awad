import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-accent text-on-accent hover:bg-accent-hover",
        variant === "secondary" &&
          "border border-line bg-surface text-ink hover:border-accent hover:text-accent",
        variant === "ghost" && "text-muted hover:text-accent",
        className,
      )}
      {...props}
    />
  );
}
