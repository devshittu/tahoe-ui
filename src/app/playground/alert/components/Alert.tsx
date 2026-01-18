// src/app/playground/alert/components/Alert.tsx

'use client';

import { forwardRef } from 'react';
import {
  FiInfo,
  FiCheckCircle,
  FiAlertTriangle,
  FiAlertCircle,
} from 'react-icons/fi';
import { cn } from '@/lib/utils';
import {
  AlertProps,
  AlertVariant,
  ALERT_VARIANT_CONFIG,
  ALERT_SIZE_CONFIG,
} from './types';

/**
 * Default icons per variant
 */
const DEFAULT_ICONS: Record<AlertVariant, React.ReactNode> = {
  info: <FiInfo />,
  success: <FiCheckCircle />,
  warning: <FiAlertTriangle />,
  error: <FiAlertCircle />,
};

/**
 * Alert - Contextual feedback messages
 *
 * Design Principles Applied:
 * - #2 Visual Hierarchy: Clear title/description separation
 * - #4 System-Level Consistency: Uses design tokens
 * - #9 Obvious Affordances: Dismissible alerts have clear close button
 * - #12 Accessibility: Proper ARIA role and live region
 * - #19 Immediate Feedback: Communicates status clearly
 *
 * Features:
 * - Four semantic variants: info, success, warning, error
 * - Three visual styles: filled, soft, outline
 * - Three sizes: sm, md, lg
 * - Optional title and description
 * - Default icons per variant (customizable)
 * - Dismissible with callback
 * - Action button support
 * - Dark mode support
 *
 * @example
 * ```tsx
 * // Simple alert
 * <Alert variant="success">Operation completed!</Alert>
 *
 * // With title and dismissible
 * <Alert
 *   variant="warning"
 *   title="Attention required"
 *   dismissible
 *   onDismiss={() => {}}
 * >
 *   Please review your settings.
 * </Alert>
 * ```
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = 'info',
    style = 'soft',
    size = 'md',
    title,
    children,
    icon,
    hideIcon = false,
    dismissible = false,
    onDismiss,
    action,
    className,
  },
  ref,
) {
  const variantConfig = ALERT_VARIANT_CONFIG[variant][style];
  const sizeConfig = ALERT_SIZE_CONFIG[size];
  const displayIcon = icon ?? DEFAULT_ICONS[variant];

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        // Base
        'relative rounded-lg border overflow-hidden',

        // Colors
        variantConfig.bg,
        variantConfig.border,

        className,
      )}
    >
      {/* Dismiss handlebar zone - positioned at top, horizontal, centered */}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            // Zone: full width, centered content, proper touch target
            'w-full flex items-center justify-center',
            'h-8 sm:h-9',
            'cursor-pointer transition-colors',
            'hover:bg-black/5 dark:hover:bg-white/5',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset',
            variant === 'info' && 'focus-visible:ring-blue-500',
            variant === 'success' && 'focus-visible:ring-emerald-500',
            variant === 'warning' && 'focus-visible:ring-amber-500',
            variant === 'error' && 'focus-visible:ring-red-500',
          )}
          aria-label="Dismiss alert"
        >
          {/* Horizontal handlebar pill */}
          <div
            className={cn(
              'rounded-full transition-transform',
              'hover:scale-110 active:scale-95',
              // Horizontal handlebar: wide and short
              size === 'sm' && 'w-8 h-1',
              size === 'md' && 'w-10 h-1.5',
              size === 'lg' && 'w-12 h-1.5',
              // Color based on style
              style === 'filled'
                ? 'bg-white/40 hover:bg-white/60'
                : cn(
                    variant === 'info' && 'bg-blue-300 dark:bg-blue-600',
                    variant === 'success' &&
                      'bg-emerald-300 dark:bg-emerald-600',
                    variant === 'warning' && 'bg-amber-300 dark:bg-amber-600',
                    variant === 'error' && 'bg-red-300 dark:bg-red-600',
                  ),
              // Subtle inner shadow for depth (Apple-inspired)
              'shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]',
              'dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]',
            )}
          />
        </button>
      )}

      {/* Alert content */}
      <div
        className={cn(
          'flex',
          sizeConfig.padding,
          sizeConfig.gap,
          // Adjust top padding when handlebar is present
          dismissible && 'pt-0',
        )}
      >
        {/* Icon */}
        {!hideIcon && displayIcon && (
          <div
            className={cn(
              'flex-shrink-0',
              sizeConfig.iconSize,
              variantConfig.icon,
            )}
            aria-hidden="true"
          >
            <span className={cn('block', sizeConfig.iconSize)}>
              {displayIcon}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={cn(sizeConfig.titleSize, variantConfig.text)}>
              {title}
            </h3>
          )}
          {children && (
            <div
              className={cn(
                sizeConfig.textSize,
                variantConfig.text,
                style === 'filled' ? 'opacity-90' : 'opacity-80',
                title && 'mt-1',
              )}
            >
              {children}
            </div>
          )}
          {action && <div className="mt-3">{action}</div>}
        </div>
      </div>
    </div>
  );
});

Alert.displayName = 'Alert';
