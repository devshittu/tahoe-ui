// src/app/playground/wizard/page.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '@/components/Typography';
import { HeadlineBlock } from '../headline/components';
import {
  WizardRoot,
  WizardContent,
  WizardPanel,
  WizardStepper,
  WizardNavigation,
  WizardNavigationMinimal,
  WizardNavigationSplit,
  WizardFormStep,
  WizardCardContainer,
  WizardNextTrigger,
  WizardPrevTrigger,
  WizardResetTrigger,
  WizardNav,
  useWizard,
  useWizardStep,
  type ProgressVariant,
  type WizardConfig,
  type WizardStepDefinition,
} from '@/components/Wizard';
import { Stack, Flex, Grid } from '@/components/Box';
import { Button } from '@/components/Button';
import {
  FiUser,
  FiMail,
  FiLock,
  FiCheck,
  FiSettings,
  FiBell,
  FiCreditCard,
  FiMapPin,
  FiPackage,
  FiArrowRight,
  FiArrowLeft,
  FiRefreshCw,
} from 'react-icons/fi';

// =============================================================================
// SHARED STEP COMPONENTS
// =============================================================================

function AccountStep() {
  const { data, setData, error } = useWizardStep<{
    name: string;
    email: string;
  }>('account');

  return (
    <Stack gap="4">
      <div className="space-y-2">
        <label
          htmlFor="account-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Name
        </label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            id="account-name"
            type="text"
            value={data?.name ?? ''}
            onChange={(e) =>
              setData({
                ...data,
                name: e.target.value,
                email: data?.email ?? '',
              })
            }
            placeholder="John Appleseed"
            className={cn(
              'w-full pl-10 pr-4 py-2.5 rounded-lg border bg-white dark:bg-gray-800',
              'text-gray-900 dark:text-gray-100 placeholder-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100',
              error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700',
            )}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="account-email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email Address
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            id="account-email"
            type="email"
            value={data?.email ?? ''}
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
                name: data?.name ?? '',
              })
            }
            placeholder="john@example.com"
            className={cn(
              'w-full pl-10 pr-4 py-2.5 rounded-lg border bg-white dark:bg-gray-800',
              'text-gray-900 dark:text-gray-100 placeholder-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100',
              error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700',
            )}
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </Stack>
  );
}

function SecurityStep() {
  const { data, setData } = useWizardStep<{
    password: string;
    confirmPassword: string;
  }>('security');

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack gap="4">
        <div className="space-y-2">
          <label
            htmlFor="security-password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              id="security-password"
              type="password"
              autoComplete="new-password"
              value={data?.password ?? ''}
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                  confirmPassword: data?.confirmPassword ?? '',
                })
              }
              placeholder="Enter password"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="security-confirm"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirm Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              id="security-confirm"
              type="password"
              autoComplete="new-password"
              value={data?.confirmPassword ?? ''}
              onChange={(e) =>
                setData({
                  ...data,
                  confirmPassword: e.target.value,
                  password: data?.password ?? '',
                })
              }
              placeholder="Confirm password"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
            />
          </div>
        </div>
      </Stack>
    </form>
  );
}

function PreferencesStep() {
  const { data, setData } = useWizardStep<{
    notifications: boolean;
    theme: string;
  }>('preferences');

  return (
    <Stack gap="4">
      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <FiBell className="h-5 w-5 text-gray-500" />
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Email Notifications
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive updates about your account
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            setData({
              ...data,
              notifications: !data?.notifications,
              theme: data?.theme ?? 'system',
            })
          }
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            data?.notifications
              ? 'bg-gray-900 dark:bg-gray-100'
              : 'bg-gray-200 dark:bg-gray-700',
          )}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-900 transition-transform',
              data?.notifications ? 'translate-x-6' : 'translate-x-1',
            )}
          />
        </button>
      </div>
      <div className="space-y-3">
        <span className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <FiSettings className="h-4 w-4" />
          Theme Preference
        </span>
        <div className="flex gap-2">
          {['light', 'dark', 'system'].map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() =>
                setData({
                  ...data,
                  theme,
                  notifications: data?.notifications ?? false,
                })
              }
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize',
                data?.theme === theme
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
              )}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
    </Stack>
  );
}

function ConfirmationStep() {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <FiCheck className="h-8 w-8 text-gray-900 dark:text-gray-100" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        All Set
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
        Your account is ready. Click complete to finish the setup process.
      </p>
    </div>
  );
}

// =============================================================================
// CHECKOUT WIZARD COMPONENTS
// =============================================================================

function ShippingStep() {
  const { data, setData } = useWizardStep<{
    address: string;
    city: string;
    zip: string;
  }>('shipping');

  return (
    <Stack gap="4">
      <div className="space-y-2">
        <label
          htmlFor="shipping-address"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Street Address
        </label>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            id="shipping-address"
            type="text"
            value={data?.address ?? ''}
            onChange={(e) =>
              setData({
                ...data,
                address: e.target.value,
                city: data?.city ?? '',
                zip: data?.zip ?? '',
              })
            }
            placeholder="123 Main Street"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="shipping-city"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            City
          </label>
          <input
            id="shipping-city"
            type="text"
            value={data?.city ?? ''}
            onChange={(e) =>
              setData({
                ...data,
                city: e.target.value,
                address: data?.address ?? '',
                zip: data?.zip ?? '',
              })
            }
            placeholder="New York"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="shipping-zip"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            ZIP
          </label>
          <input
            id="shipping-zip"
            type="text"
            value={data?.zip ?? ''}
            onChange={(e) =>
              setData({
                ...data,
                zip: e.target.value,
                address: data?.address ?? '',
                city: data?.city ?? '',
              })
            }
            placeholder="10001"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
          />
        </div>
      </div>
    </Stack>
  );
}

function PaymentStep() {
  const { data, setData } = useWizardStep<{
    cardNumber: string;
    expiry: string;
    cvv: string;
  }>('payment');

  return (
    <Stack gap="4">
      <div className="space-y-2">
        <label
          htmlFor="payment-card"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Card Number
        </label>
        <div className="relative">
          <FiCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            id="payment-card"
            type="text"
            value={data?.cardNumber ?? ''}
            onChange={(e) =>
              setData({
                ...data,
                cardNumber: e.target.value,
                expiry: data?.expiry ?? '',
                cvv: data?.cvv ?? '',
              })
            }
            placeholder="4242 4242 4242 4242"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="payment-expiry"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Expiry
          </label>
          <input
            id="payment-expiry"
            type="text"
            value={data?.expiry ?? ''}
            onChange={(e) =>
              setData({
                ...data,
                expiry: e.target.value,
                cardNumber: data?.cardNumber ?? '',
                cvv: data?.cvv ?? '',
              })
            }
            placeholder="MM/YY"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="payment-cvv"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            CVV
          </label>
          <input
            id="payment-cvv"
            type="text"
            value={data?.cvv ?? ''}
            onChange={(e) =>
              setData({
                ...data,
                cvv: e.target.value,
                cardNumber: data?.cardNumber ?? '',
                expiry: data?.expiry ?? '',
              })
            }
            placeholder="123"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
          />
        </div>
      </div>
    </Stack>
  );
}

function ReviewStep() {
  const { data } = useWizard();

  return (
    <Stack gap="4">
      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <FiMapPin className="h-4 w-4 text-gray-500" />
          <Text fontWeight="medium" color="primary">
            Shipping
          </Text>
        </div>
        <Text className="text-gray-600 dark:text-gray-400 text-sm">
          {(data.shipping as { address?: string })?.address || 'No address'},{' '}
          {(data.shipping as { city?: string })?.city || 'No city'}{' '}
          {(data.shipping as { zip?: string })?.zip || ''}
        </Text>
      </div>
      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <FiCreditCard className="h-4 w-4 text-gray-500" />
          <Text fontWeight="medium" color="primary">
            Payment
          </Text>
        </div>
        <Text className="text-gray-600 dark:text-gray-400 text-sm">
          Card ending in{' '}
          {(data.payment as { cardNumber?: string })?.cardNumber?.slice(-4) ||
            '****'}
        </Text>
      </div>
    </Stack>
  );
}

// =============================================================================
// STEP DEFINITIONS
// =============================================================================

const DEMO_STEPS: WizardStepDefinition[] = [
  {
    id: 'account',
    title: 'Account',
    description: 'Enter your basic information',
  },
  { id: 'security', title: 'Security', description: 'Set up your password' },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Customize your experience',
  },
  { id: 'confirm', title: 'Confirm', description: 'Review and complete' },
];

const CHECKOUT_STEPS: WizardStepDefinition[] = [
  { id: 'shipping', title: 'Shipping' },
  { id: 'payment', title: 'Payment' },
  { id: 'review', title: 'Review' },
];

const SHOWCASE_STEPS: WizardStepDefinition[] = [
  { id: 'step1', title: 'Account' },
  { id: 'step2', title: 'Security' },
  { id: 'step3', title: 'Preferences' },
  { id: 'step4', title: 'Confirm' },
];

const CONDITIONAL_STEPS: WizardStepDefinition[] = [
  { id: 'basic', title: 'Basic Info' },
  {
    id: 'advanced',
    title: 'Advanced (Conditional)',
    optional: true,
    condition: (data) =>
      (data.basic as { showAdvanced?: boolean })?.showAdvanced === true,
  },
  { id: 'finish', title: 'Finish' },
];

// =============================================================================
// OPTIONS
// =============================================================================

const PROGRESS_VARIANTS: ProgressVariant[] = [
  'dots',
  'numbers',
  'labels',
  'bar',
];
const SIZE_OPTIONS = ['sm', 'md', 'lg'] as const;
const ORIENTATION_OPTIONS = ['horizontal', 'vertical'] as const;

// =============================================================================
// CUSTOM NAVIGATION EXAMPLE
// =============================================================================

function CustomNavigationDemo() {
  return (
    <WizardNav>
      {({ nextStep, prevStep, isFirstStep, isLastStep, isLoading }) => (
        <Flex gap="3" justify="between" className="w-full">
          <WizardPrevTrigger disabled={isFirstStep}>
            <button
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                isFirstStep
                  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
              )}
            >
              <FiArrowLeft className="h-4 w-4" />
              Back
            </button>
          </WizardPrevTrigger>

          <WizardNextTrigger>
            <button className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              {isLastStep ? 'Complete' : 'Continue'}
              {!isLastStep && <FiArrowRight className="h-4 w-4" />}
            </button>
          </WizardNextTrigger>
        </Flex>
      )}
    </WizardNav>
  );
}

// =============================================================================
// CONDITIONAL STEP CONTENT
// =============================================================================

function ConditionalBasicStep() {
  const { data, setData } = useWizardStep<{
    name: string;
    showAdvanced: boolean;
  }>('basic');

  return (
    <Stack gap="4">
      <div className="space-y-2">
        <label
          htmlFor="conditional-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Name
        </label>
        <input
          id="conditional-name"
          type="text"
          value={data?.name ?? ''}
          onChange={(e) =>
            setData({
              ...data,
              name: e.target.value,
              showAdvanced: data?.showAdvanced ?? false,
            })
          }
          placeholder="Your name"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
        />
      </div>
      <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <input
          type="checkbox"
          id="conditional-showAdvanced"
          checked={data?.showAdvanced ?? false}
          onChange={(e) =>
            setData({
              ...data,
              showAdvanced: e.target.checked,
              name: data?.name ?? '',
            })
          }
          className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
        />
        <label
          htmlFor="conditional-showAdvanced"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Show advanced options (adds an extra step)
        </label>
      </div>
    </Stack>
  );
}

function ConditionalAdvancedStep() {
  const { data, setData } = useWizardStep<{ option: string }>('advanced');

  return (
    <Stack gap="4">
      <Text className="text-gray-600 dark:text-gray-400">
        This step only appears when &quot;Show advanced options&quot; is
        checked.
      </Text>
      <div className="space-y-2">
        <label
          htmlFor="advanced-option"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Advanced Option
        </label>
        <select
          id="advanced-option"
          value={data?.option ?? ''}
          onChange={(e) => setData({ option: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
        >
          <option value="">Select option...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
    </Stack>
  );
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function WizardPlayground() {
  const [variant, setVariant] = useState<ProgressVariant>('numbers');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );
  const [showLabels, setShowLabels] = useState(true);
  const [clickable, setClickable] = useState(true);
  const [key, setKey] = useState(0);

  const config: WizardConfig = {
    validateOnNext: false,
    keyboardNavigation: true,
    animation: {
      enabled: true,
      direction: 'horizontal',
      stiffness: 300,
      damping: 25,
    },
  };

  const handleComplete = useCallback((data: Record<string, unknown>) => {
    // eslint-disable-next-line no-console
    console.log('Wizard completed with data:', data);
  }, []);

  const resetWizard = useCallback(() => {
    setKey((k) => k + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Page Header */}
        <HeadlineBlock
          headline="Wizard"
          subheadline="Multi-step forms with headless compound components, spring animations, and progress indicators."
          size="medium"
        />

        {/* ================================================================= */}
        {/* SECTION 1: Configuration Controls */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <Text
            fontWeight="semibold"
            className="text-xl text-gray-900 dark:text-gray-100"
          >
            Configuration
          </Text>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Progress Variant */}
              <div className="space-y-3">
                <Text fontWeight="medium" color="primary">
                  Progress Variant
                </Text>
                <div className="flex flex-wrap gap-2">
                  {PROGRESS_VARIANTS.map((v) => (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        variant === v
                          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="space-y-3">
                <Text fontWeight="medium" color="primary">
                  Size
                </Text>
                <div className="flex flex-wrap gap-2">
                  {SIZE_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        size === s
                          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orientation */}
              <div className="space-y-3">
                <Text fontWeight="medium" color="primary">
                  Orientation
                </Text>
                <div className="flex flex-wrap gap-2">
                  {ORIENTATION_OPTIONS.map((o) => (
                    <button
                      key={o}
                      onClick={() => setOrientation(o)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        orientation === o
                          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                      )}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <Text fontWeight="medium" color="primary">
                  Options
                </Text>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowLabels(!showLabels)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      showLabels
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    Labels
                  </button>
                  <button
                    onClick={() => setClickable(!clickable)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      clickable
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    Clickable
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 2: Interactive Demo */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <Flex justify="between" align="center">
            <Text
              fontWeight="semibold"
              className="text-xl text-gray-900 dark:text-gray-100"
            >
              Interactive Demo
            </Text>
            <button
              onClick={resetWizard}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <FiRefreshCw className="h-4 w-4" />
              Reset
            </button>
          </Flex>

          <WizardCardContainer padding="lg">
            <WizardRoot
              key={key}
              steps={DEMO_STEPS}
              config={config}
              hooks={{ onComplete: handleComplete }}
            >
              <div className="mb-8">
                <WizardStepper
                  variant={variant}
                  size={size}
                  orientation={orientation}
                  showLabels={showLabels}
                  clickable={clickable}
                />
              </div>

              <WizardContent className="min-h-[280px]">
                <WizardPanel stepId="account">
                  <WizardFormStep
                    title="Create Your Account"
                    description="Start by entering your name and email address."
                  >
                    <AccountStep />
                  </WizardFormStep>
                </WizardPanel>
                <WizardPanel stepId="security">
                  <WizardFormStep
                    title="Secure Your Account"
                    description="Choose a strong password to protect your account."
                  >
                    <SecurityStep />
                  </WizardFormStep>
                </WizardPanel>
                <WizardPanel stepId="preferences">
                  <WizardFormStep
                    title="Set Your Preferences"
                    description="Configure how you want to use the app."
                  >
                    <PreferencesStep />
                  </WizardFormStep>
                </WizardPanel>
                <WizardPanel stepId="confirm">
                  <WizardFormStep
                    title="Confirmation"
                    description="Review your settings and complete setup."
                  >
                    <ConfirmationStep />
                  </WizardFormStep>
                </WizardPanel>
              </WizardContent>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <WizardNavigation size="md" />
              </div>
            </WizardRoot>
          </WizardCardContainer>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: Vertical Orientation Example */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <Text
            fontWeight="semibold"
            className="text-xl text-gray-900 dark:text-gray-100"
          >
            Vertical Orientation (Sidebar Style)
          </Text>

          <WizardCardContainer padding="lg">
            <WizardRoot
              steps={DEMO_STEPS}
              config={{ ...config, keyboardNavigation: false }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar with vertical stepper */}
                <div className="md:w-64 flex-shrink-0">
                  <WizardStepper
                    variant="numbers"
                    orientation="vertical"
                    showLabels={true}
                    showDescriptions={true}
                    clickable={true}
                    size="md"
                  />
                </div>

                {/* Content area */}
                <div className="flex-1 min-w-0">
                  <WizardContent className="min-h-[300px]">
                    <WizardPanel stepId="account">
                      <WizardFormStep
                        title="Account"
                        description="Enter your basic information"
                      >
                        <AccountStep />
                      </WizardFormStep>
                    </WizardPanel>
                    <WizardPanel stepId="security">
                      <WizardFormStep
                        title="Security"
                        description="Set up your password"
                      >
                        <SecurityStep />
                      </WizardFormStep>
                    </WizardPanel>
                    <WizardPanel stepId="preferences">
                      <WizardFormStep
                        title="Preferences"
                        description="Customize your experience"
                      >
                        <PreferencesStep />
                      </WizardFormStep>
                    </WizardPanel>
                    <WizardPanel stepId="confirm">
                      <WizardFormStep
                        title="Confirm"
                        description="Review and complete"
                      >
                        <ConfirmationStep />
                      </WizardFormStep>
                    </WizardPanel>
                  </WizardContent>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <WizardNavigationSplit size="md" />
                  </div>
                </div>
              </div>
            </WizardRoot>
          </WizardCardContainer>
        </section>

        {/* ================================================================= */}
        {/* SECTION 4: Checkout Flow Example */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <Text
            fontWeight="semibold"
            className="text-xl text-gray-900 dark:text-gray-100"
          >
            E-commerce Checkout Flow
          </Text>

          <WizardCardContainer padding="lg">
            <WizardRoot steps={CHECKOUT_STEPS} config={config}>
              <div className="mb-6">
                <WizardStepper variant="bar" showLabels={true} size="md" />
              </div>

              <WizardContent className="min-h-[250px]">
                <WizardPanel stepId="shipping">
                  <Stack gap="4">
                    <div className="flex items-center gap-2 mb-2">
                      <FiPackage className="h-5 w-5 text-gray-500" />
                      <Text fontWeight="semibold" className="text-lg">
                        Shipping Address
                      </Text>
                    </div>
                    <ShippingStep />
                  </Stack>
                </WizardPanel>
                <WizardPanel stepId="payment">
                  <Stack gap="4">
                    <div className="flex items-center gap-2 mb-2">
                      <FiCreditCard className="h-5 w-5 text-gray-500" />
                      <Text fontWeight="semibold" className="text-lg">
                        Payment Details
                      </Text>
                    </div>
                    <PaymentStep />
                  </Stack>
                </WizardPanel>
                <WizardPanel stepId="review">
                  <Stack gap="4">
                    <div className="flex items-center gap-2 mb-2">
                      <FiCheck className="h-5 w-5 text-gray-500" />
                      <Text fontWeight="semibold" className="text-lg">
                        Order Review
                      </Text>
                    </div>
                    <ReviewStep />
                  </Stack>
                </WizardPanel>
              </WizardContent>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <WizardNavigation
                  size="md"
                  nextLabel="Continue to Payment"
                  completeLabel="Place Order"
                />
              </div>
            </WizardRoot>
          </WizardCardContainer>
        </section>

        {/* ================================================================= */}
        {/* SECTION 5: Conditional Steps Example */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <Text
            fontWeight="semibold"
            className="text-xl text-gray-900 dark:text-gray-100"
          >
            Conditional Steps
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            Steps can appear or disappear based on form data. Check the box
            below to reveal an extra step.
          </Text>

          <WizardCardContainer padding="lg">
            <WizardRoot steps={CONDITIONAL_STEPS} config={config}>
              <div className="mb-6">
                <WizardStepper
                  variant="labels"
                  showLabels={true}
                  clickable={true}
                  size="md"
                />
              </div>

              <WizardContent className="min-h-[200px]">
                <WizardPanel stepId="basic">
                  <WizardFormStep
                    title="Basic Information"
                    description="Enter your basic details"
                  >
                    <ConditionalBasicStep />
                  </WizardFormStep>
                </WizardPanel>
                <WizardPanel stepId="advanced">
                  <WizardFormStep
                    title="Advanced Options"
                    description="Configure advanced settings"
                  >
                    <ConditionalAdvancedStep />
                  </WizardFormStep>
                </WizardPanel>
                <WizardPanel stepId="finish">
                  <WizardFormStep
                    title="Finish"
                    description="Complete the setup"
                  >
                    <ConfirmationStep />
                  </WizardFormStep>
                </WizardPanel>
              </WizardContent>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <WizardNavigationMinimal size="md" />
              </div>
            </WizardRoot>
          </WizardCardContainer>
        </section>

        {/* ================================================================= */}
        {/* SECTION 6: Custom Navigation */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <Text
            fontWeight="semibold"
            className="text-xl text-gray-900 dark:text-gray-100"
          >
            Custom Navigation (Headless Triggers)
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            Use WizardNextTrigger, WizardPrevTrigger, and WizardNav for full
            control over navigation UI.
          </Text>

          <WizardCardContainer padding="lg">
            <WizardRoot steps={SHOWCASE_STEPS} config={config}>
              <div className="mb-6">
                <WizardStepper variant="dots" size="md" />
              </div>

              <WizardContent className="min-h-[150px]">
                <WizardPanel stepId="step1">
                  <div className="text-center py-8">
                    <Text fontWeight="semibold" className="text-lg">
                      Step 1: Account
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400 mt-2">
                      Custom navigation controls below
                    </Text>
                  </div>
                </WizardPanel>
                <WizardPanel stepId="step2">
                  <div className="text-center py-8">
                    <Text fontWeight="semibold" className="text-lg">
                      Step 2: Security
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400 mt-2">
                      Custom navigation controls below
                    </Text>
                  </div>
                </WizardPanel>
                <WizardPanel stepId="step3">
                  <div className="text-center py-8">
                    <Text fontWeight="semibold" className="text-lg">
                      Step 3: Preferences
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400 mt-2">
                      Custom navigation controls below
                    </Text>
                  </div>
                </WizardPanel>
                <WizardPanel stepId="step4">
                  <div className="text-center py-8">
                    <Text fontWeight="semibold" className="text-lg">
                      Step 4: Confirm
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400 mt-2">
                      Custom navigation controls below
                    </Text>
                  </div>
                </WizardPanel>
              </WizardContent>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <CustomNavigationDemo />
              </div>
            </WizardRoot>
          </WizardCardContainer>
        </section>

        {/* ================================================================= */}
        {/* SECTION 7: Progress Variants Showcase */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <Text
            fontWeight="semibold"
            className="text-xl text-gray-900 dark:text-gray-100"
          >
            Progress Variants
          </Text>

          <div className="grid gap-6">
            {PROGRESS_VARIANTS.map((v) => (
              <div
                key={v}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
              >
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {v}
                  </span>
                </div>
                <WizardRoot
                  steps={SHOWCASE_STEPS}
                  config={{ ...config, keyboardNavigation: false }}
                >
                  <WizardStepper
                    variant={v}
                    showLabels={v !== 'dots'}
                    clickable={false}
                    size="md"
                  />
                </WizardRoot>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 8: Size Comparison */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <Text
            fontWeight="semibold"
            className="text-xl text-gray-900 dark:text-gray-100"
          >
            Size Comparison
          </Text>

          <div className="grid gap-6">
            {SIZE_OPTIONS.map((s) => (
              <div
                key={s}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
              >
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {s}
                  </span>
                </div>
                <WizardRoot
                  steps={SHOWCASE_STEPS}
                  config={{ ...config, keyboardNavigation: false }}
                >
                  <WizardStepper
                    variant="numbers"
                    showLabels={true}
                    clickable={false}
                    size={s}
                  />
                </WizardRoot>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 9: Features & API */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <Text
            fontWeight="semibold"
            className="text-xl text-gray-900 dark:text-gray-100"
          >
            Features & API
          </Text>

          <Grid cols={{ base: 1, md: 2 }} gap="6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <Text fontWeight="medium" color="primary">
                Features
              </Text>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">-</span>Headless
                  compound component architecture
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">-</span>Spring-based
                  animations with Framer Motion
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">-</span>Async
                  validation with loading states
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">-</span>Conditional
                  step visibility
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">-</span>State
                  persistence (localStorage/URL)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">-</span>Keyboard
                  navigation (Arrow keys)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">-</span>Accessible
                  (ARIA roles, focus management)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">-</span>Respects
                  prefers-reduced-motion
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <Text fontWeight="medium" color="primary">
                API Components
              </Text>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    WizardRoot
                  </code>
                  <span className="ml-2">Context provider with steps</span>
                </div>
                <div>
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    WizardContent
                  </code>
                  <span className="ml-2">Animated content wrapper</span>
                </div>
                <div>
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    WizardPanel
                  </code>
                  <span className="ml-2">Step content container</span>
                </div>
                <div>
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    WizardStepper
                  </code>
                  <span className="ml-2">Progress indicator</span>
                </div>
                <div>
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    WizardNavigation
                  </code>
                  <span className="ml-2">Styled navigation</span>
                </div>
                <div>
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    WizardNextTrigger
                  </code>
                  <span className="ml-2">Headless next trigger</span>
                </div>
                <div>
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    WizardPrevTrigger
                  </code>
                  <span className="ml-2">Headless prev trigger</span>
                </div>
                <div>
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    useWizard
                  </code>
                  <span className="ml-2">Full state and actions</span>
                </div>
                <div>
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    useWizardStep
                  </code>
                  <span className="ml-2">Step-specific state</span>
                </div>
              </div>
            </div>
          </Grid>
        </section>

        {/* ================================================================= */}
        {/* SECTION 10: Code Examples */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <Text
            fontWeight="semibold"
            className="text-xl text-gray-900 dark:text-gray-100"
          >
            Code Examples
          </Text>

          <Grid cols={{ base: 1, md: 3 }} gap="6">
            {/* Conditional Steps */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
              <Text
                fontWeight="medium"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Conditional Steps
              </Text>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-xs overflow-x-auto">
                {`const steps = [
  { id: 'basic', title: 'Basic' },
  {
    id: 'advanced',
    title: 'Advanced',
    condition: (data) =>
      data.basic?.showAdvanced
  },
  { id: 'finish', title: 'Finish' },
];`}
              </pre>
            </div>

            {/* Async Validation */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
              <Text
                fontWeight="medium"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Async Validation
              </Text>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-xs overflow-x-auto">
                {`const steps = [
  {
    id: 'email',
    title: 'Email',
    validate: async (data) => {
      const exists = await
        checkEmail(data.email);
      return !exists ||
        'Email taken';
    }
  },
];`}
              </pre>
            </div>

            {/* State Persistence */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
              <Text
                fontWeight="medium"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                State Persistence
              </Text>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-xs overflow-x-auto">
                {`<WizardRoot
  steps={steps}
  config={{
    persistence: {
      type: 'localStorage',
      key: 'wizard-state',
      restoreOnMount: true,
    }
  }}
/>`}
              </pre>
            </div>
          </Grid>
        </section>
      </div>
    </div>
  );
}
