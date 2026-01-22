'use client';

import React, { useState } from 'react';
import { MenuItem, Menu, MenuItems, MenuButton } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import { FiChevronRight } from 'react-icons/fi';
import type { ContextMenuItemData, ContextMenuItemProps } from './types';
import { CONTEXT_MENU_STYLES } from './types';

/**
 * ContextMenuItem - Individual menu item with submenu support
 *
 * Features:
 * - Keyboard shortcut display
 * - Icon support
 * - Danger/destructive styling
 * - Nested submenu support
 * - Disabled state
 * - CSS variable-backed colors
 */
export function ContextMenuItem({ item, onClose }: ContextMenuItemProps) {
  const { type, label, icon, shortcut, onSelect, disabled, danger, submenu } =
    item;

  // Separator
  if (type === 'separator') {
    return (
      <div
        className={twMerge('my-1 h-px', CONTEXT_MENU_STYLES.separator)}
        role="separator"
      />
    );
  }

  // Label (non-interactive heading)
  if (type === 'label') {
    return (
      <div
        className={twMerge(
          'px-3 py-1.5 text-xs font-medium uppercase tracking-wider',
          CONTEXT_MENU_STYLES.label,
        )}
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
          className={twMerge(
            'flex w-full items-center gap-3 px-3 py-2 text-sm',
            'rounded-md outline-none',
            'transition-colors duration-75',
            danger
              ? twMerge(
                  CONTEXT_MENU_STYLES.danger.base,
                  focus && CONTEXT_MENU_STYLES.danger.hover,
                )
              : twMerge(
                  CONTEXT_MENU_STYLES.item.base,
                  focus && CONTEXT_MENU_STYLES.item.hover,
                ),
            disabled && CONTEXT_MENU_STYLES.item.disabled,
          )}
        >
          {icon && (
            <span
              className={twMerge(
                'w-4 h-4 flex items-center justify-center',
                danger
                  ? CONTEXT_MENU_STYLES.danger.icon
                  : CONTEXT_MENU_STYLES.item.icon,
              )}
            >
              {icon}
            </span>
          )}
          <span className="flex-1 text-left">{label}</span>
          {shortcut && (
            <span
              className={twMerge(
                'text-xs font-mono',
                CONTEXT_MENU_STYLES.item.shortcut,
              )}
            >
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
  children: React.ReactElement | React.ReactElement[];
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
          className={twMerge(
            'flex w-full items-center gap-3 px-3 py-2 text-sm',
            'rounded-md outline-none',
            'transition-colors duration-75',
            CONTEXT_MENU_STYLES.item.base,
            isHovered && CONTEXT_MENU_STYLES.item.hover,
            disabled && CONTEXT_MENU_STYLES.item.disabled,
          )}
        >
          {icon != null && (
            <span
              className={twMerge(
                'w-4 h-4 flex items-center justify-center',
                CONTEXT_MENU_STYLES.item.icon,
              )}
            >
              {icon}
            </span>
          )}
          <span className="flex-1 text-left">{label}</span>
          <FiChevronRight
            className={twMerge('w-4 h-4', CONTEXT_MENU_STYLES.item.icon)}
          />
        </MenuButton>

        {isHovered && (
          <MenuItems
            static
            anchor="right start"
            className={twMerge(
              'z-50 min-w-[180px] p-1',
              'rounded-lg outline-none',
              CONTEXT_MENU_STYLES.menu.base,
              CONTEXT_MENU_STYLES.menu.border,
              CONTEXT_MENU_STYLES.menu.shadow,
            )}
          >
            <>{children}</>
          </MenuItems>
        )}
      </Menu>
    </div>
  );
}

export default ContextMenuItem;
