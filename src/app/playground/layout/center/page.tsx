// src/app/playground/layout/center/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { Center } from '@/components/Box';

function DemoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 text-sm font-medium">
      {children}
    </div>
  );
}

export default function CenterPlayground() {
  const [horizontal, setHorizontal] = useState(false);
  const [vertical, setVertical] = useState(false);

  const mode =
    !horizontal && !vertical ? 'both' : horizontal ? 'horizontal' : 'vertical';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Center"
          subheadline="Utility component for centering content horizontally, vertically, or both."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={horizontal}
                onChange={(e) => {
                  setHorizontal(e.target.checked);
                  if (e.target.checked) setVertical(false);
                }}
                className="w-4 h-4 rounded"
              />
              <SmallText>Horizontal only</SmallText>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={vertical}
                onChange={(e) => {
                  setVertical(e.target.checked);
                  if (e.target.checked) setHorizontal(false);
                }}
                className="w-4 h-4 rounded"
              />
              <SmallText>Vertical only</SmallText>
            </label>
          </div>
        </div>

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo
          </Text>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 h-64">
            <Center
              horizontal={horizontal}
              vertical={vertical}
              className="h-full bg-white dark:bg-gray-900 rounded-lg"
            >
              <DemoBox>Centered {mode}</DemoBox>
            </Center>
          </div>
        </div>

        {/* Centering Modes */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Centering Modes
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <SmallText className="text-gray-500 mb-3 block">
                  Both (default)
                </SmallText>
                <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Center className="h-full">
                    <DemoBox>Both</DemoBox>
                  </Center>
                </div>
              </div>
              <div>
                <SmallText className="text-gray-500 mb-3 block">
                  Horizontal only
                </SmallText>
                <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Center horizontal className="h-full">
                    <DemoBox>Horizontal</DemoBox>
                  </Center>
                </div>
              </div>
              <div>
                <SmallText className="text-gray-500 mb-3 block">
                  Vertical only
                </SmallText>
                <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Center vertical className="h-full">
                    <DemoBox>Vertical</DemoBox>
                  </Center>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Common Use Cases
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="space-y-6">
              <div>
                <SmallText className="text-gray-500 mb-3 block">
                  Loading state
                </SmallText>
                <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Center className="h-full">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  </Center>
                </div>
              </div>
              <div>
                <SmallText className="text-gray-500 mb-3 block">
                  Empty state
                </SmallText>
                <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Center className="h-full">
                    <div className="text-center">
                      <Text color="secondary">No items found</Text>
                      <SmallText className="text-gray-400">
                        Try adjusting your filters
                      </SmallText>
                    </div>
                  </Center>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>horizontal</InlineCode> - Center horizontally only
              </p>
              <p>
                <InlineCode>vertical</InlineCode> - Center vertically only
              </p>
              <p>Default: centers both axes</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Implementation
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Uses flexbox internally</p>
              <p>justify-center + items-center</p>
              <p>Full height by default</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Inherited Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>All Box props</p>
              <p>className for custom styling</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { Center } from '@/components/Box';

// Center both axes
<Center className="h-full">
  <Spinner />
</Center>

// Center horizontally only
<Center horizontal>
  <Text>Centered text</Text>
</Center>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
