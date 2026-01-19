'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

/**
 * Tabs - Accessible tabbed interface using HeadlessUI
 *
 * Features animated indicator, multiple variants, and full keyboard support.
 *
 * Reference: design-principles.md
 * - #7 Intuitive Interaction Patterns: Expected tab behavior
 * - #12 Accessibility: Built-in via HeadlessUI
 * - #6 Purposeful Motion: Sliding indicator animation
 */

export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export type TabsVariant = 'underline' | 'pills' | 'enclosed';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabsProps {
  /** Tab items */
  items: TabItem[];
  /** Visual variant */
  variant?: TabsVariant;
  /** Size preset */
  size?: TabsSize;
  /** Layout orientation */
  orientation?: TabsOrientation;
  /** Default selected index */
  defaultIndex?: number;
  /** Controlled selected index */
  selectedIndex?: number;
  /** Change handler */
  onChange?: (index: number) => void;
  /** Full width tabs */
  fullWidth?: boolean;
  /** Additional className */
  className?: string;
}

const sizeClasses: Record<TabsSize, { tab: string; panel: string }> = {
  sm: {
    tab: 'px-3 py-1.5 text-sm',
    panel: 'py-3',
  },
  md: {
    tab: 'px-4 py-2 text-base',
    panel: 'py-4',
  },
  lg: {
    tab: 'px-5 py-3 text-lg',
    panel: 'py-6',
  },
};

export function Tabs({
  items,
  variant = 'underline',
  size = 'md',
  orientation = 'horizontal',
  defaultIndex = 0,
  selectedIndex: controlledIndex,
  onChange,
  fullWidth = false,
  className,
}: TabsProps) {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const selectedIndex = controlledIndex ?? internalIndex;
  const sizes = sizeClasses[size];

  // Refs for animated indicator
  const tabRefs = useRef<(HTMLElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left?: number;
    width?: number;
    top?: number;
    height?: number;
  }>({});

  // Update indicator position
  useEffect(() => {
    const activeTab = tabRefs.current[selectedIndex];
    if (activeTab && variant === 'underline') {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = activeTab;
      if (orientation === 'horizontal') {
        setIndicatorStyle({
          left: offsetLeft,
          width: offsetWidth,
        });
      } else {
        setIndicatorStyle({
          top: offsetTop,
          height: offsetHeight,
        });
      }
    }
  }, [selectedIndex, variant, orientation]);

  const handleChange = (index: number) => {
    setInternalIndex(index);
    onChange?.(index);
  };

  const getTabClasses = (selected: boolean, disabled: boolean) => {
    const base = twMerge(
      'relative flex items-center gap-2 font-medium transition-colors',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 dark:focus-visible:ring-white/20',
      sizes.tab,
      disabled && 'opacity-50 cursor-not-allowed',
    );

    switch (variant) {
      case 'underline':
        return twMerge(
          base,
          selected
            ? 'text-gray-900 dark:text-gray-100'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
        );
      case 'pills':
        return twMerge(
          base,
          'rounded-lg',
          selected
            ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
        );
      case 'enclosed':
        return twMerge(
          base,
          'border rounded-t-lg -mb-px',
          selected
            ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 border-b-white dark:border-b-gray-900 text-gray-900 dark:text-gray-100'
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
        );
      default:
        return base;
    }
  };

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={handleChange}
      vertical={orientation === 'vertical'}
      className={twMerge(orientation === 'vertical' && 'flex gap-4', className)}
    >
      <TabList
        className={twMerge(
          'relative',
          orientation === 'horizontal' ? 'flex' : 'flex flex-col',
          fullWidth && orientation === 'horizontal' && 'w-full',
          variant === 'underline' &&
            orientation === 'horizontal' &&
            'border-b border-gray-200 dark:border-gray-700',
          variant === 'underline' &&
            orientation === 'vertical' &&
            'border-r border-gray-200 dark:border-gray-700 pr-4',
          variant === 'pills' &&
            'gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl',
          variant === 'enclosed' &&
            'border-b border-gray-200 dark:border-gray-700',
        )}
      >
        {items.map((item, index) => (
          <Tab
            key={item.key}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            disabled={item.disabled}
            className={({ selected }) =>
              twMerge(
                getTabClasses(selected, !!item.disabled),
                fullWidth &&
                  orientation === 'horizontal' &&
                  'flex-1 justify-center',
              )
            }
          >
            {item.icon}
            {item.label}
          </Tab>
        ))}

        {/* Animated indicator for underline variant */}
        {variant === 'underline' && (
          <motion.div
            className={twMerge(
              'absolute bg-gray-900 dark:bg-gray-100',
              orientation === 'horizontal' ? 'bottom-0 h-0.5' : 'right-0 w-0.5',
            )}
            initial={false}
            animate={indicatorStyle}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
          />
        )}
      </TabList>

      <TabPanels className={twMerge('flex-1', sizes.panel)}>
        {items.map((item) => (
          <TabPanel key={item.key} className="focus:outline-none">
            {item.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}

Tabs.displayName = 'Tabs';

export default Tabs;
