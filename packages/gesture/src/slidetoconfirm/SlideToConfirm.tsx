'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  animate,
} from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { FiCheck, FiLoader } from 'react-icons/fi';
import type { SlideToConfirmProps } from './types';
import {
  SLIDE_TO_CONFIRM_CONFIG,
  SPRING_CONFIGS,
  VARIANT_STYLES,
} from './types';

/**
 * Trigger haptic feedback using Vibration API
 */
function triggerHaptic(pattern: number[]): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

/**
 * SlideToConfirm - iOS-style swipe confirmation for critical actions
 *
 * Features:
 * - Smooth spring physics
 * - Progressive haptic feedback
 * - Velocity-based completion
 * - Reduced motion support
 * - CSS variable-backed theming
 *
 * @example
 * ```tsx
 * <SlideToConfirm
 *   onConfirm={() => deleteAccount()}
 *   label="Slide to delete"
 *   confirmLabel="Deleted"
 *   variant="destructive"
 * />
 * ```
 */
export function SlideToConfirm({
  onConfirm,
  label = 'Slide to confirm',
  confirmLabel = 'Confirmed',
  variant = 'default',
  direction = 'right',
  threshold = SLIDE_TO_CONFIRM_CONFIG.threshold,
  children,
  confirmIcon,
  disabled = false,
  isLoading = false,
  loadingContent,
  enableHaptics = true,
  hapticIntensity = 'medium',
  snapBackSpring = SPRING_CONFIGS.snapBack,
  enableVelocityComplete = true,
  velocityThreshold = SLIDE_TO_CONFIRM_CONFIG.velocityThreshold,
  showProgressFill = true,
  className,
  trackClassName,
  thumbClassName,
  onProgressChange,
  onSlideStart,
  onSlideEnd,
  onCancel,
  width = '100%',
  height = SLIDE_TO_CONFIRM_CONFIG.height,
  borderRadius = SLIDE_TO_CONFIRM_CONFIG.borderRadius,
  thumbSize,
}: SlideToConfirmProps) {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const hapticTriggeredRef = useRef<Set<number>>(new Set());

  // Drag tracking refs
  const dragStartXRef = useRef(0);
  const lastVelocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastXRef = useRef(0);

  // Calculate thumb size
  const actualThumbSize =
    thumbSize ?? height - SLIDE_TO_CONFIRM_CONFIG.thumbPadding * 2;
  const maxSlideDistance = Math.max(
    0,
    trackWidth - actualThumbSize - SLIDE_TO_CONFIRM_CONFIG.thumbPadding * 2,
  );

  // Motion value for thumb position
  const thumbX = useMotionValue(0);

  // Derived progress (0-1)
  const progress = useTransform(thumbX, [0, maxSlideDistance || 1], [0, 1]);

  // Fill width as percentage
  const fillWidth = useTransform(
    progress,
    (p) => `${Math.min(100, Math.max(0, p * 100))}%`,
  );

  // Track progress changes for haptics
  useEffect(() => {
    if (!enableHaptics || disabled || hapticIntensity === 'none') return;

    const unsubscribe = progress.on('change', (value) => {
      onProgressChange?.(Math.max(0, Math.min(1, value)));

      const milestones = [0.5, 0.85, 1];
      const pattern =
        SLIDE_TO_CONFIRM_CONFIG.hapticPatterns[
          hapticIntensity as keyof typeof SLIDE_TO_CONFIRM_CONFIG.hapticPatterns
        ];

      milestones.forEach((milestone) => {
        if (value >= milestone && !hapticTriggeredRef.current.has(milestone)) {
          hapticTriggeredRef.current.add(milestone);
          triggerHaptic(milestone === 1 ? [30, 10, 30] : [...pattern]);
        }
      });
    });

    return unsubscribe;
  }, [progress, enableHaptics, hapticIntensity, disabled, onProgressChange]);

  // Measure track width
  useEffect(() => {
    if (!trackRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setTrackWidth(entry.contentRect.width);
      }
    });

    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle confirmation
  const handleConfirm = useCallback(async () => {
    if (isConfirmed) return;

    setIsConfirmed(true);
    setInternalLoading(true);

    // Animate thumb to end
    animate(thumbX, maxSlideDistance, {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    });

    // Strong haptic on confirm
    if (enableHaptics && hapticIntensity !== 'none') {
      triggerHaptic([50, 30, 50]);
    }

    try {
      await onConfirm();
    } finally {
      setTimeout(() => {
        setInternalLoading(false);
      }, 500);
    }
  }, [
    onConfirm,
    enableHaptics,
    hapticIntensity,
    maxSlideDistance,
    thumbX,
    isConfirmed,
  ]);

  // Pointer event handlers for drag
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (
        disabled ||
        isConfirmed ||
        isLoading ||
        internalLoading ||
        maxSlideDistance <= 0
      )
        return;
      if (prefersReducedMotion) return;

      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);

      setIsDragging(true);
      dragStartXRef.current = e.clientX - thumbX.get();
      lastXRef.current = e.clientX;
      lastTimeRef.current = Date.now();
      lastVelocityRef.current = 0;
      hapticTriggeredRef.current.clear();
      onSlideStart?.();
    },
    [
      disabled,
      isConfirmed,
      isLoading,
      internalLoading,
      maxSlideDistance,
      prefersReducedMotion,
      thumbX,
      onSlideStart,
    ],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || maxSlideDistance <= 0) return;

      const currentX = e.clientX;
      const now = Date.now();
      const dt = now - lastTimeRef.current;

      if (dt > 0) {
        lastVelocityRef.current = ((currentX - lastXRef.current) / dt) * 1000; // px/s
      }

      lastXRef.current = currentX;
      lastTimeRef.current = now;

      let newX = currentX - dragStartXRef.current;

      // Clamp with elastic overscroll
      if (newX < 0) {
        newX = newX * 0.2; // Resistance going left
      } else if (newX > maxSlideDistance) {
        const overscroll = newX - maxSlideDistance;
        newX = maxSlideDistance + Math.sqrt(overscroll) * 3;
      }

      thumbX.set(newX);
    },
    [isDragging, maxSlideDistance, thumbX],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;

      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDragging(false);
      onSlideEnd?.();

      if (maxSlideDistance <= 0) return;

      const currentX = thumbX.get();
      const currentProgress = Math.max(0, currentX) / maxSlideDistance;
      const velocity = lastVelocityRef.current;

      // Check confirmation conditions
      const reachedThreshold = currentProgress >= threshold;
      const fastEnough =
        enableVelocityComplete && velocity >= velocityThreshold * 1000;
      const halfwayWithVelocity =
        currentProgress >= 0.5 && velocity >= velocityThreshold * 500;

      if (reachedThreshold || fastEnough || halfwayWithVelocity) {
        handleConfirm();
      } else {
        // Snap back with spring animation
        animate(thumbX, 0, {
          type: 'spring',
          stiffness: snapBackSpring.stiffness,
          damping: snapBackSpring.damping,
        });
        hapticTriggeredRef.current.clear();
        onCancel?.();
      }
    },
    [
      isDragging,
      maxSlideDistance,
      threshold,
      enableVelocityComplete,
      velocityThreshold,
      handleConfirm,
      onCancel,
      onSlideEnd,
      thumbX,
      snapBackSpring,
    ],
  );

  // Reduced motion: tap-and-hold alternative
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleTapHoldStart = useCallback(() => {
    if (!prefersReducedMotion || disabled || isConfirmed || isLoading) return;

    holdTimerRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        const next = prev + 0.02;
        if (next >= 1) {
          if (holdTimerRef.current) clearInterval(holdTimerRef.current);
          handleConfirm();
          return 1;
        }
        return next;
      });
    }, 20);
  }, [prefersReducedMotion, disabled, isConfirmed, isLoading, handleConfirm]);

  const handleTapHoldEnd = useCallback(() => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (holdProgress < 1) {
      setHoldProgress(0);
    }
  }, [holdProgress]);

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    };
  }, []);

  // Get variant styles
  const styles = VARIANT_STYLES[variant];
  const showLoading = isLoading || internalLoading;
  const canInteract =
    !disabled && !isConfirmed && !showLoading && maxSlideDistance > 0;

  return (
    <div
      className={twMerge('relative select-none', className)}
      style={{ width }}
    >
      {/* Track */}
      <div
        ref={trackRef}
        className={twMerge(
          'relative overflow-hidden transition-colors duration-200',
          isDragging ? styles.trackActive : styles.track,
          disabled && 'opacity-50 cursor-not-allowed',
          trackClassName,
        )}
        style={{
          height,
          borderRadius,
        }}
      >
        {/* Progress fill */}
        {showProgressFill && (
          <motion.div
            className={twMerge(
              'absolute inset-y-0 left-0 transition-colors duration-300',
              isConfirmed ? styles.fillComplete : styles.fill,
            )}
            style={{
              width: prefersReducedMotion
                ? `${holdProgress * 100}%`
                : fillWidth,
              borderRadius,
            }}
          />
        )}

        {/* Label */}
        <div
          className={twMerge(
            'absolute inset-0 flex items-center justify-center',
            'text-sm font-medium transition-colors duration-300',
            'pointer-events-none select-none',
            isConfirmed ? styles.labelComplete : styles.label,
          )}
        >
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: isConfirmed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {prefersReducedMotion && !isConfirmed
              ? 'Tap and hold to confirm'
              : label}
          </motion.span>
          <motion.span
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: isConfirmed ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {confirmLabel}
          </motion.span>
        </div>

        {/* Thumb */}
        <motion.div
          ref={thumbRef}
          onPointerDown={prefersReducedMotion ? undefined : handlePointerDown}
          onPointerMove={prefersReducedMotion ? undefined : handlePointerMove}
          onPointerUp={prefersReducedMotion ? undefined : handlePointerUp}
          onPointerCancel={prefersReducedMotion ? undefined : handlePointerUp}
          onMouseDown={prefersReducedMotion ? handleTapHoldStart : undefined}
          onMouseUp={prefersReducedMotion ? handleTapHoldEnd : undefined}
          onMouseLeave={prefersReducedMotion ? handleTapHoldEnd : undefined}
          onTouchStart={prefersReducedMotion ? handleTapHoldStart : undefined}
          onTouchEnd={prefersReducedMotion ? handleTapHoldEnd : undefined}
          className={twMerge(
            'absolute flex items-center justify-center touch-none',
            canInteract &&
              !prefersReducedMotion &&
              'cursor-grab active:cursor-grabbing',
            'transition-colors duration-200',
            isConfirmed
              ? styles.thumbComplete
              : isDragging
                ? styles.thumbActive
                : styles.thumb,
            disabled && 'cursor-not-allowed',
            thumbClassName,
          )}
          style={{
            width: actualThumbSize,
            height: actualThumbSize,
            borderRadius: borderRadius - SLIDE_TO_CONFIRM_CONFIG.thumbPadding,
            top: SLIDE_TO_CONFIRM_CONFIG.thumbPadding,
            left: SLIDE_TO_CONFIRM_CONFIG.thumbPadding,
            x: thumbX,
          }}
          whileTap={canInteract ? { scale: 0.95 } : undefined}
        >
          {/* Thumb content */}
          <div
            className={twMerge(
              'flex items-center justify-center',
              'transition-colors duration-200',
              isConfirmed ? styles.iconComplete : styles.icon,
            )}
          >
            {showLoading
              ? (loadingContent ?? (
                  <FiLoader className="w-5 h-5 animate-spin" />
                ))
              : isConfirmed
                ? (confirmIcon ?? <FiCheck className="w-5 h-5" />)
                : (children ?? (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  ))}
          </div>
        </motion.div>
      </div>

      {/* Reduced motion progress indicator */}
      {prefersReducedMotion && holdProgress > 0 && !isConfirmed && (
        <div className="mt-2 h-1 bg-bg-secondary dark:bg-bg-secondary rounded-full overflow-hidden">
          <div
            className={twMerge(
              'h-full transition-all duration-100',
              variant === 'destructive' && 'bg-error',
              variant === 'success' && 'bg-success',
              variant === 'default' &&
                'bg-brand-primary-600 dark:bg-brand-primary-500',
            )}
            style={{ width: `${holdProgress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default SlideToConfirm;
