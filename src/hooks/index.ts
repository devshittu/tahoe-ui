// src/hooks/index.ts

/**
 * Tahoe UI Hooks - Reusable React hooks for UI interactions
 */

// Gesture primitives
export * from './gestures';

// Positioning engine
export {
  usePositioning,
  calculatePosition,
  type Placement,
  type Side,
  type Alignment,
  type PositioningOptions,
  type PositionData,
  type UsePositioningReturn,
} from './usePositioning';

// Confirmation flow
export {
  useConfirmation,
  type UseConfirmationOptions,
} from './use-confirmation';
