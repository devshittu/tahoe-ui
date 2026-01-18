// src/app/playground/hooks/use-escape-key/page.tsx
'use client';

import React, { useState } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { useEscapeKey, getEscapeStack } from '@/hooks';

function StackedModal({
  id,
  priority,
  isOpen,
  onClose,
  color,
}: {
  id: string;
  priority: number;
  isOpen: boolean;
  onClose: () => void;
  color: string;
}) {
  useEscapeKey(onClose, { enabled: isOpen, priority });

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-${50 + priority}`}
      style={{ zIndex: 50 + priority }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div
        className={`relative ${color} rounded-xl p-6 shadow-xl max-w-md w-full mx-4`}
      >
        <Text color="primary" fontWeight="medium" className="mb-2">
          {id} (Priority: {priority})
        </Text>
        <SmallText className="text-gray-500 mb-4 block">
          Press ESC to close this modal
        </SmallText>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg text-sm font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function UseEscapeKeyPlayground() {
  const [escCount, setEscCount] = useState(0);
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);

  // Basic escape key handler
  useEscapeKey(() => setEscCount((c) => c + 1), {
    enabled: !modal1Open && !modal2Open && !modal3Open,
    priority: 0,
  });

  const stack = getEscapeStack();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="useEscapeKey"
          subheadline="Handle ESC key with priority-based stack management for layered UIs."
          size="medium"
        />

        {/* Basic Demo */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Basic Demo
          </Text>
          <div className="flex items-center gap-4">
            <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <Text color="primary" fontWeight="medium">
                ESC pressed
              </Text>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {escCount}
              </div>
              <SmallText className="text-gray-500 mt-1">
                times (when no modal is open)
              </SmallText>
            </div>
          </div>
          <SmallText className="text-gray-500 block">
            Press ESC when no modals are open to increment the counter
          </SmallText>
        </div>

        {/* Stacked Modals Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Priority-Based Stacking
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <SmallText className="text-gray-500 mb-4 block">
              Open multiple modals to see priority-based ESC handling. Higher
              priority handles ESC first.
            </SmallText>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setModal1Open(true)}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50"
              >
                Open Modal 1 (Priority 10)
              </button>
              <button
                onClick={() => setModal2Open(true)}
                className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50"
              >
                Open Modal 2 (Priority 20)
              </button>
              <button
                onClick={() => setModal3Open(true)}
                className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50"
              >
                Open Modal 3 (Priority 30)
              </button>
            </div>

            {/* Stack Visualization */}
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Text color="primary" fontWeight="medium" className="mb-2">
                Current Escape Stack
              </Text>
              {stack.length === 0 ? (
                <SmallText className="text-gray-500">Stack is empty</SmallText>
              ) : (
                <div className="space-y-1">
                  {stack.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-400'}`}
                      />
                      <span className="text-gray-600 dark:text-gray-400">
                        ID: {item.id}, Priority: {item.priority}
                        {index === 0 && (
                          <span className="text-green-600 dark:text-green-400 ml-2">
                            (handles ESC)
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How Priority Works */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            How Priority Works
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Text color="primary" fontWeight="medium" className="mb-2">
                  Stack Behavior
                </Text>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Multiple components can register ESC handlers</li>
                  <li>• Each handler has a priority (default: 0)</li>
                  <li>• Higher priority handlers execute first</li>
                  <li>
                    • Only the highest priority handler runs per ESC press
                  </li>
                </ul>
              </div>
              <div>
                <Text color="primary" fontWeight="medium" className="mb-2">
                  Typical Priority Levels
                </Text>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>
                    <InlineCode>0</InlineCode> - Page-level handlers
                  </li>
                  <li>
                    <InlineCode>10</InlineCode> - Sidebar/drawer
                  </li>
                  <li>
                    <InlineCode>50</InlineCode> - Modal dialogs
                  </li>
                  <li>
                    <InlineCode>100</InlineCode> - Confirmation dialogs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Parameters
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>callback</InlineCode> - Function to call on ESC
              </p>
              <p>
                <InlineCode>options</InlineCode> - Configuration object
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Options
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>enabled</InlineCode> - Enable/disable handler
              </p>
              <p>
                <InlineCode>priority</InlineCode> - Stack priority (default: 0)
              </p>
              <p>
                <InlineCode>preventDefault</InlineCode> - Prevent default
                (default: true)
              </p>
              <p>
                <InlineCode>stopPropagation</InlineCode> - Stop event bubbling
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Utility Functions
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>getEscapeStack()</InlineCode> - Get current stack
              </p>
              <p>
                <InlineCode>clearEscapeStack()</InlineCode> - Clear stack
                (testing)
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
            <code>{`import { useEscapeKey } from '@/hooks';

// Basic usage
function Modal({ isOpen, onClose }) {
  useEscapeKey(onClose, { enabled: isOpen });

  if (!isOpen) return null;
  return <div>Modal content</div>;
}

// With priority for stacked modals
function ConfirmDialog({ isOpen, onClose }) {
  // Higher priority = handles ESC first
  useEscapeKey(onClose, {
    enabled: isOpen,
    priority: 100, // Higher than regular modal
  });

  return <div>Are you sure?</div>;
}

// Stacked example
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // When both are open, ESC closes confirm first
  // (priority 100), then modal (priority 50)

  return (
    <>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <ConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} />
    </>
  );
}`}</code>
          </pre>
        </div>

        {/* Modals */}
        <StackedModal
          id="Modal 1"
          priority={10}
          isOpen={modal1Open}
          onClose={() => setModal1Open(false)}
          color="bg-blue-50 dark:bg-blue-900/50"
        />
        <StackedModal
          id="Modal 2"
          priority={20}
          isOpen={modal2Open}
          onClose={() => setModal2Open(false)}
          color="bg-purple-50 dark:bg-purple-900/50"
        />
        <StackedModal
          id="Modal 3"
          priority={30}
          isOpen={modal3Open}
          onClose={() => setModal3Open(false)}
          color="bg-green-50 dark:bg-green-900/50"
        />
      </div>
    </div>
  );
}
