// src/app/playground/forms/slider/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { FormField, Slider } from '@/components/Form';
import type { SliderSize } from '@/components/Form/Slider';

const SIZES: SliderSize[] = ['sm', 'md', 'lg'];

export default function SliderPlayground() {
  const [size, setSize] = useState<SliderSize>('md');
  const [showValue, setShowValue] = useState(true);
  const [marks, setMarks] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState(50);
  const [range, setRange] = useState<[number, number]>([20, 80]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Slider"
          subheadline="Range slider component with single or dual thumbs, marks, and touch support."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <SmallText className="text-gray-500">Size</SmallText>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as SliderSize)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Options</SmallText>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showValue}
                    onChange={(e) => setShowValue(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <SmallText>Show Value</SmallText>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={marks}
                    onChange={(e) => setMarks(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <SmallText>Show Marks</SmallText>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={disabled}
                    onChange={(e) => setDisabled(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <SmallText>Disabled</SmallText>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Live Demo - Single */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Single Value: {value}
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
            <div className="max-w-lg mx-auto">
              <Slider
                value={value}
                onChange={(v) => setValue(v as number)}
                size={size}
                showValue={showValue}
                marks={marks}
                disabled={disabled}
              />
            </div>
          </div>
        </div>

        {/* Range Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Range: {range[0]} - {range[1]}
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
            <div className="max-w-lg mx-auto">
              <Slider
                value={range}
                onChange={(v) => setRange(v as [number, number])}
                size={size}
                showValue={showValue}
                marks={marks}
                disabled={disabled}
              />
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Examples
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="space-y-8 max-w-lg mx-auto">
              <FormField label="Volume">
                <Slider value={75} showValue />
              </FormField>
              <FormField label="Price range ($)">
                <Slider value={[100, 500]} min={0} max={1000} showValue />
              </FormField>
              <FormField label="Quality (with marks)">
                <Slider value={50} step={25} marks showValue />
              </FormField>
              <FormField label="Custom range (0-1000, step 100)">
                <Slider min={0} max={1000} step={100} value={500} showValue />
              </FormField>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Sizes
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="space-y-8 max-w-lg mx-auto">
              {SIZES.map((s) => (
                <div key={s}>
                  <SmallText className="text-gray-500 mb-3 block">
                    Size: {s}
                  </SmallText>
                  <Slider size={s} value={60} />
                </div>
              ))}
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
                <InlineCode>value</InlineCode> - number | [number, number]
              </p>
              <p>
                <InlineCode>onChange</InlineCode> - (value) =&gt; void
              </p>
              <p>
                <InlineCode>min</InlineCode> - number (default: 0)
              </p>
              <p>
                <InlineCode>max</InlineCode> - number (default: 100)
              </p>
              <p>
                <InlineCode>step</InlineCode> - number (default: 1)
              </p>
              <p>
                <InlineCode>size</InlineCode> - sm | md | lg
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Display Options
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>showValue</InlineCode> - Show tooltip with value
              </p>
              <p>
                <InlineCode>marks</InlineCode> - Show step marks
              </p>
              <p>
                <InlineCode>disabled</InlineCode> - Disable interaction
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Interaction
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Click track to jump to value</p>
              <p>Drag thumb to adjust</p>
              <p>Touch-friendly targets</p>
              <p>Keyboard: Arrow keys to adjust</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { FormField, Slider } from '@/components/Form';

// Single value
<FormField label="Volume">
  <Slider value={volume} onChange={setVolume} showValue />
</FormField>

// Range
<FormField label="Price range">
  <Slider
    value={[minPrice, maxPrice]}
    onChange={([min, max]) => { setMinPrice(min); setMaxPrice(max); }}
    min={0}
    max={1000}
    showValue
  />
</FormField>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
