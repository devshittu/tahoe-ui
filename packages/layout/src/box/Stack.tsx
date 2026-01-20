'use client';

import React, {
  forwardRef,
  ElementType,
  HTMLAttributes,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
} from 'react';
import { cn } from '@tahoe-ui/core';
import type { BaseLayoutProps, GapValue } from '../types';

/**
 * Stack - Vertical/Horizontal stacking primitive
 *
 * A semantic layout component for stacking elements with consistent spacing.
 * Optionally renders dividers between children.
 *
 * Reference: design-principles.md
 * - #3 Intentional White Space: Related elements 8-12px apart
 * - #4 System-Level Consistency: Consistent gaps
 *
 * @example
 * ```tsx
 * // Vertical stack (default)
 * <Stack gap="4">
 *   <Card />
 *   <Card />
 *   <Card />
 * </Stack>
 *
 * // Horizontal stack
 * <Stack direction="horizontal" gap="2" align="center">
 *   <Icon />
 *   <Text>Label</Text>
 * </Stack>
 *
 * // With dividers
 * <Stack gap="4" divider>
 *   <Item />
 *   <Item />
 *   <Item />
 * </Stack>
 * ```
 */

export type StackDirection = 'vertical' | 'horizontal';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

export interface StackProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>, BaseLayoutProps {
  as?: ElementType;
  direction?: StackDirection;
  gap?: GapValue;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  divider?: boolean | React.ReactNode;
  dividerClassName?: string;
  inline?: boolean;
}

const buildClass = (prefix: string, value?: string): string | undefined => {
  if (!value) return undefined;
  return `${prefix}-${value}`;
};

const Stack = forwardRef<HTMLElement, StackProps>(
  (
    {
      as: Component = 'div',
      children,
      className,
      // Stack-specific
      direction = 'vertical',
      gap = '4',
      align,
      justify,
      wrap,
      divider,
      dividerClassName,
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
    const isHorizontal = direction === 'horizontal';

    const classes = cn(
      // Display
      inline ? 'inline-flex' : 'flex',

      // Direction
      isHorizontal ? 'flex-row' : 'flex-col',

      // Only apply gap if no dividers (dividers handle spacing)
      !divider && gap && `gap-${gap}`,

      // Alignment
      align && `items-${align}`,
      justify && `justify-${justify}`,

      // Wrap
      wrap && 'flex-wrap',

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

    // Default divider element
    const defaultDivider = (
      <div
        className={cn(
          'flex-shrink-0',
          isHorizontal
            ? 'w-px h-full bg-gray-200 dark:bg-gray-700'
            : 'h-px w-full bg-gray-200 dark:bg-gray-700',
          dividerClassName,
        )}
        aria-hidden="true"
      />
    );

    // Render with dividers
    if (divider) {
      const dividerElement =
        typeof divider === 'boolean' ? defaultDivider : divider;
      const validChildren = Children.toArray(children).filter(isValidElement);
      const childCount = validChildren.length;

      // Gap value for spacing around dividers
      const gapClass = gap ? `gap-${gap}` : '';

      return (
        <Component ref={ref} className={cn(classes, gapClass)} {...rest}>
          {validChildren.map((child, index) => (
            <React.Fragment key={(child as ReactElement).key ?? index}>
              {child}
              {index < childCount - 1 && dividerElement}
            </React.Fragment>
          ))}
        </Component>
      );
    }

    return (
      <Component ref={ref} className={classes} {...rest}>
        {children}
      </Component>
    );
  },
);

Stack.displayName = 'Stack';

export { Stack };
export default Stack;
