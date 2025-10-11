'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

// Enhanced ScrollReveal for progressive text reveal
export default function ScrollReveal({
  children,
  delay = 0,
  threshold = 0.2,
  staggerChildren = 0.1,
}: {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  staggerChildren?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false, // Changed to false for repeat animations
    margin: '-100px',
    amount: threshold,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// New component for staggered text reveal
export function StaggeredReveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: '-50px',
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Component for revealing text line by line
export function TextReveal({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: '-100px',
    amount: 0.5,
  });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: delay + i * 0.05,
              },
            },
          }}
          style={{ display: 'inline-block' }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
}

// Section wrapper with scroll progress
export function ScrollSection({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity, scale }}
      className={`min-h-screen flex items-center justify-center p-8 ${className}`}
    >
      <div className='max-w-4xl mx-auto'>{children}</div>
    </motion.section>
  );
}

// Usage example component
export function ExampleScrollPage() {
  return (
    <div className='space-y-0'>
      <ScrollSection id='section1' className='bg-white'>
        <div className='text-center'>
          <ScrollReveal>
            <h1 className='text-4xl font-bold mb-6'>Why me?</h1>
          </ScrollReveal>
          <StaggeredReveal>
            <motion.p
              className='text-xl text-gray-600 mb-4'
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              I don&apos;t follow trends; I design with purpose.
            </motion.p>
            <motion.p
              className='text-xl text-gray-600 mb-4'
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              I prioritize usability, clarity, and innovative solutions.
            </motion.p>
          </StaggeredReveal>
        </div>
      </ScrollSection>

      <ScrollSection id='section2' className='bg-gray-50'>
        <div className='text-center'>
          <TextReveal
            text="I always base my work on the context of the user, whether I'm wireframing, prototyping, or fine-tuning UI details."
            className='text-2xl leading-relaxed'
          />
        </div>
      </ScrollSection>

      <ScrollSection id='section3' className='bg-white'>
        <div className='text-center'>
          <ScrollReveal delay={0.2}>
            <h2 className='text-3xl font-bold mb-6'>Next Section</h2>
            <p className='text-xl text-gray-600'>
              Continue scrolling to see more content...
            </p>
          </ScrollReveal>
        </div>
      </ScrollSection>
    </div>
  );
}
