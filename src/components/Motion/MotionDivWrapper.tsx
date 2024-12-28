// src/components/common/MotionDivWrapper.tsx

'use client';

import React from 'react';
import { motion, HTMLMotionProps, PanInfo } from 'framer-motion';

type MotionDivWrapperProps = Omit<
  HTMLMotionProps<'div'>,
  'onDragStart' | 'onDrag' | 'onDragEnd'
> & {
  onDragStart?: (event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => void;
  onDrag?: (event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => void;
  onDragEnd?: (event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => void;
};

/**
 * A wrapper around <motion.div> that properly types the drag event handlers
 * to avoid conflicts with React's built-in DragEvent types.
 */
export const MotionDivWrapper = React.forwardRef<HTMLDivElement, MotionDivWrapperProps>(
  ({ children, ...rest }, ref) => {
    return (
      <motion.div ref={ref} {...rest}>
        {children}
      </motion.div>
    );
  }
);

MotionDivWrapper.displayName = 'MotionDivWrapper';
