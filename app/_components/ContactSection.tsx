'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useTouchDevice } from '@/lib/useTouchDevice';
import type { PersonalInfo } from '@/data/types';

const ContactForm = dynamic(
  () => import('./ContactForm').then((mod) => ({ default: mod.ContactForm })),
  {
    loading: () => (
      <div className='flex items-center justify-center py-12'>
        <div className='h-12 w-12 animate-spin rounded-full border-y-2 border-blue-400' />
      </div>
    ),
    ssr: true,
  },
);

interface ContactSectionProps {
  contactInfo: PersonalInfo;
  onSubmit?: (data: {
    name: string;
    email: string;
    message: string;
  }) => Promise<void>;
}

const contactItems = (contactInfo: PersonalInfo) => [
  {
    label: 'Email',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    icon: Mail,
  },
  {
    label: 'Phone',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone}`,
    icon: Phone,
  },
  {
    label: 'Location',
    value: contactInfo.location,
    href: '#contact',
    icon: MapPin,
  },
];

export function ContactSection({ contactInfo, onSubmit }: ContactSectionProps) {
  const isTouchDevice = useTouchDevice();

  return (
    <section
      id='contact'
      className='relative overflow-hidden py-16 md:py-24 lg:py-28'
    >
      <div aria-hidden='true' className='absolute inset-0 ' />

      <motion.div
        variants={staggerContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, amount: 0.2 }}
        className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm md:p-8 lg:p-10'
      >
        <div className='absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent' />

        <div className='grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start'>
          <motion.div variants={fadeInUp} className='space-y-6'>
            <div className='inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-blue-100'>
              <Sparkles className='h-4 w-4' aria-hidden='true' />
              Contact
            </div>

            <div className='space-y-4'>
              <h2
                id='contact-heading'
                className='max-w-xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl'
              >
                Let&apos;s build something clear, modern, and useful.
              </h2>
              <p className='max-w-xl text-sm leading-7 text-blue-50/75 md:text-base'>
                If you have a project, freelance opportunity, or frontend role
                in mind, send me a message. I&apos;m happy to discuss ideas,
                product goals, and how we can improve the user experience
                together.
              </p>
            </div>

            <div className='grid gap-4'>
              {contactItems(contactInfo).map(
                ({ label, value, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className={`group flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-4 transition-all duration-300 ${
                      href !== '#contact' && !isTouchDevice
                        ? 'hover:border-blue-400/30 hover:bg-slate-950/50'
                        : ''
                    }`}
                    aria-label={`${label} ${value}`}
                  >
                    <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200'>
                      <Icon className='h-5 w-5' aria-hidden='true' />
                    </div>
                    <div className='min-w-0'>
                      <p className='text-xs uppercase tracking-[0.2em] text-blue-200/65'>
                        {label}
                      </p>
                      <p className='mt-1 break-words text-sm font-medium text-white md:text-base'>
                        {value}
                      </p>
                    </div>
                  </a>
                ),
              )}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className='rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-5 md:p-6'>
              <div className='mb-5'>
                <p className='text-xs uppercase tracking-[0.24em] text-blue-200/70'>
                  Send Message
                </p>
                <h3 className='mt-2 text-xl font-semibold text-white md:text-2xl'>
                  Tell me about your project
                </h3>
              </div>

              <ContactForm onSubmit={onSubmit} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
