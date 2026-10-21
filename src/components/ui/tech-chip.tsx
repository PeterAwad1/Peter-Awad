import { cn } from "@/lib/utils/cn";

type TechChipProps = {
  label: string;
  className?: string;
};

export function TechChip({ label, className }: TechChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[0.7rem] tracking-wide text-muted",
        className,
      )}
    >
      {label}
    </span>
  );
}
