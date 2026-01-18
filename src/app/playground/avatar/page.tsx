// src/app/playground/avatar/page.tsx

'use client';

import { useState } from 'react';
import { HeadlineBlock } from '@/app/playground/headline/components';
import { SegmentedControl } from '@/app/playground/segmented-control/components';
import {
  Avatar,
  AvatarGroup,
  AvatarSize,
  AvatarShape,
  AvatarStatus,
} from './components';

const sampleUsers = [
  { name: 'John Doe', src: 'https://i.pravatar.cc/150?u=john' },
  { name: 'Jane Smith', src: 'https://i.pravatar.cc/150?u=jane' },
  { name: 'Bob Wilson', src: 'https://i.pravatar.cc/150?u=bob' },
  { name: 'Alice Brown', src: 'https://i.pravatar.cc/150?u=alice' },
  { name: 'Charlie Davis', src: 'https://i.pravatar.cc/150?u=charlie' },
  { name: 'Diana Evans', src: 'https://i.pravatar.cc/150?u=diana' },
];

export default function AvatarPage() {
  const [size, setSize] = useState<AvatarSize>('md');
  const [shape, setShape] = useState<AvatarShape>('circle');
  const [status, setStatus] = useState<AvatarStatus>('none');
  const [bordered, setBordered] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <HeadlineBlock
          headline="Avatar"
          subheadline="User profile images with intelligent fallback to initials. Supports status indicators and group display."
          size="medium"
        />

        {/* Configuration Panel */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Configuration
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Size selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </span>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as AvatarSize)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="xs">Extra Small</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                  <option value="2xl">2X Large</option>
                </select>
              </div>

              {/* Shape selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Shape
                </span>
                <SegmentedControl
                  options={[
                    { value: 'circle', label: 'Circle' },
                    { value: 'square', label: 'Square' },
                  ]}
                  value={shape}
                  onChange={setShape}
                  size="sm"
                />
              </div>

              {/* Status selector */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as AvatarStatus)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="none">None</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="away">Away</option>
                  <option value="busy">Busy</option>
                </select>
              </div>

              {/* Bordered toggle */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bordered
                </span>
                <button
                  type="button"
                  onClick={() => setBordered(!bordered)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      bordered
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                  aria-pressed={bordered}
                >
                  {bordered ? 'On' : 'Off'}
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
              <Avatar
                src={sampleUsers[0].src}
                name={sampleUsers[0].name}
                size={size}
                shape={shape}
                status={status}
                bordered={bordered}
              />
              <Avatar
                name="Jane Smith"
                size={size}
                shape={shape}
                status={status}
                bordered={bordered}
              />
              <Avatar
                size={size}
                shape={shape}
                status={status}
                bordered={bordered}
              />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              With image / Initials fallback / Icon fallback
            </p>
          </div>
        </section>

        {/* Size Variants */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Size Variants
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-end gap-4 flex-wrap">
              {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
                <div key={s} className="text-center">
                  <Avatar name="John Doe" size={s} />
                  <span className="block text-xs text-gray-400 mt-2">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Status Indicators */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Status Indicators
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-6 flex-wrap">
              {(['online', 'offline', 'away', 'busy'] as const).map((s) => (
                <div key={s} className="text-center">
                  <Avatar
                    src={`https://i.pravatar.cc/150?u=${s}`}
                    name="User"
                    size="lg"
                    status={s}
                  />
                  <span className="block text-xs text-gray-400 mt-2 capitalize">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fallback Colors */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Deterministic Fallback Colors
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Colors are determined by name hash - same name always gets same
              color.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                'Alice',
                'Bob',
                'Charlie',
                'Diana',
                'Eve',
                'Frank',
                'Grace',
                'Henry',
              ].map((name) => (
                <Avatar key={name} name={name} size="lg" />
              ))}
            </div>
          </div>
        </section>

        {/* Avatar Group */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Avatar Group
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="space-y-6">
              <div>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Default (max 5)
                </span>
                <AvatarGroup>
                  {sampleUsers.map((user) => (
                    <Avatar key={user.name} src={user.src} name={user.name} />
                  ))}
                </AvatarGroup>
              </div>

              <div>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Max 3 shown
                </span>
                <AvatarGroup max={3}>
                  {sampleUsers.map((user) => (
                    <Avatar key={user.name} src={user.src} name={user.name} />
                  ))}
                </AvatarGroup>
              </div>

              <div>
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Large size, tight spacing
                </span>
                <AvatarGroup size="lg" spacing="tight" max={4}>
                  {sampleUsers.slice(0, 5).map((user) => (
                    <Avatar key={user.name} name={user.name} />
                  ))}
                </AvatarGroup>
              </div>
            </div>
          </div>
        </section>

        {/* Clickable Avatar */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Clickable Avatar
          </h2>
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Add onClick to make avatar interactive with hover and focus
              states.
            </p>
            <Avatar
              src={sampleUsers[0].src}
              name={sampleUsers[0].name}
              size="xl"
              onClick={() => alert('Avatar clicked!')}
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
                title: 'Intelligent Fallback',
                description:
                  'Gracefully falls back to initials, then to icon if no name',
              },
              {
                title: 'Deterministic Colors',
                description:
                  'Same name always produces same background color via hash',
              },
              {
                title: 'Six Sizes',
                description: 'From xs (24px) to 2xl (96px) following 8pt grid',
              },
              {
                title: 'Status Indicators',
                description: 'Online, offline, away, and busy status badges',
              },
              {
                title: 'Avatar Groups',
                description: 'Overlapping display with "+N" overflow indicator',
              },
              {
                title: 'Keyboard Accessible',
                description: 'Clickable avatars are fully keyboard navigable',
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
                    prop: 'src',
                    type: 'string',
                    default: '—',
                    desc: 'Image source URL',
                  },
                  {
                    prop: 'name',
                    type: 'string',
                    default: '—',
                    desc: 'User name (used for initials fallback)',
                  },
                  {
                    prop: 'size',
                    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
                    default: "'md'",
                    desc: 'Avatar size',
                  },
                  {
                    prop: 'shape',
                    type: "'circle' | 'square'",
                    default: "'circle'",
                    desc: 'Avatar shape',
                  },
                  {
                    prop: 'status',
                    type: "'online' | 'offline' | 'away' | 'busy' | 'none'",
                    default: "'none'",
                    desc: 'Status indicator',
                  },
                  {
                    prop: 'bordered',
                    type: 'boolean',
                    default: 'false',
                    desc: 'Show border ring',
                  },
                  {
                    prop: 'fallback',
                    type: 'ReactNode',
                    default: '—',
                    desc: 'Custom fallback content',
                  },
                  {
                    prop: 'onClick',
                    type: '() => void',
                    default: '—',
                    desc: 'Click handler (makes interactive)',
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
