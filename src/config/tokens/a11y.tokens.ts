// src/config/tokens/a11y.tokens.ts

/**
 * Accessibility Tokens
 *
 * Formalized accessibility patterns ensuring WCAG compliance
 * and consistent accessible behavior across all components.
 */

/**
 * Minimum touch target sizes (WCAG 2.1 Success Criterion 2.5.5)
 */
export const TOUCH_TARGETS = {
  /** Absolute minimum - only use when space is extremely constrained */
  minimum: 44,
  /** Comfortable touch target for most interactions */
  comfortable: 48,
  /** Large touch target for primary actions */
  large: 56,
} as const;

/**
 * Focus ring configuration
 */
export const FOCUS_RING_CONFIG = {
  /** Ring width in pixels */
  width: 2,
  /** Ring offset from element edge */
  offset: 2,
  /** Ring color (CSS value) */
  color: 'rgb(59 130 246 / 0.5)', // blue-500/50
  /** Error state ring color */
  errorColor: 'rgb(239 68 68 / 0.5)', // red-500/50
  /** Success state ring color */
  successColor: 'rgb(34 197 94 / 0.5)', // green-500/50
} as const;

/**
 * Color contrast requirements (WCAG 2.1)
 */
export const CONTRAST_RATIOS = {
  /** Normal text minimum (AA) */
  textAA: 4.5,
  /** Large text minimum (AA) */
  largeTextAA: 3,
  /** UI components minimum (AA) */
  uiComponentAA: 3,
  /** Normal text minimum (AAA) */
  textAAA: 7,
  /** Large text minimum (AAA) */
  largeTextAAA: 4.5,
} as const;

/**
 * Screen reader utility classes
 */
export const SR_UTILITIES = {
  /** Visually hidden but accessible to screen readers */
  only: 'sr-only',
  /** Remove sr-only when focused */
  focusable: 'sr-only focus:not-sr-only',
  /** Skip to content link pattern */
  skipLink:
    'sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black',
} as const;

/**
 * ARIA live region configurations
 */
export const LIVE_REGIONS = {
  /** For non-critical status updates */
  polite: {
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': true,
  },
  /** For critical alerts and errors */
  assertive: {
    role: 'alert',
    'aria-live': 'assertive',
    'aria-atomic': true,
  },
  /** For progress updates */
  progress: {
    role: 'progressbar',
    'aria-live': 'polite',
  },
} as const;

/**
 * Keyboard navigation patterns
 */
export const KEYBOARD_PATTERNS = {
  /** Standard button activation */
  button: ['Enter', ' '],
  /** Link activation */
  link: ['Enter'],
  /** Close/dismiss */
  close: ['Escape'],
  /** Navigation */
  arrows: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
  /** Tab navigation */
  tab: ['Tab'],
  /** Home/End for lists */
  homeEnd: ['Home', 'End'],
} as const;

/**
 * Reduced motion preference utilities
 */
export const REDUCED_MOTION = {
  /** CSS media query */
  mediaQuery: '(prefers-reduced-motion: reduce)',
  /** Tailwind class for respecting preference */
  respectPreference: 'motion-reduce:transition-none motion-reduce:animate-none',
  /** CSS value for reduced motion */
  cssValue: 'prefers-reduced-motion: reduce',
} as const;

/**
 * Form accessibility patterns
 */
export const FORM_A11Y = {
  /** Required field indicator */
  required: {
    'aria-required': true,
  },
  /** Invalid field state */
  invalid: {
    'aria-invalid': true,
  },
  /** Described by pattern (for error messages) */
  describedBy: (id: string) => ({
    'aria-describedby': id,
  }),
  /** Labelled by pattern */
  labelledBy: (id: string) => ({
    'aria-labelledby': id,
  }),
} as const;

/**
 * Modal/dialog accessibility patterns
 */
export const MODAL_A11Y = {
  /** Dialog role attributes */
  dialog: {
    role: 'dialog',
    'aria-modal': true,
  },
  /** Alert dialog role attributes */
  alertDialog: {
    role: 'alertdialog',
    'aria-modal': true,
  },
} as const;

/**
 * Consolidated accessibility tokens export
 */
export const A11Y_TOKENS = {
  touchTargets: TOUCH_TARGETS,
  focusRing: FOCUS_RING_CONFIG,
  contrast: CONTRAST_RATIOS,
  sr: SR_UTILITIES,
  liveRegions: LIVE_REGIONS,
  keyboard: KEYBOARD_PATTERNS,
  reducedMotion: REDUCED_MOTION,
  form: FORM_A11Y,
  modal: MODAL_A11Y,
} as const;

export type A11yTouchTarget = keyof typeof TOUCH_TARGETS;
export type LiveRegionType = keyof typeof LIVE_REGIONS;
