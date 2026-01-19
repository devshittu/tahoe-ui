'use client';

import { useState, useCallback } from 'react';
import { PanInfo } from 'framer-motion';
import { Position, SquashStretchConfig, DEFAULT_SQUASH_STRETCH } from './types';

type SquashStretchState = {
  scaleX: number;
  scaleY: number;
};

type UseSquashStretchOptions = {
  position: Position;
  config?: SquashStretchConfig;
};

/**
 * Hook for squash-and-stretch animation effect on drag
 */
export function useSquashStretch({
  position,
  config = {},
}: UseSquashStretchOptions) {
  const {
    enabled = DEFAULT_SQUASH_STRETCH.enabled,
    trigger = DEFAULT_SQUASH_STRETCH.trigger,
    intensity = DEFAULT_SQUASH_STRETCH.intensity,
    duration = DEFAULT_SQUASH_STRETCH.duration,
  } = config;

  const [squashState, setSquashState] = useState<SquashStretchState>({
    scaleX: 1,
    scaleY: 1,
  });

  const getSquashValues = useCallback(
    (offset: { x: number; y: number }): SquashStretchState => {
      if (!enabled) return { scaleX: 1, scaleY: 1 };

      const { x, y } = offset;
      const compressionAmount = 1 - intensity;

      switch (position) {
        case 'top':
          return y < 0
            ? { scaleX: 1, scaleY: compressionAmount }
            : { scaleX: 1, scaleY: 1 };

        case 'bottom':
          return y > 0
            ? { scaleX: 1, scaleY: compressionAmount }
            : { scaleX: 1, scaleY: 1 };

        case 'left':
          return x < 0
            ? { scaleX: compressionAmount, scaleY: 1 }
            : { scaleX: 1, scaleY: 1 };

        case 'right':
          return x > 0
            ? { scaleX: compressionAmount, scaleY: 1 }
            : { scaleX: 1, scaleY: 1 };
      }
    },
    [enabled, intensity, position],
  );

  const handleDragStart = useCallback(() => {
    if (!enabled || (trigger !== 'start' && trigger !== 'both')) return;

    const compressionAmount = 1 - intensity * 0.5;
    const isVertical = position === 'top' || position === 'bottom';

    setSquashState({
      scaleX: isVertical ? 1 : compressionAmount,
      scaleY: isVertical ? compressionAmount : 1,
    });
  }, [enabled, trigger, intensity, position]);

  const handleDrag = useCallback(
    (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      if (!enabled || (trigger !== 'during' && trigger !== 'both')) return;

      const squashValues = getSquashValues(info.offset);
      setSquashState(squashValues);
    },
    [enabled, trigger, getSquashValues],
  );

  const handleDragEnd = useCallback(() => {
    if (!enabled) return;

    setSquashState({ scaleX: 1, scaleY: 1 });
  }, [enabled]);

  const getTransition = () => ({
    type: 'spring' as const,
    damping: 20,
    stiffness: 400,
    mass: 0.5,
    duration: duration / 1000,
  });

  return {
    squashState,
    handleDragStart,
    handleDrag,
    handleDragEnd,
    squashTransition: getTransition(),
  };
}
