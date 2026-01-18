// src/app/playground/hooks/use-focus-trap/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { useFocusTrap } from '@/hooks';

export default function UseFocusTrapPlayground() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [autoFocus, setAutoFocus] = useState(true);
  const [returnFocus, setReturnFocus] = useState(true);

  const { ref } = useFocusTrap<HTMLDivElement>({
    enabled: isEnabled,
    autoFocus,
    returnFocus,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="useFocusTrap"
          subheadline="Trap keyboard focus within a container for accessible modals and overlays."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={(e) => setIsEnabled(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <SmallText>Enabled</SmallText>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoFocus}
                onChange={(e) => setAutoFocus(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <SmallText>Auto Focus</SmallText>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={returnFocus}
                onChange={(e) => setReturnFocus(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <SmallText>Return Focus</SmallText>
            </label>
          </div>
        </div>

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo
          </Text>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
            <div className="mb-4">
              <button
                onClick={() => setIsEnabled(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Activate Focus Trap
              </button>
            </div>

            <div
              ref={ref}
              className={`p-6 rounded-lg transition-all ${
                isEnabled
                  ? 'bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-500'
                  : 'bg-white dark:bg-gray-900'
              }`}
            >
              <Text color="primary" fontWeight="medium" className="mb-4">
                {isEnabled ? 'Focus is trapped here!' : 'Focus trap container'}
              </Text>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="First input"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Second input"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsEnabled(false)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {isEnabled ? 'Close (Disable Trap)' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>

            {isEnabled && (
              <SmallText className="text-blue-600 dark:text-blue-400 mt-4 block text-center">
                Press Tab/Shift+Tab to navigate. Focus stays within the
                container.
              </SmallText>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            How It Works
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <ol className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center justify-center">
                  1
                </span>
                <span>
                  Click &quot;Activate Focus Trap&quot; to enable the trap
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center justify-center">
                  2
                </span>
                <span>
                  If autoFocus is enabled, the first input will receive focus
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center justify-center">
                  3
                </span>
                <span>
                  Press Tab to move forward through focusable elements
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center justify-center">
                  4
                </span>
                <span>At the last element, Tab wraps to the first element</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center justify-center">
                  5
                </span>
                <span>
                  Click &quot;Close&quot; and focus returns to the original
                  button
                </span>
              </li>
            </ol>
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Options
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>enabled</InlineCode> - Enable/disable trap
              </p>
              <p>
                <InlineCode>autoFocus</InlineCode> - Focus first element on
                mount
              </p>
              <p>
                <InlineCode>returnFocus</InlineCode> - Return focus on unmount
              </p>
              <p>
                <InlineCode>initialFocus</InlineCode> - Selector or element to
                focus
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Return Value
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>ref</InlineCode> - Ref to attach to container
              </p>
              <p>Container must have focusable children</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Use Cases
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Modal dialogs</p>
              <p>Dropdown menus</p>
              <p>Slide-over panels</p>
              <p>Alert dialogs</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6">
          <Text fontWeight="medium" className="text-white mb-4">
            Usage
          </Text>
          <pre className="text-gray-300 text-sm overflow-x-auto">
            <code>{`import { useFocusTrap } from '@/hooks';

function Modal({ isOpen, onClose, children }) {
  const { ref } = useFocusTrap<HTMLDivElement>({
    enabled: isOpen,
    autoFocus: true,
    returnFocus: true,
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div ref={ref} className="modal-content" role="dialog">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// With initial focus
function LoginModal({ isOpen }) {
  const { ref } = useFocusTrap<HTMLFormElement>({
    enabled: isOpen,
    initialFocus: '#email-input', // Focus specific element
  });

  return (
    <form ref={ref}>
      <input id="email-input" type="email" />
      <input type="password" />
      <button type="submit">Login</button>
    </form>
  );
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
