// src/app/playground/chip/page.tsx

'use client';

import { useState } from 'react';
import {
  FiTag,
  FiUser,
  FiFolder,
  FiStar,
  FiCheck,
  FiAlertCircle,
} from 'react-icons/fi';
import { HeadlineBlock } from '@/app/playground/headline/components';
import { Chip, ChipVariant, ChipColor, ChipSize } from './components';
import { SegmentedControl } from '@/app/playground/segmented-control/components';

export default function ChipPage() {
  // Configuration state
  const [variant, setVariant] = useState<ChipVariant>('filled');
  const [color, setColor] = useState<ChipColor>('default');
  const [size, setSize] = useState<ChipSize>('md');
  const [isDisabled, setIsDisabled] = useState(false);

  // Demo state for dismissible chips
  const [tags, setTags] = useState([
    'React',
    'TypeScript',
    'Tailwind',
    'Next.js',
  ]);

  // Demo state for selectable chips
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['active']);
  const filters = ['all', 'active', 'completed', 'archived'];

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  };

  const resetTags = () => {
    setTags(['React', 'TypeScript', 'Tailwind', 'Next.js']);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <HeadlineBlock
          headline="Chip"
          subheadline="Compact elements for displaying tags, filters, categories, and selections. Supports dismissible and selectable modes."
          size="medium"
        />

        {/* Configuration Panel */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Configuration
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Variant selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Variant
                </span>
                <SegmentedControl
                  options={[
                    { value: 'filled', label: 'Filled' },
                    { value: 'outlined', label: 'Outlined' },
                    { value: 'subtle', label: 'Subtle' },
                  ]}
                  value={variant}
                  onChange={setVariant}
                  size="sm"
                />
              </div>

              {/* Color selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </span>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value as ChipColor)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="default">Default</option>
                  <option value="primary">Primary</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>

              {/* Size selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </span>
                <SegmentedControl
                  options={[
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                  ]}
                  value={size}
                  onChange={setSize}
                  size="sm"
                />
              </div>

              {/* Disabled toggle */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Disabled
                </span>
                <button
                  type="button"
                  onClick={() => setIsDisabled(!isDisabled)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      isDisabled
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                  aria-pressed={isDisabled}
                >
                  {isDisabled ? 'On' : 'Off'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Interactive Demo
          </h2>
          <div className="p-8 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap gap-3 justify-center">
              <Chip
                variant={variant}
                color={color}
                size={size}
                disabled={isDisabled}
              >
                Basic Chip
              </Chip>
              <Chip
                variant={variant}
                color={color}
                size={size}
                disabled={isDisabled}
                icon={<FiTag />}
              >
                With Icon
              </Chip>
              <Chip
                variant={variant}
                color={color}
                size={size}
                disabled={isDisabled}
                dismissible
                onDismiss={() => {}}
              >
                Dismissible
              </Chip>
              <Chip
                variant={variant}
                color={color}
                size={size}
                disabled={isDisabled}
                clickable
                onClick={() => {}}
              >
                Clickable
              </Chip>
            </div>
          </div>
        </section>

        {/* Color Variants */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Color Variants
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="space-y-4">
              {(['filled', 'outlined', 'subtle'] as const).map((v) => (
                <div key={v} className="flex items-center gap-4 flex-wrap">
                  <span className="w-20 text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                    {v}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        'default',
                        'primary',
                        'success',
                        'warning',
                        'error',
                      ] as const
                    ).map((c) => (
                      <Chip key={c} variant={v} color={c}>
                        {c}
                      </Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dismissible Tags */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Dismissible Tags
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Click the X to remove tags. Press Delete key when focused.
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  dismissible
                  onDismiss={() => handleRemoveTag(tag)}
                  variant="outlined"
                  icon={<FiFolder />}
                >
                  {tag}
                </Chip>
              ))}
              {tags.length === 0 && (
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  No tags remaining
                </span>
              )}
              {tags.length < 4 && (
                <button
                  type="button"
                  onClick={resetTags}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Selectable Filter Chips */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Selectable Filter Chips
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Click chips to toggle selection. Supports multi-select.
            </p>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Chip
                  key={filter}
                  clickable
                  selected={selectedFilters.includes(filter)}
                  onClick={() => toggleFilter(filter)}
                  variant="subtle"
                  color="primary"
                  icon={
                    selectedFilters.includes(filter) ? <FiCheck /> : undefined
                  }
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Chip>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
              Selected:{' '}
              {selectedFilters.length > 0 ? selectedFilters.join(', ') : 'none'}
            </p>
          </div>
        </section>

        {/* With Icons */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            With Icons
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap gap-3">
              <Chip icon={<FiUser />} color="primary">
                John Doe
              </Chip>
              <Chip icon={<FiStar />} color="warning">
                Featured
              </Chip>
              <Chip icon={<FiCheck />} color="success">
                Verified
              </Chip>
              <Chip icon={<FiAlertCircle />} color="error">
                Critical
              </Chip>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Three Variants',
                description:
                  'Filled for emphasis, outlined for subtle, subtle for minimal',
              },
              {
                title: 'Five Colors',
                description:
                  'Semantic colors: default, primary, success, warning, error',
              },
              {
                title: 'Dismissible Mode',
                description:
                  'Add onDismiss callback to show remove button (X icon)',
              },
              {
                title: 'Selectable Mode',
                description:
                  'Clickable chips with selected state for filter patterns',
              },
              {
                title: 'Keyboard Accessible',
                description:
                  'Enter/Space to select, Delete to dismiss, full focus management',
              },
              {
                title: 'Dark Mode',
                description:
                  'All variants and colors work seamlessly in dark mode',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* API Reference */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            API Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Prop
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Default
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                  {
                    prop: 'children',
                    type: 'ReactNode',
                    default: '—',
                    desc: 'Chip label content',
                  },
                  {
                    prop: 'variant',
                    type: "'filled' | 'outlined' | 'subtle'",
                    default: "'filled'",
                    desc: 'Visual style variant',
                  },
                  {
                    prop: 'color',
                    type: "'default' | 'primary' | 'success' | 'warning' | 'error'",
                    default: "'default'",
                    desc: 'Color theme',
                  },
                  {
                    prop: 'size',
                    type: "'sm' | 'md'",
                    default: "'md'",
                    desc: 'Size variant',
                  },
                  {
                    prop: 'icon',
                    type: 'ReactNode',
                    default: '—',
                    desc: 'Leading icon element',
                  },
                  {
                    prop: 'dismissible',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Show dismiss button',
                  },
                  {
                    prop: 'onDismiss',
                    type: '() => void',
                    default: '—',
                    desc: 'Dismiss callback',
                  },
                  {
                    prop: 'clickable',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Make chip clickable',
                  },
                  {
                    prop: 'onClick',
                    type: '(e) => void',
                    default: '—',
                    desc: 'Click callback',
                  },
                  {
                    prop: 'selected',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Selected state for clickable chips',
                  },
                  {
                    prop: 'disabled',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Disable interactions',
                  },
                ].map((row) => (
                  <tr key={row.prop}>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">
                      {row.prop}
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">
                      {row.type}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {row.default}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {row.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="mt-12 mb-16">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Keyboard Shortcuts
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: 'Enter / Space', action: 'Activate clickable chip' },
                { key: 'Delete', action: 'Dismiss chip' },
                { key: 'Tab', action: 'Navigate between chips' },
              ].map((shortcut) => (
                <div key={shortcut.key} className="flex items-center gap-3">
                  <kbd className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs font-mono text-gray-700 dark:text-gray-300">
                    {shortcut.key}
                  </kbd>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {shortcut.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
