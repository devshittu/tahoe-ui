'use client';

import React, { forwardRef, ReactNode, ElementType } from 'react';
import { cn } from '@tahoe-ui/core';

/**
 * Container - Responsive max-width wrapper
 *
 * A content-constraining primitive that centers content and applies
 * responsive horizontal padding. Essential for readable text layouts.
 *
 * Reference: design-principles.md
 * - #3 Intentional White Space: Creates rhythm and reduces cognitive load
 * - #11 Content-First Layout: Text-heavy views use max-width (640-768px for readability)
 * - #17 Mobile-Native: Responsive breakpoints 640/768/1024/1280
 *
 * Features:
 * - Responsive max-width presets aligned with Tailwind breakpoints
 * - Automatic horizontal centering
 * - Responsive padding that adapts to viewport
 * - Polymorphic "as" prop for semantic HTML
 *
 * @example
 * ```tsx
 * // Default container (max-w-4xl, responsive padding)
 * <Container>
 *   <Article />
 * </Container>
 *
 * // Narrow for text content
 * <Container size="md">
 *   <BlogPost />
 * </Container>
 *
 * // Wide for dashboards
 * <Container size="2xl">
 *   <Dashboard />
 * </Container>
 *
 * // Semantic element
 * <Container as="main" size="lg">
 *   <Content />
 * </Container>
 * ```
 */

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps {
  children: ReactNode;
  /** Semantic element type */
  as?: ElementType;
  /** Max-width preset (default: 'lg') */
  size?: ContainerSize;
  /** Horizontal padding preset (default: 'md') */
  padding?: ContainerPadding;
  /** Center the container horizontally (default: true) */
  centered?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Max-width values following Tailwind defaults
 * Aligned with design principle #11: Content-first layout
 */
const SIZE_CLASSES: Record<ContainerSize, string> = {
  xs: 'max-w-xs', // 320px - very narrow
  sm: 'max-w-sm', // 384px - small forms
  md: 'max-w-2xl', // 672px - readable text (design principles: 640-768px)
  lg: 'max-w-4xl', // 896px - standard content
  xl: 'max-w-6xl', // 1152px - wide layouts
  '2xl': 'max-w-7xl', // 1280px - maximum width
  full: 'max-w-full', // No constraint
};

/**
 * Responsive padding values following 8pt grid
 * Reference: design-principles.md #3 - minimum 16px padding on containers
 */
const PADDING_CLASSES: Record<ContainerPadding, string> = {
  none: 'px-0',
  sm: 'px-4', // 16px - minimum per design principles
  md: 'px-4 sm:px-6 lg:px-8', // 16px → 24px → 32px responsive
  lg: 'px-6 sm:px-8 lg:px-12', // 24px → 32px → 48px responsive
};

const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    {
      children,
      as: Component = 'div',
      size = 'lg',
      padding = 'md',
      centered = true,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'w-full',
          SIZE_CLASSES[size],
          PADDING_CLASSES[padding],
          centered && 'mx-auto',
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Container.displayName = 'Container';

export { Container };
export default Container;
