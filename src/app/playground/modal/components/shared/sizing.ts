// src/app/playground/modal/components/shared/sizing.ts
'use client';

import type { CSSProperties } from 'react';
import { SPACING_TOKENS } from '@/config/tokens';

/**
 * Dialog max-width preset type
 */
export type DialogMaxWidthPreset = 'narrow' | 'default' | 'wide' | 'extraWide';

/**
 * Dialog sizing options
 */
export type DialogSizingOptions = {
  /** Use a preset max-width */
  preset?: DialogMaxWidthPreset;
  /** Custom max-width in pixels (overrides preset) */
  maxWidth?: number;
  /** Custom min-width in pixels (overrides default) */
  minWidth?: number;
  /** Override viewport max percentage (default: 90) */
  viewportMax?: number;
};

/**
 * Generate content-adaptive sizing styles for Dialog
 *
 * Uses fit-content with min/max constraints to adapt to children
 * while preventing edge cases (too narrow, too wide, viewport overflow).
 *
 * @example
 * // Default behavior - adapts to content, max 600px
 * const styles = getDialogSizingStyles();
 *
 * // With preset
 * const styles = getDialogSizingStyles({ preset: 'wide' });
 *
 * // Custom override
 * const styles = getDialogSizingStyles({ maxWidth: 720 });
 */
export function getDialogSizingStyles(
  options: DialogSizingOptions = {},
): CSSProperties {
  const { dialogSize } = SPACING_TOKENS;

  // Resolve max-width value
  const resolveMaxWidth = (): number => {
    if (options.maxWidth !== undefined) {
      return options.maxWidth;
    }
    if (options.preset) {
      return dialogSize.maxWidth[options.preset];
    }
    return dialogSize.maxWidth.default;
  };

  const minWidth = options.minWidth ?? dialogSize.minWidth;
  const maxWidthPx = resolveMaxWidth();
  const viewportMax = options.viewportMax ?? dialogSize.viewportMax;

  return {
    width: 'fit-content',
    minWidth: `${minWidth}px`,
    // Use CSS min() for viewport-safe max-width
    maxWidth: `min(${viewportMax}vw, ${maxWidthPx}px)`,
  };
}

/**
 * Generate Tailwind class string for Dialog sizing
 *
 * Alternative approach using Tailwind classes where inline styles aren't preferred.
 * Note: Limited flexibility compared to getDialogSizingStyles() due to
 * Tailwind's static class generation.
 *
 * @example
 * const classes = getDialogSizingClasses({ preset: 'wide' });
 * // Returns: "w-fit min-w-[280px] max-w-[min(90vw,800px)]"
 */
export function getDialogSizingClasses(
  options: DialogSizingOptions = {},
): string {
  const { dialogSize } = SPACING_TOKENS;

  const minWidth = options.minWidth ?? dialogSize.minWidth;
  const viewportMax = options.viewportMax ?? dialogSize.viewportMax;

  // Resolve max-width
  let maxWidthPx: number = dialogSize.maxWidth.default;
  if (options.maxWidth !== undefined) {
    maxWidthPx = options.maxWidth;
  } else if (options.preset) {
    maxWidthPx = dialogSize.maxWidth[options.preset];
  }

  // Tailwind arbitrary value syntax
  return [
    'w-fit',
    `min-w-[${minWidth}px]`,
    `max-w-[min(${viewportMax}vw,${maxWidthPx}px)]`,
  ].join(' ');
}
