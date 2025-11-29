'use client';

import { Variants } from 'framer-motion';
import { Position, SLIDE_TRANSITION } from './types';

/**
 * Generate slide animation variants based on position
 * Uses improved spring physics for natural, fluid motion
 * Includes negative offset for premium fade-in effect
 */
export function createSlideVariants(position: Position): Variants {
  const getHiddenState = (pos: Position) => {
    switch (pos) {
      case 'top':
        return { y: '-120%', opacity: 0 }; // Negative offset
      case 'bottom':
        return { y: '120%', opacity: 0 };
      case 'left':
        return { x: '-120%', opacity: 0 };
      case 'right':
        return { x: '120%', opacity: 0 };
    }
  };

  const getExitState = (pos: Position) => {
    return {
      ...getHiddenState(pos),
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1], // Smooth ease-out
      },
    };
  };

  return {
    hidden: (customPos?: Position) => getHiddenState(customPos || position),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: SLIDE_TRANSITION,
    },
    exit: (customPos?: Position) => getExitState(customPos || position),
  };
}

/**
 * Determine drag axis based on position
 */
export function getDragAxis(position: Position): 'x' | 'y' {
  return position === 'left' || position === 'right' ? 'x' : 'y';
}

/**
 * Calculate drag constraints based on position
 * Prevents dragging in wrong direction
 */
export function getDragConstraints(position: Position) {
  switch (position) {
    case 'top':
      return { bottom: 0 }; // Can only drag down (negative y)
    case 'bottom':
      return { top: 0 }; // Can only drag up (positive y)
    case 'left':
      return { right: 0 }; // Can only drag right (negative x)
    case 'right':
      return { left: 0 }; // Can only drag left (positive x)
  }
}

/**
 * Get rounded edge classes based on position
 */
export function getRoundedClasses(
  position: Position,
  enabled: boolean,
): string {
  if (!enabled) return '';

  switch (position) {
    case 'top':
      return 'rounded-b-xl sm:rounded-b-2xl';
    case 'bottom':
      return 'rounded-t-xl sm:rounded-t-2xl';
    case 'left':
      return 'rounded-r-xl sm:rounded-r-2xl';
    case 'right':
      return 'rounded-l-xl sm:rounded-l-2xl';
  }
}
