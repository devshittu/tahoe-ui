'use client';

import { useCallback, useRef, useState, useEffect } from 'react';

export type LongPressStage =
  | 'idle'
  | 'pressing'
  | 'preview'
  | 'ready'
  | 'revealed';

export interface UseLongPressOptions {
  threshold?: number;
  cancelOnMoveDistance?: number;
  enableStages?: boolean;
  previewDelay?: number;
  readyDelay?: number;
  onStart?: () => void;
  onProgress?: (progress: number) => void;
  onPreview?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
}

export interface UseLongPressReturn {
  stage: LongPressStage;
  progress: number;
  isPressing: boolean;
  isComplete: boolean;
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
  cancel: () => void;
  reset: () => void;
}

const DEFAULT_THRESHOLD = 500;
const DEFAULT_CANCEL_DISTANCE = 10;
const DEFAULT_PREVIEW_DELAY = 200;
const DEFAULT_READY_DELAY = 400;

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

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const isKeyboardRef = useRef(false);

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

  const reset = useCallback(() => {
    cleanup();
    setStage('idle');
    setProgress(0);
    setIsPressing(false);
    setIsComplete(false);
    startPosRef.current = null;
    isKeyboardRef.current = false;
  }, [cleanup]);

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

  const startProgressLoop = useCallback(() => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min(elapsed / threshold, 1);

      setProgress(currentProgress);
      onProgress?.(currentProgress);

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

  const endPress = useCallback(() => {
    if (!isPressing) return;

    if (!isComplete) {
      cancel();
    } else {
      cleanup();
      setIsPressing(false);
    }
  }, [isPressing, isComplete, cancel, cleanup]);

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

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
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
    if (isPressing && !('ontouchstart' in window)) {
      cancel();
    }
  }, [isPressing, cancel]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (!disabled) {
        e.preventDefault();
      }
    },
    [disabled],
  );

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
