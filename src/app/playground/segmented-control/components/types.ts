// src/app/playground/segmented-control/components/types.ts

import { ReactNode } from 'react';

/**
 * Segmented control size variants
 */
export type SegmentedControlSize = 'sm' | 'md' | 'lg';

/**
 * Individual segment option data
 */
export interface SegmentOption<T = string> {
  /** Unique value for this segment */
  value: T;
  /** Display label */
  label: string;
  /** Optional icon (renders before label) */
  icon?: ReactNode;
  /** Disabled state for this segment */
  disabled?: boolean;
}

/**
 * Props for individual Segment component
 */
export interface SegmentProps<T = string> {
  /** Segment option data */
  option: SegmentOption<T>;
  /** Whether this segment is selected */
  selected: boolean;
  /** Size variant (inherited from parent) */
  size: SegmentedControlSize;
  /** Whether the entire control is disabled */
  controlDisabled: boolean;
  /** Click handler */
  onClick: () => void;
}

/**
 * Props for SegmentedControl component
 */
export interface SegmentedControlProps<T = string> {
  /** Segment options */
  options: SegmentOption<T>[];
  /** Currently selected value */
  value?: T;
  /** Selection change handler */
  onChange?: (value: T) => void;
  /** Size variant */
  size?: SegmentedControlSize;
  /** Disable all segments */
  disabled?: boolean;
  /** Expand to fill container width */
  fullWidth?: boolean;
  /** Name attribute for form submission */
  name?: string;
  /** Additional className for container */
  className?: string;
}

/**
 * Size configuration for consistent styling
 *
 * Following 8pt grid system per design-principles.md #3
 */
export const SEGMENT_SIZE_CONFIG: Record<
  SegmentedControlSize,
  {
    /** Segment padding */
    segment: string;
    /** Icon size class */
    iconSize: string;
    /** Container padding */
    container: string;
    /** Container border radius */
    containerRadius: string;
    /** Indicator border radius */
    indicatorRadius: string;
    /** Font size */
    fontSize: string;
    /** Minimum height for touch target (44px per WCAG) */
    minHeight: number;
  }
> = {
  sm: {
    segment: 'px-3 py-1.5',
    iconSize: 'w-4 h-4',
    container: 'p-1',
    containerRadius: 'rounded-lg',
    indicatorRadius: 'rounded-md',
    fontSize: 'text-sm',
    minHeight: 32,
  },
  md: {
    segment: 'px-4 py-2',
    iconSize: 'w-5 h-5',
    container: 'p-1',
    containerRadius: 'rounded-xl',
    indicatorRadius: 'rounded-lg',
    fontSize: 'text-base',
    minHeight: 40,
  },
  lg: {
    segment: 'px-5 py-2.5',
    iconSize: 'w-5 h-5',
    container: 'p-1.5',
    containerRadius: 'rounded-xl',
    indicatorRadius: 'rounded-lg',
    fontSize: 'text-lg',
    minHeight: 48,
  },
};

/**
 * Animation configuration for sliding indicator
 *
 * Spring-based per design-principles.md #6
 */
export const SEGMENT_ANIMATION_CONFIG = {
  /** Spring configuration for indicator */
  spring: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  },
  /** Transition for segment text/icon color changes */
  colorTransition: {
    duration: 0.15,
  },
};
