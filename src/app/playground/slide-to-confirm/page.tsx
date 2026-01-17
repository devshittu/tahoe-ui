// src/app/playground/slide-to-confirm/page.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '@/components/Typography';
import { HeadlineBlock } from '../headline/components';
import { SlideToConfirm } from './components';
import { useToast, ToastContainer } from '../toast/components';
import {
  FiTrash2,
  FiSend,
  FiCheck,
  FiPower,
  FiLogOut,
  FiCreditCard,
  FiUnlock,
  FiShield,
  FiArchive,
  FiAlertTriangle,
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
 * Slide-to-Confirm Playground Page
 */
export default function SlideToConfirmPlayground() {
  const { toast } = useToast();

  // Loading states for async demos
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Simulate async action with toast
  const simulateAsync = (
    message: string,
    variant: 'success' | 'info' | 'warning' | 'error' = 'success',
    duration = 1500,
  ) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast({
          message,
          variant,
          duration: 4000,
        });
        resolve();
      }, duration);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Toast Container */}
        <ToastContainer position="bottom-right" />

        {/* Header */}
        <HeadlineBlock
          headline="Slide to Confirm"
          subheadline="iOS-style swipe confirmation for critical actions. Features spring physics, velocity detection, haptic feedback, and reduced motion support."
          align="left"
          className="mb-12"
        />

        <div className="space-y-12">
          {/* Basic Variants */}
          <DemoSection
            title="Variants"
            description="Three visual styles for different action types"
          >
            <div className="space-y-4">
              <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-6">
                {/* Default */}
                <div className="space-y-2">
                  <Text color="secondary" className="text-sm">
                    Default
                  </Text>
                  <SlideToConfirm
                    label="Slide to confirm"
                    onConfirm={() =>
                      simulateAsync('Action confirmed', 'success')
                    }
                  />
                </div>

                {/* Destructive */}
                <div className="space-y-2">
                  <Text color="secondary" className="text-sm">
                    Destructive
                  </Text>
                  <SlideToConfirm
                    label="Slide to delete"
                    confirmLabel="Deleted"
                    variant="destructive"
                    onConfirm={() => simulateAsync('Item deleted', 'error')}
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </SlideToConfirm>
                </div>

                {/* Success */}
                <div className="space-y-2">
                  <Text color="secondary" className="text-sm">
                    Success
                  </Text>
                  <SlideToConfirm
                    label="Slide to send"
                    confirmLabel="Sent!"
                    variant="success"
                    onConfirm={() => simulateAsync('Message sent', 'success')}
                  >
                    <FiSend className="w-5 h-5" />
                  </SlideToConfirm>
                </div>
              </div>
            </div>
          </DemoSection>

          {/* Use Cases */}
          <DemoSection
            title="Common Use Cases"
            description="Real-world examples of slide-to-confirm interactions"
          >
            <div className="space-y-4">
              {/* Delete Account */}
              <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
                    <FiAlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <Text fontWeight="semibold" color="primary">
                      Delete Account
                    </Text>
                    <Text color="secondary" className="text-sm">
                      This action cannot be undone. All your data will be
                      permanently removed.
                    </Text>
                  </div>
                </div>
                <SlideToConfirm
                  label="Slide to delete account"
                  confirmLabel="Account deleted"
                  variant="destructive"
                  isLoading={deleteLoading}
                  onConfirm={async () => {
                    setDeleteLoading(true);
                    await simulateAsync(
                      'Account deletion initiated',
                      'error',
                      2000,
                    );
                    setDeleteLoading(false);
                  }}
                >
                  <FiTrash2 className="w-5 h-5" />
                </SlideToConfirm>
              </div>

              {/* Payment Confirmation */}
              <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
                    <FiCreditCard className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <Text fontWeight="semibold" color="primary">
                      Confirm Payment
                    </Text>
                    <Text color="secondary" className="text-sm">
                      Pay $99.00 to Acme Corp for Premium Subscription
                    </Text>
                  </div>
                </div>
                <SlideToConfirm
                  label="Slide to pay $99.00"
                  confirmLabel="Payment complete"
                  variant="success"
                  isLoading={paymentLoading}
                  onConfirm={async () => {
                    setPaymentLoading(true);
                    await simulateAsync(
                      'Payment processed successfully',
                      'success',
                      2000,
                    );
                    setPaymentLoading(false);
                  }}
                >
                  <FiCreditCard className="w-5 h-5" />
                </SlideToConfirm>
              </div>

              {/* Power Off */}
              <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <FiPower className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <Text fontWeight="semibold" color="primary">
                      Power Off Device
                    </Text>
                    <Text color="secondary" className="text-sm">
                      Your device will shut down. Unsaved work may be lost.
                    </Text>
                  </div>
                </div>
                <SlideToConfirm
                  label="Slide to power off"
                  confirmLabel="Powering off..."
                  onConfirm={() => simulateAsync('Device powering off', 'info')}
                >
                  <FiPower className="w-5 h-5" />
                </SlideToConfirm>
              </div>
            </div>
          </DemoSection>

          {/* Sizes */}
          <DemoSection
            title="Custom Sizes"
            description="Adjust height and border radius for different contexts"
          >
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-6">
              {/* Compact */}
              <div className="space-y-2">
                <Text color="secondary" className="text-sm">
                  Compact (44px)
                </Text>
                <SlideToConfirm
                  label="Slide to unlock"
                  confirmLabel="Unlocked"
                  height={44}
                  borderRadius={22}
                  onConfirm={() => simulateAsync('Unlocked', 'success')}
                >
                  <FiUnlock className="w-4 h-4" />
                </SlideToConfirm>
              </div>

              {/* Default */}
              <div className="space-y-2">
                <Text color="secondary" className="text-sm">
                  Default (56px)
                </Text>
                <SlideToConfirm
                  label="Slide to confirm"
                  onConfirm={() => simulateAsync('Confirmed', 'success')}
                />
              </div>

              {/* Large */}
              <div className="space-y-2">
                <Text color="secondary" className="text-sm">
                  Large (72px)
                </Text>
                <SlideToConfirm
                  label="Slide to archive"
                  confirmLabel="Archived"
                  height={72}
                  borderRadius={36}
                  variant="success"
                  onConfirm={() => simulateAsync('Archived', 'success')}
                >
                  <FiArchive className="w-6 h-6" />
                </SlideToConfirm>
              </div>

              {/* Squared */}
              <div className="space-y-2">
                <Text color="secondary" className="text-sm">
                  Squared corners (12px radius)
                </Text>
                <SlideToConfirm
                  label="Slide to enable"
                  confirmLabel="Enabled"
                  borderRadius={12}
                  variant="success"
                  onConfirm={() => simulateAsync('Feature enabled', 'success')}
                >
                  <FiShield className="w-5 h-5" />
                </SlideToConfirm>
              </div>
            </div>
          </DemoSection>

          {/* Custom Width */}
          <DemoSection
            title="Custom Width"
            description="Fixed widths for specific layouts"
          >
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-6">
              <div className="space-y-2">
                <Text color="secondary" className="text-sm">
                  280px width
                </Text>
                <SlideToConfirm
                  label="Slide"
                  width={280}
                  onConfirm={() => simulateAsync('Confirmed (280px)', 'info')}
                />
              </div>

              <div className="space-y-2">
                <Text color="secondary" className="text-sm">
                  50% width
                </Text>
                <SlideToConfirm
                  label="Slide to confirm"
                  width="50%"
                  variant="success"
                  onConfirm={() => simulateAsync('Confirmed (50%)', 'success')}
                />
              </div>
            </div>
          </DemoSection>

          {/* Disabled State */}
          <DemoSection
            title="Disabled State"
            description="Prevent interaction when action is not available"
          >
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <SlideToConfirm
                label="Slide to confirm"
                disabled
                onConfirm={() => {}}
              />
              <Text
                color="secondary"
                className="text-sm mt-3 block text-center"
              >
                Slider is disabled - cannot interact
              </Text>
            </div>
          </DemoSection>

          {/* Threshold Variations */}
          <DemoSection
            title="Custom Thresholds"
            description="Adjust how far the user must slide to confirm"
          >
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-6">
              <div className="space-y-2">
                <Text color="secondary" className="text-sm">
                  50% threshold (easier)
                </Text>
                <SlideToConfirm
                  label="Slide halfway"
                  threshold={0.5}
                  onConfirm={() => simulateAsync('Confirmed at 50%', 'info')}
                />
              </div>

              <div className="space-y-2">
                <Text color="secondary" className="text-sm">
                  95% threshold (harder)
                </Text>
                <SlideToConfirm
                  label="Slide all the way"
                  threshold={0.95}
                  variant="destructive"
                  onConfirm={() => simulateAsync('Confirmed at 95%', 'warning')}
                >
                  <FiTrash2 className="w-5 h-5" />
                </SlideToConfirm>
              </div>
            </div>
          </DemoSection>

          {/* Without Progress Fill */}
          <DemoSection
            title="Without Progress Fill"
            description="Minimal style without the background fill"
          >
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <SlideToConfirm
                label="Slide to logout"
                confirmLabel="Logged out"
                showProgressFill={false}
                onConfirm={() => simulateAsync('Logged out', 'info')}
              >
                <FiLogOut className="w-5 h-5" />
              </SlideToConfirm>
            </div>
          </DemoSection>

          {/* Features List */}
          <DemoSection title="Features">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Framer Motion drag:</strong> Reliable gesture
                    handling with built-in drag constraints
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Spring physics:</strong> Natural snap-back animation
                    when released before threshold
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Velocity detection:</strong> Fast flicks complete
                    even with short distance
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Haptic feedback:</strong> Vibration at 50%, 85%, and
                    100% progress milestones
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Loading state:</strong> Spinner animation during
                    async operations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Reduced motion:</strong> Tap-and-hold alternative
                    for accessibility
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Elastic overscroll:</strong> Natural bounce when
                    sliding past the end
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Toast notifications:</strong> Confirmation feedback
                    via toast system
                  </span>
                </li>
              </ul>
            </div>
          </DemoSection>
        </div>
      </div>
    </div>
  );
}
