// packages/navigation/src/sectionnav/types.ts

import type { ReactNode } from 'react';

/**
 * Section item configuration
 */
export interface SectionItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** DOM element ID or ref to scroll to */
  target: string;
  /** Optional icon */
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
  /** Currently active section */
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
  /** Root element to observe within */
  root?: Element | null;
  /** Margin around root for intersection */
  rootMargin?: string;
  /** Visibility threshold to consider section "active" */
  threshold?: number;
  /** Scroll behavior when navigating */
  scrollBehavior?: ScrollBehavior;
  /** Offset from top when scrolling to section */
  scrollOffset?: number;
  /** Debounce scroll events (ms) */
  scrollDebounce?: number;
  /** Callback when active section changes */
  onSectionChange?: (
    section: SectionItem | null,
    previous: SectionItem | null,
  ) => void;
}

/**
 * SectionNav display modes
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
  | 'dots-only'
  | 'icons-only'
  | 'icons-and-labels'
  | 'labels-only';

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
  /** Initial mode */
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
  /** Command mode keyboard shortcut */
  commandKey?: string;
  /** Quick actions */
  quickActions?: QuickAction[];
  /** Auto-hide when at top of page */
  autoHide?: boolean;
  /** Auto-hide threshold */
  autoHideThreshold?: number;
  /** Expand on hover/focus */
  expandOnHover?: boolean;
  /** Expand delay (ms) */
  expandDelay?: number;
  /** Collapse delay after mouse leaves (ms) */
  collapseDelay?: number;
  /** Allow manual collapse */
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
 * Animation constants
 */
export const SECTION_NAV_ANIMATIONS = {
  fast: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
  base: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
  spring: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 28,
    mass: 1,
  },
  springGentle: {
    type: 'spring' as const,
    stiffness: 140,
    damping: 26,
    mass: 1.1,
  },
  springSmooth: {
    type: 'spring' as const,
    stiffness: 80,
    damping: 20,
    mass: 1,
  },
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
 * CSS variable-backed styles for SectionNav
 */
export const SECTION_NAV_STYLES = {
  container: {
    base: 'bg-bg-elevated/80 dark:bg-bg-elevated/80',
    border: 'border border-border-subtle/60 dark:border-border-subtle/50',
    shadow: 'shadow-xl shadow-black/5 dark:shadow-black/30',
    ring: 'ring-1 ring-white/50 dark:ring-white/5 ring-inset',
  },
  dot: {
    inactive: 'bg-text-muted dark:bg-text-muted',
    active: 'bg-text-primary dark:bg-text-primary',
    hover: 'bg-text-secondary dark:bg-text-secondary',
  },
  label: {
    inactive: 'text-text-secondary dark:text-text-secondary',
    active: 'text-text-primary dark:text-text-primary',
    activeButton: 'bg-brand-primary-600 dark:bg-brand-primary-500 text-white',
  },
  progress: {
    track: 'bg-border-subtle/40 dark:bg-border-subtle/30',
    fill: 'bg-text-primary dark:bg-text-primary',
  },
  command: {
    backdrop: 'bg-black/50 dark:bg-black/70',
    dialog: 'bg-bg-elevated dark:bg-bg-elevated',
    border: 'border border-border-subtle dark:border-border-subtle',
    input:
      'bg-bg-secondary dark:bg-bg-secondary text-text-primary dark:text-text-primary',
    item: 'text-text-primary dark:text-text-primary',
    itemHover: 'bg-bg-secondary dark:bg-bg-secondary',
    itemActive: 'bg-brand-primary-100 dark:bg-brand-primary-900/30',
    shortcut:
      'bg-bg-tertiary dark:bg-bg-tertiary text-text-muted dark:text-text-muted',
  },
  button: {
    base: 'text-text-secondary dark:text-text-secondary',
    hover: 'bg-bg-secondary/60 dark:bg-bg-secondary/60',
    active: 'text-text-primary dark:text-text-primary',
  },
} as const;
