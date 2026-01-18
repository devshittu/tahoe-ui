// src/components/Form/Slider.tsx
'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * Slider - Range input with single or dual thumbs
 *
 * Reference: design-principles.md
 * - #9 Obvious Affordances: 44px touch targets
 * - #17 Mobile-Native: Touch-friendly thumb size
 */

export type SliderSize = 'sm' | 'md' | 'lg';

export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps {
  /** Current value (single) or values (range) */
  value?: number | [number, number];
  /** Change handler */
  onChange?: (value: number | [number, number]) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Show marks */
  marks?: boolean | SliderMark[];
  /** Show value tooltip */
  showValue?: boolean;
  /** Size preset */
  size?: SliderSize;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
  /** ARIA label */
  'aria-label'?: string;
}

const sizeClasses: Record<
  SliderSize,
  { track: string; thumb: string; mark: string }
> = {
  sm: {
    track: 'h-1',
    thumb: 'w-4 h-4',
    mark: 'w-1 h-1',
  },
  md: {
    track: 'h-1.5',
    thumb: 'w-5 h-5',
    mark: 'w-1.5 h-1.5',
  },
  lg: {
    track: 'h-2',
    thumb: 'w-6 h-6',
    mark: 'w-2 h-2',
  },
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function snapToStep(value: number, min: number, step: number): number {
  return Math.round((value - min) / step) * step + min;
}

export function Slider({
  value: propValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks = false,
  showValue = false,
  size = 'md',
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: SliderProps) {
  const isRange = Array.isArray(propValue);
  const [localValue, setLocalValue] = useState<number | [number, number]>(
    propValue ?? (isRange ? [min, max] : min),
  );
  const [activeThumb, setActiveThumb] = useState<0 | 1 | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sizes = sizeClasses[size];

  // Sync with prop value
  useEffect(() => {
    if (propValue !== undefined) {
      setLocalValue(propValue);
    }
  }, [propValue]);

  const getValue = useCallback((): number | [number, number] => {
    return propValue !== undefined ? propValue : localValue;
  }, [propValue, localValue]);

  const getPercentage = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max],
  );

  const handleChange = useCallback(
    (newValue: number | [number, number]) => {
      setLocalValue(newValue);
      onChange?.(newValue);
    },
    [onChange],
  );

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      const rawValue = percentage * (max - min) + min;
      const snappedValue = clamp(snapToStep(rawValue, min, step), min, max);

      const currentValue = getValue();
      if (Array.isArray(currentValue)) {
        // Find nearest thumb
        const [low, high] = currentValue;
        const distToLow = Math.abs(snappedValue - low);
        const distToHigh = Math.abs(snappedValue - high);

        if (distToLow <= distToHigh) {
          handleChange([snappedValue, high]);
        } else {
          handleChange([low, snappedValue]);
        }
      } else {
        handleChange(snappedValue);
      }
    },
    [disabled, min, max, step, getValue, handleChange],
  );

  const handleThumbDrag = useCallback(
    (thumbIndex: 0 | 1, e: React.MouseEvent | React.TouchEvent) => {
      if (disabled || !trackRef.current) return;
      e.preventDefault();
      setActiveThumb(thumbIndex);

      const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
        if (!trackRef.current) return;

        const clientX =
          'touches' in moveEvent
            ? moveEvent.touches[0].clientX
            : moveEvent.clientX;

        const rect = trackRef.current.getBoundingClientRect();
        const percentage = clamp((clientX - rect.left) / rect.width, 0, 1);
        const rawValue = percentage * (max - min) + min;
        const snappedValue = clamp(snapToStep(rawValue, min, step), min, max);

        const currentValue = getValue();
        if (Array.isArray(currentValue)) {
          const [low, high] = currentValue;
          if (thumbIndex === 0) {
            handleChange([Math.min(snappedValue, high), high]);
          } else {
            handleChange([low, Math.max(snappedValue, low)]);
          }
        } else {
          handleChange(snappedValue);
        }
      };

      const handleUp = () => {
        setActiveThumb(null);
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleUp);
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleUp);
    },
    [disabled, min, max, step, getValue, handleChange],
  );

  const currentValue = getValue();
  const isSingleValue = !Array.isArray(currentValue);
  const lowValue = isSingleValue ? min : currentValue[0];
  const highValue = isSingleValue ? currentValue : currentValue[1];

  const lowPercent = getPercentage(lowValue);
  const highPercent = getPercentage(highValue);

  // Generate marks
  const markElements = marks
    ? Array.isArray(marks)
      ? marks
      : Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => ({
          value: min + i * step,
        }))
    : [];

  return (
    <div className={cn('relative w-full', disabled && 'opacity-50', className)}>
      {/* Track - uses role="none" as the thumbs are the interactive elements */}
      <div
        ref={trackRef}
        role="none"
        className={cn(
          'relative w-full rounded-full cursor-pointer',
          'bg-gray-200 dark:bg-gray-700',
          sizes.track,
        )}
        onClick={handleTrackClick}
      >
        {/* Active range */}
        <div
          className={cn(
            'absolute rounded-full',
            'bg-gray-900 dark:bg-gray-100',
            sizes.track,
          )}
          style={{
            left: isSingleValue ? '0%' : `${lowPercent}%`,
            width: `${highPercent - (isSingleValue ? 0 : lowPercent)}%`,
          }}
        />

        {/* Marks */}
        {markElements.map((mark) => (
          <div
            key={mark.value}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full',
              'bg-gray-400 dark:bg-gray-500',
              sizes.mark,
            )}
            style={{ left: `${getPercentage(mark.value)}%` }}
          />
        ))}

        {/* Low thumb (for range) */}
        {!isSingleValue && (
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-label={ariaLabel ? `${ariaLabel} minimum` : 'Minimum value'}
            aria-valuemin={min}
            aria-valuemax={highValue}
            aria-valuenow={lowValue}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 -translate-x-1/2',
              'rounded-full shadow-md cursor-grab',
              'bg-white dark:bg-gray-900',
              'border-2 border-gray-900 dark:border-gray-100',
              'focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20',
              activeThumb === 0 && 'cursor-grabbing scale-110',
              'transition-transform',
              sizes.thumb,
            )}
            style={{ left: `${lowPercent}%` }}
            onMouseDown={(e) => handleThumbDrag(0, e)}
            onTouchStart={(e) => handleThumbDrag(0, e)}
          >
            {showValue && activeThumb === 0 && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded">
                {lowValue}
              </span>
            )}
          </div>
        )}

        {/* High thumb */}
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel || (isSingleValue ? 'Value' : 'Maximum value')}
          aria-valuemin={isSingleValue ? min : lowValue}
          aria-valuemax={max}
          aria-valuenow={highValue}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 -translate-x-1/2',
            'rounded-full shadow-md cursor-grab',
            'bg-white dark:bg-gray-900',
            'border-2 border-gray-900 dark:border-gray-100',
            'focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20',
            activeThumb === 1 && 'cursor-grabbing scale-110',
            'transition-transform',
            sizes.thumb,
          )}
          style={{ left: `${highPercent}%` }}
          onMouseDown={(e) => handleThumbDrag(1, e)}
          onTouchStart={(e) => handleThumbDrag(1, e)}
        >
          {showValue &&
            (activeThumb === 1 || (isSingleValue && activeThumb === null)) && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded whitespace-nowrap">
                {highValue}
              </span>
            )}
        </div>
      </div>

      {/* Mark labels */}
      {Array.isArray(marks) && marks.some((m) => m.label) && (
        <div className="relative w-full mt-2">
          {marks
            .filter((m) => m.label)
            .map((mark) => (
              <span
                key={mark.value}
                className="absolute text-xs text-gray-500 dark:text-gray-400 -translate-x-1/2"
                style={{ left: `${getPercentage(mark.value)}%` }}
              >
                {mark.label}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}

Slider.displayName = 'Slider';

export default Slider;
