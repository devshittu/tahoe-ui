/**
 * Border Radius Design Tokens
 *
 * Centralized border radius scale for the Tahoe UI design system.
 * Reference: design-principles.md #4 (System-Level Consistency)
 *
 * Guidelines:
 * - Radius, shadow, and spacing must be consistent across elevation levels
 * - Component variants over one-off modifications
 * - If a pattern exists, use it. If it doesn't, define it before implementing.
 */

export const RADIUS_TOKENS = {
  /**
   * Base radius scale (in pixels)
   * Progressive scale from sharp to fully rounded
   */
  scale: {
    /** No rounding - sharp corners */
    none: 0,
    /** Barely rounded - subtle softness */
    xs: 2,
    /** Small rounding - inputs, small buttons */
    sm: 4,
    /** Base rounding - buttons, cards */
    base: 6,
    /** Medium rounding - larger cards, modals */
    md: 8,
    /** Large rounding - prominent elements */
    lg: 12,
    /** Extra large rounding - feature cards */
    xl: 16,
    /** 2XL rounding - hero elements */
    '2xl': 20,
    /** 3XL rounding - very large containers */
    '3xl': 24,
    /** Full rounding - pills, avatars */
    full: 9999,
  },

  /**
   * Component-specific radius presets
   * Ensures consistency across component families
   */
  component: {
    /** Button variants */
    button: {
      /** Small button radius */
      sm: 4,
      /** Default button radius */
      default: 6,
      /** Large button radius */
      lg: 8,
      /** Pill button - fully rounded */
      pill: 9999,
    },
    /** Input/form element radius */
    input: {
      /** Small input radius */
      sm: 4,
      /** Default input radius */
      default: 6,
      /** Large input radius */
      lg: 8,
    },
    /** Card radius */
    card: {
      /** Small card radius */
      sm: 8,
      /** Default card radius */
      default: 12,
      /** Large card radius */
      lg: 16,
    },
    /** Modal/dialog radius */
    modal: {
      /** Standard modal radius */
      default: 16,
      /** Large modal radius */
      lg: 20,
      /** Full-screen modal (no radius) */
      full: 0,
    },
    /** Badge/tag radius */
    badge: {
      /** Square badge */
      default: 4,
      /** Rounded badge */
      rounded: 6,
      /** Pill badge */
      pill: 9999,
    },
    /** Avatar radius */
    avatar: {
      /** Square avatar with small rounding */
      square: 8,
      /** Rounded square avatar */
      rounded: 12,
      /** Circular avatar */
      circle: 9999,
    },
    /** Tooltip/popover radius */
    tooltip: {
      default: 6,
    },
    /** Dropdown/menu radius */
    dropdown: {
      default: 8,
    },
  },

  /**
   * Interactive element radius (maintains consistency across hover/focus states)
   * These values ensure focus rings align properly with element borders
   */
  interactive: {
    /** Focus ring offset - matches element radius + offset */
    focusRingOffset: 2,
  },
} as const;

// Type exports
export type RadiusScale = keyof typeof RADIUS_TOKENS.scale;
export type ButtonRadius = keyof typeof RADIUS_TOKENS.component.button;
export type InputRadius = keyof typeof RADIUS_TOKENS.component.input;
export type CardRadius = keyof typeof RADIUS_TOKENS.component.card;
export type ModalRadius = keyof typeof RADIUS_TOKENS.component.modal;
export type BadgeRadius = keyof typeof RADIUS_TOKENS.component.badge;
export type AvatarRadius = keyof typeof RADIUS_TOKENS.component.avatar;

// Helper to get pixel value as string for CSS
export const getRadiusValue = (radius: number): string =>
  radius === 9999 ? '9999px' : `${radius}px`;
