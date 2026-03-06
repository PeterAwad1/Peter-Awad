'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fadeInUp } from '@/lib/animations';
import { useTouchDevice } from '@/lib/useTouchDevice';
import type { SocialMediaLink } from '@/data/types';
import Image from 'next/image';

interface FooterProps {
  socialMedia: SocialMediaLink[];
  copyright?: string;
}

export function Footer({ socialMedia, copyright }: FooterProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isTouchDevice = useTouchDevice();

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 400px
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();
  const copyrightText = copyright || `© ${currentYear} Peter Elishea Abdelaty Awad. All rights reserved.`;

  return (
    <footer className="relative py-12 border-t border-gray-800">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="space-y-8"
      >
        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          {socialMedia.map((social) => (
            <motion.a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-3 bg-black-200 border border-gray-700 rounded-lg transition-all min-w-[44px] min-h-[44px] flex items-center justify-center ${
                !isTouchDevice 
                  ? 'hover:border-purple hover:shadow-lg hover:shadow-purple/20' 
                  : 'active:scale-95'
              }`}
              whileHover={!isTouchDevice ? { scale: 1.1, y: -2 } : undefined}
              whileTap={{ scale: 0.95 }}
              aria-label={`Visit ${social.platform} profile`}
            >
              <Image
                src={social.icon}
                alt={`${social.platform} icon`}
                width={24}
                height={24}
                className={`w-6 h-6 transition-opacity ${
                  !isTouchDevice ? 'opacity-80 group-hover:opacity-100' : 'opacity-100'
                }`}
                priority={false}
              />
              
              {/* Tooltip - only show on non-touch devices */}
              {!isTouchDevice && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black-200 border border-gray-700 rounded text-sm text-white-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {social.platform}
                </span>
              )}
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-400">{copyrightText}</p>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 p-3 bg-purple rounded-full shadow-lg shadow-purple/50 hover:shadow-xl hover:shadow-purple/60 transition-all z-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            whileHover={!isTouchDevice ? { scale: 1.1, y: -2 } : undefined}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6 text-white" aria-hidden="true" />
          </motion.button>
        )}
      </motion.div>
    </footer>
  );
}
