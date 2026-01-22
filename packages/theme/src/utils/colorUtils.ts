/**
 * Color utilities for generating color scales
 */

import type { ColorScale } from '../types';

/**
 * Parse hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to RGB
 */
function hslToRgb(
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Lighten a color by a percentage
 */
function lighten(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.l = Math.min(100, hsl.l + percent);

  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Darken a color by a percentage
 */
function darken(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.l = Math.max(0, hsl.l - percent);

  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Generate a full color scale from a single base color (500 shade)
 *
 * @param baseColor - Hex color string (the 500 shade)
 * @returns Full color scale from 50 to 950
 *
 * @example
 * ```ts
 * const scale = generateColorScale('#6366F1');
 * // Returns { 50: '#EEF2FF', 100: '#E0E7FF', ... 900: '#312E81' }
 * ```
 */
export function generateColorScale(baseColor: string): ColorScale {
  // Normalize hex
  const hex = baseColor.startsWith('#') ? baseColor : `#${baseColor}`;

  return {
    50: lighten(hex, 45),
    100: lighten(hex, 40),
    200: lighten(hex, 30),
    300: lighten(hex, 20),
    400: lighten(hex, 10),
    500: hex,
    600: darken(hex, 8),
    700: darken(hex, 16),
    800: darken(hex, 24),
    900: darken(hex, 32),
    950: darken(hex, 40),
  };
}

/**
 * Check if a value is a valid hex color
 */
export function isValidHex(color: string): boolean {
  return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(color);
}

/**
 * Check if a value is a ColorScale object
 */
export function isColorScale(value: unknown): value is ColorScale {
  if (typeof value !== 'object' || value === null) return false;
  const scale = value as Record<string, unknown>;
  return (
    typeof scale[50] === 'string' &&
    typeof scale[500] === 'string' &&
    typeof scale[900] === 'string'
  );
}

/**
 * Process color input - either use full scale or generate from single color
 */
export function processColorInput(
  input: string | ColorScale | undefined,
  fallback: ColorScale,
): ColorScale {
  if (!input) return fallback;

  if (typeof input === 'string') {
    if (!isValidHex(input)) {
      console.warn(`Invalid hex color: ${input}. Using fallback.`);
      return fallback;
    }
    return generateColorScale(input);
  }

  if (isColorScale(input)) {
    return input;
  }

  return fallback;
}
