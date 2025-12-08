'use client';

import React, { useRef, useMemo, useEffect } from 'react';
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

export type DialogProps = {
  isOpen?: boolean;
  onClose?: () => void;
  showFrom?: Position;
  handlebarPosition?: Position;
  roundedEdges?: boolean;
  themeable?: boolean;
  a11yOptions?: A11yOptions;
  lockScroll?: boolean;
  closeOnOutsideClick?: boolean;
  closeThreshold?: number;
  enhancedCloseBox?: boolean;
  useContainer?: boolean;
  zIndex?: number; // For stacking control
  resistance?: DragResistanceConfig;
  backdropEffects?: BackdropEffectsConfig;
  squashStretch?: SquashStretchConfig;
  loadingState?: LoadingStateConfig;
  children: React.ReactNode;
};

/**
 * Dialog Component - Enhanced with accessibility and motion features
 *
 * Features:
 * - HeadlessUI foundation for accessibility
 * - Enhanced drag physics with resistance
 * - Squash-and-stretch animation
 * - Backdrop blur and scale effects
 * - Loading state with shimmer
 * - Focus trapping and screen reader support
 * - Auto-generated unique IDs
 */
export function Dialog({
  isOpen = false,
  onClose,
  showFrom = 'top',
  handlebarPosition = 'top',
  roundedEdges = false,
  themeable = false,
  a11yOptions = {},
  lockScroll = false,
  closeOnOutsideClick = true,
  closeThreshold = 0.5,
  enhancedCloseBox = false,
  useContainer = false,
  zIndex = 9998, // Default lower than store-based modals (9999)
  resistance,
  backdropEffects,
  squashStretch,
  loadingState,
  children,
}: DialogProps) {
  // Merge with default accessibility options
  const a11y = { ...DEFAULT_A11Y_OPTIONS, ...a11yOptions };
  const {
    escapeClose = true,
    role = 'dialog',
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    handlebarAriaLabel,
    scrollable = true,
    generateUniqueIds = true,
    enableFocusTrap = true,
    announceToScreenReader = true,
  } = a11y;

  // Merge with default configs
  const backdropConfig = { ...DEFAULT_BACKDROP_EFFECTS, ...backdropEffects };
  const squashConfig = { ...DEFAULT_SQUASH_STRETCH, ...squashStretch };
  const loadingConfig = { ...DEFAULT_LOADING_STATE, ...loadingState };

  // Generate unique IDs
  const dialogId = useMemo(
    () => (generateUniqueIds ? generateUniqueId('dialog') : undefined),
    [generateUniqueIds],
  );
  const titleId = useMemo(
    () => (generateUniqueIds ? `${dialogId}-title` : ariaLabelledby),
    [generateUniqueIds, dialogId, ariaLabelledby],
  );
  const descId = useMemo(
    () => (generateUniqueIds ? `${dialogId}-desc` : ariaDescribedby),
    [generateUniqueIds, dialogId, ariaDescribedby],
  );

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Hooks
  const announce = useScreenReaderAnnouncement();
  useFocusTrap(isOpen, enableFocusTrap, containerRef);

  const dragAxis = getDragAxis(handlebarPosition);
  const dragConstraints = getDragConstraints(handlebarPosition);

  // Enhanced drag resistance
  const {
    dragState,
    handleDrag: handleDragResistance,
    handleDragEnd: handleDragResistanceEnd,
  } = useDragResistance({
    position: handlebarPosition,
    closeThreshold,
    resistance,
    onClose: onClose || (() => {}),
  });

  // Squash-and-stretch effect
  const {
    squashState,
    handleDragStart: handleSquashStart,
    handleDrag: handleSquashDrag,
    handleDragEnd: handleSquashEnd,
    squashTransition,
  } = useSquashStretch({
    position: handlebarPosition,
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
    if (onClose) onClose();
  };

  // Screen reader announcements
  useEffect(() => {
    if (!announceToScreenReader) return;

    if (isOpen) {
      announce('Dialog opened');
    } else if (!isOpen && containerRef.current) {
      announce('Dialog closed');
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
  const variants = createSlideVariants(showFrom);

  // Styling
  const roundClass = getRoundedClasses(showFrom, roundedEdges);
  const themeClass = themeable
    ? 'dark:bg-gray-800 dark:text-gray-100 bg-white text-gray-900'
    : 'bg-white text-gray-900';
  const contentScrollClass = scrollable ? 'overflow-auto' : 'overflow-hidden';

  // Get padding based on handlebar position
  const getContentPadding = () => {
    switch (handlebarPosition) {
      case 'top':
        return `pt-[max(8vh,60px)] pb-4 px-4`;
      case 'bottom':
        return `pt-4 pb-[max(8vh,60px)] px-4`;
      case 'left':
        return `pl-[max(8vw,60px)] pr-4 py-4`;
      case 'right':
        return `pr-[max(8vw,60px)] pl-4 py-4`;
    }
  };

  const dialogClasses = twMerge(
    'relative w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg shadow-xl rounded-2xl max-h-[90vh] flex flex-col overflow-hidden',
    themeClass,
  );

  // Backdrop styles with blur and scale
  const backdropStyles: React.CSSProperties = {
    backdropFilter: backdropConfig.blur
      ? `blur(${backdropConfig.blurAmount})`
      : undefined,
  };

  const backdropContentStyles: React.CSSProperties = {
    transform: backdropConfig.scale
      ? `scale(${backdropConfig.scaleAmount})`
      : undefined,
    transition: 'transform 0.2s ease-out',
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

  // Determine if escape/outside click should work during loading
  const canCloseWhileLoading = !(
    loadingConfig.isLoading && loadingConfig.lockInteraction
  );
  const shouldAllowClose =
    canCloseWhileLoading && closeOnOutsideClick && escapeClose;

  // Content wrapper
  const finalChildren = useContainer ? (
    <div
      className={`container mx-auto flex-1 ${contentScrollClass} ${getContentPadding()}`}
    >
      {children}
    </div>
  ) : (
    <div className={`flex-1 ${contentScrollClass} ${getContentPadding()}`}>
      {children}
    </div>
  );

  return (
    <Portal id="dialog-portal">
      <HeadlessDialog
        open={isOpen}
        onClose={shouldAllowClose ? handleClose : () => {}}
        className="relative"
        style={{ zIndex: zIndex + 1 }}
        id={dialogId}
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        {/* Backdrop with blur and scale */}
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

        {/* Dialog container */}
        <div className="fixed inset-0 flex items-center justify-center px-4">
          <TransitionChild
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              as={SafeMotionDiv}
              ref={containerRef}
              className={dialogClasses}
              custom={showFrom}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              drag={dragAxis}
              dragControls={dragControls}
              dragListener={false}
              dragElastic={0.05}
              dragConstraints={dragConstraints}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              style={{
                touchAction: 'none',
                scaleX: squashState.scaleX,
                scaleY: squashState.scaleY,
              }}
            >
              {/* Handlebar */}
              <HandlebarZone
                position={handlebarPosition}
                onPointerDown={onHandlebarPointerDown}
                onClick={handleHandlebarClick}
                isBeyondLimit={dragState.isBeyondLimit}
                resistanceIntensity={dragState.resistanceIntensity}
                ariaLabel={handlebarAriaLabel}
                loadingState={loadingConfig}
              />

              {/* Enhanced close indicator */}
              {enhancedCloseBox &&
                dragState.shouldClose &&
                !loadingConfig.isLoading && (
                  <SafeMotionDiv
                    className="fixed inset-0 flex items-center justify-center pointer-events-none"
                    style={{ zIndex: zIndex + 2 }}
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
                      Release to close
                    </div>
                  </SafeMotionDiv>
                )}

              {/* Content */}
              {finalChildren}
            </DialogPanel>
          </TransitionChild>
        </div>
      </HeadlessDialog>
    </Portal>
  );
}

// src/app/playground/modal/components/Dialog/Dialog.tsx
