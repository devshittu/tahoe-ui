/**
 * Default Tahoe UI Theme
 *
 * Built from core design tokens with full color scales,
 * semantic mappings for light/dark modes, and motion presets.
 */

import type { ThemeConfig } from '../types';

/**
 * Default theme configuration
 *
 * This theme provides:
 * - Sky blue primary brand color
 * - Slate secondary color
 * - Orange accent color
 * - Neutral gray scale
 * - Semantic color mappings for light/dark modes
 * - Consistent spacing, radius, shadow, and motion tokens
 */
export const defaultTheme: ThemeConfig = {
  name: 'tahoe-default',

  colors: {
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
        950: '#082F49',
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
        950: '#020617',
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
        950: '#431407',
      },
    },

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

    light: {
      text: {
        primary: '#171717',
        secondary: '#525252',
        tertiary: '#737373',
        muted: '#A3A3A3',
        inverse: '#FAFAFA',
      },
      background: {
        primary: '#FFFFFF',
        secondary: '#FAFAFA',
        tertiary: '#F5F5F5',
        elevated: '#FFFFFF',
        inverse: '#171717',
      },
      border: {
        default: '#E5E5E5',
        subtle: '#F5F5F5',
        strong: '#D4D4D4',
        focus: '#0EA5E9',
      },
      interactive: {
        default: '#0EA5E9',
        hover: '#0284C7',
        active: '#0369A1',
        disabled: '#A3A3A3',
      },
    },

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
  },

  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },

  radius: {
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    full: '9999px',
  },

  shadow: {
    elevation: {
      none: 'none',
      xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
      sm: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
      md: '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.04)',
      lg: '0 4px 12px rgba(0, 0, 0, 0.08)',
      xl: '0 8px 16px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)',
    },
    focus: {
      default: '0 0 0 3px rgba(14, 165, 233, 0.4)',
      error: '0 0 0 3px rgba(239, 68, 68, 0.4)',
      success: '0 0 0 3px rgba(34, 197, 94, 0.4)',
    },
  },

  motion: {
    duration: {
      instant: '0ms',
      fast: '150ms',
      base: '250ms',
      slow: '400ms',
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      linear: 'linear',
    },
    spring: {
      default: {
        type: 'spring',
        stiffness: 280,
        damping: 28,
        mass: 0.8,
      },
      snappy: {
        type: 'spring',
        stiffness: 400,
        damping: 20,
        mass: 0.5,
      },
      gentle: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 1,
      },
      reduced: {
        type: 'spring',
        stiffness: 1000,
        damping: 100,
        mass: 1,
      },
    },
  },

  typography: {
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    },
  },
};
