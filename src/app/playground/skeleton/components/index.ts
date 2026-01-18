// src/app/playground/skeleton/components/index.ts

/**
 * Skeleton - Content placeholders for loading states
 *
 * A composable skeleton system for creating content-shaped
 * loading placeholders that reduce perceived load time.
 *
 * Components:
 * - Skeleton: Base component with shape variants
 * - SkeletonText: Multi-line text placeholder
 * - SkeletonAvatar: Circular avatar placeholder
 * - SkeletonCard: Pre-composed card skeleton
 *
 * Features:
 * - Four shape variants (text, circular, rectangular, rounded)
 * - Two animation types (pulse, wave)
 * - Configurable dimensions
 * - Multi-line text support
 * - Convenience components for common patterns
 * - Respects prefers-reduced-motion
 * - Dark mode support
 *
 * @example
 * ```tsx
 * import { Skeleton, SkeletonText, SkeletonCard } from './components';
 *
 * // Basic usage
 * <Skeleton width={200} height={20} />
 *
 * // Text lines
 * <SkeletonText lines={3} />
 *
 * // Card placeholder
 * <SkeletonCard hasAvatar hasImage />
 * ```
 */

export { Skeleton } from './Skeleton';
export { SkeletonText } from './SkeletonText';
export { SkeletonAvatar } from './SkeletonAvatar';
export { SkeletonCard } from './SkeletonCard';
export type {
  SkeletonProps,
  SkeletonVariant,
  SkeletonAnimation,
  SkeletonTextProps,
  SkeletonAvatarProps,
  SkeletonCardProps,
} from './types';
export {
  SKELETON_VARIANT_CONFIG,
  SKELETON_AVATAR_SIZES,
  SKELETON_ANIMATION_CONFIG,
  SKELETON_TEXT_HEIGHT,
  SKELETON_TEXT_GAP,
} from './types';
