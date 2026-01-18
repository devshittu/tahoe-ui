// src/components/Box/Box.tsx
'use client';

import React, {
  forwardRef,
  ElementType,
  ReactNode,
  HTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';
import type { BaseLayoutProps } from './types';

/**
 * Box - The foundation layout primitive
 *
 * A simple, composable container with spacing and visual props.
 * All components follow the 8pt grid system.
 *
 * @example
 * ```tsx
 * <Box p="4" bg="gray-100" rounded="lg">Content</Box>
 * <Box as="section" py="8" px="4">Section</Box>
 * ```
 */

export interface BoxProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>, BaseLayoutProps {
  /** Element to render as */
  as?: ElementType;
}

// Utility to build spacing classes
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
      // Margin
      buildClass('m', m),
      mx === 'auto' ? 'mx-auto' : buildClass('mx', mx),
      my === 'auto' ? 'my-auto' : buildClass('my', my),
      mt === 'auto' ? 'mt-auto' : buildClass('mt', mt),
      mr === 'auto' ? 'mr-auto' : buildClass('mr', mr),
      mb === 'auto' ? 'mb-auto' : buildClass('mb', mb),
      ml === 'auto' ? 'ml-auto' : buildClass('ml', ml),
      // Size
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
      position,
      z && `z-${z}`,
      className,
    );

    return (
      <Component ref={ref} className={classes || undefined} {...rest}>
        {children}
      </Component>
    );
  },
);

Box.displayName = 'Box';

export default Box;
