'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Briefcase, MapPin, Calendar } from 'lucide-react';
import type { WorkExperience } from '@/data/types';
import { fadeInLeft, fadeInRight } from '@/lib/animations';

interface ExperienceCardProps {
  experience: WorkExperience;
  index: number;
}

export default function ExperienceCard({
  experience,
  index,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isAlternate = index % 2 === 1;

  const visibleResponsibilities = isExpanded
    ? experience.responsibilities
    : experience.responsibilities.slice(0, 3);

  const hasMore = experience.responsibilities.length > 3;
  const cardVariants = isAlternate ? fadeInRight : fadeInLeft;

  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className='relative'
    >
      <div className='absolute left-0 top-0 bottom-0 hidden w-px bg-gradient-to-b from-blue-400/50 via-blue-400/20 to-transparent md:block' />
      <div className='absolute left-0 top-7 hidden h-3 w-3 -translate-x-[5px] rounded-full border-4 border-background bg-blue-400 md:block' />

      <div className={`md:ml-8 ${isAlternate ? 'md:ml-12' : ''}`}>
        <div className='relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/30 hover:bg-white/[0.07] md:p-7'>
          <div className='absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent' />

          <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
            <div className='flex-1'>
              <div className='mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200'>
                <Briefcase className='h-5 w-5' aria-hidden='true' />
              </div>

              <h3 className='text-xl font-semibold text-white md:text-2xl'>
                {experience.position}
              </h3>
              <p className='mt-2 text-base font-medium text-blue-100/80'>
                {experience.company}
              </p>
            </div>
          </div>

          <div className='mt-5 flex flex-wrap gap-3 text-sm text-blue-50/70'>
            <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2'>
              <Calendar className='h-4 w-4' aria-hidden='true' />
              <span>
                {experience.startDate} - {experience.endDate}
              </span>
            </div>
            <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2'>
              <MapPin className='h-4 w-4' aria-hidden='true' />
              <span>{experience.location}</span>
            </div>
          </div>

          <div className='mt-6 space-y-3'>
            <AnimatePresence mode='wait'>
              {visibleResponsibilities.map((responsibility, idx) => (
                <motion.div
                  key={`${experience.id}-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className='flex items-start gap-3 rounded-2xl border border-white/8 bg-slate-950/30 px-4 py-3 text-sm leading-6 text-blue-50/75'
                >
                  <span className='mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400' />
                  <span className='flex-1'>{responsibility}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            {hasMore && (
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className='mt-2 inline-flex items-center gap-2 text-sm font-medium text-blue-200 transition-colors hover:text-blue-100'
                aria-expanded={isExpanded}
                aria-label={
                  isExpanded
                    ? 'Show less responsibilities'
                    : 'Show more responsibilities'
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className='h-4 w-4' />
                </motion.div>
                {isExpanded ? 'Show less' : `Show ${experience.responsibilities.length - 3} more`}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
