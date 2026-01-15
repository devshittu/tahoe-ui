// src/app/playground/modal/components/shared/animations.ts
'use client';

import { Variants } from 'framer-motion';
import { Position, SLIDE_TRANSITION } from './types';
import { MOTION_TOKENS, SPACING_TOKENS } from '@/config/tokens';

/**
 * Generate slide animation variants based on position
 *
 * Features:
 * - Spring physics for natural, fluid motion
 * - Negative offset for premium fade-in effect
 * - Reduced motion support (opacity-only transitions)
 *
 * @param position - Modal position (top/bottom/left/right)
 * @param prefersReducedMotion - Whether to use simplified animations
 */
export function createSlideVariants(
  position: Position,
  prefersReducedMotion = false,
): Variants {
  // Reduced motion: simple opacity transition without position changes
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: MOTION_TOKENS.duration.fast / 1000,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: MOTION_TOKENS.duration.fast / 1000,
        },
      },
    };
  }

  // Full motion: position-based slide animations
  const getHiddenState = (pos: Position) => {
    switch (pos) {
      case 'top':
        return { y: '-120%', opacity: 0 };
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
        duration: MOTION_TOKENS.duration.base / 1000,
        ease: MOTION_TOKENS.easing.smooth,
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
 * Calculate drag constraints based on close direction
 *
 * For PageMode (edge-attached): strict uni-directional, only towards close
 * For Dialog (centered): allows slight bi-directional with elastic
 */
export function getDragConstraints(
  closeDirection: Position,
  options: { allowBidirectional?: boolean; elasticLimit?: number } = {},
) {
  const { allowBidirectional = false, elasticLimit = 50 } = options;

  // Bi-directional mode for centered modals (Dialog)
  if (allowBidirectional) {
    switch (closeDirection) {
      case 'top':
        return { top: -9999, bottom: elasticLimit };
      case 'bottom':
        return { top: -elasticLimit, bottom: 9999 };
      case 'left':
        return { left: -9999, right: elasticLimit };
      case 'right':
        return { left: -elasticLimit, right: 9999 };
    }
  }

  // Uni-directional mode for edge panels (PageMode) - original behavior
  switch (closeDirection) {
    case 'top':
      return { bottom: 0 }; // Can only drag up
    case 'bottom':
      return { top: 0 }; // Can only drag down
    case 'left':
      return { right: 0 }; // Can only drag left
    case 'right':
      return { left: 0 }; // Can only drag right
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

/**
 * Get content padding class based on handlebar position
 * Uses token-based values for handlebar clearance
 */
export function getContentPadding(handlebarPosition: Position): string {
  const clearance = SPACING_TOKENS.padding.handlebarClearance;

  switch (handlebarPosition) {
    case 'top':
      return `pt-14 pb-4 px-4`; // 56px top for handlebar + breathing room
    case 'bottom':
      return `pt-4 pb-14 px-4`;
    case 'left':
      return `pl-14 pr-4 py-4`;
    case 'right':
      return `pr-14 pl-4 py-4`;
  }
}
