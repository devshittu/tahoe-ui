// src/components/Box/Flex.tsx
'use client';

import React, { forwardRef, ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import type {
  BaseLayoutProps,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  AlignItems,
  GapValue,
} from './types';

/**
 * Flex - Flexbox layout primitive
 *
 * @example
 * ```tsx
 * <Flex gap="4" align="center">
 *   <Icon /> <Text>Label</Text>
 * </Flex>
 * <Flex direction="col" gap="6">
 *   <Card /><Card />
 * </Flex>
 * ```
 */

export interface FlexOwnProps {
  direction?: FlexDirection;
  wrap?: FlexWrap;
  justify?: JustifyContent;
  align?: AlignItems;
  gap?: GapValue;
  gapX?: GapValue;
  gapY?: GapValue;
  inline?: boolean;
  center?: boolean;
}

export interface FlexProps
  extends
    Omit<HTMLAttributes<HTMLElement>, 'color'>,
    BaseLayoutProps,
    FlexOwnProps {
  as?: ElementType;
}

const buildClass = (prefix: string, value?: string): string | undefined => {
  if (!value) return undefined;
  return `${prefix}-${value}`;
};

const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    {
      as: Component = 'div',
      children,
      className,
      direction,
      wrap,
      justify,
      align,
      gap,
      gapX,
      gapY,
      inline,
      center,
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
    const resolvedJustify = center && !justify ? 'center' : justify;
    const resolvedAlign = center && !align ? 'center' : align;

    const classes = cn(
      inline ? 'inline-flex' : 'flex',
      direction && `flex-${direction}`,
      wrap && `flex-${wrap}`,
      resolvedJustify && `justify-${resolvedJustify}`,
      resolvedAlign && `items-${resolvedAlign}`,
      gap && `gap-${gap}`,
      gapX && `gap-x-${gapX}`,
      gapY && `gap-y-${gapY}`,
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

Flex.displayName = 'Flex';

export default Flex;
