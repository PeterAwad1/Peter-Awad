"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp, viewportConfig, getAccessibleVariants, usePrefersReducedMotion } from "@/lib/animations";
import type { Project } from "@/data/types";

export interface ProjectsSectionProps {
  projects: Project[];
}

/**
 * ProjectsSection component displays all projects in a responsive grid
 * 
 * Features:
 * - Responsive grid layout (1 column mobile, 2 columns tablet, 3 columns desktop)
 * - Staggered animations for project cards
 * - Section heading with fade-in animation
 * - Displays all six projects from CV data
 * 
 * Grid breakpoints:
 * - Mobile (< 768px): 1 column
 * - Tablet (768px - 1024px): 2 columns
 * - Desktop (> 1024px): 3 columns
 * 
 * @param projects - Array of project data objects
 */
export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerVariants = getAccessibleVariants(staggerContainer, prefersReducedMotion);
  const itemVariants = getAccessibleVariants(fadeInUp, prefersReducedMotion);

  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32">
      <SectionHeading
        id="projects-heading"
        title="Projects"
        subtitle="A showcase of my recent work and technical capabilities"
        align="center"
      />

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
