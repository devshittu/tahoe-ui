// src/app/playground/layout/stack/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { Stack } from '@/components/Box';
import type { GapValue } from '@/components/Box';

const GAP_VALUES: GapValue[] = ['0', '1', '2', '4', '6', '8', '12'];

function DemoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 text-sm font-medium">
      {children}
    </div>
  );
}

export default function StackPlayground() {
  const [direction, setDirection] = useState<'column' | 'row'>('column');
  const [gap, setGap] = useState<GapValue>('4');
  const [divider, setDivider] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Stack"
          subheadline="Convenience component for vertical/horizontal stacking with optional dividers."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <SmallText className="text-gray-500">Direction</SmallText>
              <select
                value={direction}
                onChange={(e) =>
                  setDirection(e.target.value as 'column' | 'row')
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                <option value="column">column</option>
                <option value="row">row</option>
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Gap</SmallText>
              <select
                value={gap}
                onChange={(e) => setGap(e.target.value as GapValue)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {GAP_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Divider</SmallText>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={divider}
                  onChange={(e) => setDivider(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <SmallText>Show dividers</SmallText>
              </label>
            </div>
          </div>
        </div>

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo
          </Text>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <Stack
              direction={direction}
              gap={gap}
              divider={divider}
              p="4"
              rounded="lg"
              bg="white"
            >
              <DemoBox>First item</DemoBox>
              <DemoBox>Second item</DemoBox>
              <DemoBox>Third item</DemoBox>
            </Stack>
          </div>
        </div>

        {/* With Dividers */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            With Dividers
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <SmallText className="text-gray-500 mb-3 block">
                  Vertical with dividers
                </SmallText>
                <Stack direction="column" gap="4" divider>
                  <DemoBox>Item 1</DemoBox>
                  <DemoBox>Item 2</DemoBox>
                  <DemoBox>Item 3</DemoBox>
                </Stack>
              </div>
              <div>
                <SmallText className="text-gray-500 mb-3 block">
                  Horizontal with dividers
                </SmallText>
                <Stack direction="row" gap="4" divider>
                  <DemoBox>A</DemoBox>
                  <DemoBox>B</DemoBox>
                  <DemoBox>C</DemoBox>
                </Stack>
              </div>
            </div>
          </div>
        </div>

        {/* Settings List Example */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Settings List Pattern
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <Stack direction="column" gap="0" divider>
              <div className="py-4">
                <Text fontWeight="medium">Notifications</Text>
                <SmallText className="text-gray-500">
                  Manage notification preferences
                </SmallText>
              </div>
              <div className="py-4">
                <Text fontWeight="medium">Privacy</Text>
                <SmallText className="text-gray-500">
                  Control your privacy settings
                </SmallText>
              </div>
              <div className="py-4">
                <Text fontWeight="medium">Account</Text>
                <SmallText className="text-gray-500">
                  Manage account details
                </SmallText>
              </div>
            </Stack>
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
                <InlineCode>direction</InlineCode> - column | row
              </p>
              <p>
                <InlineCode>gap</InlineCode> - 0-16
              </p>
              <p>
                <InlineCode>divider</InlineCode> - boolean
              </p>
              <p>
                <InlineCode>align</InlineCode> - start | center | end | stretch
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              vs Flex
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Stack is a simplified Flex</p>
              <p>Includes divider support</p>
              <p>Default vertical stacking</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Inherited Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>All Box props</p>
              <p>Polymorphic rendering with `as`</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { Stack } from '@/components/Box';

<Stack direction="column" gap="4" divider>
  <SettingsItem title="Notifications" />
  <SettingsItem title="Privacy" />
  <SettingsItem title="Account" />
</Stack>

<Stack direction="row" gap="2">
  <Button>Cancel</Button>
  <Button variant="primary">Save</Button>
</Stack>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
