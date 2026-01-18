// src/app/playground/forms/checkbox/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { FormGroup, Checkbox } from '@/components/Form';
import type { CheckboxSize } from '@/components/Form/Checkbox';

const SIZES: CheckboxSize[] = ['sm', 'md', 'lg'];

export default function CheckboxPlayground() {
  const [size, setSize] = useState<CheckboxSize>('md');
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState({
    terms: false,
    newsletter: true,
    updates: false,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Checkbox"
          subheadline="Accessible checkbox component with spring-based animation, indeterminate state, and group support."
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
                onChange={(e) => setSize(e.target.value as CheckboxSize)}
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
                    checked={indeterminate}
                    onChange={(e) => setIndeterminate(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <SmallText>Indeterminate</SmallText>
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
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={error}
                    onChange={(e) => setError(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <SmallText>Error</SmallText>
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
              <Checkbox
                checked={checked}
                onChange={setChecked}
                indeterminate={indeterminate}
                disabled={disabled}
                error={error}
                size={size}
                label="Accept terms and conditions"
                description="By checking this, you agree to our terms of service and privacy policy."
              />
            </div>
          </div>
        </div>

        {/* Checkbox Group */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Checkbox Group
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="max-w-md mx-auto">
              <FormGroup legend="Notification preferences">
                <Checkbox
                  checked={items.terms}
                  onChange={(c) => setItems({ ...items, terms: c })}
                  label="Accept terms"
                />
                <Checkbox
                  checked={items.newsletter}
                  onChange={(c) => setItems({ ...items, newsletter: c })}
                  label="Subscribe to newsletter"
                  description="Get weekly updates about new features"
                />
                <Checkbox
                  checked={items.updates}
                  onChange={(c) => setItems({ ...items, updates: c })}
                  label="Receive product updates"
                />
              </FormGroup>
            </div>
          </div>
        </div>

        {/* States */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            States
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Checkbox checked={true} label="Checked" />
                <Checkbox checked={false} label="Unchecked" />
                <Checkbox indeterminate label="Indeterminate" />
              </div>
              <div className="space-y-4">
                <Checkbox disabled label="Disabled" />
                <Checkbox disabled checked label="Disabled checked" />
                <Checkbox error label="Error state" />
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
            <div className="space-y-4">
              {SIZES.map((s) => (
                <Checkbox
                  key={s}
                  size={s}
                  checked
                  label={`Size ${s}`}
                  description={`This is the ${s} size variant`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* With Description */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            With Description
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="space-y-4 max-w-lg">
              <Checkbox
                label="Email notifications"
                description="Receive email notifications for important updates"
              />
              <Checkbox
                label="Push notifications"
                description="Get push notifications on your mobile device"
              />
              <Checkbox
                label="Marketing emails"
                description="Receive promotional emails and special offers"
              />
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
                <InlineCode>checked</InlineCode> - boolean
              </p>
              <p>
                <InlineCode>onChange</InlineCode> - (checked) =&gt; void
              </p>
              <p>
                <InlineCode>label</InlineCode> - string
              </p>
              <p>
                <InlineCode>description</InlineCode> - string
              </p>
              <p>
                <InlineCode>size</InlineCode> - sm | md | lg
              </p>
              <p>
                <InlineCode>indeterminate</InlineCode> - boolean
              </p>
              <p>
                <InlineCode>disabled</InlineCode> - boolean
              </p>
              <p>
                <InlineCode>error</InlineCode> - boolean
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Animation
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Spring-based check animation</p>
              <p>Smooth indeterminate transition</p>
              <p>Respects prefers-reduced-motion</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Accessibility
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Native checkbox behavior</p>
              <p>Keyboard accessible (Space to toggle)</p>
              <p>Focus ring for keyboard nav</p>
              <p>aria-checked for indeterminate</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { Checkbox, FormGroup } from '@/components/Form';

// Single checkbox
<Checkbox
  checked={checked}
  onChange={setChecked}
  label="Accept terms"
  description="By checking this, you agree to our terms."
/>

// Checkbox group
<FormGroup legend="Notifications">
  <Checkbox checked={email} onChange={setEmail} label="Email" />
  <Checkbox checked={push} onChange={setPush} label="Push" />
</FormGroup>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
