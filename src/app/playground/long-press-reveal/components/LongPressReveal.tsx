// src/app/playground/long-press-reveal/components/LongPressReveal.tsx
'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLongPressReveal } from './useLongPressReveal';
import type {
  LongPressRevealProps,
  RevealDirection,
  RevealVariant,
} from './types';
import { SPRING_CONFIGS } from './types';

/**
 * LongPressReveal - Headless component for long-press reveal interactions
 *
 * Uses render props pattern for maximum flexibility. Provides all state
 * and handlers needed to build custom reveal UIs.
 *
 * @example
 * ```tsx
 * <LongPressReveal onReveal={handleReveal}>
 *   {({ stage, progress, pressProps, isRevealed, dismiss }) => (
 *     <div {...pressProps} style={{ transform: `scale(${1 - progress * 0.05})` }}>
 *       <ListItem />
 *       {isRevealed && <QuickActions onAction={dismiss} />}
 *     </div>
 *   )}
 * </LongPressReveal>
 * ```
 */
export function LongPressReveal({
  children,
  className,
  ...options
}: LongPressRevealProps) {
  const revealState = useLongPressReveal(options);

  return <div className={className}>{children(revealState)}</div>;
}

/**
 * Props for RevealOverlay component
 */
export interface RevealOverlayProps {
  /** Whether the overlay is visible */
  isVisible: boolean;
  /** Callback to dismiss the overlay */
  onDismiss: () => void;
  /** Content to render in the overlay */
  children: React.ReactNode;
  /** Animation direction */
  direction?: RevealDirection;
  /** Visual variant */
  variant?: RevealVariant;
  /** Anchor element for positioning */
  anchorRef?: React.RefObject<HTMLElement | null>;
  /** Additional class name */
  className?: string;
  /** Blur backdrop amount */
  backdropBlur?: number;
}

/**
 * Animation variants for different directions
 */
const directionVariants: Record<
  RevealDirection,
  {
    initial: { opacity: number; y?: number; x?: number; scale: number };
    animate: { opacity: number; y?: number; x?: number; scale: number };
    exit: { opacity: number; y?: number; x?: number; scale: number };
  }
> = {
  up: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.98 },
  },
  down: {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.98 },
  },
  left: {
    initial: { opacity: 0, x: 20, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 10, scale: 0.98 },
  },
  right: {
    initial: { opacity: 0, x: -20, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -10, scale: 0.98 },
  },
  center: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

/**
 * Variant styles for the overlay
 */
const variantStyles: Record<RevealVariant, string> = {
  default:
    'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg',
  menu: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl',
  preview:
    'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl',
  actions:
    'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg',
};

/**
 * RevealOverlay - Positioned overlay component for reveal content
 *
 * Can be used standalone or via portal for complex positioning needs.
 */
export function RevealOverlay({
  isVisible,
  onDismiss,
  children,
  direction = 'up',
  variant = 'default',
  anchorRef,
  className,
  backdropBlur = 0,
}: RevealOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  }>({});

  // Calculate position relative to anchor
  useEffect(() => {
    if (!isVisible || !anchorRef?.current) return;

    const anchor = anchorRef.current;
    const rect = anchor.getBoundingClientRect();

    // Position above the anchor by default
    const newPosition: typeof position = {};

    switch (direction) {
      case 'up':
        newPosition.bottom = window.innerHeight - rect.top + 8;
        newPosition.left = rect.left + rect.width / 2;
        break;
      case 'down':
        newPosition.top = rect.bottom + 8;
        newPosition.left = rect.left + rect.width / 2;
        break;
      case 'left':
        newPosition.top = rect.top + rect.height / 2;
        newPosition.right = window.innerWidth - rect.left + 8;
        break;
      case 'right':
        newPosition.top = rect.top + rect.height / 2;
        newPosition.left = rect.right + 8;
        break;
      case 'center':
        newPosition.top = rect.top + rect.height / 2;
        newPosition.left = rect.left + rect.width / 2;
        break;
    }

    setPosition(newPosition);
  }, [isVisible, anchorRef, direction]);

  // Handle click outside
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onDismiss();
      }
    },
    [onDismiss],
  );

  // Handle escape key
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onDismiss]);

  const variants = directionVariants[direction];

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          role="presentation"
          className="fixed inset-0 z-50"
          onClick={handleBackdropClick}
          onKeyDown={(e) => e.key === 'Escape' && onDismiss()}
          style={{
            backdropFilter:
              backdropBlur > 0 ? `blur(${backdropBlur}px)` : undefined,
          }}
        >
          <motion.div
            ref={overlayRef}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{
              type: 'spring',
              stiffness: SPRING_CONFIGS.reveal.stiffness,
              damping: SPRING_CONFIGS.reveal.damping,
            }}
            className={cn(
              'fixed',
              direction === 'up' || direction === 'down'
                ? '-translate-x-1/2'
                : '',
              direction === 'left' ||
                direction === 'right' ||
                direction === 'center'
                ? '-translate-y-1/2'
                : '',
              direction === 'center' ? '-translate-x-1/2' : '',
              variantStyles[variant],
              className,
            )}
            style={{
              ...position,
              transform: undefined, // Let CSS handle transform
            }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Props for RevealPortal component
 */
export interface RevealPortalProps {
  children: React.ReactNode;
  /** Container element ID (default: 'reveal-portal-root') */
  containerId?: string;
}

/**
 * RevealPortal - Renders children into a portal for z-index management
 */
export function RevealPortal({
  children,
  containerId = 'reveal-portal-root',
}: RevealPortalProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(containerId);
    if (!element) {
      element = document.createElement('div');
      element.id = containerId;
      document.body.appendChild(element);
    }
    setContainer(element);

    return () => {
      // Don't remove the container on unmount as other portals may use it
    };
  }, [containerId]);

  if (!container) return null;
  return createPortal(children, container);
}

/**
 * ProgressRing - Visual progress indicator for long-press
 */
export interface ProgressRingProps {
  /** Progress value from 0 to 1 */
  progress: number;
  /** Ring size in pixels */
  size?: number;
  /** Stroke width in pixels */
  strokeWidth?: number;
  /** Ring color */
  color?: string;
  /** Background ring color */
  backgroundColor?: string;
  /** Additional class name */
  className?: string;
}

export function ProgressRing({
  progress,
  size = 40,
  strokeWidth = 3,
  color = 'currentColor',
  backgroundColor = 'rgba(0,0,0,0.1)',
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg
      width={size}
      height={size}
      className={cn('transform -rotate-90', className)}
    >
      {/* Background ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
      />
      {/* Progress ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="transition-all duration-75"
      />
    </svg>
  );
}

/**
 * QuickAction - Pre-styled action button for reveal menus
 */
export interface QuickActionProps {
  /** Action icon */
  icon: React.ReactNode;
  /** Action label (for accessibility) */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Visual variant */
  variant?: 'default' | 'destructive' | 'primary';
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

const actionVariantStyles = {
  default:
    'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
  destructive:
    'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50',
  primary:
    'bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50',
};

export function QuickAction({
  icon,
  label,
  onClick,
  variant = 'default',
  disabled = false,
  className,
}: QuickActionProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex items-center justify-center',
        'w-10 h-10 rounded-full',
        'transition-colors duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        disabled && 'opacity-50 cursor-not-allowed',
        actionVariantStyles[variant],
        className,
      )}
      aria-label={label}
    >
      {icon}
    </motion.button>
  );
}

/**
 * QuickActionsBar - Horizontal bar of quick actions
 */
export interface QuickActionsBarProps {
  children: React.ReactNode;
  className?: string;
}

export function QuickActionsBar({ children, className }: QuickActionsBarProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 p-2',
        'bg-white dark:bg-gray-900',
        'rounded-full shadow-lg',
        'border border-gray-200 dark:border-gray-700',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default LongPressReveal;
