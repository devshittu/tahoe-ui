// src/components/Box/Grid.tsx
'use client';

import React, { forwardRef, ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import type {
  BaseLayoutProps,
  GridColumns,
  GridRows,
  GridFlow,
  JustifyContent,
  AlignItems,
  GapValue,
} from './types';

/**
 * Grid - CSS Grid layout primitive
 *
 * @example
 * ```tsx
 * <Grid cols="3" gap="4">
 *   <Card /><Card /><Card />
 * </Grid>
 * <Grid colsAuto="250px" gap="4">
 *   {items.map(item => <Card key={item.id} />)}
 * </Grid>
 * ```
 */

export interface GridOwnProps {
  cols?: GridColumns;
  colsAuto?: string;
  rows?: GridRows;
  flow?: GridFlow;
  justify?: JustifyContent;
  align?: AlignItems;
  justifyContent?: JustifyContent;
  alignContent?: AlignItems;
  gap?: GapValue;
  gapX?: GapValue;
  gapY?: GapValue;
  inline?: boolean;
}

export interface GridProps
  extends
    Omit<HTMLAttributes<HTMLElement>, 'color'>,
    BaseLayoutProps,
    GridOwnProps {
  as?: ElementType;
}

const buildClass = (prefix: string, value?: string): string | undefined => {
  if (!value) return undefined;
  return `${prefix}-${value}`;
};

const Grid = forwardRef<HTMLElement, GridProps>(
  (
    {
      as: Component = 'div',
      children,
      className,
      cols,
      colsAuto,
      rows,
      flow,
      justify,
      align,
      justifyContent,
      alignContent,
      gap,
      gapX,
      gapY,
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
      style,
      ...rest
    },
    ref,
  ) => {
    const gridStyle = colsAuto
      ? {
          ...style,
          gridTemplateColumns: `repeat(auto-fit, minmax(${colsAuto}, 1fr))`,
        }
      : style;

    const classes = cn(
      inline ? 'inline-grid' : 'grid',
      !colsAuto && cols && `grid-cols-${cols}`,
      rows && `grid-rows-${rows}`,
      flow && `grid-flow-${flow}`,
      justify && `justify-items-${justify}`,
      align && `items-${align}`,
      justifyContent && `justify-${justifyContent}`,
      alignContent && `content-${alignContent}`,
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
      <Component ref={ref} className={classes} style={gridStyle} {...rest}>
        {children}
      </Component>
    );
  },
);

Grid.displayName = 'Grid';

export default Grid;
