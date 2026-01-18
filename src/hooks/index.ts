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

// Media query and breakpoints
export { useMediaQuery } from './useMediaQuery';
export {
  useBreakpoint,
  breakpoints,
  type BreakpointKey,
  type BreakpointState,
} from './useBreakpoint';

// Focus management
export {
  useFocusTrap,
  type UseFocusTrapOptions,
  type UseFocusTrapReturn,
} from './useFocusTrap';

// Click outside detection
export {
  useClickOutside,
  type UseClickOutsideOptions,
  type UseClickOutsideReturn,
} from './useClickOutside';

// Escape key handling
export {
  useEscapeKey,
  getEscapeStack,
  clearEscapeStack,
  type UseEscapeKeyOptions,
} from './useEscapeKey';
