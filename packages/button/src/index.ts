/**
 * @tahoe-ui/button
 *
 * Physics-based button components for the Tahoe UI design system.
 * Features spring animations, haptic feedback support, and full accessibility.
 *
 * @packageDocumentation
 *
 * @example
 * ```tsx
 * import {
 *   Button,
 *   IconButton,
 *   GlassButton,
 *   ToggleButton,
 *   AnimatedButton,
 *   DropdownButton,
 *   ExpandableButton,
 *   SkeletonButton,
 * } from '@tahoe-ui/button';
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
 *
 * // Icon-only button
 * <IconButton
 *   ariaLabel="Delete item"
 *   icon={<FiTrash />}
 *   color="error"
 * />
 * ```
 */

// Core Button component
export { Button, default } from './Button';

// Button variants
export {
  AnimatedButton,
  default as AnimatedButtonDefault,
} from './AnimatedButton';
export {
  DropdownButton,
  default as DropdownButtonDefault,
} from './DropdownButton';
export {
  ExpandableButton,
  default as ExpandableButtonDefault,
} from './ExpandableButton';
export { GlassButton, default as GlassButtonDefault } from './GlassButton';
export { IconButton, default as IconButtonDefault } from './IconButton';
export {
  SkeletonButton,
  default as SkeletonButtonDefault,
} from './SkeletonButton';
export { ToggleButton, default as ToggleButtonDefault } from './ToggleButton';

// Types
export type {
  ButtonProps,
  ButtonVariant,
  ButtonColor,
  ButtonSize,
  ButtonRadius,
  ButtonSpringConfig,
  HapticFeedback,
  IconButtonProps,
  AnimatedButtonProps,
  ToggleButtonProps,
  DropdownButtonProps,
  ExpandableButtonProps,
  SkeletonButtonProps,
} from './types';

// Configuration constants
export {
  BUTTON_SIZE_CONFIG,
  BUTTON_RADIUS_CONFIG,
  BUTTON_COLOR_CONFIG,
  BUTTON_SPRING_CONFIG,
  BUTTON_ANIMATION_VARIANTS,
  ANIMATED_BUTTON_CLASSES,
  SKELETON_ROUNDED_CLASSES,
} from './types';
