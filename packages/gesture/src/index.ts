/**
 * @tahoe-ui/gesture
 *
 * Gesture detection hooks for the Tahoe UI design system.
 * Provides cross-platform gesture detection with accessibility support.
 *
 * @packageDocumentation
 *
 * @example
 * ```tsx
 * import { useLongPress, useSwipe, useHoverIntent } from '@tahoe-ui/gesture';
 *
 * // Long press with progressive feedback
 * const { pressProps, progress, stage } = useLongPress({
 *   threshold: 500,
 *   onComplete: () => showContextMenu(),
 * });
 *
 * // Swipe for carousels
 * const { swipeProps, offset } = useSwipe({
 *   axis: 'x',
 *   onSwipeLeft: () => goNext(),
 * });
 *
 * // Hover intent for hover cards
 * const { hoverProps, isHovering } = useHoverIntent({
 *   openDelay: 300,
 *   onHoverStart: () => prefetch(),
 * });
 * ```
 */

// Long press
export { useLongPress, default as useLongPressDefault } from './useLongPress';
export type {
  UseLongPressOptions,
  UseLongPressReturn,
  LongPressStage,
} from './useLongPress';

// Swipe
export { useSwipe, default as useSwipeDefault } from './useSwipe';
export type {
  UseSwipeOptions,
  UseSwipeReturn,
  SwipeDirection,
} from './useSwipe';

// Hover intent
export {
  useHoverIntent,
  default as useHoverIntentDefault,
} from './useHoverIntent';
export type {
  UseHoverIntentOptions,
  UseHoverIntentReturn,
} from './useHoverIntent';

// Slide to Confirm
export { SlideToConfirm, SlideToConfirmDefault } from './slidetoconfirm';
export type {
  SlideToConfirmProps,
  SlideToConfirmVariant,
  SlideDirection,
  SpringConfig,
} from './slidetoconfirm';
export {
  SLIDE_TO_CONFIRM_CONFIG,
  SPRING_CONFIGS as SLIDE_SPRING_CONFIGS,
  VARIANT_STYLES as SLIDE_VARIANT_STYLES,
} from './slidetoconfirm';

// Long Press Reveal
export {
  LongPressReveal,
  LongPressRevealDefault,
  RevealOverlay,
  RevealPortal,
  ProgressRing,
  QuickAction,
  QuickActionsBar,
  useLongPressReveal,
  useLongPressRevealDefault,
} from './longpressreveal';
export type {
  LongPressRevealProps,
  LongPressRevealRenderProps,
  UseLongPressRevealOptions,
  UseLongPressRevealReturn,
  LongPressRevealConfig,
  RevealVariant,
  RevealDirection,
  RevealOverlayProps,
  RevealPortalProps,
  ProgressRingProps,
  QuickActionProps,
  QuickActionsBarProps,
} from './longpressreveal';
export {
  LONG_PRESS_REVEAL_CONFIG,
  HAPTIC_PATTERNS,
  SPRING_CONFIGS as REVEAL_SPRING_CONFIGS,
  STAGE_FEEDBACK,
  REVEAL_VARIANT_STYLES,
  ACTION_VARIANT_STYLES,
} from './longpressreveal';

// Re-export HapticIntensity from both (they're the same type)
export type { HapticIntensity } from './slidetoconfirm';
