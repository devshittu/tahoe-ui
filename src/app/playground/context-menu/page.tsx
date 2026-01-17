// src/app/playground/context-menu/page.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '@/components/Typography';
import { HeadlineBlock } from '../headline/components';
import { ContextMenu, type ContextMenuItemData } from './components';
import {
  FiCopy,
  FiClipboard,
  FiScissors,
  FiTrash2,
  FiEdit2,
  FiShare2,
  FiDownload,
  FiFolder,
  FiFile,
  FiImage,
  FiRefreshCw,
  FiInfo,
  FiExternalLink,
  FiStar,
  FiBookmark,
  FiMail,
  FiMessageSquare,
} from 'react-icons/fi';

// Basic edit menu items
const BASIC_ITEMS: ContextMenuItemData[] = [
  {
    id: 'copy',
    type: 'item',
    label: 'Copy',
    icon: <FiCopy />,
    shortcut: '⌘C',
    onSelect: () => console.log('Copy'),
  },
  {
    id: 'cut',
    type: 'item',
    label: 'Cut',
    icon: <FiScissors />,
    shortcut: '⌘X',
    onSelect: () => console.log('Cut'),
  },
  {
    id: 'paste',
    type: 'item',
    label: 'Paste',
    icon: <FiClipboard />,
    shortcut: '⌘V',
    onSelect: () => console.log('Paste'),
  },
  { id: 'sep1', type: 'separator' },
  {
    id: 'delete',
    type: 'item',
    label: 'Delete',
    icon: <FiTrash2 />,
    danger: true,
    onSelect: () => console.log('Delete'),
  },
];

// File menu with submenus
const FILE_ITEMS: ContextMenuItemData[] = [
  {
    id: 'new',
    type: 'item',
    label: 'New',
    icon: <FiFile />,
    shortcut: '⌘N',
    submenu: [
      {
        id: 'new-file',
        type: 'item',
        label: 'File',
        icon: <FiFile />,
        onSelect: () => console.log('New File'),
      },
      {
        id: 'new-folder',
        type: 'item',
        label: 'Folder',
        icon: <FiFolder />,
        onSelect: () => console.log('New Folder'),
      },
      {
        id: 'new-image',
        type: 'item',
        label: 'Image',
        icon: <FiImage />,
        onSelect: () => console.log('New Image'),
      },
    ],
  },
  {
    id: 'open',
    type: 'item',
    label: 'Open',
    icon: <FiFolder />,
    shortcut: '⌘O',
    onSelect: () => console.log('Open'),
  },
  { id: 'sep1', type: 'separator' },
  {
    id: 'share',
    type: 'item',
    label: 'Share',
    icon: <FiShare2 />,
    submenu: [
      {
        id: 'share-email',
        type: 'item',
        label: 'Email',
        icon: <FiMail />,
        onSelect: () => console.log('Share via Email'),
      },
      {
        id: 'share-message',
        type: 'item',
        label: 'Message',
        icon: <FiMessageSquare />,
        onSelect: () => console.log('Share via Message'),
      },
      {
        id: 'share-link',
        type: 'item',
        label: 'Copy Link',
        icon: <FiExternalLink />,
        onSelect: () => console.log('Copy Link'),
      },
    ],
  },
  {
    id: 'download',
    type: 'item',
    label: 'Download',
    icon: <FiDownload />,
    shortcut: '⌘D',
    onSelect: () => console.log('Download'),
  },
];

// Link menu with labels
const LINK_ITEMS: ContextMenuItemData[] = [
  { id: 'label-link', type: 'label', label: 'Link Actions' },
  {
    id: 'open-link',
    type: 'item',
    label: 'Open Link',
    icon: <FiExternalLink />,
    onSelect: () => console.log('Open Link'),
  },
  {
    id: 'open-new-tab',
    type: 'item',
    label: 'Open in New Tab',
    icon: <FiExternalLink />,
    shortcut: '⌘⇧Click',
    onSelect: () => console.log('Open in New Tab'),
  },
  {
    id: 'copy-link',
    type: 'item',
    label: 'Copy Link Address',
    icon: <FiCopy />,
    onSelect: () => console.log('Copy Link'),
  },
  { id: 'sep1', type: 'separator' },
  { id: 'label-page', type: 'label', label: 'Page Actions' },
  {
    id: 'bookmark',
    type: 'item',
    label: 'Add Bookmark',
    icon: <FiBookmark />,
    shortcut: '⌘D',
    onSelect: () => console.log('Bookmark'),
  },
  {
    id: 'favorite',
    type: 'item',
    label: 'Add to Favorites',
    icon: <FiStar />,
    onSelect: () => console.log('Favorite'),
  },
];

// Disabled items example
const DISABLED_ITEMS: ContextMenuItemData[] = [
  {
    id: 'enabled',
    type: 'item',
    label: 'Enabled Action',
    icon: <FiEdit2 />,
    onSelect: () => console.log('Enabled'),
  },
  {
    id: 'disabled',
    type: 'item',
    label: 'Disabled Action',
    icon: <FiRefreshCw />,
    disabled: true,
    onSelect: () => console.log('This should not fire'),
  },
  { id: 'sep1', type: 'separator' },
  {
    id: 'info',
    type: 'item',
    label: 'Get Info',
    icon: <FiInfo />,
    shortcut: '⌘I',
    onSelect: () => console.log('Get Info'),
  },
];

export default function ContextMenuPlayground() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Create items with tracking
  const createTrackedItems = (
    items: ContextMenuItemData[],
  ): ContextMenuItemData[] =>
    items.map((item) => ({
      ...item,
      onSelect: item.onSelect
        ? () => {
            item.onSelect?.();
            setLastAction(item.label || item.id);
          }
        : undefined,
      submenu: item.submenu ? createTrackedItems(item.submenu) : undefined,
    }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Page Header */}
        <HeadlineBlock
          headline="Context Menu"
          subheadline="Cross-platform context menu with right-click and long-press support for touch devices."
          size="medium"
        />

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Text fontWeight="medium" color="primary">
                Desktop
              </Text>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Right-click on any demo area to open the context menu.
              </p>
            </div>
            <div className="space-y-2">
              <Text fontWeight="medium" color="primary">
                Touch Devices
              </Text>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Long-press (hold for 500ms) to open the context menu.
              </p>
            </div>
          </div>
          {lastAction && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Text color="secondary" className="text-sm">
                Last action:{' '}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {lastAction}
                </span>
              </Text>
            </div>
          )}
        </div>

        {/* Behavior Modes Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Behavior Modes
          </Text>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <code className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">
                behavior=&quot;contextual&quot;
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Menu scrolls with page, auto-closes on scroll. Traditional
                context menu behavior.
              </p>
            </div>
            <div className="space-y-2">
              <code className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm">
                behavior=&quot;modal&quot;
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fixed viewport position with optional backdrop. Blocks other
                interactions until dismissed.
              </p>
            </div>
          </div>
        </div>

        {/* Contextual Mode (Default) */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Contextual Mode (Default)
          </Text>
          <Text color="secondary" className="text-sm">
            Scrolls with page, closes on scroll. Try scrolling while menu is
            open.
          </Text>
          <ContextMenu
            items={createTrackedItems(BASIC_ITEMS)}
            behavior="contextual"
            closeOnScroll
            onOpen={() => console.log('Contextual menu opened')}
            onClose={() => console.log('Contextual menu closed')}
          >
            <div
              className={cn(
                'p-8 rounded-2xl',
                'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
                'border border-blue-200/50 dark:border-blue-700/50',
                'flex items-center justify-center min-h-[200px]',
                'select-none cursor-context-menu',
              )}
            >
              <div className="text-center">
                <Text fontWeight="medium" color="primary">
                  Right-click or long-press here
                </Text>
                <Text color="secondary" className="text-sm mt-1">
                  Basic edit actions with keyboard shortcuts
                </Text>
              </div>
            </div>
          </ContextMenu>
        </div>

        {/* Modal Mode with Backdrop */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Modal Mode with Backdrop
          </Text>
          <Text color="secondary" className="text-sm">
            Fixed position, semi-transparent backdrop blocks interactions.
          </Text>
          <ContextMenu
            items={createTrackedItems(BASIC_ITEMS)}
            behavior="modal"
            showBackdrop
            backdropOpacity={0.3}
            onOpen={() => console.log('Modal menu opened')}
            onClose={() => console.log('Modal menu closed')}
          >
            <div
              className={cn(
                'p-8 rounded-2xl',
                'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
                'border border-purple-200/50 dark:border-purple-700/50',
                'flex items-center justify-center min-h-[200px]',
                'select-none cursor-context-menu',
              )}
            >
              <div className="text-center">
                <Text fontWeight="medium" color="primary">
                  Right-click or long-press here
                </Text>
                <Text color="secondary" className="text-sm mt-1">
                  Modal with backdrop overlay
                </Text>
              </div>
            </div>
          </ContextMenu>
        </div>

        {/* Modal Mode without Backdrop */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Modal Mode (No Backdrop)
          </Text>
          <Text color="secondary" className="text-sm">
            Fixed position without backdrop, but still blocks scroll
            interaction.
          </Text>
          <ContextMenu
            items={createTrackedItems(BASIC_ITEMS)}
            behavior="modal"
            showBackdrop={false}
            onOpen={() => console.log('Modal (no backdrop) opened')}
            onClose={() => console.log('Modal (no backdrop) closed')}
          >
            <div
              className={cn(
                'p-8 rounded-2xl',
                'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
                'border border-indigo-200/50 dark:border-indigo-700/50',
                'flex items-center justify-center min-h-[200px]',
                'select-none cursor-context-menu',
              )}
            >
              <div className="text-center">
                <Text fontWeight="medium" color="primary">
                  Right-click or long-press here
                </Text>
                <Text color="secondary" className="text-sm mt-1">
                  Modal without backdrop
                </Text>
              </div>
            </div>
          </ContextMenu>
        </div>

        {/* File Menu with Submenus */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            With Submenus
          </Text>
          <ContextMenu items={createTrackedItems(FILE_ITEMS)}>
            <div
              className={cn(
                'p-8 rounded-2xl',
                'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
                'border border-green-200/50 dark:border-green-700/50',
                'flex items-center justify-center min-h-[200px]',
                'select-none cursor-context-menu',
              )}
            >
              <div className="text-center">
                <Text fontWeight="medium" color="primary">
                  File operations menu
                </Text>
                <Text color="secondary" className="text-sm mt-1">
                  Includes nested submenus for New and Share
                </Text>
              </div>
            </div>
          </ContextMenu>
        </div>

        {/* Link Menu with Labels */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            With Section Labels
          </Text>
          <ContextMenu items={createTrackedItems(LINK_ITEMS)}>
            <div
              className={cn(
                'p-8 rounded-2xl',
                'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
                'border border-purple-200/50 dark:border-purple-700/50',
                'flex items-center justify-center min-h-[200px]',
                'select-none cursor-context-menu',
              )}
            >
              <div className="text-center">
                <Text fontWeight="medium" color="primary">
                  Link context menu
                </Text>
                <Text color="secondary" className="text-sm mt-1">
                  Grouped sections with non-interactive labels
                </Text>
              </div>
            </div>
          </ContextMenu>
        </div>

        {/* Disabled Items */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            With Disabled Items
          </Text>
          <ContextMenu items={createTrackedItems(DISABLED_ITEMS)}>
            <div
              className={cn(
                'p-8 rounded-2xl',
                'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20',
                'border border-amber-200/50 dark:border-amber-700/50',
                'flex items-center justify-center min-h-[200px]',
                'select-none cursor-context-menu',
              )}
            >
              <div className="text-center">
                <Text fontWeight="medium" color="primary">
                  Mixed enabled/disabled
                </Text>
                <Text color="secondary" className="text-sm mt-1">
                  Some items are disabled and non-interactive
                </Text>
              </div>
            </div>
          </ContextMenu>
        </div>

        {/* Grid Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Multiple Triggers
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Item A', 'Item B', 'Item C', 'Item D'].map((name) => (
              <ContextMenu
                key={name}
                items={[
                  {
                    id: 'name',
                    type: 'label',
                    label: name,
                  },
                  { id: 'sep', type: 'separator' },
                  {
                    id: 'edit',
                    type: 'item',
                    label: `Edit ${name}`,
                    icon: <FiEdit2 />,
                    onSelect: () => setLastAction(`Edit ${name}`),
                  },
                  {
                    id: 'delete',
                    type: 'item',
                    label: `Delete ${name}`,
                    icon: <FiTrash2 />,
                    danger: true,
                    onSelect: () => setLastAction(`Delete ${name}`),
                  },
                ]}
              >
                <div
                  className={cn(
                    'p-6 rounded-xl',
                    'bg-white dark:bg-gray-800',
                    'border border-gray-200 dark:border-gray-700',
                    'hover:border-gray-300 dark:hover:border-gray-600',
                    'transition-colors',
                    'flex items-center justify-center',
                    'select-none cursor-context-menu',
                  )}
                >
                  <Text fontWeight="medium">{name}</Text>
                </div>
              </ContextMenu>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Features
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Right-click for desktop</p>
              <p>Long-press (500ms) for touch</p>
              <p>Keyboard navigation with arrows</p>
              <p>Escape to close</p>
              <p>Click outside to dismiss</p>
              <p>Viewport-aware positioning</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Configuration
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  behavior
                </code>{' '}
                - modal | contextual
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  showBackdrop
                </code>{' '}
                - modal backdrop
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  closeOnScroll
                </code>{' '}
                - auto-close
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  closeOnEscape
                </code>{' '}
                - ESC key
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Item Types
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  item
                </code>{' '}
                - Interactive menu item
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  separator
                </code>{' '}
                - Visual divider
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  label
                </code>{' '}
                - Non-interactive heading
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  submenu
                </code>{' '}
                - Nested menu items
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
