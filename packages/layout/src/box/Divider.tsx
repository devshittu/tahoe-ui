'use client';

import { forwardRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Divider orientation
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider visual variants
 */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/**
 * Divider thickness
 */
export type DividerThickness = 'thin' | 'medium' | 'thick';

/**
 * Text/content alignment for dividers with children
 */
export type DividerAlign = 'start' | 'center' | 'end';

/**
 * Divider color options
 */
export type DividerColor = 'default' | 'subtle' | 'strong';

/**
 * Divider spacing options
 */
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

/**
 * Props for Divider component
 */
export interface DividerProps {
  /** Orientation */
  orientation?: DividerOrientation;
  /** Visual variant */
  variant?: DividerVariant;
  /** Line thickness */
  thickness?: DividerThickness;
  /** Color (uses semantic tokens) */
  color?: DividerColor;
  /** Content to display in divider (text or element) */
  children?: ReactNode;
  /** Content alignment when children present */
  align?: DividerAlign;
  /** Spacing around divider (margin) */
  spacing?: DividerSpacing;
  /** Additional className */
  className?: string;
  /** Decorative (aria-hidden) or semantic */
  decorative?: boolean;
}

/**
 * Thickness configuration
 */
const DIVIDER_THICKNESS_CONFIG: Record<
  DividerThickness,
  { horizontal: string; vertical: string }
> = {
  thin: { horizontal: 'h-px', vertical: 'w-px' },
  medium: { horizontal: 'h-0.5', vertical: 'w-0.5' },
  thick: { horizontal: 'h-1', vertical: 'w-1' },
};

/**
 * Color configuration (CSS variable-backed via @tahoe-ui/tailwind-preset)
 */
const DIVIDER_COLOR_CONFIG: Record<DividerColor, string> = {
  default: 'bg-border-default',
  subtle: 'bg-border-subtle',
  strong: 'bg-border-strong',
};

/**
 * Border style for variants
 */
const DIVIDER_VARIANT_CONFIG: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

/**
 * Border color for variants with children (CSS variable-backed)
 */
const DIVIDER_BORDER_COLOR: Record<DividerColor, string> = {
  default: 'border-border-default',
  subtle: 'border-border-subtle',
  strong: 'border-border-strong',
};

/**
 * Spacing configuration
 */
const DIVIDER_SPACING_CONFIG: Record<
  DividerSpacing,
  { horizontal: string; vertical: string }
> = {
  none: { horizontal: '', vertical: '' },
  sm: { horizontal: 'my-2', vertical: 'mx-2' },
  md: { horizontal: 'my-4', vertical: 'mx-4' },
  lg: { horizontal: 'my-8', vertical: 'mx-8' },
};

/**
 * Alignment configuration for content
 */
const DIVIDER_ALIGN_CONFIG: Record<DividerAlign, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
};

/**
 * Divider - Visual separator for content sections
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
 *
 * // Dashed variant
 * <Divider variant="dashed" thickness="medium" />
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
          className={twMerge(
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

            // Dashed/dotted variants: use border only
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
        className={twMerge(
          'flex items-center',
          isHorizontal ? 'w-full' : 'h-full flex-col',
          isHorizontal ? spacingConfig.horizontal : spacingConfig.vertical,
          DIVIDER_ALIGN_CONFIG[align],
          className,
        )}
      >
        {/* Left/Top line */}
        <div
          className={twMerge(
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
          className={twMerge(
            'flex-shrink-0',
            'text-sm text-text-muted',
            isHorizontal ? 'px-3' : 'py-3',
          )}
        >
          {children}
        </span>

        {/* Right/Bottom line */}
        <div
          className={twMerge(
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

export default Divider;
