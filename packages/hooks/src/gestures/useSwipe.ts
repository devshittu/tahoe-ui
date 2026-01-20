'use client';

import { useCallback, useRef, useState } from 'react';

export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | null;

export interface UseSwipeOptions {
  threshold?: number;
  timeout?: number;
  velocityThreshold?: number;
  axis?: 'x' | 'y' | 'both';
  onSwipe?: (direction: SwipeDirection, velocity: number) => void;
  onSwipeLeft?: (velocity: number) => void;
  onSwipeRight?: (velocity: number) => void;
  onSwipeUp?: (velocity: number) => void;
  onSwipeDown?: (velocity: number) => void;
  onSwiping?: (
    offset: { x: number; y: number },
    direction: SwipeDirection,
  ) => void;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
  disabled?: boolean;
  preventScroll?: boolean;
}

export interface UseSwipeReturn {
  direction: SwipeDirection;
  offset: { x: number; y: number };
  isSwiping: boolean;
  velocity: number;
  swipeProps: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onMouseLeave: (e: React.MouseEvent) => void;
  };
  reset: () => void;
}

const DEFAULT_THRESHOLD = 50;
const DEFAULT_TIMEOUT = 300;
const DEFAULT_VELOCITY_THRESHOLD = 0.3;

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

  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const startTimeRef = useRef<number>(0);
  const isMouseDownRef = useRef(false);

  const reset = useCallback(() => {
    setDirection(null);
    setOffset({ x: 0, y: 0 });
    setIsSwiping(false);
    setVelocity(0);
    startPosRef.current = null;
    startTimeRef.current = 0;
    isMouseDownRef.current = false;
  }, []);

  const getDirection = useCallback(
    (dx: number, dy: number): SwipeDirection => {
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx < 10 && absDy < 10) return null;

      if (axis === 'x' || (axis === 'both' && absDx > absDy)) {
        return dx > 0 ? 'right' : 'left';
      } else if (axis === 'y' || (axis === 'both' && absDy >= absDx)) {
        return dy > 0 ? 'down' : 'up';
      }

      return null;
    },
    [axis],
  );

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

  const handleMove = useCallback(
    (x: number, y: number, event?: React.TouchEvent) => {
      if (!startPosRef.current || disabled) return;

      const dx = x - startPosRef.current.x;
      const dy = y - startPosRef.current.y;

      const effectiveOffset = {
        x: axis === 'y' ? 0 : dx,
        y: axis === 'x' ? 0 : dy,
      };

      const currentDirection = getDirection(dx, dy);

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

    const isValidSwipe =
      elapsed <= timeout &&
      (distance >= threshold || currentVelocity >= velocityThreshold);

    if (isValidSwipe && finalDirection) {
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
