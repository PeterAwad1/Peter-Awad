'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useRef } from 'react';

const Paragraph = ({ Paragraph }: { Paragraph: string }) => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'end 0.25'],
  });
  const words = Paragraph.split(' ');

  return (
    <p
      className='text-center text-[40px] md:text-5xl lg:text-6xl flex flex-wrap leading-none items-center justify-center'
      ref={element}
    >
      {words.map((word, idx) => {
        const start = idx / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={idx} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

export default Paragraph;

const Word = ({ children, range, progress }: any) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span>
      <span className='mr-4 absolute opacity-20'>{children}</span>
      <motion.span style={{ opacity }} className='mr-4 mt-6 relative'>
        {children}
      </motion.span>
    </span>
  );
};
