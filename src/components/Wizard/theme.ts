// src/components/Wizard/theme.ts

export type WizardTheme = {
  container?: string; // CSS classes for the wizard container
  step?: string; // Classes for an individual step
  activeStep?: string; // Additional classes for the active step
  controls?: string; // Container for navigation buttons
  button?: string; // Base classes for navigation buttons
  buttonDisabled?: string; // Classes for disabled buttons
  error?: string; // Classes for the error message
};

export const defaultTheme: WizardTheme = {
  container: 'p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg',
  step: 'p-4 bg-white dark:bg-gray-700 rounded-md',
  activeStep: 'border-2 border-blue-500 dark:border-blue-300',
  controls: 'flex justify-between mt-4',
  button: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
  buttonDisabled: 'opacity-50 cursor-not-allowed',
  error: 'text-red-500 mt-4',
};
