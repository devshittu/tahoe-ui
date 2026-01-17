// src/app/playground/headline/page.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '@/components/Typography';
import {
  HeadlineBlock,
  Headline,
  Subheadline,
  type HeadlineSize,
  type HeadlineAlign,
} from './components';

const SIZE_OPTIONS: HeadlineSize[] = ['small', 'medium', 'large', 'display'];
const ALIGN_OPTIONS: HeadlineAlign[] = ['left', 'center', 'right'];
const SPACING_OPTIONS: ('tight' | 'normal' | 'loose')[] = [
  'tight',
  'normal',
  'loose',
];

export default function HeadlinePlayground() {
  const [size, setSize] = useState<HeadlineSize>('large');
  const [align, setAlign] = useState<HeadlineAlign>('center');
  const [spacing, setSpacing] = useState<'tight' | 'normal' | 'loose'>(
    'normal',
  );
  const [balanced, setBalanced] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Page Header */}
        <HeadlineBlock
          headline="Headline Block"
          subheadline="Apple-style page headlines with fluid typography, text balancing, and semantic HTML."
          size="medium"
        />

        {/* Configuration Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Size */}
            <div className="space-y-3">
              <Text fontWeight="medium" color="primary">
                Size
              </Text>
              <div className="flex flex-wrap gap-2">
                {SIZE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      size === s
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Alignment */}
            <div className="space-y-3">
              <Text fontWeight="medium" color="primary">
                Alignment
              </Text>
              <div className="flex flex-wrap gap-2">
                {ALIGN_OPTIONS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAlign(a)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      align === a
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div className="space-y-3">
              <Text fontWeight="medium" color="primary">
                Spacing
              </Text>
              <div className="flex flex-wrap gap-2">
                {SPACING_OPTIONS.map((sp) => (
                  <button
                    key={sp}
                    onClick={() => setSpacing(sp)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      spacing === sp
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Balance */}
            <div className="space-y-3">
              <Text fontWeight="medium" color="primary">
                Text Balance
              </Text>
              <button
                onClick={() => setBalanced(!balanced)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  balanced
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                )}
              >
                {balanced ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 sm:p-12">
          <HeadlineBlock
            headline="The future of design systems"
            subheadline="Build beautiful, consistent interfaces with fluid typography and thoughtful spacing."
            size={size}
            align={align}
            spacing={spacing}
            balanced={balanced}
          />
        </div>

        {/* Size Comparison */}
        <div className="space-y-8">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Size Comparison
          </Text>

          <div className="space-y-12">
            {SIZE_OPTIONS.map((s) => (
              <div
                key={s}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8"
              >
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {s}
                  </span>
                </div>
                <HeadlineBlock
                  headline="Innovation at Scale"
                  subheadline="Transforming ideas into exceptional digital experiences."
                  size={s}
                  align="left"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Composable API */}
        <div className="space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Composable API
          </Text>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
            <HeadlineBlock spacing="normal" align="center">
              <Headline size="large" level={1}>
                Compose Your Vision
              </Headline>
              <Subheadline size="large">
                Use the composable API for full control over your headlines.
              </Subheadline>
            </HeadlineBlock>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm text-gray-700 dark:text-gray-300">
              <code>{`<HeadlineBlock spacing="normal" align="center">
  <Headline size="large" level={1}>
    Compose Your Vision
  </Headline>
  <Subheadline size="large">
    Use the composable API for full control.
  </Subheadline>
</HeadlineBlock>`}</code>
            </pre>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Real-World Examples
          </Text>

          {/* Hero Section */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-2xl p-12 sm:p-16">
            <HeadlineBlock
              headline="iPhone 16 Pro"
              subheadline="Hello, Apple Intelligence."
              size="display"
              align="center"
              className="text-white [&_h1]:text-white [&_p]:text-gray-300"
            />
          </div>

          {/* Product Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12">
            <HeadlineBlock
              headline="Designed for developers"
              subheadline="A complete toolkit for building modern web applications with React, TypeScript, and Tailwind CSS."
              size="medium"
              align="left"
            />
          </div>

          {/* Minimal Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
            <HeadlineBlock
              headline="Getting Started"
              subheadline="Everything you need to know to begin."
              size="small"
              align="left"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Features
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Fluid responsive typography across all screen sizes</p>
              <p>CSS text-wrap: balance for optimal line breaks</p>
              <p>Semantic HTML with configurable heading levels</p>
              <p>Tight letter-spacing for display text</p>
              <p>Dark mode support out of the box</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              API Options
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  size
                </code>{' '}
                small, medium, large, display
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  align
                </code>{' '}
                left, center, right
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  spacing
                </code>{' '}
                tight, normal, loose
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  level
                </code>{' '}
                1-6 (semantic h1-h6)
              </p>
              <p>
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                  balanced
                </code>{' '}
                enable text-wrap: balance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
