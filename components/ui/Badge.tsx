"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface BadgeProps {
  text: string;
  icon?: ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}

/**
 * Badge component for displaying technology badges, status labels, and tags
 * 
 * @param text - The text content to display in the badge
 * @param icon - Optional icon to display before the text
 * @param variant - Visual style variant (default, primary, secondary)
 * @param size - Size of the badge (sm, md, lg)
 * @param pulse - Whether to apply pulse animation (useful for technology badges)
 * @param className - Additional CSS classes to apply
 * 
 * @example
 * <Badge text="React" variant="primary" size="md" pulse />
 * <Badge text="Production" variant="secondary" icon={<CheckIcon />} />
 */
export function Badge({ 
  text, 
  icon, 
  variant = 'default', 
  size = 'md',
  pulse = false,
  className 
}: BadgeProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Pulse animation - defined inline to avoid type issues
  const pulseAnimation = pulse && !prefersReducedMotion ? {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  } : undefined;

  // Variant styles
  const variantStyles = {
    default: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700",
    primary: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    secondary: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  };

  // Size styles - ensuring minimum 14px font size
  const sizeStyles = {
    sm: "text-sm px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  };

  // Icon size styles
  const iconSizeStyles = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <motion.span
      animate={pulseAnimation}
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-full border",
        "font-medium",
        "transition-colors duration-200",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && (
        <span className={cn("flex-shrink-0", iconSizeStyles[size])}>
          {icon}
        </span>
      )}
      <span>{text}</span>
    </motion.span>
  );
}
