'use client';

import React, { useEffect, useRef } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { motion, useDragControls } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Portal } from '@/HOC/Portal';
import SafeMotionDiv from '@/components/Motion/SafeMotionDiv';
import { CardStack } from '@/components/background/CardStack';
import { trackPageModeEvent } from '@/components/analytics/analytics';
import { t } from '@/app/i18n';
import { useUIComponent } from '@/stores/useUIComponent';
import { HandlebarZone } from '../shared/HandlebarZone';
import { useDragResistance } from '../shared/useDragResistance';
import {
  createSlideVariants,
  getDragAxis,
  getDragConstraints,
  getRoundedClasses,
} from '../shared/animations';
import type {
  Position,
  A11yOptions,
  DragResistanceConfig,
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
  resistance?: DragResistanceConfig;
  size?: 'small' | 'medium' | 'large' | 'full'; // New: size variants
};

/**
 * PageMode Component - Refactored with HeadlessUI
 *
 * Features:
 * - HeadlessUI foundation for accessibility
 * - Global state integration via useUIComponent
 * - Enhanced drag physics with resistance
 * - Size variants for flexible layouts
 * - Smooth, natural animations
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
  resistance,
  size: defaultSize = 'large',
}: PageModeProps) {
  const {
    escapeClose = true,
    role = 'dialog',
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
    handlebarAriaLabel,
    lockScroll = false,
    closeOnOutsideClick = true,
  } = a11yOptions;

  // Global state with position and size from store
  const {
    isOpen,
    isClosing,
    content,
    close,
    position: storePosition,
    size: storeSize,
  } = useUIComponent();

  // Use store values if available, otherwise use defaults
  const position = storePosition || defaultPosition;
  const size = storeSize || defaultSize;

  // Drag controls
  const dragControls = useDragControls();
  const dragAxis = getDragAxis(position);
  const dragConstraints = getDragConstraints(position);

  // Enhanced drag resistance
  const { dragState, handleDrag, handleDragEnd } = useDragResistance({
    position,
    closeThreshold,
    resistance,
    onClose: close,
  });

  // Animation variants
  const variants = createSlideVariants(position);

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

  // Styling
  const roundClass = getRoundedClasses(position, roundedEdges);
  const themeClass = themeable
    ? 'dark:bg-gray-800 dark:text-gray-100 bg-white text-gray-900'
    : 'bg-white text-gray-900';

  // Size-based dimensions
  const sizeStyles = getSizeStyles(position, size);

  const containerClasses = twMerge(
    'fixed z-[9999] flex flex-col will-change-transform shadow-xl',
    roundClass,
    themeClass,
  );

  // Content scroll behavior
  const contentOverflow = enableContentScroll
    ? position === 'top' || position === 'bottom'
      ? 'overflow-y-auto'
      : 'overflow-hidden'
    : 'overflow-hidden';

  // Margin to avoid handlebar overlap - on opposite side from where PageMode appears
  const getMarginClass = () => {
    switch (position) {
      case 'top':
        return 'mb-[max(8vh,60px)]'; // Appears from top → handlebar at bottom
      case 'bottom':
        return 'mt-[max(8vh,60px)]'; // Appears from bottom → handlebar at top
      case 'left':
        return 'mr-[max(8vw,60px)]'; // Appears from left → handlebar at right
      case 'right':
        return 'ml-[max(8vw,60px)]'; // Appears from right → handlebar at left
    }
  };

  // Gesture handlers
  const onHandlebarPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragControls.start(e);
  };

  const handleHandlebarClick = () => close();

  // PageMode handlebar is on OPPOSITE side from where it appears
  // (top pagemode has handlebar at bottom, right pagemode has handlebar at left)
  const getHandlebarPosition = (pageModePosition: Position): Position => {
    switch (pageModePosition) {
      case 'top':
        return 'bottom'; // PageMode from top → handlebar at bottom
      case 'bottom':
        return 'top'; // PageMode from bottom → handlebar at top
      case 'left':
        return 'right'; // PageMode from left → handlebar at right
      case 'right':
        return 'left'; // PageMode from right → handlebar at left
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
        onClose={closeOnOutsideClick && escapeClose ? close : () => {}}
        className="relative z-[9999]"
      >
        {/* Backdrop with CardStack */}
        <Transition.Child
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
            {...(closeOnOutsideClick ? { onClick: close } : {})}
          >
            <CardStack />
          </div>
        </Transition.Child>

        {/* Enhanced close indicator */}
        {enhancedCloseBox && dragState.shouldClose && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[10000] pointer-events-none"
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
          </motion.div>
        )}

        {/* PageMode Panel */}
        <HeadlessDialog.Panel
          as={SafeMotionDiv}
          className={containerClasses}
          style={sizeStyles}
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
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {/* Handlebar - on opposite side from where PageMode appears */}
          <HandlebarZone
            position={getHandlebarPosition(position)}
            onPointerDown={onHandlebarPointerDown}
            onClick={handleHandlebarClick}
            isBeyondLimit={dragState.isBeyondLimit}
            resistanceIntensity={dragState.resistanceIntensity}
            ariaLabel={handlebarAriaLabel}
          />

          {/* Content */}
          <div
            className={twMerge('flex-1 p-4', contentOverflow, getMarginClass())}
          >
            {renderedContent}
          </div>
        </HeadlessDialog.Panel>
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
