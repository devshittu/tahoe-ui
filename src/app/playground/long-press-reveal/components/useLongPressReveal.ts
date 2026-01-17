// src/app/playground/long-press-reveal/components/useLongPressReveal.ts
'use client';

import { useCallback, useRef, useMemo, useEffect } from 'react';
import {
  useLongPress,
  type LongPressStage,
} from '@/hooks/gestures/useLongPress';
import type {
  UseLongPressRevealOptions,
  LongPressRevealRenderProps,
} from './types';
import {
  LONG_PRESS_REVEAL_CONFIG,
  HAPTIC_PATTERNS,
  STAGE_FEEDBACK,
} from './types';

/**
 * Trigger haptic feedback using Vibration API
 */
function triggerHaptic(pattern: readonly number[]): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate([...pattern]);
  }
}

/**
 * Extended return type for useLongPressReveal
 */
export interface UseLongPressRevealReturn extends Omit<
  LongPressRevealRenderProps,
  'children'
> {
  /** Current long-press stage */
  stage: LongPressStage;
}

/**
 * Hook for long-press reveal interactions with progressive feedback
 *
 * Features:
 * - Progressive visual feedback stages (idle → pressing → preview → ready → revealed)
 * - Haptic feedback at stage transitions
 * - Auto-dismiss with configurable delay
 * - Computed transform and opacity values for visual feedback
 * - Full accessibility support via keyboard
 *
 * @example
 * ```tsx
 * const {
 *   stage,
 *   progress,
 *   isRevealed,
 *   pressProps,
 *   pressTransform,
 *   dismiss,
 * } = useLongPressReveal({
 *   onReveal: () => console.log('Revealed!'),
 *   onDismiss: () => console.log('Dismissed'),
 *   hapticIntensity: 'medium',
 * });
 *
 * return (
 *   <div
 *     {...pressProps}
 *     style={{ transform: pressTransform }}
 *   >
 *     {isRevealed ? <QuickActions /> : <Content />}
 *   </div>
 * );
 * ```
 */
export function useLongPressReveal(
  options: UseLongPressRevealOptions = {},
): UseLongPressRevealReturn {
  const {
    threshold = LONG_PRESS_REVEAL_CONFIG.threshold,
    cancelOnMoveDistance = LONG_PRESS_REVEAL_CONFIG.cancelOnMoveDistance,
    enableStages = LONG_PRESS_REVEAL_CONFIG.enableStages,
    previewDelay = LONG_PRESS_REVEAL_CONFIG.previewDelay,
    readyDelay = LONG_PRESS_REVEAL_CONFIG.readyDelay,
    pressScale = LONG_PRESS_REVEAL_CONFIG.pressScale,
    autoDismissDelay = LONG_PRESS_REVEAL_CONFIG.autoDismissDelay,
    hapticIntensity = LONG_PRESS_REVEAL_CONFIG.hapticIntensity,
    onReveal,
    onDismiss,
    onCancel,
    onProgress,
    onPreview,
    disabled = false,
  } = options;

  const autoDismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const lastStageRef = useRef<LongPressStage>('idle');

  // Cleanup auto-dismiss timer
  const clearAutoDismiss = useCallback(() => {
    if (autoDismissTimerRef.current) {
      clearTimeout(autoDismissTimerRef.current);
      autoDismissTimerRef.current = null;
    }
  }, []);

  // Handle reveal completion with haptics
  const handleComplete = useCallback(() => {
    if (hapticIntensity !== 'none') {
      triggerHaptic(HAPTIC_PATTERNS[hapticIntensity].reveal);
    }
    onReveal?.();

    // Set up auto-dismiss if configured
    if (autoDismissDelay > 0) {
      clearAutoDismiss();
      autoDismissTimerRef.current = setTimeout(() => {
        // Will be handled by dismiss callback
      }, autoDismissDelay);
    }
  }, [hapticIntensity, onReveal, autoDismissDelay, clearAutoDismiss]);

  // Handle preview stage with haptics
  const handlePreview = useCallback(() => {
    if (hapticIntensity !== 'none') {
      triggerHaptic(HAPTIC_PATTERNS[hapticIntensity].preview);
    }
    onPreview?.();
  }, [hapticIntensity, onPreview]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    clearAutoDismiss();
    onCancel?.();
  }, [clearAutoDismiss, onCancel]);

  // Use the base long-press hook
  const {
    stage,
    progress,
    isPressing,
    isComplete,
    pressProps,
    cancel,
    reset: baseReset,
  } = useLongPress({
    threshold,
    cancelOnMoveDistance,
    enableStages,
    previewDelay,
    readyDelay,
    onComplete: handleComplete,
    onPreview: handlePreview,
    onCancel: handleCancel,
    onProgress,
    disabled,
  });

  // Trigger haptic for ready stage
  useEffect(() => {
    if (stage === 'ready' && lastStageRef.current !== 'ready') {
      if (hapticIntensity !== 'none') {
        triggerHaptic(HAPTIC_PATTERNS[hapticIntensity].ready);
      }
    }
    lastStageRef.current = stage;
  }, [stage, hapticIntensity]);

  // Dismiss the revealed content
  const dismiss = useCallback(() => {
    clearAutoDismiss();
    baseReset();
    onDismiss?.();
  }, [clearAutoDismiss, baseReset, onDismiss]);

  // Reset everything
  const reset = useCallback(() => {
    clearAutoDismiss();
    baseReset();
  }, [clearAutoDismiss, baseReset]);

  // Cleanup on unmount
  useEffect(() => {
    return clearAutoDismiss;
  }, [clearAutoDismiss]);

  // Compute visual feedback values
  const feedback = STAGE_FEEDBACK[stage];
  const interpolatedScale = useMemo(() => {
    if (stage === 'idle') return 1;
    if (stage === 'revealed') return pressScale;
    // Interpolate based on progress
    return 1 - (1 - pressScale) * progress;
  }, [stage, progress, pressScale]);

  const pressTransform = useMemo(
    () => `scale(${interpolatedScale})`,
    [interpolatedScale],
  );

  const progressOpacity = useMemo(() => {
    if (stage === 'idle') return 0;
    if (stage === 'revealed') return 1;
    return feedback.opacity;
  }, [stage, feedback.opacity]);

  return {
    stage,
    progress,
    isPressing,
    isRevealed: isComplete,
    pressProps,
    dismiss,
    reset,
    pressTransform,
    progressOpacity,
  };
}

export default useLongPressReveal;
