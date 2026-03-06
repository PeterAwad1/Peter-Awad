"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig, getAccessibleVariants, usePrefersReducedMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** The main heading text */
  title: string;
  /** Optional subtitle text displayed below the title */
  subtitle?: string;
  /** Text alignment - defaults to center */
  align?: "left" | "center" | "right";
  /** Additional CSS classes */
  className?: string;
  /** Optional ID for the heading element (for ARIA labelledby) */
  id?: string;
}

/**
 * SectionHeading component with fade-in animation on viewport entry
 * 
 * Features:
 * - Responsive typography that scales with screen size
 * - Fade-in animation when scrolled into view
 * - Respects user's reduced motion preferences
 * - Configurable alignment (left, center, right)
 * - Optional subtitle support
 * 
 * @example
 * ```tsx
 * <SectionHeading 
 *   title="About Me" 
 *   subtitle="Learn more about my background"
 *   align="center"
 * />
 * ```
 */
export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  id,
}: SectionHeadingProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getAccessibleVariants(fadeInUp, prefersReducedMotion);

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
      variants={variants}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("mb-12 md:mb-16", alignmentClasses[align], className)}
    >
      <h2 id={id} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
