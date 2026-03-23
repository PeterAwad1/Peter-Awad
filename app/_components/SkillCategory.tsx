'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import {
  fadeInUp,
  staggerContainer,
  usePrefersReducedMotion,
  getAccessibleVariants,
} from '@/lib/animations';
import { useTouchDevice } from '@/lib/useTouchDevice';
import { Code2, Layers3, Sparkles, Wrench } from 'lucide-react';
import type { SkillCategory as SkillCategoryType } from '@/data/types';

interface SkillCategoryProps {
  category: SkillCategoryType;
}

const categoryMeta: Record<
  string,
  {
    icon: typeof Code2;
    accent: string;
    description: string;
  }
> = {
  Frontend: {
    icon: Code2,
    accent: 'from-blue-500/20 to-cyan-500/10 text-blue-100',
    description: 'Crafting responsive interfaces with modern frontend tooling.',
  },
  'State Management & Data': {
    icon: Layers3,
    accent: 'from-violet-500/20 to-blue-500/10 text-violet-100',
    description: 'Handling client state, async flows, and API-driven products.',
  },
  'Tools & Workflow': {
    icon: Wrench,
    accent: 'from-emerald-500/20 to-cyan-500/10 text-emerald-100',
    description:
      'Productive tooling and delivery habits that keep projects moving.',
  },
  Other: {
    icon: Sparkles,
    accent: 'from-amber-500/20 to-orange-500/10 text-amber-100',
    description:
      'Supporting capabilities that improve overall product quality.',
  },
};

const levelStyles: Record<string, string> = {
  beginner: 'bg-white/[0.08] text-blue-50/70',
  intermediate: 'bg-cyan-500/10 text-cyan-100',
  advanced: 'bg-violet-500/10 text-violet-100',
  expert: 'bg-blue-500/10 text-blue-100',
};

export function SkillCategory({ category }: SkillCategoryProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchDevice = useTouchDevice();
  const containerVariants = getAccessibleVariants(
    staggerContainer,
    prefersReducedMotion,
  );
  const itemVariants = getAccessibleVariants(fadeInUp, prefersReducedMotion);

  const meta = categoryMeta[category.category] ?? {
    icon: Sparkles,
    accent: 'from-blue-500/20 to-cyan-500/10 text-blue-100',
    description: 'A focused set of skills used across real product work.',
  };

  const Icon = meta.icon;

  return (
    <motion.div
      variants={containerVariants}
      className='relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm md:p-7'
    >
      <div className='absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent' />

      <div className='flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-xl font-semibold text-white md:text-2xl'>
            {category.category}
          </h3>
          <p className='mt-3 max-w-md text-sm leading-6 text-blue-50/70'>
            {meta.description}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent}`}
        >
          <Icon className='h-5 w-5' aria-hidden='true' />
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2'
      >
        {category.skills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-2xl border border-white/8 bg-slate-950/30 p-4 transition-all duration-200 ${
              !isTouchDevice
                ? 'hover:border-blue-400/20 hover:bg-slate-950/45'
                : ''
            }`}
          >
            <div className='flex items-start justify-between gap-3'>
              <div>
                <p className='text-sm font-medium text-white md:text-base'>
                  {skill.name}
                </p>
              </div>

              {skill.level && (
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${levelStyles[skill.level]}`}
                >
                  {skill.level}
                </span>
              )}
            </div>

            <div className='mt-4 flex flex-wrap gap-2'>
              <Badge
                text={skill.name}
                variant='custom'
                size='sm'
                pulse
                className='border-white/10 bg-white/[0.06] text-blue-50/80'
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
