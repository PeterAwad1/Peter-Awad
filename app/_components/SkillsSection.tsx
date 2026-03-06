"use client";

import { motion } from "framer-motion";
import { SkillCategory } from "./SkillCategory";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp, viewportConfig, getAccessibleVariants, usePrefersReducedMotion } from "@/lib/animations";
import type { SkillCategory as SkillCategoryType } from "@/data/types";

export interface SkillsSectionProps {
  skillCategories: SkillCategoryType[];
}

/**
 * SkillsSection component displays technical skills organized by category
 * 
 * Features:
 * - Skills grouped by categories (Frontend, State Management & Data, Tools & Workflow, Other)
 * - Responsive layout (stacked on mobile, 2 columns tablet, 3-4 columns desktop)
 * - Staggered animations for category entrance
 * - Visual hierarchy with clear category separation
 * - Easy scanning with badge-based skill display
 * 
 * Layout breakpoints:
 * - Mobile (< 640px): Stacked single column
 * - Tablet (640px - 1024px): 2 columns
 * - Desktop (> 1024px): 2 columns (for better readability with 4 categories)
 * 
 * @param skillCategories - Array of skill category objects
 */
export function SkillsSection({ skillCategories }: SkillsSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerVariants = getAccessibleVariants(staggerContainer, prefersReducedMotion);
  const itemVariants = getAccessibleVariants(fadeInUp, prefersReducedMotion);

  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32">
      <SectionHeading
        id="skills-heading"
        title="Skills & Technologies"
        subtitle="Technical expertise and tools I work with"
        align="center"
      />

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12"
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SkillCategory category={category} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
