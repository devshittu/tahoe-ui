// src/app/playground/avatar/components/types.ts

import { ReactNode } from 'react';

/**
 * Avatar size variants
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Avatar shape variants
 */
export type AvatarShape = 'circle' | 'square';

/**
 * Avatar status indicator
 */
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'none';

/**
 * Props for Avatar component
 */
export interface AvatarProps {
  /** Image source URL */
  src?: string | null;
  /** Alt text for image */
  alt?: string;
  /** User's name (used for fallback initials) */
  name?: string;
  /** Size variant */
  size?: AvatarSize;
  /** Shape variant */
  shape?: AvatarShape;
  /** Status indicator */
  status?: AvatarStatus;
  /** Custom fallback content (overrides initials) */
  fallback?: ReactNode;
  /** Border/ring style */
  bordered?: boolean;
  /** Additional className */
  className?: string;
  /** Click handler (makes avatar interactive) */
  onClick?: () => void;
}

/**
 * Props for AvatarGroup component
 */
export interface AvatarGroupProps {
  /** Avatar children */
  children: ReactNode;
  /** Maximum avatars to show before "+N" */
  max?: number;
  /** Size for all avatars (overrides individual) */
  size?: AvatarSize;
  /** Spacing between avatars (negative for overlap) */
  spacing?: 'tight' | 'normal' | 'loose';
  /** Additional className */
  className?: string;
}

/**
 * Size configuration following 8pt grid
 *
 * Per design-principles.md #3 (Intentional White Space)
 */
export const AVATAR_SIZE_CONFIG: Record<
  AvatarSize,
  {
    /** Container size */
    container: string;
    /** Size in pixels */
    sizePx: number;
    /** Font size for initials */
    fontSize: string;
    /** Status indicator size */
    statusSize: string;
    /** Status indicator position offset */
    statusOffset: string;
  }
> = {
  xs: {
    container: 'w-6 h-6',
    sizePx: 24,
    fontSize: 'text-[10px]',
    statusSize: 'w-1.5 h-1.5',
    statusOffset: 'right-0 bottom-0',
  },
  sm: {
    container: 'w-8 h-8',
    sizePx: 32,
    fontSize: 'text-xs',
    statusSize: 'w-2 h-2',
    statusOffset: 'right-0 bottom-0',
  },
  md: {
    container: 'w-10 h-10',
    sizePx: 40,
    fontSize: 'text-sm',
    statusSize: 'w-2.5 h-2.5',
    statusOffset: 'right-0 bottom-0',
  },
  lg: {
    container: 'w-12 h-12',
    sizePx: 48,
    fontSize: 'text-base',
    statusSize: 'w-3 h-3',
    statusOffset: 'right-0 bottom-0',
  },
  xl: {
    container: 'w-16 h-16',
    sizePx: 64,
    fontSize: 'text-lg',
    statusSize: 'w-3.5 h-3.5',
    statusOffset: 'right-0.5 bottom-0.5',
  },
  '2xl': {
    container: 'w-24 h-24',
    sizePx: 96,
    fontSize: 'text-2xl',
    statusSize: 'w-4 h-4',
    statusOffset: 'right-1 bottom-1',
  },
};

/**
 * Status color configuration
 */
export const AVATAR_STATUS_CONFIG: Record<
  Exclude<AvatarStatus, 'none'>,
  {
    /** Background color */
    bg: string;
    /** Ring/border for visibility */
    ring: string;
    /** Optional inner highlight */
    inner: string;
  }
> = {
  online: {
    bg: 'bg-emerald-500',
    ring: 'ring-[2.5px] ring-white dark:ring-gray-950 shadow-sm',
    inner: 'shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]',
  },
  offline: {
    bg: 'bg-gray-400 dark:bg-gray-500',
    ring: 'ring-[2.5px] ring-white dark:ring-gray-950 shadow-sm',
    inner: '',
  },
  away: {
    bg: 'bg-amber-400',
    ring: 'ring-[2.5px] ring-white dark:ring-gray-950 shadow-sm',
    inner: 'shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]',
  },
  busy: {
    bg: 'bg-red-500',
    ring: 'ring-[2.5px] ring-white dark:ring-gray-950 shadow-sm',
    inner: 'shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]',
  },
};

/**
 * Fallback background colors for initials
 * Deterministically assigned based on name hash
 */
export const AVATAR_FALLBACK_COLORS = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-purple-500',
  'bg-cyan-500',
  'bg-orange-500',
  'bg-indigo-500',
  'bg-pink-500',
  'bg-teal-500',
] as const;

/**
 * Group spacing configuration
 */
export const AVATAR_GROUP_SPACING: Record<
  'tight' | 'normal' | 'loose',
  string
> = {
  tight: '-space-x-3',
  normal: '-space-x-2',
  loose: '-space-x-1',
};

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Get deterministic color based on name
 */
export function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_FALLBACK_COLORS.length;
  return AVATAR_FALLBACK_COLORS[index];
}
