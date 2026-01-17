// src/hooks/gestures/useLongPress.ts
'use client';

import { useCallback, useRef, useState, useEffect } from 'react';

/**
 * Long-press stage for progressive feedback
 * Following design principle #6: Purposeful Motion
 */
export type LongPressStage =
  | 'idle'
  | 'pressing'
  | 'preview'
  | 'ready'
  | 'revealed';

/**
 * Configuration for long-press gesture
 */
export interface UseLongPressOptions {
  /** Duration before trigger (ms) - default 500ms per iOS conventions */
  threshold?: number;
  /** Movement tolerance before cancel (px) - default 10px */
  cancelOnMoveDistance?: number;
  /** Enable progressive stages for visual feedback */
  enableStages?: boolean;
  /** Stage timing: when to show preview (ms) */
  previewDelay?: number;
  /** Stage timing: when to show ready state (ms) */
  readyDelay?: number;
  /** Callback when long-press starts (finger down) */
  onStart?: () => void;
  /** Callback during pressing with progress (0-1) */
  onProgress?: (progress: number) => void;
  /** Callback when preview stage reached */
  onPreview?: () => void;
  /** Callback when long-press completes */
  onComplete?: () => void;
  /** Callback when cancelled (moved or released early) */
  onCancel?: () => void;
  /** Disable the gesture */
  disabled?: boolean;
}

/**
 * Return type for useLongPress hook
 */
export interface UseLongPressReturn {
  /** Current stage of the long-press */
  stage: LongPressStage;
  /** Progress from 0-1 during press */
  progress: number;
  /** Whether currently pressing */
  isPressing: boolean;
  /** Whether long-press has completed */
  isComplete: boolean;
  /** Props to spread on the target element */
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
  /** Manual cancel function */
  cancel: () => void;
  /** Reset to initial state */
  reset: () => void;
}

// Default timing values following design principles
const DEFAULT_THRESHOLD = 500; // iOS standard long-press duration
const DEFAULT_CANCEL_DISTANCE = 10; // px
const DEFAULT_PREVIEW_DELAY = 200; // 200ms for preview stage
const DEFAULT_READY_DELAY = 400; // 400ms for ready stage

/**
 * Long-press gesture hook with progressive feedback stages
 *
 * Features:
 * - Progressive visual feedback stages (idle → pressing → preview → ready → revealed)
 * - Cross-platform support (touch + mouse + keyboard)
 * - Movement cancellation with configurable tolerance
 * - Haptic feedback integration ready (via onComplete callback)
 * - Accessibility: keyboard alternative (hold Enter/Space)
 *
 * Design Principles Applied:
 * - #6 Purposeful Motion: Progressive stages for anticipation
 * - #9 Obvious Affordances: Visual feedback during press
 * - #12 Accessibility: Keyboard alternative support
 * - #19 Immediate Feedback: Progress updates during gesture
 *
 * @example
 * ```tsx
 * const { pressProps, stage, progress } = useLongPress({
 *   threshold: 500,
 *   onComplete: () => openContextMenu(),
 *   onPreview: () => showPreviewHint(),
 * });
 *
 * <div
 *   {...pressProps}
 *   style={{ transform: `scale(${1 - progress * 0.05})` }}
 * >
 *   Long press me
 * </div>
 * ```
 */
export function useLongPress(
  options: UseLongPressOptions = {},
): UseLongPressReturn {
  const {
    threshold = DEFAULT_THRESHOLD,
    cancelOnMoveDistance = DEFAULT_CANCEL_DISTANCE,
    enableStages = true,
    previewDelay = DEFAULT_PREVIEW_DELAY,
    readyDelay = DEFAULT_READY_DELAY,
    onStart,
    onProgress,
    onPreview,
    onComplete,
    onCancel,
    disabled = false,
  } = options;

  const [stage, setStage] = useState<LongPressStage>('idle');
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Refs for tracking
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const isKeyboardRef = useRef(false);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Reset to initial state
  const reset = useCallback(() => {
    cleanup();
    setStage('idle');
    setProgress(0);
    setIsPressing(false);
    setIsComplete(false);
    startPosRef.current = null;
    isKeyboardRef.current = false;
  }, [cleanup]);

  // Cancel the gesture
  const cancel = useCallback(() => {
    if (isPressing && !isComplete) {
      cleanup();
      setStage('idle');
      setProgress(0);
      setIsPressing(false);
      startPosRef.current = null;
      onCancel?.();
    }
  }, [isPressing, isComplete, cleanup, onCancel]);

  // Progress animation loop
  const startProgressLoop = useCallback(() => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min(elapsed / threshold, 1);

      setProgress(currentProgress);
      onProgress?.(currentProgress);

      // Update stages based on progress
      if (enableStages) {
        if (
          elapsed >= readyDelay &&
          stage !== 'ready' &&
          stage !== 'revealed'
        ) {
          setStage('ready');
        } else if (elapsed >= previewDelay && stage === 'pressing') {
          setStage('preview');
          onPreview?.();
        }
      }

      if (currentProgress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [
    threshold,
    enableStages,
    previewDelay,
    readyDelay,
    stage,
    onProgress,
    onPreview,
  ]);

  // Start the long-press
  const startPress = useCallback(
    (x: number, y: number, isKeyboard = false) => {
      if (disabled || isPressing) return;

      cleanup();
      setIsPressing(true);
      setIsComplete(false);
      setStage('pressing');
      setProgress(0);
      startTimeRef.current = Date.now();
      startPosRef.current = { x, y };
      isKeyboardRef.current = isKeyboard;

      onStart?.();
      startProgressLoop();

      // Set completion timer
      timerRef.current = setTimeout(() => {
        setStage('revealed');
        setIsComplete(true);
        setProgress(1);
        onComplete?.();
      }, threshold);
    },
    [
      disabled,
      isPressing,
      cleanup,
      threshold,
      onStart,
      onComplete,
      startProgressLoop,
    ],
  );

  // End the press
  const endPress = useCallback(() => {
    if (!isPressing) return;

    if (!isComplete) {
      cancel();
    } else {
      // Already completed, just cleanup
      cleanup();
      setIsPressing(false);
    }
  }, [isPressing, isComplete, cancel, cleanup]);

  // Check if moved too far
  const checkMovement = useCallback(
    (x: number, y: number) => {
      if (!startPosRef.current || isKeyboardRef.current) return;

      const dx = Math.abs(x - startPosRef.current.x);
      const dy = Math.abs(y - startPosRef.current.y);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > cancelOnMoveDistance) {
        cancel();
      }
    },
    [cancelOnMoveDistance, cancel],
  );

  // Event handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      // Prevent default to avoid text selection on long-press
      e.preventDefault();
      startPress(e.clientX, e.clientY);
    },
    [disabled, startPress],
  );

  const handlePointerUp = useCallback(() => {
    endPress();
  }, [endPress]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (isPressing) {
        checkMovement(e.clientX, e.clientY);
      }
    },
    [isPressing, checkMovement],
  );

  const handlePointerCancel = useCallback(() => {
    cancel();
  }, [cancel]);

  const handlePointerLeave = useCallback(() => {
    // Only cancel if using mouse (not touch)
    if (isPressing && !('ontouchstart' in window)) {
      cancel();
    }
  }, [isPressing, cancel]);

  // Prevent context menu on long-press (we handle it)
  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (!disabled) {
        e.preventDefault();
      }
    },
    [disabled],
  );

  // Keyboard support (hold Enter or Space)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
        e.preventDefault();
        startPress(0, 0, true);
      }
    },
    [disabled, startPress],
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        endPress();
      }
    },
    [endPress],
  );

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    stage,
    progress,
    isPressing,
    isComplete,
    pressProps: {
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerMove: handlePointerMove,
      onPointerCancel: handlePointerCancel,
      onPointerLeave: handlePointerLeave,
      onContextMenu: handleContextMenu,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
    },
    cancel,
    reset,
  };
}
