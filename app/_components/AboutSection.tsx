'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { personalInfo, education } from '@/data';
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
  getAccessibleVariants,
  usePrefersReducedMotion,
} from '@/lib/animations';
import { useTouchDevice } from '@/lib/useTouchDevice';
import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Layers3,
  MapPin,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';

const keySkills = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'ShadCN/UI',
];

const focusAreas = [
  'Responsive UI systems',
  'Reusable component architecture',
  'Accessible frontend experiences',
  'Performance-focused delivery',
];

const quickStats = [
  {
    value: '4+',
    label: 'Years of frontend experience',
    icon: BriefcaseBusiness,
  },
  {
    value: 'React',
    label: 'Core framework expertise',
    icon: Layers3,
  },
  {
    value: 'Cairo',
    label: 'Based in Egypt',
    icon: MapPin,
  },
];

const AboutSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchDevice = useTouchDevice();
  const accessibleFadeInUp = getAccessibleVariants(
    fadeInUp,
    prefersReducedMotion,
  );
  const accessibleStaggerContainer = getAccessibleVariants(
    staggerContainer,
    prefersReducedMotion,
  );

  const highlightSkills = (text: string) => {
    const parts = text.split(new RegExp(`(${keySkills.join('|')})`, 'gi'));

    return parts.map((part, index) => {
      if (
        keySkills.some((skill) => skill.toLowerCase() === part.toLowerCase())
      ) {
        return (
          <span key={index} className='font-semibold text-blue-200'>
            {part}
          </span>
        );
      }

      return part;
    });
  };

  return (
    <section
      id='about'
      className='relative overflow-hidden py-16 md:py-24 lg:py-28'
    >
      <div aria-hidden='true' className='absolute inset-0 ' />

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          variants={accessibleStaggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={viewportConfig}
          className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8 lg:p-10'
        >
          <div className='absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent' />

          <div className='gap-8 '>
            <motion.div
              variants={accessibleFadeInUp}
              className='flex flex-col items-center justify-center'
            >
              <div className='inline-flex justify-center items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-blue-100'>
                <Sparkles className='h-4 w-4' aria-hidden='true' />
                About Me
              </div>

              <h2
                id='about-heading'
                className='mt-5 max-w-3xl text-3xl text-center font-bold leading-tight text-white md:text-4xl lg:text-5xl'
              >
                Building polished frontend products with structure, clarity, and
                strong UX thinking.
              </h2>

              <p className='mt-5 max-w-3xl text-sm leading-7 text-center text-blue-50/80 md:text-base'>
                {highlightSkills(personalInfo.summary)}
              </p>

              <div className='mt-8 flex flex-wrap justify-center gap-3'>
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className='rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-blue-50/85'
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={accessibleFadeInUp} className='space-y-4'>
              {personalInfo.profileImage && (
                <div className='overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-3'>
                  <div className='relative aspect-[4/4.6] overflow-hidden rounded-[1.35rem]'>
                    <Image
                      src={personalInfo.profileImage}
                      alt={`${personalInfo.name} - Profile Picture`}
                      fill
                      className={`object-cover transition-transform duration-500 ${
                        !isTouchDevice ? 'hover:scale-105' : ''
                      }`}
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 32vw'
                      priority={false}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            variants={accessibleFadeInUp}
            className='mt-10 rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-6 md:p-8'
          >
            <div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
              <div>
                <p className='text-xs uppercase tracking-[0.26em] text-blue-200/70'>
                  Education
                </p>
                <h3 className='mt-2 text-2xl font-semibold text-white md:text-3xl'>
                  Education and training that shaped my technical foundation
                </h3>
              </div>
            </div>

            <div className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2'>
              {education.map((edu) => {
                const isDegree = edu.type === 'degree';
                const Icon = isDegree ? GraduationCap : Award;

                return (
                  <motion.div
                    key={edu.id}
                    variants={accessibleFadeInUp}
                    className='rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 md:p-6'
                  >
                    <div className='flex items-start gap-4'>
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                          isDegree
                            ? 'bg-blue-500/15 text-blue-200'
                            : 'bg-violet-500/15 text-violet-200'
                        }`}
                      >
                        <Icon className='h-6 w-6' aria-hidden='true' />
                      </div>

                      <div className='min-w-0 flex-1'>
                        <h4 className='text-lg font-semibold leading-tight text-white'>
                          {edu.degree}
                        </h4>

                        <p className='mt-3 text-sm font-medium text-blue-50/85'>
                          {edu.institution}
                        </p>

                        <div className='mt-3 flex items-center gap-2 text-sm text-blue-50/70'>
                          <MapPin
                            className='h-4 w-4 shrink-0'
                            aria-hidden='true'
                          />
                          <span>{edu.location}</span>
                        </div>

                        <div className='mt-4 flex flex-wrap items-center gap-2'>
                          <Badge
                            text={edu.graduationYear}
                            variant='primary'
                            size='sm'
                            className='border-blue-400/20 bg-blue-500/10 text-blue-100'
                          />
                          {edu.gpa && (
                            <Badge
                              text={`GPA: ${edu.gpa}`}
                              variant='secondary'
                              size='sm'
                              className='border-violet-400/20 bg-violet-500/10 text-violet-100'
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
