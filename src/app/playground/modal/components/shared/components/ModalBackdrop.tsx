// src/app/playground/modal/components/shared/components/ModalBackdrop.tsx
'use client';

import React from 'react';
import { TransitionChild } from '@headlessui/react';
import { BackdropEffectsConfig, DEFAULT_BACKDROP_EFFECTS } from '../types';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { MOTION_TOKENS } from '@/config/tokens';

/**
 * Props for ModalBackdrop component
 */
export type ModalBackdropProps = {
  /** Backdrop effects configuration */
  backdropConfig?: BackdropEffectsConfig;
  /** Z-index for layering */
  zIndex?: number;
  /** Callback when backdrop is clicked */
  onClose?: () => void;
  /** Whether click-to-close is enabled */
  canClose?: boolean;
};

/**
 * Shared backdrop component with blur, opacity, and transition effects
 *
 * Used by both Dialog and PageMode for consistent backdrop styling.
 * Respects reduced-motion preferences.
 *
 * @example
 * ```tsx
 * <ModalBackdrop
 *   backdropConfig={{ blur: true, blurAmount: '8px', backgroundOpacity: 0.3 }}
 *   onClose={handleClose}
 *   canClose={!isLoading}
 * />
 * ```
 */
export function ModalBackdrop({
  backdropConfig,
  zIndex,
  onClose,
  canClose = true,
}: ModalBackdropProps) {
  const { prefersReducedMotion } = useReducedMotion();

  // Merge with defaults
  const config = { ...DEFAULT_BACKDROP_EFFECTS, ...backdropConfig };

  // Build backdrop styles
  const backdropStyles: React.CSSProperties = {
    backgroundColor: `rgba(0, 0, 0, ${config.backgroundOpacity})`,
    backdropFilter: config.blur ? `blur(${config.blurAmount})` : undefined,
    WebkitBackdropFilter: config.blur
      ? `blur(${config.blurAmount})`
      : undefined,
    zIndex,
  };

  // Click handler
  const handleClick = canClose && onClose ? onClose : undefined;

  // Transition durations (faster for reduced motion)
  const enterDuration = prefersReducedMotion ? 'duration-0' : 'duration-200';
  const leaveDuration = prefersReducedMotion ? 'duration-0' : 'duration-150';

  return (
    <TransitionChild
      enter={`ease-out ${enterDuration}`}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave={`ease-in ${leaveDuration}`}
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="fixed inset-0"
        style={backdropStyles}
        aria-hidden="true"
        onClick={handleClick}
      />
    </TransitionChild>
  );
}
