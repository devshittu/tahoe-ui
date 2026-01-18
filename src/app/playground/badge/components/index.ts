// src/app/playground/badge/components/index.ts

/**
 * Badge - Small status indicators and counts
 *
 * Versatile badge component for displaying notifications,
 * counts, status labels, and attention indicators.
 *
 * Components:
 * - Badge: Standalone badge element
 * - BadgeAnchor: Wrapper to position badge on elements
 *
 * Features:
 * - Four variants: solid, soft, outline, dot
 * - Six semantic colors
 * - Three sizes (sm, md, lg)
 * - Max number formatting (99+)
 * - Pulse animation for attention
 * - Position anchoring (top-right, top-left, etc.)
 * - Circular/rectangular overlap modes
 * - Dark mode support
 *
 * @example
 * ```tsx
 * import { Badge, BadgeAnchor } from './components';
 *
 * // Standalone badge
 * <Badge color="primary">New</Badge>
 *
 * // Badge on icon
 * <BadgeAnchor badgeContent={5} color="error">
 *   <BellIcon />
 * </BadgeAnchor>
 *
 * // Dot indicator on avatar
 * <BadgeAnchor dot color="success" overlap="circular">
 *   <Avatar />
 * </BadgeAnchor>
 * ```
 */

export { Badge } from './Badge';
export { BadgeAnchor } from './BadgeAnchor';
export type {
  BadgeProps,
  BadgeAnchorProps,
  BadgeSize,
  BadgeColor,
  BadgeVariant,
} from './types';
export {
  BADGE_SIZE_CONFIG,
  BADGE_COLOR_CONFIG,
  BADGE_POSITION_CONFIG,
  formatBadgeContent,
} from './types';
