/**
 * Tailwind color mappings to CSS variables
 *
 * These mappings allow Tailwind utilities to use CSS variables,
 * enabling runtime theme customization.
 */

/**
 * CSS variable reference helper
 */
function cssVar(name: string, fallback?: string): string {
  return fallback
    ? `var(--tahoe-${name}, ${fallback})`
    : `var(--tahoe-${name})`;
}

/**
 * Generate a color scale from CSS variables
 */
function colorScale(prefix: string): Record<string | number, string> {
  return {
    50: cssVar(`color-${prefix}-50`),
    100: cssVar(`color-${prefix}-100`),
    200: cssVar(`color-${prefix}-200`),
    300: cssVar(`color-${prefix}-300`),
    400: cssVar(`color-${prefix}-400`),
    500: cssVar(`color-${prefix}-500`),
    600: cssVar(`color-${prefix}-600`),
    700: cssVar(`color-${prefix}-700`),
    800: cssVar(`color-${prefix}-800`),
    900: cssVar(`color-${prefix}-900`),
    950: cssVar(`color-${prefix}-950`),
    DEFAULT: cssVar(`color-${prefix}-500`),
  };
}

/**
 * Brand color scales mapped to CSS variables
 */
export const brandColors = {
  'brand-primary': colorScale('brand-primary'),
  'brand-secondary': colorScale('brand-secondary'),
  'brand-accent': colorScale('brand-accent'),
};

/**
 * Gray scale mapped to CSS variables
 */
export const grayColors = {
  gray: colorScale('gray'),
};

/**
 * Semantic text colors
 */
export const textColors = {
  'text-primary': cssVar('color-text-primary'),
  'text-secondary': cssVar('color-text-secondary'),
  'text-tertiary': cssVar('color-text-tertiary'),
  'text-muted': cssVar('color-text-muted'),
  'text-inverse': cssVar('color-text-inverse'),
};

/**
 * Semantic background colors
 */
export const backgroundColors = {
  'bg-primary': cssVar('color-bg-primary'),
  'bg-secondary': cssVar('color-bg-secondary'),
  'bg-tertiary': cssVar('color-bg-tertiary'),
  'bg-elevated': cssVar('color-bg-elevated'),
  'bg-inverse': cssVar('color-bg-inverse'),
};

/**
 * Semantic border colors
 */
export const borderColors = {
  'border-default': cssVar('color-border-default'),
  'border-subtle': cssVar('color-border-subtle'),
  'border-strong': cssVar('color-border-strong'),
  'border-focus': cssVar('color-border-focus'),
};

/**
 * Interactive state colors
 */
export const interactiveColors = {
  'interactive-default': cssVar('color-interactive-default'),
  'interactive-hover': cssVar('color-interactive-hover'),
  'interactive-active': cssVar('color-interactive-active'),
  'interactive-disabled': cssVar('color-interactive-disabled'),
};

/**
 * Feedback colors
 */
export const feedbackColors = {
  success: {
    light: cssVar('color-feedback-success-light'),
    DEFAULT: cssVar('color-feedback-success'),
    dark: cssVar('color-feedback-success-dark'),
  },
  warning: {
    light: cssVar('color-feedback-warning-light'),
    DEFAULT: cssVar('color-feedback-warning'),
    dark: cssVar('color-feedback-warning-dark'),
  },
  error: {
    light: cssVar('color-feedback-error-light'),
    DEFAULT: cssVar('color-feedback-error'),
    dark: cssVar('color-feedback-error-dark'),
  },
  info: {
    light: cssVar('color-feedback-info-light'),
    DEFAULT: cssVar('color-feedback-info'),
    dark: cssVar('color-feedback-info-dark'),
  },
};

/**
 * All theme colors combined
 */
export const themeColors = {
  // Brand colors with scales
  ...brandColors,
  ...grayColors,

  // Semantic colors (flat)
  ...textColors,
  ...backgroundColors,
  ...borderColors,
  ...interactiveColors,

  // Feedback colors with variants
  ...feedbackColors,
};

/**
 * Spacing tokens mapped to CSS variables
 */
export const themeSpacing = {
  'tahoe-0': cssVar('spacing-0'),
  'tahoe-1': cssVar('spacing-1'),
  'tahoe-2': cssVar('spacing-2'),
  'tahoe-3': cssVar('spacing-3'),
  'tahoe-4': cssVar('spacing-4'),
  'tahoe-5': cssVar('spacing-5'),
  'tahoe-6': cssVar('spacing-6'),
  'tahoe-8': cssVar('spacing-8'),
  'tahoe-10': cssVar('spacing-10'),
  'tahoe-12': cssVar('spacing-12'),
  'tahoe-16': cssVar('spacing-16'),
  'tahoe-20': cssVar('spacing-20'),
  'tahoe-24': cssVar('spacing-24'),
};

/**
 * Border radius tokens mapped to CSS variables
 */
export const themeBorderRadius = {
  'tahoe-none': cssVar('radius-none'),
  'tahoe-xs': cssVar('radius-xs'),
  'tahoe-sm': cssVar('radius-sm'),
  'tahoe-md': cssVar('radius-md'),
  'tahoe-lg': cssVar('radius-lg'),
  'tahoe-xl': cssVar('radius-xl'),
  'tahoe-2xl': cssVar('radius-2xl'),
  'tahoe-full': cssVar('radius-full'),
};

/**
 * Shadow tokens mapped to CSS variables
 */
export const themeShadow = {
  'tahoe-none': cssVar('shadow-none'),
  'tahoe-xs': cssVar('shadow-xs'),
  'tahoe-sm': cssVar('shadow-sm'),
  'tahoe-md': cssVar('shadow-md'),
  'tahoe-lg': cssVar('shadow-lg'),
  'tahoe-xl': cssVar('shadow-xl'),
  'tahoe-focus': cssVar('shadow-focus'),
  'tahoe-focus-error': cssVar('shadow-focus-error'),
  'tahoe-focus-success': cssVar('shadow-focus-success'),
};

/**
 * Transition duration tokens
 */
export const themeTransitionDuration = {
  'tahoe-instant': cssVar('motion-duration-instant'),
  'tahoe-fast': cssVar('motion-duration-fast'),
  'tahoe-base': cssVar('motion-duration-base'),
  'tahoe-slow': cssVar('motion-duration-slow'),
};

/**
 * Transition timing function tokens
 */
export const themeTransitionTimingFunction = {
  'tahoe-smooth': cssVar('motion-easing-smooth'),
  'tahoe-ease-out': cssVar('motion-easing-easeOut'),
  'tahoe-ease-in': cssVar('motion-easing-easeIn'),
};

/**
 * Font family tokens
 */
export const themeFontFamily = {
  'tahoe-sans': cssVar('font-sans'),
  'tahoe-mono': cssVar('font-mono'),
  'tahoe-serif': cssVar('font-serif'),
};
