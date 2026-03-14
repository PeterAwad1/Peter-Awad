'use client';

import MagicButton from '@/components/MagicButton';
import { Spotlight } from '@/components/ui/spotlight';
import { personalInfo } from '@/data';
import {
  fadeInUp,
  staggerContainer,
  usePrefersReducedMotion,
  getAccessibleVariants,
} from '@/lib/animations';
import { motion, Variants } from 'framer-motion';
import {
  ArrowDown,
  BriefcaseBusiness,
  Code2,
  MapPin,
  Sparkles,
} from 'lucide-react';
import React from 'react';

const techStack = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'];

const highlights = [
  {
    title: '4+ years building interfaces',
    description:
      'Production-ready apps with attention to speed, structure, and polish.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Modern frontend stack',
    description:
      'Reusable components, scalable architecture, and smooth responsive UX.',
    icon: Code2,
  },
];

const HeroSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const accessibleFadeInUp = getAccessibleVariants(
    fadeInUp,
    prefersReducedMotion,
  );
  const accessibleStaggerContainer = getAccessibleVariants(
    staggerContainer,
    prefersReducedMotion,
  );

  const scrollIndicatorVariants: Variants = {
    initial: { y: 0 },
    animate: prefersReducedMotion
      ? {}
      : {
          y: [0, 10, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        },
  };

  return (
    <div className='relative  py-20 md:py-24 lg:min-h-[92vh] '>
      <div aria-hidden='true'>
        <Spotlight
          className='-top-40 -left-10 h-screen md:-left-32 md:-top-20'
          fill='white'
        />
        <Spotlight
          className='left-full top-10 h-[80vh] w-[50vw]'
          fill='purple'
        />
        <Spotlight className='left-80 top-28 h-[80vh] w-[50vw]' fill='blue' />
      </div>

      <div className='relative z-10 flex justify-center'>
        <motion.div
          className=' w-full max-w-6xl items-center gap-10 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-10 backdrop-blur-sm md:px-10 lg:min-h-[78vh]  lg:px-12 lg:py-12'
          variants={accessibleStaggerContainer}
          initial='initial'
          animate='animate'
        >
          <div className='flex flex-col items-center justify-center'>
            <motion.div
              variants={accessibleFadeInUp}
              className='mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-blue-100'
            >
              <Sparkles className='h-4 w-4' aria-hidden='true' />
              Frontend Developer
            </motion.div>

            <motion.h1
              id='hero-heading'
              className='max-w-3xl text-4xl font-bold text-center leading-tight md:text-5xl lg:text-6xl xl:text-7xl'
              variants={accessibleFadeInUp}
            >
              {personalInfo.name}
            </motion.h1>

            <motion.h2
              className='mt-4 max-w-2xl text-xl text-blue-100 md:text-2xl lg:text-3xl'
              variants={accessibleFadeInUp}
            >
              {personalInfo.title}
            </motion.h2>

            <motion.div
              className='mt-4 flex items-center gap-2 text-sm text-blue-50/90 md:text-base'
              variants={accessibleFadeInUp}
            >
              <MapPin className='h-4 w-4 md:h-5 md:w-5' aria-hidden='true' />
              <span>{personalInfo.location}</span>
            </motion.div>

            <motion.p
              className='mt-6 max-w-2xl text-sm leading-7 text-blue-50/80 md:text-base'
              variants={accessibleFadeInUp}
            >
              I build responsive, production-ready web experiences with clean
              architecture, thoughtful interaction design, and a strong focus on
              usability across devices.
            </motion.p>

            <motion.div
              className='mt-8 flex flex-wrap gap-3'
              variants={accessibleFadeInUp}
            >
              {techStack.map((item) => (
                <span
                  key={item}
                  className='rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-blue-50/90 backdrop-blur'
                >
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div
              className='mt-10 flex flex-col gap-4 sm:flex-row sm:items-center'
              variants={accessibleFadeInUp}
            >
              <a href='#projects' aria-label='Scroll to projects section'>
                <MagicButton
                  title='Show my work'
                  icon={<ArrowDown />}
                  position='right'
                />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
