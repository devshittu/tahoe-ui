// src/components/Box/Center.tsx
'use client';

import React, { forwardRef, ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import type { BaseLayoutProps } from './types';

/**
 * Center - Centering utility primitive
 *
 * @example
 * ```tsx
 * <Center h="screen">
 *   <LoginForm />
 * </Center>
 * <Center horizontal>
 *   <Logo />
 * </Center>
 * ```
 */

export interface CenterOwnProps {
  horizontal?: boolean;
  vertical?: boolean;
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
    const centerBoth = !horizontal && !vertical;
    const justifyCenter = centerBoth || horizontal;
    const alignCenter = centerBoth || vertical;

    const classes = cn(
      inline ? 'inline-flex' : 'flex',
      justifyCenter && 'justify-center',
      alignCenter && 'items-center',
      buildClass('p', p),
      buildClass('px', px),
      buildClass('py', py),
      buildClass('pt', pt),
      buildClass('pr', pr),
      buildClass('pb', pb),
      buildClass('pl', pl),
      buildClass('m', m),
      mx === 'auto' ? 'mx-auto' : buildClass('mx', mx),
      my === 'auto' ? 'my-auto' : buildClass('my', my),
      mt === 'auto' ? 'mt-auto' : buildClass('mt', mt),
      mr === 'auto' ? 'mr-auto' : buildClass('mr', mr),
      mb === 'auto' ? 'mb-auto' : buildClass('mb', mb),
      ml === 'auto' ? 'ml-auto' : buildClass('ml', ml),
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
      rounded && (rounded === 'base' ? 'rounded' : `rounded-${rounded}`),
      shadow && (shadow === 'base' ? 'shadow' : `shadow-${shadow}`),
      bg && `bg-${bg}`,
      overflow && `overflow-${overflow}`,
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

export default Center;
