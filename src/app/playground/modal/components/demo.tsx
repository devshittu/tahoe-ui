'use client';

import React, { useState } from 'react';
import { Dialog } from './Dialog';
import { PageMode } from './PageMode';
import { useUIComponent } from '@/stores/useUIComponent';

/**
 * Comprehensive Demo Page for Dialog & PageMode
 *
 * Showcases:
 * - All positions (top/bottom/left/right)
 * - Resistance physics
 * - Size variants
 * - Keyboard accessibility
 * - Theme support
 */
export default function ComponentDemo() {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    position: 'top' | 'bottom' | 'left' | 'right';
  }>({
    isOpen: false,
    position: 'top',
  });

  const { open: openPageMode } = useUIComponent();

  const openDialog = (position: 'top' | 'bottom' | 'left' | 'right') => {
    setDialogState({ isOpen: true, position });
  };

  const closeDialog = () => {
    setDialogState({ ...dialogState, isOpen: false });
  };

  const openPageModeDemo = (
    position: 'top' | 'bottom' | 'left' | 'right',
    size: 'small' | 'medium' | 'large' | 'full' = 'large',
  ) => {
    openPageMode(
      <DemoContent
        title={`PageMode ${position} (${size})`}
        description="Drag the handlebar to close or press Escape. Try dragging in both directions!"
      />,
      { position, size }, // Pass options
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Dialog & PageMode Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            HeadlessUI + Enhanced Physics + Smooth Animations
          </p>
        </header>

        {/* Dialog Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-blue-600">📱</span>
            Dialog Component
          </h2>

          <div className="space-y-4 mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Modal dialogs with gesture-based dismissal. Try dragging the
              handlebar in different directions to feel the resistance physics!
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                ✨ <strong>Pro tip:</strong> Drag away from the close direction
                to feel resistance. The handlebar will darken and scale as
                feedback.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
              <button
                key={pos}
                onClick={() => openDialog(pos)}
                className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                From {pos.charAt(0).toUpperCase() + pos.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* PageMode Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-purple-600">🎯</span>
            PageMode Component
          </h2>

          <div className="space-y-4 mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Full-screen overlays with global state management. Features size
              variants and the same gesture physics as Dialog.
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p className="text-sm text-purple-800 dark:text-purple-300">
                ✨ <strong>New:</strong> Size variants (small, medium, large,
                full) for flexible layouts!
              </p>
            </div>
          </div>

          {/* Position Buttons */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Standard Sizes
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => openPageModeDemo(pos)}
                    className="px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    {pos.charAt(0).toUpperCase() + pos.slice(1)} (Large)
                  </button>
                ))}
              </div>
            </div>

            {/* Size Variants */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Size Variants (Bottom)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(['small', 'medium', 'large', 'full'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => openPageModeDemo('bottom', size)}
                    className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon="⚡"
            title="Velocity Detection"
            description="Fast swipe gestures automatically trigger close, just like native apps"
          />
          <FeatureCard
            icon="🎨"
            title="Visual Feedback"
            description="Handlebar scales and darkens based on resistance intensity"
          />
          <FeatureCard
            icon="♿"
            title="Accessible"
            description="Full keyboard navigation, ARIA labels, and focus management"
          />
          <FeatureCard
            icon="🌙"
            title="Theme Support"
            description="Dark mode ready with smooth transitions"
          />
          <FeatureCard
            icon="📱"
            title="Touch Optimized"
            description="Works perfectly on mobile with native-feeling gestures"
          />
          <FeatureCard
            icon="⚙️"
            title="Configurable"
            description="Fine-tune resistance, thresholds, and animation behavior"
          />
        </section>

        {/* Keyboard Shortcuts */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold mb-4">⌨️ Keyboard Shortcuts</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Shortcut keys="ESC" description="Close dialog/pagemode" />
            <Shortcut keys="Tab" description="Navigate interactive elements" />
            <Shortcut
              keys="Enter / Space"
              description="Click handlebar to close"
            />
            <Shortcut keys="Click outside" description="Close (if enabled)" />
          </div>
        </section>
      </div>

      {/* Dialog Instance */}
      <Dialog
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        showFrom={dialogState.position}
        handlebarPosition={dialogState.position}
        roundedEdges={true}
        themeable={true}
        closeThreshold={0.5}
        enhancedCloseBox={true}
        resistance={{
          enabled: true,
          threshold: 50,
          strength: 0.6,
          visualFeedback: true,
        }}
      >
        <DemoContent
          title={`Dialog from ${dialogState.position}`}
          description="This is a fully functional dialog with enhanced physics"
        />
      </Dialog>

      {/* PageMode Instance (global state controlled - position/size from store) */}
      <PageMode
        roundedEdges={true}
        themeable={true}
        closeThreshold={0.5}
        enhancedCloseBox={true}
        resistance={{
          enabled: true,
          threshold: 50,
          strength: 0.6,
          visualFeedback: true,
        }}
      />
    </div>
  );
}

// Helper Components
function DemoContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-300">
            ✨ Gesture Interactions
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
            <li>• Drag handlebar toward close direction</li>
            <li>• Drag away to feel resistance feedback</li>
            <li>• Fast swipe to close instantly</li>
            <li>• Click/tap handlebar to close</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-purple-900 dark:text-purple-300">
            🎯 Physics Details
          </h3>
          <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-400">
            <li>• Spring damping: 28 (smooth, minimal bounce)</li>
            <li>• Resistance threshold: 50px</li>
            <li>• Velocity trigger: 500px/ms</li>
            <li>• Visual feedback: 0-100% intensity</li>
          </ul>
        </div>

        {/* Sample content for scrolling */}
        {Array.from({ length: 5 }).map((_, i) => (
          <p key={i} className="text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function Shortcut({
  keys,
  description,
}: {
  keys: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <kbd className="px-3 py-1 bg-gray-700 rounded border border-gray-600 font-mono text-sm">
        {keys}
      </kbd>
      <span className="text-gray-300">{description}</span>
    </div>
  );
}
