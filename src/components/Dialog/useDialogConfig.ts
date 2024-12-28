// 'use client';

// import type { DialogShowFrom } from './Dialog';

// /**
//  * useDialogConfig Hook
//  *
//  * Provides animation variants and class names based on the dialog's slide-in direction.
//  *
//  * @param showFrom - The direction from which the dialog slides in
//  * @returns An object containing animation variants and class names
//  */
// export function useDialogConfig(showFrom: DialogShowFrom) {
//   const variants = {
//     hidden: (pos: DialogShowFrom) => {
//       switch (pos) {
//         case 'bottom':
//           return { y: '100%', opacity: 0 };
//         case 'left':
//           return { x: '-100%', opacity: 0 };
//         case 'right':
//           return { x: '100%', opacity: 0 };
//         default:
//           // Default to 'top'
//           return { y: '-100%', opacity: 0 };
//       }
//     },
//     visible: {
//       x: 0,
//       y: 0,
//       opacity: 1,
//       transition: { type: 'spring', bounce: 0 },
//     },
//     exit: (pos: DialogShowFrom) => {
//       switch (pos) {
//         case 'bottom':
//           return { y: '100%', opacity: 0, transition: { duration: 0.3 } };
//         case 'left':
//           return { x: '-100%', opacity: 0, transition: { duration: 0.3 } };
//         case 'right':
//           return { x: '100%', opacity: 0, transition: { duration: 0.3 } };
//         default:
//           // Default to 'top'
//           return { y: '-100%', opacity: 0, transition: { duration: 0.3 } };
//       }
//     },
//   };

//   // Container classes for positioning and z-index
//   const dialogContainerClasses =
//     'fixed inset-0 z-[20000] flex items-center justify-center px-4';

//   // Base dialog classes with responsive sizing and styling
//   const dialogClasses =
//     'relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ' +
//     'w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg ' +
//     'overflow-hidden shadow-xl transition-all';

//   return { variants, dialogContainerClasses, dialogClasses };
// }

// // src/components/Dialog/useDialogConfig.ts

// src/components/Dialog/useDialogConfig.ts

'use client';

import { Variants } from 'framer-motion';
import type { DialogShowFrom } from './Dialog';

/**
 * useDialogConfig Hook
 *
 * Provides animation variants and class names based on the dialog's slide-in direction.
 *
 * @param showFrom - The direction from which the dialog slides in
 * @returns An object containing animation variants and class names
 */
export function useDialogConfig(showFrom: DialogShowFrom) {
  const variants: Variants = {
    hidden: (pos: DialogShowFrom) => {
      switch (pos) {
        case 'bottom':
          return { y: '100%', opacity: 0 };
        case 'left':
          return { x: '-100%', opacity: 0 };
        case 'right':
          return { x: '100%', opacity: 0 };
        default:
          // Default to 'top'
          return { y: '-100%', opacity: 0 };
      }
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type: 'spring', bounce: 0 },
    },
    exit: (pos: DialogShowFrom) => {
      switch (pos) {
        case 'bottom':
          return { y: '100%', opacity: 0, transition: { duration: 0.3 } };
        case 'left':
          return { x: '-100%', opacity: 0, transition: { duration: 0.3 } };
        case 'right':
          return { x: '100%', opacity: 0, transition: { duration: 0.3 } };
        default:
          // Default to 'top'
          return { y: '-100%', opacity: 0, transition: { duration: 0.3 } };
      }
    },
  };

  // Container classes for positioning and z-index
  const dialogContainerClasses =
    'fixed inset-0 z-[20000] flex items-center justify-center px-4';

  // Base dialog classes with responsive sizing and styling
  const dialogClasses =
    'relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ' +
    'w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg ' +
    'overflow-hidden shadow-xl transition-all';

  return { variants, dialogContainerClasses, dialogClasses };
}

// src/components/Dialog/useDialogConfig.ts
