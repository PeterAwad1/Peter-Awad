"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { fadeInUp, staggerContainer, viewportConfig, usePrefersReducedMotion, getAccessibleVariants } from "@/lib/animations";
import { useTouchDevice } from "@/lib/useTouchDevice";
import type { SkillCategory as SkillCategoryType } from "@/data/types";

interface SkillCategoryProps {
  category: SkillCategoryType;
}

/**
 * SkillCategory component displays a category of skills with badges
 * 
 * Features:
 * - Category title with visual hierarchy
 * - Responsive grid layout for skill badges
 * - Staggered animation for badge entrance
 * - Icons for major technologies
 * 
 * @param category - The skill category object containing category name and skills array
 */
export function SkillCategory({ category }: SkillCategoryProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchDevice = useTouchDevice();
  const containerVariants = getAccessibleVariants(staggerContainer, prefersReducedMotion);
  const itemVariants = getAccessibleVariants(fadeInUp, prefersReducedMotion);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
      className="space-y-4"
    >
      {/* Category Title */}
      <h3 className="text-xl md:text-2xl font-semibold text-white">
        {category.category}
      </h3>

      {/* Skills Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3"
      >
        {category.skills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              text={skill.name}
              variant="primary"
              size="md"
              pulse
              className={`w-full justify-center transition-all duration-200 ${
                !isTouchDevice ? 'hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50' : 'active:scale-95'
              }`}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
