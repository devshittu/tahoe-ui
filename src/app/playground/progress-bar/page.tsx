// src/app/playground/progress-bar/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { HeadlineBlock } from '@/app/playground/headline/components';
import { SegmentedControl } from '@/app/playground/segmented-control/components';
import { ProgressBar, ProgressBarSize, ProgressBarColor } from './components';

export default function ProgressBarPage() {
  // Configuration state
  const [size, setSize] = useState<ProgressBarSize>('md');
  const [color, setColor] = useState<ProgressBarColor>('primary');
  const [showLabel, setShowLabel] = useState(true);
  const [striped, setStriped] = useState(false);
  const [animated, setAnimated] = useState(false);

  // Demo animated value
  const [demoValue, setDemoValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate demo progress
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setDemoValue((prev) => {
        if (prev >= 100) {
          setIsAnimating(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const startAnimation = () => {
    setDemoValue(0);
    setIsAnimating(true);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setDemoValue(0);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <HeadlineBlock
          headline="Progress Bar"
          subheadline="Visual indicator for task completion and loading states. Supports determinate and indeterminate modes."
          size="medium"
        />

        {/* Configuration Panel */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Configuration
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Size selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </span>
                <SegmentedControl
                  options={[
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                  ]}
                  value={size}
                  onChange={setSize}
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
                  onChange={(e) => setColor(e.target.value as ProgressBarColor)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="default">Default</option>
                  <option value="primary">Primary</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>

              {/* Options */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowLabel(!showLabel)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    showLabel
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
                  )}
                  aria-pressed={showLabel}
                >
                  Label
                </button>
                <button
                  type="button"
                  onClick={() => setStriped(!striped)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    striped
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
                  )}
                  aria-pressed={striped}
                >
                  Striped
                </button>
                <button
                  type="button"
                  onClick={() => setAnimated(!animated)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    animated
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
                  )}
                  aria-pressed={animated}
                >
                  Animated
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
            <div className="space-y-6">
              <ProgressBar
                value={demoValue}
                size={size}
                color={color}
                showLabel={showLabel}
                striped={striped}
                animated={animated}
              />
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={startAnimation}
                  disabled={isAnimating}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium disabled:opacity-50"
                >
                  {isAnimating ? 'Running...' : 'Start'}
                </button>
                <button
                  type="button"
                  onClick={resetAnimation}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium"
                >
                  Reset
                </button>
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
            <div className="space-y-6">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <div key={s}>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize">
                    {s}
                  </span>
                  <ProgressBar value={65} size={s} color="primary" />
                </div>
              ))}
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
              {(
                ['default', 'primary', 'success', 'warning', 'error'] as const
              ).map((c) => (
                <div key={c}>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize">
                    {c}
                  </span>
                  <ProgressBar value={75} color={c} showLabel />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Indeterminate */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Indeterminate Loading
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Use indeterminate mode when progress duration is unknown.
            </p>
            <div className="space-y-4">
              <ProgressBar indeterminate color="primary" />
              <ProgressBar indeterminate color="success" size="lg" />
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
                title: 'Determinate Mode',
                description:
                  'Show exact progress with smooth spring-based animation',
              },
              {
                title: 'Indeterminate Mode',
                description:
                  'Animated loading state for unknown duration tasks',
              },
              {
                title: 'Five Colors',
                description:
                  'Semantic colors for different contexts and states',
              },
              {
                title: 'Three Sizes',
                description:
                  'Small (4px), Medium (8px), Large (12px) track heights',
              },
              {
                title: 'Reduced Motion',
                description:
                  'Respects prefers-reduced-motion for accessibility',
              },
              {
                title: 'ARIA Progressbar',
                description:
                  'Full accessibility with valuenow, valuemin, valuemax',
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
        <section className="mt-12 mb-16">
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
                    prop: 'value',
                    type: 'number',
                    default: '0',
                    desc: 'Progress value (0-100)',
                  },
                  {
                    prop: 'max',
                    type: 'number',
                    default: '100',
                    desc: 'Maximum progress value',
                  },
                  {
                    prop: 'indeterminate',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Show indeterminate loading animation',
                  },
                  {
                    prop: 'color',
                    type: 'ProgressBarColor',
                    default: "'primary'",
                    desc: 'Color theme',
                  },
                  {
                    prop: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    default: "'md'",
                    desc: 'Track height',
                  },
                  {
                    prop: 'showLabel',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Show percentage label',
                  },
                  {
                    prop: 'labelFormat',
                    type: 'function',
                    default: 'percentage',
                    desc: 'Custom label formatter',
                  },
                  {
                    prop: 'striped',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Show striped pattern',
                  },
                  {
                    prop: 'animated',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Animate stripes',
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
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
