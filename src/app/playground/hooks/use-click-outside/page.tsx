// src/app/playground/hooks/use-click-outside/page.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Text, SmallText, InlineCode } from '@/components/Typography';
import { HeadlineBlock } from '../../headline/components';
import { useClickOutside } from '@/hooks';

export default function UseClickOutsidePlayground() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [includeTouch, setIncludeTouch] = useState(true);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const { ref: dropdownRef } = useClickOutside<HTMLDivElement>(
    () => {
      setIsDropdownOpen(false);
      setClickCount((c) => c + 1);
    },
    {
      enabled: isDropdownOpen,
      ignoreRefs: [triggerRef],
      includeTouch,
    },
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <HeadlineBlock
          headline="useClickOutside"
          subheadline="Detect clicks outside an element for closing dropdowns and overlays."
          size="medium"
        />

        {/* Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Configuration
          </Text>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeTouch}
                onChange={(e) => setIncludeTouch(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <SmallText>Include Touch Events</SmallText>
            </label>
            <div className="text-sm text-gray-500">
              Outside clicks detected:{' '}
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {clickCount}
              </span>
            </div>
          </div>
        </div>

        {/* Live Demo */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            Live Demo - Dropdown
          </Text>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 min-h-[300px]">
            <div className="relative inline-block">
              <button
                ref={triggerRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isDropdownOpen ? 'Close Dropdown' : 'Open Dropdown'}
              </button>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10"
                >
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Help
                  </button>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-white dark:bg-gray-900 rounded-lg">
              <SmallText className="text-gray-500">
                Click anywhere outside the dropdown to close it. Clicking the
                toggle button won&apos;t trigger the outside click handler
                because it&apos;s in the ignoreRefs list.
              </SmallText>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="space-y-4">
          <Text fontWeight="medium" color="primary" className="text-lg">
            How It Works
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Text color="primary" fontWeight="medium" className="mb-2">
                  Included in Detection
                </Text>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Background areas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Other UI elements
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Touch events (if enabled)
                  </li>
                </ul>
              </div>
              <div>
                <Text color="primary" fontWeight="medium" className="mb-2">
                  Excluded from Detection
                </Text>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Target element (ref)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Elements in ignoreRefs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Children of target element
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
                <InlineCode>callback</InlineCode> - Function to call on outside
                click
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
                <InlineCode>enabled</InlineCode> - Enable/disable listener
              </p>
              <p>
                <InlineCode>ignoreRefs</InlineCode> - Refs to ignore clicks on
              </p>
              <p>
                <InlineCode>includeTouch</InlineCode> - Listen for touch events
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <Text fontWeight="medium" color="primary">
              Return Value
            </Text>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <InlineCode>ref</InlineCode> - Ref to attach to target element
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
            <code>{`import { useClickOutside } from '@/hooks';
import { useState, useRef } from 'react';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { ref: contentRef } = useClickOutside<HTMLDivElement>(
    () => setIsOpen(false),
    {
      enabled: isOpen,
      ignoreRefs: [triggerRef], // Don't close when clicking trigger
      includeTouch: true,
    }
  );

  return (
    <div>
      <button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        Toggle Dropdown
      </button>

      {isOpen && (
        <div ref={contentRef} className="dropdown-content">
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Sign Out</MenuItem>
        </div>
      )}
    </div>
  );
}

// Simple usage without ignore refs
function Popover({ onClose }) {
  const { ref } = useClickOutside<HTMLDivElement>(onClose);

  return (
    <div ref={ref} className="popover">
      Content here
    </div>
  );
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
