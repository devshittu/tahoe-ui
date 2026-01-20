// src/components/Wizard/core/WizardRoot.tsx
'use client';

import { useEffect, useCallback, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { WizardProvider, useWizard } from './WizardContext';
import type {
  WizardStepDefinition,
  WizardData,
  WizardConfig,
  WizardLifecycleHooks,
} from './types';

// =============================================================================
// KEYBOARD NAVIGATION HANDLER
// =============================================================================

function KeyboardNavigationHandler() {
  const { nextStep, prevStep } = useWizard();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevStep();
      }
    },
    [nextStep, prevStep],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return null;
}

// =============================================================================
// WIZARD ROOT COMPONENT
// =============================================================================

interface WizardRootProps {
  /** Step definitions - required, defines the wizard structure */
  steps: WizardStepDefinition[];
  /** Initial data to pre-populate steps */
  initialData?: WizardData;
  /** Initial step ID to start from */
  initialStepId?: string;
  /** Wizard configuration */
  config?: WizardConfig;
  /** Lifecycle hooks */
  hooks?: WizardLifecycleHooks;
  /** Children (WizardContent, WizardStepper, etc.) */
  children: ReactNode;
  /** Container class name */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * WizardRoot - Main wizard container
 *
 * Provides the wizard context and manages keyboard navigation.
 * All other wizard components must be descendants of this component.
 *
 * @example
 * ```tsx
 * const steps = [
 *   { id: 'account', title: 'Account' },
 *   { id: 'security', title: 'Security' },
 * ];
 *
 * <WizardRoot steps={steps} config={{ validateOnNext: false }}>
 *   <WizardStepper />
 *   <WizardContent>
 *     <WizardPanel stepId="account"><AccountForm /></WizardPanel>
 *     <WizardPanel stepId="security"><SecurityForm /></WizardPanel>
 *   </WizardContent>
 *   <WizardNavigation />
 * </WizardRoot>
 * ```
 */
export function WizardRoot({
  steps,
  initialData,
  initialStepId,
  config,
  hooks,
  children,
  className,
  'aria-label': ariaLabel = 'Multi-step wizard',
}: WizardRootProps) {
  const enableKeyboard = config?.keyboardNavigation !== false;

  return (
    <WizardProvider
      steps={steps}
      initialData={initialData}
      initialStepId={initialStepId}
      config={config}
      hooks={hooks}
    >
      <div
        role="group"
        aria-label={ariaLabel}
        className={cn('wizard-root', className)}
      >
        {enableKeyboard && <KeyboardNavigationHandler />}
        {children}
      </div>
    </WizardProvider>
  );
}
