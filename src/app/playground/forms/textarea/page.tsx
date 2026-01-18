// src/app/playground/forms/textarea/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { FormField, Textarea } from '@/components/Form';
import type {
  TextareaVariant,
  TextareaSize,
  TextareaState,
} from '@/components/Form/Textarea';

const VARIANTS: TextareaVariant[] = ['default', 'filled', 'outlined'];
const SIZES: TextareaSize[] = ['sm', 'md', 'lg'];

export default function TextareaPlayground() {
  const [variant, setVariant] = useState<TextareaVariant>('default');
  const [size, setSize] = useState<TextareaSize>('md');
  const [state, setState] = useState<TextareaState | undefined>(undefined);
  const [autoResize, setAutoResize] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);
  const [value, setValue] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Textarea"
          subheadline="Multi-line text input with auto-resize, character count, and validation support."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <SmallText className="text-gray-500">Variant</SmallText>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value as TextareaVariant)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {VARIANTS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-gray-500">Size</SmallText>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as TextareaSize)}
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
                      : (e.target.value as TextareaState),
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
              <SmallText className="text-gray-500">Max Length</SmallText>
              <select
                value={maxLength || 'none'}
                onChange={(e) =>
                  setMaxLength(
                    e.target.value === 'none'
                      ? undefined
                      : parseInt(e.target.value),
                  )
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                <option value="none">none</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="500">500</option>
              </select>
            </div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoResize}
                onChange={(e) => setAutoResize(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <SmallText>Auto Resize</SmallText>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showCount}
                onChange={(e) => setShowCount(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <SmallText>Show Count</SmallText>
            </label>
          </div>
        </div>

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
            <div className="max-w-lg mx-auto">
              <FormField
                label="Description"
                helperText={
                  state === 'error' ? undefined : 'Tell us about yourself'
                }
                error={
                  state === 'error' ? 'Description is required' : undefined
                }
                success={state === 'success' ? 'Looks good!' : undefined}
              >
                <Textarea
                  placeholder="Write something..."
                  variant={variant}
                  size={size}
                  state={state}
                  autoResize={autoResize}
                  showCount={showCount}
                  maxLength={maxLength}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Auto-resize */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Auto-resize
          </Text>
          <Text color="secondary" className="text-sm">
            The textarea automatically grows as you type, within the min/max row
            constraints.
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="max-w-lg mx-auto">
              <FormField label="Auto-expanding textarea">
                <Textarea
                  placeholder="Start typing... the textarea will grow"
                  autoResize
                  minRows={2}
                  maxRows={8}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Character Count */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Character Count
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="With count only">
                <Textarea placeholder="Type here..." showCount />
              </FormField>
              <FormField label="With max length">
                <Textarea
                  placeholder="Max 200 characters..."
                  maxLength={200}
                  showCount
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Variants
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {VARIANTS.map((v) => (
                <FormField
                  key={v}
                  label={v.charAt(0).toUpperCase() + v.slice(1)}
                >
                  <Textarea variant={v} placeholder={`${v} variant`} rows={3} />
                </FormField>
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
              <FormField label="Normal" helperText="Optional description">
                <Textarea placeholder="Normal state" rows={3} />
              </FormField>
              <FormField label="Error" error="This field is required">
                <Textarea placeholder="Error state" state="error" rows={3} />
              </FormField>
              <FormField label="Success" success="Perfect!">
                <Textarea
                  placeholder="Success state"
                  state="success"
                  rows={3}
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
                <InlineCode>variant</InlineCode> - default | filled | outlined
              </p>
              <p>
                <InlineCode>size</InlineCode> - sm | md | lg
              </p>
              <p>
                <InlineCode>state</InlineCode> - error | success
              </p>
              <p>
                <InlineCode>rows</InlineCode> - number (default: 3)
              </p>
              <p>
                <InlineCode>maxLength</InlineCode> - number
              </p>
              <p>
                <InlineCode>showCount</InlineCode> - boolean
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Auto-resize Props
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>autoResize</InlineCode> - Enable auto-grow
              </p>
              <p>
                <InlineCode>minRows</InlineCode> - Minimum height
              </p>
              <p>
                <InlineCode>maxRows</InlineCode> - Maximum height
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Accessibility
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>aria-invalid</InlineCode> - Error state
              </p>
              <p>
                <InlineCode>aria-describedby</InlineCode> - Helper/error text
              </p>
              <p>Focus ring for keyboard nav</p>
              <p>Screen reader announcements</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { FormField, Textarea } from '@/components/Form';

<FormField label="Description" helperText="Tell us about yourself">
  <Textarea
    placeholder="Write something..."
    autoResize
    minRows={2}
    maxRows={6}
    maxLength={500}
    showCount
  />
</FormField>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
