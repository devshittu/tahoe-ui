// src/app/playground/modal/components/shared/hooks/useReducedMotion.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { MOTION_TOKENS, type SpringConfig } from '@/config/tokens';

/**
 * Return type for useReducedMotion hook
 */
export type UseReducedMotionReturn = {
  /** Whether user prefers reduced motion */
  prefersReducedMotion: boolean;

  /**
   * Get appropriate spring config based on motion preference
   * Returns instant transition when reduced motion is preferred
   */
  getSpringConfig: <T extends SpringConfig>(
    normalConfig: T,
  ) => T | typeof MOTION_TOKENS.spring.reduced;

  /**
   * Get appropriate transition config based on motion preference
   * Returns instant duration when reduced motion is preferred
   */
  getTransition: <T extends { duration?: number }>(normalTransition: T) => T;
};

/**
 * Hook to detect and respond to user's motion preferences
 *
 * Respects the `prefers-reduced-motion` media query per:
 * - Design Principles #6 (Purposeful Motion)
 * - Design Principles #12 (Accessibility as Foundation)
 *
 * @example
 * ```tsx
 * const { prefersReducedMotion, getSpringConfig } = useReducedMotion();
 *
 * const springConfig = getSpringConfig(MOTION_TOKENS.spring.default);
 * // Returns MOTION_TOKENS.spring.reduced if user prefers reduced motion
 * ```
 */
export function useReducedMotion(): UseReducedMotionReturn {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  /**
   * Returns the appropriate spring config based on motion preference
   */
  const getSpringConfig = useCallback(
    <T extends SpringConfig>(
      normalConfig: T,
    ): T | typeof MOTION_TOKENS.spring.reduced => {
      if (prefersReducedMotion) {
        return MOTION_TOKENS.spring.reduced;
      }
      return normalConfig;
    },
    [prefersReducedMotion],
  );

  /**
   * Returns the appropriate transition config based on motion preference
   */
  const getTransition = useCallback(
    <T extends { duration?: number }>(normalTransition: T): T => {
      if (prefersReducedMotion) {
        return {
          ...normalTransition,
          duration: MOTION_TOKENS.duration.instant / 1000, // Convert ms to seconds
        };
      }
      return normalTransition;
    },
    [prefersReducedMotion],
  );

  return {
    prefersReducedMotion,
    getSpringConfig,
    getTransition,
  };
}
