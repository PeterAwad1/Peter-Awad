type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="mb-10 max-w-2xl space-y-3 sm:mb-14">
      <p className="font-mono text-xs font-medium tracking-[0.14em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-ink"
      >
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </header>
  );
}
