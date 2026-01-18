// src/app/playground/skeleton/components/types.ts

import { CSSProperties } from 'react';

/**
 * Skeleton shape variants
 */
export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

/**
 * Skeleton animation types
 */
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

/**
 * Props for Skeleton component
 */
export interface SkeletonProps {
  /** Shape variant */
  variant?: SkeletonVariant;
  /** Animation type */
  animation?: SkeletonAnimation;
  /** Width (CSS value or number for pixels) */
  width?: string | number;
  /** Height (CSS value or number for pixels) */
  height?: string | number;
  /** Border radius override (for rectangular variant) */
  radius?: string | number;
  /** Number of skeleton lines (for text variant) */
  lines?: number;
  /** Gap between lines (for text variant) */
  lineGap?: string | number;
  /** Additional className */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

/**
 * Props for SkeletonText convenience component
 */
export interface SkeletonTextProps extends Omit<
  SkeletonProps,
  'variant' | 'lines'
> {
  /** Number of lines */
  lines?: number;
  /** Last line width percentage */
  lastLineWidth?: string | number;
}

/**
 * Props for SkeletonAvatar convenience component
 */
export interface SkeletonAvatarProps extends Omit<
  SkeletonProps,
  'variant' | 'width' | 'height'
> {
  /** Avatar size */
  size?: 'sm' | 'md' | 'lg' | number;
}

/**
 * Props for SkeletonCard convenience component
 */
export interface SkeletonCardProps extends Omit<SkeletonProps, 'variant'> {
  /** Show header avatar */
  hasAvatar?: boolean;
  /** Show image placeholder */
  hasImage?: boolean;
  /** Number of text lines */
  lines?: number;
}

/**
 * Variant configuration
 */
export const SKELETON_VARIANT_CONFIG: Record<
  SkeletonVariant,
  {
    /** Default border radius */
    radius: string;
    /** Default aspect ratio (if applicable) */
    aspectRatio?: string;
  }
> = {
  text: {
    radius: 'rounded',
  },
  circular: {
    radius: 'rounded-full',
    aspectRatio: '1 / 1',
  },
  rectangular: {
    radius: 'rounded-none',
  },
  rounded: {
    radius: 'rounded-lg',
  },
};

/**
 * Default sizes for avatar variant
 */
export const SKELETON_AVATAR_SIZES: Record<'sm' | 'md' | 'lg', number> = {
  sm: 32,
  md: 40,
  lg: 56,
};

/**
 * Animation configuration
 *
 * Per design-principles.md #6 (Purposeful Motion)
 * Per design-principles.md #18 (Thoughtful Loading States)
 */
export const SKELETON_ANIMATION_CONFIG = {
  /** Pulse animation duration */
  pulseDuration: 1.5,
  /** Wave animation duration */
  waveDuration: 1.6,
  /** Easing for animations (framer-motion format) */
  easing: 'easeInOut' as const,
};

/**
 * Default text line height
 */
export const SKELETON_TEXT_HEIGHT = 16;

/**
 * Default gap between text lines
 */
export const SKELETON_TEXT_GAP = 8;
