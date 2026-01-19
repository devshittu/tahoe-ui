// src/app/playground/button/page.tsx

'use client';

import { useState } from 'react';
import {
  FiSend,
  FiDownload,
  FiTrash2,
  FiPlus,
  FiArrowRight,
  FiHeart,
  FiShare,
  FiEdit,
  FiCheck,
  FiX,
  FiLoader,
  FiZap,
} from 'react-icons/fi';
import { HeadlineBlock } from '@/app/playground/headline/components';
import { SegmentedControl } from '@/app/playground/segmented-control/components';
import {
  Button,
  type ButtonVariant,
  type ButtonColor,
  type ButtonSize,
  type ButtonRadius,
} from '@/components/Button';

export default function ButtonPage() {
  const [variant, setVariant] = useState<ButtonVariant>('solid');
  const [color, setColor] = useState<ButtonColor>('primary');
  const [size, setSize] = useState<ButtonSize>('md');
  const [radius, setRadius] = useState<ButtonRadius>('md');
  const [isLoading, setIsLoading] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [disableAnimation, setDisableAnimation] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <HeadlineBlock
          headline="Button"
          subheadline="Physics-based button with Apple-inspired interactions. Features spring animations, haptic feedback support, and full accessibility."
          size="medium"
        />

        {/* Configuration Panel */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Configuration
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Variant */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Variant
                </span>
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as ButtonVariant)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="solid">Solid</option>
                  <option value="subtle">Subtle</option>
                  <option value="outline">Outline</option>
                  <option value="ghost">Ghost</option>
                  <option value="glass">Glass</option>
                </select>
              </div>

              {/* Color */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </span>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value as ButtonColor)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="accent">Accent</option>
                  <option value="neutral">Neutral</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>

              {/* Size */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </span>
                <SegmentedControl
                  options={[
                    { value: 'xs', label: 'XS' },
                    { value: 'sm', label: 'S' },
                    { value: 'md', label: 'M' },
                    { value: 'lg', label: 'L' },
                    { value: 'xl', label: 'XL' },
                  ]}
                  value={size}
                  onChange={setSize}
                  size="sm"
                />
              </div>

              {/* Radius */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Radius
                </span>
                <SegmentedControl
                  options={[
                    { value: 'none', label: 'None' },
                    { value: 'sm', label: 'S' },
                    { value: 'md', label: 'M' },
                    { value: 'lg', label: 'L' },
                    { value: 'full', label: 'Full' },
                  ]}
                  value={radius}
                  onChange={setRadius}
                  size="sm"
                />
              </div>

              {/* Loading */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loading
                </span>
                <button
                  type="button"
                  onClick={() => setIsLoading(!isLoading)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      isLoading
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                  aria-pressed={isLoading}
                >
                  {isLoading ? 'On' : 'Off'}
                </button>
              </div>

              {/* Animation Toggle */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Animation
                </span>
                <button
                  type="button"
                  onClick={() => setDisableAnimation(!disableAnimation)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      !disableAnimation
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                  aria-pressed={!disableAnimation}
                >
                  {disableAnimation ? 'Off' : 'On'}
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
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Hover and click to experience spring physics
            </p>
            <div className={fullWidth ? 'space-y-4' : 'flex flex-wrap gap-4'}>
              <Button
                variant={variant}
                color={color}
                size={size}
                radius={radius}
                isLoading={isLoading}
                fullWidth={fullWidth}
                disableAnimation={disableAnimation}
              >
                Button
              </Button>
              <Button
                variant={variant}
                color={color}
                size={size}
                radius={radius}
                isLoading={isLoading}
                loadingText="Sending..."
                fullWidth={fullWidth}
                disableAnimation={disableAnimation}
                leftIcon={<FiSend />}
              >
                With Icon
              </Button>
              <Button
                variant={variant}
                color={color}
                size={size}
                radius={radius}
                isLoading={isLoading}
                fullWidth={fullWidth}
                disableAnimation={disableAnimation}
                rightIcon={<FiArrowRight />}
              >
                Continue
              </Button>
            </div>
          </div>
        </section>

        {/* Physics Animation Demo */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Physics-Based Animation
          </h2>
          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Buttons use spring physics for natural, Apple-like interactions.
              Hover lifts the button, press squashes it.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="solid" color="primary" leftIcon={<FiZap />}>
                Spring Hover
              </Button>
              <Button variant="solid" color="accent" leftIcon={<FiCheck />}>
                Press Effect
              </Button>
              <Button variant="glass" color="primary" leftIcon={<FiLoader />}>
                Glass Vibrancy
              </Button>
            </div>
          </div>
        </section>

        {/* Glass Variant Showcase */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Glass Variant
          </h2>
          <div className="relative p-8 rounded-xl overflow-hidden">
            {/* Gradient background to showcase glass effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500" />
            <div className="relative flex flex-wrap gap-4">
              <Button variant="glass" color="primary">
                Primary Glass
              </Button>
              <Button variant="glass" color="accent">
                Accent Glass
              </Button>
              <Button variant="glass" color="success" leftIcon={<FiCheck />}>
                Success Glass
              </Button>
              <Button variant="glass" color="error" leftIcon={<FiX />}>
                Error Glass
              </Button>
            </div>
          </div>
        </section>

        {/* Variants */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Variants
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            {(['solid', 'subtle', 'outline', 'ghost', 'glass'] as const).map(
              (v) => (
                <div key={v} className="flex items-center gap-4">
                  <span className="w-16 text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                    {v}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Button variant={v} color="primary">
                      Primary
                    </Button>
                    <Button variant={v} color="accent">
                      Accent
                    </Button>
                    <Button variant={v} color="success">
                      Success
                    </Button>
                    <Button variant={v} color="error">
                      Error
                    </Button>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Sizes */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sizes
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              All sizes maintain 44px minimum touch target for accessibility
            </p>
            <div className="flex flex-wrap items-end gap-4">
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
                <div key={s} className="text-center">
                  <Button size={s} color="primary">
                    Button
                  </Button>
                  <span className="block text-xs text-gray-400 mt-2">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Semantic Colors */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Semantic Colors
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(
                [
                  'primary',
                  'secondary',
                  'accent',
                  'neutral',
                  'success',
                  'warning',
                  'error',
                ] as const
              ).map((c) => (
                <Button key={c} color={c} className="capitalize">
                  {c}
                </Button>
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
            <div className="flex flex-wrap gap-4">
              <Button color="primary" leftIcon={<FiPlus />}>
                Add Item
              </Button>
              <Button color="accent" rightIcon={<FiDownload />}>
                Download
              </Button>
              <Button color="success" leftIcon={<FiEdit />}>
                Edit
              </Button>
              <Button color="error" leftIcon={<FiTrash2 />}>
                Delete
              </Button>
              <Button variant="outline" color="accent" leftIcon={<FiHeart />}>
                Like
              </Button>
              <Button variant="ghost" color="accent" leftIcon={<FiShare />}>
                Share
              </Button>
            </div>
          </div>
        </section>

        {/* Loading States */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Loading States
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button color="primary" isLoading>
                Loading
              </Button>
              <Button color="accent" isLoading loadingText="Saving...">
                Save
              </Button>
              <Button color="success" isLoading loadingText="Processing...">
                Submit
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Use <code className="text-blue-600">loadingText</code> to show
              custom text during loading
            </p>
          </div>
        </section>

        {/* States */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            States
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <div>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-3">
                Normal (hover and press to see animation)
              </span>
              <Button color="primary">Normal Button</Button>
            </div>
            <div>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-3">
                Disabled
              </span>
              <Button color="primary" disabled>
                Disabled
              </Button>
            </div>
            <div>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-3">
                Full Width
              </span>
              <Button color="primary" fullWidth>
                Full Width Button
              </Button>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Real-world Examples
          </h2>
          <div className="space-y-6">
            {/* Form actions */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Form actions
              </p>
              <div className="flex gap-3">
                <Button color="primary">Save Changes</Button>
                <Button variant="outline" color="primary">
                  Cancel
                </Button>
              </div>
            </div>

            {/* Destructive action */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Destructive action confirmation
              </p>
              <div className="flex gap-3">
                <Button color="error" leftIcon={<FiTrash2 />}>
                  Delete Account
                </Button>
                <Button variant="ghost" color="primary">
                  Keep Account
                </Button>
              </div>
            </div>

            {/* Social actions */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Social actions
              </p>
              <div className="flex gap-2">
                <Button
                  variant="subtle"
                  color="error"
                  size="sm"
                  leftIcon={<FiHeart />}
                >
                  Like
                </Button>
                <Button
                  variant="subtle"
                  color="accent"
                  size="sm"
                  leftIcon={<FiShare />}
                >
                  Share
                </Button>
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
                title: 'Spring Physics',
                description:
                  'Framer Motion spring animations for hover and press states',
              },
              {
                title: 'Glass Variant',
                description:
                  'Premium vibrancy effect with backdrop blur for modern UIs',
              },
              {
                title: 'Reduced Motion',
                description:
                  'Automatically respects prefers-reduced-motion preference',
              },
              {
                title: 'Haptic Feedback',
                description: 'onHaptic callback for native app integration',
              },
              {
                title: '44px Touch Targets',
                description:
                  'All sizes maintain minimum touch target for accessibility',
              },
              {
                title: 'Semantic Colors',
                description:
                  'Primary, accent, success, warning, error color system',
              },
              {
                title: 'Loading Text',
                description:
                  'Optional loadingText prop for contextual loading messages',
              },
              {
                title: 'Focus Always On',
                description:
                  'Keyboard focus ring enabled by default for accessibility',
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
                    type: "'solid' | 'subtle' | 'outline' | 'ghost' | 'glass'",
                    default: "'solid'",
                    desc: 'Visual style variant',
                  },
                  {
                    prop: 'color',
                    type: "'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error'",
                    default: "'primary'",
                    desc: 'Semantic color scheme',
                  },
                  {
                    prop: 'size',
                    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
                    default: "'md'",
                    desc: 'Button size (all enforce 44px touch target)',
                  },
                  {
                    prop: 'radius',
                    type: "'none' | 'sm' | 'md' | 'lg' | 'full'",
                    default: "'md'",
                    desc: 'Border radius',
                  },
                  {
                    prop: 'isLoading',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Show loading spinner',
                  },
                  {
                    prop: 'loadingText',
                    type: 'string',
                    default: '—',
                    desc: 'Text to show during loading',
                  },
                  {
                    prop: 'fullWidth',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Full width button',
                  },
                  {
                    prop: 'leftIcon',
                    type: 'ReactNode',
                    default: '—',
                    desc: 'Icon before text',
                  },
                  {
                    prop: 'rightIcon',
                    type: 'ReactNode',
                    default: '—',
                    desc: 'Icon after text',
                  },
                  {
                    prop: 'disableAnimation',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Disable spring physics (auto-disabled if prefers-reduced-motion)',
                  },
                  {
                    prop: 'onHaptic',
                    type: '(type: HapticFeedback) => void',
                    default: '—',
                    desc: 'Callback for haptic feedback (native apps)',
                  },
                  {
                    prop: 'disabled',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Disable button',
                  },
                ].map((row) => (
                  <tr key={row.prop}>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">
                      {row.prop}
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400 text-xs">
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
