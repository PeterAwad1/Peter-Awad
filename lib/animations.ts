import { Variants } from "framer-motion";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

// Animation Variants

/**
 * Fade in from bottom animation
 * Use for section entrances and card reveals
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 60 },
};

/**
 * Fade in from left animation
 * Use for alternating card entrances
 */
export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

/**
 * Fade in from right animation
 * Use for alternating card entrances
 */
export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 60 },
};

/**
 * Stagger container for animating children sequentially
 * Use as parent container for lists and grids
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Scale on hover animation
 * Use for interactive cards and buttons
 */
export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
};

/**
 * Default viewport configuration for scroll-triggered animations
 * Triggers animation once when 30% of element is visible
 */
export const viewportConfig = {
  once: true,
  amount: 0.3,
};

// Transition configurations

/**
 * Default smooth transition
 */
export const smoothTransition = {
  duration: 0.6,
  ease: "easeOut",
};

/**
 * Spring transition for natural motion
 */
export const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
};

/**
 * Quick transition for hover effects
 */
export const quickTransition = {
  duration: 0.2,
  ease: "easeInOut",
};

// Utility Hooks

/**
 * Hook to detect if user prefers reduced motion
 * Returns true if user has enabled reduced motion in their OS settings
 * 
 * @returns boolean indicating if reduced motion is preferred
 * 
 * @example
 * const prefersReducedMotion = usePrefersReducedMotion();
 * const variants = prefersReducedMotion ? {} : fadeInUp;
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for scroll progress tracking
 * Returns scroll progress values and transformed values for parallax effects
 * 
 * @returns Object containing scrollYProgress and parallax transform values
 * 
 * @example
 * const { scrollYProgress, parallaxY } = useScrollProgress();
 * <motion.div style={{ y: parallaxY }}>Content</motion.div>
 */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Parallax effect: moves element up as user scrolls down
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Opacity fade: fades out as user scrolls
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  
  // Scale effect: scales down as user scrolls
  const scaleDown = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return {
    scrollYProgress,
    parallaxY,
    fadeOpacity,
    scaleDown,
  };
}

/**
 * Get animation variants based on reduced motion preference
 * Returns empty variants if user prefers reduced motion
 * 
 * @param variants - The animation variants to use
 * @param prefersReducedMotion - Whether user prefers reduced motion
 * @returns Variants object (empty if reduced motion is preferred)
 * 
 * @example
 * const prefersReducedMotion = usePrefersReducedMotion();
 * const variants = getAccessibleVariants(fadeInUp, prefersReducedMotion);
 */
export function getAccessibleVariants(
  variants: Variants,
  prefersReducedMotion: boolean
): Variants {
  if (prefersReducedMotion) {
    return {
      initial: {},
      animate: {},
      exit: {},
    };
  }
  return variants;
}

/**
 * Combine multiple animation variants
 * Useful for creating complex animations from simple building blocks
 * 
 * @param variants - Array of variant objects to combine
 * @returns Combined variants object
 */
export function combineVariants(...variants: Variants[]): Variants {
  return variants.reduce((acc, variant) => {
    return {
      ...acc,
      initial: { ...acc.initial, ...variant.initial },
      animate: { ...acc.animate, ...variant.animate },
      exit: { ...acc.exit, ...variant.exit },
    };
  }, {} as Variants);
}
