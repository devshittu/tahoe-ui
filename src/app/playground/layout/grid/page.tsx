// src/app/playground/layout/grid/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { Grid } from '@/components/Box';
import type { GapValue } from '@/components/Box';

const GAP_VALUES: GapValue[] = ['0', '1', '2', '4', '6', '8', '12'];

function DemoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 text-sm font-medium text-center">
      {children}
    </div>
  );
}

export default function GridPlayground() {
  const [cols, setCols] = useState('3');
  const [gap, setGap] = useState<GapValue>('4');
  const [useAutoFit, setUseAutoFit] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Grid"
          subheadline="CSS Grid layout primitive with column/row control and auto-fit responsive support."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <SmallText className="text-gray-500">Columns</SmallText>
              <select
                value={cols}
                onChange={(e) => setCols(e.target.value)}
                disabled={useAutoFit}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm disabled:opacity-50"
              >
                {['1', '2', '3', '4', '5', '6'].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
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
              <SmallText className="text-gray-500">Auto-fit</SmallText>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={useAutoFit}
                  onChange={(e) => setUseAutoFit(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <SmallText>colsAuto=&quot;200px&quot;</SmallText>
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
            <Grid
              cols={useAutoFit ? undefined : (cols as '3')}
              colsAuto={useAutoFit ? '200px' : undefined}
              gap={gap}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <DemoBox key={i}>Item {i + 1}</DemoBox>
              ))}
            </Grid>
          </div>
          <SmallText className="text-gray-500">
            {useAutoFit
              ? 'Using colsAuto="200px" - columns auto-fit to minimum 200px width'
              : `Fixed ${cols} columns`}
          </SmallText>
        </div>

        {/* Responsive Auto-fit */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Responsive Auto-fit
          </Text>
          <Text color="secondary" className="text-sm">
            Columns automatically adjust based on container width
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <Grid colsAuto="180px" gap="4">
              {Array.from({ length: 8 }).map((_, i) => (
                <DemoBox key={i}>Auto {i + 1}</DemoBox>
              ))}
            </Grid>
          </div>
        </div>

        {/* Fixed Columns */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Fixed Column Layouts
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
            {['2', '3', '4'].map((c) => (
              <div key={c}>
                <SmallText className="text-gray-500 mb-3 block">
                  {c} columns
                </SmallText>
                <Grid cols={c as '2'} gap="4">
                  {Array.from({ length: parseInt(c) * 2 }).map((_, i) => (
                    <DemoBox key={i}>{i + 1}</DemoBox>
                  ))}
                </Grid>
              </div>
            ))}
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Column Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>cols</InlineCode> - 1-12 (fixed columns)
              </p>
              <p>
                <InlineCode>colsAuto</InlineCode> - Min column width for
                auto-fit
              </p>
              <p>e.g., &quot;200px&quot;, &quot;15rem&quot;</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Row Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>rows</InlineCode> - 1-12 (fixed rows)
              </p>
              <p>
                <InlineCode>gap</InlineCode> - 0-16 (both axes)
              </p>
              <p>
                <InlineCode>gapX</InlineCode> - Horizontal gap
              </p>
              <p>
                <InlineCode>gapY</InlineCode> - Vertical gap
              </p>
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
            <code>{`import { Grid } from '@/components/Box';

// Fixed 3 columns
<Grid cols="3" gap="4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Grid>

// Auto-fit responsive columns
<Grid colsAuto="200px" gap="4">
  {items.map(item => <Card key={item.id} {...item} />)}
</Grid>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
