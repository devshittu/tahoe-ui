import { ReactNode } from 'react';

/**
 * Placement options for hover card positioning
 */
export type HoverCardPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/**
 * Hover card size variants
 */
export type HoverCardSize = 'sm' | 'md' | 'lg' | 'auto';

/**
 * Props for HoverCard component
 */
export interface HoverCardProps {
  /** Trigger element */
  children: ReactNode;
  /** Card content - can be ReactNode or render function for lazy loading */
  content: ReactNode | (() => ReactNode);
  /** Placement relative to trigger @default 'top' */
  placement?: HoverCardPlacement;
  /** Card size variant @default 'md' */
  size?: HoverCardSize;
  /** Delay before showing card (ms) @default 300 */
  openDelay?: number;
  /** Delay before hiding card (ms) @default 150 */
  closeDelay?: number;
  /** Show arrow pointer @default true */
  showArrow?: boolean;
  /** Disable hover card */
  disabled?: boolean;
  /** Card is open (controlled mode) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Additional class for trigger wrapper */
  className?: string;
  /** Additional class for card content */
  contentClassName?: string;
  /** Group ID for coordinating multiple cards */
  groupId?: string;
  /** Enable touch support (tap to open) @default true */
  enableTouch?: boolean;
  /** Close on tap outside when opened via touch @default true */
  closeOnTouchOutside?: boolean;
  /** Show loading state while content loads */
  isLoading?: boolean;
  /** Custom loading component */
  loadingContent?: ReactNode;
  /** Callback to prefetch data on hover intent */
  onPrefetch?: () => void;
  /** Prefetch delay (ms) @default 100 */
  prefetchDelay?: number;
  /** Callback when card opens */
  onOpen?: () => void;
  /** Callback when card closes */
  onClose?: () => void;
}

/**
 * Size configuration
 */
export const HOVER_CARD_SIZES: Record<HoverCardSize, string> = {
  sm: 'max-w-[240px]',
  md: 'max-w-[320px]',
  lg: 'max-w-[420px]',
  auto: 'max-w-none',
} as const;

/**
 * Default configuration
 */
export const HOVER_CARD_CONFIG = {
  openDelay: 300,
  closeDelay: 150,
  prefetchDelay: 100,
  animationDuration: 150,
  arrowSize: 8,
  offset: 8,
  viewportPadding: 8,
} as const;
