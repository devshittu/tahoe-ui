// src/app/playground/toast/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Heading,
  Paragraph,
  Text,
  SmallText,
  InlineCode,
} from '@/components/Typography';
import {
  ToastContainer,
  useToast,
  useToastStore,
  type ToastPosition,
  type ToastVariant,
  type DismissMode,
} from '@/components/Toast';
import {
  FiCheck,
  FiAlertTriangle,
  FiInfo,
  FiBell,
  FiCode,
  FiSettings,
  FiZap,
  FiMousePointer,
} from 'react-icons/fi';

const positions: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const variants: {
  value: ToastVariant;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: 'default', label: 'Default', icon: FiBell },
  { value: 'success', label: 'Success', icon: FiCheck },
  { value: 'error', label: 'Error', icon: FiAlertTriangle },
  { value: 'warning', label: 'Warning', icon: FiAlertTriangle },
  { value: 'info', label: 'Info', icon: FiInfo },
];

const dismissModes: {
  value: DismissMode;
  label: string;
  description: string;
}[] = [
  {
    value: 'gesture',
    label: 'Gesture',
    description: 'Swipe or drag to dismiss',
  },
  {
    value: 'action-only',
    label: 'Action Only',
    description: 'Must click action button',
  },
  {
    value: 'auto',
    label: 'Auto',
    description: 'Auto-dismiss only, no manual option',
  },
];

/**
 * Toast Demo Page
 *
 * Interactive showcase of the Toast system with:
 * - All variants
 * - Position controls
 * - Dismiss mode configuration
 * - Duration settings
 * - Code examples
 */
export default function ToastPage() {
  const { toast, success, error, warning, info } = useToast();
  const { position, setPosition } = useToastStore();
  const [duration, setDuration] = useState(5000);
  const [showTitle, setShowTitle] = useState(true);
  const [dismissMode, setDismissMode] = useState<DismissMode>('gesture');
  const [showHandlebar, setShowHandlebar] = useState(true);

  const handleToast = (variant: ToastVariant) => {
    const messages: Record<ToastVariant, { title: string; message: string }> = {
      default: {
        title: 'Notification',
        message: 'This is a default notification message.',
      },
      success: {
        title: 'Success',
        message: 'Your changes have been saved successfully.',
      },
      error: {
        title: 'Error',
        message: 'Something went wrong. Please try again.',
      },
      warning: {
        title: 'Warning',
        message: 'This action may have unintended consequences.',
      },
      info: {
        title: 'Information',
        message: 'A new update is available for download.',
      },
    };

    const { title, message } = messages[variant];

    // For action-only mode, always include an action
    const actionConfig =
      dismissMode === 'action-only'
        ? {
            action: {
              label: 'Got it',
              onClick: () => console.log('Action clicked'),
            },
          }
        : {};

    toast({
      title: showTitle ? title : undefined,
      message,
      variant,
      duration,
      dismissMode,
      showHandlebar: dismissMode === 'gesture' ? showHandlebar : false,
      ...actionConfig,
    });
  };

  const handleWithAction = () => {
    toast({
      title: 'File Uploaded',
      message: 'Your file has been uploaded successfully.',
      variant: 'success',
      duration: 0,
      dismissMode: 'gesture',
      showHandlebar: true,
      action: {
        label: 'View File',
        onClick: () => console.log('Viewing file...'),
        dismissOnClick: true,
      },
    });
  };

  const handleActionOnly = () => {
    toast({
      title: 'Confirm Action',
      message: 'Please confirm to proceed with this operation.',
      variant: 'warning',
      duration: 0,
      dismissMode: 'action-only',
      action: {
        label: 'Confirm',
        onClick: () => console.log('Confirmed!'),
      },
    });
  };

  const handleAutoOnly = () => {
    toast({
      title: 'Auto Notification',
      message: 'This will auto-dismiss. No manual dismiss option.',
      variant: 'info',
      duration: 3000,
      dismissMode: 'auto',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-6 lg:px-8 py-8"
    >
      {/* Toast Container */}
      <ToastContainer />

      {/* Header */}
      <div className="mb-8">
        <Heading level={1} size="3xl" margin="mb-4" color="primary">
          Toast / Snackbar
        </Heading>
        <Paragraph color="secondary" className="text-lg leading-relaxed">
          Queue-managed notifications with gesture-based dismissal, handlebar
          affordance, and configurable dismiss modes. No X buttons.
        </Paragraph>
      </div>

      {/* Key Features */}
      <div className="mb-10 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <Heading level={2} size="md" margin="mb-4" color="primary">
          Key Features
        </Heading>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {[
            'Gesture dismissal with handlebar indicator',
            'Configurable dismiss modes (gesture/action/auto)',
            'Swipe left or right to dismiss',
            'Pause on hover with progress indicator',
            'Action-only mode for required responses',
            'Multiple position options',
            'Accessible with ARIA attributes',
            'No X buttons - clean, modern UX',
          ].map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">
                <FiCheck className="w-4 h-4" />
              </span>
              <SmallText className="text-gray-700 dark:text-gray-300">
                {feature}
              </SmallText>
            </li>
          ))}
        </ul>
      </div>

      {/* Demo Section */}
      <section className="mb-10">
        <Heading level={2} size="lg" margin="mb-6" color="primary">
          Interactive Demo
        </Heading>

        {/* Dismiss Mode */}
        <div className="mb-8">
          <Text fontWeight="medium" color="primary" className="mb-3 block">
            Dismiss Mode
          </Text>
          <div className="flex flex-wrap gap-3">
            {dismissModes.map(({ value, label, description }) => (
              <button
                key={value}
                onClick={() => setDismissMode(value)}
                className={cn(
                  'flex flex-col items-start px-4 py-3 rounded-lg border transition-all',
                  dismissMode === value
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-transparent'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300',
                )}
              >
                <Text
                  className="text-sm"
                  fontWeight="medium"
                  color={dismissMode === value ? 'white' : 'primary'}
                >
                  {label}
                </Text>
                <SmallText
                  className={cn(
                    'text-xs mt-1',
                    dismissMode === value
                      ? 'text-gray-300 dark:text-gray-600'
                      : 'text-gray-500',
                  )}
                >
                  {description}
                </SmallText>
              </button>
            ))}
          </div>
        </div>

        {/* Variants */}
        <div className="mb-8">
          <Text fontWeight="medium" color="primary" className="mb-3 block">
            Variants
          </Text>
          <div className="flex flex-wrap gap-3">
            {variants.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => handleToast(value)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg',
                  'border transition-all duration-150',
                  'hover:scale-[1.02] active:scale-[0.98]',
                  value === 'default' &&
                    'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300',
                  value === 'success' &&
                    'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300',
                  value === 'error' &&
                    'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
                  value === 'warning' &&
                    'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
                  value === 'info' &&
                    'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
                )}
              >
                <Icon className="w-4 h-4" />
                <Text className="text-sm" fontWeight="medium">
                  {label}
                </Text>
              </button>
            ))}
          </div>
        </div>

        {/* Position */}
        <div className="mb-8">
          <Text fontWeight="medium" color="primary" className="mb-3 block">
            Position
          </Text>
          <div className="grid grid-cols-3 gap-2 max-w-xs">
            {positions.map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className={cn(
                  'px-3 py-2 text-xs rounded-lg border transition-colors',
                  position === pos
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-transparent'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300',
                )}
              >
                {pos.replace('-', '\n')}
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="mb-8 flex flex-wrap gap-6">
          <div>
            <Text fontWeight="medium" color="primary" className="mb-2 block">
              Duration (ms)
            </Text>
            <input
              type="range"
              min="0"
              max="10000"
              step="1000"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-48"
            />
            <SmallText className="ml-2">
              {duration === 0 ? 'Persistent' : `${duration}ms`}
            </SmallText>
          </div>

          <div>
            <Text fontWeight="medium" color="primary" className="mb-2 block">
              Show Title
            </Text>
            <button
              onClick={() => setShowTitle(!showTitle)}
              className={cn(
                'px-4 py-2 rounded-lg border transition-colors',
                showTitle
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-transparent'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
              )}
            >
              {showTitle ? 'On' : 'Off'}
            </button>
          </div>

          {dismissMode === 'gesture' && (
            <div>
              <Text fontWeight="medium" color="primary" className="mb-2 block">
                Show Handlebar
              </Text>
              <button
                onClick={() => setShowHandlebar(!showHandlebar)}
                className={cn(
                  'px-4 py-2 rounded-lg border transition-colors',
                  showHandlebar
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-transparent'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
                )}
              >
                {showHandlebar ? 'On' : 'Off'}
              </button>
            </div>
          )}
        </div>

        {/* Special Cases */}
        <div className="mb-8">
          <Text fontWeight="medium" color="primary" className="mb-3 block">
            Special Cases
          </Text>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleWithAction}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 transition-colors"
            >
              <FiSettings className="w-4 h-4" />
              <Text className="text-sm">Gesture + Action</Text>
            </button>
            <button
              onClick={handleActionOnly}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:border-amber-300 transition-colors"
            >
              <FiMousePointer className="w-4 h-4" />
              <Text className="text-sm">Action Only</Text>
            </button>
            <button
              onClick={handleAutoOnly}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:border-blue-300 transition-colors"
            >
              <FiZap className="w-4 h-4" />
              <Text className="text-sm">Auto Only</Text>
            </button>
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="mb-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <FiCode className="w-5 h-5 text-gray-500" />
          <Heading level={2} size="md" margin="" color="primary">
            Usage
          </Heading>
        </div>

        <div className="space-y-4">
          <div>
            <SmallText className="mb-2 block text-gray-600 dark:text-gray-400">
              Basic gesture-based toast:
            </SmallText>
            <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
              <code>{`import { useToast, ToastContainer } from './components';

function App() {
  const { toast, success } = useToast();

  return (
    <>
      <ToastContainer />
      <button onClick={() => success('Changes saved!')}>
        Save
      </button>
    </>
  );
}`}</code>
            </pre>
          </div>

          <div>
            <SmallText className="mb-2 block text-gray-600 dark:text-gray-400">
              Action-only mode (requires response):
            </SmallText>
            <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
              <code>{`toast({
  title: 'Confirm Delete',
  message: 'This action cannot be undone.',
  variant: 'warning',
  duration: 0,
  dismissMode: 'action-only',
  action: {
    label: 'Delete',
    onClick: () => deleteItem(),
  },
});`}</code>
            </pre>
          </div>

          <div>
            <SmallText className="mb-2 block text-gray-600 dark:text-gray-400">
              Full configuration:
            </SmallText>
            <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
              <code>{`toast({
  title: 'Upload Complete',
  message: 'Your file has been uploaded.',
  variant: 'success',
  duration: 5000,
  dismissMode: 'gesture',     // 'gesture' | 'action-only' | 'auto'
  showHandlebar: true,        // Show drag indicator
  swipeEnabled: true,         // Allow swipe to dismiss
  action: {
    label: 'View',
    onClick: () => navigate('/files'),
    dismissOnClick: true,     // Dismiss after action
  },
});`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <Heading level={2} size="md" margin="mb-4" color="primary">
          API Reference
        </Heading>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 pr-4 font-medium text-gray-900 dark:text-gray-100">
                  Prop
                </th>
                <th className="text-left py-2 pr-4 font-medium text-gray-900 dark:text-gray-100">
                  Type
                </th>
                <th className="text-left py-2 pr-4 font-medium text-gray-900 dark:text-gray-100">
                  Default
                </th>
                <th className="text-left py-2 font-medium text-gray-900 dark:text-gray-100">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                [
                  'message',
                  'string | ReactNode',
                  '-',
                  'Toast content (required)',
                ],
                ['title', 'string', '-', 'Optional title'],
                [
                  'variant',
                  "'default' | 'success' | 'error' | 'warning' | 'info'",
                  "'default'",
                  'Visual style',
                ],
                [
                  'duration',
                  'number',
                  '5000',
                  'Auto-dismiss duration (0 = persist)',
                ],
                [
                  'dismissMode',
                  "'gesture' | 'action-only' | 'auto'",
                  "'gesture'",
                  'How toast can be dismissed',
                ],
                [
                  'showHandlebar',
                  'boolean',
                  'true',
                  'Show drag handle indicator',
                ],
                ['swipeEnabled', 'boolean', 'true', 'Allow swipe to dismiss'],
                [
                  'action',
                  '{ label, onClick, dismissOnClick? }',
                  '-',
                  'Action button config',
                ],
                ['onDismiss', '() => void', '-', 'Callback on dismiss'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop}>
                  <td className="py-2 pr-4">
                    <InlineCode>{prop}</InlineCode>
                  </td>
                  <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                    {type}
                  </td>
                  <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                    {def}
                  </td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}
