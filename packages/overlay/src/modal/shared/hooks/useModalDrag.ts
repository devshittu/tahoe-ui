'use client';

import { useCallback, useMemo } from 'react';
import { PanInfo, useDragControls } from 'framer-motion';
import { useDragResistance } from '../useDragResistance';
import { useSquashStretch } from '../useSquashStretch';
import {
  Position,
  DragResistanceConfig,
  SquashStretchConfig,
  LoadingStateConfig,
  DEFAULT_SQUASH_STRETCH,
  DEFAULT_LOADING_STATE,
} from '../types';

export type UseModalDragOptions = {
  position: Position;
  closeDirection: Position;
  closeThreshold: number;
  resistance?: DragResistanceConfig;
  squashStretch?: SquashStretchConfig;
  loadingState?: LoadingStateConfig;
  onClose: () => void;
};

export type UseModalDragReturn = {
  dragState: {
    isBeyondLimit: boolean;
    shouldClose: boolean;
    resistanceIntensity: number;
    closeProgress: number;
    dragDirection: 'towards-close' | 'away' | 'none';
  };
  squashState: {
    scaleX: number;
    scaleY: number;
  };
  handleDragStart: () => void;
  handleDrag: (
    event: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => void;
  handleDragEnd: (
    event: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => void;
  handlePointerDown: (
    e: React.PointerEvent,
    containerRef: React.RefObject<HTMLElement | null>,
    dragControls: ReturnType<typeof useDragControls>,
  ) => void;
  squashTransition: {
    type: 'spring';
    damping: number;
    stiffness: number;
    mass: number;
    duration: number;
  };
  isInteractionLocked: boolean;
};

/**
 * Unified hook for modal drag interactions
 */
export function useModalDrag({
  position,
  closeDirection,
  closeThreshold,
  resistance,
  squashStretch,
  loadingState,
  onClose,
}: UseModalDragOptions): UseModalDragReturn {
  const squashConfig = { ...DEFAULT_SQUASH_STRETCH, ...squashStretch };
  const loadingConfig = { ...DEFAULT_LOADING_STATE, ...loadingState };

  const isInteractionLocked = useMemo(
    () => loadingConfig.isLoading && loadingConfig.lockInteraction,
    [loadingConfig.isLoading, loadingConfig.lockInteraction],
  );

  const {
    dragState,
    handleDrag: handleDragResistance,
    handleDragEnd: handleDragResistanceEnd,
  } = useDragResistance({
    position,
    closeDirection,
    closeThreshold,
    resistance,
    onClose,
  });

  const {
    squashState,
    handleDragStart: handleSquashStart,
    handleDrag: handleSquashDrag,
    handleDragEnd: handleSquashEnd,
    squashTransition,
  } = useSquashStretch({
    position,
    config: squashConfig,
  });

  const handleDragStart = useCallback(() => {
    if (isInteractionLocked) return;
    handleSquashStart();
  }, [isInteractionLocked, handleSquashStart]);

  const handleDrag = useCallback(
    (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      if (isInteractionLocked) return;
      handleDragResistance(event, info);
      handleSquashDrag(event, info);
    },
    [isInteractionLocked, handleDragResistance, handleSquashDrag],
  );

  const handleDragEnd = useCallback(
    (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      if (isInteractionLocked) return;
      handleDragResistanceEnd(event, info);
      handleSquashEnd();
    },
    [isInteractionLocked, handleDragResistanceEnd, handleSquashEnd],
  );

  const handlePointerDown = useCallback(
    (
      e: React.PointerEvent,
      containerRef: React.RefObject<HTMLElement | null>,
      dragControls: ReturnType<typeof useDragControls>,
    ) => {
      if (isInteractionLocked) {
        if (containerRef.current) {
          containerRef.current.classList.add('animate-shake');
          setTimeout(() => {
            containerRef.current?.classList.remove('animate-shake');
          }, 500);
        }
        return;
      }

      e.preventDefault();
      dragControls.start(e);
    },
    [isInteractionLocked],
  );

  return {
    dragState,
    squashState,
    handleDragStart,
    handleDrag,
    handleDragEnd,
    handlePointerDown,
    squashTransition,
    isInteractionLocked,
  };
}
