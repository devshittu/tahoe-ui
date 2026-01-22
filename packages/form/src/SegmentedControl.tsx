'use client';

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  KeyboardEvent,
  ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

/**
 * Segmented control size variants
 */
export type SegmentedControlSize = 'sm' | 'md' | 'lg';

/**
 * Individual segment option data
 */
export interface SegmentOption<T = string> {
  /** Unique value for this segment */
  value: T;
  /** Display label */
  label: string;
  /** Optional icon (renders before label) */
  icon?: ReactNode;
  /** Disabled state for this segment */
  disabled?: boolean;
}

/**
 * Props for individual Segment component
 */
interface SegmentProps<T = string> {
  option: SegmentOption<T>;
  selected: boolean;
  size: SegmentedControlSize;
  controlDisabled: boolean;
  onClick: () => void;
}

/**
 * Props for SegmentedControl component
 */
export interface SegmentedControlProps<T = string> {
  /** Segment options */
  options: SegmentOption<T>[];
  /** Currently selected value */
  value?: T;
  /** Selection change handler */
  onChange?: (value: T) => void;
  /** Size variant */
  size?: SegmentedControlSize;
  /** Disable all segments */
  disabled?: boolean;
  /** Expand to fill container width */
  fullWidth?: boolean;
  /** Name attribute for form submission */
  name?: string;
  /** Additional className for container */
  className?: string;
}

/**
 * Size configuration for consistent styling (8pt grid)
 */
const SEGMENT_SIZE_CONFIG: Record<
  SegmentedControlSize,
  {
    segment: string;
    iconSize: string;
    container: string;
    containerRadius: string;
    indicatorRadius: string;
    fontSize: string;
    minHeight: number;
  }
> = {
  sm: {
    segment: 'px-3 py-1.5',
    iconSize: 'w-4 h-4',
    container: 'p-1',
    containerRadius: 'rounded-lg',
    indicatorRadius: 'rounded-md',
    fontSize: 'text-sm',
    minHeight: 32,
  },
  md: {
    segment: 'px-4 py-2',
    iconSize: 'w-5 h-5',
    container: 'p-1',
    containerRadius: 'rounded-xl',
    indicatorRadius: 'rounded-lg',
    fontSize: 'text-base',
    minHeight: 40,
  },
  lg: {
    segment: 'px-5 py-2.5',
    iconSize: 'w-5 h-5',
    container: 'p-1.5',
    containerRadius: 'rounded-xl',
    indicatorRadius: 'rounded-lg',
    fontSize: 'text-lg',
    minHeight: 48,
  },
};

/**
 * Animation configuration for sliding indicator
 */
const SEGMENT_ANIMATION_CONFIG = {
  spring: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  },
  colorTransition: {
    duration: 0.15,
  },
};

/**
 * Individual segment button within SegmentedControl
 * @internal
 */
const Segment = forwardRef<HTMLButtonElement, SegmentProps>(function Segment(
  { option, selected, size, controlDisabled, onClick, ...props },
  ref,
) {
  const config = SEGMENT_SIZE_CONFIG[size];
  const isDisabled = controlDisabled || option.disabled;

  const handleClick = useCallback(() => {
    if (!isDisabled) {
      onClick();
    }
  }, [isDisabled, onClick]);

  return (
    <motion.button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={selected}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      onClick={handleClick}
      className={twMerge(
        // Base styles
        'relative z-10 flex items-center justify-center gap-2',
        'select-none whitespace-nowrap',
        'transition-colors',
        config.segment,
        config.fontSize,

        // Text color based on selection state (CSS variable-backed via @tahoe-ui/tailwind-preset)
        selected ? 'text-text-primary' : 'text-text-muted',

        // Hover state (only when not selected and not disabled)
        !selected && !isDisabled && 'hover:text-text-primary',

        // Disabled state
        isDisabled && 'opacity-50 cursor-not-allowed',

        // Focus visible (CSS variable-backed via @tahoe-ui/tailwind-preset)
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500/50 focus-visible:ring-offset-1',
        'rounded-md',
      )}
      initial={false}
      animate={{
        color: selected
          ? 'var(--segment-selected-color)'
          : 'var(--segment-default-color)',
      }}
      transition={SEGMENT_ANIMATION_CONFIG.colorTransition}
      style={
        {
          '--segment-selected-color': 'inherit',
          '--segment-default-color': 'inherit',
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Icon */}
      {option.icon && (
        <span
          className={twMerge(
            config.iconSize,
            'flex-shrink-0',
            'transition-colors duration-150',
          )}
          aria-hidden="true"
        >
          {option.icon}
        </span>
      )}

      {/* Label */}
      <span className="font-medium">{option.label}</span>
    </motion.button>
  );
});

Segment.displayName = 'Segment';

/**
 * SegmentedControl - Apple-style grouped toggle buttons
 *
 * @example
 * ```tsx
 * <SegmentedControl
 *   options={[
 *     { value: 'list', label: 'List', icon: <FiList /> },
 *     { value: 'grid', label: 'Grid', icon: <FiGrid /> },
 *   ]}
 *   value={view}
 *   onChange={setView}
 *   size="md"
 * />
 * ```
 */
export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = 'md',
  disabled = false,
  fullWidth = false,
  name,
  className,
}: SegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<Map<T, HTMLButtonElement>>(new Map());

  // Track indicator position and dimensions
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const config = SEGMENT_SIZE_CONFIG[size];

  // Get non-disabled options for keyboard navigation
  const navigableOptions = useMemo(
    () => options.filter((opt) => !opt.disabled),
    [options],
  );

  // Update indicator position when selection changes
  const updateIndicatorPosition = useCallback(() => {
    if (!value || !containerRef.current) {
      setIndicatorStyle(null);
      return;
    }

    const selectedButton = segmentRefs.current.get(value);
    if (!selectedButton) {
      setIndicatorStyle(null);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = selectedButton.getBoundingClientRect();

    setIndicatorStyle({
      left: buttonRect.left - containerRect.left,
      width: buttonRect.width,
    });
  }, [value]);

  // Update indicator on mount and when value changes
  useEffect(() => {
    updateIndicatorPosition();
  }, [updateIndicatorPosition]);

  // Update indicator on resize
  useEffect(() => {
    const observer = new ResizeObserver(updateIndicatorPosition);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [updateIndicatorPosition]);

  // Register segment ref
  const setSegmentRef = useCallback(
    (optionValue: T) => (el: HTMLButtonElement | null) => {
      if (el) {
        segmentRefs.current.set(optionValue, el);
      } else {
        segmentRefs.current.delete(optionValue);
      }
    },
    [],
  );

  // Handle segment selection
  const handleSelect = useCallback(
    (optionValue: T) => {
      if (disabled) return;
      const option = options.find((opt) => opt.value === optionValue);
      if (option?.disabled) return;
      onChange?.(optionValue);
    },
    [disabled, options, onChange],
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled || navigableOptions.length === 0) return;

      const currentIndex = navigableOptions.findIndex(
        (opt) => opt.value === value,
      );
      let nextIndex: number | null = null;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex =
            currentIndex < navigableOptions.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex =
            currentIndex > 0 ? currentIndex - 1 : navigableOptions.length - 1;
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = navigableOptions.length - 1;
          break;
        default:
          return;
      }

      if (nextIndex !== null) {
        const nextOption = navigableOptions[nextIndex];
        handleSelect(nextOption.value as T);
        // Focus the newly selected segment
        const button = segmentRefs.current.get(nextOption.value as T);
        button?.focus();
      }
    },
    [disabled, navigableOptions, value, handleSelect],
  );

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={name || 'Segmented control'}
      className={twMerge(
        // Container styling (CSS variable-backed via @tahoe-ui/tailwind-preset)
        'relative inline-flex',
        'bg-bg-secondary dark:bg-bg-secondary',
        config.container,
        config.containerRadius,

        // Full width option
        fullWidth && 'w-full',

        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed',

        className,
      )}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ minHeight: config.minHeight }}
    >
      {/* Hidden input for form submission */}
      {name && <input type="hidden" name={name} value={value || ''} />}

      {/* Animated indicator (CSS variable-backed via @tahoe-ui/tailwind-preset) */}
      <AnimatePresence>
        {indicatorStyle && (
          <motion.div
            className={twMerge(
              'absolute top-1/2 -translate-y-1/2',
              'bg-bg-elevated',
              'shadow-sm',
              config.indicatorRadius,
              // Inset from container padding
              size === 'lg' ? 'h-[calc(100%-12px)]' : 'h-[calc(100%-8px)]',
            )}
            initial={false}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={SEGMENT_ANIMATION_CONFIG.spring}
            style={{
              // Ensure indicator is behind segments
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      {/* Segments */}
      {options.map((option) => (
        <Segment
          key={String(option.value)}
          ref={setSegmentRef(option.value)}
          option={option as SegmentOption<string>}
          selected={option.value === value}
          size={size}
          controlDisabled={disabled}
          onClick={() => handleSelect(option.value)}
        />
      ))}
    </div>
  );
}

SegmentedControl.displayName = 'SegmentedControl';

export default SegmentedControl;
