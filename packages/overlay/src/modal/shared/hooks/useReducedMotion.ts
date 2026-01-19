'use client';

import { useState, useEffect, useCallback } from 'react';
import { MOTION_DEFAULTS, type SpringConfig } from '../types';

export type UseReducedMotionReturn = {
  prefersReducedMotion: boolean;
  getSpringConfig: <T extends SpringConfig>(
    normalConfig: T,
  ) => T | typeof MOTION_DEFAULTS.spring.reduced;
  getTransition: <T extends { duration?: number }>(normalTransition: T) => T;
};

/**
 * Hook to detect and respond to user's motion preferences
 */
export function useReducedMotion(): UseReducedMotionReturn {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const getSpringConfig = useCallback(
    <T extends SpringConfig>(
      normalConfig: T,
    ): T | typeof MOTION_DEFAULTS.spring.reduced => {
      if (prefersReducedMotion) {
        return MOTION_DEFAULTS.spring.reduced;
      }
      return normalConfig;
    },
    [prefersReducedMotion],
  );

  const getTransition = useCallback(
    <T extends { duration?: number }>(normalTransition: T): T => {
      if (prefersReducedMotion) {
        return {
          ...normalTransition,
          duration: MOTION_DEFAULTS.duration.instant / 1000,
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
