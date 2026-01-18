// src/app/playground/avatar/components/index.ts

/**
 * Avatar - User profile images with intelligent fallback
 *
 * A versatile avatar component for displaying user profile images
 * with graceful fallback to initials or custom content.
 *
 * Components:
 * - Avatar: Individual user avatar
 * - AvatarGroup: Overlapping group of avatars
 *
 * Features:
 * - Image with graceful fallback to initials
 * - Six size variants (xs to 2xl)
 * - Circle or square shape
 * - Status indicator (online, offline, away, busy)
 * - Deterministic fallback colors based on name
 * - AvatarGroup for displaying multiple users
 * - Dark mode support
 *
 * @example
 * ```tsx
 * import { Avatar, AvatarGroup } from './components';
 *
 * // Single avatar
 * <Avatar src="/user.jpg" name="John Doe" status="online" />
 *
 * // Avatar group
 * <AvatarGroup max={3}>
 *   <Avatar name="John Doe" />
 *   <Avatar name="Jane Smith" />
 *   <Avatar name="Bob Wilson" />
 * </AvatarGroup>
 * ```
 */

export { Avatar } from './Avatar';
export { AvatarGroup } from './AvatarGroup';
export type {
  AvatarProps,
  AvatarGroupProps,
  AvatarSize,
  AvatarShape,
  AvatarStatus,
} from './types';
export {
  AVATAR_SIZE_CONFIG,
  AVATAR_STATUS_CONFIG,
  AVATAR_FALLBACK_COLORS,
  AVATAR_GROUP_SPACING,
  getInitials,
  getColorFromName,
} from './types';
