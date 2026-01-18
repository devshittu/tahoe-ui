// src/app/playground/forms/date-picker/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { FormField, DatePicker } from '@/components/Form';
import type { DatePickerSize } from '@/components/Form/DatePicker';

const SIZES: DatePickerSize[] = ['sm', 'md', 'lg'];

export default function DatePickerPlayground() {
  const [size, setSize] = useState<DatePickerSize>('md');
  const [disabled, setDisabled] = useState(false);
  const [date, setDate] = useState<Date>();

  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Date Picker"
          subheadline="Calendar-based date picker with min/max constraints and keyboard navigation."
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
                onChange={(e) => setSize(e.target.value as DatePickerSize)}
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
                label="Select date"
                helperText="Click to open the calendar"
              >
                <DatePicker
                  value={date}
                  onChange={setDate}
                  placeholder="Pick a date"
                  size={size}
                  disabled={disabled}
                />
              </FormField>
              {date && (
                <SmallText className="mt-4 text-gray-500">
                  Selected:{' '}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {date.toLocaleDateString()}
                  </span>
                </SmallText>
              )}
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Examples
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Basic">
                <DatePicker placeholder="Pick a date" />
              </FormField>
              <FormField label="With default value">
                <DatePicker value={today} placeholder="Pick a date" />
              </FormField>
              <FormField
                label="Future dates only"
                helperText="Only dates from today onwards"
              >
                <DatePicker placeholder="Pick a future date" minDate={today} />
              </FormField>
              <FormField
                label="Date range"
                helperText="Select a date within the next week"
              >
                <DatePicker
                  placeholder="Pick a date"
                  minDate={today}
                  maxDate={nextWeek}
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
                    <DatePicker placeholder={`Size ${s}`} size={s} />
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
              <FormField label="Normal" helperText="Select a date">
                <DatePicker placeholder="Normal" />
              </FormField>
              <FormField label="Error" error="Date is required">
                <DatePicker placeholder="Error" />
              </FormField>
              <FormField label="Success" success="Date confirmed">
                <DatePicker value={today} />
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
                <InlineCode>value</InlineCode> - Date
              </p>
              <p>
                <InlineCode>onChange</InlineCode> - (date) =&gt; void
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
              Constraints
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>minDate</InlineCode> - Earliest selectable date
              </p>
              <p>
                <InlineCode>maxDate</InlineCode> - Latest selectable date
              </p>
              <p>Disabled dates shown grayed out</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Keyboard Navigation
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>Arrow keys</InlineCode> - Navigate days
              </p>
              <p>
                <InlineCode>Enter/Space</InlineCode> - Select date
              </p>
              <p>
                <InlineCode>Escape</InlineCode> - Close calendar
              </p>
              <p>
                <InlineCode>Tab</InlineCode> - Focus next element
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
            <code>{`import { FormField, DatePicker } from '@/components/Form';

<FormField label="Event date" error={errors.date}>
  <DatePicker
    value={date}
    onChange={setDate}
    placeholder="Select date"
    minDate={new Date()}
    maxDate={new Date('2025-12-31')}
  />
</FormField>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
