'use client';

import React, { forwardRef, ElementType, HTMLAttributes } from 'react';
import { cn } from '@tahoe-ui/core';
import type { BaseLayoutProps, GridProps as GridLayoutProps } from '../types';

/**
 * Grid - CSS Grid layout primitive
 *
 * A Box variant that defaults to display: grid with full CSS Grid control.
 * Ideal for two-dimensional layouts with rows and columns.
 *
 * Reference: design-principles.md
 * - #3 Intentional White Space: Grid gap follows 8pt system
 * - #11 Content-First Layout: Responsive grid systems
 * - #17 Mobile-Native: Responsive column counts
 *
 * @example
 * ```tsx
 * // Simple 3-column grid
 * <Grid cols="3" gap="4">
 *   <Card />
 *   <Card />
 *   <Card />
 * </Grid>
 *
 * // Responsive grid
 * <Grid cols="1" gap="6" className="sm:grid-cols-2 lg:grid-cols-3">
 *   {items.map(item => <Card key={item.id} />)}
 * </Grid>
 *
 * // Auto-fit grid
 * <Grid gap="4" className="grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
 *   {items.map(item => <Card key={item.id} />)}
 * </Grid>
 * ```
 */

export interface GridProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
    BaseLayoutProps,
    Omit<GridLayoutProps, keyof BaseLayoutProps> {
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
      // Grid-specific
      cols,
      rows,
      flow,
      autoCols,
      autoRows,
      gap,
      gapX,
      gapY,
      placeContent,
      placeItems,
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
      inline ? 'inline-grid' : 'grid',

      // Grid properties
      cols && `grid-cols-${cols}`,
      rows && `grid-rows-${rows}`,
      flow && `grid-flow-${flow}`,
      autoCols && `auto-cols-${autoCols}`,
      autoRows && `auto-rows-${autoRows}`,
      gap && `gap-${gap}`,
      gapX && `gap-x-${gapX}`,
      gapY && `gap-y-${gapY}`,
      placeContent && `place-content-${placeContent}`,
      placeItems && `place-items-${placeItems}`,

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

Grid.displayName = 'Grid';

export { Grid };
export default Grid;
