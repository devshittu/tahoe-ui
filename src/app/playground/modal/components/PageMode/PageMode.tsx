// src/app/playground/modal/components/PageMode/PageMode.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { Dialog as HeadlessDialog, DialogPanel } from '@headlessui/react';
import { useDragControls } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Portal } from '@/HOC/Portal';
import SafeMotionDiv from '@/components/Motion/SafeMotionDiv';
import { trackPageModeEvent } from '@/components/analytics/analytics';
import { SPACING_TOKENS } from '@/config/tokens';

// Store
import { usePageMode, useModals } from '../stores/useModalStore';

// Shared hooks
import { useModalDrag, useModalA11y, useReducedMotion } from '../shared/hooks';

// Shared components
import { ModalBackdrop, CloseIndicator } from '../shared/components';
import { HandlebarZone } from '../shared/HandlebarZone';

// Shared utilities
import {
  createSlideVariants,
  getDragAxis,
  getDragConstraints,
  getRoundedClasses,
} from '../shared/animations';
import {
  DEFAULT_BACKDROP_EFFECTS,
  DEFAULT_LOADING_STATE,
} from '../shared/types';
import type {
  Position,
  A11yOptions,
  DragResistanceConfig,
  BackdropEffectsConfig,
  SquashStretchConfig,
  LoadingStateConfig,
} from '../shared/types';

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
 *
 * Features:
 * - HeadlessUI foundation for accessibility
 * - Global state integration via Zustand store
 * - Enhanced drag physics with resistance
 * - Squash-and-stretch animation
 * - Backdrop blur and scale effects
 * - Loading state with shimmer
 * - Focus trapping and screen reader support
 * - Reduced motion support
 */
export function PageMode({
  position: defaultPosition = 'bottom',
  a11yOptions = {},
  useContainer = false,
  roundedEdges = false,
  themeable = false,
  closeThreshold = 0.5,
  enhancedCloseBox = true,
  enableContentScroll = true,
  zIndex: propZIndex,
  resistance,
  backdropEffects,
  squashStretch,
  loadingState,
  size: defaultSize = 'large',
}: PageModeProps) {
  // Global state from Zustand store
  const {
    isOpen,
    isClosing,
    content,
    close,
    position: storePosition,
    size: storeSize,
    isLoading: storeIsLoading,
    loadingMessage: storeLoadingMessage,
  } = usePageMode();

  // Get modal instance from store for z-index
  const { getPageMode } = useModals();
  const modalInstance = getPageMode();
  const zIndex =
    modalInstance?.zIndex || propZIndex || SPACING_TOKENS.zIndex.modal;

  // Use store values if available, otherwise use defaults
  const position = storePosition || defaultPosition;
  const size = storeSize || defaultSize;

  // Merge configs with defaults
  const backdropConfig = { ...DEFAULT_BACKDROP_EFFECTS, ...backdropEffects };
  const loadingConfig = {
    ...DEFAULT_LOADING_STATE,
    ...loadingState,
    isLoading: storeIsLoading || loadingState?.isLoading || false,
    message: storeLoadingMessage || loadingState?.message,
  };

  // Motion preferences
  const { prefersReducedMotion } = useReducedMotion();

  // Drag controls
  const dragControls = useDragControls();

  // Combined accessibility hook
  const { containerRef, ariaProps, a11y } = useModalA11y({
    prefix: 'pagemode',
    isOpen,
    a11yOptions,
    isLoading: loadingConfig.isLoading,
    loadingMessage: loadingConfig.message,
  });

  // Combined drag hook
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
    closeThreshold,
    resistance,
    squashStretch,
    loadingState: loadingConfig,
    onClose: close,
  });

  // Analytics tracking
  const hasTrackedOpen = useRef(false);
  useEffect(() => {
    if (isOpen && !hasTrackedOpen.current) {
      trackPageModeEvent('PageModeOpened');
      hasTrackedOpen.current = true;
    }
    if (!isOpen) {
      hasTrackedOpen.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isClosing) {
      trackPageModeEvent('PageModeClosed');
    }
  }, [isClosing]);

  // Derived values
  const dragAxis = getDragAxis(position);
  const dragConstraints = getDragConstraints(position);
  const variants = createSlideVariants(position, prefersReducedMotion);

  // Close handler
  const handleClose = () => {
    if (isInteractionLocked) return;
    close();
  };

  // Can close while loading?
  const canClose =
    !isInteractionLocked && a11y.closeOnOutsideClick && a11y.escapeClose;

  // PageMode handlebar is on OPPOSITE side
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

  // Styling
  const roundClass = getRoundedClasses(position, roundedEdges);
  const themeClass = themeable
    ? 'dark:bg-gray-800 dark:text-gray-100 bg-white text-gray-900'
    : 'bg-white text-gray-900';

  const containerClasses = twMerge(
    'fixed flex flex-col will-change-transform shadow-xl',
    roundClass,
    themeClass,
  );

  // Size-based dimensions
  const sizeStyles = getSizeStyles(position, size);

  // Content scroll behavior
  const contentOverflow = enableContentScroll
    ? position === 'top' || position === 'bottom'
      ? 'overflow-y-auto'
      : 'overflow-x-auto'
    : 'overflow-hidden';

  // Margin to avoid handlebar overlap (token-based: 52px)
  const getMarginClass = () => {
    switch (position) {
      case 'top':
        return 'mb-14'; // 56px for handlebar zone
      case 'bottom':
        return 'mt-14';
      case 'left':
        return 'mr-14';
      case 'right':
        return 'ml-14';
    }
  };

  // Content wrapper
  const renderedContent = useContainer ? (
    <div className="container mx-auto h-full">{content}</div>
  ) : (
    content
  );

  return (
    <Portal>
      <HeadlessDialog
        open={isOpen}
        onClose={canClose ? handleClose : () => {}}
        className="relative"
        style={{ zIndex }}
        {...ariaProps}
      >
        {/* Backdrop */}
        <ModalBackdrop
          backdropConfig={backdropConfig}
          zIndex={zIndex - 1}
          onClose={handleClose}
          canClose={!isInteractionLocked && a11y.closeOnOutsideClick}
        />

        {/* Close indicator */}
        {enhancedCloseBox && (
          <CloseIndicator
            isVisible={dragState.shouldClose && !loadingConfig.isLoading}
            zIndex={zIndex + 1}
          />
        )}

        {/* PageMode Panel */}
        <DialogPanel
          as={SafeMotionDiv}
          ref={containerRef}
          className={containerClasses}
          style={{
            ...sizeStyles,
            scaleX: squashState.scaleX,
            scaleY: squashState.scaleY,
            zIndex,
          }}
          custom={position}
          variants={variants}
          initial="hidden"
          animate={isClosing ? 'exit' : 'visible'}
          exit="exit"
          drag={dragAxis}
          dragControls={dragControls}
          dragListener={false}
          dragElastic={0.08}
          dragConstraints={dragConstraints}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {/* Handlebar - on opposite side */}
          <HandlebarZone
            position={getHandlebarPosition(position)}
            onPointerDown={(e) =>
              handlePointerDown(e, containerRef, dragControls)
            }
            onClick={handleClose}
            isBeyondLimit={dragState.isBeyondLimit}
            resistanceIntensity={dragState.resistanceIntensity}
            ariaLabel={a11y.handlebarAriaLabel}
            loadingState={loadingConfig}
          />

          {/* Content */}
          <div
            className={twMerge('flex-1 p-4', contentOverflow, getMarginClass())}
          >
            {renderedContent}
          </div>
        </DialogPanel>
      </HeadlessDialog>
    </Portal>
  );
}

/**
 * Get size-based styles for PageMode dimensions
 * Uses token-based size values
 */
function getSizeStyles(
  position: Position,
  size: PageModeProps['size'],
): React.CSSProperties {
  const isHorizontal = position === 'left' || position === 'right';
  const { modalSize } = SPACING_TOKENS;

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
