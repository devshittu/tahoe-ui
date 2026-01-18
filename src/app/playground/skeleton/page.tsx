// src/app/playground/skeleton/page.tsx

'use client';

import { useState } from 'react';
import { HeadlineBlock } from '@/app/playground/headline/components';
import { SegmentedControl } from '@/app/playground/segmented-control/components';
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonVariant,
  SkeletonAnimation,
} from './components';

export default function SkeletonPage() {
  // Configuration state
  const [variant, setVariant] = useState<SkeletonVariant>('rectangular');
  const [animation, setAnimation] = useState<SkeletonAnimation>('pulse');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <HeadlineBlock
          headline="Skeleton"
          subheadline="Content-shaped loading placeholders that reduce perceived load time. Supports multiple shapes and animation styles."
          size="medium"
        />

        {/* Configuration Panel */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Configuration
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Variant selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Variant
                </span>
                <select
                  value={variant}
                  onChange={(e) =>
                    setVariant(e.target.value as SkeletonVariant)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="text">Text</option>
                  <option value="circular">Circular</option>
                  <option value="rectangular">Rectangular</option>
                  <option value="rounded">Rounded</option>
                </select>
              </div>

              {/* Animation selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Animation
                </span>
                <SegmentedControl
                  options={[
                    { value: 'pulse', label: 'Pulse' },
                    { value: 'wave', label: 'Wave' },
                    { value: 'none', label: 'None' },
                  ]}
                  value={animation}
                  onChange={setAnimation}
                  size="sm"
                />
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
            <div className="flex justify-center">
              <Skeleton
                variant={variant}
                animation={animation}
                width={variant === 'circular' ? 80 : 280}
                height={
                  variant === 'text' ? 20 : variant === 'circular' ? 80 : 120
                }
              />
            </div>
          </div>
        </section>

        {/* Shape Variants */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Shape Variants
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {(['text', 'circular', 'rectangular', 'rounded'] as const).map(
                (v) => (
                  <div key={v} className="text-center">
                    <div className="flex justify-center mb-3">
                      <Skeleton
                        variant={v}
                        width={v === 'text' ? 120 : v === 'circular' ? 60 : 100}
                        height={v === 'text' ? 16 : v === 'circular' ? 60 : 80}
                        animation="pulse"
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {v}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Animation Types */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Animation Types
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['pulse', 'wave', 'none'] as const).map((a) => (
                <div key={a}>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mb-3 capitalize">
                    {a}
                  </span>
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={60}
                    animation={a}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SkeletonText */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            SkeletonText
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Convenience component for multi-line text placeholders.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="block text-xs text-gray-400 mb-2">1 line</span>
                <SkeletonText lines={1} />
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-2">
                  3 lines
                </span>
                <SkeletonText lines={3} />
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-2">
                  5 lines
                </span>
                <SkeletonText lines={5} />
              </div>
            </div>
          </div>
        </section>

        {/* SkeletonAvatar */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            SkeletonAvatar
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Circular avatar placeholder with preset sizes.
            </p>
            <div className="flex items-end gap-6">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <div key={s} className="text-center">
                  <SkeletonAvatar size={s} />
                  <span className="block text-xs text-gray-400 mt-2">{s}</span>
                </div>
              ))}
              <div className="text-center">
                <SkeletonAvatar size={64} />
                <span className="block text-xs text-gray-400 mt-2">64px</span>
              </div>
            </div>
          </div>
        </section>

        {/* SkeletonCard */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            SkeletonCard
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Pre-composed card skeleton with avatar, image, and text options.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="block text-xs text-gray-400 mb-2">
                  Basic (avatar + text)
                </span>
                <SkeletonCard hasAvatar lines={2} />
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-2">
                  With image
                </span>
                <SkeletonCard hasAvatar hasImage lines={2} />
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-2">
                  Text only
                </span>
                <SkeletonCard hasAvatar={false} lines={4} />
              </div>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Real-world Examples
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* User profile card */}
              <div>
                <span className="block text-xs text-gray-400 mb-3">
                  User profile
                </span>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <SkeletonAvatar size="lg" />
                  <div className="flex-1">
                    <Skeleton
                      variant="text"
                      width="70%"
                      height={18}
                      className="mb-2"
                    />
                    <Skeleton variant="text" width="50%" height={14} />
                  </div>
                </div>
              </div>

              {/* Article card */}
              <div>
                <span className="block text-xs text-gray-400 mb-3">
                  Article card
                </span>
                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={120}
                    className="mb-4"
                  />
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={20}
                    className="mb-2"
                  />
                  <SkeletonText lines={2} />
                </div>
              </div>
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
                title: 'Four Shape Variants',
                description:
                  'Text, circular, rectangular, and rounded for any content type',
              },
              {
                title: 'Two Animation Types',
                description:
                  'Pulse (opacity) or wave (shimmer gradient) animations',
              },
              {
                title: 'Convenience Components',
                description:
                  'SkeletonText, SkeletonAvatar, SkeletonCard for common patterns',
              },
              {
                title: 'Composable',
                description: 'Combine multiple skeletons to match any layout',
              },
              {
                title: 'Reduced Motion',
                description: 'Respects prefers-reduced-motion automatically',
              },
              {
                title: 'Dark Mode',
                description: 'Appropriate colors for light and dark themes',
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
                    prop: 'variant',
                    type: "'text' | 'circular' | 'rectangular' | 'rounded'",
                    default: "'rectangular'",
                    desc: 'Shape variant',
                  },
                  {
                    prop: 'animation',
                    type: "'pulse' | 'wave' | 'none'",
                    default: "'pulse'",
                    desc: 'Animation type',
                  },
                  {
                    prop: 'width',
                    type: 'string | number',
                    default: "'100%'",
                    desc: 'Width (CSS or pixels)',
                  },
                  {
                    prop: 'height',
                    type: 'string | number',
                    default: 'varies',
                    desc: 'Height (CSS or pixels)',
                  },
                  {
                    prop: 'radius',
                    type: 'string | number',
                    default: 'by variant',
                    desc: 'Border radius override',
                  },
                  {
                    prop: 'lines',
                    type: 'number',
                    default: '1',
                    desc: 'Number of lines (text variant)',
                  },
                  {
                    prop: 'lineGap',
                    type: 'string | number',
                    default: '8',
                    desc: 'Gap between lines',
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
