// src/app/playground/badge/page.tsx

'use client';

import { useState } from 'react';
import {
  FiBell,
  FiMail,
  FiShoppingCart,
  FiMessageCircle,
} from 'react-icons/fi';
import { HeadlineBlock } from '@/app/playground/headline/components';
import { SegmentedControl } from '@/app/playground/segmented-control/components';
import { Avatar } from '@/app/playground/avatar/components';
import {
  Badge,
  BadgeAnchor,
  BadgeSize,
  BadgeColor,
  BadgeVariant,
} from './components';

export default function BadgePage() {
  const [variant, setVariant] = useState<BadgeVariant>('solid');
  const [color, setColor] = useState<BadgeColor>('primary');
  const [size, setSize] = useState<BadgeSize>('md');
  const [pulse, setPulse] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <HeadlineBlock
          headline="Badge"
          subheadline="Small status indicators for notifications, counts, and labels. Supports standalone and anchored modes."
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
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as BadgeVariant)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="solid">Solid</option>
                  <option value="soft">Soft</option>
                  <option value="outline">Outline</option>
                  <option value="dot">Dot</option>
                </select>
              </div>

              {/* Color selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </span>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value as BadgeColor)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="default">Default</option>
                  <option value="primary">Primary</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="info">Info</option>
                </select>
              </div>

              {/* Size selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </span>
                <SegmentedControl
                  options={[
                    { value: 'sm', label: 'S' },
                    { value: 'md', label: 'M' },
                    { value: 'lg', label: 'L' },
                  ]}
                  value={size}
                  onChange={setSize}
                  size="sm"
                />
              </div>

              {/* Pulse toggle */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pulse
                </span>
                <button
                  type="button"
                  onClick={() => setPulse(!pulse)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      pulse
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                  aria-pressed={pulse}
                >
                  {pulse ? 'On' : 'Off'}
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
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Badge variant={variant} color={color} size={size} pulse={pulse}>
                Badge
              </Badge>
              <Badge variant={variant} color={color} size={size} pulse={pulse}>
                12
              </Badge>
              <Badge variant={variant} color={color} size={size} pulse={pulse}>
                New
              </Badge>
              <Badge
                variant={variant}
                color={color}
                size={size}
                pulse={pulse}
                dot
              />
            </div>
          </div>
        </section>

        {/* Variants */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Variants
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="space-y-4">
              {(['solid', 'soft', 'outline', 'dot'] as const).map((v) => (
                <div key={v} className="flex items-center gap-4">
                  <span className="w-16 text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
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
                        'info',
                      ] as const
                    ).map((c) => (
                      <Badge key={c} variant={v} color={c}>
                        {v === 'dot' ? undefined : c}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sizes
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <div key={s} className="text-center">
                  <Badge size={s} color="primary">
                    {s}
                  </Badge>
                  <span className="block text-xs text-gray-400 mt-2">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Number Formatting */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Number Formatting
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Large numbers are formatted with max (default 99).
            </p>
            <div className="flex items-center gap-4">
              <Badge color="error">{5}</Badge>
              <Badge color="error">{25}</Badge>
              <Badge color="error">{99}</Badge>
              <Badge color="error">{100}</Badge>
              <Badge color="error" max={9}>
                {15}
              </Badge>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              5, 25, 99, 100 (→99+), 15 with max=9 (→9+)
            </p>
          </div>
        </section>

        {/* Badge Anchor - Icons */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Badge on Icons
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-8">
              <BadgeAnchor badgeContent={3} color="error">
                <FiBell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </BadgeAnchor>

              <BadgeAnchor badgeContent={12} color="primary">
                <FiMail className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </BadgeAnchor>

              <BadgeAnchor badgeContent={100} color="success">
                <FiShoppingCart className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </BadgeAnchor>

              <BadgeAnchor dot color="error" pulse>
                <FiMessageCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </BadgeAnchor>
            </div>
          </div>
        </section>

        {/* Badge Anchor - Avatars */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Badge on Avatars
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-6">
              <BadgeAnchor dot color="success" overlap="circular">
                <Avatar name="John Doe" size="lg" />
              </BadgeAnchor>

              <BadgeAnchor badgeContent={5} color="error" overlap="circular">
                <Avatar name="Jane Smith" size="lg" />
              </BadgeAnchor>

              <BadgeAnchor
                dot
                color="warning"
                overlap="circular"
                position="bottom-right"
              >
                <Avatar name="Bob Wilson" size="lg" />
              </BadgeAnchor>
            </div>
          </div>
        </section>

        {/* Positions */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Positions
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-8">
              {(
                [
                  'top-right',
                  'top-left',
                  'bottom-right',
                  'bottom-left',
                ] as const
              ).map((pos) => (
                <div key={pos} className="text-center">
                  <BadgeAnchor badgeContent={1} color="primary" position={pos}>
                    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
                  </BadgeAnchor>
                  <span className="block text-xs text-gray-400 mt-3">
                    {pos}
                  </span>
                </div>
              ))}
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
                title: 'Four Variants',
                description: 'Solid, soft, outline, and dot styles',
              },
              {
                title: 'Six Colors',
                description: 'Semantic colors for different contexts',
              },
              {
                title: 'Number Formatting',
                description: 'Auto-formats large numbers (99+)',
              },
              {
                title: 'Badge Anchor',
                description: 'Position badges on icons, avatars, buttons',
              },
              {
                title: 'Pulse Animation',
                description: 'Optional attention-grabbing animation',
              },
              {
                title: 'Overlap Modes',
                description: 'Rectangular and circular positioning',
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
                    prop: 'children',
                    type: 'ReactNode',
                    default: '—',
                    desc: 'Badge content',
                  },
                  {
                    prop: 'variant',
                    type: "'solid' | 'soft' | 'outline' | 'dot'",
                    default: "'solid'",
                    desc: 'Visual style',
                  },
                  {
                    prop: 'color',
                    type: 'BadgeColor',
                    default: "'default'",
                    desc: 'Color theme',
                  },
                  {
                    prop: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    default: "'md'",
                    desc: 'Badge size',
                  },
                  {
                    prop: 'max',
                    type: 'number',
                    default: '99',
                    desc: 'Max number before "+"',
                  },
                  {
                    prop: 'dot',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Show as dot only',
                  },
                  {
                    prop: 'pulse',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Pulse animation',
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
