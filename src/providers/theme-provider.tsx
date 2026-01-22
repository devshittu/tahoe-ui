// File: src/providers/theme-provider.tsx
'use client';

import * as React from 'react';
import {
  TahoeThemeProvider,
  useThemeMode,
  useThemeConfig,
  type TahoeThemeProviderProps,
} from '@tahoe-ui/theme';

/**
 * ThemeProviders - Wrapper for Tahoe UI theming system
 *
 * This component wraps TahoeThemeProvider to provide:
 * - CSS variable injection for design tokens
 * - Dark/light mode support with system preference detection
 * - Theme context for accessing theme configuration
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ThemeProviders>
 *   <App />
 * </ThemeProviders>
 *
 * // With custom theme
 * import { createTheme } from '@tahoe-ui/theme';
 *
 * const myTheme = createTheme({
 *   name: 'my-brand',
 *   brand: { primary: '#6366F1' },
 * });
 *
 * <ThemeProviders theme={myTheme}>
 *   <App />
 * </ThemeProviders>
 * ```
 */
export function ThemeProviders({
  children,
  theme,
  defaultMode = 'system',
  forcedMode,
  storageKey,
  attribute = 'class',
  enableTransitions = true,
  styleSelector,
  disableStyleInjection,
}: Omit<TahoeThemeProviderProps, 'children'> & { children: React.ReactNode }) {
  return (
    <TahoeThemeProvider
      theme={theme}
      defaultMode={defaultMode}
      forcedMode={forcedMode}
      storageKey={storageKey}
      attribute={attribute}
      enableTransitions={enableTransitions}
      styleSelector={styleSelector}
      disableStyleInjection={disableStyleInjection}
    >
      {children}
    </TahoeThemeProvider>
  );
}

// Re-export hooks for convenience
export { useThemeMode, useThemeConfig };
