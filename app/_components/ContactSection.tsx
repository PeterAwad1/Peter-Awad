'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useTouchDevice } from '@/lib/useTouchDevice';
import type { PersonalInfo } from '@/data/types';

// Dynamic import for ContactForm with loading state
const ContactForm = dynamic(() => import('./ContactForm').then((mod) => ({ default: mod.ContactForm })), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple"></div>
    </div>
  ),
  ssr: true,
});

interface ContactSectionProps {
  contactInfo: PersonalInfo;
  onSubmit?: (data: { name: string; email: string; message: string }) => Promise<void>;
}

export function ContactSection({ contactInfo, onSubmit }: ContactSectionProps) {
  const isTouchDevice = useTouchDevice();

  return (
    <section id="contact" className="py-20 md:py-32">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-12"
      >
        {/* Section Heading */}
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-white">
            Get In <span className="text-purple">Touch</span>
          </h2>
          <p className="text-lg text-white-100 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out. I&apos;m always open to discussing new opportunities and ideas.
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8"
        >
          {/* Email Link */}
          <a
            href={`mailto:${contactInfo.email}`}
            className={`group flex items-center gap-3 px-6 py-3 bg-black-200 border border-gray-700 rounded-lg transition-all min-h-[44px] ${
              !isTouchDevice 
                ? 'hover:border-purple hover:shadow-lg hover:shadow-purple/20' 
                : 'active:scale-95'
            }`}
            aria-label={`Email ${contactInfo.email}`}
          >
            <div className={`p-2 bg-purple/10 rounded-lg transition-colors ${
              !isTouchDevice ? 'group-hover:bg-purple/20' : ''
            }`}>
              <Mail className="w-5 h-5 text-purple" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-sm md:text-base text-white-100 font-medium">
                {contactInfo.email}
              </p>
            </div>
          </a>

          {/* Phone Link */}
          <a
            href={`tel:${contactInfo.phone}`}
            className={`group flex items-center gap-3 px-6 py-3 bg-black-200 border border-gray-700 rounded-lg transition-all min-h-[44px] ${
              !isTouchDevice 
                ? 'hover:border-purple hover:shadow-lg hover:shadow-purple/20' 
                : 'active:scale-95'
            }`}
            aria-label={`Call ${contactInfo.phone}`}
          >
            <div className={`p-2 bg-purple/10 rounded-lg transition-colors ${
              !isTouchDevice ? 'group-hover:bg-purple/20' : ''
            }`}>
              <Phone className="w-5 h-5 text-purple" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400">Phone</p>
              <p className="text-sm md:text-base text-white-100 font-medium">
                {contactInfo.phone}
              </p>
            </div>
          </a>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={fadeInUp}>
          <ContactForm onSubmit={onSubmit} />
        </motion.div>
      </motion.div>
    </section>
  );
}
