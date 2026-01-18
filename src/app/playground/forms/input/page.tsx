// src/app/playground/forms/input/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { FormField, Input } from '@/components/Form';
import type {
  InputVariant,
  InputSize,
  InputState,
} from '@/components/Form/Input';
import {
  FiUser,
  FiMail,
  FiLock,
  FiSearch,
  FiEye,
  FiEyeOff,
  FiDollarSign,
  FiPercent,
  FiPhone,
  FiGlobe,
} from 'react-icons/fi';

const VARIANTS: InputVariant[] = ['default', 'filled', 'outlined'];
const SIZES: InputSize[] = ['sm', 'md', 'lg'];

export default function InputPlayground() {
  const [variant, setVariant] = useState<InputVariant>('default');
  const [size, setSize] = useState<InputSize>('md');
  const [state, setState] = useState<InputState | undefined>(undefined);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Input"
          subheadline="Text input component with variants, sizes, validation states, and icon support."
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
                onChange={(e) => setVariant(e.target.value as InputVariant)}
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
                onChange={(e) => setSize(e.target.value as InputSize)}
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
                      : (e.target.value as InputState),
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
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={disabled}
                    onChange={(e) => setDisabled(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <SmallText>Disabled</SmallText>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={readOnly}
                    onChange={(e) => setReadOnly(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <SmallText>ReadOnly</SmallText>
                </label>
              </div>
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
                label="Username"
                required
                helperText={
                  state === 'error' ? undefined : 'Enter your username'
                }
                error={state === 'error' ? 'Username is required' : undefined}
                success={
                  state === 'success' ? 'Username is available' : undefined
                }
              >
                <Input
                  placeholder="Enter username"
                  leftIcon={<FiUser />}
                  variant={variant}
                  size={size}
                  state={state}
                  disabled={disabled}
                  readOnly={readOnly}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Input Types */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Input Types
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField label="Email">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  leftIcon={<FiMail />}
                />
              </FormField>
              <FormField label="Password">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  leftIcon={<FiLock />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="focus:outline-none"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  }
                />
              </FormField>
              <FormField label="Search">
                <Input
                  type="search"
                  placeholder="Search..."
                  leftIcon={<FiSearch />}
                />
              </FormField>
              <FormField label="Phone">
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  leftIcon={<FiPhone />}
                />
              </FormField>
              <FormField label="URL">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  leftIcon={<FiGlobe />}
                />
              </FormField>
              <FormField label="Number">
                <Input type="number" placeholder="0" min={0} max={100} />
              </FormField>
            </div>
          </div>
        </div>

        {/* With Icons */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            With Icons
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <FormField label="Left Icon">
                <Input placeholder="Search..." leftIcon={<FiSearch />} />
              </FormField>
              <FormField label="Right Icon">
                <Input placeholder="Amount" rightIcon={<FiDollarSign />} />
              </FormField>
              <FormField label="Both Icons">
                <Input
                  placeholder="Percentage"
                  leftIcon={<FiPercent />}
                  rightIcon={<FiPercent />}
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
                  <Input variant={v} placeholder={`${v} variant`} />
                </FormField>
              ))}
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
                  <Input
                    size={s}
                    placeholder={`Size ${s}`}
                    className="flex-1"
                  />
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
              <FormField label="Normal" helperText="This is helper text">
                <Input placeholder="Normal state" />
              </FormField>
              <FormField label="Error" error="This field is required">
                <Input placeholder="Error state" state="error" />
              </FormField>
              <FormField label="Success" success="Looks good!">
                <Input placeholder="Success state" state="success" />
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
                <InlineCode>leftIcon</InlineCode> - ReactNode
              </p>
              <p>
                <InlineCode>rightIcon</InlineCode> - ReactNode
              </p>
              <p>
                <InlineCode>disabled</InlineCode> - boolean
              </p>
              <p>
                <InlineCode>readOnly</InlineCode> - boolean
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Input Types
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>text</InlineCode> - Default text input
              </p>
              <p>
                <InlineCode>email</InlineCode> - Email validation
              </p>
              <p>
                <InlineCode>password</InlineCode> - Masked input
              </p>
              <p>
                <InlineCode>number</InlineCode> - Numeric input
              </p>
              <p>
                <InlineCode>tel</InlineCode> - Phone number
              </p>
              <p>
                <InlineCode>url</InlineCode> - URL input
              </p>
              <p>
                <InlineCode>search</InlineCode> - Search field
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
                <InlineCode>aria-describedby</InlineCode> - Helper text
              </p>
              <p>
                <InlineCode>aria-required</InlineCode> - Required field
              </p>
              <p>Focus ring for keyboard navigation</p>
              <p>44px minimum touch target</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { FormField, Input } from '@/components/Form';
import { FiUser } from 'react-icons/fi';

<FormField label="Username" required error="Username is required">
  <Input
    placeholder="Enter username"
    leftIcon={<FiUser />}
    variant="default"
    size="md"
    state="error"
  />
</FormField>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
