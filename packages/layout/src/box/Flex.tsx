'use client';

import React, { forwardRef, ElementType, HTMLAttributes } from 'react';
import { cn } from '@tahoe-ui/core';
import type { BaseLayoutProps, FlexProps as FlexLayoutProps } from '../types';

/**
 * Flex - Flexbox layout primitive
 *
 * A Box variant that defaults to display: flex with full flexbox control.
 * Ideal for one-dimensional layouts (rows or columns).
 *
 * Reference: design-principles.md
 * - #3 Intentional White Space: Gap-based spacing
 * - #11 Content-First Layout: Flexible content arrangement
 *
 * @example
 * ```tsx
 * // Horizontal layout with gap
 * <Flex gap="4" align="center">
 *   <Avatar />
 *   <Text>Username</Text>
 * </Flex>
 *
 * // Vertical layout
 * <Flex direction="col" gap="2">
 *   <Input />
 *   <Button>Submit</Button>
 * </Flex>
 *
 * // Responsive centering
 * <Flex justify="center" align="center" h="screen">
 *   <LoginForm />
 * </Flex>
 * ```
 */

export interface FlexProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
    BaseLayoutProps,
    Omit<FlexLayoutProps, keyof BaseLayoutProps> {
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
      // Flex-specific
      direction,
      wrap,
      justify,
      align,
      alignContent,
      gap,
      gapX,
      gapY,
      inline,
      // Base layout
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
      // Display
      inline ? 'inline-flex' : 'flex',

      // Flex properties
      direction && `flex-${direction}`,
      wrap && `flex-${wrap}`,
      justify && `justify-${justify}`,
      align && `items-${align}`,
      alignContent && `content-${alignContent}`,
      gap && `gap-${gap}`,
      gapX && `gap-x-${gapX}`,
      gapY && `gap-y-${gapY}`,

      // Padding
      buildClass('p', p),
      buildClass('px', px),
      buildClass('py', py),
      buildClass('pt', pt),
      buildClass('pr', pr),
      buildClass('pb', pb),
      buildClass('pl', pl),

      // Margin
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

Flex.displayName = 'Flex';

export { Flex };
export default Flex;
