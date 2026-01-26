// src/app/playground/context-menu/components/ContextMenuItem.tsx
'use client';

import React, { useState } from 'react';
import { MenuItem, Menu, MenuItems, MenuButton } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { FiChevronRight } from 'react-icons/fi';
import type { ContextMenuItemData } from './types';

interface ContextMenuItemProps {
  item: ContextMenuItemData;
  onClose: () => void;
}

/**
 * ContextMenuItem - Individual menu item with submenu support
 *
 * Features:
 * - Keyboard shortcut display
 * - Icon support
 * - Danger/destructive styling
 * - Nested submenu support
 * - Disabled state
 */
export function ContextMenuItem({ item, onClose }: ContextMenuItemProps) {
  const { type, label, icon, shortcut, onSelect, disabled, danger, submenu } =
    item;

  // Separator
  if (type === 'separator') {
    return (
      <div
        className="my-1 h-px bg-gray-200 dark:bg-gray-700"
        role="separator"
      />
    );
  }

  // Label (non-interactive heading)
  if (type === 'label') {
    return (
      <div
        className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
        role="presentation"
      >
        {label}
      </div>
    );
  }

  // Submenu item
  if (submenu && submenu.length > 0) {
    return (
      <SubmenuItem item={item} onClose={onClose}>
        {submenu.map((subItem) => (
          <ContextMenuItem key={subItem.id} item={subItem} onClose={onClose} />
        ))}
      </SubmenuItem>
    );
  }

  // Regular menu item
  const handleClick = () => {
    if (!disabled) {
      onSelect?.();
      onClose();
    }
  };

  return (
    <MenuItem disabled={disabled}>
      {({ focus }) => (
        <button
          type="button"
          onClick={handleClick}
          className={cn(
            'flex w-full items-center gap-3 px-3 py-2 text-sm',
            'rounded-md outline-none',
            'transition-colors duration-75',
            danger
              ? cn(
                  'text-red-600 dark:text-red-400',
                  focus && 'bg-red-50 dark:bg-red-900/20',
                )
              : cn(
                  'text-gray-700 dark:text-gray-200',
                  focus && 'bg-gray-100 dark:bg-gray-700',
                ),
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          {icon && (
            <span
              className={cn(
                'w-4 h-4 flex items-center justify-center',
                danger
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400',
              )}
            >
              {icon}
            </span>
          )}
          <span className="flex-1 text-left">{label}</span>
          {shortcut && (
            <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
              {shortcut}
            </span>
          )}
        </button>
      )}
    </MenuItem>
  );
}

/**
 * SubmenuItem - Menu item that opens a nested submenu on hover
 */
function SubmenuItem({
  item,
  onClose,
  children,
}: {
  item: ContextMenuItemData;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const { label, icon, disabled } = item;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Menu>
        <MenuButton
          disabled={disabled}
          className={cn(
            'flex w-full items-center gap-3 px-3 py-2 text-sm',
            'rounded-md outline-none',
            'transition-colors duration-75',
            'text-gray-700 dark:text-gray-200',
            isHovered && 'bg-gray-100 dark:bg-gray-700',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          {icon && (
            <span className="w-4 h-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
              {icon}
            </span>
          )}
          <span className="flex-1 text-left">{label}</span>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
        </MenuButton>

        {isHovered && (
          <MenuItems
            static
            anchor="right start"
            className={cn(
              'z-50 min-w-[180px] p-1',
              'rounded-lg outline-none',
              'bg-white dark:bg-gray-800',
              'border border-gray-200 dark:border-gray-700',
              'shadow-lg shadow-black/10 dark:shadow-black/30',
            )}
          >
            {children}
          </MenuItems>
        )}
      </Menu>
    </div>
  );
}

export default ContextMenuItem;
