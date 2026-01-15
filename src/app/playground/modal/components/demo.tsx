'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  FiBook,
  FiLayers,
  FiZap,
  FiRefreshCw,
  FiTarget,
  FiCommand,
  FiLoader,
  FiMousePointer,
  FiCheck,
  FiX,
  FiChevronRight,
  FiMonitor,
  FiSmartphone,
  FiArrowUp,
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiLock,
  FiUnlock,
  FiMaximize2,
} from 'react-icons/fi';
import type { DialogSizingConfig } from './shared/types';
import { Dialog } from './Dialog';
import { PageMode } from './PageMode';
import { usePageMode, useModals, useDialog } from './stores/useModalStore';
import {
  Heading,
  Text,
  Paragraph,
  SmallText,
  Strong,
  Lead,
} from '@/components/Typography';

/**
 * Modal System Demo - Apple-inspired design
 * Clean, minimal, and professional presentation
 */

// Dialog wrapper that uses Zustand store for stacking
function DialogFromStore() {
  const store = useDialog();
  const {
    isOpen,
    content,
    close,
    showFrom,
    handlebarPosition,
    isLoading,
    loadingMessage,
  } = store;

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
      zIndex={zIndex}
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

// PageMode demo content
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
    setLoading(!isLoading, isLoading ? undefined : 'Processing request...');
  };

  const openNestedDialog = () => {
    openDialog(
      <ModalContent
        title="Nested Dialog"
        description="This dialog opened from within PageMode, demonstrating modal stacking with automatic z-index management."
      />,
      { showFrom: 'top' },
    );
  };

  return (
    <ModalContent
      title={title}
      description={description}
      showLoadingToggle={true}
      isLoading={isLoading}
      onToggleLoading={toggleLoading}
      showNestedButton={true}
      onOpenNested={openNestedDialog}
      nestedButtonLabel="Open Nested Dialog"
    />
  );
}

export default function ComponentDemo() {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    position: 'top' | 'bottom' | 'left' | 'right';
    loading: boolean;
    sizing?: DialogSizingConfig;
  }>({
    isOpen: false,
    position: 'top',
    loading: false,
    sizing: undefined,
  });

  const { openPageMode, closeAll } = useModals();

  const openDialogDemo = (position: 'top' | 'bottom' | 'left' | 'right') => {
    setDialogState({
      isOpen: true,
      position,
      loading: false,
      sizing: undefined,
    });
  };

  const openDialogWithSizing = (sizing: DialogSizingConfig) => {
    setDialogState({ isOpen: true, position: 'top', loading: false, sizing });
  };

  const closeDialog = () => {
    setDialogState({ ...dialogState, isOpen: false });
  };

  const toggleDialogLoading = () => {
    setDialogState({ ...dialogState, loading: !dialogState.loading });
  };

  const openPageModeFromDialog = () => {
    openPageMode(
      <ModalContent
        title="Nested PageMode"
        description="This PageMode opened from within a Dialog, demonstrating reverse modal stacking."
      />,
      { position: 'bottom', size: 'large' },
    );
  };

  const openPageModeDemo = (
    position: 'top' | 'bottom' | 'left' | 'right',
    size: 'small' | 'medium' | 'large' | 'full' = 'large',
  ) => {
    openPageMode(
      <PageModeDemoContent
        title={`PageMode — ${position.charAt(0).toUpperCase() + position.slice(1)}`}
        description="Drag the handlebar to close or press Escape. Use the controls below to explore features."
      />,
      { position, size },
    );
  };

  const positionIcons = {
    top: FiArrowDown,
    bottom: FiArrowUp,
    left: FiArrowRight,
    right: FiArrowLeft,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full">
              <FiLayers
                className="text-blue-600 dark:text-blue-400"
                size={14}
              />
              <SmallText className="text-blue-600 dark:text-blue-400 font-medium">
                Modal System
              </SmallText>
            </div>
            <Heading level={1} size="xl" className="tracking-tight">
              Dialog & PageMode
            </Heading>
            <Paragraph className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              A comprehensive modal system with gesture-based dismissal,
              physics-enhanced animations, and Zustand-powered state management.
              Built for accessibility and seamless user experiences.
            </Paragraph>
            <div className="flex justify-center gap-3 pt-4">
              <NextLink
                href="/playground/modal/docs"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                <FiBook size={16} />
                Documentation
              </NextLink>
              <button
                onClick={closeAll}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FiX size={16} />
                Close All Modals
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Features Grid */}
        <section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              icon={FiLayers}
              title="Modal Stacking"
              description="Automatic z-index management for nested modals"
            />
            <FeatureCard
              icon={FiZap}
              title="Zustand Store"
              description="Global state without context providers"
            />
            <FeatureCard
              icon={FiRefreshCw}
              title="Cross-Modal"
              description="Trigger any modal from anywhere"
            />
            <FeatureCard
              icon={FiTarget}
              title="Accessible"
              description="Focus trap, ARIA, keyboard navigation"
            />
          </div>
        </section>

        {/* Dialog Section */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FiMonitor
                  className="text-blue-600 dark:text-blue-400"
                  size={20}
                />
              </div>
              <Heading level={2} size="lg">
                Dialog
              </Heading>
            </div>
            <Paragraph className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Centered modal dialogs with gesture-based dismissal. Drag the
              handlebar to close, or tap outside. Notice the subtle backdrop
              blur and physics-based animations.
            </Paragraph>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
            <div>
              <Text fontWeight="bold" className="mb-4">
                Open from direction
              </Text>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['top', 'bottom', 'left', 'right'] as const).map((pos) => {
                  const Icon = positionIcons[pos];
                  return (
                    <button
                      key={pos}
                      onClick={() => openDialogDemo(pos)}
                      className="group flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Icon
                        size={16}
                        className="text-gray-400 group-hover:text-blue-500 transition-colors"
                      />
                      {pos.charAt(0).toUpperCase() + pos.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content-Adaptive Sizing */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FiMaximize2 size={16} className="text-blue-500" />
                <Text fontWeight="bold">Content-adaptive sizing</Text>
              </div>
              <SmallText className="text-gray-500 dark:text-gray-500 mb-4 block">
                Dialog width adapts to content with preset constraints. Try each
                to see the difference.
              </SmallText>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(
                  [
                    { preset: 'narrow', label: 'Narrow', desc: '400px' },
                    { preset: 'default', label: 'Default', desc: '600px' },
                    { preset: 'wide', label: 'Wide', desc: '800px' },
                    {
                      preset: 'extraWide',
                      label: 'Extra Wide',
                      desc: '1200px',
                    },
                  ] as const
                ).map(({ preset, label, desc }) => (
                  <button
                    key={preset}
                    onClick={() => openDialogWithSizing({ preset })}
                    className="group flex flex-col items-center justify-center gap-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>{label}</span>
                    <span className="text-xs text-gray-400 group-hover:text-blue-400">
                      max {desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PageMode Section */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <FiSmartphone
                  className="text-purple-600 dark:text-purple-400"
                  size={20}
                />
              </div>
              <Heading level={2} size="lg">
                PageMode
              </Heading>
            </div>
            <Paragraph className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Full-screen overlay panels that slide in from any edge. Supports
              multiple size variants and can trigger nested dialogs for modal
              stacking.
            </Paragraph>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
            {/* Positions */}
            <div>
              <Text fontWeight="bold" className="mb-4">
                Position
              </Text>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['top', 'bottom', 'left', 'right'] as const).map((pos) => {
                  const Icon = positionIcons[pos];
                  return (
                    <button
                      key={pos}
                      onClick={() => openPageModeDemo(pos)}
                      className="group flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <Icon
                        size={16}
                        className="text-gray-400 group-hover:text-purple-500 transition-colors"
                      />
                      {pos.charAt(0).toUpperCase() + pos.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Variants */}
            <div>
              <Text fontWeight="bold" className="mb-4">
                Size variants (from bottom)
              </Text>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['small', 'medium', 'large', 'full'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => openPageModeDemo('bottom', size)}
                    className="px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <FiCommand
                className="text-gray-600 dark:text-gray-400"
                size={20}
              />
            </div>
            <Heading level={2} size="lg">
              Keyboard Shortcuts
            </Heading>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              <ShortcutRow
                keys={['Esc']}
                description="Close the top modal (unless loading)"
              />
              <ShortcutRow
                keys={['Tab']}
                description="Navigate through focusable elements"
              />
              <ShortcutRow
                keys={['Shift', 'Tab']}
                description="Navigate backwards (focus trapped)"
              />
              <ShortcutRow
                keys={['Enter']}
                description="Activate handlebar to close"
              />
            </div>
          </div>
        </section>

        {/* Interactions */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <FiMousePointer
                className="text-gray-600 dark:text-gray-400"
                size={20}
              />
            </div>
            <Heading level={2} size="lg">
              Interactions
            </Heading>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <InteractionCard
              title="Drag to close"
              description="Drag the handlebar in the close direction to dismiss"
            />
            <InteractionCard
              title="Resistance feedback"
              description="Drag away from close direction to feel resistance"
            />
            <InteractionCard
              title="Backdrop blur"
              description="Background content blurs and scales for depth"
            />
            <InteractionCard
              title="Squash & stretch"
              description="Subtle anticipation animation on drag start"
            />
          </div>
        </section>
      </main>

      {/* Dialog Instance */}
      <Dialog
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        showFrom={dialogState.position}
        handlebarPosition={dialogState.position}
        sizing={dialogState.sizing}
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
        <ModalContent
          title={
            dialogState.sizing?.preset
              ? `Dialog — ${dialogState.sizing.preset.charAt(0).toUpperCase() + dialogState.sizing.preset.slice(1)} Size`
              : `Dialog — ${dialogState.position.charAt(0).toUpperCase() + dialogState.position.slice(1)}`
          }
          description={
            dialogState.sizing?.preset
              ? `Content-adaptive dialog using the "${dialogState.sizing.preset}" preset. The width adjusts to content up to the maximum constraint.`
              : 'A fully functional dialog with enhanced physics and accessibility features.'
          }
          showLoadingToggle={true}
          isLoading={dialogState.loading}
          onToggleLoading={toggleDialogLoading}
          showNestedButton={true}
          onOpenNested={openPageModeFromDialog}
          nestedButtonLabel="Open Nested PageMode"
        />
      </Dialog>

      <DialogFromStore />

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

// Clean modal content component
function ModalContent({
  title,
  description,
  showLoadingToggle = false,
  isLoading = false,
  onToggleLoading,
  showNestedButton = false,
  onOpenNested,
  nestedButtonLabel = 'Open Nested Modal',
}: {
  title: string;
  description: string;
  showLoadingToggle?: boolean;
  isLoading?: boolean;
  onToggleLoading?: () => void;
  showNestedButton?: boolean;
  onOpenNested?: () => void;
  nestedButtonLabel?: string;
}) {
  return (
    <div className="space-y-6">
      <div>
        <Heading level={2} size="lg" className="mb-2">
          {title}
        </Heading>
        <Paragraph className="text-gray-600 dark:text-gray-400">
          {description}
        </Paragraph>
      </div>

      {(showLoadingToggle || showNestedButton) && (
        <div className="flex flex-wrap gap-3">
          {showLoadingToggle && onToggleLoading && (
            <button
              onClick={onToggleLoading}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isLoading
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {isLoading ? <FiUnlock size={16} /> : <FiLock size={16} />}
              {isLoading ? 'Unlock' : 'Lock Modal'}
            </button>
          )}
          {showNestedButton && onOpenNested && (
            <button
              onClick={onOpenNested}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              <FiLayers size={16} />
              {nestedButtonLabel}
            </button>
          )}
        </div>
      )}

      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-3">
          <Text fontWeight="bold">Interactions</Text>
          <ul className="space-y-2">
            {[
              'Drag the handlebar toward the edge to close',
              'Drag away to feel resistance feedback',
              'Click outside the modal to dismiss',
              'Press Escape to close',
              'Focus is trapped within the modal',
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <FiChevronRight
                  size={16}
                  className="text-gray-400 mt-0.5 flex-shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sample content for scrolling */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        {Array.from({ length: 3 }).map((_, i) => (
          <Paragraph key={i} className="text-gray-500 dark:text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Paragraph>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 space-y-3">
      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Icon size={20} className="text-gray-600 dark:text-gray-400" />
      </div>
      <div>
        <Text fontWeight="bold" className="mb-1">
          {title}
        </Text>
        <SmallText className="text-gray-500 dark:text-gray-500">
          {description}
        </SmallText>
      </div>
    </div>
  );
}

function ShortcutRow({
  keys,
  description,
}: {
  keys: string[];
  description: string;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-1.5">
        {keys.map((key, i) => (
          <React.Fragment key={key}>
            <kbd className="px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
              {key}
            </kbd>
            {i < keys.length - 1 && (
              <span className="text-gray-400 text-xs">+</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <SmallText className="text-gray-500 dark:text-gray-500">
        {description}
      </SmallText>
    </div>
  );
}

function InteractionCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <Text fontWeight="bold" className="mb-1">
        {title}
      </Text>
      <SmallText className="text-gray-500 dark:text-gray-500">
        {description}
      </SmallText>
    </div>
  );
}
