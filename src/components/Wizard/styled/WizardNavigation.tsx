// src/components/Wizard/styled/WizardNavigation.tsx
'use client';

import { useCallback, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { Flex } from '@/components/Box';
import { useWizard, useWizardNavigation } from '../core/WizardContext';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface WizardNavigationProps {
  /** Show back button */
  showBack?: boolean;
  /** Show next button */
  showNext?: boolean;
  /** Back button label (default: 'Back') */
  backLabel?: string;
  /** Next button label (default: 'Next' or 'Complete') */
  nextLabel?: string;
  /** Complete button label (default: 'Complete') */
  completeLabel?: string;
  /** Left slot (extra content on the left) */
  leftSlot?: ReactNode;
  /** Right slot (extra content on the right) */
  rightSlot?: ReactNode;
  /** Center slot (extra content in the center) */
  centerSlot?: ReactNode;
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Container class name */
  className?: string;
  /** Back button class name */
  backClassName?: string;
  /** Next button class name */
  nextClassName?: string;
  /** Custom back button handler */
  onBack?: () => void;
  /** Custom next button handler */
  onNext?: () => void | Promise<void>;
  /** Custom complete handler */
  onComplete?: () => void | Promise<void>;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function WizardNavigation({
  showBack = true,
  showNext = true,
  backLabel = 'Back',
  nextLabel,
  completeLabel = 'Complete',
  leftSlot,
  rightSlot,
  centerSlot,
  size = 'md',
  className,
  backClassName,
  nextClassName,
  onBack,
  onNext,
  onComplete,
}: WizardNavigationProps) {
  const { prevStep, nextStep, isLoading } = useWizard();
  const { isFirstStep, isLastStep, isComplete } = useWizardNavigation();

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      prevStep();
    }
  }, [onBack, prevStep]);

  const handleNext = useCallback(async () => {
    if (isLastStep) {
      if (onComplete) {
        await onComplete();
      } else {
        await nextStep();
      }
    } else {
      if (onNext) {
        await onNext();
      } else {
        await nextStep();
      }
    }
  }, [isLastStep, onComplete, onNext, nextStep]);

  // Determine next button label
  const resolvedNextLabel = nextLabel ?? (isLastStep ? completeLabel : 'Next');

  return (
    <Flex
      justify="between"
      align="center"
      gap="4"
      className={cn('wizard-navigation w-full', className)}
    >
      {/* Left section */}
      <div className="flex items-center gap-3">
        {showBack && (
          <Button
            variant="ghost"
            color="neutral"
            size={size}
            onClick={handleBack}
            disabled={isFirstStep || isComplete}
            className={cn('min-w-[80px]', backClassName)}
          >
            {backLabel}
          </Button>
        )}
        {leftSlot}
      </div>

      {/* Center section */}
      {centerSlot && <div className="flex items-center">{centerSlot}</div>}

      {/* Right section */}
      <div className="flex items-center gap-3">
        {rightSlot}
        {showNext && (
          <Button
            variant="solid"
            color="primary"
            size={size}
            onClick={handleNext}
            disabled={isComplete}
            isLoading={isLoading}
            loadingText="Validating..."
            className={cn('min-w-[100px]', nextClassName)}
          >
            {resolvedNextLabel}
          </Button>
        )}
      </div>
    </Flex>
  );
}

// -----------------------------------------------------------------------------
// Minimal Navigation (Just buttons, no slots)
// -----------------------------------------------------------------------------

interface MinimalNavigationProps {
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Container class name */
  className?: string;
}

export function WizardNavigationMinimal({
  size = 'md',
  className,
}: MinimalNavigationProps) {
  const { prevStep, nextStep, isLoading } = useWizard();
  const { isFirstStep, isLastStep, isComplete } = useWizardNavigation();

  return (
    <Flex gap="3" className={className}>
      <Button
        variant="outline"
        color="neutral"
        size={size}
        onClick={() => prevStep()}
        disabled={isFirstStep || isComplete}
      >
        Back
      </Button>
      <Button
        variant="solid"
        color="primary"
        size={size}
        onClick={() => nextStep()}
        disabled={isComplete}
        isLoading={isLoading}
      >
        {isLastStep ? 'Complete' : 'Next'}
      </Button>
    </Flex>
  );
}

// -----------------------------------------------------------------------------
// Split Navigation (Back on left, Next on right)
// -----------------------------------------------------------------------------

interface SplitNavigationProps {
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Container class name */
  className?: string;
}

export function WizardNavigationSplit({
  size = 'md',
  className,
}: SplitNavigationProps) {
  const { prevStep, nextStep, isLoading } = useWizard();
  const { isFirstStep, isLastStep, isComplete } = useWizardNavigation();

  return (
    <Flex justify="between" align="center" className={cn('w-full', className)}>
      <Button
        variant="ghost"
        color="neutral"
        size={size}
        onClick={() => prevStep()}
        disabled={isFirstStep || isComplete}
        className={isFirstStep ? 'invisible' : ''}
      >
        Back
      </Button>
      <Button
        variant="solid"
        color="primary"
        size={size}
        onClick={() => nextStep()}
        disabled={isComplete}
        isLoading={isLoading}
      >
        {isLastStep ? 'Complete' : 'Continue'}
      </Button>
    </Flex>
  );
}
