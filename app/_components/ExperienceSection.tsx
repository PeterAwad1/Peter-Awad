'use client';

import { motion } from 'framer-motion';
import type { WorkExperience } from '@/data/types';
import ExperienceCard from './ExperienceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { staggerContainer, viewportConfig } from '@/lib/animations';

interface ExperienceSectionProps {
  experiences: WorkExperience[];
}

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  return (
    <section
      id='experience'
      className='py-16 md:py-24 lg:py-32'
      aria-labelledby='experience-heading'
    >
      <div className='max-w-5xl mx-auto'>
        <SectionHeading
          id='experience-heading'
          title='Work Experience'
          subtitle='My professional journey and career highlights'
          align='center'
        />

        <motion.div
          variants={staggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={viewportConfig}
          className='mt-12 space-y-8'
        >
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
