/**
 * Theme creation utility
 *
 * Provides a simple API for creating custom themes by specifying
 * brand colors (single hex or full scale) and other overrides.
 */

import type {
  ThemeConfig,
  CreateThemeOptions,
  ColorScale,
  DeepPartial,
  SemanticColors,
} from './types';
import { defaultTheme } from './themes/default';
import { mergeThemes } from './utils/mergeThemes';
import { processColorInput } from './utils/colorUtils';

/**
 * Create a custom theme configuration
 *
 * @param options - Theme creation options
 * @returns Complete theme configuration
 *
 * @example
 * ```ts
 * // Simple: auto-generate scales from single colors
 * const theme = createTheme({
 *   name: 'my-brand',
 *   brand: {
 *     primary: '#6366F1',  // Auto-generates 50-950 scale
 *     accent: '#EC4899',
 *   },
 * });
 *
 * // Advanced: provide full color scales
 * const theme = createTheme({
 *   name: 'custom',
 *   brand: {
 *     primary: {
 *       50: '#EEF2FF',
 *       100: '#E0E7FF',
 *       // ... full scale
 *       900: '#312E81',
 *     },
 *   },
 *   semantic: {
 *     light: {
 *       text: { primary: '#1F2937' },
 *     },
 *   },
 * });
 * ```
 */
export function createTheme(options: CreateThemeOptions): ThemeConfig {
  const baseTheme = options.extends ?? defaultTheme;

  // Process brand colors
  const brandColors = {
    primary: processColorInput(
      options.brand?.primary,
      baseTheme.colors.brand.primary,
    ),
    secondary: processColorInput(
      options.brand?.secondary,
      baseTheme.colors.brand.secondary,
    ),
    accent: processColorInput(
      options.brand?.accent,
      baseTheme.colors.brand.accent,
    ),
  };

  // Process gray scale
  const grayColors = options.gray ?? baseTheme.colors.gray;

  // Build color overrides
  const colorOverrides: DeepPartial<ThemeConfig['colors']> = {
    brand: brandColors,
    gray: grayColors,
  };

  // Process feedback colors if provided
  if (options.feedback) {
    colorOverrides.feedback =
      options.feedback as ThemeConfig['colors']['feedback'];
  }

  // Process semantic overrides
  if (options.semantic?.light) {
    colorOverrides.light = options.semantic.light as SemanticColors;
  }
  if (options.semantic?.dark) {
    colorOverrides.dark = options.semantic.dark as SemanticColors;
  }

  // Build theme overrides object
  const overrides: DeepPartial<ThemeConfig> = {
    name: options.name,
    colors: colorOverrides,
  };

  // Add optional overrides
  if (options.radius) {
    overrides.radius = options.radius;
  }
  if (options.shadow) {
    overrides.shadow = options.shadow;
  }
  if (options.motion) {
    overrides.motion = options.motion;
  }
  if (options.typography) {
    overrides.typography = options.typography;
  }

  // Merge with base theme
  return mergeThemes(baseTheme, overrides);
}

/**
 * Extend an existing theme with overrides
 *
 * @param baseTheme - Theme to extend
 * @param overrides - Partial overrides to apply
 * @returns Extended theme configuration
 *
 * @example
 * ```ts
 * const darkBrandTheme = extendTheme(myTheme, {
 *   colors: {
 *     brand: {
 *       primary: darkerPrimaryScale,
 *     },
 *   },
 * });
 * ```
 */
export function extendTheme(
  baseTheme: ThemeConfig,
  overrides: DeepPartial<ThemeConfig>,
): ThemeConfig {
  return mergeThemes(baseTheme, overrides);
}

/**
 * Create a theme preset for common brand styles
 *
 * @param primaryColor - Primary brand color (hex)
 * @param name - Optional theme name
 * @returns Theme configuration
 */
export function createBrandTheme(
  primaryColor: string,
  name = 'custom-brand',
): ThemeConfig {
  return createTheme({
    name,
    brand: {
      primary: primaryColor,
    },
  });
}
