// src/app/playground/forms/radio-group/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { FormGroup, RadioGroup } from '@/components/Form';
import type { RadioGroupSize } from '@/components/Form/RadioGroup';

const SIZES: RadioGroupSize[] = ['sm', 'md', 'lg'];

const FRAMEWORK_OPTIONS = [
  {
    value: 'react',
    label: 'React',
    description: 'A JavaScript library for building user interfaces',
  },
  {
    value: 'vue',
    label: 'Vue',
    description: 'The Progressive JavaScript Framework',
  },
  {
    value: 'angular',
    label: 'Angular',
    description: 'Platform for building mobile and desktop web applications',
  },
  {
    value: 'svelte',
    label: 'Svelte',
    description: 'Cybernetically enhanced web apps',
    disabled: true,
  },
];

const PLAN_OPTIONS = [
  { value: 'free', label: 'Free', description: 'Up to 3 projects' },
  {
    value: 'pro',
    label: 'Pro',
    description: 'Unlimited projects + priority support',
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    description: 'Custom solutions for large teams',
  },
];

export default function RadioGroupPlayground() {
  const [size, setSize] = useState<RadioGroupSize>('md');
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>(
    'vertical',
  );
  const [value, setValue] = useState<string>('react');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Radio Group"
          subheadline="Single-select radio group with descriptions, spring-based animation, and full keyboard support."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <SmallText className="text-gray-500">Size</SmallText>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as RadioGroupSize)}
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
              <SmallText className="text-gray-500">Orientation</SmallText>
              <select
                value={orientation}
                onChange={(e) =>
                  setOrientation(e.target.value as 'vertical' | 'horizontal')
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
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
            <div className="max-w-md mx-auto">
              <FormGroup legend="Select your framework">
                <RadioGroup
                  options={FRAMEWORK_OPTIONS}
                  value={value}
                  onChange={setValue}
                  size={size}
                  orientation={orientation}
                />
              </FormGroup>
              <SmallText className="mt-4 text-gray-500">
                Selected:{' '}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {value}
                </span>
              </SmallText>
            </div>
          </div>
        </div>

        {/* With Descriptions */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            With Descriptions
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="max-w-md mx-auto">
              <FormGroup legend="Select a plan">
                <RadioGroup options={PLAN_OPTIONS} />
              </FormGroup>
            </div>
          </div>
        </div>

        {/* Orientations */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Orientations
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <SmallText className="text-gray-500 mb-4 block">
                  Vertical (default)
                </SmallText>
                <RadioGroup
                  options={PLAN_OPTIONS.slice(0, 3)}
                  orientation="vertical"
                />
              </div>
              <div>
                <SmallText className="text-gray-500 mb-4 block">
                  Horizontal
                </SmallText>
                <RadioGroup
                  options={[
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                  ]}
                  orientation="horizontal"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Sizes
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="space-y-6">
              {SIZES.map((s) => (
                <div key={s}>
                  <SmallText className="text-gray-500 mb-3 block">
                    Size: {s}
                  </SmallText>
                  <RadioGroup
                    options={[
                      { value: 'a', label: 'Option A' },
                      { value: 'b', label: 'Option B' },
                      { value: 'c', label: 'Option C' },
                    ]}
                    size={s}
                    orientation="horizontal"
                  />
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
                <InlineCode>options</InlineCode> - RadioOption[]
              </p>
              <p>
                <InlineCode>value</InlineCode> - string
              </p>
              <p>
                <InlineCode>onChange</InlineCode> - (value) =&gt; void
              </p>
              <p>
                <InlineCode>size</InlineCode> - sm | md | lg
              </p>
              <p>
                <InlineCode>orientation</InlineCode> - vertical | horizontal
              </p>
              <p>
                <InlineCode>disabled</InlineCode> - boolean
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              RadioOption
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>value</InlineCode> - string (required)
              </p>
              <p>
                <InlineCode>label</InlineCode> - string (required)
              </p>
              <p>
                <InlineCode>description</InlineCode> - string
              </p>
              <p>
                <InlineCode>disabled</InlineCode> - boolean
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Keyboard Navigation
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>Arrow Up/Down</InlineCode> - Navigate options
              </p>
              <p>
                <InlineCode>Arrow Left/Right</InlineCode> - Navigate
                (horizontal)
              </p>
              <p>
                <InlineCode>Space</InlineCode> - Select focused option
              </p>
              <p>
                <InlineCode>Home/End</InlineCode> - First/last option
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { FormGroup, RadioGroup } from '@/components/Form';

const options = [
  { value: 'free', label: 'Free', description: 'Up to 3 projects' },
  { value: 'pro', label: 'Pro', description: 'Unlimited projects' },
];

<FormGroup legend="Select a plan">
  <RadioGroup
    options={options}
    value={selected}
    onChange={setSelected}
    orientation="vertical"
  />
</FormGroup>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
