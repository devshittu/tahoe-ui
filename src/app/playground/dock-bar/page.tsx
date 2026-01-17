// src/app/playground/dock-bar/page.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '@/components/Typography';
import { HeadlineBlock } from '../headline/components';
import { DockBar, type DockItemData, type DockSize } from './components';
import {
  FiHome,
  FiSearch,
  FiUser,
  FiSettings,
  FiMail,
  FiCalendar,
  FiFolder,
  FiMusic,
  FiCamera,
  FiMessageSquare,
} from 'react-icons/fi';

const SIZE_OPTIONS: DockSize[] = ['sm', 'md', 'lg'];

// Example dock items
const BASIC_ITEMS: DockItemData[] = [
  { id: 'home', icon: <FiHome />, label: 'Home', href: '/', active: true },
  { id: 'search', icon: <FiSearch />, label: 'Search' },
  { id: 'profile', icon: <FiUser />, label: 'Profile', badge: 3 },
  { id: 'settings', icon: <FiSettings />, label: 'Settings' },
];

const FULL_ITEMS: DockItemData[] = [
  { id: 'home', icon: <FiHome />, label: 'Home', active: true },
  { id: 'mail', icon: <FiMail />, label: 'Mail', badge: 12 },
  { id: 'calendar', icon: <FiCalendar />, label: 'Calendar' },
  { id: 'files', icon: <FiFolder />, label: 'Files' },
  { id: 'music', icon: <FiMusic />, label: 'Music' },
  { id: 'photos', icon: <FiCamera />, label: 'Photos' },
  { id: 'messages', icon: <FiMessageSquare />, label: 'Messages', badge: 5 },
  { id: 'settings', icon: <FiSettings />, label: 'Settings' },
];

export default function DockBarPlayground() {
  const [size, setSize] = useState<DockSize>('md');
  const [magnetic, setMagnetic] = useState(true);
  const [maxScale, setMaxScale] = useState(1.4);
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const [activeItemId, setActiveItemId] = useState<string>('home');

  const handleItemClick = (item: DockItemData) => {
    setLastClicked(item.label);
    setActiveItemId(item.id);
    console.log('Clicked:', item);
  };

  // Create items with dynamic active state
  const basicItemsWithActive = BASIC_ITEMS.map((item) => ({
    ...item,
    active: item.id === activeItemId,
  }));

  const fullItemsWithActive = FULL_ITEMS.map((item) => ({
    ...item,
    active: item.id === activeItemId,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Page Header */}
        <HeadlineBlock
          headline="Dock Bar"
          subheadline="macOS-style dock with magnetic hover effect, badge notifications, and keyboard adaptation."
          size="medium"
        />

        {/* Configuration Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Magnetic */}
            <div className="space-y-3">
              <Text fontWeight="medium" color="primary">
                Magnetic Effect
              </Text>
              <button
                onClick={() => setMagnetic(!magnetic)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  magnetic
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                )}
              >
                {magnetic ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Max Scale */}
            <div className="space-y-3">
              <Text fontWeight="medium" color="primary">
                Max Scale
              </Text>
              <div className="flex flex-wrap gap-2">
                {[1.2, 1.4, 1.6, 1.8].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setMaxScale(scale)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      maxScale === scale
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    {scale}x
                  </button>
                ))}
              </div>
            </div>

            {/* Last Clicked */}
            <div className="space-y-3">
              <Text fontWeight="medium" color="primary">
                Last Clicked
              </Text>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {lastClicked || 'None'}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Interactive Demo
          </Text>

          <div className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 min-h-[300px] flex items-end justify-center">
            <DockBar
              items={basicItemsWithActive}
              size={size}
              magnetic={magnetic}
              maxScale={maxScale}
              onItemClick={handleItemClick}
            />
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Hover over items to see the magnetic scaling effect. Items closer to
            the cursor scale larger.
          </p>
        </div>

        {/* Full Dock Example */}
        <div className="space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Full Dock Example
          </Text>

          <div className="bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-950/30 rounded-2xl p-8 min-h-[300px] flex items-end justify-center">
            <DockBar
              items={fullItemsWithActive}
              size="md"
              magnetic={magnetic}
              maxScale={maxScale}
              onItemClick={handleItemClick}
            />
          </div>
        </div>

        {/* Size Comparison */}
        <div className="space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Size Variants
          </Text>

          <div className="grid gap-6">
            {SIZE_OPTIONS.map((s) => (
              <div
                key={s}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
              >
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {s}
                  </span>
                </div>
                <div className="flex justify-center">
                  <DockBar
                    items={BASIC_ITEMS}
                    size={s}
                    magnetic={false}
                    onItemClick={handleItemClick}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Example */}
        <div className="space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            With Badges
          </Text>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 flex justify-center">
            <DockBar
              items={[
                { id: 'mail', icon: <FiMail />, label: 'Mail', badge: 99 },
                {
                  id: 'messages',
                  icon: <FiMessageSquare />,
                  label: 'Messages',
                  badge: 5,
                },
                {
                  id: 'calendar',
                  icon: <FiCalendar />,
                  label: 'Calendar',
                  badge: 1,
                },
                { id: 'files', icon: <FiFolder />, label: 'Files' },
              ]}
              size="md"
              magnetic={magnetic}
              onItemClick={handleItemClick}
            />
          </div>
        </div>

        {/* Active States */}
        <div className="space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Active States
          </Text>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 flex justify-center">
            <DockBar
              items={[
                { id: 'home', icon: <FiHome />, label: 'Home', active: true },
                { id: 'search', icon: <FiSearch />, label: 'Search' },
                {
                  id: 'profile',
                  icon: <FiUser />,
                  label: 'Profile',
                  active: true,
                },
                {
                  id: 'settings',
                  icon: <FiSettings />,
                  label: 'Settings',
                  disabled: true,
                },
              ]}
              size="md"
              magnetic={magnetic}
              onItemClick={handleItemClick}
            />
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Active items have a ring and dot indicator. Disabled items are faded
            and non-interactive.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Features
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Magnetic hover effect with smooth spring animations</p>
              <p>Badge notifications with entrance animation</p>
              <p>Keyboard height adaptation for iOS PWA</p>
              <p>Tooltip labels on hover</p>
              <p>Active and disabled states</p>
              <p>Next.js Link integration</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              API Options
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  size
                </code>{' '}
                sm, md, lg
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  magnetic
                </code>{' '}
                enable/disable magnetic effect
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  maxScale
                </code>{' '}
                maximum scale factor (1.2-2.0)
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  position
                </code>{' '}
                bottom, top
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  adaptToKeyboard
                </code>{' '}
                iOS PWA support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
