'use client';

import React from 'react';
import { TransitionChild } from '@headlessui/react';
import { BackdropEffectsConfig, DEFAULT_BACKDROP_EFFECTS } from '../types';
import { useReducedMotion } from '../hooks/useReducedMotion';

export type ModalBackdropProps = {
  backdropConfig?: BackdropEffectsConfig;
  zIndex?: number;
  onClose?: () => void;
  canClose?: boolean;
};

/**
 * ModalBackdrop - Apple-inspired backdrop with blur and depth
 */
export function ModalBackdrop({
  backdropConfig,
  zIndex,
  onClose,
  canClose = true,
}: ModalBackdropProps) {
  const { prefersReducedMotion } = useReducedMotion();

  const config = {
    ...DEFAULT_BACKDROP_EFFECTS,
    ...backdropConfig,
  };

  const effectiveOpacity = Math.max(config.backgroundOpacity, 0.4);

  const backdropStyles: React.CSSProperties = {
    backgroundColor: `rgba(0, 0, 0, ${effectiveOpacity})`,
    backdropFilter: config.blur ? `blur(${config.blurAmount})` : undefined,
    WebkitBackdropFilter: config.blur
      ? `blur(${config.blurAmount})`
      : undefined,
    zIndex,
  };

  const handleClick = canClose && onClose ? onClose : undefined;

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
