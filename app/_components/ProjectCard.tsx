"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { usePrefersReducedMotion, getAccessibleVariants, scaleOnHover } from "@/lib/animations";
import { useTouchDevice } from "@/lib/useTouchDevice";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/types";

export interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard component displays a single project with image, description, tech stack, and status
 * 
 * Features:
 * - Project image with overlay effect
 * - Technology badges with icons
 * - Status labels (Production/Development/Completed)
 * - Conditional clickability (only if project has link)
 * - External link indicator
 * - Hover effects (scale, shadow, image zoom)
 * 
 * @param project - Project data object
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchDevice = useTouchDevice();
  const hoverVariants = getAccessibleVariants(scaleOnHover, prefersReducedMotion);

  const hasLink = !!project.link;

  // Status label configuration
  const statusConfig = {
    production: { label: "Production", variant: "primary" as const },
    development: { label: "Under Development", variant: "secondary" as const },
    completed: { label: "Completed", variant: "default" as const },
  };

  const statusInfo = statusConfig[project.status];

  const handleClick = () => {
    if (hasLink && project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  const cardContent = (
    <motion.div
      variants={hoverVariants}
      whileHover={hasLink && !isTouchDevice ? "whileHover" : undefined}
      whileTap={hasLink ? { scale: 0.98 } : undefined}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800",
        "bg-white dark:bg-neutral-900",
        "shadow-sm transition-shadow duration-300",
        !isTouchDevice && "hover:shadow-lg dark:hover:shadow-neutral-800/50",
        hasLink && "cursor-pointer active:scale-[0.98]"
      )}
      onClick={handleClick}
      role={hasLink ? "button" : undefined}
      aria-label={hasLink ? `View ${project.name} project` : undefined}
      tabIndex={hasLink ? 0 : undefined}
      onKeyDown={hasLink ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      } : undefined}
    >
      {/* Project Image with Overlay */}
      {project.image && (
        <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={project.image}
            alt={`${project.name} project screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-300",
              !isTouchDevice && "group-hover:scale-110"
            )}
            priority={false}
          />
          {/* Overlay on hover - disabled on touch devices */}
          {!isTouchDevice && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          )}
        </div>
      )}

      {/* Card Content */}
      <div className="p-6">
        {/* Header with Title and Status */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {project.name}
            {hasLink && (
              <ExternalLink 
                className={cn(
                  "ml-2 inline-block h-4 w-4 text-neutral-500 transition-colors",
                  !isTouchDevice && "group-hover:text-blue-500"
                )}
                aria-hidden="true"
              />
            )}
          </h3>
          <Badge
            text={statusInfo.label}
            variant={statusInfo.variant}
            size="sm"
            className="flex-shrink-0"
          />
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
          {project.description}
        </p>

        {/* Features (if available) */}
        {project.features && project.features.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
              Key Features
            </h4>
            <ul className="space-y-1">
              {project.features.slice(0, 3).map((feature, idx) => (
                <li
                  key={idx}
                  className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start"
                >
                  <span className="mr-2 mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-blue-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technology Stack */}
        <div>
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <Badge
                key={idx}
                text={tech}
                variant="default"
                size="sm"
                pulse={!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return cardContent;
}
