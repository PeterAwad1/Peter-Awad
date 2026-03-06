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

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isAlternate = index % 2 === 1;

  // Show first 3 responsibilities by default, rest when expanded
  const visibleResponsibilities = isExpanded 
    ? experience.responsibilities 
    : experience.responsibilities.slice(0, 3);
  
  const hasMore = experience.responsibilities.length > 3;

  // Alternating animation variants
  const cardVariants = isAlternate ? fadeInRight : fadeInLeft;

  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-purple-500/30 to-transparent hidden md:block" />
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 w-3 h-3 bg-purple-500 rounded-full border-4 border-background hidden md:block -translate-x-[5px]" />

      {/* Card content */}
      <div className={`md:ml-8 ${isAlternate ? 'md:ml-12' : ''}`}>
        <div className="bg-card rounded-lg p-6 border border-border hover:border-purple-500/50 transition-all duration-300">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-purple-500" />
                <h3 className="text-xl font-bold text-foreground">
                  {experience.position}
                </h3>
              </div>
              <p className="text-lg text-muted-foreground font-medium mb-2">
                {experience.company}
              </p>
            </div>
          </div>

          {/* Meta information */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {experience.startDate} - {experience.endDate}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{experience.location}</span>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="space-y-2">
            <ul className="space-y-2">
              <AnimatePresence mode="wait">
                {visibleResponsibilities.map((responsibility, idx) => (
                  <motion.li
                    key={`${experience.id}-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-purple-500 mt-1.5">•</span>
                    <span className="flex-1">{responsibility}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {/* Expand/Collapse button */}
            {hasMore && (
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-purple-500 hover:text-purple-400 transition-colors mt-4 text-sm font-medium"
                aria-expanded={isExpanded}
                aria-label={isExpanded ? 'Show less responsibilities' : 'Show more responsibilities'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
                {isExpanded ? (
                  <>Show less</>
                ) : (
                  <>Show {experience.responsibilities.length - 3} more</>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
