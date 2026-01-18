// src/app/playground/navigation/page.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Heading, Text, SmallText, Paragraph } from '@/components/Typography';
import { Tabs, Pagination } from '@/components/Navigation';
import type {
  TabsVariant,
  TabsSize,
  PaginationVariant,
  PaginationSize,
} from '@/components/Navigation';
import { FiHome, FiUser, FiSettings, FiMail } from 'react-icons/fi';

type ActiveSection = 'tabs' | 'pagination';

const SECTIONS: { id: ActiveSection; label: string }[] = [
  { id: 'tabs', label: 'Tabs' },
  { id: 'pagination', label: 'Pagination' },
];

const TAB_VARIANTS: TabsVariant[] = ['underline', 'pills', 'enclosed'];
const TAB_SIZES: TabsSize[] = ['sm', 'md', 'lg'];
const PAGINATION_VARIANTS: PaginationVariant[] = [
  'simple',
  'numbered',
  'compact',
];
const PAGINATION_SIZES: PaginationSize[] = ['sm', 'md', 'lg'];

function TabsDemo() {
  const [variant, setVariant] = useState<TabsVariant>('underline');
  const [size, setSize] = useState<TabsSize>('md');
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );

  const tabItems = [
    {
      key: 'home',
      label: 'Home',
      icon: <FiHome className="w-4 h-4" />,
      content: (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Text color="primary" fontWeight="medium">
            Home Tab Content
          </Text>
          <SmallText className="text-gray-500 mt-2">
            This is the home tab panel. It can contain any React content.
          </SmallText>
        </div>
      ),
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: <FiUser className="w-4 h-4" />,
      content: (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Text color="primary" fontWeight="medium">
            Profile Tab Content
          </Text>
          <SmallText className="text-gray-500 mt-2">
            User profile information and settings would appear here.
          </SmallText>
        </div>
      ),
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <FiSettings className="w-4 h-4" />,
      content: (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Text color="primary" fontWeight="medium">
            Settings Tab Content
          </Text>
          <SmallText className="text-gray-500 mt-2">
            Application settings and preferences.
          </SmallText>
        </div>
      ),
    },
    {
      key: 'messages',
      label: 'Messages',
      icon: <FiMail className="w-4 h-4" />,
      disabled: true,
      content: (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <Text color="primary" fontWeight="medium">
            Messages
          </Text>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Accessible tabs with animated indicator and multiple variants.
        </Text>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <SmallText className="text-gray-500">Variant</SmallText>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as TabsVariant)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {TAB_VARIANTS.map((v) => (
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
            {TAB_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <SmallText className="text-gray-500">Orientation</SmallText>
          <select
            value={orientation}
            onChange={(e) =>
              setOrientation(e.target.value as 'horizontal' | 'vertical')
            }
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            <option value="horizontal">horizontal</option>
            <option value="vertical">vertical</option>
          </select>
        </div>
      </div>

      {/* Demo */}
      <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <Tabs
          items={tabItems}
          variant={variant}
          size={size}
          orientation={orientation}
        />
      </div>

      {/* Full width example */}
      <div className="space-y-4">
        <Text fontWeight="medium" color="primary">
          Full Width (Pills variant)
        </Text>
        <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <Tabs items={tabItems.slice(0, 3)} variant="pills" fullWidth />
        </div>
      </div>
    </div>
  );
}

function PaginationDemo() {
  const [variant, setVariant] = useState<PaginationVariant>('numbered');
  const [size, setSize] = useState<PaginationSize>('md');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFirstLast, setShowFirstLast] = useState(true);
  const [siblings, setSiblings] = useState(1);

  const totalItems = 150;
  const pageSize = 10;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text fontWeight="medium" color="primary">
          Page navigation with multiple variants and keyboard support.
        </Text>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <SmallText className="text-gray-500">Variant</SmallText>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as PaginationVariant)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {PAGINATION_VARIANTS.map((v) => (
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
            onChange={(e) => setSize(e.target.value as PaginationSize)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {PAGINATION_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <SmallText className="text-gray-500">Siblings</SmallText>
          <select
            value={siblings}
            onChange={(e) => setSiblings(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {[1, 2, 3].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <SmallText className="text-gray-500">Options</SmallText>
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={showFirstLast}
              onChange={(e) => setShowFirstLast(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
            />
            <Text>Show first/last</Text>
          </label>
        </div>
      </div>

      {/* Demo */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col items-center gap-6">
            <Pagination
              total={totalItems}
              pageSize={pageSize}
              currentPage={currentPage}
              onChange={setCurrentPage}
              variant={variant}
              size={size}
              showFirstLast={showFirstLast}
              siblings={siblings}
            />
            <Text color="secondary">
              Showing items {(currentPage - 1) * pageSize + 1}-
              {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
            </Text>
          </div>
        </div>
      </div>

      {/* Variants comparison */}
      <div className="space-y-4">
        <Text fontWeight="medium" color="primary">
          All Variants
        </Text>
        <div className="space-y-6">
          {PAGINATION_VARIANTS.map((v) => (
            <div key={v} className="space-y-2">
              <SmallText className="text-gray-500 capitalize">{v}</SmallText>
              <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <Pagination
                  total={totalItems}
                  pageSize={pageSize}
                  currentPage={7}
                  onChange={() => {}}
                  variant={v}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NavigationPlayground() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('tabs');

  const renderDemo = () => {
    switch (activeSection) {
      case 'tabs':
        return <TabsDemo />;
      case 'pagination':
        return <PaginationDemo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Heading size="2xl" color="primary" className="font-bold">
            Navigation
          </Heading>
          <Paragraph color="secondary" className="max-w-2xl mx-auto">
            Tab and pagination components for content navigation. Built with
            HeadlessUI for accessibility and animated transitions.
          </Paragraph>
        </div>

        {/* Section Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-2">
          <div className="flex gap-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                  activeSection === section.id
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                )}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Area */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          {renderDemo()}
        </div>

        {/* Usage */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Import
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { Tabs, Pagination } from '@/components/Navigation';`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
