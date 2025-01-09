// src/components/Button/Button.tsx
'use client';

import React, {
  forwardRef,
  useMemo,
  useCallback,
  MouseEvent,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * The style variant of the button's rendering approach:
 * - solid: background color blocks
 * - outline: border only, transparent background
 * - text: minimal, text-based approach
 */
export type ButtonVariant = 'solid' | 'outline' | 'text';

/**
 * The color scheme.
 * You can expand this list to match your Tailwind color tokens
 * like 'primary', 'secondary', 'accent', or 'blue', 'red', etc.
 */
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'blue'
  | 'red'
  | 'green'
  | 'purple'
  | 'foreground'
  | 'background';

/**
 * Sizing options for consistent spacing & typography.
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Defines how rounded the corners are.
 */
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

/**
 * The ButtonProps extends the standard HTML button attributes
 * while adding custom props for variant, color, size, rounding, etc.
 */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  isLoading?: boolean;
  fullWidth?: boolean;
  focusable?: boolean; // New prop to toggle focusability
  spinner?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & (
    | { children: ReactNode; leftIcon?: ReactNode; rightIcon?: ReactNode }
    | { children?: undefined; leftIcon: ReactNode; rightIcon?: ReactNode }
    | { children?: undefined; leftIcon?: ReactNode; rightIcon: ReactNode }
  );

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    // default props
    variant = 'solid',
    color = 'primary',
    size = 'md',
    rounded = 'md',
    isLoading = false,
    fullWidth = false,
    focusable = false,

    // optional overrides or additions
    spinner,
    leftIcon,
    rightIcon,

    // standard button HTML props
    disabled,
    className = '',
    onClick,
    children,
    ...rest
  } = props;

  /**
   * Prevent clicks if loading or disabled
   */
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (isLoading || disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) onClick(e);
    },
    [isLoading, disabled, onClick],
  );

  /**
   * Tailwind classes to unify color with variant:
   * e.g. { primary: { solid: 'bg-primary ...', outline: 'border-primary text-primary ...', etc. } }
   *
   * You can expand or adjust these to match your exact color tokens from tailwind config.
   */
  const colorMap = useMemo(() => {
    // For each color, define how it appears in each variant
    return {
      primary: {
        solid: 'bg-primary text-white hover:bg-[#2b2b2b]',
        outline: 'border border-primary text-primary hover:bg-primary/10',
        text: 'bg-transparent text-primary hover:bg-primary/10',
      },
      secondary: {
        solid: 'bg-secondary text-white hover:bg-[#555555]',
        outline: 'border border-secondary text-secondary hover:bg-secondary/10',
        text: 'bg-transparent text-secondary hover:bg-secondary/10',
      },
      accent: {
        solid: 'bg-accent text-white hover:bg-[#e64e2d]',
        outline: 'border border-accent text-accent hover:bg-accent/10',
        text: 'bg-transparent text-accent hover:bg-accent/10',
      },
      blue: {
        solid: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
        text: 'bg-transparent text-blue-500 hover:bg-blue-100',
      },
      red: {
        solid: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border border-red-500 text-red-500 hover:bg-red-50',
        text: 'bg-transparent text-red-500 hover:bg-red-100',
      },
      green: {
        solid: 'bg-green-500 text-white hover:bg-green-600',
        outline: 'border border-green-500 text-green-500 hover:bg-green-50',
        text: 'bg-transparent text-green-500 hover:bg-green-100',
      },
      purple: {
        solid: 'bg-purple-500 text-white hover:bg-purple-600',
        outline: 'border border-purple-500 text-purple-500 hover:bg-purple-50',
        text: 'bg-transparent text-purple-500 hover:bg-purple-100',
      },
      foreground: {
        solid: 'bg-foreground text-background hover:opacity-90',
        outline:
          'border border-foreground text-foreground hover:bg-foreground/10',
        text: 'bg-transparent text-foreground hover:bg-foreground/10',
      },
      background: {
        solid: 'bg-background text-foreground hover:opacity-90',
        outline:
          'border border-background text-background hover:bg-background/10',
        text: 'bg-transparent text-background hover:bg-background/10',
      },
    };
  }, []);

  /**
   * Basic sizing approach, with potential expansions to handle responsive classes.
   */
  const sizeMap = useMemo(() => {
    return {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
      xl: 'px-6 py-3.5 text-xl',
    };
  }, []);

  /**
   * Rounded corners map, to unify tailwind classes for border radius.
   */
  const roundedMap = useMemo(() => {
    return {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };
  }, []);

  /**
   * Determine final classes combining:
   * - color & variant styles
   * - size
   * - rounding
   * - full width
   * - transitions, focus ring
   * - disabled/loading states
   */
  const computedClassName = useMemo(() => {
    // Fallback color if it's not in the map
    const colorObject = colorMap[color] || colorMap.primary;
    // Ensure the variant is valid
    const colorClasses = colorObject[variant] || colorObject.solid;
    const focusClasses = focusable
      ? 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
      : '';

    return twMerge(
      clsx(
        'inline-flex items-center justify-center font-medium select-none',
        'transition-colors duration-200',
        // 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        focusClasses,
        colorClasses,
        sizeMap[size] ?? sizeMap.md,
        roundedMap[rounded] ?? roundedMap.md,
        fullWidth && 'w-full',
        (disabled || isLoading) &&
          'opacity-50 cursor-not-allowed pointer-events-none',
      ),
      className,
    );
  }, [
    color,
    variant,
    size,
    rounded,
    fullWidth,
    disabled,
    isLoading,
    focusable,
    colorMap,
    sizeMap,
    roundedMap,
    className,
  ]);

  /**
   * If a custom spinner is provided, we use that. Otherwise, we show a default.
   */
  const renderSpinner = useCallback(() => {
    if (props.spinner) return props.spinner;
    return (
      <svg
        className="animate-spin mr-2 h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
    );
  }, [props.spinner]);

  return (
    <button
      ref={ref}
      type="button"
      className={computedClassName}
      disabled={disabled || isLoading}
      onClick={handleClick}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {/* Left icon or loading spinner */}
      {isLoading
        ? renderSpinner()
        : props.leftIcon && <span className="mr-2">{props.leftIcon}</span>}

      {/* Child content */}
      {children}

      {/* Right icon (only show if not loading) */}
      {props.rightIcon && !isLoading && (
        <span className="ml-2">{props.rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default React.memo(Button);

// src/components/Button/Button.tsx
