// src/hooks/gestures/useSwipe.ts
'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Swipe direction
 */
export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | null;

/**
 * Configuration for swipe gesture
 */
export interface UseSwipeOptions {
  /** Minimum distance to register as swipe (px) - default 50px */
  threshold?: number;
  /** Maximum time for swipe gesture (ms) - default 300ms */
  timeout?: number;
  /** Minimum velocity for swipe (px/ms) - default 0.3 */
  velocityThreshold?: number;
  /** Restrict to specific axis: 'x' | 'y' | 'both' */
  axis?: 'x' | 'y' | 'both';
  /** Callback when swipe detected */
  onSwipe?: (direction: SwipeDirection, velocity: number) => void;
  /** Callback for swipe left */
  onSwipeLeft?: (velocity: number) => void;
  /** Callback for swipe right */
  onSwipeRight?: (velocity: number) => void;
  /** Callback for swipe up */
  onSwipeUp?: (velocity: number) => void;
  /** Callback for swipe down */
  onSwipeDown?: (velocity: number) => void;
  /** Callback during swipe with offset */
  onSwiping?: (
    offset: { x: number; y: number },
    direction: SwipeDirection,
  ) => void;
  /** Callback when swipe starts */
  onSwipeStart?: () => void;
  /** Callback when swipe ends (regardless of success) */
  onSwipeEnd?: () => void;
  /** Disable the gesture */
  disabled?: boolean;
  /** Prevent default touch behavior */
  preventScroll?: boolean;
}

/**
 * Return type for useSwipe hook
 */
export interface UseSwipeReturn {
  /** Current swipe direction during gesture */
  direction: SwipeDirection;
  /** Current offset from start position */
  offset: { x: number; y: number };
  /** Whether currently swiping */
  isSwiping: boolean;
  /** Velocity of last completed swipe */
  velocity: number;
  /** Props to spread on the swipeable element */
  swipeProps: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onMouseLeave: (e: React.MouseEvent) => void;
  };
  /** Reset swipe state */
  reset: () => void;
}

// Default values
const DEFAULT_THRESHOLD = 50; // px
const DEFAULT_TIMEOUT = 300; // ms
const DEFAULT_VELOCITY_THRESHOLD = 0.3; // px/ms

/**
 * Swipe gesture hook for dismissible elements, carousels, etc.
 *
 * Features:
 * - Multi-directional swipe detection
 * - Velocity-based detection (fast flicks register even if short)
 * - Real-time offset tracking during swipe
 * - Axis locking (horizontal or vertical only)
 * - Touch and mouse support
 *
 * Design Principles Applied:
 * - #6 Purposeful Motion: Velocity threshold ensures intentional gestures
 * - #7 Intuitive Interaction: Matches native swipe behavior
 * - #17 Mobile-Native: Touch-first design with mouse fallback
 * - #19 Immediate Feedback: Real-time offset updates during gesture
 *
 * @example
 * ```tsx
 * const { swipeProps, offset, isSwiping } = useSwipe({
 *   axis: 'x',
 *   onSwipeLeft: () => goToNext(),
 *   onSwipeRight: () => goToPrev(),
 * });
 *
 * <div
 *   {...swipeProps}
 *   style={{ transform: `translateX(${offset.x}px)` }}
 * >
 *   Swipeable content
 * </div>
 * ```
 */
export function useSwipe(options: UseSwipeOptions = {}): UseSwipeReturn {
  const {
    threshold = DEFAULT_THRESHOLD,
    timeout = DEFAULT_TIMEOUT,
    velocityThreshold = DEFAULT_VELOCITY_THRESHOLD,
    axis = 'both',
    onSwipe,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onSwiping,
    onSwipeStart,
    onSwipeEnd,
    disabled = false,
    preventScroll = false,
  } = options;

  const [direction, setDirection] = useState<SwipeDirection>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);
  const [velocity, setVelocity] = useState(0);

  // Refs for tracking
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const startTimeRef = useRef<number>(0);
  const isMouseDownRef = useRef(false);

  // Reset state
  const reset = useCallback(() => {
    setDirection(null);
    setOffset({ x: 0, y: 0 });
    setIsSwiping(false);
    setVelocity(0);
    startPosRef.current = null;
    startTimeRef.current = 0;
    isMouseDownRef.current = false;
  }, []);

  // Calculate swipe direction from offset
  const getDirection = useCallback(
    (dx: number, dy: number): SwipeDirection => {
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Not enough movement
      if (absDx < 10 && absDy < 10) return null;

      // Determine primary axis
      if (axis === 'x' || (axis === 'both' && absDx > absDy)) {
        return dx > 0 ? 'right' : 'left';
      } else if (axis === 'y' || (axis === 'both' && absDy >= absDx)) {
        return dy > 0 ? 'down' : 'up';
      }

      return null;
    },
    [axis],
  );

  // Start swipe
  const handleStart = useCallback(
    (x: number, y: number) => {
      if (disabled) return;

      startPosRef.current = { x, y };
      startTimeRef.current = Date.now();
      setIsSwiping(true);
      setDirection(null);
      setOffset({ x: 0, y: 0 });
      onSwipeStart?.();
    },
    [disabled, onSwipeStart],
  );

  // During swipe
  const handleMove = useCallback(
    (x: number, y: number, event?: React.TouchEvent) => {
      if (!startPosRef.current || disabled) return;

      const dx = x - startPosRef.current.x;
      const dy = y - startPosRef.current.y;

      // Apply axis lock
      const effectiveOffset = {
        x: axis === 'y' ? 0 : dx,
        y: axis === 'x' ? 0 : dy,
      };

      const currentDirection = getDirection(dx, dy);

      // Prevent scroll if swiping in the allowed direction
      if (preventScroll && event && currentDirection) {
        const isHorizontal =
          currentDirection === 'left' || currentDirection === 'right';
        const isVertical =
          currentDirection === 'up' || currentDirection === 'down';

        if (
          (axis === 'x' && isHorizontal) ||
          (axis === 'y' && isVertical) ||
          axis === 'both'
        ) {
          event.preventDefault();
        }
      }

      setOffset(effectiveOffset);
      setDirection(currentDirection);
      onSwiping?.(effectiveOffset, currentDirection);
    },
    [disabled, axis, getDirection, onSwiping, preventScroll],
  );

  // End swipe
  const handleEnd = useCallback(() => {
    if (!startPosRef.current || disabled) {
      reset();
      return;
    }

    const elapsed = Date.now() - startTimeRef.current;
    const dx = offset.x;
    const dy = offset.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const currentVelocity = distance / elapsed;

    setVelocity(currentVelocity);

    const finalDirection = getDirection(dx, dy);

    // Check if swipe is valid (meets threshold or velocity)
    const isValidSwipe =
      elapsed <= timeout &&
      (distance >= threshold || currentVelocity >= velocityThreshold);

    if (isValidSwipe && finalDirection) {
      // Trigger callbacks
      onSwipe?.(finalDirection, currentVelocity);

      switch (finalDirection) {
        case 'left':
          onSwipeLeft?.(currentVelocity);
          break;
        case 'right':
          onSwipeRight?.(currentVelocity);
          break;
        case 'up':
          onSwipeUp?.(currentVelocity);
          break;
        case 'down':
          onSwipeDown?.(currentVelocity);
          break;
      }
    }

    onSwipeEnd?.();
    reset();
  }, [
    disabled,
    offset,
    threshold,
    timeout,
    velocityThreshold,
    getDirection,
    onSwipe,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onSwipeEnd,
    reset,
  ]);

  // Touch handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    },
    [handleStart],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY, e);
    },
    [handleMove],
  );

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Mouse handlers (for desktop testing)
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isMouseDownRef.current = true;
      handleStart(e.clientX, e.clientY);
    },
    [handleStart],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMouseDownRef.current) {
        handleMove(e.clientX, e.clientY);
      }
    },
    [handleMove],
  );

  const handleMouseUp = useCallback(() => {
    if (isMouseDownRef.current) {
      isMouseDownRef.current = false;
      handleEnd();
    }
  }, [handleEnd]);

  const handleMouseLeave = useCallback(() => {
    if (isMouseDownRef.current) {
      isMouseDownRef.current = false;
      handleEnd();
    }
  }, [handleEnd]);

  return {
    direction,
    offset,
    isSwiping,
    velocity,
    swipeProps: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    },
    reset,
  };
}
