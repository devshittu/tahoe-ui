'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { cn } from '@tahoe-ui/core';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from './icons';
import type { DatePickerProps, DatePickerSize } from './types';

/**
 * DatePicker - Date selection with calendar popup
 *
 * Built on HeadlessUI Popover with native Date API.
 *
 * @example
 * ```tsx
 * import { DatePicker } from '@tahoe-ui/form';
 *
 * <DatePicker value={date} onChange={setDate} />
 * <DatePicker minDate={new Date()} placeholder="Select start date" />
 * ```
 */

const sizeClasses: Record<DatePickerSize, { button: string; cell: string }> = {
  sm: {
    button: 'h-8 px-3 text-sm',
    cell: 'w-8 h-8 text-sm',
  },
  md: {
    button: 'h-10 px-4 text-base',
    cell: 'w-9 h-9 text-sm',
  },
  lg: {
    button: 'h-12 px-4 text-lg',
    cell: 'w-10 h-10 text-base',
  },
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  return false;
}

function defaultFormatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  size = 'md',
  disabled = false,
  placeholder = 'Select date',
  formatDate,
  locale = 'en-US',
  className,
  id,
}: DatePickerProps) {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(value || today);
  const sizes = sizeClasses[size];

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  // Get month and day names
  const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(
    viewDate,
  );
  const dayNames = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(2024, 0, i); // Jan 2024 starts on Monday
      return formatter.format(date);
    });
  }, [locale]);

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const days: (Date | null)[] = [];

    // Leading empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(viewYear, viewMonth, day));
    }

    return days;
  }, [viewYear, viewMonth]);

  const navigateMonth = useCallback((delta: number) => {
    setViewDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1),
    );
  }, []);

  const handleSelectDate = useCallback(
    (date: Date, close: () => void) => {
      if (!isDateDisabled(date, minDate, maxDate)) {
        onChange?.(date);
        close();
      }
    },
    [onChange, minDate, maxDate],
  );

  const displayValue = value
    ? formatDate
      ? formatDate(value)
      : defaultFormatDate(value, locale)
    : null;

  return (
    <Popover className={cn('relative', className)}>
      {({ close }) => (
        <>
          <PopoverButton
            id={id}
            disabled={disabled}
            className={cn(
              'relative w-full text-left rounded-lg transition-colors duration-150',
              'bg-white dark:bg-gray-900',
              'border border-gray-200 dark:border-gray-700',
              'text-gray-900 dark:text-gray-100',
              'focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10',
              'focus:border-gray-400 dark:focus:border-gray-500',
              sizes.button,
              disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            <span
              className={cn(
                'block truncate pr-8',
                !displayValue && 'text-gray-400 dark:text-gray-500',
              )}
            >
              {displayValue || placeholder}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <CalendarIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            </span>
          </PopoverButton>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <PopoverPanel
              className={cn(
                'absolute z-50 mt-2 p-4 rounded-xl',
                'bg-white dark:bg-gray-900',
                'border border-gray-200 dark:border-gray-700',
                'shadow-lg',
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => navigateMonth(-1)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {monthName} {viewYear}
                </span>
                <button
                  type="button"
                  onClick={() => navigateMonth(1)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    {day.slice(0, 2)}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => {
                  if (!date) {
                    return (
                      <div key={`empty-${index}`} className={sizes.cell} />
                    );
                  }

                  const isSelected = value && isSameDay(date, value);
                  const isToday = isSameDay(date, today);
                  const isDisabled = isDateDisabled(date, minDate, maxDate);

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => handleSelectDate(date, close)}
                      disabled={isDisabled}
                      className={cn(
                        'flex items-center justify-center rounded-lg transition-colors',
                        sizes.cell,
                        isSelected
                          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium'
                          : isToday
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                        isDisabled &&
                          'opacity-40 cursor-not-allowed hover:bg-transparent',
                      )}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              {/* Today button */}
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setViewDate(today);
                    handleSelectDate(today, close);
                  }}
                  className="w-full py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Today
                </button>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

DatePicker.displayName = 'DatePicker';

export default DatePicker;
