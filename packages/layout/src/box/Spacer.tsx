'use client';

import React from 'react';
import { cn } from '@tahoe-ui/core';

/**
 * Spacer - Pure structural spacing element
 *
 * A non-visual primitive that creates intentional whitespace between elements.
 * Follows the 8pt grid system for consistent spacing.
 *
 * Reference: design-principles.md
 * - #3 Intentional White Space: Space is a design element, not emptiness
 * - #4 System-Level Consistency: All spacing derives from single source of truth
 *
 * Features:
 * - 8pt grid-aligned sizes (8, 16, 24, 32, 48, 64, 96, 128px)
 * - Vertical or horizontal orientation
 * - No children - purely structural
 * - Responsive size variants
 *
 * @example
 * ```tsx
 * // Default vertical spacer (32px)
 * <Heading>Title</Heading>
 * <Spacer />
 * <Paragraph>Content</Paragraph>
 *
 * // Custom size
 * <Spacer size="6" /> // 48px
 *
 * // Horizontal spacer (inline)
 * <Flex>
 *   <Icon />
 *   <Spacer direction="horizontal" size="2" />
 *   <Text>Label</Text>
 * </Flex>
 *
 * // Responsive spacer
 * <Spacer size="4" mdSize="6" lgSize="8" />
 * ```
 */

export type SpacerSize =
  | '1' // 8px
  | '2' // 16px
  | '3' // 24px
  | '4' // 32px
  | '6' // 48px
  | '8' // 64px
  | '12' // 96px
  | '16'; // 128px

export type SpacerDirection = 'vertical' | 'horizontal';

export interface SpacerProps {
  /** Size following 8pt grid (default: '4' = 32px) */
  size?: SpacerSize;
  /** Direction of spacing (default: 'vertical') */
  direction?: SpacerDirection;
  /** Responsive: size on small screens and up */
  smSize?: SpacerSize;
  /** Responsive: size on medium screens and up */
  mdSize?: SpacerSize;
  /** Responsive: size on large screens and up */
  lgSize?: SpacerSize;
  /** Additional className for overrides */
  className?: string;
  /** Accessible label for screen readers */
  'aria-hidden'?: boolean;
}

/**
 * Vertical spacing classes (height)
 * Following 8pt grid: 8, 16, 24, 32, 48, 64, 96, 128px
 */
const VERTICAL_SIZES: Record<SpacerSize, string> = {
  '1': 'h-2', // 8px
  '2': 'h-4', // 16px
  '3': 'h-6', // 24px
  '4': 'h-8', // 32px
  '6': 'h-12', // 48px
  '8': 'h-16', // 64px
  '12': 'h-24', // 96px
  '16': 'h-32', // 128px
};

/**
 * Horizontal spacing classes (width)
 */
const HORIZONTAL_SIZES: Record<SpacerSize, string> = {
  '1': 'w-2', // 8px
  '2': 'w-4', // 16px
  '3': 'w-6', // 24px
  '4': 'w-8', // 32px
  '6': 'w-12', // 48px
  '8': 'w-16', // 64px
  '12': 'w-24', // 96px
  '16': 'w-32', // 128px
};

/**
 * Responsive size class generators
 */
const getResponsiveClass = (
  size: SpacerSize,
  direction: SpacerDirection,
  prefix: string,
): string => {
  const sizeMap = direction === 'vertical' ? VERTICAL_SIZES : HORIZONTAL_SIZES;
  const baseClass = sizeMap[size];
  // Extract the h-X or w-X part and add the prefix
  return baseClass.replace(/^(h|w)-/, `${prefix}:$1-`);
};

function Spacer({
  size = '4',
  direction = 'vertical',
  smSize,
  mdSize,
  lgSize,
  className,
  'aria-hidden': ariaHidden = true,
}: SpacerProps) {
  const sizeMap = direction === 'vertical' ? VERTICAL_SIZES : HORIZONTAL_SIZES;
  const baseClass = sizeMap[size];

  // Build responsive classes
  const responsiveClasses = [
    smSize && getResponsiveClass(smSize, direction, 'sm'),
    mdSize && getResponsiveClass(mdSize, direction, 'md'),
    lgSize && getResponsiveClass(lgSize, direction, 'lg'),
  ].filter(Boolean);

  return (
    <div
      className={cn(
        // Base display
        direction === 'horizontal' ? 'inline-block' : 'block',
        // Base size
        baseClass,
        // Shrink prevention
        'flex-shrink-0',
        // Responsive sizes
        ...responsiveClasses,
        // Custom overrides
        className,
      )}
      aria-hidden={ariaHidden}
    />
  );
}

Spacer.displayName = 'Spacer';

export { Spacer };
export default Spacer;
