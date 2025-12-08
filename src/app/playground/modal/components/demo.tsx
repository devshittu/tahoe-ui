'use client';

import React, { useState } from 'react';
import { Dialog } from './Dialog';
import { PageMode } from './PageMode';
import { usePageMode, useModals, useDialog } from './stores/useModalStore';

/**
 * Comprehensive Demo Page for Dialog & PageMode with Enhanced Features
 *
 * Now using Zustand-based unified modal store for:
 * - Modal stacking support
 * - Per-instance loading control
 * - Cleaner state management
 * - Can trigger Dialog from PageMode and vice versa
 */

// Dialog wrapper that uses Zustand store for stacking
function DialogFromStore() {
  const store = useDialog();
  const {
    isOpen,
    isClosing,
    content,
    close,
    showFrom,
    handlebarPosition,
    isLoading,
    loadingMessage,
  } = store;

  // Get the modal instance from the full store to access zIndex
  const { getDialog } = useModals();
  const modalInstance = getDialog();
  const zIndex = modalInstance?.zIndex || 10000;

  if (!isOpen) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={close}
      showFrom={showFrom}
      handlebarPosition={handlebarPosition}
      zIndex={zIndex} // Pass dynamic z-index from store
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
      backdropEffects={{
        blur: true,
        blurAmount: '8px',
        scale: true,
        scaleAmount: 0.98,
        backgroundOpacity: 0.3,
      }}
      squashStretch={{
        enabled: true,
        trigger: 'start',
        intensity: 0.03,
        duration: 150,
      }}
      loadingState={{
        isLoading,
        message: loadingMessage || 'Processing...',
        lockInteraction: true,
        shimmerSpeed: 'fast',
      }}
      a11yOptions={{
        generateUniqueIds: true,
        enableFocusTrap: true,
        announceToScreenReader: true,
        escapeClose: true,
        closeOnOutsideClick: true,
        scrollable: true,
      }}
    >
      {content}
    </Dialog>
  );
}

// PageMode demo content with Zustand-based loading control
function PageModeDemoContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { setLoading, isLoading } = usePageMode();
  const { openDialog } = useModals();

  const toggleLoading = () => {
    setLoading(
      !isLoading,
      isLoading ? undefined : 'Processing PageMode request...',
    );
  };

  // Example: Open Dialog from within PageMode
  const openNestedDialog = () => {
    openDialog(
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">
          Dialog opened from PageMode!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This demonstrates modal stacking. The Dialog appears on top of the
          PageMode.
        </p>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          ✨ Try dragging, pressing ESC, or clicking outside to close this
          Dialog. The PageMode beneath will remain open!
        </p>
      </div>,
      { showFrom: 'top' },
    );
  };

  return (
    <DemoContent
      title={title}
      description={description}
      showLoadingToggle={true}
      isLoading={isLoading}
      onToggleLoading={toggleLoading}
      showNestedDialogButton={true}
      onOpenNestedDialog={openNestedDialog}
    />
  );
}

export default function ComponentDemo() {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    position: 'top' | 'bottom' | 'left' | 'right';
    loading: boolean;
  }>({
    isOpen: false,
    position: 'top',
    loading: false,
  });

  const { openPageMode, closeAll } = useModals();

  const openDialogDemo = (position: 'top' | 'bottom' | 'left' | 'right') => {
    setDialogState({ isOpen: true, position, loading: false });
  };

  const closeDialog = () => {
    setDialogState({ ...dialogState, isOpen: false });
  };

  const toggleDialogLoading = () => {
    setDialogState({ ...dialogState, loading: !dialogState.loading });
  };

  // Open PageMode from Dialog
  const openPageModeFromDialog = () => {
    openPageMode(
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">
          PageMode opened from Dialog!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This demonstrates modal stacking in reverse. The PageMode appears on
          top of the Dialog.
        </p>
        <p className="text-sm text-purple-600 dark:text-purple-400">
          ✨ Try dragging, pressing ESC, or clicking outside to close this
          PageMode. The Dialog beneath will remain open!
        </p>
      </div>,
      { position: 'bottom', size: 'large' },
    );
  };

  const openPageModeDemo = (
    position: 'top' | 'bottom' | 'left' | 'right',
    size: 'small' | 'medium' | 'large' | 'full' = 'large',
  ) => {
    openPageMode(
      <PageModeDemoContent
        title={`PageMode ${position} (${size})`}
        description="Drag the handlebar to close or press Escape. Try the buttons below for advanced features!"
      />,
      { position, size },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Enhanced Dialog & PageMode Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Zustand-Powered Modal System with Stacking Support
          </p>
        </header>

        {/* New Features Highlight */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            🎉 New: Unified Modal System
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-2">🏗️ Modal Stacking</h3>
              <p className="text-sm">
                Open Dialog from PageMode or vice versa - automatic z-index
                management
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-2">⚡ Zustand Store</h3>
              <p className="text-sm">
                Global state management with per-instance loading control
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-2">🔄 Cross-Modal Triggers</h3>
              <p className="text-sm">
                Trigger any modal from anywhere in your app or from within other
                modals
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-2">🎯 No Context Needed</h3>
              <p className="text-sm">
                Clean API without provider wrappers or prop drilling
              </p>
            </div>
          </div>
        </section>

        {/* Dialog Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-blue-600">📱</span>
            Dialog Component
          </h2>

          <div className="space-y-4 mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Modal dialogs with gesture-based dismissal and enhanced motion
              effects. Try dragging the handlebar in different directions!
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                ✨ <strong>Pro tip:</strong> Drag away from the close direction
                to feel resistance. Notice the squash-and-stretch anticipation
                effect and backdrop blur!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
              <button
                key={pos}
                onClick={() => openDialogDemo(pos)}
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
              Full-screen overlays with Zustand-powered state management.
              Features loading control and can trigger nested Dialogs!
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p className="text-sm text-purple-800 dark:text-purple-300">
                ✨ <strong>New:</strong> Open a PageMode and click &quot;Open
                Nested Dialog&quot; to see modal stacking in action!
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

        {/* Advanced Features */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">🚀 Advanced Features</h2>
          <div className="space-y-4">
            <button
              onClick={closeAll}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
            >
              🗑️ Close All Modals
            </button>
            <p className="text-sm opacity-90">
              Useful when multiple modals are stacked. Closes all modals at
              once.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon="🏗️"
            title="Modal Stacking"
            description="Open multiple modals with automatic z-index management"
          />
          <FeatureCard
            icon="⚡"
            title="Zustand Powered"
            description="Global state with no context providers or prop drilling"
          />
          <FeatureCard
            icon="🔄"
            title="Cross-Modal Triggers"
            description="Trigger Dialog from PageMode or vice versa seamlessly"
          />
          <FeatureCard
            icon="✨"
            title="Per-Instance Loading"
            description="Each modal has independent loading state control"
          />
          <FeatureCard
            icon="🎨"
            title="All Previous Features"
            description="Backdrop blur, squash-stretch, resistance, and more"
          />
          <FeatureCard
            icon="♿"
            title="Fully Accessible"
            description="Focus trap, screen readers, keyboard navigation"
          />
        </section>

        {/* Keyboard Shortcuts */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold mb-4">⌨️ Keyboard Shortcuts</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Shortcut
              keys="ESC"
              description="Close top modal (unless locked)"
            />
            <Shortcut
              keys="Tab"
              description="Cycle through focusable elements"
            />
            <Shortcut
              keys="Shift+Tab"
              description="Reverse cycle (focus trap enabled)"
            />
            <Shortcut
              keys="Enter / Space"
              description="Click handlebar to close"
            />
            <Shortcut
              keys="Click outside"
              description="Close top modal (unless locked)"
            />
          </div>
        </section>
      </div>

      {/* Dialog Instance - still supports local state for this demo */}
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
        backdropEffects={{
          blur: true,
          blurAmount: '8px',
          scale: true,
          scaleAmount: 0.98,
          backgroundOpacity: 0.3,
        }}
        squashStretch={{
          enabled: true,
          trigger: 'start',
          intensity: 0.03,
          duration: 150,
        }}
        loadingState={{
          isLoading: dialogState.loading,
          message: 'Processing your request...',
          lockInteraction: true,
          shimmerSpeed: 'fast',
        }}
        a11yOptions={{
          generateUniqueIds: true,
          enableFocusTrap: true,
          announceToScreenReader: true,
          escapeClose: true,
          closeOnOutsideClick: true,
          scrollable: true,
        }}
      >
        <DemoContent
          title={`Dialog from ${dialogState.position}`}
          description="This is a fully functional dialog with enhanced physics and accessibility"
          showLoadingToggle={true}
          isLoading={dialogState.loading}
          onToggleLoading={toggleDialogLoading}
          showNestedDialogButton={true}
          onOpenNestedDialog={openPageModeFromDialog}
          nestedButtonLabel="🎯 Open Nested PageMode"
          nestedButtonColor="purple"
        />
      </Dialog>

      {/* Dialog Instance from Zustand Store - for nested/stacked dialogs */}
      <DialogFromStore />

      {/* PageMode Instance - uses Zustand store */}
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
        backdropEffects={{
          blur: true,
          blurAmount: '8px',
          scale: true,
          scaleAmount: 0.98,
          backgroundOpacity: 0.3,
        }}
        squashStretch={{
          enabled: true,
          trigger: 'start',
          intensity: 0.03,
          duration: 150,
        }}
        a11yOptions={{
          generateUniqueIds: true,
          enableFocusTrap: true,
          announceToScreenReader: true,
          escapeClose: true,
          closeOnOutsideClick: true,
        }}
      />
    </div>
  );
}

// Helper Components
function DemoContent({
  title,
  description,
  showLoadingToggle = false,
  isLoading = false,
  onToggleLoading,
  showNestedDialogButton = false,
  onOpenNestedDialog,
  nestedButtonLabel = '🎯 Open Nested Dialog',
  nestedButtonColor = 'green',
}: {
  title: string;
  description: string;
  showLoadingToggle?: boolean;
  isLoading?: boolean;
  onToggleLoading?: () => void;
  showNestedDialogButton?: boolean;
  onOpenNestedDialog?: () => void;
  nestedButtonLabel?: string;
  nestedButtonColor?: 'green' | 'purple' | 'blue';
}) {
  const colorClasses = {
    green:
      'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 bg-green-500 hover:bg-green-600',
    purple:
      'bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 bg-purple-500 hover:bg-purple-600',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 bg-blue-500 hover:bg-blue-600',
  };

  const [bgColor, textColor, btnBg, btnHover] =
    colorClasses[nestedButtonColor].split(' ');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      {showLoadingToggle && onToggleLoading && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <button
            onClick={onToggleLoading}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
          >
            {isLoading ? '🔓 Unlock (Stop Loading)' : '🔒 Lock (Start Loading)'}
          </button>
          <p className="text-sm text-yellow-800 dark:text-yellow-400 mt-2">
            {isLoading
              ? "Try dragging the handlebar or clicking outside - it's locked!"
              : 'Click to test loading state with shimmer effect'}
          </p>
        </div>
      )}

      {showNestedDialogButton && onOpenNestedDialog && (
        <div className={`${bgColor} p-4 rounded-lg`}>
          <button
            onClick={onOpenNestedDialog}
            className={`px-4 py-2 ${btnBg} ${btnHover} text-white rounded-lg transition-colors`}
          >
            {nestedButtonLabel}
          </button>
          <p className={`text-sm ${textColor} mt-2`}>
            Demonstrates modal stacking - opens on top of this modal!
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-300">
            ✨ Enhanced Interactions
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
            <li>• Backdrop blur and scale for visual depth</li>
            <li>• Squash-and-stretch anticipation on drag start</li>
            <li>• Drag handlebar toward close direction</li>
            <li>• Drag away to feel resistance feedback</li>
            <li>• Fast swipe to close instantly</li>
            <li>• Click/tap handlebar to close</li>
            <li>• Focus trap keeps Tab navigation within modal</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-purple-900 dark:text-purple-300">
            🎯 Zustand Store Features
          </h3>
          <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-400">
            <li>• Global state without Context providers</li>
            <li>• Modal stacking with auto z-index</li>
            <li>• Per-instance loading control</li>
            <li>• Trigger modals from anywhere</li>
            <li>• Close all modals with one call</li>
            <li>• Clean, performant API</li>
          </ul>
        </div>

        {/* Sample content for scrolling */}
        {Array.from({ length: 5 }).map((_, i) => (
          <p key={i} className="text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
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

// src/app/playground/modal/components/demo.tsx
