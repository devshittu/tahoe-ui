// src/hooks/gestures/index.ts

/**
 * Gesture Primitives - Reusable gesture detection hooks
 *
 * These hooks provide cross-platform gesture detection following
 * Apple-inspired design principles with accessibility support.
 */

export {
  useLongPress,
  type UseLongPressOptions,
  type UseLongPressReturn,
  type LongPressStage,
} from './useLongPress';

export {
  useHoverIntent,
  type UseHoverIntentOptions,
  type UseHoverIntentReturn,
} from './useHoverIntent';

export {
  useSwipe,
  type UseSwipeOptions,
  type UseSwipeReturn,
  type SwipeDirection,
} from './useSwipe';
