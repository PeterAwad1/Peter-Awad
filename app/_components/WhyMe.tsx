import Paragraph from '@/components/ui/Paragraph';

export default function WhyMeSection() {
  return (
    <main className='my-32 flex justify-center items-center flex-col'>
      <p className='uppercase tracking-widest text-xs text-center text-blue-100 max-w-80'>
        Why me?
      </p>
      <Paragraph Paragraph='I build modern, user-centered web applications with React and Next.js — focusing on performance, accessibility, and clean design. With a deep understanding of TypeScript, Tailwind CSS, shadcn/ui, and React Query, I craft seamless, responsive interfaces that not only look great but work flawlessly across every device.' />
    </main>
  );
}
