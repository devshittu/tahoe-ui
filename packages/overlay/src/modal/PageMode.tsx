'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';
import { useDragControls } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Portal } from '../utils/Portal';
import SafeMotionDiv from '../utils/SafeMotionDiv';

import { usePageMode, useModals } from './stores/useModalStore';
import { useModalDrag, useModalA11y, useReducedMotion } from './shared/hooks';
import { ModalBackdrop } from './shared/components';
import { HandlebarZone } from './shared/HandlebarZone';
import {
  createSlideVariants,
  getDragAxis,
  getDragConstraints,
  getRoundedClasses,
} from './shared/animations';
import {
  DEFAULT_BACKDROP_EFFECTS,
  DEFAULT_LOADING_STATE,
  SPACING_DEFAULTS,
} from './shared/types';
import type {
  Position,
  A11yOptions,
  DragResistanceConfig,
  BackdropEffectsConfig,
  SquashStretchConfig,
  LoadingStateConfig,
} from './shared/types';

export type PageModeProps = {
  position?: Position;
  a11yOptions?: A11yOptions;
  useContainer?: boolean;
  roundedEdges?: boolean;
  themeable?: boolean;
  closeThreshold?: number;
  enhancedCloseBox?: boolean;
  enableContentScroll?: boolean;
  zIndex?: number;
  resistance?: DragResistanceConfig;
  backdropEffects?: BackdropEffectsConfig;
  squashStretch?: SquashStretchConfig;
  loadingState?: LoadingStateConfig;
  size?: 'small' | 'medium' | 'large' | 'full';
};

/**
 * PageMode Component - Full-screen overlay panel with Zustand state
 */
export function PageMode({
  position: defaultPosition = 'bottom',
  a11yOptions = {},
  useContainer = false,
  roundedEdges = false,
  themeable = false,
  closeThreshold = 0.15,
  enhancedCloseBox = true,
  enableContentScroll = true,
  zIndex: propZIndex,
  resistance,
  backdropEffects,
  squashStretch,
  loadingState,
  size: defaultSize = 'large',
}: PageModeProps) {
  const {
    isOpen,
    isClosing,
    content,
    close,
    completeClose,
    id: modalId,
    position: storePosition,
    size: storeSize,
    isLoading: storeIsLoading,
    loadingMessage: storeLoadingMessage,
  } = usePageMode();

  const { getPageMode } = useModals();
  const modalInstance = getPageMode();
  const zIndex =
    modalInstance?.zIndex || propZIndex || SPACING_DEFAULTS.zIndex.modal;

  const position = storePosition || defaultPosition;
  const size = storeSize || defaultSize;

  const backdropConfig = { ...DEFAULT_BACKDROP_EFFECTS, ...backdropEffects };
  const loadingConfig = {
    ...DEFAULT_LOADING_STATE,
    ...loadingState,
    isLoading: storeIsLoading || loadingState?.isLoading || false,
    message: storeLoadingMessage || loadingState?.message,
  };

  const { prefersReducedMotion } = useReducedMotion();
  const dragControls = useDragControls();

  const { containerRef, ariaProps, a11y } = useModalA11y({
    prefix: 'pagemode',
    isOpen,
    a11yOptions,
    isLoading: loadingConfig.isLoading,
    loadingMessage: loadingConfig.message,
  });

  const {
    dragState,
    squashState,
    handleDragStart,
    handleDrag,
    handleDragEnd,
    handlePointerDown,
    isInteractionLocked,
  } = useModalDrag({
    position,
    closeDirection: position,
    closeThreshold,
    resistance,
    squashStretch,
    loadingState: loadingConfig,
    onClose: close,
  });

  const closeProgress = dragState.closeProgress;
  const closeFeedbackScale = 1 - closeProgress * 0.03;
  const closeFeedbackOpacity = 1 - closeProgress * 0.25;

  const handleAfterLeave = useCallback(() => {
    completeClose();
  }, [completeClose]);

  const variants = createSlideVariants(position, prefersReducedMotion);
  const dragAxis = getDragAxis(position);
  const dragConstraints = getDragConstraints(position);

  const handleClose = () => {
    if (isInteractionLocked) return;
    close();
  };

  const canClose =
    !isInteractionLocked && a11y.closeOnOutsideClick && a11y.escapeClose;

  const getHandlebarPosition = (pageModePosition: Position): Position => {
    switch (pageModePosition) {
      case 'top':
        return 'bottom';
      case 'bottom':
        return 'top';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
    }
  };

  const roundClass = getRoundedClasses(position, roundedEdges);
  const themeClass = themeable
    ? 'dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-900'
    : 'bg-white text-gray-900';

  const edgeStyles = getEdgeSurfaceStyles(position);

  const containerClasses = twMerge(
    'fixed flex flex-col will-change-transform',
    roundClass,
    themeClass,
    'shadow-[0_8px_16px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)]',
    'dark:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]',
    edgeStyles.borderClass,
  );

  const sizeStyles = getSizeStyles(position, size);

  const contentOverflow = enableContentScroll
    ? position === 'top' || position === 'bottom'
      ? 'overflow-y-auto'
      : 'overflow-x-auto'
    : 'overflow-hidden';

  const getMarginClass = () => {
    switch (position) {
      case 'top':
        return 'mb-14';
      case 'bottom':
        return 'mt-14';
      case 'left':
        return 'mr-14';
      case 'right':
        return 'ml-14';
    }
  };

  const renderedContent = useContainer ? (
    <div className="container mx-auto h-full">{content}</div>
  ) : (
    content
  );

  const dialogOpen = isOpen && !isClosing;

  return (
    <Portal>
      <HeadlessDialog
        open={dialogOpen}
        onClose={canClose ? handleClose : () => {}}
        className="relative"
        style={{ zIndex }}
        {...ariaProps}
      >
        <ModalBackdrop
          backdropConfig={backdropConfig}
          zIndex={zIndex - 1}
          onClose={handleClose}
          canClose={!isInteractionLocked && a11y.closeOnOutsideClick}
        />

        <TransitionChild
          afterLeave={handleAfterLeave}
          enter={prefersReducedMotion ? 'duration-0' : 'ease-out duration-350'}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={prefersReducedMotion ? 'duration-0' : 'ease-in duration-250'}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPanel
            as={SafeMotionDiv as any}
            ref={containerRef}
            className={containerClasses}
            custom={position}
            variants={variants}
            initial="hidden"
            animate={isClosing ? 'exit' : 'visible'}
            exit="exit"
            style={{
              ...sizeStyles,
              scaleX: squashState.scaleX * closeFeedbackScale,
              scaleY: squashState.scaleY * closeFeedbackScale,
              opacity: closeFeedbackOpacity,
              zIndex,
            }}
            drag={dragAxis}
            dragControls={dragControls}
            dragListener={false}
            dragElastic={0.08}
            dragConstraints={dragConstraints}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <HandlebarZone
              position={getHandlebarPosition(position)}
              onPointerDown={(e) =>
                handlePointerDown(e, containerRef, dragControls)
              }
              onClick={handleClose}
              isBeyondLimit={dragState.isBeyondLimit}
              resistanceIntensity={dragState.resistanceIntensity}
              closeProgress={closeProgress}
              ariaLabel={a11y.handlebarAriaLabel}
              loadingState={loadingConfig}
            />

            <div
              className={twMerge(
                'flex-1 p-4',
                contentOverflow,
                getMarginClass(),
              )}
            >
              {renderedContent}
            </div>
          </DialogPanel>
        </TransitionChild>
      </HeadlessDialog>
    </Portal>
  );
}

function getEdgeSurfaceStyles(position: Position): {
  borderClass: string;
} {
  switch (position) {
    case 'top':
      return {
        borderClass: 'border-b border-gray-200/60 dark:border-gray-700/60',
      };
    case 'bottom':
      return {
        borderClass: 'border-t border-gray-200/60 dark:border-gray-700/60',
      };
    case 'left':
      return {
        borderClass: 'border-r border-gray-200/60 dark:border-gray-700/60',
      };
    case 'right':
      return {
        borderClass: 'border-l border-gray-200/60 dark:border-gray-700/60',
      };
  }
}

function getSizeStyles(
  position: Position,
  size: PageModeProps['size'],
): React.CSSProperties {
  const isHorizontal = position === 'left' || position === 'right';
  const { modalSize } = SPACING_DEFAULTS;

  const sizeMap = {
    small: isHorizontal ? `${modalSize.small}vw` : `${modalSize.small}vh`,
    medium: isHorizontal ? `${modalSize.medium}vw` : `${modalSize.medium}vh`,
    large: isHorizontal ? `${modalSize.large}vw` : `${modalSize.large}vh`,
    full: isHorizontal ? `${modalSize.full}vw` : `${modalSize.full}vh`,
  };

  const dimension = sizeMap[size || 'large'];

  const baseStyles: React.CSSProperties = {
    position: 'fixed' as const,
  };

  switch (position) {
    case 'top':
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        width: '100%',
        height: dimension,
      };
    case 'bottom':
      return {
        ...baseStyles,
        bottom: 0,
        left: 0,
        width: '100%',
        height: dimension,
      };
    case 'left':
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        width: dimension,
        height: '100%',
      };
    case 'right':
      return {
        ...baseStyles,
        top: 0,
        right: 0,
        width: dimension,
        height: '100%',
      };
  }
}
