// src/app/playground/hover-card/components/types.ts

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

  // === Touch Support ===

  /** Enable touch support (tap to open) @default true */
  enableTouch?: boolean;
  /** Close on tap outside when opened via touch @default true */
  closeOnTouchOutside?: boolean;

  // === Loading & Prefetch ===

  /** Show loading state while content loads */
  isLoading?: boolean;
  /** Custom loading component */
  loadingContent?: ReactNode;
  /** Callback to prefetch data on hover intent (before card shows) */
  onPrefetch?: () => void;
  /** Prefetch delay - how long to wait before prefetching (ms) @default 100 */
  prefetchDelay?: number;

  // === Callbacks ===

  /** Callback when card opens */
  onOpen?: () => void;
  /** Callback when card closes */
  onClose?: () => void;
}

/**
 * Props for HoverCardTrigger (compound component pattern)
 */
export interface HoverCardTriggerProps {
  /** Trigger element */
  children: ReactNode;
  /** Render as child element instead of wrapping */
  asChild?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * Props for HoverCardContent (compound component pattern)
 */
export interface HoverCardContentProps {
  /** Card content */
  children: ReactNode;
  /** Additional class name */
  className?: string;
  /** Show arrow @default true */
  showArrow?: boolean;
}

/**
 * Context value for compound components
 */
export interface HoverCardContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  placement: HoverCardPlacement;
  showArrow: boolean;
}

/**
 * Hover card group context for coordinating multiple cards
 */
export interface HoverCardGroupContextValue {
  /** Currently active card ID */
  activeCardId: string | null;
  /** Register a card with the group */
  registerCard: (id: string) => void;
  /** Unregister a card from the group */
  unregisterCard: (id: string) => void;
  /** Set the active card (closes others) */
  setActiveCard: (id: string | null) => void;
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
  /** Default open delay */
  openDelay: 300,
  /** Default close delay */
  closeDelay: 150,
  /** Prefetch delay */
  prefetchDelay: 100,
  /** Animation duration */
  animationDuration: 150,
  /** Arrow size */
  arrowSize: 8,
  /** Offset from trigger */
  offset: 8,
  /** Viewport padding */
  viewportPadding: 8,
} as const;
