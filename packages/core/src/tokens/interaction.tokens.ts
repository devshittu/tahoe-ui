/**
 * Interaction State Tokens
 *
 * Centralized definitions for hover, active, focus, and disabled states
 * ensuring consistent interaction patterns across all components.
 */

/**
 * Transition durations for state changes
 */
export const INTERACTION_DURATION = {
  instant: '0ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
} as const;

/**
 * Opacity values for interaction states
 */
export const INTERACTION_OPACITY = {
  default: 1,
  hover: 0.9,
  active: 0.95,
  disabled: 0.5,
  muted: 0.6,
} as const;

/**
 * Scale transforms for press/active states
 */
export const INTERACTION_SCALE = {
  default: 1,
  hover: 1.02,
  active: 0.98,
  pressed: 0.96,
} as const;

/**
 * Background color shifts for hover states
 */
export const HOVER_BACKGROUNDS = {
  light: {
    subtle: 'hover:bg-gray-50',
    default: 'hover:bg-gray-100',
    strong: 'hover:bg-gray-200',
  },
  dark: {
    subtle: 'dark:hover:bg-gray-900',
    default: 'dark:hover:bg-gray-800',
    strong: 'dark:hover:bg-gray-700',
  },
} as const;

/**
 * Focus ring styles
 */
export const FOCUS_RING = {
  default:
    'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2',
  inset:
    'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-inset',
  visible:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:ring-offset-2',
  none: 'focus:outline-none',
} as const;

/**
 * Disabled state styles
 */
export const DISABLED_STYLES = {
  opacity: 'disabled:opacity-50',
  cursor: 'disabled:cursor-not-allowed',
  pointer: 'disabled:pointer-events-none',
  full: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
} as const;

/**
 * Active/pressed state styles
 */
export const ACTIVE_STYLES = {
  scale: 'active:scale-[0.98]',
  opacity: 'active:opacity-95',
  background: {
    light: 'active:bg-gray-200',
    dark: 'dark:active:bg-gray-700',
  },
} as const;

/**
 * Complete interaction state presets for common use cases
 */
export const INTERACTION_PRESETS = {
  /** For clickable elements without background */
  ghost: [
    'transition-colors',
    INTERACTION_DURATION.fast,
    HOVER_BACKGROUNDS.light.default,
    HOVER_BACKGROUNDS.dark.default,
    FOCUS_RING.visible,
    DISABLED_STYLES.full,
  ].join(' '),

  /** For subtle interactive elements */
  subtle: [
    'transition-all',
    INTERACTION_DURATION.fast,
    HOVER_BACKGROUNDS.light.subtle,
    HOVER_BACKGROUNDS.dark.subtle,
    FOCUS_RING.visible,
    DISABLED_STYLES.full,
  ].join(' '),

  /** For primary action buttons */
  button: [
    'transition-all',
    INTERACTION_DURATION.fast,
    ACTIVE_STYLES.scale,
    FOCUS_RING.default,
    DISABLED_STYLES.full,
  ].join(' '),

  /** For card-like interactive surfaces */
  card: [
    'transition-all',
    INTERACTION_DURATION.normal,
    'hover:shadow-md',
    'hover:-translate-y-0.5',
    FOCUS_RING.visible,
  ].join(' '),

  /** For list items */
  listItem: [
    'transition-colors',
    INTERACTION_DURATION.fast,
    HOVER_BACKGROUNDS.light.subtle,
    HOVER_BACKGROUNDS.dark.subtle,
    FOCUS_RING.inset,
  ].join(' '),
} as const;

/**
 * Consolidated interaction tokens export
 */
export const INTERACTION_TOKENS = {
  duration: INTERACTION_DURATION,
  opacity: INTERACTION_OPACITY,
  scale: INTERACTION_SCALE,
  hover: HOVER_BACKGROUNDS,
  focus: FOCUS_RING,
  disabled: DISABLED_STYLES,
  active: ACTIVE_STYLES,
  presets: INTERACTION_PRESETS,
} as const;

export type InteractionDuration = keyof typeof INTERACTION_DURATION;
export type InteractionPreset = keyof typeof INTERACTION_PRESETS;
