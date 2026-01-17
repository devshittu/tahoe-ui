// src/app/playground/slide-to-confirm/components/types.ts

import { ReactNode } from 'react';

/**
 * Visual variant for the slider
 */
export type SlideToConfirmVariant = 'default' | 'destructive' | 'success';

/**
 * Direction the thumb slides
 */
export type SlideDirection = 'left' | 'right';

/**
 * Haptic feedback intensity
 */
export type HapticIntensity = 'light' | 'medium' | 'heavy' | 'none';

/**
 * Configuration for spring physics
 */
export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass?: number;
}

/**
 * Props for SlideToConfirm component
 */
export interface SlideToConfirmProps {
  /** Callback when slide completes and action confirms */
  onConfirm: () => void | Promise<void>;

  /** Label shown on the track */
  label?: string;

  /** Label shown when confirmed (replaces label) */
  confirmLabel?: string;

  /** Visual variant */
  variant?: SlideToConfirmVariant;

  /** Direction to slide (default: right) */
  direction?: SlideDirection;

  /** Threshold (0-1) to trigger confirmation (default: 0.85) */
  threshold?: number;

  /** Icon or content inside the thumb */
  children?: ReactNode;

  /** Icon shown when confirmed */
  confirmIcon?: ReactNode;

  /** Whether the slider is disabled */
  disabled?: boolean;

  /** Whether currently in loading state after confirm */
  isLoading?: boolean;

  /** Custom loading content */
  loadingContent?: ReactNode;

  /** Enable haptic feedback (Vibration API) */
  enableHaptics?: boolean;

  /** Haptic intensity */
  hapticIntensity?: HapticIntensity;

  /** Spring config for snap-back animation */
  snapBackSpring?: SpringConfig;

  /** Spring config for confirm animation */
  confirmSpring?: SpringConfig;

  /** Enable velocity-based completion (fast flick) */
  enableVelocityComplete?: boolean;

  /** Minimum velocity (px/ms) to trigger confirm regardless of position */
  velocityThreshold?: number;

  /** Show progress fill behind thumb */
  showProgressFill?: boolean;

  /** Additional class for the container */
  className?: string;

  /** Additional class for the track */
  trackClassName?: string;

  /** Additional class for the thumb */
  thumbClassName?: string;

  /** Callback when progress changes (0-1) */
  onProgressChange?: (progress: number) => void;

  /** Callback when slide starts */
  onSlideStart?: () => void;

  /** Callback when slide ends (regardless of confirm) */
  onSlideEnd?: () => void;

  /** Callback when slide is cancelled (didn't reach threshold) */
  onCancel?: () => void;

  /** Width of the track (default: 100%) */
  width?: number | string;

  /** Height of the track (default: 56px) */
  height?: number;

  /** Border radius of the track */
  borderRadius?: number;

  /** Size of the thumb (default: matches height - padding) */
  thumbSize?: number;
}

/**
 * Default configuration values
 */
export const SLIDE_TO_CONFIRM_CONFIG = {
  threshold: 0.85,
  velocityThreshold: 0.8, // px/ms
  height: 56,
  borderRadius: 28, // pill shape
  thumbPadding: 4,
  hapticPatterns: {
    light: [10],
    medium: [20],
    heavy: [30, 10, 30],
  },
} as const;

/**
 * Default spring configurations
 */
export const SPRING_CONFIGS = {
  snapBack: {
    stiffness: 400,
    damping: 30,
    mass: 1,
  },
  confirm: {
    stiffness: 300,
    damping: 25,
    mass: 1,
  },
  progress: {
    stiffness: 500,
    damping: 40,
    mass: 0.5,
  },
} as const;

/**
 * Variant color schemes
 */
export const VARIANT_STYLES: Record<
  SlideToConfirmVariant,
  {
    track: string;
    trackActive: string;
    fill: string;
    fillComplete: string;
    thumb: string;
    thumbActive: string;
    thumbComplete: string;
    label: string;
    labelComplete: string;
    icon: string;
    iconComplete: string;
  }
> = {
  default: {
    track: 'bg-gray-100 dark:bg-gray-800',
    trackActive: 'bg-gray-100 dark:bg-gray-800',
    fill: 'bg-gray-900/10 dark:bg-white/10',
    fillComplete: 'bg-gray-900 dark:bg-white',
    thumb: 'bg-white dark:bg-gray-700 shadow-md',
    thumbActive: 'bg-white dark:bg-gray-600 shadow-lg',
    thumbComplete: 'bg-gray-900 dark:bg-white',
    label: 'text-gray-500 dark:text-gray-400',
    labelComplete: 'text-white dark:text-gray-900',
    icon: 'text-gray-700 dark:text-gray-300',
    iconComplete: 'text-white dark:text-gray-900',
  },
  destructive: {
    track: 'bg-red-50 dark:bg-red-950/30',
    trackActive: 'bg-red-100 dark:bg-red-950/50',
    fill: 'bg-red-500/20 dark:bg-red-500/30',
    fillComplete: 'bg-red-500 dark:bg-red-500',
    thumb: 'bg-white dark:bg-gray-800 shadow-md',
    thumbActive: 'bg-white dark:bg-gray-700 shadow-lg',
    thumbComplete: 'bg-red-500 dark:bg-red-500',
    label: 'text-red-600/70 dark:text-red-400/70',
    labelComplete: 'text-white dark:text-white',
    icon: 'text-red-500 dark:text-red-400',
    iconComplete: 'text-white dark:text-white',
  },
  success: {
    track: 'bg-emerald-50 dark:bg-emerald-950/30',
    trackActive: 'bg-emerald-100 dark:bg-emerald-950/50',
    fill: 'bg-emerald-500/20 dark:bg-emerald-500/30',
    fillComplete: 'bg-emerald-500 dark:bg-emerald-500',
    thumb: 'bg-white dark:bg-gray-800 shadow-md',
    thumbActive: 'bg-white dark:bg-gray-700 shadow-lg',
    thumbComplete: 'bg-emerald-500 dark:bg-emerald-500',
    label: 'text-emerald-600/70 dark:text-emerald-400/70',
    labelComplete: 'text-white dark:text-white',
    icon: 'text-emerald-500 dark:text-emerald-400',
    iconComplete: 'text-white dark:text-white',
  },
};
