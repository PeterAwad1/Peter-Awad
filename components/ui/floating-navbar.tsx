'use client';
import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  // Active section highlighting based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => {
        const id = item.link.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id,
            top: rect.top,
            bottom: rect.bottom,
          };
        }
        return null;
      }).filter(Boolean);

      // Find the section that's currently in view
      const current = sections.find(
        (section) => section && section.top <= 100 && section.bottom > 100
      );

      if (current) {
        setActiveSection(`#${current.id}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Smooth scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const id = link.replace('#', '');
    const element = document.getElementById(id);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    // Close mobile menu after navigation
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <AnimatePresence mode='wait'>
        <motion.nav
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            'hidden md:flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black/80 bg-white/80 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-8 py-2 items-center justify-center space-x-4',
            className
          )}
          aria-label='Main navigation'
        >
          {navItems.map((navItem, idx) => (
            <a
              key={`link-${idx}`}
              href={navItem.link}
              onClick={(e) => handleNavClick(e, navItem.link)}
              className={cn(
                'relative items-center flex space-x-1 text-neutral-600 dark:text-neutral-50 hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors duration-200 px-4 py-2 text-sm font-medium',
                activeSection === navItem.link && 'text-blue-600 dark:text-blue-400'
              )}
              aria-current={activeSection === navItem.link ? 'page' : undefined}
            >
              <span>{navItem.name}</span>
              {activeSection === navItem.link && (
                <motion.span
                  layoutId='active-indicator'
                  className='absolute inset-x-0 -bottom-px h-0.5 bg-blue-600 dark:bg-blue-400'
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  aria-hidden='true'
                />
              )}
            </a>
          ))}
        </motion.nav>
      </AnimatePresence>

      {/* Mobile Navigation - Hamburger Button */}
      <motion.button
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className='md:hidden fixed top-6 right-6 z-[5001] p-3 rounded-full border border-transparent dark:border-white/[0.2] dark:bg-black/80 bg-white/80 backdrop-blur-md shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center'
        aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls='mobile-navigation'
      >
        {mobileMenuOpen ? (
          <X className='w-6 h-6 text-neutral-900 dark:text-neutral-50' aria-hidden='true' />
        ) : (
          <Menu className='w-6 h-6 text-neutral-900 dark:text-neutral-50' aria-hidden='true' />
        )}
      </motion.button>

      {/* Mobile Navigation - Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className='md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[4999]'
              aria-hidden='true'
            />

            {/* Drawer */}
            <motion.nav
              id='mobile-navigation'
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className='md:hidden fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-black border-l border-neutral-200 dark:border-white/[0.2] z-[5000] p-6 overflow-y-auto'
              aria-label='Mobile navigation'
            >
              <div className='flex flex-col space-y-6 mt-20'>
                {navItems.map((navItem, idx) => (
                  <a
                    key={`mobile-link-${idx}`}
                    href={navItem.link}
                    onClick={(e) => handleNavClick(e, navItem.link)}
                    className={cn(
                      'text-lg font-medium transition-colors duration-200 px-4 py-2 rounded-lg',
                      activeSection === navItem.link
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30'
                        : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                    )}
                    aria-current={activeSection === navItem.link ? 'page' : undefined}
                  >
                    {navItem.name}
                  </a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
