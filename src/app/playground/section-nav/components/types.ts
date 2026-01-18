// src/app/playground/section-nav/components/types.ts

import type { ReactNode } from 'react';

/**
 * Section item configuration
 *
 * Each section represents a navigable part of the page.
 * Can be auto-detected via data attributes or explicitly defined.
 */
export interface SectionItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** DOM element ID or ref to scroll to */
  target: string;
  /** Optional icon (React node or icon component) */
  icon?: ReactNode;
  /** Optional description for command overlay */
  description?: string;
  /** Whether this section is visually hidden but navigable */
  hidden?: boolean;
  /** Optional shortcut key (single letter) */
  shortcut?: string;
}

/**
 * Scroll spy result for a single section
 */
export interface SectionVisibility {
  /** Section ID */
  id: string;
  /** How much of the section is visible (0-1) */
  visibility: number;
  /** Whether this is the "active" section based on threshold */
  isActive: boolean;
  /** Section's position relative to viewport */
  position: 'above' | 'visible' | 'below';
}

/**
 * Scroll spy hook return type
 */
export interface UseScrollSpyReturn {
  /** Currently active section (highest visibility above threshold) */
  activeSection: SectionItem | null;
  /** Active section ID */
  activeSectionId: string | null;
  /** Visibility data for all sections */
  visibilityMap: Map<string, SectionVisibility>;
  /** Overall scroll progress through all sections (0-1) */
  progress: number;
  /** Whether user is currently scrolling */
  isScrolling: boolean;
  /** Scroll to a specific section */
  scrollToSection: (sectionId: string, options?: ScrollToOptions) => void;
  /** Manually refresh section positions */
  refresh: () => void;
}

/**
 * Scroll spy hook options
 */
export interface UseScrollSpyOptions {
  /** Section items to observe */
  sections: SectionItem[];
  /** Root element to observe within (default: viewport) */
  root?: Element | null;
  /** Margin around root for intersection (default: '-20% 0px -60% 0px') */
  rootMargin?: string;
  /** Visibility threshold to consider section "active" (default: 0.3) */
  threshold?: number;
  /** Scroll behavior when navigating (default: 'smooth') */
  scrollBehavior?: ScrollBehavior;
  /** Offset from top when scrolling to section (default: 0) */
  scrollOffset?: number;
  /** Debounce scroll events (ms) (default: 50) */
  scrollDebounce?: number;
  /** Callback when active section changes */
  onSectionChange?: (
    section: SectionItem | null,
    previous: SectionItem | null,
  ) => void;
}

/**
 * SectionNav display modes
 *
 * - ambient: Minimal always-visible state (progress track + dots)
 * - engaged: Expanded state showing labels (on hover/focus)
 * - command: Overlay for quick search/jump (⌘J trigger)
 */
export type SectionNavMode = 'ambient' | 'engaged' | 'command';

/**
 * SectionNav position
 */
export type SectionNavPosition = 'left' | 'right';

/**
 * SectionNav behavior
 */
export type SectionNavBehavior = 'fixed' | 'sticky' | 'absolute';

/**
 * Size variants for SectionNav
 */
export type SectionNavSize = 'compact' | 'default' | 'large';

/**
 * Display mode for labels/icons
 */
export type SectionNavDisplay =
  | 'dots-only' // Only dots, labels on hover
  | 'icons-only' // Icons for all, labels on hover
  | 'icons-and-labels' // Always show icons and labels
  | 'labels-only'; // Always show labels (vertical text list)

/**
 * Quick action configuration
 */
export interface QuickAction {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon */
  icon: ReactNode;
  /** Action handler */
  onClick: () => void;
  /** Whether action is currently available */
  enabled?: boolean;
}

/**
 * SectionNav component props
 */
export interface SectionNavProps {
  /** Section items to navigate */
  sections: SectionItem[];

  /** Position on screen */
  position?: SectionNavPosition;

  /** CSS position behavior */
  behavior?: SectionNavBehavior;

  /** Size variant */
  size?: SectionNavSize;

  /** Display mode for items */
  display?: SectionNavDisplay;

  /** Initial mode (default: 'ambient') */
  defaultMode?: SectionNavMode;

  /** Controlled mode */
  mode?: SectionNavMode;

  /** Mode change callback */
  onModeChange?: (mode: SectionNavMode) => void;

  /** Show progress track */
  showProgress?: boolean;

  /** Show section dots/icons */
  showDots?: boolean;

  /** Enable command mode (⌘J) */
  enableCommand?: boolean;

  /** Command mode keyboard shortcut (default: 'j') */
  commandKey?: string;

  /** Quick actions (back-to-top, etc.) */
  quickActions?: QuickAction[];

  /** Auto-hide when at top of page */
  autoHide?: boolean;

  /** Auto-hide threshold (scroll distance before showing) */
  autoHideThreshold?: number;

  /** Expand on hover/focus */
  expandOnHover?: boolean;

  /** Expand delay (ms) */
  expandDelay?: number;

  /** Collapse delay after mouse leaves (ms) */
  collapseDelay?: number;

  /** Allow manual collapse (show collapse button) */
  collapsible?: boolean;

  /** Start in collapsed state */
  defaultCollapsed?: boolean;

  /** Scroll spy options */
  scrollSpyOptions?: Partial<UseScrollSpyOptions>;

  /** Custom class name */
  className?: string;

  /** Disable all interactions */
  disabled?: boolean;

  /** Accessible label for the nav element */
  ariaLabel?: string;

  /** Callback when a section is clicked */
  onSectionClick?: (section: SectionItem) => void;
}

/**
 * Animation constants following design principles
 * #6: Purposeful Motion - smooth, non-jarring transitions
 * All springs tuned for buttery smooth feel with no overshoot
 */
export const SECTION_NAV_ANIMATIONS = {
  /** Fast easing for micro-interactions (hover, focus) */
  fast: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
  /** Base easing for mode changes */
  base: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
  /** Default spring - smooth with minimal overshoot */
  spring: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 28,
    mass: 1,
  },
  /** Gentle spring for entry/exit animations */
  springGentle: {
    type: 'spring' as const,
    stiffness: 140,
    damping: 26,
    mass: 1.1,
  },
  /** Ultra smooth for progress/tracking animations */
  springSmooth: {
    type: 'spring' as const,
    stiffness: 80,
    damping: 20,
    mass: 1,
  },
  /** Responsive spring for direct interactions (still smooth) */
  springResponsive: {
    type: 'spring' as const,
    stiffness: 220,
    damping: 30,
    mass: 0.9,
  },
} as const;

/**
 * Size constants for each variant
 */
export const SECTION_NAV_SIZES = {
  compact: {
    dotSize: 6,
    dotSizeActive: 20,
    dotSizeHovered: 10,
    trackWidth: 2,
    padding: 8,
    dotGap: 8,
    labelOffset: 10,
    iconSize: 10,
    fontSize: 11,
  },
  default: {
    dotSize: 8,
    dotSizeActive: 28,
    dotSizeHovered: 12,
    trackWidth: 2,
    padding: 10,
    dotGap: 10,
    labelOffset: 12,
    iconSize: 14,
    fontSize: 13,
  },
  large: {
    dotSize: 10,
    dotSizeActive: 36,
    dotSizeHovered: 16,
    trackWidth: 3,
    padding: 14,
    dotGap: 14,
    labelOffset: 16,
    iconSize: 18,
    fontSize: 14,
  },
} as const;

/**
 * Get size config for a variant
 */
export function getSizeConfig(size: SectionNavSize = 'default') {
  return SECTION_NAV_SIZES[size];
}

/**
 * Default quick actions
 */
export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'back-to-top',
    label: 'Back to top',
    icon: null, // Will be set in component
    onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    enabled: true,
  },
];
