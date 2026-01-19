'use client';

import type { CSSProperties } from 'react';
import type { DialogMaxWidthPreset } from './types';
import { SPACING_DEFAULTS } from './types';

export type DialogSizingOptions = {
  preset?: DialogMaxWidthPreset;
  maxWidth?: number;
  minWidth?: number;
  viewportMax?: number;
};

/**
 * Generate content-adaptive sizing styles for Dialog
 */
export function getDialogSizingStyles(
  options: DialogSizingOptions = {},
): CSSProperties {
  const { dialogSize } = SPACING_DEFAULTS;

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
    maxWidth: `min(${viewportMax}vw, ${maxWidthPx}px)`,
  };
}

/**
 * Generate Tailwind class string for Dialog sizing
 */
export function getDialogSizingClasses(
  options: DialogSizingOptions = {},
): string {
  const { dialogSize } = SPACING_DEFAULTS;

  const minWidth = options.minWidth ?? dialogSize.minWidth;
  const viewportMax = options.viewportMax ?? dialogSize.viewportMax;

  let maxWidthPx: number = dialogSize.maxWidth.default;
  if (options.maxWidth !== undefined) {
    maxWidthPx = options.maxWidth;
  } else if (options.preset) {
    maxWidthPx = dialogSize.maxWidth[options.preset];
  }

  return [
    'w-fit',
    `min-w-[${minWidth}px]`,
    `max-w-[min(${viewportMax}vw,${maxWidthPx}px)]`,
  ].join(' ');
}
