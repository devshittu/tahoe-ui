// src/app/playground/forms/select/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { FormField, Select } from '@/components/Form';
import type { SelectSize, SelectState } from '@/components/Form/Select';

const SIZES: SelectSize[] = ['sm', 'md', 'lg'];

const FRAMEWORK_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS', disabled: true },
];

const COUNTRY_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
];

export default function SelectPlayground() {
  const [size, setSize] = useState<SelectSize>('md');
  const [state, setState] = useState<SelectState | undefined>(undefined);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState<string>();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Select"
          subheadline="Dropdown select component built with HeadlessUI Listbox for full accessibility and keyboard support."
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
                onChange={(e) => setSize(e.target.value as SelectSize)}
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
              <SmallText className="text-gray-500">State</SmallText>
              <select
                value={state || 'none'}
                onChange={(e) =>
                  setState(
                    e.target.value === 'none'
                      ? undefined
                      : (e.target.value as SelectState),
                  )
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                <option value="none">none</option>
                <option value="error">error</option>
                <option value="success">success</option>
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Options</SmallText>
              <label className="flex items-center gap-2 mt-2">
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

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
            <div className="max-w-md mx-auto">
              <FormField
                label="Framework"
                required
                helperText={
                  state === 'error'
                    ? undefined
                    : 'Choose your preferred framework'
                }
                error={
                  state === 'error' ? 'Please select an option' : undefined
                }
                success={state === 'success' ? 'Great choice!' : undefined}
              >
                <Select
                  options={FRAMEWORK_OPTIONS}
                  value={value}
                  onChange={setValue}
                  placeholder="Select a framework"
                  size={size}
                  state={state}
                  disabled={disabled}
                />
              </FormField>
              {value && (
                <SmallText className="mt-4 text-gray-500">
                  Selected:{' '}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {value}
                  </span>
                </SmallText>
              )}
            </div>
          </div>
        </div>

        {/* Basic Examples */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Basic Examples
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Empty (placeholder)">
                <Select
                  options={FRAMEWORK_OPTIONS}
                  placeholder="Select a framework"
                />
              </FormField>
              <FormField label="With default value">
                <Select
                  options={FRAMEWORK_OPTIONS}
                  value="react"
                  placeholder="Select a framework"
                />
              </FormField>
              <FormField
                label="With disabled option"
                helperText="SolidJS is disabled"
              >
                <Select
                  options={FRAMEWORK_OPTIONS}
                  placeholder="Try selecting SolidJS"
                />
              </FormField>
              <FormField label="Many options">
                <Select
                  options={COUNTRY_OPTIONS}
                  placeholder="Select a country"
                />
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
            <div className="space-y-4">
              {SIZES.map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <SmallText className="w-12 text-gray-500">{s}</SmallText>
                  <div className="flex-1 max-w-sm">
                    <Select
                      options={FRAMEWORK_OPTIONS}
                      placeholder={`Size ${s}`}
                      size={s}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Validation States */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Validation States
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <FormField label="Normal" helperText="Select an option">
                <Select
                  options={FRAMEWORK_OPTIONS}
                  placeholder="Normal state"
                />
              </FormField>
              <FormField label="Error" error="Please select an option">
                <Select
                  options={FRAMEWORK_OPTIONS}
                  placeholder="Error state"
                  state="error"
                />
              </FormField>
              <FormField label="Success" success="Perfect choice!">
                <Select
                  options={FRAMEWORK_OPTIONS}
                  value="react"
                  state="success"
                />
              </FormField>
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
                <InlineCode>options</InlineCode> - SelectOption[]
              </p>
              <p>
                <InlineCode>value</InlineCode> - string
              </p>
              <p>
                <InlineCode>onChange</InlineCode> - (value) =&gt; void
              </p>
              <p>
                <InlineCode>placeholder</InlineCode> - string
              </p>
              <p>
                <InlineCode>size</InlineCode> - sm | md | lg
              </p>
              <p>
                <InlineCode>state</InlineCode> - error | success
              </p>
              <p>
                <InlineCode>disabled</InlineCode> - boolean
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              SelectOption
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>value</InlineCode> - string (required)
              </p>
              <p>
                <InlineCode>label</InlineCode> - string (required)
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
                <InlineCode>Enter/Space</InlineCode> - Open dropdown
              </p>
              <p>
                <InlineCode>Arrow Up/Down</InlineCode> - Navigate
              </p>
              <p>
                <InlineCode>Enter</InlineCode> - Select option
              </p>
              <p>
                <InlineCode>Escape</InlineCode> - Close dropdown
              </p>
              <p>
                <InlineCode>Home/End</InlineCode> - Jump to first/last
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
            <code>{`import { FormField, Select } from '@/components/Form';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

<FormField label="Framework" required>
  <Select
    options={options}
    value={selected}
    onChange={setSelected}
    placeholder="Select a framework"
  />
</FormField>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
