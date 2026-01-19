// src/components/Button/index.ts

/**
 * Button Component Module
 *
 * Physics-based button with Apple-inspired interactions.
 * Features spring animations, haptic feedback support, and full accessibility.
 *
 * @example
 * ```tsx
 * import { Button } from '@/components/Button';
 *
 * // Primary solid button
 * <Button variant="solid" color="primary">
 *   Click me
 * </Button>
 *
 * // Glass button with icon
 * <Button variant="glass" leftIcon={<FiPlus />}>
 *   Create
 * </Button>
 *
 * // Loading state
 * <Button isLoading loadingText="Saving...">
 *   Save
 * </Button>
 * ```
 */

export { default as Button, Button as default } from './Button';

export type {
  ButtonProps,
  ButtonVariant,
  ButtonColor,
  ButtonSize,
  ButtonRadius,
  ButtonSpringConfig,
  HapticFeedback,
} from './types';

export {
  BUTTON_SIZE_CONFIG,
  BUTTON_RADIUS_CONFIG,
  BUTTON_COLOR_CONFIG,
  BUTTON_SPRING_CONFIG,
  BUTTON_ANIMATION_VARIANTS,
} from './types';

// Re-export specialized button variants
export { default as AnimatedButton } from './AnimatedButton';
export { default as DropdownButton } from './DropdownButton';
export { default as ExpandableButton } from './ExpandableButton';
export { default as GlassButton } from './GlassButton';
export { default as IconButton } from './IconButton';
export { default as SkeletonButton } from './SkeletonButton';
export { default as ToggleButton } from './ToggleButton';
