// src/app/playground/divider/page.tsx

'use client';

import { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { HeadlineBlock } from '@/app/playground/headline/components';
import { SegmentedControl } from '@/app/playground/segmented-control/components';
import {
  Divider,
  DividerOrientation,
  DividerVariant,
  DividerThickness,
  DividerAlign,
} from './components';

export default function DividerPage() {
  const [orientation, setOrientation] =
    useState<DividerOrientation>('horizontal');
  const [variant, setVariant] = useState<DividerVariant>('solid');
  const [thickness, setThickness] = useState<DividerThickness>('thin');
  const [color, setColor] = useState<'default' | 'subtle' | 'strong'>(
    'default',
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <HeadlineBlock
          headline="Divider"
          subheadline="Visual separator for content sections. Supports horizontal and vertical orientation with optional text content."
          size="medium"
        />

        {/* Configuration Panel */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Configuration
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Orientation */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Orientation
                </span>
                <SegmentedControl
                  options={[
                    { value: 'horizontal', label: 'H' },
                    { value: 'vertical', label: 'V' },
                  ]}
                  value={orientation}
                  onChange={setOrientation}
                  size="sm"
                />
              </div>

              {/* Variant */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Variant
                </span>
                <SegmentedControl
                  options={[
                    { value: 'solid', label: 'Solid' },
                    { value: 'dashed', label: 'Dash' },
                    { value: 'dotted', label: 'Dot' },
                  ]}
                  value={variant}
                  onChange={setVariant}
                  size="sm"
                />
              </div>

              {/* Thickness */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thickness
                </span>
                <SegmentedControl
                  options={[
                    { value: 'thin', label: 'Thin' },
                    { value: 'medium', label: 'Med' },
                    { value: 'thick', label: 'Thick' },
                  ]}
                  value={thickness}
                  onChange={setThickness}
                  size="sm"
                />
              </div>

              {/* Color */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </span>
                <SegmentedControl
                  options={[
                    { value: 'subtle', label: 'Subtle' },
                    { value: 'default', label: 'Default' },
                    { value: 'strong', label: 'Strong' },
                  ]}
                  value={color}
                  onChange={setColor}
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
            {orientation === 'horizontal' ? (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Content above
                </p>
                <Divider
                  orientation={orientation}
                  variant={variant}
                  thickness={thickness}
                  color={color}
                  spacing="none"
                />
                <p className="text-gray-600 dark:text-gray-400">
                  Content below
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 gap-4">
                <span className="text-gray-600 dark:text-gray-400">Left</span>
                <Divider
                  orientation={orientation}
                  variant={variant}
                  thickness={thickness}
                  color={color}
                  spacing="none"
                />
                <span className="text-gray-600 dark:text-gray-400">Right</span>
              </div>
            )}
          </div>
        </section>

        {/* Line Styles */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Line Styles
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6">
            {(['solid', 'dashed', 'dotted'] as const).map((v) => (
              <div key={v}>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize">
                  {v}
                </span>
                <Divider variant={v} spacing="none" />
              </div>
            ))}
          </div>
        </section>

        {/* Thickness */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Thickness
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6">
            {(['thin', 'medium', 'thick'] as const).map((t) => (
              <div key={t}>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize">
                  {t}
                </span>
                <Divider thickness={t} spacing="none" />
              </div>
            ))}
          </div>
        </section>

        {/* With Text */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            With Text Content
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-8">
            <div>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-3">
                Center aligned (default)
              </span>
              <Divider spacing="none">or</Divider>
            </div>

            <div>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-3">
                With longer text
              </span>
              <Divider spacing="none">or continue with</Divider>
            </div>

            <div>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-3">
                With icon
              </span>
              <Divider spacing="none">
                <FiStar className="w-4 h-4" />
              </Divider>
            </div>
          </div>
        </section>

        {/* Text Alignment */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Text Alignment
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6">
            {(['start', 'center', 'end'] as const).map((a) => (
              <div key={a}>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize">
                  {a}
                </span>
                <Divider align={a} spacing="none">
                  Section
                </Divider>
              </div>
            ))}
          </div>
        </section>

        {/* Vertical Dividers */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Vertical Dividers
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-center h-24 gap-4">
              <span className="text-gray-600 dark:text-gray-400">Home</span>
              <Divider orientation="vertical" spacing="none" />
              <span className="text-gray-600 dark:text-gray-400">Products</span>
              <Divider orientation="vertical" spacing="none" />
              <span className="text-gray-600 dark:text-gray-400">About</span>
              <Divider orientation="vertical" spacing="none" />
              <span className="text-gray-600 dark:text-gray-400">Contact</span>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Real-world Examples
          </h2>
          <div className="space-y-6">
            {/* Login form divider */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Login form pattern
              </p>
              <div className="max-w-sm mx-auto space-y-4">
                <button className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium">
                  Continue with Google
                </button>
                <Divider spacing="none">or</Divider>
                <button className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium">
                  Sign in with Email
                </button>
              </div>
            </div>

            {/* Card sections */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Card content separation
              </p>
              <div className="max-w-sm mx-auto p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Order Summary
                </h3>
                <Divider spacing="sm" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      $99.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="text-gray-900 dark:text-white">$5.00</span>
                  </div>
                </div>
                <Divider spacing="sm" />
                <div className="flex justify-between font-medium">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">$104.00</span>
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
                title: 'Two Orientations',
                description:
                  'Horizontal for stacked content, vertical for inline',
              },
              {
                title: 'Three Line Styles',
                description: 'Solid, dashed, and dotted variants',
              },
              {
                title: 'Content Support',
                description: 'Add text or icons in the center of the divider',
              },
              {
                title: 'Flexible Alignment',
                description: 'Position content at start, center, or end',
              },
              {
                title: 'Configurable Spacing',
                description: 'Built-in margin options (none, sm, md, lg)',
              },
              {
                title: 'Accessibility',
                description: 'Proper separator role and aria attributes',
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
                    prop: 'orientation',
                    type: "'horizontal' | 'vertical'",
                    default: "'horizontal'",
                    desc: 'Divider direction',
                  },
                  {
                    prop: 'variant',
                    type: "'solid' | 'dashed' | 'dotted'",
                    default: "'solid'",
                    desc: 'Line style',
                  },
                  {
                    prop: 'thickness',
                    type: "'thin' | 'medium' | 'thick'",
                    default: "'thin'",
                    desc: 'Line thickness',
                  },
                  {
                    prop: 'color',
                    type: "'default' | 'subtle' | 'strong'",
                    default: "'default'",
                    desc: 'Color intensity',
                  },
                  {
                    prop: 'children',
                    type: 'ReactNode',
                    default: '—',
                    desc: 'Content in divider',
                  },
                  {
                    prop: 'align',
                    type: "'start' | 'center' | 'end'",
                    default: "'center'",
                    desc: 'Content alignment',
                  },
                  {
                    prop: 'spacing',
                    type: "'none' | 'sm' | 'md' | 'lg'",
                    default: "'md'",
                    desc: 'Margin around divider',
                  },
                  {
                    prop: 'decorative',
                    type: 'boolean',
                    default: 'true',
                    desc: 'Hide from screen readers',
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
