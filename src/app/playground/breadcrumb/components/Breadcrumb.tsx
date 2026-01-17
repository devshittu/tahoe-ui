// src/app/playground/breadcrumb/components/Breadcrumb.tsx
'use client';

import React, { useMemo } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FiHome, FiMoreHorizontal } from 'react-icons/fi';
import Link from 'next/link';
import type { BreadcrumbProps, BreadcrumbItemData } from './types';
import { BREADCRUMB_SIZE_CONFIG } from './types';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

/**
 * Breadcrumb - Animated navigation breadcrumb with overflow handling
 *
 * Features:
 * - Animated item transitions
 * - Collapsible overflow with dropdown for long paths
 * - Multiple separator styles
 * - Keyboard navigation
 * - Next.js Link integration
 * - Home icon support
 *
 * Design Principles:
 * - #7 Intuitive Interaction: Standard navigation pattern
 * - #13 Predictable Navigation: Always know where you are
 * - #6 Purposeful Motion: Subtle entrance animations
 */
export function Breadcrumb({
  items,
  separator = 'chevron',
  size = 'md',
  maxItems = 0,
  showHomeIcon = false,
  onItemClick,
  className,
}: BreadcrumbProps) {
  const config = BREADCRUMB_SIZE_CONFIG[size];

  // Calculate visible and collapsed items
  const { visibleItems, collapsedItems } = useMemo(() => {
    if (maxItems <= 0 || items.length <= maxItems) {
      return { visibleItems: items, collapsedItems: [] };
    }

    // Keep first item, last (maxItems - 2) items, collapse the middle
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 2));
    const middleItems = items.slice(1, -(maxItems - 2));

    return {
      visibleItems: [firstItem, ...lastItems],
      collapsedItems: middleItems,
    };
  }, [items, maxItems]);

  // Prepare first item with optional home icon
  const firstItem = visibleItems[0];
  const displayItems =
    showHomeIcon && firstItem
      ? [
          {
            ...firstItem,
            icon: firstItem.icon || <FiHome className={config.icon} />,
          },
          ...visibleItems.slice(1),
        ]
      : visibleItems;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={cn('flex items-center flex-wrap', config.gap)}>
        <AnimatePresence mode="popLayout">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isFirstAfterCollapsed =
              index === 1 && collapsedItems.length > 0;

            return (
              <React.Fragment key={item.id}>
                {/* Show collapsed dropdown after first item */}
                {isFirstAfterCollapsed && (
                  <motion.li
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center"
                  >
                    <CollapsedDropdown
                      items={collapsedItems}
                      size={size}
                      onItemClick={onItemClick}
                    />
                    <span className="mx-1">
                      <BreadcrumbSeparator type={separator} size={size} />
                    </span>
                  </motion.li>
                )}

                <BreadcrumbItem
                  item={item}
                  isLast={isLast}
                  separator={separator}
                  size={size}
                  onClick={onItemClick}
                />
              </React.Fragment>
            );
          })}
        </AnimatePresence>
      </ol>
    </nav>
  );
}

/**
 * CollapsedDropdown - Dropdown menu for collapsed breadcrumb items
 */
function CollapsedDropdown({
  items,
  size,
  onItemClick,
}: {
  items: BreadcrumbItemData[];
  size: 'sm' | 'md' | 'lg';
  onItemClick?: (item: BreadcrumbItemData) => void;
}) {
  const config = BREADCRUMB_SIZE_CONFIG[size];

  return (
    <Menu as="div" className="relative">
      <MenuButton
        className={cn(
          'inline-flex items-center justify-center',
          'rounded-md',
          config.padding,
          'text-gray-500 dark:text-gray-400',
          'hover:text-gray-700 dark:hover:text-gray-200',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400',
        )}
        aria-label={`${items.length} more items`}
      >
        <FiMoreHorizontal className={config.icon} />
      </MenuButton>

      <MenuItems
        transition
        className={cn(
          'absolute left-0 top-full mt-1 z-50',
          'min-w-[160px] max-w-[240px]',
          'bg-white dark:bg-gray-900',
          'rounded-lg shadow-lg',
          'border border-gray-200 dark:border-gray-700',
          'py-1',
          'focus:outline-none',
          // HeadlessUI transition classes
          'transition duration-100 ease-out',
          'data-[closed]:scale-95 data-[closed]:opacity-0',
        )}
      >
        {items.map((item) => (
          <MenuItem key={item.id}>
            {({ focus }) => {
              const itemContent = (
                <span className={cn('flex items-center', config.gap)}>
                  {item.icon && (
                    <span className="flex-shrink-0">{item.icon}</span>
                  )}
                  <span className="truncate">{item.label}</span>
                </span>
              );

              const itemClasses = cn(
                'w-full px-3 py-2 text-left',
                config.text,
                'transition-colors duration-75',
                focus
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  : 'text-gray-700 dark:text-gray-300',
              );

              if (item.href) {
                return (
                  <Link href={item.href} className={cn(itemClasses, 'block')}>
                    {itemContent}
                  </Link>
                );
              }

              return (
                <button
                  type="button"
                  onClick={() => onItemClick?.(item)}
                  className={itemClasses}
                >
                  {itemContent}
                </button>
              );
            }}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default Breadcrumb;
