/**
 * Deep merge utility for theme objects
 */

import type { ThemeConfig, PartialThemeConfig } from '../types';

/**
 * Check if a value is a plain object
 */
function isObject(item: unknown): item is Record<string, unknown> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects
 */
function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>,
): T {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key as keyof typeof source];
      const targetValue = target[key as keyof typeof target];

      if (isObject(sourceValue) && isObject(targetValue)) {
        (output as Record<string, unknown>)[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>,
        );
      } else if (sourceValue !== undefined) {
        (output as Record<string, unknown>)[key] = sourceValue;
      }
    });
  }

  return output;
}

/**
 * Merge a partial theme config with a base theme
 *
 * @param base - Base theme configuration
 * @param overrides - Partial overrides to apply
 * @returns Merged theme configuration
 *
 * @example
 * ```ts
 * const merged = mergeThemes(defaultTheme, {
 *   colors: {
 *     brand: {
 *       primary: customPrimaryScale,
 *     },
 *   },
 * });
 * ```
 */
export function mergeThemes(
  base: ThemeConfig,
  overrides: PartialThemeConfig,
): ThemeConfig {
  return deepMerge(
    base as unknown as Record<string, unknown>,
    overrides as unknown as Record<string, unknown>,
  ) as unknown as ThemeConfig;
}

/**
 * Create a shallow clone of a theme
 */
export function cloneTheme(theme: ThemeConfig): ThemeConfig {
  return JSON.parse(JSON.stringify(theme));
}
