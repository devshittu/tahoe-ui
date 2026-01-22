/**
 * @tahoe-ui/theme - Type Definitions
 *
 * Comprehensive type system for CSS variable-based theming.
 */

/**
 * Color scale for brand colors (50-950)
 */
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
}

/**
 * Feedback color with light/base/dark variants
 */
export interface FeedbackColor {
  light: string;
  base: string;
  dark: string;
}

/**
 * Semantic text colors
 */
export interface SemanticTextColors {
  primary: string;
  secondary: string;
  tertiary: string;
  muted: string;
  inverse: string;
}

/**
 * Semantic background colors
 */
export interface SemanticBackgroundColors {
  primary: string;
  secondary: string;
  tertiary: string;
  elevated: string;
  inverse: string;
}

/**
 * Semantic border colors
 */
export interface SemanticBorderColors {
  default: string;
  subtle: string;
  strong: string;
  focus: string;
}

/**
 * Interactive state colors
 */
export interface SemanticInteractiveColors {
  default: string;
  hover: string;
  active: string;
  disabled: string;
}

/**
 * Semantic color tokens for text/bg/border
 */
export interface SemanticColors {
  text: SemanticTextColors;
  background: SemanticBackgroundColors;
  border: SemanticBorderColors;
  interactive: SemanticInteractiveColors;
}

/**
 * Radius scale configuration
 */
export interface RadiusScale {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

/**
 * Shadow scale configuration
 */
export interface ShadowScale {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

/**
 * Focus shadow configuration
 */
export interface FocusShadows {
  default: string;
  error: string;
  success: string;
}

/**
 * Duration scale for animations
 */
export interface DurationScale {
  instant: string;
  fast: string;
  base: string;
  slow: string;
}

/**
 * Easing curves for animations
 */
export interface EasingScale {
  smooth: string;
  easeOut: string;
  easeIn: string;
  linear: string;
}

/**
 * Spring physics configuration for Framer Motion
 */
export interface SpringConfig {
  type: 'spring';
  stiffness: number;
  damping: number;
  mass?: number;
}

/**
 * Spring presets
 */
export interface SpringPresets {
  default: SpringConfig;
  snappy: SpringConfig;
  gentle: SpringConfig;
  reduced: SpringConfig;
}

/**
 * Typography configuration
 */
export interface TypographyConfig {
  fontFamily: {
    sans: string;
    mono: string;
    serif?: string;
  };
}

/**
 * Spacing scale
 */
export interface SpacingScale {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
}

/**
 * Complete theme configuration
 */
export interface ThemeConfig {
  /** Theme name for identification */
  name: string;

  colors: {
    /** Brand color palette - customizable by developers */
    brand: {
      primary: ColorScale;
      secondary: ColorScale;
      accent: ColorScale;
    };

    /** Neutral gray scale */
    gray: ColorScale;

    /** Feedback/status colors */
    feedback: {
      success: FeedbackColor;
      warning: FeedbackColor;
      error: FeedbackColor;
      info: FeedbackColor;
    };

    /** Semantic mapping for light mode */
    light: SemanticColors;

    /** Semantic mapping for dark mode */
    dark: SemanticColors;
  };

  /** Spacing scale */
  spacing: SpacingScale;

  /** Border radius scale */
  radius: RadiusScale;

  /** Shadow configuration */
  shadow: {
    elevation: ShadowScale;
    focus: FocusShadows;
  };

  /** Motion configuration */
  motion: {
    duration: DurationScale;
    easing: EasingScale;
    spring: SpringPresets;
  };

  /** Typography configuration */
  typography?: TypographyConfig;
}

/**
 * Deep partial type for extending themes
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Partial theme config for customization
 */
export type PartialThemeConfig = DeepPartial<ThemeConfig>;

/**
 * Theme mode (light/dark)
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Resolved theme mode (never 'system')
 */
export type ResolvedThemeMode = 'light' | 'dark';

/**
 * CSS variables record
 */
export type CSSVariables = Record<string, string>;

/**
 * Theme context value
 */
export interface ThemeContextValue {
  /** Current theme configuration */
  theme: ThemeConfig;
  /** Generated CSS variables */
  cssVariables: CSSVariables;
  /** Current theme mode setting */
  mode: ThemeMode;
  /** Set theme mode */
  setMode: (mode: ThemeMode) => void;
  /** Resolved mode (light or dark, never system) */
  resolvedMode: ResolvedThemeMode;
}

/**
 * Options for createTheme function
 */
export interface CreateThemeOptions {
  /** Theme name for identification */
  name: string;

  /** Extend an existing theme (defaults to tahoe default) */
  extends?: ThemeConfig;

  /** Brand colors - can provide full scale or single color to auto-generate */
  brand?: {
    primary?: string | ColorScale;
    secondary?: string | ColorScale;
    accent?: string | ColorScale;
  };

  /** Override gray scale */
  gray?: ColorScale;

  /** Override semantic colors */
  semantic?: {
    light?: DeepPartial<SemanticColors>;
    dark?: DeepPartial<SemanticColors>;
  };

  /** Override feedback colors */
  feedback?: DeepPartial<ThemeConfig['colors']['feedback']>;

  /** Override radius scale */
  radius?: Partial<RadiusScale>;

  /** Override shadow scale */
  shadow?: DeepPartial<ThemeConfig['shadow']>;

  /** Override motion tokens */
  motion?: DeepPartial<ThemeConfig['motion']>;

  /** Custom typography */
  typography?: TypographyConfig;
}

/**
 * TahoeThemeProvider props
 */
export interface TahoeThemeProviderProps {
  /** Custom theme configuration (merged with defaults) */
  theme?: PartialThemeConfig;

  /** Default color mode */
  defaultMode?: ThemeMode;

  /** Force a specific color mode */
  forcedMode?: ResolvedThemeMode;

  /** Storage key for theme persistence */
  storageKey?: string;

  /** Attribute to apply to document element */
  attribute?: 'class' | 'data-theme';

  /** Enable transitions when theme changes */
  enableTransitions?: boolean;

  /** CSS selector for where to inject styles (default: ':root') */
  styleSelector?: string;

  /** Disable CSS variable injection (for SSR or manual handling) */
  disableStyleInjection?: boolean;

  /** Children */
  children: React.ReactNode;
}
