// src/app/playground/layout/flex/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { Flex } from '@/components/Box';
import type { GapValue, JustifyContent, AlignItems } from '@/components/Box';

const GAP_VALUES: GapValue[] = ['0', '1', '2', '4', '6', '8', '12'];
const JUSTIFY_VALUES: JustifyContent[] = [
  'start',
  'center',
  'end',
  'between',
  'around',
];
const ALIGN_VALUES: AlignItems[] = [
  'start',
  'center',
  'end',
  'baseline',
  'stretch',
];

function DemoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 text-sm font-medium">
      {children}
    </div>
  );
}

export default function FlexPlayground() {
  const [direction, setDirection] = useState<'row' | 'col'>('row');
  const [gap, setGap] = useState<GapValue>('4');
  const [justify, setJustify] = useState<JustifyContent>('start');
  const [align, setAlign] = useState<AlignItems>('center');
  const [wrap, setWrap] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Flex"
          subheadline="Flexbox layout primitive with intuitive direction, gap, and alignment props."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <SmallText className="text-gray-500">Direction</SmallText>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as 'row' | 'col')}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                <option value="row">row</option>
                <option value="col">col</option>
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
              <SmallText className="text-gray-500">Justify</SmallText>
              <select
                value={justify}
                onChange={(e) => setJustify(e.target.value as JustifyContent)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {JUSTIFY_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Align</SmallText>
              <select
                value={align}
                onChange={(e) => setAlign(e.target.value as AlignItems)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {ALIGN_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Wrap</SmallText>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={wrap}
                  onChange={(e) => setWrap(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <SmallText>Enable</SmallText>
              </label>
            </div>
          </div>
        </div>

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo
          </Text>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 min-h-[200px]">
            <Flex
              direction={direction}
              gap={gap}
              justify={justify}
              align={align}
              wrap={wrap ? 'wrap' : undefined}
              className="h-full min-h-[180px] bg-white dark:bg-gray-900 rounded-lg p-4"
            >
              <DemoBox>Item 1</DemoBox>
              <DemoBox>Item 2</DemoBox>
              <DemoBox>Item 3</DemoBox>
            </Flex>
          </div>
        </div>

        {/* Center Shorthand */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Center Shorthand
          </Text>
          <Text color="secondary" className="text-sm">
            Use `center` prop to center both axes
          </Text>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 h-32">
            <Flex
              center
              className="h-full bg-white dark:bg-gray-900 rounded-lg"
            >
              <DemoBox>Centered content</DemoBox>
            </Flex>
          </div>
        </div>

        {/* Direction Examples */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Direction
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <SmallText className="text-gray-500 mb-3 block">
                  Row (horizontal)
                </SmallText>
                <Flex direction="row" gap="2">
                  <DemoBox>1</DemoBox>
                  <DemoBox>2</DemoBox>
                  <DemoBox>3</DemoBox>
                </Flex>
              </div>
              <div>
                <SmallText className="text-gray-500 mb-3 block">
                  Column (vertical)
                </SmallText>
                <Flex direction="col" gap="2">
                  <DemoBox>1</DemoBox>
                  <DemoBox>2</DemoBox>
                  <DemoBox>3</DemoBox>
                </Flex>
              </div>
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Layout Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>direction</InlineCode> - row | col
              </p>
              <p>
                <InlineCode>gap</InlineCode> - 0-16
              </p>
              <p>
                <InlineCode>wrap</InlineCode> - boolean
              </p>
              <p>
                <InlineCode>center</InlineCode> - Center both axes
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Alignment Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>justify</InlineCode> - start | center | end |
                between | around
              </p>
              <p>
                <InlineCode>align</InlineCode> - start | center | end | baseline
                | stretch
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Inherited Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>All Box props (p, m, rounded, shadow, bg)</p>
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
            <code>{`import { Flex } from '@/components/Box';

<Flex direction="row" gap="4" justify="between" align="center">
  <div>Left</div>
  <div>Right</div>
</Flex>

<Flex center className="h-full">
  <div>Centered content</div>
</Flex>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
