'use client';

import MagicButton from '@/components/MagicButton';
import { Spotlight } from '@/components/ui/spotlight';
import { personalInfo } from '@/data';
import { 
  fadeInUp, 
  staggerContainer, 
  usePrefersReducedMotion,
  getAccessibleVariants 
} from '@/lib/animations';
import { motion, Variants } from 'framer-motion';

import { ArrowDown, MapPin } from 'lucide-react';
import React from 'react';

const HeroSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Get accessible variants based on user preference
  const accessibleFadeInUp = getAccessibleVariants(fadeInUp, prefersReducedMotion);
  const accessibleStaggerContainer = getAccessibleVariants(staggerContainer, prefersReducedMotion);

  // Scroll indicator bounce animation
  const scrollIndicatorVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className='py-32'>
      <div>
        <Spotlight
          className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen'
          fill='white'
        />
        <Spotlight
          className='h-[80vh] w-[50vw] top-10 left-full'
          fill='purple'
        />
        <Spotlight className='left-80 top-28 h-[80vh] w-[50vw]' fill='blue' />
      </div>

      <div
        className='h-screen w-full dark:bg-background bg-white dark:bg-grid-white/[0.3] bg-grid-background/[0.2]
       absolute top-0 left-0 flex items-center justify-center'
      >
        <div
          className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'
        />
      </div>

      <div className='flex justify-center relative my-20 z-10'>
        <motion.div 
          className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'
          variants={accessibleStaggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            id='hero-heading'
            className='text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-4'
            variants={accessibleFadeInUp}
          >
            {personalInfo.name}
          </motion.h1>
          
          <motion.h2 
            className='text-center text-2xl md:text-3xl lg:text-4xl text-blue-100 mb-4'
            variants={accessibleFadeInUp}
          >
            {personalInfo.title}
          </motion.h2>
          
          <motion.div 
            className='flex items-center gap-2 text-center md:tracking-wider mb-6 text-sm md:text-lg'
            variants={accessibleFadeInUp}
          >
            <MapPin className='w-4 h-4 md:w-5 md:h-5' aria-hidden='true' />
            <span>{personalInfo.location}</span>
          </motion.div>

          <motion.p 
            className='uppercase tracking-widest text-sm text-center text-blue-100 max-w-80 mb-6'
            variants={accessibleFadeInUp}
          >
            React • Next.js • TypeScript • Tailwind CSS
          </motion.p>

          <motion.div
            variants={accessibleFadeInUp}
          >
            <a href='#about' aria-label='Scroll to about section'>
              <MagicButton
                title='Show my work'
                icon={<ArrowDown />}
                position='right'
              />
            </a>
          </motion.div>

          {/* Scroll indicator with bounce animation */}
          <motion.div
            className='absolute bottom-8 left-1/2 -translate-x-1/2'
            variants={prefersReducedMotion ? { initial: {}, animate: {} } : scrollIndicatorVariants}
            initial="initial"
            animate="animate"
            aria-hidden='true'
          >
            <ArrowDown className='w-6 h-6 text-blue-100 opacity-50' />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
