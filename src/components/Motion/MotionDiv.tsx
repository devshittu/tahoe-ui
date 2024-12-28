// import React, { MutableRefObject, CSSProperties, forwardRef } from 'react';
// import { motion, HTMLMotionProps } from 'framer-motion';

// type MotionDivProps = Omit<HTMLMotionProps<'div'>, 'onAnimationStart'> & {
//   ref?: MutableRefObject<HTMLDivElement | null>;
//   tabIndex?: number;
//   style?: CSSProperties;
//   className?: string;
//   onAnimationStart?: (definition: string) => void; // Corrected type for framer-motion
// };

// const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>((props, ref) => {
//   return <motion.div {...props} ref={ref} />;
// });

// MotionDiv.displayName = 'MotionDiv';

// export default MotionDiv;

// src/components/PageMode/MotionDiv.tsx
'use client';

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps, PanInfo } from 'framer-motion';

/**
 * We omit the standard React onDrag events and define
 * Framer Motion's event signatures (mouse, touch, pointer).
 */
type SafeMotionDivProps = Omit<
  HTMLMotionProps<'div'>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'ref'
> & {
  onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragStart?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
};

/**
 * A ref-forwarding component that wraps <motion.div>
 * and aligns with Framer Motion's drag event signatures.
 */
export const MotionDiv = forwardRef<HTMLDivElement, SafeMotionDivProps>(
  (props, ref) => {
    return <motion.div ref={ref} {...props} />;
  }
);

MotionDiv.displayName = 'MotionDiv';
