// src/app/playground/modal/components/shared/hooks/useModalDrag.ts
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

/**
 * Options for useModalDrag hook
 */
export type UseModalDragOptions = {
  /** Modal position (determines drag direction) */
  position: Position;
  /** Threshold (0-1) of viewport to trigger close */
  closeThreshold: number;
  /** Drag resistance configuration */
  resistance?: DragResistanceConfig;
  /** Squash-stretch effect configuration */
  squashStretch?: SquashStretchConfig;
  /** Loading state configuration */
  loadingState?: LoadingStateConfig;
  /** Callback when modal should close */
  onClose: () => void;
};

/**
 * Return type for useModalDrag hook
 */
export type UseModalDragReturn = {
  /** Combined drag state from resistance calculation */
  dragState: {
    isBeyondLimit: boolean;
    shouldClose: boolean;
    resistanceIntensity: number;
  };

  /** Squash-stretch scale state for style binding */
  squashState: {
    scaleX: number;
    scaleY: number;
  };

  /** Combined drag start handler */
  handleDragStart: () => void;

  /** Combined drag handler */
  handleDrag: (
    event: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => void;

  /** Combined drag end handler */
  handleDragEnd: (
    event: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => void;

  /**
   * Pointer down handler for handlebar
   * Includes shake animation when interaction is locked
   */
  handlePointerDown: (
    e: React.PointerEvent,
    containerRef: React.RefObject<HTMLElement | null>,
    dragControls: ReturnType<typeof useDragControls>,
  ) => void;

  /** Spring transition config for squash effect */
  squashTransition: {
    type: 'spring';
    damping: number;
    stiffness: number;
    mass: number;
    duration: number;
  };

  /** Whether interaction is locked (loading + lockInteraction) */
  isInteractionLocked: boolean;
};

/**
 * Unified hook for modal drag interactions
 *
 * Composes useDragResistance and useSquashStretch hooks with
 * loading state interaction locking and shake feedback.
 *
 * @example
 * ```tsx
 * const {
 *   dragState,
 *   squashState,
 *   handleDragStart,
 *   handleDrag,
 *   handleDragEnd,
 *   handlePointerDown,
 *   isInteractionLocked,
 * } = useModalDrag({
 *   position: 'bottom',
 *   closeThreshold: 0.5,
 *   onClose: () => close(),
 * });
 * ```
 */
export function useModalDrag({
  position,
  closeThreshold,
  resistance,
  squashStretch,
  loadingState,
  onClose,
}: UseModalDragOptions): UseModalDragReturn {
  // Merge with defaults
  const squashConfig = { ...DEFAULT_SQUASH_STRETCH, ...squashStretch };
  const loadingConfig = { ...DEFAULT_LOADING_STATE, ...loadingState };

  // Calculate if interaction is locked
  const isInteractionLocked = useMemo(
    () => loadingConfig.isLoading && loadingConfig.lockInteraction,
    [loadingConfig.isLoading, loadingConfig.lockInteraction],
  );

  // Initialize underlying hooks
  const {
    dragState,
    handleDrag: handleDragResistance,
    handleDragEnd: handleDragResistanceEnd,
  } = useDragResistance({
    position,
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

  /**
   * Combined drag start handler
   */
  const handleDragStart = useCallback(() => {
    if (isInteractionLocked) return;
    handleSquashStart();
  }, [isInteractionLocked, handleSquashStart]);

  /**
   * Combined drag handler
   */
  const handleDrag = useCallback(
    (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      if (isInteractionLocked) return;
      handleDragResistance(event, info);
      handleSquashDrag(event, info);
    },
    [isInteractionLocked, handleDragResistance, handleSquashDrag],
  );

  /**
   * Combined drag end handler
   */
  const handleDragEnd = useCallback(
    (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      if (isInteractionLocked) return;
      handleDragResistanceEnd(event, info);
      handleSquashEnd();
    },
    [isInteractionLocked, handleDragResistanceEnd, handleSquashEnd],
  );

  /**
   * Pointer down handler with shake animation for locked state
   */
  const handlePointerDown = useCallback(
    (
      e: React.PointerEvent,
      containerRef: React.RefObject<HTMLElement | null>,
      dragControls: ReturnType<typeof useDragControls>,
    ) => {
      if (isInteractionLocked) {
        // Apply shake animation to indicate locked state
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
