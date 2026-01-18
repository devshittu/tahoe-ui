// src/app/playground/progress-bar/components/index.ts

/**
 * ProgressBar - Visual progress and loading indicator
 *
 * A versatile progress indicator supporting both determinate
 * (percentage-based) and indeterminate (loading) states.
 *
 * Features:
 * - Determinate mode (0-100%) with smooth animation
 * - Indeterminate mode for unknown duration
 * - Five semantic colors
 * - Three sizes (sm, md, lg)
 * - Optional percentage label
 * - Striped and animated variants
 * - Full ARIA progressbar semantics
 * - Respects prefers-reduced-motion
 *
 * @example
 * ```tsx
 * import { ProgressBar } from './components';
 *
 * // Basic usage
 * <ProgressBar value={75} />
 *
 * // Loading state
 * <ProgressBar indeterminate />
 *
 * // With label
 * <ProgressBar value={45} showLabel color="success" />
 * ```
 */

export { ProgressBar } from './ProgressBar';
export type {
  ProgressBarProps,
  ProgressBarSize,
  ProgressBarColor,
} from './types';
export {
  PROGRESS_SIZE_CONFIG,
  PROGRESS_COLOR_CONFIG,
  PROGRESS_ANIMATION_CONFIG,
  defaultLabelFormat,
} from './types';
