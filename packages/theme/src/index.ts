/**
 * @tahoe-ui/theme
 *
 * CSS variable-based theming system for Tahoe UI.
 *
 * @example
 * ```tsx
 * // 1. Create a custom theme (optional)
 * import { createTheme } from '@tahoe-ui/theme';
 *
 * const myTheme = createTheme({
 *   name: 'my-brand',
 *   brand: {
 *     primary: '#6366F1',  // Auto-generates 50-950 scale
 *     accent: '#EC4899',
 *   },
 * });
 *
 * // 2. Wrap your app with the provider
 * import { TahoeThemeProvider } from '@tahoe-ui/theme';
 *
 * function App() {
 *   return (
 *     <TahoeThemeProvider theme={myTheme} defaultMode="system">
 *       <YourApp />
 *     </TahoeThemeProvider>
 *   );
 * }
 *
 * // 3. Access theme in components
 * import { useThemeConfig, useThemeMode } from '@tahoe-ui/theme';
 *
 * function ThemeToggle() {
 *   const { resolvedMode, setMode } = useThemeMode();
 *   return (
 *     <button onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}>
 *       Toggle Theme
 *     </button>
 *   );
 * }
 * ```
 */

// Provider and hooks
export {
  TahoeThemeProvider,
  useThemeConfig,
  useThemeMode,
  useCSSVariables,
  useCSSVariable,
} from './TahoeThemeProvider';

// Theme creation utilities
export { createTheme, extendTheme, createBrandTheme } from './createTheme';

// Default theme
export { defaultTheme } from './themes/default';

// Types
export type {
  // Core theme types
  ThemeConfig,
  PartialThemeConfig,
  CreateThemeOptions,
  ThemeContextValue,
  TahoeThemeProviderProps,
  // Mode types
  ThemeMode,
  ResolvedThemeMode,
  // Color types
  ColorScale,
  FeedbackColor,
  SemanticColors,
  SemanticTextColors,
  SemanticBackgroundColors,
  SemanticBorderColors,
  SemanticInteractiveColors,
  // Scale types
  SpacingScale,
  RadiusScale,
  ShadowScale,
  FocusShadows,
  DurationScale,
  EasingScale,
  // Motion types
  SpringConfig,
  SpringPresets,
  // Typography types
  TypographyConfig,
  // Utility types
  DeepPartial,
  CSSVariables,
} from './types';

// Utility functions (also available via @tahoe-ui/theme/utils)
export {
  generateCSSVariables,
  generateCSSString,
  generateThemeCSS,
  mergeThemes,
  cloneTheme,
  generateColorScale,
  isValidHex,
  isColorScale,
  processColorInput,
} from './utils';
