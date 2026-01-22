/**
 * CSS variable generation from theme configuration
 */

import type {
  ThemeConfig,
  CSSVariables,
  ColorScale,
  SemanticColors,
  ResolvedThemeMode,
} from '../types';

/**
 * Generate CSS variable name with tahoe prefix
 */
function cssVar(path: string): string {
  return `--tahoe-${path}`;
}

/**
 * Generate CSS variables for a color scale
 */
function generateColorScaleVars(
  prefix: string,
  scale: ColorScale,
): CSSVariables {
  const vars: CSSVariables = {};

  const shades = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ] as const;

  for (const shade of shades) {
    const value = scale[shade];
    if (value) {
      vars[cssVar(`color-${prefix}-${shade}`)] = value;
    }
  }

  return vars;
}

/**
 * Generate CSS variables for semantic colors
 */
function generateSemanticColorVars(semantic: SemanticColors): CSSVariables {
  const vars: CSSVariables = {};

  // Text colors
  vars[cssVar('color-text-primary')] = semantic.text.primary;
  vars[cssVar('color-text-secondary')] = semantic.text.secondary;
  vars[cssVar('color-text-tertiary')] = semantic.text.tertiary;
  vars[cssVar('color-text-muted')] = semantic.text.muted;
  vars[cssVar('color-text-inverse')] = semantic.text.inverse;

  // Background colors
  vars[cssVar('color-bg-primary')] = semantic.background.primary;
  vars[cssVar('color-bg-secondary')] = semantic.background.secondary;
  vars[cssVar('color-bg-tertiary')] = semantic.background.tertiary;
  vars[cssVar('color-bg-elevated')] = semantic.background.elevated;
  vars[cssVar('color-bg-inverse')] = semantic.background.inverse;

  // Border colors
  vars[cssVar('color-border-default')] = semantic.border.default;
  vars[cssVar('color-border-subtle')] = semantic.border.subtle;
  vars[cssVar('color-border-strong')] = semantic.border.strong;
  vars[cssVar('color-border-focus')] = semantic.border.focus;

  // Interactive colors
  vars[cssVar('color-interactive-default')] = semantic.interactive.default;
  vars[cssVar('color-interactive-hover')] = semantic.interactive.hover;
  vars[cssVar('color-interactive-active')] = semantic.interactive.active;
  vars[cssVar('color-interactive-disabled')] = semantic.interactive.disabled;

  return vars;
}

/**
 * Generate CSS variables for feedback colors
 */
function generateFeedbackColorVars(
  feedback: ThemeConfig['colors']['feedback'],
): CSSVariables {
  const vars: CSSVariables = {};

  const types = ['success', 'warning', 'error', 'info'] as const;

  for (const type of types) {
    const color = feedback[type];
    vars[cssVar(`color-feedback-${type}-light`)] = color.light;
    vars[cssVar(`color-feedback-${type}`)] = color.base;
    vars[cssVar(`color-feedback-${type}-dark`)] = color.dark;
  }

  return vars;
}

/**
 * Generate CSS variables for spacing
 */
function generateSpacingVars(spacing: ThemeConfig['spacing']): CSSVariables {
  const vars: CSSVariables = {};

  for (const [key, value] of Object.entries(spacing)) {
    vars[cssVar(`spacing-${key}`)] = value;
  }

  return vars;
}

/**
 * Generate CSS variables for radius
 */
function generateRadiusVars(radius: ThemeConfig['radius']): CSSVariables {
  const vars: CSSVariables = {};

  for (const [key, value] of Object.entries(radius)) {
    vars[cssVar(`radius-${key}`)] = value;
  }

  return vars;
}

/**
 * Generate CSS variables for shadows
 */
function generateShadowVars(shadow: ThemeConfig['shadow']): CSSVariables {
  const vars: CSSVariables = {};

  // Elevation shadows
  for (const [key, value] of Object.entries(shadow.elevation)) {
    vars[cssVar(`shadow-${key}`)] = value;
  }

  // Focus shadows
  vars[cssVar('shadow-focus')] = shadow.focus.default;
  vars[cssVar('shadow-focus-error')] = shadow.focus.error;
  vars[cssVar('shadow-focus-success')] = shadow.focus.success;

  return vars;
}

/**
 * Generate CSS variables for motion
 */
function generateMotionVars(motion: ThemeConfig['motion']): CSSVariables {
  const vars: CSSVariables = {};

  // Durations
  for (const [key, value] of Object.entries(motion.duration)) {
    vars[cssVar(`motion-duration-${key}`)] = value;
  }

  // Easing
  for (const [key, value] of Object.entries(motion.easing)) {
    vars[cssVar(`motion-easing-${key}`)] = value;
  }

  return vars;
}

/**
 * Generate CSS variables for typography
 */
function generateTypographyVars(
  typography?: ThemeConfig['typography'],
): CSSVariables {
  const vars: CSSVariables = {};

  if (typography?.fontFamily) {
    vars[cssVar('font-sans')] = typography.fontFamily.sans;
    vars[cssVar('font-mono')] = typography.fontFamily.mono;
    if (typography.fontFamily.serif) {
      vars[cssVar('font-serif')] = typography.fontFamily.serif;
    }
  }

  return vars;
}

/**
 * Generate all CSS variables from a theme configuration
 *
 * @param theme - Theme configuration
 * @param mode - Optional mode to generate vars for (light/dark)
 * @returns Record of CSS variable names to values
 *
 * @example
 * ```ts
 * const vars = generateCSSVariables(myTheme, 'light');
 * // Returns { '--tahoe-color-brand-primary-500': '#6366F1', ... }
 * ```
 */
export function generateCSSVariables(
  theme: ThemeConfig,
  mode?: ResolvedThemeMode,
): CSSVariables {
  const vars: CSSVariables = {};

  // Brand colors (always included, mode-independent)
  Object.assign(
    vars,
    generateColorScaleVars('brand-primary', theme.colors.brand.primary),
  );
  Object.assign(
    vars,
    generateColorScaleVars('brand-secondary', theme.colors.brand.secondary),
  );
  Object.assign(
    vars,
    generateColorScaleVars('brand-accent', theme.colors.brand.accent),
  );

  // Gray scale (mode-independent)
  Object.assign(vars, generateColorScaleVars('gray', theme.colors.gray));

  // Feedback colors (mode-independent)
  Object.assign(vars, generateFeedbackColorVars(theme.colors.feedback));

  // Semantic colors (mode-dependent)
  const semanticColors =
    mode === 'dark' ? theme.colors.dark : theme.colors.light;
  Object.assign(vars, generateSemanticColorVars(semanticColors));

  // Spacing
  Object.assign(vars, generateSpacingVars(theme.spacing));

  // Radius
  Object.assign(vars, generateRadiusVars(theme.radius));

  // Shadows
  Object.assign(vars, generateShadowVars(theme.shadow));

  // Motion
  Object.assign(vars, generateMotionVars(theme.motion));

  // Typography
  Object.assign(vars, generateTypographyVars(theme.typography));

  return vars;
}

/**
 * Generate CSS string from variables
 */
export function generateCSSString(
  vars: CSSVariables,
  selector: string = ':root',
): string {
  const entries = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `${selector} {\n${entries}\n}`;
}

/**
 * Generate complete CSS with light and dark mode support
 */
export function generateThemeCSS(
  theme: ThemeConfig,
  selector: string = ':root',
): string {
  const lightVars = generateCSSVariables(theme, 'light');
  const darkVars = generateCSSVariables(theme, 'dark');

  // Only include vars that differ between modes for dark override
  const darkOnlyVars: CSSVariables = {};
  for (const [key, value] of Object.entries(darkVars)) {
    if (lightVars[key] !== value) {
      darkOnlyVars[key] = value;
    }
  }

  const lightCSS = generateCSSString(lightVars, selector);
  const darkCSS = generateCSSString(
    darkOnlyVars,
    `${selector}.dark, [data-theme="dark"] ${selector}`,
  );
  const systemDarkCSS = generateCSSString(
    darkOnlyVars,
    `@media (prefers-color-scheme: dark) {\n  ${selector}:not(.light):not([data-theme="light"])`,
  ).replace(/\n}$/, '\n  }\n}');

  // Reduced motion support
  const reducedMotionCSS = `
@media (prefers-reduced-motion: reduce) {
  ${selector} {
    --tahoe-motion-duration-instant: 0ms;
    --tahoe-motion-duration-fast: 0ms;
    --tahoe-motion-duration-base: 0ms;
    --tahoe-motion-duration-slow: 0ms;
  }
}`;

  return [lightCSS, darkCSS, systemDarkCSS, reducedMotionCSS].join('\n\n');
}
