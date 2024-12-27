'use client';

import { PageModePosition } from './PageMode';

type DragConstraints = Partial<{
  top: number;
  bottom: number;
  left: number;
  right: number;
}>;

export function usePageModeConfig(position: PageModePosition) {
  const variants = {
    hidden: (pos: PageModePosition) => {
      switch (pos) {
        case 'top':
          return { y: '-100%', opacity: 0 };
        case 'bottom':
          return { y: '100%', opacity: 0 };
        case 'left':
          return { x: '-100%', opacity: 0 };
        case 'right':
          return { x: '100%', opacity: 0 };
        default:
          return { y: '100%', opacity: 0 };
      }
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0, // No overshoot on open
      },
    },
    exit: (pos: PageModePosition) => {
      switch (pos) {
        case 'top':
          return { y: '-100%', opacity: 0, transition: { duration: 0.3 } };
        case 'bottom':
          return { y: '100%', opacity: 0, transition: { duration: 0.3 } };
        case 'left':
          return { x: '-100%', opacity: 0, transition: { duration: 0.3 } };
        case 'right':
          return { x: '100%', opacity: 0, transition: { duration: 0.3 } };
        default:
          return { y: '100%', opacity: 0, transition: { duration: 0.3 } };
      }
    },
  };

  const dragDirection: 'x' | 'y' =
    position === 'left' || position === 'right' ? 'x' : 'y';

  let dragConstraints: DragConstraints = {};
  const dragElastic = 0.1; // Slight rubber band

  switch (position) {
    case 'bottom':
      dragConstraints = { top: 0 };
      break;
    case 'top':
      dragConstraints = { bottom: 0 };
      break;
    case 'left':
      dragConstraints = { right: 0 };
      break;
    case 'right':
      dragConstraints = { left: 0 };
      break;
    default:
      dragConstraints = { top: 0 };
      break;
  }

  let layoutStyles: React.CSSProperties = {};
  switch (position) {
    case 'top':
      layoutStyles = { width: '100%', height: '80vh', top: 0, left: 0 };
      break;
    case 'bottom':
      layoutStyles = { width: '100%', height: '80vh', bottom: 0, left: 0 };
      break;
    case 'left':
      layoutStyles = { width: '80vw', height: '100%', top: 0, left: 0 };
      break;
    case 'right':
      layoutStyles = { width: '80vw', height: '100%', top: 0, right: 0 };
      break;
    default:
      layoutStyles = { width: '100%', height: '80vh', bottom: 0, left: 0 };
      break;
  }

  return {
    variants,
    dragDirection,
    dragConstraints,
    dragElastic,
    layoutStyles,
  };
}
// src/components/PageMode/usePageModeConfig.ts
