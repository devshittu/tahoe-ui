// src/hooks/useMediaQuery.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * useMediaQuery - SSR-safe media query hook
 *
 * Features:
 * - Server-side safe (returns false during SSR)
 * - Updates on resize automatically
 * - Supports any valid CSS media query
 *
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if query matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 767px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 */
export function useMediaQuery(query: string): boolean {
  // Default to false for SSR
  const [matches, setMatches] = useState(false);

  const handleChange = useCallback(
    (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches);
    },
    [],
  );

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Modern browsers use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    // Fallback for older browsers
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [query, handleChange]);

  return matches;
}

export default useMediaQuery;
