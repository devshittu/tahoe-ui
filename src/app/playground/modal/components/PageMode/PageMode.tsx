'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useDragControls } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Portal } from '@/HOC/Portal';
import SafeMotionDiv from '@/components/Motion/SafeMotionDiv';
import { trackPageModeEvent } from '@/components/analytics/analytics';
import { t } from '@/app/i18n';
import { usePageMode, useModals } from '../stores/useModalStore';
import { HandlebarZone } from '../shared/HandlebarZone';
import { useDragResistance } from '../shared/useDragResistance';
import { useSquashStretch } from '../shared/useSquashStretch';
import {
  generateUniqueId,
  useFocusTrap,
  useScreenReaderAnnouncement,
} from '../shared/a11yUtils';
import {
  createSlideVariants,
  getDragAxis,
  getDragConstraints,
  getRoundedClasses,
} from '../shared/animations';
import {
  DEFAULT_A11Y_OPTIONS,
  DEFAULT_BACKDROP_EFFECTS,
  DEFAULT_SQUASH_STRETCH,
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
  zIndex?: number; // For stacking control
  resistance?: DragResistanceConfig;
  backdropEffects?: BackdropEffectsConfig;
  squashStretch?: SquashStretchConfig;
  loadingState?: LoadingStateConfig;
  size?: 'small' | 'medium' | 'large' | 'full';
};

/**
 * PageMode Component - Enhanced with accessibility and motion features
 *
 * Features:
 * - HeadlessUI foundation for accessibility
 * - Global state integration via useUIComponent
 * - Enhanced drag physics with resistance
 * - Squash-and-stretch animation
 * - Backdrop blur and scale effects
 * - Loading state with shimmer
 * - Focus trapping and screen reader support
 * - Auto-generated unique IDs
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
  zIndex: propZIndex, // Accept from props but use store value if available
  resistance,
  backdropEffects,
  squashStretch,
  loadingState,
  size: defaultSize = 'large',
}: PageModeProps) {
  // Merge with default accessibility options
  const a11y = { ...DEFAULT_A11Y_OPTIONS, ...a11yOptions };
  const {
    escapeClose = true,
    role = 'dialog',
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    handlebarAriaLabel,
    lockScroll = false,
    closeOnOutsideClick = true,
    generateUniqueIds = true,
    enableFocusTrap = true,
    announceToScreenReader = true,
  } = a11y;

  // Merge with default configs
  const backdropConfig = { ...DEFAULT_BACKDROP_EFFECTS, ...backdropEffects };
  const squashConfig = { ...DEFAULT_SQUASH_STRETCH, ...squashStretch };

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
  const zIndex = modalInstance?.zIndex || propZIndex || 9999;

  // Use store values if available, otherwise use defaults
  const position = storePosition || defaultPosition;
  const size = storeSize || defaultSize;

  // Merge loading state from store and props
  const mergedLoadingConfig = {
    ...DEFAULT_LOADING_STATE,
    ...loadingState,
    isLoading: storeIsLoading || loadingState?.isLoading || false,
    message: storeLoadingMessage || loadingState?.message,
  };

  const loadingConfig = mergedLoadingConfig;

  // Generate unique IDs
  const pageModeId = useMemo(
    () => (generateUniqueIds ? generateUniqueId('pagemode') : undefined),
    [generateUniqueIds],
  );
  const titleId = useMemo(
    () => (generateUniqueIds ? `${pageModeId}-title` : ariaLabelledby),
    [generateUniqueIds, pageModeId, ariaLabelledby],
  );
  const descId = useMemo(
    () => (generateUniqueIds ? `${pageModeId}-desc` : ariaDescribedby),
    [generateUniqueIds, pageModeId, ariaDescribedby],
  );

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Hooks
  const announce = useScreenReaderAnnouncement();
  useFocusTrap(isOpen, enableFocusTrap, containerRef);

  const dragAxis = getDragAxis(position);
  const dragConstraints = getDragConstraints(position);

  // Enhanced drag resistance
  const {
    dragState,
    handleDrag: handleDragResistance,
    handleDragEnd: handleDragResistanceEnd,
  } = useDragResistance({
    position,
    closeThreshold,
    resistance,
    onClose: close,
  });

  // Squash-and-stretch effect
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

  // Combined drag handlers
  const handleDragStart = () => {
    if (loadingConfig.isLoading && loadingConfig.lockInteraction) return;
    handleSquashStart();
  };

  const handleDrag = (
    event: PointerEvent | MouseEvent | TouchEvent,
    info: any,
  ) => {
    if (loadingConfig.isLoading && loadingConfig.lockInteraction) return;
    handleDragResistance(event, info);
    handleSquashDrag(event, info);
  };

  const handleDragEnd = (
    event: PointerEvent | MouseEvent | TouchEvent,
    info: any,
  ) => {
    if (loadingConfig.isLoading && loadingConfig.lockInteraction) return;
    handleDragResistanceEnd(event, info);
    handleSquashEnd();
  };

  const handleClose = () => {
    if (loadingConfig.isLoading && loadingConfig.lockInteraction) return;
    close();
  };

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

  // Screen reader announcements
  useEffect(() => {
    if (!announceToScreenReader) return;

    if (isOpen) {
      announce('Page mode opened');
    } else if (!isOpen && containerRef.current) {
      announce('Page mode closed');
    }
  }, [isOpen, announce, announceToScreenReader]);

  useEffect(() => {
    if (!announceToScreenReader || !loadingConfig.isLoading) return;

    const message = loadingConfig.message || 'Loading';
    announce(message);
  }, [
    loadingConfig.isLoading,
    loadingConfig.message,
    announce,
    announceToScreenReader,
  ]);

  // Animation variants
  const variants = createSlideVariants(position);

  // Styling
  const roundClass = getRoundedClasses(position, roundedEdges);
  const themeClass = themeable
    ? 'dark:bg-gray-800 dark:text-gray-100 bg-white text-gray-900'
    : 'bg-white text-gray-900';

  // Size-based dimensions
  const sizeStyles = getSizeStyles(position, size);

  const containerClasses = twMerge(
    'fixed flex flex-col will-change-transform shadow-xl',
    roundClass,
    themeClass,
  );

  // Content scroll behavior
  const contentOverflow = enableContentScroll
    ? position === 'top' || position === 'bottom'
      ? 'overflow-y-auto'
      : 'overflow-hidden'
    : 'overflow-hidden';

  // Margin to avoid handlebar overlap
  const getMarginClass = () => {
    switch (position) {
      case 'top':
        return 'mb-[max(8vh,60px)]';
      case 'bottom':
        return 'mt-[max(8vh,60px)]';
      case 'left':
        return 'mr-[max(8vw,60px)]';
      case 'right':
        return 'ml-[max(8vw,60px)]';
    }
  };

  // Backdrop styles
  const backdropStyles: React.CSSProperties = {
    backdropFilter: backdropConfig.blur
      ? `blur(${backdropConfig.blurAmount})`
      : undefined,
  };

  // Gesture handlers
  const onHandlebarPointerDown = (e: React.PointerEvent) => {
    if (loadingConfig.isLoading && loadingConfig.lockInteraction) {
      // Shake animation for locked state
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
  };

  const handleHandlebarClick = () => handleClose();

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

  // Determine if escape/outside click should work during loading
  const canCloseWhileLoading = !(
    loadingConfig.isLoading && loadingConfig.lockInteraction
  );
  const shouldAllowClose =
    canCloseWhileLoading && closeOnOutsideClick && escapeClose;

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
        onClose={shouldAllowClose ? handleClose : () => {}}
        className="relative"
        style={{ zIndex }}
        id={pageModeId}
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        {/* Backdrop with blur */}
        <TransitionChild
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0"
            style={{
              backgroundColor: `rgba(0, 0, 0, ${backdropConfig.backgroundOpacity})`,
              ...backdropStyles,
            }}
            aria-hidden="true"
            {...(canCloseWhileLoading && closeOnOutsideClick
              ? { onClick: handleClose }
              : {})}
          />
        </TransitionChild>

        {/* Enhanced close indicator */}
        {enhancedCloseBox &&
          dragState.shouldClose &&
          !loadingConfig.isLoading && (
            <SafeMotionDiv
              className="fixed inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: zIndex + 1 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
              }}
              aria-live="assertive"
            >
              <div className="border-4 border-dashed border-blue-400 p-6 text-blue-600 dark:text-blue-400 bg-white/90 dark:bg-gray-700/90 rounded-lg shadow-lg">
                {t('releaseToClose')}
              </div>
            </SafeMotionDiv>
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
            onPointerDown={onHandlebarPointerDown}
            onClick={handleHandlebarClick}
            isBeyondLimit={dragState.isBeyondLimit}
            resistanceIntensity={dragState.resistanceIntensity}
            ariaLabel={handlebarAriaLabel}
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
 */
function getSizeStyles(
  position: Position,
  size: PageModeProps['size'],
): React.CSSProperties {
  const isHorizontal = position === 'left' || position === 'right';

  const sizeMap = {
    small: isHorizontal ? '50vw' : '50vh',
    medium: isHorizontal ? '65vw' : '65vh',
    large: isHorizontal ? '80vw' : '80vh',
    full: isHorizontal ? '100vw' : '100vh',
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

// src/app/playground/modal/components/PageMode/PageMode.tsx
