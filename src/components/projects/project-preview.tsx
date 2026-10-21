import Image from "next/image";

import { cn } from "@/lib/utils/cn";

type ProjectPreviewProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function ProjectPreview({
  src,
  alt,
  priority = false,
  className,
}: ProjectPreviewProps) {
  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl border border-line bg-surface shadow-[0_1px_0_rgba(14,18,23,0.04)]",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-signal">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 640px"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}
