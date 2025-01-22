// src/components/Wizard/WizardProvider.tsx

import React, { useMemo } from 'react';
import { WizardContext } from './hooks/useWizardStep';
import { WizardStep, WizardHooks } from './types';
import { createWizardStore } from './store';
import { WizardTheme, defaultTheme } from './theme';
import exp from 'constants';

export const WizardProvider = <TSteps extends WizardStep[]>({
  children,
  steps,
  hooks,
  theme = defaultTheme,
}: {
  children: React.ReactNode;
  steps: TSteps;
  hooks?: WizardHooks;
  theme?: Partial<WizardTheme>;
}) => {
  // Initialize the store and merge the provided theme with default values.
  const useWizardStore = React.useMemo(
    () => createWizardStore(steps, hooks),
    [steps, hooks],
  );
  const wizardState = useWizardStore();

  // const mergedTheme: WizardTheme = { ...defaultTheme, ...theme };
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
