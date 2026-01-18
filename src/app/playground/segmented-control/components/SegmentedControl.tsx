// src/app/playground/segmented-control/components/SegmentedControl.tsx

'use client';

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  KeyboardEvent,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Segment } from './Segment';
import {
  SegmentedControlProps,
  SegmentOption,
  SEGMENT_SIZE_CONFIG,
  SEGMENT_ANIMATION_CONFIG,
} from './types';

/**
 * SegmentedControl - Apple-style grouped toggle buttons
 *
 * Design Principles Applied:
 * - #3 Intentional White Space: 8pt grid padding
 * - #6 Purposeful Motion: Spring-based indicator animation
 * - #7 Intuitive Interaction: Familiar radio-group behavior
 * - #9 Obvious Affordances: Clear selection state
 * - #12 Accessibility: Full ARIA radiogroup pattern
 * - #16 Micro-Interaction Precision: Smooth indicator sliding
 *
 * Features:
 * - Animated sliding indicator
 * - Full keyboard navigation (arrow keys, Home, End)
 * - ARIA radiogroup semantics
 * - Three size variants (sm, md, lg)
 * - Dark mode support
 * - Optional icons
 * - Disabled state (entire control or individual segments)
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

  // Find selected index
  const selectedIndex = useMemo(
    () => options.findIndex((opt) => opt.value === value),
    [options, value],
  );

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
        handleSelect(nextOption.value);
        // Focus the newly selected segment
        const button = segmentRefs.current.get(nextOption.value);
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
      className={cn(
        // Container styling
        'relative inline-flex',
        'bg-gray-100 dark:bg-gray-800',
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

      {/* Animated indicator */}
      <AnimatePresence>
        {indicatorStyle && (
          <motion.div
            className={cn(
              'absolute top-1/2 -translate-y-1/2',
              'bg-white dark:bg-gray-700',
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
