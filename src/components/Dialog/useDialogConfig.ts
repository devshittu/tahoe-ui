'use client';

import { DialogShowFrom } from './types';

export function useDialogConfig(showFrom: DialogShowFrom) {
  // Variants based on showFrom prop
  const variants = {
    hidden: (pos: DialogShowFrom) => {
      switch (pos) {
        case 'bottom':
          return { y: '100%', opacity: 0 };
        case 'top':
          return { y: '-100%', opacity: 0 };
        case 'left':
          return { x: '-100%', opacity: 0 };
        case 'right':
          return { x: '100%', opacity: 0 };
        default:
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
        case 'top':
          return { y: '-100%', opacity: 0, transition: { duration: 0.3 } };
        case 'left':
          return { x: '-100%', opacity: 0, transition: { duration: 0.3 } };
        case 'right':
          return { x: '100%', opacity: 0, transition: { duration: 0.3 } };
        default:
          return { y: '-100%', opacity: 0, transition: { duration: 0.3 } };
      }
    },
  };

  // Dialog always centered; responsive sizing
  // Use Tailwind classes for responsiveness (max-w-md, w-full on small, etc.)
  const dialogContainerClasses =
    'fixed inset-0 z-[20000] flex items-center justify-center px-4'; // z-index > PageMode

  const dialogClasses =
    'relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ' +
    'w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg ' +
    'overflow-hidden shadow-xl transition-all';

  return { variants, dialogContainerClasses, dialogClasses };
}
