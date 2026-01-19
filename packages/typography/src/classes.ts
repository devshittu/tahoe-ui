/**
 * Typography Class Mappings
 *
 * Centralized Tailwind class mappings - all static strings for JIT safety.
 * These maps are used by typography components to generate consistent styles.
 */

import type {
  FontFamily,
  FontWeight,
  TextColor,
  TextAlign,
  LineHeight,
  LetterSpacing,
  TextTransform,
  TextDecoration,
  TextSize,
  HeadingSize,
  HighlightColor,
  ColorScheme,
  BadgeVariant,
  BadgeColor,
  LinkVariant,
  TooltipPosition,
} from './types';

// ============ Font Classes ============

export const fontFamilyClasses: Record<FontFamily, string> = {
  primary: 'font-sans',
  secondary: 'font-serif',
  mono: 'font-mono',
} as const;

export const fontWeightClasses: Record<FontWeight, string> = {
  thin: 'font-thin',
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
} as const;

// ============ Color Classes ============

// Centralized color system with dark mode support
export const textColorClasses: Record<TextColor, string> = {
  primary: 'text-gray-900 dark:text-gray-100',
  secondary: 'text-gray-600 dark:text-gray-400',
  tertiary: 'text-gray-500 dark:text-gray-500',
  accent: 'text-accent',
  muted: 'text-gray-400 dark:text-gray-600',
  inherit: 'text-inherit',
  white: 'text-white',
} as const;

// ============ Text Layout Classes ============

export const alignClasses: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const;

export const lineHeightClasses: Record<LineHeight, string> = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  loose: 'leading-loose',
  relaxed: 'leading-relaxed',
} as const;

export const letterSpacingClasses: Record<LetterSpacing, string> = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
} as const;

export const textTransformClasses: Record<TextTransform, string> = {
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
  none: '',
} as const;

export const textDecorationClasses: Record<TextDecoration, string> = {
  underline: 'underline',
  'line-through': 'line-through',
  none: 'no-underline',
} as const;

// ============ Size Classes ============

export const textSizeClasses: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
} as const;

// Heading responsive sizes (static, JIT-safe)
export const headingSizeClasses: Record<HeadingSize, string> = {
  '4xl': 'text-5xl md:text-6xl lg:text-7xl',
  '3xl': 'text-4xl md:text-5xl lg:text-6xl',
  '2xl': 'text-3xl sm:text-4xl',
  xl: 'text-3xl md:text-4xl lg:text-5xl',
  lg: 'text-2xl md:text-3xl lg:text-4xl',
  md: 'text-xl md:text-2xl lg:text-3xl',
  sm: 'text-lg md:text-xl lg:text-2xl',
  xs: 'text-base md:text-lg',
} as const;

// ============ Highlight Classes ============

export const highlightBgClasses: Record<HighlightColor, string> = {
  yellow: 'bg-yellow-200 dark:bg-yellow-200/80',
  green: 'bg-green-200 dark:bg-green-200/80',
  blue: 'bg-blue-200 dark:bg-blue-200/80',
  pink: 'bg-pink-200 dark:bg-pink-200/80',
  purple: 'bg-purple-200 dark:bg-purple-200/80',
} as const;

// ============ ColorScheme Classes ============

export const colorSchemeClasses: Record<ColorScheme, string> = {
  blue: 'text-blue-500',
  red: 'text-red-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500',
  purple: 'text-purple-500',
  pink: 'text-pink-500',
  cyan: 'text-cyan-500',
  indigo: 'text-indigo-500',
} as const;

export const gradientClasses: Record<ColorScheme, string> = {
  blue: 'bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text',
  red: 'bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text',
  green:
    'bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text',
  yellow:
    'bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text',
  purple:
    'bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text',
  pink: 'bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text',
  cyan: 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-transparent bg-clip-text',
  indigo:
    'bg-gradient-to-r from-indigo-400 to-indigo-600 text-transparent bg-clip-text',
} as const;

// ============ Badge Classes ============

export const badgeVariantClasses: Record<
  BadgeVariant,
  Record<BadgeColor, string>
> = {
  filled: {
    primary: 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900',
    secondary: 'bg-gray-600 dark:bg-gray-400 text-white dark:text-gray-900',
    accent: 'bg-accent text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-400 text-gray-900',
    error: 'bg-red-500 text-white',
  },
  outlined: {
    primary:
      'border border-gray-800 dark:border-gray-100 text-gray-800 dark:text-gray-100 bg-transparent',
    secondary:
      'border border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 bg-transparent',
    accent: 'border border-accent text-accent bg-transparent',
    success: 'border border-green-500 text-green-500 bg-transparent',
    warning: 'border border-yellow-400 text-yellow-600 bg-transparent',
    error: 'border border-red-500 text-red-500 bg-transparent',
  },
  ghost: {
    primary: 'text-gray-800 dark:text-gray-100 bg-transparent',
    secondary: 'text-gray-600 dark:text-gray-400 bg-transparent',
    accent: 'text-accent bg-transparent',
    success: 'text-green-500 bg-transparent',
    warning: 'text-yellow-600 bg-transparent',
    error: 'text-red-500 bg-transparent',
  },
} as const;

export const badgeSizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
} as const;

// ============ Link Classes ============

export const linkVariantClasses: Record<LinkVariant, string> = {
  default: 'text-blue-600 dark:text-blue-400 hover:opacity-80',
  muted:
    'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200',
  accent: 'text-accent hover:opacity-80',
} as const;

// ============ Tooltip Classes ============

export const tooltipPositionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
} as const;

// ============ Label Classes ============

export const labelSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
} as const;

// ============ Helper function to check if color is a named color ============

export function isNamedColor(color: string): color is TextColor {
  return color in textColorClasses;
}

export function getColorClass(color: string): string {
  if (isNamedColor(color)) {
    return textColorClasses[color];
  }
  // Return empty string for custom colors - they should be passed via className
  return '';
}
