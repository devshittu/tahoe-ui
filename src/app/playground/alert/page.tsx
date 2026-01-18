// src/app/playground/alert/page.tsx

'use client';

import { useState } from 'react';
import { FiRefreshCw, FiExternalLink } from 'react-icons/fi';
import { HeadlineBlock } from '@/app/playground/headline/components';
import { SegmentedControl } from '@/app/playground/segmented-control/components';
import { Alert, AlertVariant, AlertStyle, AlertSize } from './components';

export default function AlertPage() {
  const [variant, setVariant] = useState<AlertVariant>('info');
  const [style, setStyle] = useState<AlertStyle>('soft');
  const [size, setSize] = useState<AlertSize>('md');
  const [dismissible, setDismissible] = useState(false);
  const [showDemo, setShowDemo] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <HeadlineBlock
          headline="Alert"
          subheadline="Contextual feedback messages for important information, warnings, errors, and success states."
          size="medium"
        />

        {/* Configuration Panel */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Configuration
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Variant */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Variant
                </span>
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as AlertVariant)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>

              {/* Style */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Style
                </span>
                <SegmentedControl
                  options={[
                    { value: 'filled', label: 'Filled' },
                    { value: 'soft', label: 'Soft' },
                    { value: 'outline', label: 'Outline' },
                  ]}
                  value={style}
                  onChange={setStyle}
                  size="sm"
                />
              </div>

              {/* Size */}
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

              {/* Dismissible */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dismissible
                </span>
                <button
                  type="button"
                  onClick={() => setDismissible(!dismissible)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      dismissible
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                  aria-pressed={dismissible}
                >
                  {dismissible ? 'On' : 'Off'}
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
            {showDemo ? (
              <Alert
                variant={variant}
                style={style}
                size={size}
                title="Alert Title"
                dismissible={dismissible}
                onDismiss={() => setShowDemo(false)}
              >
                This is the alert description with additional context.
              </Alert>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Alert dismissed
                </p>
                <button
                  onClick={() => setShowDemo(true)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Show again
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Variants */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Variants
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            {(['info', 'success', 'warning', 'error'] as const).map((v) => (
              <Alert
                key={v}
                variant={v}
                title={`${v.charAt(0).toUpperCase() + v.slice(1)} Alert`}
              >
                This is a {v} alert with default styling.
              </Alert>
            ))}
          </div>
        </section>

        {/* Styles */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Styles
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6">
            {(['filled', 'soft', 'outline'] as const).map((s) => (
              <div key={s}>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize">
                  {s}
                </span>
                <div className="space-y-2">
                  {(['info', 'success', 'warning', 'error'] as const).map(
                    (v) => (
                      <Alert key={v} variant={v} style={s}>
                        {v.charAt(0).toUpperCase() + v.slice(1)} message
                      </Alert>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sizes */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sizes
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <div key={s}>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Size: {s}
                </span>
                <Alert variant="info" size={s} title="Alert Title">
                  This is the alert description.
                </Alert>
              </div>
            ))}
          </div>
        </section>

        {/* With Actions */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            With Actions
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <Alert
              variant="warning"
              title="Update available"
              action={
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors">
                    Update now
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium rounded-md text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors">
                    Later
                  </button>
                </div>
              }
            >
              A new version is available with important security fixes.
            </Alert>

            <Alert
              variant="error"
              style="filled"
              title="Connection lost"
              action={
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-white/20 hover:bg-white/30 transition-colors">
                  <FiRefreshCw className="w-4 h-4" />
                  Retry
                </button>
              }
            >
              Unable to connect to the server. Please check your connection.
            </Alert>

            <Alert
              variant="success"
              title="Payment successful"
              dismissible
              action={
                <button className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                  View receipt
                  <FiExternalLink className="w-3.5 h-3.5" />
                </button>
              }
            >
              Your payment of $99.00 has been processed.
            </Alert>
          </div>
        </section>

        {/* Content Variations */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Content Variations
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <div>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                Title only
              </span>
              <Alert variant="info" title="This is a title-only alert" />
            </div>

            <div>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                Description only
              </span>
              <Alert variant="success">
                Your changes have been saved successfully.
              </Alert>
            </div>

            <div>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                Title and description
              </span>
              <Alert variant="warning" title="Attention needed">
                Please review the following items before continuing.
              </Alert>
            </div>

            <div>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                Without icon
              </span>
              <Alert variant="error" hideIcon title="Error">
                Something went wrong. Please try again.
              </Alert>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Real-world Examples
          </h2>
          <div className="space-y-6">
            {/* Form validation */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Form validation error
              </p>
              <Alert variant="error" title="Please fix the following errors:">
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Email address is required</li>
                  <li>Password must be at least 8 characters</li>
                  <li>Please accept the terms and conditions</li>
                </ul>
              </Alert>
            </div>

            {/* System notification */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                System maintenance notice
              </p>
              <Alert
                variant="info"
                style="filled"
                title="Scheduled Maintenance"
                dismissible
              >
                Our services will be temporarily unavailable on Sunday, Jan 20
                from 2:00 AM to 4:00 AM EST.
              </Alert>
            </div>

            {/* Feature announcement */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Feature announcement
              </p>
              <Alert
                variant="success"
                style="outline"
                title="New feature available"
                action={
                  <button className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                    Learn more
                  </button>
                }
              >
                You can now export your data in multiple formats including CSV,
                JSON, and PDF.
              </Alert>
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
                title: 'Four Semantic Variants',
                description: 'Info, success, warning, and error states',
              },
              {
                title: 'Three Visual Styles',
                description: 'Filled, soft, and outline appearances',
              },
              {
                title: 'Default Icons',
                description: 'Each variant has an appropriate default icon',
              },
              {
                title: 'Dismissible',
                description: 'Optional close button with callback',
              },
              {
                title: 'Action Support',
                description: 'Add buttons or links for user actions',
              },
              {
                title: 'Accessible',
                description: 'Uses role="alert" for screen readers',
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
                    type: "'info' | 'success' | 'warning' | 'error'",
                    default: "'info'",
                    desc: 'Semantic variant',
                  },
                  {
                    prop: 'style',
                    type: "'filled' | 'soft' | 'outline'",
                    default: "'soft'",
                    desc: 'Visual style',
                  },
                  {
                    prop: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    default: "'md'",
                    desc: 'Alert size',
                  },
                  {
                    prop: 'title',
                    type: 'ReactNode',
                    default: '—',
                    desc: 'Alert title',
                  },
                  {
                    prop: 'children',
                    type: 'ReactNode',
                    default: '—',
                    desc: 'Alert content/description',
                  },
                  {
                    prop: 'icon',
                    type: 'ReactNode',
                    default: 'Per variant',
                    desc: 'Custom icon',
                  },
                  {
                    prop: 'hideIcon',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Hide the icon',
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
                    prop: 'action',
                    type: 'ReactNode',
                    default: '—',
                    desc: 'Action button(s)',
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
