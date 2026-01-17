// src/app/playground/long-press-reveal/page.tsx
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Text } from '@/components/Typography';
import { HeadlineBlock } from '../headline/components';
import {
  LongPressReveal,
  useLongPressReveal,
  RevealOverlay,
  ProgressRing,
  QuickAction,
  QuickActionsBar,
} from './components';
import { useToast, ToastContainer } from '../toast/components';
import {
  FiMoreHorizontal,
  FiEdit3,
  FiTrash2,
  FiCopy,
  FiShare2,
  FiStar,
  FiArchive,
  FiBookmark,
  FiHeart,
  FiCheck,
  FiX,
  FiDownload,
  FiSend,
  FiFlag,
  FiRefreshCw,
} from 'react-icons/fi';

/**
 * Demo Section Component
 */
function DemoSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <Text fontWeight="semibold" color="primary" className="text-base">
          {title}
        </Text>
        {description && (
          <Text color="secondary" className="text-sm mt-1">
            {description}
          </Text>
        )}
      </div>
      {children}
    </div>
  );
}

/**
 * Sample list item for demos
 */
function ListItem({
  title,
  subtitle,
  className,
  style,
}: {
  title: string;
  subtitle: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4',
        'bg-white dark:bg-gray-900 rounded-xl',
        'border border-gray-200 dark:border-gray-800',
        'select-none cursor-default',
        className,
      )}
      style={style}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
        {title.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <Text fontWeight="medium" color="primary" className="truncate">
          {title}
        </Text>
        <Text color="secondary" className="text-sm truncate">
          {subtitle}
        </Text>
      </div>
      <FiMoreHorizontal className="w-5 h-5 text-gray-400" />
    </div>
  );
}

/**
 * Basic hook usage demo
 */
function BasicHookDemo() {
  const { toast } = useToast();
  const [revealedId, setRevealedId] = useState<string | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const { stage, progress, isRevealed, pressProps, pressTransform, dismiss } =
    useLongPressReveal({
      onReveal: () => {
        setRevealedId('basic');
        toast({
          message: 'Quick actions revealed',
          variant: 'info',
          duration: 2000,
        });
      },
      onDismiss: () => setRevealedId(null),
      onCancel: () =>
        toast({
          message: 'Long-press cancelled',
          variant: 'warning',
          duration: 2000,
        }),
    });

  const handleAction = useCallback(
    (action: string) => {
      toast({ message: `${action} action triggered`, variant: 'success' });
      dismiss();
    },
    [toast, dismiss],
  );

  return (
    <div className="relative">
      <div
        ref={itemRef}
        {...pressProps}
        style={{ transform: pressTransform }}
        className="transition-transform"
      >
        <ListItem
          title="John Appleseed"
          subtitle="Hey! Are you free for coffee tomorrow?"
          className={cn(
            stage !== 'idle' && 'ring-2 ring-blue-500/50',
            isRevealed && 'opacity-90',
          )}
        />
      </div>

      {/* Progress indicator */}
      <AnimatePresence>
        {stage !== 'idle' && stage !== 'revealed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-2 -right-2 z-10"
          >
            <ProgressRing
              progress={progress}
              size={32}
              strokeWidth={3}
              color="#3b82f6"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed actions */}
      <RevealOverlay
        isVisible={isRevealed}
        onDismiss={dismiss}
        anchorRef={itemRef}
        direction="up"
        variant="actions"
      >
        <QuickActionsBar>
          <QuickAction
            icon={<FiEdit3 className="w-5 h-5" />}
            label="Edit"
            onClick={() => handleAction('Edit')}
          />
          <QuickAction
            icon={<FiCopy className="w-5 h-5" />}
            label="Copy"
            onClick={() => handleAction('Copy')}
          />
          <QuickAction
            icon={<FiStar className="w-5 h-5" />}
            label="Star"
            variant="primary"
            onClick={() => handleAction('Star')}
          />
          <QuickAction
            icon={<FiTrash2 className="w-5 h-5" />}
            label="Delete"
            variant="destructive"
            onClick={() => handleAction('Delete')}
          />
        </QuickActionsBar>
      </RevealOverlay>

      {/* Stage indicator */}
      <div className="mt-3 flex items-center gap-2">
        <Text color="secondary" className="text-xs">
          Stage: <span className="font-mono text-blue-500">{stage}</span>
        </Text>
        <Text color="secondary" className="text-xs">
          Progress:{' '}
          <span className="font-mono">{(progress * 100).toFixed(0)}%</span>
        </Text>
      </div>
    </div>
  );
}

/**
 * Inline actions reveal demo
 */
function InlineActionsDemo() {
  const { toast } = useToast();

  const handleAction = useCallback(
    (action: string) => {
      toast({ message: `${action} completed`, variant: 'success' });
    },
    [toast],
  );

  return (
    <LongPressReveal
      onReveal={() =>
        toast({ message: 'Actions revealed', variant: 'info', duration: 1500 })
      }
      threshold={400}
    >
      {({
        stage,
        progress,
        pressProps,
        isRevealed,
        dismiss,
        pressTransform,
      }) => (
        <div className="relative overflow-hidden rounded-xl">
          <motion.div
            {...pressProps}
            style={{ transform: pressTransform }}
            className={cn(
              'flex items-center gap-4 p-4',
              'bg-white dark:bg-gray-900',
              'border border-gray-200 dark:border-gray-800',
              'select-none cursor-default',
              'transition-transform',
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <FiBookmark className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <Text fontWeight="medium" color="primary">
                Design System Reference
              </Text>
              <Text color="secondary" className="text-sm">
                Saved 3 days ago
              </Text>
            </div>

            {/* Inline quick actions that slide in */}
            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-1"
                >
                  <QuickAction
                    icon={<FiShare2 className="w-4 h-4" />}
                    label="Share"
                    onClick={() => {
                      handleAction('Share');
                      dismiss();
                    }}
                  />
                  <QuickAction
                    icon={<FiTrash2 className="w-4 h-4" />}
                    label="Delete"
                    variant="destructive"
                    onClick={() => {
                      handleAction('Delete');
                      dismiss();
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress indicator overlaid */}
            {stage !== 'idle' && stage !== 'revealed' && (
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl pointer-events-none">
                <div
                  className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full transition-all duration-75"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            )}
          </motion.div>
        </div>
      )}
    </LongPressReveal>
  );
}

/**
 * Card with preview reveal demo
 */
function CardPreviewDemo() {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <LongPressReveal
      onReveal={() =>
        toast({ message: 'Preview expanded', variant: 'info', duration: 1500 })
      }
      onPreview={() =>
        toast({
          message: 'Preview hint shown',
          variant: 'info',
          duration: 1000,
        })
      }
      threshold={600}
      previewDelay={250}
      readyDelay={450}
    >
      {({
        stage,
        progress,
        pressProps,
        isRevealed,
        dismiss,
        pressTransform,
      }) => (
        <div className="relative">
          <motion.div
            ref={cardRef}
            {...pressProps}
            style={{ transform: pressTransform }}
            className={cn(
              'overflow-hidden rounded-2xl',
              'bg-white dark:bg-gray-900',
              'border border-gray-200 dark:border-gray-800',
              'select-none cursor-default',
              'transition-all duration-200',
              stage === 'preview' && 'shadow-lg',
              stage === 'ready' && 'shadow-xl',
              isRevealed && 'shadow-2xl ring-2 ring-blue-500/30',
            )}
          >
            {/* Image */}
            <div className="relative aspect-video bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
              <div className="absolute inset-0 flex items-center justify-center text-white/80">
                <span className="text-6xl">🎨</span>
              </div>

              {/* Stage badge */}
              <AnimatePresence>
                {stage !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className={cn(
                      'absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium',
                      stage === 'pressing' && 'bg-white/20 text-white',
                      stage === 'preview' && 'bg-yellow-500 text-white',
                      stage === 'ready' && 'bg-blue-500 text-white',
                      stage === 'revealed' && 'bg-emerald-500 text-white',
                    )}
                  >
                    {stage}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content */}
            <div className="p-4">
              <Text fontWeight="semibold" color="primary">
                Creative Portfolio
              </Text>
              <Text color="secondary" className="text-sm mt-1">
                A collection of design work from 2024
              </Text>
            </div>

            {/* Progress bar */}
            {stage !== 'idle' && stage !== 'revealed' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                <motion.div
                  className="h-full bg-blue-500"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            )}
          </motion.div>

          {/* Expanded preview */}
          <RevealOverlay
            isVisible={isRevealed}
            onDismiss={dismiss}
            anchorRef={cardRef}
            direction="center"
            variant="preview"
          >
            <div className="w-72 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />
                <div>
                  <Text fontWeight="medium" color="primary" className="text-sm">
                    Creative Portfolio
                  </Text>
                  <Text color="secondary" className="text-xs">
                    Updated yesterday
                  </Text>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <Text color="secondary" className="text-xs">
                  12 items
                </Text>
                <button
                  onClick={dismiss}
                  className="text-xs text-blue-500 hover:text-blue-600"
                >
                  View all
                </button>
              </div>
            </div>
          </RevealOverlay>
        </div>
      )}
    </LongPressReveal>
  );
}

/**
 * Message bubble with reactions demo
 */
function MessageReactionsDemo() {
  const { toast } = useToast();
  const [reaction, setReaction] = useState<string | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const reactions = ['❤️', '👍', '😂', '😮', '😢', '🎉'];

  return (
    <LongPressReveal onReveal={() => {}} threshold={350}>
      {({ stage, progress, pressProps, isRevealed, dismiss }) => (
        <div className="flex justify-end">
          <div className="relative max-w-xs">
            <motion.div
              ref={messageRef}
              {...pressProps}
              animate={{
                scale: stage === 'idle' ? 1 : 1 - progress * 0.03,
              }}
              className={cn(
                'px-4 py-3 rounded-2xl rounded-br-md',
                'bg-blue-500 text-white',
                'select-none cursor-default',
                stage !== 'idle' && 'ring-2 ring-blue-300',
              )}
            >
              <Text className="text-sm text-white">
                Hey! Check out this new long-press reveal component. Pretty cool
                right? 🚀
              </Text>
              <Text className="text-xs text-blue-200 mt-1 text-right">
                12:34 PM
              </Text>

              {/* Show existing reaction */}
              {reaction && (
                <div className="absolute -bottom-3 -left-2 bg-white dark:bg-gray-800 rounded-full px-1.5 py-0.5 shadow-md border border-gray-200 dark:border-gray-700">
                  <span className="text-sm">{reaction}</span>
                </div>
              )}
            </motion.div>

            {/* Reaction picker */}
            <RevealOverlay
              isVisible={isRevealed}
              onDismiss={dismiss}
              anchorRef={messageRef}
              direction="up"
              variant="actions"
            >
              <div className="flex items-center gap-1 p-2 bg-white dark:bg-gray-900 rounded-full shadow-xl border border-gray-200 dark:border-gray-700">
                {reactions.map((emoji) => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setReaction(emoji);
                      toast({
                        message: `Reacted with ${emoji}`,
                        variant: 'success',
                      });
                      dismiss();
                    }}
                    className="w-9 h-9 flex items-center justify-center text-xl hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </RevealOverlay>
          </div>
        </div>
      )}
    </LongPressReveal>
  );
}

/**
 * File item with context menu demo
 */
function FileContextMenuDemo() {
  const { toast } = useToast();
  const fileRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    {
      icon: <FiDownload className="w-4 h-4" />,
      label: 'Download',
      action: 'Download',
    },
    { icon: <FiShare2 className="w-4 h-4" />, label: 'Share', action: 'Share' },
    {
      icon: <FiEdit3 className="w-4 h-4" />,
      label: 'Rename',
      action: 'Rename',
    },
    {
      icon: <FiCopy className="w-4 h-4" />,
      label: 'Duplicate',
      action: 'Duplicate',
    },
    { divider: true },
    {
      icon: <FiArchive className="w-4 h-4" />,
      label: 'Archive',
      action: 'Archive',
    },
    {
      icon: <FiTrash2 className="w-4 h-4" />,
      label: 'Delete',
      action: 'Delete',
      destructive: true,
    },
  ];

  return (
    <LongPressReveal
      onReveal={() =>
        toast({
          message: 'Context menu opened',
          variant: 'info',
          duration: 1500,
        })
      }
      threshold={500}
    >
      {({
        stage,
        progress,
        pressProps,
        isRevealed,
        dismiss,
        pressTransform,
      }) => (
        <div className="relative">
          <motion.div
            ref={fileRef}
            {...pressProps}
            style={{ transform: pressTransform }}
            className={cn(
              'flex items-center gap-3 p-3',
              'bg-white dark:bg-gray-900 rounded-xl',
              'border border-gray-200 dark:border-gray-800',
              'select-none cursor-default',
              'transition-all',
              stage !== 'idle' && 'ring-2 ring-blue-500/30 shadow-lg',
            )}
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <Text
                fontWeight="medium"
                color="primary"
                className="text-sm truncate"
              >
                Design_System_v2.sketch
              </Text>
              <Text color="secondary" className="text-xs">
                24.5 MB • Modified 2 hours ago
              </Text>
            </div>

            {/* Progress ring */}
            {stage !== 'idle' && stage !== 'revealed' && (
              <ProgressRing
                progress={progress}
                size={28}
                strokeWidth={2}
                color="#3b82f6"
              />
            )}
          </motion.div>

          {/* Context menu */}
          <RevealOverlay
            isVisible={isRevealed}
            onDismiss={dismiss}
            anchorRef={fileRef}
            direction="down"
            variant="menu"
          >
            <div className="w-48 py-1">
              {menuItems.map((item, idx) =>
                'divider' in item ? (
                  <div
                    key={idx}
                    className="my-1 border-t border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <button
                    key={item.label}
                    onClick={() => {
                      toast({
                        message: `${item.action} triggered`,
                        variant: item.destructive ? 'error' : 'success',
                      });
                      dismiss();
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 text-sm',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'transition-colors',
                      item.destructive
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-700 dark:text-gray-300',
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ),
              )}
            </div>
          </RevealOverlay>
        </div>
      )}
    </LongPressReveal>
  );
}

/**
 * Long-press Reveal Playground Page
 */
export default function LongPressRevealPlayground() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Toast Container */}
        <ToastContainer position="bottom-right" />

        {/* Header */}
        <HeadlineBlock
          headline="Long-press Reveal"
          subheadline="Progressive reveal interactions with haptic feedback stages. Supports hook-based and headless component patterns for maximum flexibility."
          align="left"
          className="mb-12"
        />

        <div className="space-y-12">
          {/* Basic Hook Usage */}
          <DemoSection
            title="Hook-based Usage"
            description="Direct use of useLongPressReveal hook for full control"
          >
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <BasicHookDemo />
            </div>
          </DemoSection>

          {/* Inline Actions */}
          <DemoSection
            title="Inline Actions"
            description="Actions that slide in within the item itself"
          >
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <InlineActionsDemo />
            </div>
          </DemoSection>

          {/* Card Preview */}
          <DemoSection
            title="Card Preview"
            description="Expanded preview with visual feedback at each stage"
          >
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <CardPreviewDemo />
            </div>
          </DemoSection>

          {/* Message Reactions */}
          <DemoSection
            title="Message Reactions"
            description="iMessage-style reaction picker on long-press"
          >
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <MessageReactionsDemo />
            </div>
          </DemoSection>

          {/* File Context Menu */}
          <DemoSection
            title="File Context Menu"
            description="macOS-style context menu with long-press trigger"
          >
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <FileContextMenuDemo />
            </div>
          </DemoSection>

          {/* Features List */}
          <DemoSection title="Features">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Progressive stages:</strong> idle → pressing →
                    preview → ready → revealed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Haptic feedback:</strong> Vibration at preview,
                    ready, and reveal stages
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Visual feedback:</strong> Scale, opacity, and blur
                    effects during press
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Movement cancellation:</strong> Configurable
                    tolerance for accidental moves
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Keyboard support:</strong> Hold Enter/Space as
                    alternative to long-press
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Hook + headless patterns:</strong> Use hook directly
                    or render props component
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Portal support:</strong> RevealPortal for proper
                    z-index management
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Pre-built components:</strong> QuickAction,
                    QuickActionsBar, ProgressRing
                  </span>
                </li>
              </ul>
            </div>
          </DemoSection>

          {/* Usage hint */}
          <div className="text-center py-4">
            <Text color="secondary" className="text-sm">
              Long-press (or hold Enter/Space) on any item above to reveal
              actions
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
