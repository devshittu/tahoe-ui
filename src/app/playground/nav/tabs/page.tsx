// src/app/playground/nav/tabs/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import {
  Tabs,
  type TabsVariant,
  type TabsSize,
  type TabsOrientation,
  type TabItem,
} from '@/components/Navigation';
import { FiHome, FiUser, FiSettings, FiMail } from 'react-icons/fi';

const VARIANT_VALUES: TabsVariant[] = ['underline', 'pills', 'enclosed'];
const SIZE_VALUES: TabsSize[] = ['sm', 'md', 'lg'];
const ORIENTATION_VALUES: TabsOrientation[] = ['horizontal', 'vertical'];

const basicItems: TabItem[] = [
  {
    key: 'tab1',
    label: 'Overview',
    content: (
      <div className="text-gray-600 dark:text-gray-400">
        Overview content goes here. This tab shows the general information.
      </div>
    ),
  },
  {
    key: 'tab2',
    label: 'Features',
    content: (
      <div className="text-gray-600 dark:text-gray-400">
        Features content - listing all the amazing capabilities of the product.
      </div>
    ),
  },
  {
    key: 'tab3',
    label: 'Pricing',
    content: (
      <div className="text-gray-600 dark:text-gray-400">
        Pricing content - transparent pricing tiers for every team size.
      </div>
    ),
  },
];

const iconItems: TabItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: <FiHome />,
    content: (
      <div className="text-gray-600 dark:text-gray-400">Home content</div>
    ),
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: <FiUser />,
    content: (
      <div className="text-gray-600 dark:text-gray-400">
        Profile settings and information
      </div>
    ),
  },
  {
    key: 'messages',
    label: 'Messages',
    icon: <FiMail />,
    content: (
      <div className="text-gray-600 dark:text-gray-400">
        Your messages inbox
      </div>
    ),
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: <FiSettings />,
    content: (
      <div className="text-gray-600 dark:text-gray-400">
        Application settings
      </div>
    ),
  },
];

const disabledItems: TabItem[] = [
  {
    key: 'active1',
    label: 'Active',
    content: (
      <div className="text-gray-600 dark:text-gray-400">This tab is active</div>
    ),
  },
  {
    key: 'disabled',
    label: 'Disabled',
    content: <div>Disabled content</div>,
    disabled: true,
  },
  {
    key: 'active2',
    label: 'Also Active',
    content: (
      <div className="text-gray-600 dark:text-gray-400">Another active tab</div>
    ),
  },
];

export default function TabsPlayground() {
  const [variant, setVariant] = useState<TabsVariant>('underline');
  const [size, setSize] = useState<TabsSize>('md');
  const [orientation, setOrientation] = useState<TabsOrientation>('horizontal');
  const [fullWidth, setFullWidth] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Tabs"
          subheadline="Accessible tabbed interface using HeadlessUI with animated indicator and keyboard support."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <SmallText className="text-gray-500">Variant</SmallText>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value as TabsVariant)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {VARIANT_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Size</SmallText>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as TabsSize)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {SIZE_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Orientation</SmallText>
              <select
                value={orientation}
                onChange={(e) =>
                  setOrientation(e.target.value as TabsOrientation)
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {ORIENTATION_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Full Width</SmallText>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={fullWidth}
                  onChange={(e) => setFullWidth(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <SmallText>Enable</SmallText>
              </label>
            </div>
          </div>
        </div>

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <Tabs
              items={basicItems}
              variant={variant}
              size={size}
              orientation={orientation}
              fullWidth={fullWidth}
            />
          </div>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Variants
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-8">
            {VARIANT_VALUES.map((v) => (
              <div key={v}>
                <SmallText className="text-gray-500 mb-3 block">
                  variant=&quot;{v}&quot;
                </SmallText>
                <Tabs items={basicItems} variant={v} />
              </div>
            ))}
          </div>
        </div>

        {/* With Icons */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            With Icons
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <Tabs items={iconItems} variant="pills" />
          </div>
        </div>

        {/* Vertical Orientation */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Vertical Orientation
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <Tabs
              items={basicItems}
              orientation="vertical"
              variant="underline"
            />
          </div>
        </div>

        {/* Disabled State */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Disabled Tab
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <Tabs items={disabledItems} />
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Sizes
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-8">
            {SIZE_VALUES.map((s) => (
              <div key={s}>
                <SmallText className="text-gray-500 mb-3 block">
                  size=&quot;{s}&quot;
                </SmallText>
                <Tabs items={basicItems} size={s} />
              </div>
            ))}
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Variants
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>underline</InlineCode> - Animated underline
                indicator
              </p>
              <p>
                <InlineCode>pills</InlineCode> - Filled background on active
              </p>
              <p>
                <InlineCode>enclosed</InlineCode> - Card-style tabs
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Tab Item Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>key</InlineCode> - Unique identifier
              </p>
              <p>
                <InlineCode>label</InlineCode> - Display text
              </p>
              <p>
                <InlineCode>content</InlineCode> - Panel content
              </p>
              <p>
                <InlineCode>icon</InlineCode> - Optional icon
              </p>
              <p>
                <InlineCode>disabled</InlineCode> - Disable tab
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Component Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>size</InlineCode> - sm | md | lg
              </p>
              <p>
                <InlineCode>orientation</InlineCode> - horizontal | vertical
              </p>
              <p>
                <InlineCode>fullWidth</InlineCode> - Fill container
              </p>
              <p>
                <InlineCode>defaultIndex</InlineCode> - Initial tab
              </p>
              <p>
                <InlineCode>selectedIndex</InlineCode> - Controlled mode
              </p>
              <p>
                <InlineCode>onChange</InlineCode> - Index change handler
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { Tabs, type TabItem } from '@/components/Navigation';
import { FiHome, FiSettings } from 'react-icons/fi';

const items: TabItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: <FiHome />,
    content: <HomeContent />,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: <FiSettings />,
    content: <SettingsContent />,
  },
];

// Basic usage
<Tabs items={items} />

// With variant and size
<Tabs items={items} variant="pills" size="lg" />

// Vertical layout
<Tabs items={items} orientation="vertical" />

// Controlled mode
<Tabs
  items={items}
  selectedIndex={activeIndex}
  onChange={setActiveIndex}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
