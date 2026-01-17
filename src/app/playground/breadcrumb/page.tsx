// src/app/playground/breadcrumb/page.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '@/components/Typography';
import { HeadlineBlock } from '../headline/components';
import {
  Breadcrumb,
  type BreadcrumbItemData,
  type BreadcrumbSeparatorType,
  type BreadcrumbSize,
} from './components';
import { FiFolder, FiFile, FiSettings, FiUser, FiBox } from 'react-icons/fi';

const SEPARATOR_OPTIONS: BreadcrumbSeparatorType[] = [
  'chevron',
  'slash',
  'arrow',
  'dot',
];
const SIZE_OPTIONS: BreadcrumbSize[] = ['sm', 'md', 'lg'];

// Example breadcrumb paths
const SIMPLE_PATH: BreadcrumbItemData[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'electronics', label: 'Electronics', href: '/products/electronics' },
  { id: 'phones', label: 'Phones', current: true },
];

const LONG_PATH: BreadcrumbItemData[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'documents', label: 'Documents', href: '/documents' },
  { id: 'projects', label: 'Projects', href: '/documents/projects' },
  { id: '2024', label: '2024', href: '/documents/projects/2024' },
  { id: 'q4', label: 'Q4', href: '/documents/projects/2024/q4' },
  {
    id: 'reports',
    label: 'Reports',
    href: '/documents/projects/2024/q4/reports',
  },
  { id: 'final', label: 'Final Report.pdf', current: true },
];

const PATH_WITH_ICONS: BreadcrumbItemData[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: <FiFolder className="w-4 h-4" />,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: <FiSettings className="w-4 h-4" />,
  },
  {
    id: 'account',
    label: 'Account',
    href: '/settings/account',
    icon: <FiUser className="w-4 h-4" />,
  },
  {
    id: 'profile',
    label: 'Profile',
    current: true,
    icon: <FiFile className="w-4 h-4" />,
  },
];

export default function BreadcrumbPlayground() {
  const [separator, setSeparator] =
    useState<BreadcrumbSeparatorType>('chevron');
  const [size, setSize] = useState<BreadcrumbSize>('md');
  const [maxItems, setMaxItems] = useState(0);
  const [showHomeIcon, setShowHomeIcon] = useState(false);
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  const handleItemClick = (item: BreadcrumbItemData) => {
    setLastClicked(item.label);
    console.log('Clicked:', item);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Page Header */}
        <HeadlineBlock
          headline="Breadcrumb Navigator"
          subheadline="Animated path navigation with overflow handling, multiple separator styles, and Next.js integration."
          size="medium"
        />

        {/* Configuration Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Separator */}
            <div className="space-y-3">
              <Text fontWeight="medium" color="primary">
                Separator
              </Text>
              <div className="flex flex-wrap gap-2">
                {SEPARATOR_OPTIONS.map((sep) => (
                  <button
                    key={sep}
                    onClick={() => setSeparator(sep)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      separator === sep
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    {sep}
                  </button>
                ))}
              </div>
            </div>

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

            {/* Max Items */}
            <div className="space-y-3">
              <Text fontWeight="medium" color="primary">
                Max Items (0 = no limit)
              </Text>
              <div className="flex flex-wrap gap-2">
                {[0, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setMaxItems(num)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      maxItems === num
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    {num === 0 ? 'None' : num}
                  </button>
                ))}
              </div>
            </div>

            {/* Home Icon */}
            <div className="space-y-3">
              <Text fontWeight="medium" color="primary">
                Home Icon
              </Text>
              <button
                onClick={() => setShowHomeIcon(!showHomeIcon)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  showHomeIcon
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                )}
              >
                {showHomeIcon ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Interactive Demo
          </Text>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <Breadcrumb
              items={SIMPLE_PATH}
              separator={separator}
              size={size}
              maxItems={maxItems}
              showHomeIcon={showHomeIcon}
              onItemClick={handleItemClick}
            />

            {lastClicked && (
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Last clicked: <span className="font-medium">{lastClicked}</span>
              </div>
            )}
          </div>
        </div>

        {/* Long Path with Collapse */}
        <div className="space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Long Path (Collapsible)
          </Text>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-3">
                <span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  maxItems: 4
                </span>
              </div>
              <Breadcrumb
                items={LONG_PATH}
                separator="chevron"
                size="md"
                maxItems={4}
                showHomeIcon
                onItemClick={handleItemClick}
              />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="mb-3">
                <span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  No collapse
                </span>
              </div>
              <Breadcrumb
                items={LONG_PATH}
                separator="chevron"
                size="md"
                showHomeIcon
                onItemClick={handleItemClick}
              />
            </div>
          </div>
        </div>

        {/* With Icons */}
        <div className="space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            With Custom Icons
          </Text>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <Breadcrumb
              items={PATH_WITH_ICONS}
              separator="chevron"
              size="md"
              onItemClick={handleItemClick}
            />
          </div>
        </div>

        {/* Separator Comparison */}
        <div className="space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Separator Styles
          </Text>

          <div className="grid gap-4">
            {SEPARATOR_OPTIONS.map((sep) => (
              <div
                key={sep}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
              >
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {sep}
                  </span>
                </div>
                <Breadcrumb
                  items={SIMPLE_PATH}
                  separator={sep}
                  size="md"
                  onItemClick={handleItemClick}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Size Comparison */}
        <div className="space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Size Variants
          </Text>

          <div className="grid gap-4">
            {SIZE_OPTIONS.map((s) => (
              <div
                key={s}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
              >
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {s}
                  </span>
                </div>
                <Breadcrumb
                  items={SIMPLE_PATH}
                  separator="chevron"
                  size={s}
                  showHomeIcon
                  onItemClick={handleItemClick}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Features
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Animated item and separator transitions</p>
              <p>Collapsible overflow with dropdown menu</p>
              <p>Keyboard navigation support</p>
              <p>Next.js Link integration for navigation</p>
              <p>Custom icon support per item</p>
              <p>Dark mode support</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              API Options
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  separator
                </code>{' '}
                chevron, slash, arrow, dot
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  size
                </code>{' '}
                sm, md, lg
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  maxItems
                </code>{' '}
                collapse threshold (0 = off)
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  showHomeIcon
                </code>{' '}
                show home icon on first item
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  onItemClick
                </code>{' '}
                click handler for items
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
