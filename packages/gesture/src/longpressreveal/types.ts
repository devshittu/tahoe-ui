// packages/gesture/src/longpressreveal/types.ts
'use client';

import type { ReactNode } from 'react';
import type { LongPressStage } from '../useLongPress';

/**
 * Visual style variants for reveal content
 */
export type RevealVariant = 'default' | 'menu' | 'preview' | 'actions';

/**
 * Reveal animation direction
 */
export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'center';

/**
 * Haptic feedback intensity levels
 */
export type HapticIntensity = 'light' | 'medium' | 'heavy' | 'none';

/**
 * Configuration for long-press reveal behavior
 */
export interface LongPressRevealConfig {
  /** Duration before reveal (ms) - default 500ms */
  threshold?: number;
  /** Movement tolerance before cancel (px) - default 10px */
  cancelOnMoveDistance?: number;
  /** Enable progressive visual stages */
  enableStages?: boolean;
  /** When to show preview hint (ms) - default 200ms */
  previewDelay?: number;
  /** When to show ready state (ms) - default 400ms */
  readyDelay?: number;
  /** Scale factor when pressing (0.95 = 5% smaller) */
  pressScale?: number;
  /** Blur radius for target when revealed (px) */
  revealBlur?: number;
  /** Auto-dismiss revealed content after delay (ms, 0 = manual) */
  autoDismissDelay?: number;
  /** Haptic feedback intensity */
  hapticIntensity?: HapticIntensity;
}

/**
 * Render props passed to children function
 */
export interface LongPressRevealRenderProps {
  /** Current stage of the long-press */
  stage: LongPressStage;
  /** Progress from 0-1 during press */
  progress: number;
  /** Whether currently pressing */
  isPressing: boolean;
  /** Whether reveal has completed */
  isRevealed: boolean;
  /** Props to spread on the trigger element */
  pressProps: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerCancel: (e: React.PointerEvent) => void;
    onPointerLeave: (e: React.PointerEvent) => void;
    onContextMenu: (e: React.MouseEvent) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onKeyUp: (e: React.KeyboardEvent) => void;
  };
  /** Dismiss the revealed content */
  dismiss: () => void;
  /** Reset to initial idle state */
  reset: () => void;
  /** Computed transform style for press feedback */
  pressTransform: string;
  /** Computed opacity for progress indicator */
  progressOpacity: number;
}

/**
 * Props for useLongPressReveal hook
 */
export interface UseLongPressRevealOptions extends LongPressRevealConfig {
  /** Callback when reveal completes */
  onReveal?: () => void;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Callback when cancelled (moved or released early) */
  onCancel?: () => void;
  /** Callback during pressing with progress (0-1) */
  onProgress?: (progress: number) => void;
  /** Callback when preview stage reached */
  onPreview?: () => void;
  /** Disable the gesture */
  disabled?: boolean;
}

/**
 * Props for LongPressReveal headless component
 */
export interface LongPressRevealProps extends UseLongPressRevealOptions {
  /** Render function receiving state and handlers */
  children: (props: LongPressRevealRenderProps) => ReactNode;
  /** Additional class name for wrapper */
  className?: string;
}

/**
 * Default configuration values
 */
export const LONG_PRESS_REVEAL_CONFIG = {
  threshold: 500,
  cancelOnMoveDistance: 10,
  enableStages: true,
  previewDelay: 200,
  readyDelay: 400,
  pressScale: 0.97,
  revealBlur: 2,
  autoDismissDelay: 0,
  hapticIntensity: 'medium' as HapticIntensity,
} as const;

/**
 * Haptic patterns for different stages
 */
export const HAPTIC_PATTERNS = {
  light: {
    preview: [10],
    ready: [15],
    reveal: [20],
  },
  medium: {
    preview: [15],
    ready: [20, 10],
    reveal: [30, 15, 30],
  },
  heavy: {
    preview: [25],
    ready: [30, 15],
    reveal: [50, 25, 50],
  },
} as const;

/**
 * Spring animation configurations
 */
export const SPRING_CONFIGS = {
  press: {
    stiffness: 400,
    damping: 30,
  },
  reveal: {
    stiffness: 300,
    damping: 25,
  },
  dismiss: {
    stiffness: 350,
    damping: 28,
  },
} as const;

/**
 * Stage-based visual feedback values
 */
export const STAGE_FEEDBACK = {
  idle: {
    scale: 1,
    opacity: 0,
    blur: 0,
  },
  pressing: {
    scale: 0.98,
    opacity: 0.3,
    blur: 0,
  },
  preview: {
    scale: 0.97,
    opacity: 0.6,
    blur: 0.5,
  },
  ready: {
    scale: 0.96,
    opacity: 0.9,
    blur: 1,
  },
  revealed: {
    scale: 0.95,
    opacity: 1,
    blur: 2,
  },
} as const;

/**
 * CSS variable-backed variant styles for the overlay
 */
export const REVEAL_VARIANT_STYLES: Record<RevealVariant, string> = {
  default:
    'bg-bg-elevated dark:bg-bg-elevated border border-border-subtle dark:border-border-subtle rounded-xl shadow-lg',
  menu: 'bg-bg-elevated dark:bg-bg-elevated border border-border-subtle dark:border-border-subtle rounded-xl shadow-xl',
  preview:
    'bg-bg-elevated/95 dark:bg-bg-elevated/95 backdrop-blur-sm border border-border-subtle/50 dark:border-border-subtle/50 rounded-2xl shadow-2xl',
  actions:
    'bg-bg-secondary dark:bg-bg-secondary border border-border-subtle dark:border-border-subtle rounded-full shadow-lg',
};

/**
 * CSS variable-backed action variant styles
 */
export const ACTION_VARIANT_STYLES = {
  default:
    'bg-bg-secondary dark:bg-bg-secondary text-text-secondary dark:text-text-secondary hover:bg-bg-tertiary dark:hover:bg-bg-tertiary',
  destructive:
    'bg-error/10 dark:bg-error/20 text-error dark:text-error hover:bg-error/20 dark:hover:bg-error/30',
  primary:
    'bg-brand-primary-100 dark:bg-brand-primary-900/30 text-brand-primary-600 dark:text-brand-primary-400 hover:bg-brand-primary-200 dark:hover:bg-brand-primary-800/50',
} as const;
