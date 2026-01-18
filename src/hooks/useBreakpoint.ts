// src/hooks/useBreakpoint.ts
'use client';

import { useMemo } from 'react';
import { useMediaQuery } from './useMediaQuery';

/**
 * Tailwind CSS default breakpoints
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type BreakpointKey = keyof typeof breakpoints;

export interface BreakpointState {
  /** Current breakpoint name (smallest matching) */
  current: BreakpointKey | 'xs';
  /** True if viewport >= 640px */
  isSm: boolean;
  /** True if viewport >= 768px */
  isMd: boolean;
  /** True if viewport >= 1024px */
  isLg: boolean;
  /** True if viewport >= 1280px */
  isXl: boolean;
  /** True if viewport >= 1536px */
  is2xl: boolean;
  /** True if viewport < 640px (mobile) */
  isMobile: boolean;
  /** True if viewport >= 768px (tablet and above) */
  isTablet: boolean;
  /** True if viewport >= 1024px (desktop and above) */
  isDesktop: boolean;
}

/**
 * useBreakpoint - Responsive breakpoint detection aligned with Tailwind
 *
 * Features:
 * - Matches Tailwind's default breakpoints
 * - SSR-safe (defaults to mobile/xs)
 * - Provides semantic helpers (isMobile, isTablet, isDesktop)
 *
 * @returns Object with current breakpoint and boolean helpers
 *
 * @example
 * const { isMobile, isDesktop, current } = useBreakpoint();
 *
 * if (isMobile) {
 *   // Render mobile layout
 * }
 */
export function useBreakpoint(): BreakpointState {
  const isSm = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
  const isMd = useMediaQuery(`(min-width: ${breakpoints.md}px)`);
  const isLg = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
  const isXl = useMediaQuery(`(min-width: ${breakpoints.xl}px)`);
  const is2xl = useMediaQuery(`(min-width: ${breakpoints['2xl']}px)`);

  const current = useMemo((): BreakpointKey | 'xs' => {
    if (is2xl) return '2xl';
    if (isXl) return 'xl';
    if (isLg) return 'lg';
    if (isMd) return 'md';
    if (isSm) return 'sm';
    return 'xs';
  }, [isSm, isMd, isLg, isXl, is2xl]);

  return {
    current,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    isMobile: !isSm,
    isTablet: isMd,
    isDesktop: isLg,
  };
}

export default useBreakpoint;
