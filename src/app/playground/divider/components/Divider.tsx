// src/app/playground/divider/components/Divider.tsx

'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import {
  DividerProps,
  DIVIDER_THICKNESS_CONFIG,
  DIVIDER_COLOR_CONFIG,
  DIVIDER_VARIANT_CONFIG,
  DIVIDER_BORDER_COLOR,
  DIVIDER_SPACING_CONFIG,
  DIVIDER_ALIGN_CONFIG,
} from './types';

/**
 * Divider - Visual separator for content sections
 *
 * Design Principles Applied:
 * - #1 Purpose-Driven Minimalism: Simple, functional separator
 * - #3 Intentional White Space: Configurable spacing
 * - #4 System-Level Consistency: Uses design tokens
 * - #12 Accessibility: Proper role and aria attributes
 *
 * Features:
 * - Horizontal and vertical orientation
 * - Three line styles: solid, dashed, dotted
 * - Three thickness options
 * - Optional text/content in center
 * - Configurable spacing
 * - Dark mode support
 *
 * @example
 * ```tsx
 * // Simple divider
 * <Divider />
 *
 * // With text
 * <Divider>or</Divider>
 *
 * // Vertical in flex
 * <Divider orientation="vertical" />
 * ```
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider(
    {
      orientation = 'horizontal',
      variant = 'solid',
      thickness = 'thin',
      color = 'default',
      children,
      align = 'center',
      spacing = 'md',
      className,
      decorative = true,
    },
    ref,
  ) {
    const isHorizontal = orientation === 'horizontal';
    const hasChildren = !!children;
    const thicknessConfig = DIVIDER_THICKNESS_CONFIG[thickness];
    const spacingConfig = DIVIDER_SPACING_CONFIG[spacing];

    // Simple divider without children
    if (!hasChildren) {
      const isSolid = variant === 'solid';

      return (
        <div
          ref={ref}
          role={decorative ? 'none' : 'separator'}
          aria-orientation={decorative ? undefined : orientation}
          aria-hidden={decorative}
          className={cn(
            // Base dimensions
            isHorizontal ? 'w-full' : 'h-full self-stretch',

            // Spacing
            isHorizontal ? spacingConfig.horizontal : spacingConfig.vertical,

            // Solid variant: use background color with height/width
            isSolid && [
              isHorizontal
                ? thicknessConfig.horizontal
                : thicknessConfig.vertical,
              DIVIDER_COLOR_CONFIG[color],
            ],

            // Dashed/dotted variants: use border only (no height needed)
            !isSolid && [
              isHorizontal
                ? thickness === 'thin'
                  ? 'border-t'
                  : thickness === 'medium'
                    ? 'border-t-2'
                    : 'border-t-4'
                : thickness === 'thin'
                  ? 'border-l'
                  : thickness === 'medium'
                    ? 'border-l-2'
                    : 'border-l-4',
              DIVIDER_VARIANT_CONFIG[variant],
              DIVIDER_BORDER_COLOR[color],
            ],

            className,
          )}
        />
      );
    }

    // Divider with children (text/content)
    const isSolid = variant === 'solid';

    // Border width classes based on thickness
    const borderClass = isHorizontal
      ? thickness === 'thin'
        ? 'border-t'
        : thickness === 'medium'
          ? 'border-t-2'
          : 'border-t-4'
      : thickness === 'thin'
        ? 'border-l'
        : thickness === 'medium'
          ? 'border-l-2'
          : 'border-l-4';

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        aria-hidden={decorative}
        className={cn(
          'flex items-center',
          isHorizontal ? 'w-full' : 'h-full flex-col',
          isHorizontal ? spacingConfig.horizontal : spacingConfig.vertical,
          DIVIDER_ALIGN_CONFIG[align],
          className,
        )}
      >
        {/* Left/Top line */}
        <div
          className={cn(
            'flex-1',
            align === 'start' &&
              (isHorizontal ? 'flex-grow-0 w-4' : 'flex-grow-0 h-4'),
            // Solid: use background
            isSolid && [
              isHorizontal
                ? thicknessConfig.horizontal
                : thicknessConfig.vertical,
              DIVIDER_COLOR_CONFIG[color],
            ],
            // Dashed/dotted: use border
            !isSolid && [
              borderClass,
              DIVIDER_VARIANT_CONFIG[variant],
              DIVIDER_BORDER_COLOR[color],
            ],
          )}
          aria-hidden="true"
        />

        {/* Content */}
        <span
          className={cn(
            'flex-shrink-0',
            'text-sm text-gray-500 dark:text-gray-400',
            isHorizontal ? 'px-3' : 'py-3',
          )}
        >
          {children}
        </span>

        {/* Right/Bottom line */}
        <div
          className={cn(
            'flex-1',
            align === 'end' &&
              (isHorizontal ? 'flex-grow-0 w-4' : 'flex-grow-0 h-4'),
            // Solid: use background
            isSolid && [
              isHorizontal
                ? thicknessConfig.horizontal
                : thicknessConfig.vertical,
              DIVIDER_COLOR_CONFIG[color],
            ],
            // Dashed/dotted: use border
            !isSolid && [
              borderClass,
              DIVIDER_VARIANT_CONFIG[variant],
              DIVIDER_BORDER_COLOR[color],
            ],
          )}
          aria-hidden="true"
        />
      </div>
    );
  },
);

Divider.displayName = 'Divider';
