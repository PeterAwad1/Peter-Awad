import { cn } from "@/lib/utils/cn";

import { Container } from "./container";

type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  ariaLabelledBy?: string;
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("scroll-mt-24 py-[clamp(4.5rem,10vw,8rem)]", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
