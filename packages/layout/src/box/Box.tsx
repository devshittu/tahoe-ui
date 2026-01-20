'use client';

import React, { forwardRef, ElementType, HTMLAttributes } from 'react';
import { cn } from '@tahoe-ui/core';
import type { BaseLayoutProps } from '../types';

/**
 * Box - Foundation layout primitive
 *
 * The most basic layout building block. A polymorphic component that renders
 * any HTML element with consistent spacing, sizing, and visual props.
 *
 * Reference: design-principles.md
 * - #3 Intentional White Space: 8pt grid spacing props
 * - #4 System-Level Consistency: Token-based values
 *
 * @example
 * ```tsx
 * <Box p="4" bg="gray-100" rounded="lg">
 *   Content with padding, background, and rounded corners
 * </Box>
 *
 * <Box as="section" py="8" px="4">
 *   Semantic section element
 * </Box>
 * ```
 */

export interface BoxProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>, BaseLayoutProps {
  as?: ElementType;
}

const buildClass = (prefix: string, value?: string): string | undefined => {
  if (!value) return undefined;
  return `${prefix}-${value}`;
};

const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as: Component = 'div',
      children,
      className,
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      w,
      h,
      minW,
      maxW,
      minH,
      maxH,
      rounded,
      shadow,
      bg,
      overflow,
      position,
      z,
      ...rest
    },
    ref,
  ) => {
    const classes = cn(
      // Padding
      buildClass('p', p),
      buildClass('px', px),
      buildClass('py', py),
      buildClass('pt', pt),
      buildClass('pr', pr),
      buildClass('pb', pb),
      buildClass('pl', pl),

      // Margin (with auto support)
      m === 'auto' ? 'm-auto' : buildClass('m', m),
      mx === 'auto' ? 'mx-auto' : buildClass('mx', mx),
      my === 'auto' ? 'my-auto' : buildClass('my', my),
      mt === 'auto' ? 'mt-auto' : buildClass('mt', mt),
      mr === 'auto' ? 'mr-auto' : buildClass('mr', mr),
      mb === 'auto' ? 'mb-auto' : buildClass('mb', mb),
      ml === 'auto' ? 'ml-auto' : buildClass('ml', ml),

      // Dimensions
      w && `w-${w}`,
      h && `h-${h}`,
      minW && (minW === '0' ? 'min-w-0' : `min-w-${minW}`),
      maxW && `max-w-${maxW}`,
      minH &&
        (minH === '0'
          ? 'min-h-0'
          : minH === 'screen'
            ? 'min-h-screen'
            : `min-h-${minH}`),
      maxH && (maxH === 'screen' ? 'max-h-screen' : `max-h-${maxH}`),

      // Visual
      rounded && (rounded === 'base' ? 'rounded' : `rounded-${rounded}`),
      shadow && (shadow === 'base' ? 'shadow' : `shadow-${shadow}`),
      bg && `bg-${bg}`,
      overflow && `overflow-${overflow}`,

      // Positioning
      position,
      z && `z-${z}`,

      className,
    );

    return (
      <Component ref={ref} className={classes} {...rest}>
        {children}
      </Component>
    );
  },
);

Box.displayName = 'Box';

export { Box };
export default Box;
