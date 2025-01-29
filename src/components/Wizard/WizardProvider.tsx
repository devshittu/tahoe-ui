// src/components/Wizard/WizardProvider.tsx

import React, { useMemo } from 'react';
import { WizardContext } from './hooks/useWizardStep';
import { WizardStep, WizardHooks, WizardConfig } from './types';
import { createWizardStore } from './store';
import { WizardTheme, defaultTheme } from './theme';

interface WizardProviderProps<TSteps extends WizardStep[]> {
  children: React.ReactNode;
  steps: TSteps;
  hooks?: WizardHooks;
  theme?: Partial<WizardTheme>;
  config?: WizardConfig; // Accept config as a single object
}
export const WizardProvider = <TSteps extends WizardStep[]>({
  children,
  steps,
  hooks,
  theme = defaultTheme,
  config = {
    // Default config values
    lazyRendering: true,
    renderAdjacent: false,
    requireStepValidation: true,
  },
}: WizardProviderProps<TSteps>) => {
  // Initialize the store and merge the provided theme with default values.
  const useWizardStore = React.useMemo(
    () => createWizardStore(steps, hooks, config),
    [steps, hooks, config],
  );
  const wizardState = useWizardStore();

  // Merge the custom theme with default theme, memoizing the result for performance.
  const mergedTheme: WizardTheme = useMemo(
    () => ({ ...defaultTheme, ...theme }),
    [theme],
  );

  return (
    <WizardContext.Provider value={{ ...wizardState, theme: mergedTheme }}>
      {children}
    </WizardContext.Provider>
  );
};
export default WizardProvider;
// src/components/Wizard/WizardProvider.tsx
