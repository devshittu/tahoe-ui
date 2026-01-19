/**
 * Shadow Design Tokens
 *
 * Centralized elevation system for the Tahoe UI design system.
 * Reference: design-principles.md #10 (Confident Simplicity)
 *
 * Guidelines:
 * - No drop shadows heavier than `0 4px 12px rgba(0,0,0,0.08)`
 * - Use shadow to communicate hierarchy, not decoration
 * - Layering creates meaning through subtle depth
 * - Dark mode shadows use adjusted opacity
 */

export const SHADOW_TOKENS = {
  /**
   * Elevation scale
   * Progressive depth from subtle to prominent
   * Follows the design principle constraint on shadow intensity
   */
  elevation: {
    /** No shadow */
    none: 'none',
    /** Subtle lift - cards, buttons on hover */
    xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
    /** Light elevation - floating elements */
    sm: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
    /** Base elevation - dropdowns, popovers */
    base: '0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
    /** Medium elevation - modals, dialogs */
    md: '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.04)',
    /** High elevation - max allowed per design principles */
    lg: '0 4px 12px rgba(0, 0, 0, 0.08)',
    /** Extended elevation - only for critical overlays */
    xl: '0 8px 16px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)',
  },

  /**
   * Inset shadows for pressed/active states
   */
  inset: {
    /** Subtle inset - input focus */
    xs: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
    /** Light inset - pressed buttons */
    sm: 'inset 0 1px 3px rgba(0, 0, 0, 0.06)',
    /** Medium inset - active/selected state */
    base: 'inset 0 2px 4px rgba(0, 0, 0, 0.08)',
  },

  /**
   * Focus ring shadows
   * Combined with border for accessibility
   */
  focus: {
    /** Primary focus ring */
    primary: '0 0 0 3px rgba(14, 165, 233, 0.4)',
    /** Error focus ring */
    error: '0 0 0 3px rgba(239, 68, 68, 0.4)',
    /** Success focus ring */
    success: '0 0 0 3px rgba(34, 197, 94, 0.4)',
  },

  /**
   * Component-specific shadow presets
   */
  component: {
    /** Card shadow - subtle elevation */
    card: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
    /** Card hover shadow */
    cardHover: '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.04)',
    /** Button shadow */
    button: '0 1px 2px rgba(0, 0, 0, 0.04)',
    /** Button hover shadow */
    buttonHover: '0 2px 4px rgba(0, 0, 0, 0.06)',
    /** Dropdown/menu shadow */
    dropdown: '0 4px 12px rgba(0, 0, 0, 0.08)',
    /** Modal/dialog shadow */
    modal: '0 8px 16px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)',
    /** Toast/notification shadow */
    toast: '0 4px 12px rgba(0, 0, 0, 0.08)',
    /** Tooltip shadow */
    tooltip: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },

  /**
   * Dark mode shadow adjustments
   * Shadows are more subtle in dark mode as backgrounds are already dark
   */
  dark: {
    elevation: {
      none: 'none',
      xs: '0 1px 2px rgba(0, 0, 0, 0.2)',
      sm: '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
      base: '0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
      md: '0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
      lg: '0 4px 12px rgba(0, 0, 0, 0.4)',
      xl: '0 8px 16px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)',
    },
    focus: {
      primary: '0 0 0 3px rgba(56, 189, 248, 0.5)',
      error: '0 0 0 3px rgba(248, 113, 113, 0.5)',
      success: '0 0 0 3px rgba(74, 222, 128, 0.5)',
    },
  },
} as const;

// Type exports
export type ElevationLevel = keyof typeof SHADOW_TOKENS.elevation;
export type InsetLevel = keyof typeof SHADOW_TOKENS.inset;
export type FocusRingType = keyof typeof SHADOW_TOKENS.focus;
export type ComponentShadow = keyof typeof SHADOW_TOKENS.component;
