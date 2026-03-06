'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
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
import { GraduationCap, MapPin, Award } from 'lucide-react';
import Image from 'next/image';

const AboutSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchDevice = useTouchDevice();
  const accessibleFadeInUp = getAccessibleVariants(fadeInUp, prefersReducedMotion);
  const accessibleStaggerContainer = getAccessibleVariants(
    staggerContainer,
    prefersReducedMotion
  );

  // Key skills to highlight
  const keySkills = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'ShadCN/UI'];

  // Function to highlight key skills in the summary text
  const highlightSkills = (text: string) => {
    const parts = text.split(new RegExp(`(${keySkills.join('|')})`, 'gi'));
    return parts.map((part, index) => {
      if (keySkills.some((skill) => skill.toLowerCase() === part.toLowerCase())) {
        return (
          <span
            key={index}
            className='font-semibold text-blue-500 dark:text-blue-400'
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section id='about' className='py-16 md:py-24 lg:py-32'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <SectionHeading
          id='about-heading'
          title='About Me'
          subtitle='Get to know my background and expertise'
          align='center'
        />

        <motion.div
          variants={accessibleStaggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={viewportConfig}
          className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'
        >
          {/* Professional Summary */}
          <motion.div
            variants={accessibleFadeInUp}
            className='lg:col-span-2 space-y-6'
          >
            <Card hoverable={false}>
              <h3 className='text-2xl font-bold mb-4'>Professional Summary</h3>
              <p className='text-base md:text-lg leading-relaxed text-muted-foreground'>
                {highlightSkills(personalInfo.summary)}
              </p>
            </Card>
          </motion.div>

          {/* Profile Image */}
          {personalInfo.profileImage && (
            <motion.div variants={accessibleFadeInUp} className='lg:col-span-1'>
              <Card hoverable={false} className='overflow-hidden'>
                <div className='relative w-full aspect-square group'>
                  <Image
                    src={personalInfo.profileImage}
                    alt={`${personalInfo.name} - Profile Picture`}
                    fill
                    className={`object-cover rounded-lg transition-transform duration-300 ${
                      !isTouchDevice ? 'group-hover:scale-105' : ''
                    }`}
                    sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    priority={false}
                  />
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Education Section */}
        <motion.div
          variants={accessibleStaggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={viewportConfig}
        >
          <h3 className='text-2xl md:text-3xl font-bold mb-8 text-center'>
            Education & Training
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {education.map((edu) => (
              <motion.div key={edu.id} variants={accessibleFadeInUp}>
                <Card hoverable className='h-full'>
                  <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0'>
                      {edu.type === 'degree' ? (
                        <div className='w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center'>
                          <GraduationCap className='w-6 h-6 text-blue-600 dark:text-blue-400' aria-hidden='true' />
                        </div>
                      ) : (
                        <div className='w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center'>
                          <Award className='w-6 h-6 text-purple-600 dark:text-purple-400' aria-hidden='true' />
                        </div>
                      )}
                    </div>

                    <div className='flex-1 min-w-0'>
                      <h4 className='text-lg font-semibold mb-2 leading-tight'>
                        {edu.degree}
                      </h4>

                      <div className='space-y-2'>
                        <p className='text-sm font-medium text-muted-foreground'>
                          {edu.institution}
                        </p>

                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                          <MapPin className='w-4 h-4 flex-shrink-0' aria-hidden='true' />
                          <span>{edu.location}</span>
                        </div>

                        <div className='flex flex-wrap items-center gap-2 mt-3'>
                          <Badge
                            text={edu.graduationYear}
                            variant='primary'
                            size='sm'
                          />
                          {edu.gpa && (
                            <Badge
                              text={`GPA: ${edu.gpa}`}
                              variant='secondary'
                              size='sm'
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
