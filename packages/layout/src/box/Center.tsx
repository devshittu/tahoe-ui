'use client';

import React, { forwardRef, ElementType, HTMLAttributes } from 'react';
import { cn } from '@tahoe-ui/core';
import type { BaseLayoutProps } from '../types';

/**
 * Center - Centering utility primitive
 *
 * A specialized flex container for centering content horizontally,
 * vertically, or both. Simplifies common centering patterns.
 *
 * Reference: design-principles.md
 * - #11 Content-First Layout: Easy content centering
 *
 * @example
 * ```tsx
 * // Center both axes (default)
 * <Center h="screen">
 *   <LoginForm />
 * </Center>
 *
 * // Horizontal only
 * <Center horizontal>
 *   <Logo />
 * </Center>
 *
 * // Vertical only
 * <Center vertical h="full">
 *   <Sidebar />
 * </Center>
 *
 * // Inline centering
 * <Center inline p="2">
 *   <Icon />
 * </Center>
 * ```
 */

export interface CenterOwnProps {
  /** Center only horizontally */
  horizontal?: boolean;
  /** Center only vertically */
  vertical?: boolean;
  /** Use inline-flex instead of flex */
  inline?: boolean;
}

export interface CenterProps
  extends
    Omit<HTMLAttributes<HTMLElement>, 'color'>,
    BaseLayoutProps,
    CenterOwnProps {
  as?: ElementType;
}

const buildClass = (prefix: string, value?: string): string | undefined => {
  if (!value) return undefined;
  return `${prefix}-${value}`;
};

const Center = forwardRef<HTMLElement, CenterProps>(
  (
    {
      as: Component = 'div',
      children,
      className,
      horizontal,
      vertical,
      inline,
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
    // If neither horizontal nor vertical specified, center both
    const centerBoth = !horizontal && !vertical;
    const justifyCenter = centerBoth || horizontal;
    const alignCenter = centerBoth || vertical;

    const classes = cn(
      inline ? 'inline-flex' : 'flex',
      justifyCenter && 'justify-center',
      alignCenter && 'items-center',

      // Padding
      buildClass('p', p),
      buildClass('px', px),
      buildClass('py', py),
      buildClass('pt', pt),
      buildClass('pr', pr),
      buildClass('pb', pb),
      buildClass('pl', pl),

      // Margin
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

Center.displayName = 'Center';

export { Center };
export default Center;
