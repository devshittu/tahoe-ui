/**
 * Spacing Design Tokens
 *
 * Centralized spacing, sizing, and z-index values following design principles:
 * - 8pt grid system
 * - 44px minimum touch targets (WCAG)
 * - Consistent z-index scale for layering
 */

export const SPACING_TOKENS = {
  /**
   * Touch target sizes per WCAG and design principles
   * Reference: design-principles.md #9 (Obvious Affordances)
   */
  touchTarget: {
    /** WCAG 2.1 minimum (44x44px) */
    minimum: 44,
    /** Comfortable touch target for primary actions */
    comfortable: 48,
    /** Large touch targets for prominent actions */
    large: 56,
  },

  /**
   * Handlebar zone dimensions for modal drag interactions
   * Reduced from original 60-80px to proper 44-48px touch targets
   */
  handlebar: {
    /** Horizontal handlebar zones (top/bottom position) */
    horizontal: {
      height: 48,
      minHeight: 44,
      maxHeight: 56,
    },
    /** Vertical handlebar zones (left/right position) */
    vertical: {
      width: 48,
      minWidth: 44,
      maxWidth: 56,
      /** Narrower on small screens to preserve content space */
      smallScreen: {
        width: 44,
        minWidth: 40,
        maxWidth: 48,
      },
    },
    /** Visual handlebar line indicator */
    line: {
      thickness: 5,
      length: {
        min: 48,
        max: 80,
      },
    },
  },

  /**
   * Z-index scale for modal stacking
   * Modal store can override with dynamic values for stacking
   */
  zIndex: {
    /** Backdrop layer */
    backdrop: 9998,
    /** Modal content layer */
    modal: 9999,
    /** Close indicator overlay */
    closeIndicator: 10000,
    /** Increment for each stacked modal */
    stackIncrement: 10,
  },

  /**
   * Content padding values
   */
  padding: {
    /** Space reserved for handlebar zone + buffer */
    handlebarClearance: 52,
    /** Standard content padding */
    content: 16,
    /** Larger content padding for primary areas */
    contentLarge: 24,
  },

  /**
   * Modal size presets for PageMode
   */
  modalSize: {
    small: '50',
    medium: '65',
    large: '80',
    full: '100',
  },

  /**
   * Dialog sizing constraints for content-adaptive behavior
   *
   * Philosophy: Dialog uses fit-content with min/max constraints to adapt
   * to children while preventing edge cases (too narrow, too wide, overflow).
   */
  dialogSize: {
    /** Minimum width to prevent overly narrow dialogs */
    minWidth: 280,
    /** Maximum width presets */
    maxWidth: {
      /** Confirmations, alerts, simple prompts */
      narrow: 400,
      /** Standard content - forms, messages */
      default: 600,
      /** Data-heavy content, tables, wider forms */
      wide: 800,
      /** Dashboards, complex layouts */
      extraWide: 1200,
    },
    /** Viewport-relative maximum (prevents overflow) */
    viewportMax: 90,
    /** Height constraint */
    maxHeight: 90,
  },
} as const;

// Type exports for TypeScript inference
export type TouchTargetSize = keyof typeof SPACING_TOKENS.touchTarget;
export type ModalSizePreset = keyof typeof SPACING_TOKENS.modalSize;
export type DialogSizePreset = keyof typeof SPACING_TOKENS.dialogSize.maxWidth;
