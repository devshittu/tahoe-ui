// src/app/playground/digit-input/page.tsx
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '@/components/Typography';
import { HeadlineBlock } from '../headline/components';
import {
  DigitInput,
  Numpad,
  CompactNumpad,
  type DigitInputRef,
} from './components';
import { useToast, ToastContainer } from '../toast/components';
import {
  FiCheck,
  FiLock,
  FiShield,
  FiCreditCard,
  FiSmartphone,
  FiMail,
  FiKey,
  FiAlertCircle,
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
 * Demo card wrapper
 */
function DemoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'p-6 bg-white dark:bg-gray-900 rounded-2xl',
        'border border-gray-200 dark:border-gray-800',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Basic OTP Demo
 */
function BasicOTPDemo() {
  const { toast } = useToast();
  const [value, setValue] = useState('');

  const handleComplete = useCallback(
    (code: string) => {
      toast({
        message: `Code entered: ${code}`,
        variant: 'success',
        duration: 3000,
      });
    },
    [toast],
  );

  return (
    <DemoCard>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
          <FiMail className="w-6 h-6 text-blue-500" />
        </div>
        <div className="text-center">
          <Text fontWeight="semibold" color="primary">
            Verify your email
          </Text>
          <Text color="secondary" className="text-sm mt-1">
            Enter the 6-digit code sent to your email
          </Text>
        </div>
        <DigitInput
          length={6}
          value={value}
          onChange={setValue}
          onComplete={handleComplete}
          variant="default"
          size="md"
          helperText="Didn't receive the code? Resend"
        />
      </div>
    </DemoCard>
  );
}

/**
 * PIN Entry Demo
 */
function PINEntryDemo() {
  const { toast } = useToast();
  const inputRef = useRef<DigitInputRef>(null);
  const [state, setState] = useState<'error' | 'success' | undefined>();
  const [errorMessage, setErrorMessage] = useState('');

  const handleComplete = useCallback(
    (pin: string) => {
      // Simulate PIN validation
      if (pin === '1234') {
        setState('success');
        setErrorMessage('');
        toast({
          message: 'PIN verified successfully',
          variant: 'success',
        });
      } else {
        setState('error');
        setErrorMessage('Incorrect PIN. Try again.');
        inputRef.current?.triggerError();
        setTimeout(() => {
          inputRef.current?.clear();
          setState(undefined);
          setErrorMessage('');
        }, 1500);
      }
    },
    [toast],
  );

  return (
    <DemoCard>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <FiLock className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </div>
        <div className="text-center">
          <Text fontWeight="semibold" color="primary">
            Enter your PIN
          </Text>
          <Text color="secondary" className="text-sm mt-1">
            4-digit PIN (try: 1234)
          </Text>
        </div>
        <DigitInput
          ref={inputRef}
          length={4}
          masked
          onComplete={handleComplete}
          state={state}
          errorMessage={errorMessage}
          successMessage="Access granted"
          variant="elevated"
          size="lg"
        />
      </div>
    </DemoCard>
  );
}

/**
 * Card Auth Code Demo
 */
function CardAuthDemo() {
  const { toast } = useToast();
  const [value, setValue] = useState('');

  return (
    <DemoCard>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
          <FiCreditCard className="w-6 h-6 text-emerald-500" />
        </div>
        <div className="text-center">
          <Text fontWeight="semibold" color="primary">
            Card Verification
          </Text>
          <Text color="secondary" className="text-sm mt-1">
            Enter the 3-digit CVV from your card
          </Text>
        </div>
        <DigitInput
          length={3}
          masked
          value={value}
          onChange={setValue}
          onComplete={(code) =>
            toast({
              message: 'CVV entered',
              variant: 'success',
            })
          }
          variant="glass"
          size="lg"
        />
      </div>
    </DemoCard>
  );
}

/**
 * 2FA Demo with Timer
 */
function TwoFactorDemo() {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleComplete = useCallback(
    async (code: string) => {
      setIsVerifying(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsVerifying(false);
      toast({
        message: 'Two-factor authentication successful',
        variant: 'success',
      });
    },
    [toast],
  );

  return (
    <DemoCard>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center">
          <FiShield className="w-6 h-6 text-purple-500" />
        </div>
        <div className="text-center">
          <Text fontWeight="semibold" color="primary">
            Two-Factor Authentication
          </Text>
          <Text color="secondary" className="text-sm mt-1">
            Enter code from your authenticator app
          </Text>
        </div>
        <DigitInput
          length={6}
          separator={3}
          onComplete={handleComplete}
          disabled={isVerifying}
          variant="default"
          size="md"
          helperText={
            isVerifying ? 'Verifying...' : 'Code refreshes every 30 seconds'
          }
        />
      </div>
    </DemoCard>
  );
}

/**
 * On-screen Numpad Demo
 */
function NumpadDemo() {
  const { toast } = useToast();
  const inputRef = useRef<DigitInputRef>(null);
  const [value, setValue] = useState('');

  const handleDigit = useCallback((digit: string) => {
    setValue((prev) => {
      if (prev.length >= 6) return prev;
      return prev + digit;
    });
  }, []);

  const handleBackspace = useCallback(() => {
    setValue((prev) => prev.slice(0, -1));
  }, []);

  const handleSubmit = useCallback(() => {
    if (value.length === 6) {
      toast({
        message: `Submitted: ${value}`,
        variant: 'success',
      });
    } else {
      toast({
        message: 'Please enter all 6 digits',
        variant: 'warning',
      });
    }
  }, [value, toast]);

  return (
    <DemoCard className="max-w-sm mx-auto">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
          <FiSmartphone className="w-6 h-6 text-orange-500" />
        </div>
        <div className="text-center">
          <Text fontWeight="semibold" color="primary">
            Mobile PIN Pad
          </Text>
          <Text color="secondary" className="text-sm mt-1">
            Use the on-screen numpad
          </Text>
        </div>

        <DigitInput
          ref={inputRef}
          length={6}
          value={value}
          onChange={setValue}
          variant="minimal"
          size="md"
        />

        <Numpad
          onDigit={handleDigit}
          onBackspace={handleBackspace}
          onSubmit={handleSubmit}
          showSubmit
          disabled={value.length === 6}
        />
      </div>
    </DemoCard>
  );
}

/**
 * Variants showcase
 */
function VariantsDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DemoCard>
        <div className="space-y-2 text-center">
          <Text color="secondary" className="text-sm">
            Default
          </Text>
          <DigitInput
            length={4}
            variant="default"
            size="md"
            onComplete={() => {}}
          />
        </div>
      </DemoCard>

      <DemoCard>
        <div className="space-y-2 text-center">
          <Text color="secondary" className="text-sm">
            Minimal
          </Text>
          <DigitInput
            length={4}
            variant="minimal"
            size="md"
            onComplete={() => {}}
          />
        </div>
      </DemoCard>

      <DemoCard>
        <div className="space-y-2 text-center">
          <Text color="secondary" className="text-sm">
            Elevated
          </Text>
          <DigitInput
            length={4}
            variant="elevated"
            size="md"
            onComplete={() => {}}
          />
        </div>
      </DemoCard>

      <DemoCard className="bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <div className="space-y-2 text-center">
          <Text color="secondary" className="text-sm">
            Glass
          </Text>
          <DigitInput
            length={4}
            variant="glass"
            size="md"
            onComplete={() => {}}
          />
        </div>
      </DemoCard>
    </div>
  );
}

/**
 * Sizes showcase
 */
function SizesDemo() {
  return (
    <DemoCard>
      <div className="space-y-6">
        <div className="space-y-2">
          <Text color="secondary" className="text-sm">
            Small
          </Text>
          <DigitInput
            length={6}
            variant="default"
            size="sm"
            onComplete={() => {}}
          />
        </div>

        <div className="space-y-2">
          <Text color="secondary" className="text-sm">
            Medium (default)
          </Text>
          <DigitInput
            length={6}
            variant="default"
            size="md"
            onComplete={() => {}}
          />
        </div>

        <div className="space-y-2">
          <Text color="secondary" className="text-sm">
            Large
          </Text>
          <DigitInput
            length={6}
            variant="default"
            size="lg"
            onComplete={() => {}}
          />
        </div>
      </div>
    </DemoCard>
  );
}

/**
 * States demo
 */
function StatesDemo() {
  return (
    <div className="space-y-4">
      {/* Error and Success - full width */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DemoCard>
          <div className="space-y-3 text-center overflow-x-auto">
            <Text color="secondary" className="text-sm">
              Error State
            </Text>
            <div className="flex justify-center">
              <DigitInput
                length={6}
                defaultValue="123456"
                state="error"
                errorMessage="Invalid code. Please try again."
                variant="default"
                size="sm"
                onComplete={() => {}}
              />
            </div>
          </div>
        </DemoCard>

        <DemoCard>
          <div className="space-y-3 text-center overflow-x-auto">
            <Text color="secondary" className="text-sm">
              Success State
            </Text>
            <div className="flex justify-center">
              <DigitInput
                length={6}
                defaultValue="123456"
                state="success"
                successMessage="Code verified successfully"
                variant="default"
                size="sm"
                onComplete={() => {}}
              />
            </div>
          </div>
        </DemoCard>
      </div>

      {/* Disabled and With Label - full width */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DemoCard>
          <div className="space-y-3 text-center overflow-x-auto">
            <Text color="secondary" className="text-sm">
              Disabled
            </Text>
            <div className="flex justify-center">
              <DigitInput
                length={6}
                defaultValue="123"
                disabled
                variant="default"
                size="sm"
                onComplete={() => {}}
              />
            </div>
          </div>
        </DemoCard>

        <DemoCard>
          <div className="space-y-3 text-center overflow-x-auto">
            <Text color="secondary" className="text-sm">
              With Label
            </Text>
            <div className="flex justify-center">
              <DigitInput
                length={6}
                label="Verification Code"
                helperText="Enter the code from your SMS"
                required
                variant="default"
                size="sm"
                onComplete={() => {}}
              />
            </div>
          </div>
        </DemoCard>
      </div>
    </div>
  );
}

/**
 * Alphanumeric Demo
 */
function AlphanumericDemo() {
  const { toast } = useToast();

  return (
    <DemoCard>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-950/50 flex items-center justify-center">
          <FiKey className="w-6 h-6 text-cyan-500" />
        </div>
        <div className="text-center">
          <Text fontWeight="semibold" color="primary">
            License Key
          </Text>
          <Text color="secondary" className="text-sm mt-1">
            Enter your alphanumeric activation code
          </Text>
        </div>
        <DigitInput
          length={8}
          mode="alphanumeric"
          separator={4}
          separatorElement={<span className="text-gray-400 text-xl">-</span>}
          onComplete={(code) =>
            toast({
              message: `License key: ${code}`,
              variant: 'success',
            })
          }
          variant="elevated"
          size="md"
          helperText="Accepts letters and numbers"
        />
      </div>
    </DemoCard>
  );
}

/**
 * Digit Input Playground Page
 */
export default function DigitInputPlayground() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Toast Container */}
        <ToastContainer position="bottom-right" />

        {/* Header */}
        <HeadlineBlock
          headline="Digit Input"
          subheadline="Apple-style tokenized digit input for OTP, PIN, and verification codes. Smart paste handling, seamless navigation, and haptic feedback."
          align="left"
          className="mb-12"
        />

        <div className="space-y-12">
          {/* Basic OTP */}
          <DemoSection
            title="Email Verification"
            description="Standard 6-digit OTP input for email verification"
          >
            <BasicOTPDemo />
          </DemoSection>

          {/* PIN Entry */}
          <DemoSection
            title="PIN Entry"
            description="Masked 4-digit PIN with validation (correct PIN: 1234)"
          >
            <PINEntryDemo />
          </DemoSection>

          {/* Card Auth */}
          <DemoSection
            title="Card Verification"
            description="3-digit CVV entry with glass variant"
          >
            <CardAuthDemo />
          </DemoSection>

          {/* 2FA */}
          <DemoSection
            title="Two-Factor Authentication"
            description="6-digit code with separator at position 3"
          >
            <TwoFactorDemo />
          </DemoSection>

          {/* Alphanumeric */}
          <DemoSection
            title="Alphanumeric Mode"
            description="8-character license key with letters and numbers"
          >
            <AlphanumericDemo />
          </DemoSection>

          {/* On-screen Numpad */}
          <DemoSection
            title="On-Screen Numpad"
            description="Mobile-optimized input with virtual keypad"
          >
            <NumpadDemo />
          </DemoSection>

          {/* Variants */}
          <DemoSection
            title="Visual Variants"
            description="Four style variants for different contexts"
          >
            <VariantsDemo />
          </DemoSection>

          {/* Sizes */}
          <DemoSection
            title="Size Options"
            description="Small, medium, and large presets"
          >
            <SizesDemo />
          </DemoSection>

          {/* States */}
          <DemoSection
            title="Input States"
            description="Error, success, disabled, and labeled states"
          >
            <StatesDemo />
          </DemoSection>

          {/* Features List */}
          <DemoSection title="Features">
            <DemoCard>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Smart paste:</strong> Strips non-digits, fills from
                    current position
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Seamless navigation:</strong> Backspace crosses
                    boxes, arrow keys move focus
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Mobile-optimized:</strong>{' '}
                    inputmode=&quot;numeric&quot; triggers number keyboard
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Haptic feedback:</strong> Vibration on input,
                    delete, complete, error
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Animated states:</strong> Fill bounce, error shake,
                    success pulse
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Masked mode:</strong> PIN-style dot masking for
                    sensitive input
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Configurable separators:</strong> Visual grouping
                    with custom elements
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>On-screen numpad:</strong> Virtual keypad for
                    kiosk/mobile use
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Accessibility:</strong> ARIA labels, keyboard
                    navigation, screen reader support
                  </span>
                </li>
              </ul>
            </DemoCard>
          </DemoSection>

          {/* Usage hint */}
          <div className="text-center py-4">
            <Text color="secondary" className="text-sm">
              Try pasting a code, using backspace across boxes, or arrow keys to
              navigate
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
