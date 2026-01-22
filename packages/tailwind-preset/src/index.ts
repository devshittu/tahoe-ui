/**
 * @tahoe-ui/tailwind-preset
 *
 * Tailwind CSS preset for Tahoe UI theme integration.
 * Maps CSS variables to Tailwind utilities for seamless theming.
 *
 * @example
 * ```ts
 * // tailwind.config.ts
 * import { tahoePreset } from '@tahoe-ui/tailwind-preset';
 *
 * export default {
 *   presets: [tahoePreset()],
 *   content: ['./src/** /*.{ts,tsx}'],
 * };
 * ```
 */

import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import {
  themeColors,
  themeSpacing,
  themeBorderRadius,
  themeShadow,
  themeTransitionDuration,
  themeTransitionTimingFunction,
  themeFontFamily,
} from './colors';

/**
 * Options for the Tahoe preset
 */
export interface TahoePresetOptions {
  /**
   * Prefix for CSS variables (default: 'tahoe')
   */
  prefix?: string;

  /**
   * Include reduced motion utilities
   * @default true
   */
  includeReducedMotion?: boolean;

  /**
   * Include focus ring utilities
   * @default true
   */
  includeFocusRing?: boolean;
}

/**
 * Create the Tahoe UI Tailwind preset
 *
 * @param options - Preset configuration options
 * @returns Tailwind preset configuration
 *
 * @example
 * ```ts
 * // Basic usage
 * import { tahoePreset } from '@tahoe-ui/tailwind-preset';
 *
 * export default {
 *   presets: [tahoePreset()],
 *   content: ['./src/** /*.{ts,tsx}'],
 * };
 *
 * // With options
 * export default {
 *   presets: [tahoePreset({ includeReducedMotion: true })],
 *   content: ['./src/** /*.{ts,tsx}'],
 * };
 * ```
 */
export function tahoePreset(options: TahoePresetOptions = {}): Partial<Config> {
  const { includeReducedMotion = true, includeFocusRing = true } = options;

  const plugins: Config['plugins'] = [];

  // Focus ring plugin
  if (includeFocusRing) {
    plugins.push(
      plugin(({ addUtilities }) => {
        addUtilities({
          '.focus-ring': {
            outline: 'none',
            boxShadow: 'var(--tahoe-shadow-focus)',
          },
          '.focus-ring-error': {
            outline: 'none',
            boxShadow: 'var(--tahoe-shadow-focus-error)',
          },
          '.focus-ring-success': {
            outline: 'none',
            boxShadow: 'var(--tahoe-shadow-focus-success)',
          },
        });
      }),
    );
  }

  // Reduced motion plugin
  if (includeReducedMotion) {
    plugins.push(
      plugin(({ addUtilities }) => {
        addUtilities({
          '.motion-safe': {
            '@media (prefers-reduced-motion: no-preference)': {
              transitionDuration: 'var(--tahoe-motion-duration-base)',
            },
          },
          '.motion-reduce': {
            '@media (prefers-reduced-motion: reduce)': {
              transitionDuration: '0ms',
              animationDuration: '0ms',
            },
          },
        });
      }),
    );
  }

  return {
    theme: {
      extend: {
        colors: themeColors,
        spacing: themeSpacing,
        borderRadius: themeBorderRadius,
        boxShadow: themeShadow,
        transitionDuration: themeTransitionDuration,
        transitionTimingFunction: themeTransitionTimingFunction,
        fontFamily: themeFontFamily,
      },
    },
    plugins,
  };
}

// Re-export color mappings for advanced usage
export {
  themeColors,
  brandColors,
  grayColors,
  textColors,
  backgroundColors,
  borderColors,
  interactiveColors,
  feedbackColors,
  themeSpacing,
  themeBorderRadius,
  themeShadow,
  themeTransitionDuration,
  themeTransitionTimingFunction,
  themeFontFamily,
} from './colors';

// Default export for convenience
export default tahoePreset;
