// src/app/playground/toast/components/Toast.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Text, SmallText } from '@/components/Typography';
import { useSwipe } from '@/hooks/gestures';
import { useToastStore } from './store';
import type { Toast as ToastType, ToastPosition } from './types';
import { TOAST_VARIANT_STYLES } from './types';
import {
  FiCheck,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
} from 'react-icons/fi';

interface ToastProps {
  toast: ToastType;
  position: ToastPosition;
  index: number;
}

/**
 * Get default icon for variant
 */
function getVariantIcon(variant: ToastType['variant']) {
  const iconMap = {
    default: null,
    success: FiCheck,
    error: FiAlertCircle,
    warning: FiAlertTriangle,
    info: FiInfo,
  };
  return iconMap[variant];
}

/**
 * Get animation direction based on position
 */
function getAnimationConfig(position: ToastPosition) {
  const isTop = position.startsWith('top');
  const isLeft = position.endsWith('left');
  const isCenter = position.endsWith('center');

  return {
    initial: {
      opacity: 0,
      y: isTop ? -20 : 20,
      x: isCenter ? 0 : isLeft ? -20 : 20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: isTop ? -10 : 10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };
}

/**
 * Individual Toast component
 *
 * Features:
 * - Variant-based styling
 * - Configurable dismiss modes: gesture, action-only, auto
 * - Handlebar indicator for drag affordance
 * - Swipe to dismiss
 * - Pause on hover
 * - Progress indicator
 * - Action button support
 *
 * Design Principles:
 * - #9 Obvious Affordances: Handlebar indicates draggability
 * - #16 Micro-Interaction Precision: Smooth animations
 * - #17 Mobile-Native: Swipe gesture support
 * - No X buttons - uses gesture or action-based dismissal
 */
export function Toast({ toast, position, index }: ToastProps) {
  const { dismiss, pause, resume } = useToastStore();
  const styles = TOAST_VARIANT_STYLES[toast.variant];
  const Icon = toast.icon ? null : getVariantIcon(toast.variant);
  const progressRef = useRef<HTMLDivElement>(null);

  // Determine if swipe is enabled based on config
  const canSwipe = toast.swipeEnabled && toast.dismissMode === 'gesture';

  // Swipe to dismiss
  const { swipeProps, offset, isSwiping } = useSwipe({
    axis: 'x',
    threshold: 60,
    timeout: 1000, // Allow slower drags
    disabled: !canSwipe,
    onSwipeLeft: () => canSwipe && dismiss(toast.id),
    onSwipeRight: () => canSwipe && dismiss(toast.id),
  });

  // Animate progress bar
  useEffect(() => {
    if (toast.duration <= 0 || toast.isPaused || !progressRef.current) return;

    const el = progressRef.current;
    el.style.transition = 'none';
    el.style.width = '100%';

    // Force reflow
    el.offsetHeight;

    el.style.transition = `width ${toast.remainingDuration}ms linear`;
    el.style.width = '0%';
  }, [toast.duration, toast.isPaused, toast.remainingDuration]);

  // Handle action button click
  const handleActionClick = () => {
    toast.action?.onClick();
    // Dismiss if dismissOnClick is true (default) or if in action-only mode
    if (
      toast.action?.dismissOnClick !== false ||
      toast.dismissMode === 'action-only'
    ) {
      dismiss(toast.id);
    }
  };

  const animationConfig = getAnimationConfig(position);

  return (
    <motion.div
      layout
      initial={animationConfig.initial}
      animate={toast.isExiting ? animationConfig.exit : animationConfig.animate}
      exit={animationConfig.exit}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        layout: { duration: 0.2 },
      }}
      style={{
        x: isSwiping ? offset.x : 0,
        opacity: isSwiping ? 1 - Math.abs(offset.x) / 150 : 1,
      }}
      onMouseEnter={() => pause(toast.id)}
      onMouseLeave={(e) => {
        resume(toast.id);
        if (canSwipe) swipeProps.onMouseLeave(e);
      }}
      onMouseDown={canSwipe ? swipeProps.onMouseDown : undefined}
      onMouseMove={canSwipe ? swipeProps.onMouseMove : undefined}
      onMouseUp={canSwipe ? swipeProps.onMouseUp : undefined}
      onTouchStart={canSwipe ? swipeProps.onTouchStart : undefined}
      onTouchMove={canSwipe ? swipeProps.onTouchMove : undefined}
      onTouchEnd={canSwipe ? swipeProps.onTouchEnd : undefined}
      className={cn(
        'relative w-full max-w-sm overflow-hidden',
        'rounded-xl border shadow-lg',
        canSwipe && 'cursor-grab active:cursor-grabbing',
        styles.bg,
        styles.border,
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Handlebar indicator for gesture dismissal - clickable */}
      {toast.showHandlebar && toast.dismissMode === 'gesture' && (
        <button
          type="button"
          onClick={() => dismiss(toast.id)}
          className="absolute top-0 left-0 right-0 flex justify-center pt-2 pb-1 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <div
            className={cn(
              'w-10 h-1 rounded-full',
              'bg-gray-300 dark:bg-gray-600',
              'opacity-60 hover:opacity-100',
              'transition-opacity duration-150',
            )}
          />
        </button>
      )}

      {/* Progress bar */}
      {toast.duration > 0 && (
        <div
          className={cn(
            'absolute left-0 right-0 h-1 bg-gray-200/50 dark:bg-gray-700/50',
            toast.showHandlebar ? 'top-4' : 'top-0',
          )}
        >
          <div
            ref={progressRef}
            className={cn(
              'h-full',
              toast.variant === 'success' && 'bg-emerald-500',
              toast.variant === 'error' && 'bg-red-500',
              toast.variant === 'warning' && 'bg-amber-500',
              toast.variant === 'info' && 'bg-blue-500',
              toast.variant === 'default' && 'bg-gray-400 dark:bg-gray-500',
            )}
          />
        </div>
      )}

      <div
        className={cn(
          'flex items-start gap-3 p-4',
          toast.showHandlebar && 'pt-6',
          toast.duration > 0 && !toast.showHandlebar && 'pt-5',
        )}
      >
        {/* Icon */}
        {(Icon || toast.icon) && (
          <div className={cn('flex-shrink-0 mt-0.5', styles.icon)}>
            {toast.icon || (Icon && <Icon className="w-5 h-5" />)}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {toast.title && (
            <Text fontWeight="semibold" color="primary" className="mb-1">
              {toast.title}
            </Text>
          )}
          <div className={cn('text-sm', styles.text)}>
            {typeof toast.message === 'string' ? (
              <SmallText className={styles.text}>{toast.message}</SmallText>
            ) : (
              toast.message
            )}
          </div>

          {/* Action button */}
          {toast.action && (
            <button
              onClick={handleActionClick}
              className={cn(
                'mt-3 px-3 py-1.5 rounded-lg',
                'text-sm font-medium',
                'transition-colors duration-150',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                // Variant-specific button styling
                toast.variant === 'default' &&
                  'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 focus:ring-gray-500',
                toast.variant === 'success' &&
                  'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
                toast.variant === 'error' &&
                  'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
                toast.variant === 'warning' &&
                  'bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500',
                toast.variant === 'info' &&
                  'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
              )}
            >
              {toast.action.label}
            </button>
          )}

          {/* Hint for gesture mode without action */}
          {toast.dismissMode === 'gesture' &&
            !toast.action &&
            toast.duration === 0 && (
              <SmallText className="mt-2 text-xs opacity-60">
                Swipe to dismiss
              </SmallText>
            )}
        </div>
      </div>
    </motion.div>
  );
}

export default Toast;
