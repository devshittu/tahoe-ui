// src/components/Box/Stack.tsx
'use client';

import React, { forwardRef, ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import type {
  BaseLayoutProps,
  JustifyContent,
  AlignItems,
  GapValue,
} from './types';

/**
 * Stack - Vertical/horizontal stacking primitive
 *
 * @example
 * ```tsx
 * <Stack gap="4">
 *   <Heading>Title</Heading>
 *   <Text>Description</Text>
 * </Stack>
 * <Stack direction="row" gap="2" align="center">
 *   <Avatar /><Text>Username</Text>
 * </Stack>
 * ```
 */

export type StackDirection = 'column' | 'row';

export interface StackOwnProps {
  direction?: StackDirection;
  gap?: GapValue;
  justify?: JustifyContent;
  align?: AlignItems;
  divider?: boolean;
  reverse?: boolean;
  wrap?: boolean;
}

export interface StackProps
  extends
    Omit<HTMLAttributes<HTMLElement>, 'color'>,
    BaseLayoutProps,
    StackOwnProps {
  as?: ElementType;
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
      direction = 'column',
      gap = '4',
      justify,
      align,
      divider,
      reverse,
      wrap,
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
    const flexDirection =
      direction === 'row'
        ? reverse
          ? 'flex-row-reverse'
          : 'flex-row'
        : reverse
          ? 'flex-col-reverse'
          : 'flex-col';

    const classes = cn(
      'flex',
      flexDirection,
      !divider && gap && `gap-${gap}`,
      justify && `justify-${justify}`,
      align && `items-${align}`,
      wrap && 'flex-wrap',
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

    if (divider) {
      const childArray = React.Children.toArray(children).filter(Boolean);
      const dividerEl = (
        <div
          className={cn(
            'flex-shrink-0',
            direction === 'row'
              ? 'w-px h-full bg-gray-200 dark:bg-gray-800'
              : 'w-full h-px bg-gray-200 dark:bg-gray-800',
          )}
          aria-hidden="true"
        />
      );

      return (
        <Component
          ref={ref}
          className={cn(
            classes,
            direction === 'row' ? `space-x-${gap}` : `space-y-${gap}`,
          )}
          {...rest}
        >
          {childArray.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < childArray.length - 1 && dividerEl}
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

export default Stack;
