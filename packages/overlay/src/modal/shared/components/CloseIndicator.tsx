'use client';

import React from 'react';
import SafeMotionDiv from '../../../utils/SafeMotionDiv';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { MOTION_DEFAULTS, SPACING_DEFAULTS } from '../types';

export type CloseIndicatorProps = {
  isVisible: boolean;
  zIndex?: number;
  message?: string;
};

/**
 * "Release to close" indicator shown when drag exceeds close threshold
 */
export function CloseIndicator({
  isVisible,
  zIndex = SPACING_DEFAULTS.zIndex.closeIndicator,
  message,
}: CloseIndicatorProps) {
  const { prefersReducedMotion, getSpringConfig } = useReducedMotion();

  if (!isVisible) return null;

  const springConfig = getSpringConfig(MOTION_DEFAULTS.spring.gentle);
  const displayMessage = message || 'Release to close';

  return (
    <SafeMotionDiv
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex }}
      initial={{ scale: prefersReducedMotion ? 1 : 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: prefersReducedMotion ? 1 : 0, opacity: 0 }}
      transition={springConfig}
      aria-live="assertive"
    >
      <div className="border-4 border-dashed border-blue-400 p-6 text-blue-600 dark:text-blue-400 bg-white/90 dark:bg-gray-700/90 rounded-lg shadow-lg backdrop-blur-sm">
        {displayMessage}
      </div>
    </SafeMotionDiv>
  );
}
