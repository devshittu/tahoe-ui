'use client';

/**
 * TahoeThemeProvider
 *
 * Provides theme context and injects CSS variables for the Tahoe UI design system.
 * Integrates with next-themes for dark mode support.
 */

import * as React from 'react';
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from 'next-themes';
import type {
  ThemeConfig,
  ThemeContextValue,
  TahoeThemeProviderProps,
  ThemeMode,
  ResolvedThemeMode,
  CSSVariables,
  PartialThemeConfig,
} from './types';
import { defaultTheme } from './themes/default';
import { mergeThemes } from './utils/mergeThemes';
import { generateCSSVariables } from './utils/generateCSS';

/**
 * Theme context for accessing theme configuration
 */
const ThemeConfigContext = React.createContext<ThemeContextValue | null>(null);

/**
 * Hook to access theme configuration and CSS variables
 *
 * @returns Theme context value
 * @throws Error if used outside TahoeThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, resolvedMode, setMode } = useThemeConfig();
 *
 *   return (
 *     <div style={{ color: theme.colors[resolvedMode].text.primary }}>
 *       Current mode: {resolvedMode}
 *       <button onClick={() => setMode('dark')}>Dark Mode</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useThemeConfig(): ThemeContextValue {
  const context = React.useContext(ThemeConfigContext);
  if (!context) {
    throw new Error('useThemeConfig must be used within a TahoeThemeProvider');
  }
  return context;
}

/**
 * Internal component that provides theme context after next-themes is available
 */
function ThemeConfigProvider({
  theme,
  children,
  disableStyleInjection,
  styleSelector = ':root',
}: {
  theme: ThemeConfig;
  children: React.ReactNode;
  disableStyleInjection?: boolean;
  styleSelector?: string;
}) {
  const { theme: nextTheme, setTheme, resolvedTheme } = useNextTheme();

  // Resolve the current mode
  const resolvedMode: ResolvedThemeMode =
    resolvedTheme === 'dark' ? 'dark' : 'light';

  // Generate CSS variables for current mode
  const cssVariables = React.useMemo(
    () => generateCSSVariables(theme, resolvedMode),
    [theme, resolvedMode],
  );

  // Inject CSS variables into the DOM
  React.useEffect(() => {
    if (disableStyleInjection) return;

    const styleId = 'tahoe-theme-vars';
    let styleElement = document.getElementById(
      styleId,
    ) as HTMLStyleElement | null;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // Generate CSS string
    const cssString = Object.entries(cssVariables)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n  ');

    styleElement.textContent = `${styleSelector} {\n  ${cssString}\n}`;

    return () => {
      // Cleanup is optional - we may want to keep styles for smoother transitions
    };
  }, [cssVariables, disableStyleInjection, styleSelector]);

  // Map next-themes API to our ThemeMode type
  const mode: ThemeMode = (nextTheme as ThemeMode) ?? 'system';

  const setMode = React.useCallback(
    (newMode: ThemeMode) => {
      setTheme(newMode);
    },
    [setTheme],
  );

  const contextValue: ThemeContextValue = React.useMemo(
    () => ({
      theme,
      cssVariables,
      mode,
      setMode,
      resolvedMode,
    }),
    [theme, cssVariables, mode, setMode, resolvedMode],
  );

  return (
    <ThemeConfigContext.Provider value={contextValue}>
      {children}
    </ThemeConfigContext.Provider>
  );
}

/**
 * TahoeThemeProvider
 *
 * Root provider for Tahoe UI theming. Wraps next-themes and provides
 * CSS variable injection for design tokens.
 *
 * @example
 * ```tsx
 * // Basic usage with default theme
 * <TahoeThemeProvider>
 *   <App />
 * </TahoeThemeProvider>
 *
 * // With custom theme
 * import { createTheme } from '@tahoe-ui/theme';
 *
 * const myTheme = createTheme({
 *   name: 'my-brand',
 *   brand: { primary: '#6366F1' },
 * });
 *
 * <TahoeThemeProvider theme={myTheme} defaultMode="dark">
 *   <App />
 * </TahoeThemeProvider>
 * ```
 */
export function TahoeThemeProvider({
  theme: themeOverrides,
  defaultMode = 'system',
  forcedMode,
  storageKey = 'tahoe-theme-mode',
  attribute = 'class',
  enableTransitions = true,
  styleSelector = ':root',
  disableStyleInjection = false,
  children,
}: TahoeThemeProviderProps) {
  // Merge custom theme with defaults
  const mergedTheme = React.useMemo(() => {
    if (!themeOverrides) return defaultTheme;
    return mergeThemes(defaultTheme, themeOverrides);
  }, [themeOverrides]);

  // Build next-themes props
  const nextThemesProps = React.useMemo(
    () => ({
      attribute,
      defaultTheme: defaultMode,
      forcedTheme: forcedMode,
      storageKey,
      enableSystem: defaultMode === 'system' || !forcedMode,
      disableTransitionOnChange: !enableTransitions,
    }),
    [attribute, defaultMode, forcedMode, storageKey, enableTransitions],
  );

  return (
    <NextThemesProvider {...nextThemesProps}>
      <ThemeConfigProvider
        theme={mergedTheme}
        disableStyleInjection={disableStyleInjection}
        styleSelector={styleSelector}
      >
        {children}
      </ThemeConfigProvider>
    </NextThemesProvider>
  );
}

/**
 * Hook to get the current theme mode
 *
 * @returns Current theme mode and setter
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { mode, setMode, resolvedMode } = useThemeMode();
 *
 *   return (
 *     <button onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}>
 *       Toggle Theme
 *     </button>
 *   );
 * }
 * ```
 */
export function useThemeMode() {
  const { mode, setMode, resolvedMode } = useThemeConfig();
  return { mode, setMode, resolvedMode };
}

/**
 * Hook to get CSS variables for the current theme
 *
 * @returns CSS variables record
 *
 * @example
 * ```tsx
 * function StyledComponent() {
 *   const vars = useCSSVariables();
 *
 *   // Access specific variable
 *   const primaryColor = vars['--tahoe-color-brand-primary-500'];
 *
 *   return <div style={{ backgroundColor: primaryColor }}>...</div>;
 * }
 * ```
 */
export function useCSSVariables(): CSSVariables {
  const { cssVariables } = useThemeConfig();
  return cssVariables;
}

/**
 * Hook to get a specific CSS variable value
 *
 * @param variableName - CSS variable name (with or without -- prefix)
 * @returns Variable value or undefined
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const primaryColor = useCSSVariable('--tahoe-color-brand-primary-500');
 *   // or without prefix
 *   const primary = useCSSVariable('tahoe-color-brand-primary-500');
 * }
 * ```
 */
export function useCSSVariable(variableName: string): string | undefined {
  const cssVariables = useCSSVariables();
  const normalizedName = variableName.startsWith('--')
    ? variableName
    : `--${variableName}`;
  return cssVariables[normalizedName];
}
