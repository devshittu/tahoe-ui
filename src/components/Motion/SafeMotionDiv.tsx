// // src/components/Dialog/SafeMotionDiv.tsx

// 'use client';

// import React from 'react';
// import { motion, MotionProps } from 'framer-motion';

// /**
//  * SafeMotionDiv Component
//  *
//  * A wrapper around motion.div that strictly types the props to prevent
//  * passing unintended props that might cause TypeScript errors.
//  */
// type SafeMotionDivProps = Omit<MotionProps<'div'>, 'ref'> & {
//   children: React.ReactNode;
// };

// const SafeMotionDiv = React.forwardRef<HTMLDivElement, SafeMotionDivProps>(
//   ({ children, ...props }, ref) => {
//     return (
//       <motion.div {...props} ref={ref}>
//         {children}
//       </motion.div>
//     );
//   },
// );

// SafeMotionDiv.displayName = 'SafeMotionDiv';

// export default SafeMotionDiv;

// src/components/Dialog/SafeMotionDiv.tsx

'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

/**
 * SafeMotionDiv Component
 *
 * A wrapper around motion.div that strictly types the props to prevent
 * passing unintended props that might cause TypeScript errors.
 */
type SafeMotionDivProps = Omit<HTMLMotionProps<'div'>, 'ref'> & {
  children: React.ReactNode;
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

export default SafeMotionDiv;
