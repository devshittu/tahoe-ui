// src/app/playground/modal/components/shared/components/CloseIndicator.tsx
'use client';

import React from 'react';
import SafeMotionDiv from '@/components/Motion/SafeMotionDiv';
import { t } from '@/app/i18n';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { MOTION_TOKENS, SPACING_TOKENS } from '@/config/tokens';

/**
 * Props for CloseIndicator component
 */
export type CloseIndicatorProps = {
  /** Whether the indicator should be visible */
  isVisible: boolean;
  /** Z-index for layering (should be above modal) */
  zIndex?: number;
  /** Custom message (default: translated "Release to close") */
  message?: string;
};

/**
 * "Release to close" indicator shown when drag exceeds close threshold
 *
 * Features:
 * - Spring animation entrance/exit
 * - Reduced motion support
 * - i18n support for message
 * - Centered overlay with glassmorphic styling
 *
 * @example
 * ```tsx
 * <CloseIndicator
 *   isVisible={dragState.shouldClose && !isLoading}
 *   zIndex={zIndex + 1}
 * />
 * ```
 */
export function CloseIndicator({
  isVisible,
  zIndex = SPACING_TOKENS.zIndex.closeIndicator,
  message,
}: CloseIndicatorProps) {
  const { prefersReducedMotion, getSpringConfig } = useReducedMotion();

  if (!isVisible) return null;

  // Get spring config (instant for reduced motion)
  const springConfig = getSpringConfig(MOTION_TOKENS.spring.gentle);

  // Display message with i18n fallback
  const displayMessage = message || t('releaseToClose');

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
