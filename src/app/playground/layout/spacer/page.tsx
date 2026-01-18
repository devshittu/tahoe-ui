// src/app/playground/layout/spacer/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import {
  Spacer,
  type SpacerSize,
  type SpacerDirection,
} from '@/components/Box';

const SIZE_VALUES: SpacerSize[] = ['1', '2', '3', '4', '6', '8', '12', '16'];

function DemoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 text-sm font-medium">
      {children}
    </div>
  );
}

export default function SpacerPlayground() {
  const [size, setSize] = useState<SpacerSize>('4');
  const [direction, setDirection] = useState<SpacerDirection>('vertical');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Spacer"
          subheadline="Pure structural spacing element following 8pt grid system for intentional whitespace."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <SmallText className="text-gray-500">Size</SmallText>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as SpacerSize)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {SIZE_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Direction</SmallText>
              <select
                value={direction}
                onChange={(e) =>
                  setDirection(e.target.value as SpacerDirection)
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                <option value="vertical">vertical</option>
                <option value="horizontal">horizontal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo
          </Text>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <div
              className={`bg-white dark:bg-gray-900 rounded-lg p-4 ${direction === 'horizontal' ? 'flex items-center' : ''}`}
            >
              <DemoBox>Element A</DemoBox>
              <Spacer
                size={size}
                direction={direction}
                className="bg-pink-200 dark:bg-pink-800/50"
              />
              <DemoBox>Element B</DemoBox>
            </div>
            <SmallText className="text-gray-500 mt-3 block text-center">
              Pink highlight shows spacer area (size=&quot;{size}&quot;,
              direction=&quot;{direction}&quot;)
            </SmallText>
          </div>
        </div>

        {/* Vertical Sizes */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Vertical Spacing Scale
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
            {SIZE_VALUES.map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div className="w-16 text-sm text-gray-500">
                  size=&quot;{s}&quot;
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 inline-block">
                    <div className="w-32 bg-blue-100 dark:bg-blue-900/30 rounded h-4" />
                    <Spacer
                      size={s}
                      direction="vertical"
                      className="bg-pink-200 dark:bg-pink-800/50"
                    />
                    <div className="w-32 bg-blue-100 dark:bg-blue-900/30 rounded h-4" />
                  </div>
                </div>
                <SmallText className="text-gray-400">
                  {s === '1' && '8px'}
                  {s === '2' && '16px'}
                  {s === '3' && '24px'}
                  {s === '4' && '32px'}
                  {s === '6' && '48px'}
                  {s === '8' && '64px'}
                  {s === '12' && '96px'}
                  {s === '16' && '128px'}
                </SmallText>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Spacing */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Horizontal Spacing
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center flex-wrap gap-y-4">
              {['2', '4', '6', '8'].map((s) => (
                <div key={s} className="flex items-center">
                  <DemoBox>A</DemoBox>
                  <Spacer
                    size={s as SpacerSize}
                    direction="horizontal"
                    className="bg-pink-200 dark:bg-pink-800/50"
                  />
                  <DemoBox>B</DemoBox>
                  <Spacer size="4" direction="horizontal" />
                  <SmallText className="text-gray-400">
                    size=&quot;{s}&quot;
                  </SmallText>
                  <Spacer size="8" direction="horizontal" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Example */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Responsive Spacing
          </Text>
          <Text color="secondary" className="text-sm">
            Spacer supports responsive sizes at breakpoints
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 inline-block">
              <DemoBox>Top</DemoBox>
              <Spacer
                size="2"
                smSize="4"
                mdSize="6"
                lgSize="8"
                className="bg-pink-200 dark:bg-pink-800/50"
              />
              <DemoBox>Bottom</DemoBox>
            </div>
            <SmallText className="text-gray-500 mt-3 block">
              size=&quot;2&quot; smSize=&quot;4&quot; mdSize=&quot;6&quot;
              lgSize=&quot;8&quot; — Resize window to see change
            </SmallText>
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Size Values (8pt grid)
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>1</InlineCode> - 8px
              </p>
              <p>
                <InlineCode>2</InlineCode> - 16px
              </p>
              <p>
                <InlineCode>3</InlineCode> - 24px
              </p>
              <p>
                <InlineCode>4</InlineCode> - 32px (default)
              </p>
              <p>
                <InlineCode>6</InlineCode> - 48px
              </p>
              <p>
                <InlineCode>8</InlineCode> - 64px
              </p>
              <p>
                <InlineCode>12</InlineCode> - 96px
              </p>
              <p>
                <InlineCode>16</InlineCode> - 128px
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>size</InlineCode> - Base size
              </p>
              <p>
                <InlineCode>direction</InlineCode> - vertical | horizontal
              </p>
              <p>
                <InlineCode>smSize</InlineCode> - Size at sm breakpoint
              </p>
              <p>
                <InlineCode>mdSize</InlineCode> - Size at md breakpoint
              </p>
              <p>
                <InlineCode>lgSize</InlineCode> - Size at lg breakpoint
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Features
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>8pt grid alignment</p>
              <p>Responsive size variants</p>
              <p>aria-hidden by default</p>
              <p>flex-shrink-0 to prevent collapse</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { Spacer } from '@/components/Box';

// Vertical spacing (default)
<div>
  <Header />
  <Spacer size="6" />
  <Content />
</div>

// Horizontal spacing
<div className="flex">
  <Logo />
  <Spacer size="4" direction="horizontal" />
  <Nav />
</div>

// Responsive spacing
<Spacer
  size="2"
  smSize="4"
  mdSize="6"
  lgSize="8"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
