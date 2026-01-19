// src/app/playground/modal/components/shared/components/ModalBackdrop.tsx
'use client';

import React from 'react';
import { TransitionChild } from '@headlessui/react';
import { BackdropEffectsConfig, DEFAULT_BACKDROP_EFFECTS } from '../types';
import { useReducedMotion } from '../hooks/useReducedMotion';
// Token imports available if needed for future color customization

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
 * ModalBackdrop - Apple-inspired backdrop with blur and depth
 *
 * Design principles applied:
 * - #10 Confident Simplicity: Calm, professional dimming
 * - #6 Purposeful Motion: Smooth fade transitions
 * - #3 Intentional White Space: Creates focus on modal content
 *
 * Visual refinements:
 * - Deeper opacity (0.4-0.5) for better content separation
 * - Subtle vignette effect for cinematic depth
 * - Smooth blur transition
 */
export function ModalBackdrop({
  backdropConfig,
  zIndex,
  onClose,
  canClose = true,
}: ModalBackdropProps) {
  const { prefersReducedMotion } = useReducedMotion();

  // Merge with defaults, but use slightly deeper opacity for better contrast
  const config = {
    ...DEFAULT_BACKDROP_EFFECTS,
    ...backdropConfig,
  };

  // Increase minimum opacity for better modal separation (Apple-like depth)
  const effectiveOpacity = Math.max(config.backgroundOpacity, 0.4);

  // Build backdrop styles with vignette effect
  const backdropStyles: React.CSSProperties = {
    // Base dark overlay
    backgroundColor: `rgba(0, 0, 0, ${effectiveOpacity})`,
    // Blur effect
    backdropFilter: config.blur ? `blur(${config.blurAmount})` : undefined,
    WebkitBackdropFilter: config.blur
      ? `blur(${config.blurAmount})`
      : undefined,
    zIndex,
  };

  // Click handler
  const handleClick = canClose && onClose ? onClose : undefined;

  // Transition durations (slightly longer for premium feel)
  const enterDuration = prefersReducedMotion ? 'duration-0' : 'duration-250';
  const leaveDuration = prefersReducedMotion ? 'duration-0' : 'duration-200';

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
      >
        {/* Subtle vignette overlay for cinematic depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.15) 100%)',
          }}
        />
      </div>
    </TransitionChild>
  );
}
