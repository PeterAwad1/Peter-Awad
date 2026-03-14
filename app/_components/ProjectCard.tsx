'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import {
  usePrefersReducedMotion,
  getAccessibleVariants,
  scaleOnHover,
} from '@/lib/animations';
import { useTouchDevice } from '@/lib/useTouchDevice';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/types';

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchDevice = useTouchDevice();
  const hoverVariants = getAccessibleVariants(
    scaleOnHover,
    prefersReducedMotion,
  );

  const hasLink = !!project.link;

  const statusConfig = {
    production: {
      label: 'Production',
      className: 'border-blue-400/20 bg-blue-500/10 text-blue-100',
    },
    development: {
      label: 'Under Development',
      className: 'border-violet-400/20 bg-violet-500/10 text-violet-100',
    },
    completed: {
      label: 'Completed',
      className: 'border-white/15 bg-white/[0.08] text-blue-50/85',
    },
  };

  const statusInfo = statusConfig[project.status];

  const handleClick = () => {
    if (hasLink && project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      variants={hoverVariants}
      whileHover={hasLink && !isTouchDevice ? 'whileHover' : undefined}
      whileTap={hasLink ? { scale: 0.98 } : undefined}
      className={cn(
        'group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.05] backdrop-blur-sm transition-all duration-300',
        !isTouchDevice && 'hover:border-blue-400/30 hover:bg-white/[0.07]',
        hasLink && 'cursor-pointer active:scale-[0.98]',
      )}
      onClick={handleClick}
      role={hasLink ? 'button' : undefined}
      aria-label={hasLink ? `View ${project.name} project` : undefined}
      tabIndex={hasLink ? 0 : undefined}
      onKeyDown={
        hasLink
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
    >
      <div className='absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent' />

      {project.image && (
        <div className='relative h-52 w-full overflow-hidden bg-slate-950/60'>
          <Image
            src={project.image}
            alt={`${project.name} project screenshot`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className={cn(
              'object-cover transition-transform duration-500',
              !isTouchDevice && 'group-hover:scale-105',
            )}
            priority={false}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent' />
        </div>
      )}

      <div className='p-6 md:p-7'>
        <div className='mb-4 flex items-start justify-between gap-3'>
          <div>
            <h3 className='text-xl font-semibold text-white'>
              {project.name}
              {hasLink && (
                <ExternalLink
                  className={cn(
                    'ml-2 inline-block h-4 w-4 text-blue-100/60 transition-colors',
                    !isTouchDevice && 'group-hover:text-blue-200',
                  )}
                  aria-hidden='true'
                />
              )}
            </h3>
            <p className='mt-3 text-sm leading-6 text-blue-50/70 line-clamp-3'>
              {project.description}
            </p>
          </div>

          <Badge
            text={statusInfo.label}
            variant='custom'
            size='sm'
            className={cn('shrink-0 border', statusInfo.className)}
          />
        </div>

        {project.features && project.features.length > 0 && (
          <div className='mb-5 space-y-2'>
            {project.features.slice(0, 3).map((feature, idx) => (
              <div
                key={idx}
                className='flex items-start gap-3 rounded-2xl border border-white/8 bg-slate-950/30 px-4 py-3 text-sm leading-6 text-blue-50/75'
              >
                <span className='mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400' />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        <div className='flex flex-wrap gap-2'>
          {project.technologies.map((tech, idx) => (
            <Badge
              key={idx}
              text={tech}
              size='sm'
              pulse={!prefersReducedMotion}
              className='border-white/10 bg-white/[0.06] text-blue-50/85'
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
