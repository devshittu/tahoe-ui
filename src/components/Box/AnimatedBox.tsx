// src/components/Box/AnimatedBox.tsx
'use client';

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import BaseBox from './BaseBox';

type AnimatedBoxProps = {
  children: ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'zoom-in' | 'none';
  duration?: number;
  delay?: number;
  className?: string;
} & React.ComponentProps<typeof BaseBox>;

const animations = {
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
};

const AnimatedBox = ({
  children,
  animation = 'none',
  duration = 0.3,
  delay = 0,
  className,
  ...props
}: AnimatedBoxProps) => {
  const variant = animations[animation];

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variant}
        transition={{ duration, delay }}
        className={clsx(className)}
      >
        <BaseBox {...props}>{children}</BaseBox>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedBox;
