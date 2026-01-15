// src/config/tokens/motion.tokens.ts

/**
 * Motion Design Tokens
 *
 * Centralized animation timing, spring physics, and easing values.
 * Reference: design-principles.md #6 (Purposeful Motion)
 *
 * Guidelines:
 * - Micro-interactions: 150-250ms
 * - View transitions: 300-450ms
 * - Maximum: 500ms
 * - Spring-based easing for interactive elements
 * - Respect prefers-reduced-motion
 */

export const MOTION_TOKENS = {
  /**
   * Duration values in milliseconds
   */
  duration: {
    /** Instant - for reduced motion */
    instant: 0,
    /** Fast - micro-interactions, hover states */
    fast: 150,
    /** Base - standard transitions */
    base: 250,
    /** Slow - view transitions, complex animations */
    slow: 400,
    /** Maximum allowed duration per design principles */
    max: 500,
  },

  /**
   * Spring physics configurations for Framer Motion
   */
  spring: {
    /** Default modal spring - fluid, natural movement */
    default: {
      type: 'spring' as const,
      damping: 28,
      stiffness: 280,
      mass: 0.8,
    },
    /** Snappy spring - handlebar feedback, quick responses */
    snappy: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 400,
      mass: 0.5,
    },
    /** Gentle spring - close indicator, subtle effects */
    gentle: {
      type: 'spring' as const,
      damping: 25,
      stiffness: 300,
      mass: 1,
    },
    /** Reduced motion fallback - instant transition */
    reduced: {
      type: 'tween' as const,
      duration: 0.01,
    },
  },

  /**
   * Cubic-bezier easing curves
   */
  easing: {
    /** Smooth - Material Design standard */
    smooth: [0.4, 0, 0.2, 1] as const,
    /** Ease out - exit animations */
    easeOut: [0, 0, 0.2, 1] as const,
    /** Ease in - entry animations */
    easeIn: [0.4, 0, 1, 1] as const,
    /** Linear - uniform speed */
    linear: [0, 0, 1, 1] as const,
  },

  /**
   * Squash-stretch intensity values
   */
  squash: {
    /** Subtle compression */
    subtle: 0.02,
    /** Default compression */
    default: 0.03,
    /** Pronounced compression */
    pronounced: 0.05,
  },

  /**
   * Overlay/backdrop transition
   */
  overlay: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1] as const,
  },

  /**
   * Slide transition using default spring
   */
  slide: {
    type: 'spring' as const,
    damping: 28,
    stiffness: 280,
    mass: 0.8,
  },
} as const;

// Type exports
export type MotionDuration = keyof typeof MOTION_TOKENS.duration;
export type SpringPreset = keyof typeof MOTION_TOKENS.spring;
export type EasingPreset = keyof typeof MOTION_TOKENS.easing;

// Helper type for spring config
export type SpringConfig = (typeof MOTION_TOKENS.spring)[SpringPreset];
