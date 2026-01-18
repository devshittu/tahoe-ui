// src/app/playground/hooks/use-media-query/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { useMediaQuery } from '@/hooks';

const COMMON_QUERIES = [
  { label: 'Max width 767px (mobile)', query: '(max-width: 767px)' },
  { label: 'Min width 768px (tablet+)', query: '(min-width: 768px)' },
  { label: 'Min width 1024px (desktop+)', query: '(min-width: 1024px)' },
  { label: 'Prefers dark mode', query: '(prefers-color-scheme: dark)' },
  { label: 'Prefers light mode', query: '(prefers-color-scheme: light)' },
  {
    label: 'Prefers reduced motion',
    query: '(prefers-reduced-motion: reduce)',
  },
  { label: 'Portrait orientation', query: '(orientation: portrait)' },
  { label: 'Landscape orientation', query: '(orientation: landscape)' },
  { label: 'High resolution display', query: '(min-resolution: 2dppx)' },
  { label: 'Hover capable device', query: '(hover: hover)' },
];

function QueryDisplay({ query, label }: { query: string; label: string }) {
  const matches = useMediaQuery(query);
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div>
        <Text color="primary" className="text-sm">
          {label}
        </Text>
        <SmallText className="text-gray-400 font-mono">{query}</SmallText>
      </div>
      <div
        className={`px-3 py-1 rounded-full text-xs font-medium ${matches ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
      >
        {matches ? 'Matches' : 'No match'}
      </div>
    </div>
  );
}

export default function UseMediaQueryPlayground() {
  const [customQuery, setCustomQuery] = useState('(min-width: 500px)');
  const customMatches = useMediaQuery(customQuery);

  // Live demos
  const isMobile = useMediaQuery('(max-width: 767px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="useMediaQuery"
          subheadline="SSR-safe media query hook that updates on viewport changes."
          size="medium"
        />

        {/* Live Status */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Status
          </Text>
          <div className="grid md:grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-lg ${isMobile ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}
            >
              <Text color="primary" fontWeight="medium">
                Mobile View
              </Text>
              <SmallText
                className={
                  isMobile
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500'
                }
              >
                {isMobile ? 'You are on mobile' : 'Desktop/tablet view'}
              </SmallText>
            </div>
            <div
              className={`p-4 rounded-lg ${prefersDark ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}
            >
              <Text color="primary" fontWeight="medium">
                Color Scheme
              </Text>
              <SmallText
                className={
                  prefersDark
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-500'
                }
              >
                {prefersDark ? 'Prefers dark mode' : 'Prefers light mode'}
              </SmallText>
            </div>
            <div
              className={`p-4 rounded-lg ${prefersReducedMotion ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}
            >
              <Text color="primary" fontWeight="medium">
                Motion Preference
              </Text>
              <SmallText
                className={
                  prefersReducedMotion
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-gray-500'
                }
              >
                {prefersReducedMotion ? 'Reduced motion' : 'Normal motion'}
              </SmallText>
            </div>
          </div>
        </div>

        {/* Custom Query Test */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Test Custom Query
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Enter media query..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-mono"
              />
              <div
                className={`px-4 py-2 rounded-lg text-sm font-medium ${customMatches ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}
              >
                {customMatches ? 'Matches' : 'No match'}
              </div>
            </div>
            <SmallText className="text-gray-500">
              Try: (min-width: 1200px), (max-height: 600px),
              (prefers-color-scheme: dark)
            </SmallText>
          </div>
        </div>

        {/* Common Queries */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Common Media Queries
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            {COMMON_QUERIES.map(({ label, query }) => (
              <QueryDisplay key={query} label={label} query={query} />
            ))}
          </div>
        </div>

        {/* Practical Example */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Practical Example
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <SmallText className="text-gray-500 mb-4 block">
              Layout changes based on viewport width
            </SmallText>
            <div
              className={`p-6 rounded-lg bg-gray-100 dark:bg-gray-800 ${isMobile ? 'text-center' : 'flex items-center gap-4'}`}
            >
              <div
                className={`${isMobile ? 'w-16 h-16 mx-auto mb-4' : 'w-12 h-12'} bg-blue-500 rounded-full flex items-center justify-center text-white font-bold`}
              >
                A
              </div>
              <div className={isMobile ? '' : 'flex-1'}>
                <Text color="primary" fontWeight="medium">
                  {isMobile ? 'Mobile Layout' : 'Desktop Layout'}
                </Text>
                <SmallText className="text-gray-500">
                  {isMobile
                    ? 'Stacked, centered content'
                    : 'Side-by-side layout with flex'}
                </SmallText>
              </div>
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Parameters
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>query</InlineCode> - CSS media query string
              </p>
              <p>
                Returns: <InlineCode>boolean</InlineCode>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Features
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>SSR-safe (returns false on server)</p>
              <p>Auto-updates on resize</p>
              <p>Supports any valid CSS query</p>
              <p>Uses matchMedia API</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Use Cases
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Responsive layouts</p>
              <p>Dark mode detection</p>
              <p>Reduced motion support</p>
              <p>Device capability detection</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { useMediaQuery } from '@/hooks';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <DesktopLayout
      theme={prefersDark ? 'dark' : 'light'}
      animate={!prefersReducedMotion}
    />
  );
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
