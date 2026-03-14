'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }
      }

      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass =
    'w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-white placeholder:text-blue-50/35 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/50 min-h-[48px]';

  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='w-full space-y-5'
      variants={fadeInUp}
      initial='initial'
      whileInView='animate'
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className='grid gap-5 md:grid-cols-2'>
        <div className='space-y-2'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-blue-50/85'
          >
            Name
          </label>
          <input
            id='name'
            type='text'
            {...register('name')}
            className={`${inputBaseClass} ${
              errors.name ? 'border-red-500/70' : 'border-white/10'
            }`}
            placeholder='Your name'
            disabled={isSubmitting}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-sm text-red-400'
            >
              {errors.name.message}
            </motion.p>
          )}
        </div>

        <div className='space-y-2'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-blue-50/85'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            {...register('email')}
            className={`${inputBaseClass} ${
              errors.email ? 'border-red-500/70' : 'border-white/10'
            }`}
            placeholder='your.email@example.com'
            disabled={isSubmitting}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-sm text-red-400'
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='message'
          className='block text-sm font-medium text-blue-50/85'
        >
          Message
        </label>
        <textarea
          id='message'
          rows={6}
          {...register('message')}
          className={`${inputBaseClass} resize-none py-4 ${
            errors.message ? 'border-red-500/70' : 'border-white/10'
          }`}
          placeholder='Tell me about your project, goals, or the role you have in mind.'
          disabled={isSubmitting}
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-sm text-red-400'
          >
            {errors.message.message}
          </motion.p>
        )}
      </div>

      <motion.button
        type='submit'
        disabled={isSubmitting}
        className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border px-6 py-3 font-medium text-white transition-all ${
          isSubmitting
            ? 'cursor-not-allowed border-white/10 bg-white/10 text-blue-50/60'
            : 'border-blue-400/30 bg-blue-500/15 hover:bg-blue-500/20 hover:border-blue-300/40'
        }`}
        whileHover={!isSubmitting ? { scale: 1.01 } : {}}
        whileTap={!isSubmitting ? { scale: 0.99 } : {}}
      >
        {isSubmitting ? (
          <span className='flex items-center justify-center gap-2'>
            <svg
              className='h-5 w-5 animate-spin'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
            Sending...
          </span>
        ) : (
          <>
            Send message
            <ArrowRight className='h-4 w-4' aria-hidden='true' />
          </>
        )}
      </motion.button>

      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className='rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-center text-emerald-200'
          role='status'
          aria-live='polite'
        >
          Thank you. Your message has been sent successfully.
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className='rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-center text-red-200'
          role='alert'
          aria-live='assertive'
        >
          Something went wrong. Please try again.
        </motion.div>
      )}
    </motion.form>
  );
}
