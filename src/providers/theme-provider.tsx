// File: src/providers/theme-provider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';
import * as React from 'react';

/**
 * Custom ThemeProvider component to wrap the application.
 * This component is a client component and provides the theme context
 * to all child components using the `useTheme` hook from next-themes.
 * It's designed to be used directly in the root layout.
 */
export function ThemeProviders({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
