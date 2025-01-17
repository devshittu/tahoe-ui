'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type TypographyComponent<Props extends { children?: React.ReactNode }> =
  React.ComponentType<Props>;

interface TypingTextProps<T extends { children?: React.ReactNode }> {
  /** The text to display with typing animation. */
  text: string;
  /** The typography component to use (e.g., Heading, DisplayMedium). */
  TypographyComponent: TypographyComponent<T>;
  /** Additional props to pass to the typography component. */
  typographyProps: Omit<T, 'children'>; // Exclude `children` as it's handled internally.
  /** Optional className for additional styling. */
  className?: string;
}

const TypingText = <T extends { children?: React.ReactNode }>({
  text,
  TypographyComponent,
  typographyProps,
  className,
}: TypingTextProps<T>) => {
  return (
    <motion.div
      className={clsx('flex justify-center', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TypographyComponent {...(typographyProps as T)}>
        {text.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </TypographyComponent>
    </motion.div>
  );
};

export default TypingText;
