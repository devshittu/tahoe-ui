// src/app/playground/forms/switch/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { Switch } from '@/components/Form';
import type { SwitchSize } from '@/components/Form/Switch';

const SIZES: SwitchSize[] = ['sm', 'md', 'lg'];

export default function SwitchPlayground() {
  const [size, setSize] = useState<SwitchSize>('md');
  const [disabled, setDisabled] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="min-h-screen bg-bg-primary py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="Switch"
          subheadline="Toggle switch component with spring-based animation, labels, and description support."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-bg-elevated rounded-2xl border border-border-subtle p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <SmallText className="text-text-secondary">Size</SmallText>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as SwitchSize)}
                className="w-full px-3 py-2 rounded-lg border border-border-default bg-bg-elevated text-sm text-text-primary"
              >
                {SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <SmallText className="text-text-secondary">Options</SmallText>
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
          <div className="bg-bg-elevated rounded-2xl border border-border-subtle p-8">
            <div className="max-w-md mx-auto">
              <Switch
                checked={notifications}
                onChange={setNotifications}
                size={size}
                disabled={disabled}
                label="Push notifications"
                description="Receive push notifications on your device for important updates"
              />
            </div>
          </div>
        </div>

        {/* Settings Example */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Settings Example
          </Text>
          <div className="bg-bg-elevated rounded-2xl border border-border-subtle p-6">
            <div className="max-w-lg mx-auto divide-y divide-border-subtle">
              <div className="py-4 first:pt-0">
                <Switch
                  checked={notifications}
                  onChange={setNotifications}
                  label="Push notifications"
                  description="Receive push notifications on your device"
                />
              </div>
              <div className="py-4">
                <Switch
                  checked={darkMode}
                  onChange={setDarkMode}
                  label="Dark mode"
                  description="Use dark theme throughout the app"
                />
              </div>
              <div className="py-4">
                <Switch
                  checked={autoSave}
                  onChange={setAutoSave}
                  label="Auto-save"
                  description="Automatically save changes as you work"
                />
              </div>
              <div className="py-4 last:pb-0">
                <Switch
                  disabled
                  label="Coming soon"
                  description="This feature is not available yet"
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
          <div className="bg-bg-elevated rounded-2xl border border-border-subtle p-6">
            <div className="space-y-6">
              {SIZES.map((s) => (
                <Switch
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

        {/* States */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            States
          </Text>
          <div className="bg-bg-elevated rounded-2xl border border-border-subtle p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Switch checked label="Checked" />
                <Switch checked={false} label="Unchecked" />
              </div>
              <div className="space-y-4">
                <Switch disabled label="Disabled off" />
                <Switch disabled checked label="Disabled on" />
              </div>
            </div>
          </div>
        </div>

        {/* Standalone */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Standalone (no label)
          </Text>
          <div className="bg-bg-elevated rounded-2xl border border-border-subtle p-6">
            <div className="flex items-center gap-8">
              <Switch size="sm" checked />
              <Switch size="md" checked />
              <Switch size="lg" checked />
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-bg-elevated rounded-2xl border border-border-subtle p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Props
            </Text>
            <div className="space-y-2 text-sm text-text-secondary">
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
                <InlineCode>disabled</InlineCode> - boolean
              </p>
            </div>
          </div>
          <div className="bg-bg-elevated rounded-2xl border border-border-subtle p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Animation
            </Text>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>Spring-based toggle animation</p>
              <p>Smooth color transitions</p>
              <p>Respects prefers-reduced-motion</p>
            </div>
          </div>
          <div className="bg-bg-elevated rounded-2xl border border-border-subtle p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Accessibility
            </Text>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>
                <InlineCode>role=&quot;switch&quot;</InlineCode>
              </p>
              <p>
                <InlineCode>aria-checked</InlineCode>
              </p>
              <p>Keyboard toggle with Space</p>
              <p>Focus ring for keyboard nav</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-bg-tertiary rounded-2xl p-6">
          <Text fontWeight="medium" className="text-text-primary mb-4">
            Usage
          </Text>
          <pre className="text-text-secondary text-sm overflow-x-auto">
            <code>{`import { Switch } from '@/components/Form';

<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Push notifications"
  description="Receive push notifications on your device"
  size="md"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
