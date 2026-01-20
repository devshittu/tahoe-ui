'use client';

import React, { useMemo } from 'react';
import { WizardContext } from './hooks/useWizard';
import type {
  WizardStep,
  WizardHooks,
  WizardConfig,
  WizardTheme,
} from './types';
import { defaultTheme } from './types';
import { createWizardStore } from './store';

interface WizardProviderProps<TSteps extends WizardStep[]> {
  /** Child components */
  children: React.ReactNode;
  /** Array of wizard steps */
  steps: TSteps;
  /** Lifecycle hooks */
  hooks?: WizardHooks;
  /** Custom theme (merged with default) */
  theme?: Partial<WizardTheme>;
  /** Wizard configuration */
  config?: WizardConfig;
}

/**
 * Provider component that wraps wizard content and provides state via context
 *
 * @example
 * ```tsx
 * const steps = [
 *   { id: 'step1', title: 'Personal Info', render: () => <PersonalInfoForm /> },
 *   { id: 'step2', title: 'Address', render: () => <AddressForm /> },
 *   { id: 'step3', title: 'Review', render: () => <ReviewStep /> },
 * ];
 *
 * <WizardProvider
 *   steps={steps}
 *   hooks={{ onWizardComplete: (data) => submitForm(data) }}
 * >
 *   <Wizard />
 * </WizardProvider>
 * ```
 */
export function WizardProvider<TSteps extends WizardStep[]>({
  children,
  steps,
  hooks,
  theme,
  config = {
    lazyRendering: true,
    renderAdjacent: false,
    requireStepValidation: true,
  },
}: WizardProviderProps<TSteps>) {
  // Initialize the store - memoized to prevent recreation
  const useWizardStore = useMemo(
    () => createWizardStore(steps, hooks, config),
    [steps, hooks, config],
  );
  const wizardState = useWizardStore();

  // Merge custom theme with defaults
  const mergedTheme: WizardTheme = useMemo(
    () => ({ ...defaultTheme, ...theme }),
    [theme],
  );

  return (
    <WizardContext.Provider value={{ ...wizardState, theme: mergedTheme }}>
      {children}
    </WizardContext.Provider>
  );
}

export default WizardProvider;
