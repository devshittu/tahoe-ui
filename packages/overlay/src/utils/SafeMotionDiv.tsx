'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

/**
 * SafeMotionDiv - A wrapper around motion.div with strict typing
 */
type SafeMotionDivProps = Omit<HTMLMotionProps<'div'>, 'ref'> & {
  children?: React.ReactNode;
};

const SafeMotionDiv = React.forwardRef<HTMLDivElement, SafeMotionDivProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div {...props} ref={ref}>
        {children}
      </motion.div>
    );
  },
);

SafeMotionDiv.displayName = 'SafeMotionDiv';

export { SafeMotionDiv };
export default SafeMotionDiv;
