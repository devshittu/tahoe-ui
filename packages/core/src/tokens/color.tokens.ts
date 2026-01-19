/**
 * Color Design Tokens
 *
 * Centralized color palette for the Tahoe UI design system.
 * Reference: design-principles.md #10 (Confident Simplicity), #14 (Unified Brand Expression)
 *
 * Guidelines:
 * - Neutral palette dominates; accent color is strategic
 * - WCAG AA contrast: 4.5:1 text, 3:1 UI components
 * - Dark mode via semantic aliases (not inverted colors)
 * - Colors indicate meaning: interactive, success, warning, error
 */

export const COLOR_TOKENS = {
  /**
   * Neutral gray scale (light mode primary, dark mode inverted usage)
   * Based on 8-step scale for flexibility
   */
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },

  /**
   * Brand colors
   * Primary: Used for primary actions, links, focus states
   * Secondary: Supporting UI elements, secondary actions
   * Accent: Strategic highlights, attention-grabbing elements
   */
  brand: {
    primary: {
      50: '#F0F9FF',
      100: '#E0F2FE',
      200: '#BAE6FD',
      300: '#7DD3FC',
      400: '#38BDF8',
      500: '#0EA5E9',
      600: '#0284C7',
      700: '#0369A1',
      800: '#075985',
      900: '#0C4A6E',
    },
    secondary: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    accent: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316',
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
    },
  },

  /**
   * Semantic feedback colors
   * Success: Confirmations, completed actions
   * Warning: Caution states, attention needed
   * Error: Destructive actions, validation errors
   * Info: Informational messages, tips
   */
  feedback: {
    success: {
      light: '#DCFCE7',
      base: '#22C55E',
      dark: '#15803D',
    },
    warning: {
      light: '#FEF3C7',
      base: '#F59E0B',
      dark: '#B45309',
    },
    error: {
      light: '#FEE2E2',
      base: '#EF4444',
      dark: '#B91C1C',
    },
    info: {
      light: '#DBEAFE',
      base: '#3B82F6',
      dark: '#1D4ED8',
    },
  },

  /**
   * Semantic color aliases for UI elements
   * These map to appropriate gray/brand values based on context
   */
  semantic: {
    /** Primary text color */
    text: {
      primary: '#171717',
      secondary: '#525252',
      tertiary: '#737373',
      muted: '#A3A3A3',
      inverse: '#FAFAFA',
    },
    /** Background colors */
    background: {
      primary: '#FFFFFF',
      secondary: '#FAFAFA',
      tertiary: '#F5F5F5',
      elevated: '#FFFFFF',
      inverse: '#171717',
    },
    /** Border colors */
    border: {
      default: '#E5E5E5',
      subtle: '#F5F5F5',
      strong: '#D4D4D4',
      focus: '#0EA5E9',
    },
    /** Interactive states */
    interactive: {
      default: '#0EA5E9',
      hover: '#0284C7',
      active: '#0369A1',
      disabled: '#A3A3A3',
    },
  },

  /**
   * Dark mode semantic overrides
   * Apply these when dark mode is active
   */
  dark: {
    text: {
      primary: '#FAFAFA',
      secondary: '#A3A3A3',
      tertiary: '#737373',
      muted: '#525252',
      inverse: '#171717',
    },
    background: {
      primary: '#0A0A0A',
      secondary: '#171717',
      tertiary: '#262626',
      elevated: '#262626',
      inverse: '#FAFAFA',
    },
    border: {
      default: '#404040',
      subtle: '#262626',
      strong: '#525252',
      focus: '#38BDF8',
    },
    interactive: {
      default: '#38BDF8',
      hover: '#0EA5E9',
      active: '#0284C7',
      disabled: '#525252',
    },
  },

  /**
   * Overlay colors for backdrops and modals
   */
  overlay: {
    light: 'rgba(0, 0, 0, 0.5)',
    medium: 'rgba(0, 0, 0, 0.6)',
    heavy: 'rgba(0, 0, 0, 0.75)',
    /** Dark mode overlays */
    darkLight: 'rgba(0, 0, 0, 0.6)',
    darkMedium: 'rgba(0, 0, 0, 0.75)',
    darkHeavy: 'rgba(0, 0, 0, 0.85)',
  },
} as const;

// Type exports
export type GrayShade = keyof typeof COLOR_TOKENS.gray;
export type BrandColor = keyof typeof COLOR_TOKENS.brand;
export type FeedbackColor = keyof typeof COLOR_TOKENS.feedback;
export type SemanticTextColor = keyof typeof COLOR_TOKENS.semantic.text;
export type SemanticBackgroundColor =
  keyof typeof COLOR_TOKENS.semantic.background;
export type SemanticBorderColor = keyof typeof COLOR_TOKENS.semantic.border;
export type SemanticInteractiveColor =
  keyof typeof COLOR_TOKENS.semantic.interactive;
