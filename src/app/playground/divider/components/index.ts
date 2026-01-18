// src/app/playground/divider/components/index.ts

/**
 * Divider - Visual content separator
 *
 * A simple, flexible divider component for separating
 * content sections with optional text or elements.
 *
 * Features:
 * - Horizontal and vertical orientation
 * - Three line styles (solid, dashed, dotted)
 * - Three thickness levels
 * - Optional centered content (text/icons)
 * - Content alignment (start, center, end)
 * - Configurable spacing
 * - Dark mode support
 *
 * @example
 * ```tsx
 * import { Divider } from './components';
 *
 * // Simple horizontal divider
 * <Divider />
 *
 * // With text
 * <Divider>or continue with</Divider>
 *
 * // Vertical in a flex row
 * <div className="flex items-center gap-4">
 *   <span>Left</span>
 *   <Divider orientation="vertical" />
 *   <span>Right</span>
 * </div>
 * ```
 */

export { Divider } from './Divider';
export type {
  DividerProps,
  DividerOrientation,
  DividerVariant,
  DividerThickness,
  DividerAlign,
} from './types';
export {
  DIVIDER_THICKNESS_CONFIG,
  DIVIDER_COLOR_CONFIG,
  DIVIDER_VARIANT_CONFIG,
  DIVIDER_SPACING_CONFIG,
  DIVIDER_ALIGN_CONFIG,
} from './types';
