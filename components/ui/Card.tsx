"use client";

import { motion } from "framer-motion";
import { scaleOnHover, usePrefersReducedMotion, getAccessibleVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

/**
 * Card component with hover effects and customizable styling
 * 
 * @param children - Content to display inside the card
 * @param className - Additional CSS classes to apply
 * @param hoverable - Whether to apply hover scale effect (default: true)
 * @param onClick - Optional click handler
 * 
 * @example
 * <Card hoverable>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 */
export function Card({ 
  children, 
  className, 
  hoverable = true, 
  onClick 
}: CardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const hoverVariants = hoverable ? getAccessibleVariants(scaleOnHover, prefersReducedMotion) : {};

  return (
    <motion.div
      variants={hoverVariants}
      whileHover={hoverable ? "whileHover" : undefined}
      whileTap={hoverable && onClick ? "whileTap" : undefined}
      onClick={onClick}
      className={cn(
        "rounded-lg border border-neutral-200 dark:border-neutral-800",
        "bg-white dark:bg-neutral-900",
        "p-6 shadow-sm",
        "transition-shadow duration-200",
        hoverable && "hover:shadow-md dark:hover:shadow-neutral-800/50",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
