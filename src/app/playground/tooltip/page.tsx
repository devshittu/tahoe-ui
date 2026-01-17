// src/app/playground/tooltip/page.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Heading, Text, SmallText, Paragraph } from '@/components/Typography';
import {
  Tooltip,
  TooltipVariant,
  TooltipSize,
  TooltipTrigger,
} from './components';
import type { Placement } from '@/hooks/usePositioning';
import {
  FiInfo,
  FiAlertCircle,
  FiSettings,
  FiHelpCircle,
  FiExternalLink,
  FiCopy,
  FiCheck,
} from 'react-icons/fi';

const PLACEMENTS: Placement[] = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
];

const VARIANTS: TooltipVariant[] = [
  'default',
  'dark',
  'light',
  'info',
  'warning',
  'error',
];
const SIZES: TooltipSize[] = ['sm', 'md', 'lg'];
const TRIGGERS: TooltipTrigger[] = ['hover', 'focus', 'click'];

export default function TooltipPlayground() {
  const [placement, setPlacement] = useState<Placement>('top');
  const [variant, setVariant] = useState<TooltipVariant>('default');
  const [size, setSize] = useState<TooltipSize>('md');
  const [trigger, setTrigger] = useState<TooltipTrigger>('hover');
  const [showArrow, setShowArrow] = useState(true);
  const [interactive, setInteractive] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('Copied to clipboard!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Heading size="2xl" color="primary" className="font-bold">
            Tooltip
          </Heading>
          <Paragraph color="secondary" className="max-w-2xl mx-auto">
            Contextual information displayed on hover, focus, or click. Features
            smart positioning, hover intent detection, and natural dismissal
            patterns.
          </Paragraph>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Heading size="md" color="primary" className="font-semibold">
            Configuration
          </Heading>

          {/* Placement */}
          <div className="space-y-2">
            <Text fontWeight="medium" color="primary">
              Placement
            </Text>
            <div className="flex flex-wrap gap-2">
              {PLACEMENTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlacement(p)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    placement === p
                      ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Variant */}
          <div className="space-y-2">
            <Text fontWeight="medium" color="primary">
              Variant
            </Text>
            <div className="flex flex-wrap gap-2">
              {VARIANTS.map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize',
                    variant === v
                      ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <Text fontWeight="medium" color="primary">
              Size
            </Text>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors uppercase',
                    size === s
                      ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Trigger */}
          <div className="space-y-2">
            <Text fontWeight="medium" color="primary">
              Trigger
            </Text>
            <div className="flex gap-2">
              {TRIGGERS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTrigger(t)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize',
                    trigger === t
                      ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showArrow}
                onChange={(e) => setShowArrow(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
              />
              <Text color="primary">Show Arrow</Text>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={interactive}
                onChange={(e) => setInteractive(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
              />
              <Text color="primary">Interactive</Text>
            </label>
          </div>
        </div>

        {/* Demo Area */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12">
          <div className="flex items-center justify-center min-h-[200px]">
            <Tooltip
              content="This is a tooltip with helpful information"
              placement={placement}
              variant={variant}
              size={size}
              trigger={trigger}
              showArrow={showArrow}
              interactive={interactive}
            >
              <button
                className={cn(
                  'px-6 py-3 rounded-xl font-medium transition-colors',
                  'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900',
                  'hover:bg-gray-800 dark:hover:bg-gray-200',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
                )}
              >
                {trigger === 'hover' && 'Hover me'}
                {trigger === 'focus' && 'Focus me'}
                {trigger === 'click' && 'Click me'}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          <Heading size="lg" color="primary" className="font-semibold">
            Examples
          </Heading>

          {/* Icon Tooltips */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Icon Tooltips
            </Text>
            <div className="flex items-center gap-4">
              <Tooltip content="Information" placement="top">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <FiInfo className="w-5 h-5 text-blue-500" />
                </button>
              </Tooltip>
              <Tooltip
                content="Warning: This action cannot be undone"
                variant="warning"
                placement="top"
              >
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <FiAlertCircle className="w-5 h-5 text-amber-500" />
                </button>
              </Tooltip>
              <Tooltip content="Settings" placement="top">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <FiSettings className="w-5 h-5 text-gray-500" />
                </button>
              </Tooltip>
              <Tooltip content="Get help" placement="top">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <FiHelpCircle className="w-5 h-5 text-gray-500" />
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Interactive Tooltip */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Interactive Tooltip
            </Text>
            <SmallText className="text-gray-500 dark:text-gray-400">
              Hover over the tooltip content to interact with it
            </SmallText>
            <div className="flex items-center gap-4">
              <Tooltip
                content={
                  <div className="space-y-2">
                    <Text fontWeight="medium" className="text-inherit">
                      Learn More
                    </Text>
                    <SmallText className="text-inherit opacity-80">
                      Click the link below for documentation
                    </SmallText>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-blue-300 hover:text-blue-200 underline"
                    >
                      View docs <FiExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                }
                interactive
                variant="dark"
                placement="right"
                maxWidth={250}
              >
                <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Hover for interactive content
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Rich Content */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Rich Content
            </Text>
            <div className="flex items-center gap-4">
              <Tooltip
                content={
                  <div className="space-y-1">
                    <Text fontWeight="semibold" className="text-inherit">
                      Keyboard Shortcut
                    </Text>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-xs font-mono">
                        Cmd
                      </kbd>
                      <span>+</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-xs font-mono">
                        K
                      </kbd>
                    </div>
                  </div>
                }
                variant="dark"
                placement="bottom"
              >
                <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  With keyboard shortcut
                </button>
              </Tooltip>

              <Tooltip
                content={copied ? 'Copied!' : 'Click to copy'}
                variant={copied ? 'info' : 'default'}
                trigger="click"
                placement="bottom"
              >
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {copied ? (
                    <FiCheck className="w-5 h-5 text-green-500" />
                  ) : (
                    <FiCopy className="w-5 h-5" />
                  )}
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Variants Showcase */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              All Variants
            </Text>
            <div className="flex flex-wrap items-center gap-4">
              {VARIANTS.map((v) => (
                <Tooltip
                  key={v}
                  content={`This is a ${v} tooltip`}
                  variant={v}
                  placement="top"
                >
                  <button
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize',
                      'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
                      'hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    {v}
                  </button>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Focus Trigger for Accessibility */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Accessible Form Hints
            </Text>
            <SmallText className="text-gray-500 dark:text-gray-400">
              Tab through the inputs to see focus-triggered tooltips
            </SmallText>
            <div className="flex flex-col gap-4 max-w-sm">
              <Tooltip
                content="Enter your full legal name"
                trigger="focus"
                placement="right"
                variant="light"
              >
                <input
                  type="text"
                  placeholder="Full name"
                  className={cn(
                    'px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700',
                    'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  )}
                />
              </Tooltip>
              <Tooltip
                content="We'll never share your email"
                trigger="focus"
                placement="right"
                variant="light"
              >
                <input
                  type="email"
                  placeholder="Email address"
                  className={cn(
                    'px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700',
                    'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                  )}
                />
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Dismissal Info */}
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800 p-6">
          <div className="flex gap-3">
            <FiInfo className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <Text fontWeight="medium" color="primary">
                Natural Dismissal
              </Text>
              <SmallText className="text-gray-500 dark:text-gray-400">
                Tooltips dismiss naturally without close buttons: hover away,
                blur focus, press Escape, or click outside. This follows the
                no-X design philosophy for cleaner, more intuitive interactions.
              </SmallText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
