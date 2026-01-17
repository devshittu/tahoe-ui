// src/app/playground/command-menu/page.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Heading, Text, Paragraph } from '@/components/Typography';
import { CommandMenu, useCommandMenu } from './components';
import type {
  CommandItem,
  CommandGroup,
  CommandMenuSize,
  HandlebarPosition,
} from './components';
import {
  FiHome,
  FiSettings,
  FiUser,
  FiSearch,
  FiFile,
  FiFolder,
  FiMail,
  FiCalendar,
  FiStar,
  FiTrash2,
  FiCopy,
  FiDownload,
  FiUpload,
  FiShare2,
  FiLock,
  FiUnlock,
  FiRefreshCw,
  FiInfo,
} from 'react-icons/fi';

// Example commands
const EXAMPLE_COMMANDS: CommandItem[] = [
  {
    id: 'home',
    label: 'Go to Home',
    description: 'Navigate to the home page',
    icon: <FiHome className="w-4 h-4" />,
    shortcut: '⌘H',
    onSelect: () => console.log('Navigate to home'),
    keywords: ['dashboard', 'main'],
  },
  {
    id: 'settings',
    label: 'Open Settings',
    description: 'Configure your preferences',
    icon: <FiSettings className="w-4 h-4" />,
    shortcut: '⌘,',
    onSelect: () => console.log('Open settings'),
    keywords: ['preferences', 'config'],
  },
  {
    id: 'profile',
    label: 'View Profile',
    description: 'See your profile information',
    icon: <FiUser className="w-4 h-4" />,
    onSelect: () => console.log('View profile'),
    keywords: ['account', 'user'],
  },
];

const EXAMPLE_GROUPS: CommandGroup[] = [
  {
    id: 'navigation',
    heading: 'Navigation',
    items: [
      {
        id: 'search',
        label: 'Search',
        description: 'Search across all content',
        icon: <FiSearch className="w-4 h-4" />,
        shortcut: '⌘F',
        onSelect: () => console.log('Open search'),
        keywords: ['find', 'lookup'],
      },
      {
        id: 'files',
        label: 'Browse Files',
        description: 'Open file browser',
        icon: <FiFile className="w-4 h-4" />,
        onSelect: () => console.log('Browse files'),
      },
      {
        id: 'folders',
        label: 'Browse Folders',
        description: 'Open folder navigator',
        icon: <FiFolder className="w-4 h-4" />,
        onSelect: () => console.log('Browse folders'),
      },
    ],
  },
  {
    id: 'actions',
    heading: 'Actions',
    items: [
      {
        id: 'copy',
        label: 'Copy',
        description: 'Copy to clipboard',
        icon: <FiCopy className="w-4 h-4" />,
        shortcut: '⌘C',
        onSelect: () => console.log('Copy'),
      },
      {
        id: 'download',
        label: 'Download',
        description: 'Download selected items',
        icon: <FiDownload className="w-4 h-4" />,
        shortcut: '⌘D',
        onSelect: () => console.log('Download'),
      },
      {
        id: 'upload',
        label: 'Upload',
        description: 'Upload new files',
        icon: <FiUpload className="w-4 h-4" />,
        shortcut: '⌘U',
        onSelect: () => console.log('Upload'),
      },
      {
        id: 'share',
        label: 'Share',
        description: 'Share with others',
        icon: <FiShare2 className="w-4 h-4" />,
        onSelect: () => console.log('Share'),
      },
    ],
  },
  {
    id: 'productivity',
    heading: 'Productivity',
    items: [
      {
        id: 'mail',
        label: 'Compose Email',
        description: 'Write a new email',
        icon: <FiMail className="w-4 h-4" />,
        onSelect: () => console.log('Compose email'),
        keywords: ['email', 'message'],
      },
      {
        id: 'calendar',
        label: 'Open Calendar',
        description: 'View your schedule',
        icon: <FiCalendar className="w-4 h-4" />,
        onSelect: () => console.log('Open calendar'),
        keywords: ['schedule', 'events'],
      },
      {
        id: 'favorites',
        label: 'View Favorites',
        description: 'See starred items',
        icon: <FiStar className="w-4 h-4" />,
        onSelect: () => console.log('View favorites'),
        keywords: ['starred', 'bookmarks'],
      },
    ],
  },
  {
    id: 'system',
    heading: 'System',
    items: [
      {
        id: 'lock',
        label: 'Lock Screen',
        description: 'Lock the application',
        icon: <FiLock className="w-4 h-4" />,
        shortcut: '⌘L',
        onSelect: () => console.log('Lock screen'),
      },
      {
        id: 'refresh',
        label: 'Refresh',
        description: 'Reload current view',
        icon: <FiRefreshCw className="w-4 h-4" />,
        shortcut: '⌘R',
        onSelect: () => console.log('Refresh'),
        keywords: ['reload'],
      },
      {
        id: 'trash',
        label: 'Move to Trash',
        description: 'Delete selected items',
        icon: <FiTrash2 className="w-4 h-4" />,
        shortcut: '⌘⌫',
        onSelect: () => console.log('Move to trash'),
        keywords: ['delete', 'remove'],
      },
    ],
  },
];

const SIZE_OPTIONS: CommandMenuSize[] = ['sm', 'md', 'lg', 'xl', 'full'];
const HANDLEBAR_OPTIONS: HandlebarPosition[] = ['none', 'top', 'bottom'];

export default function CommandMenuPlayground() {
  const { open, setOpen, toggle } = useCommandMenu();
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [size, setSize] = useState<CommandMenuSize>('lg');
  const [handlebarPosition, setHandlebarPosition] =
    useState<HandlebarPosition>('none');

  // Create commands with action logging
  const commandsWithLogging = EXAMPLE_COMMANDS.map((cmd) => ({
    ...cmd,
    onSelect: () => {
      setLastAction(cmd.label);
      cmd.onSelect();
    },
  }));

  const groupsWithLogging = EXAMPLE_GROUPS.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      onSelect: () => {
        setLastAction(item.label);
        item.onSelect();
      },
    })),
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Heading size="2xl" color="primary" className="font-bold">
            Command Menu
          </Heading>
          <Paragraph color="secondary" className="max-w-2xl mx-auto">
            Raycast/Spotlight style command palette with fuzzy search, keyboard
            navigation, and grouped commands. Press{' '}
            <kbd className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-800 text-sm font-mono">
              ⌘K
            </kbd>{' '}
            to open.
          </Paragraph>
        </div>

        {/* Configuration Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Size */}
            <div className="space-y-3">
              <Text fontWeight="medium" color="primary">
                Size
              </Text>
              <div className="flex flex-wrap gap-2">
                {SIZE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      size === s
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Handlebar */}
            <div className="space-y-3">
              <Text fontWeight="medium" color="primary">
                Handlebar Position
              </Text>
              <div className="flex flex-wrap gap-2">
                {HANDLEBAR_OPTIONS.map((h) => (
                  <button
                    key={h}
                    onClick={() => setHandlebarPosition(h)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      handlebarPosition === h
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Demo trigger */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <button
              onClick={toggle}
              className={cn(
                'flex items-center gap-3 px-6 py-3 rounded-xl',
                'bg-gray-900 dark:bg-gray-100',
                'text-white dark:text-gray-900',
                'font-medium',
                'hover:bg-gray-800 dark:hover:bg-gray-200',
                'transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
              )}
            >
              <FiSearch className="w-5 h-5" />
              Open Command Menu
              <kbd className="ml-2 px-2 py-0.5 rounded bg-white/20 text-sm">
                ⌘K
              </kbd>
            </button>

            {lastAction && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Last action:</span>
                <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-medium">
                  {lastAction}
                </span>
              </div>
            )}

            <div className="text-xs text-gray-500 dark:text-gray-400">
              Current: size={size}, handlebar={handlebarPosition}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Keyboard Navigation
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                  ⌘K
                </kbd>
                <span>Open command menu</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                  ↑↓
                </kbd>
                <span>Navigate options</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                  ↵
                </kbd>
                <span>Select option</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                  Esc
                </kbd>
                <span>Close menu</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Search Features
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>• Searches across labels, descriptions, and keywords</p>
              <p>• Grouped results by category</p>
              <p>• Shows keyboard shortcuts inline</p>
              <p>• Empty state when no matches</p>
            </div>
          </div>
        </div>

        {/* Dismissal Info */}
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800 p-6">
          <div className="flex gap-3">
            <FiInfo className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <Text fontWeight="medium" color="primary">
                Natural Dismissal
              </Text>
              <Text color="secondary" className="text-sm">
                The command menu follows the no-X design philosophy. Close it by
                pressing Escape, clicking outside, or selecting a command. No
                close button needed.
              </Text>
            </div>
          </div>
        </div>

        {/* Command Menu */}
        <CommandMenu
          open={open}
          onOpenChange={setOpen}
          commands={commandsWithLogging}
          groups={groupsWithLogging}
          size={size}
          handlebar={handlebarPosition}
        />
      </div>
    </div>
  );
}
