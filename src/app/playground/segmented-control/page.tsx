// src/app/playground/segmented-control/page.tsx

'use client';

import { useState } from 'react';
import {
  FiList,
  FiGrid,
  FiMap,
  FiCalendar,
  FiClock,
  FiStar,
} from 'react-icons/fi';
import { HeadlineBlock } from '@/app/playground/headline/components';
import {
  SegmentedControl,
  SegmentedControlSize,
  SegmentOption,
} from './components';

type ViewMode = 'list' | 'grid' | 'map';
type TimeRange = 'day' | 'week' | 'month';
type Priority = 'low' | 'medium' | 'high';

export default function SegmentedControlPage() {
  // Configuration state
  const [size, setSize] = useState<SegmentedControlSize>('md');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);

  // Demo values
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [priority, setPriority] = useState<Priority>('medium');

  // Options definitions
  const viewOptions: SegmentOption<ViewMode>[] = [
    { value: 'list', label: 'List', icon: <FiList /> },
    { value: 'grid', label: 'Grid', icon: <FiGrid /> },
    { value: 'map', label: 'Map', icon: <FiMap /> },
  ];

  const timeOptions: SegmentOption<TimeRange>[] = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ];

  const priorityOptions: SegmentOption<Priority>[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High', disabled: true },
  ];

  const sizeOptions: SegmentOption<SegmentedControlSize>[] = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <HeadlineBlock
          headline="Segmented Control"
          subheadline="Apple-style grouped toggle buttons with spring-animated sliding indicator. Perfect for view switchers, filters, and mode toggles."
          size="medium"
        />

        {/* Configuration Panel */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Configuration
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Size selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </span>
                <SegmentedControl
                  options={sizeOptions}
                  value={size}
                  onChange={setSize}
                  size="sm"
                  name="size-selector"
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

              {/* Full width toggle */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Width
                </span>
                <button
                  type="button"
                  onClick={() => setIsFullWidth(!isFullWidth)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      isFullWidth
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                  aria-pressed={isFullWidth}
                >
                  {isFullWidth ? 'On' : 'Off'}
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
            <div className="flex flex-col items-center gap-8">
              {/* Main demo control */}
              <div className={isFullWidth ? 'w-full' : ''}>
                <SegmentedControl
                  options={viewOptions}
                  value={viewMode}
                  onChange={setViewMode}
                  size={size}
                  disabled={isDisabled}
                  fullWidth={isFullWidth}
                />
              </div>

              {/* Selection feedback */}
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Selected view:
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                  {viewMode}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Size Variants */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Size Variants
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-6">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <span className="w-16 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {s}
                  </span>
                  <SegmentedControl
                    options={timeOptions}
                    value={timeRange}
                    onChange={setTimeRange}
                    size={s}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* With Icons */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            With Icons
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-6">
              {/* Icons + Labels */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Icons with labels
                </p>
                <SegmentedControl
                  options={viewOptions}
                  value={viewMode}
                  onChange={setViewMode}
                  size="md"
                />
              </div>

              {/* Icon only (labels still required for accessibility) */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Another example with icons
                </p>
                <SegmentedControl
                  options={[
                    { value: 'day', label: 'Day', icon: <FiCalendar /> },
                    { value: 'week', label: 'Week', icon: <FiClock /> },
                    { value: 'month', label: 'Month', icon: <FiStar /> },
                  ]}
                  value={timeRange}
                  onChange={setTimeRange}
                  size="md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Disabled Segment */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Disabled Segments
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Individual segments can be disabled. The &quot;High&quot; option
              below is disabled.
            </p>
            <SegmentedControl
              options={priorityOptions}
              value={priority}
              onChange={setPriority}
              size="md"
            />
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
                title: 'Spring Animation',
                description:
                  'Smooth indicator sliding with physics-based spring (stiffness: 400, damping: 30)',
              },
              {
                title: 'Keyboard Navigation',
                description:
                  'Full arrow key support, Home/End to jump, follows radiogroup pattern',
              },
              {
                title: 'ARIA Radiogroup',
                description:
                  'Proper role="radiogroup" with aria-checked for screen readers',
              },
              {
                title: 'Dark Mode',
                description:
                  'Fully styled for both light and dark themes with appropriate contrast',
              },
              {
                title: 'Three Sizes',
                description:
                  'Small (32px), Medium (40px), Large (48px) heights following 8pt grid',
              },
              {
                title: 'Form Compatible',
                description:
                  'Optional name prop adds hidden input for native form submission',
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
                    prop: 'options',
                    type: 'SegmentOption<T>[]',
                    default: '—',
                    desc: 'Array of segment options with value, label, optional icon',
                  },
                  {
                    prop: 'value',
                    type: 'T',
                    default: '—',
                    desc: 'Currently selected value (controlled)',
                  },
                  {
                    prop: 'onChange',
                    type: '(value: T) => void',
                    default: '—',
                    desc: 'Callback when selection changes',
                  },
                  {
                    prop: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    default: "'md'",
                    desc: 'Control size variant',
                  },
                  {
                    prop: 'disabled',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Disable entire control',
                  },
                  {
                    prop: 'fullWidth',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Expand to fill container width',
                  },
                  {
                    prop: 'name',
                    type: 'string',
                    default: '—',
                    desc: 'Name attribute for form submission',
                  },
                  {
                    prop: 'className',
                    type: 'string',
                    default: '—',
                    desc: 'Additional CSS classes',
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
                { key: '← / ↑', action: 'Previous segment' },
                { key: '→ / ↓', action: 'Next segment' },
                { key: 'Home', action: 'First segment' },
                { key: 'End', action: 'Last segment' },
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
