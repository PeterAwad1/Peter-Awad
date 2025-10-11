'use client';
import { motion } from 'framer-motion';
import {
  StaggeredReveal,
  TextReveal,
  ScrollSection,
} from '@/components/ui/ScrollReveal';

export default function WhyMeSection() {
  return (
    <ScrollSection
      id='why-me'
      className='py-32 bg-background dark:bg-background text-center px-4'
    >
      <div className='max-w-4xl mx-auto'>
        {/* Section label */}
        <div className='mb-12'>
          <TextReveal
            text='Why me?'
            className='uppercase tracking-widest text-xs text-center text-blue-100 max-w-80'
            delay={1}
          />
        </div>

        {/* Main heading */}
        <StaggeredReveal className='mb-12'>
          <motion.h2
            className='text-3xl md:text-5xl font-semibold mb-4 text-neutral-900 dark:text-white'
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: 'easeOut' },
              },
            }}
          >
            I don&apos;t just build websites;
          </motion.h2>
          <motion.h2
            className='text-3xl md:text-5xl font-semibold text-neutral-900 dark:text-white'
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
              },
            }}
          >
            I craft{' '}
            <span className='font-bold text-blue-600 dark:text-blue-400'>
              modern web experiences.
            </span>
          </motion.h2>
        </StaggeredReveal>

        {/* Description */}
        <div className='max-w-3xl mx-auto'>
          <StaggeredReveal>
            <motion.p
              className='text-neutral-600 dark:text-neutral-300 text-lg md:text-xl leading-relaxed mb-6'
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: 'easeOut' },
                },
              }}
            >
              My focus is building fast, responsive, and visually engaging
              applications using React.js, Next.js, and TypeScript.
            </motion.p>
            <motion.p
              className='text-neutral-600 dark:text-neutral-300 text-lg md:text-xl leading-relaxed'
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 },
                },
              }}
            >
              I value clean code, smooth user experiences, and scalable frontend
              architecture that lasts.
            </motion.p>
          </StaggeredReveal>

          {/* Skill highlights */}
          <StaggeredReveal>
            <motion.p
              className='text-neutral-700 dark:text-neutral-200 text-lg md:text-2xl font-medium leading-relaxed mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700'
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 },
                },
              }}
            >
              I combine performance, precision, and design clarity through:
            </motion.p>
            <motion.div
              className='flex flex-wrap justify-center gap-2 mt-4'
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delay: 0.5 },
                },
              }}
            >
              {[
                'React + Next.js development',
                'TypeScript architecture',
                'UI design with Tailwind & shadcn/ui',
                'Data handling with React Query',
              ].map((item) => (
                <motion.span
                  key={item}
                  className='px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium'
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.5, ease: 'backOut' },
                    },
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </StaggeredReveal>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className='mt-16 flex flex-col items-center justify-center opacity-60'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className='text-sm text-neutral-500 mb-2'>
            Scroll to continue
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className='w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center'
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className='w-1 h-3 bg-neutral-400 rounded-full mt-2'
            />
          </motion.div>
        </motion.div>
      </div>
    </ScrollSection>
  );
}
