// src/components/Wizard/Wizard.stories.tsx
'use client';

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Wizard from './Wizard';
import { WizardProvider } from './WizardProvider';
import type { WizardStep, WizardHooks } from './types';
import { defaultTheme, WizardTheme } from './theme';

// ----------------------------------------------------------------------------
// Dummy Steps
// ----------------------------------------------------------------------------

const step1: WizardStep = {
  id: 'step-1',
  title: 'Step One',
  // For simplicity, the render function just returns a header.
  render: () => (
    <div>
      <h2 className="text-xl font-semibold">Step One</h2>
      <p>This is step one content.</p>
    </div>
  ),
  // A simple validation that always passes
  validate: (data: any) => true,
};

const step2: WizardStep = {
  id: 'step-2',
  title: 'Step Two',
  render: () => (
    <div>
      <h2 className="text-xl font-semibold">Step Two</h2>
      <p>This is step two content.</p>
    </div>
  ),
  // Validation that fails if data is not "valid"
  validate: async (data: any) => {
    return data === 'valid' || false;
  },
};

const step3: WizardStep = {
  id: 'step-3',
  title: 'Step Three',
  render: () => (
    <div>
      <h2 className="text-xl font-semibold">Step Three</h2>
      <p>This is the final step of the wizard.</p>
    </div>
  ),
};

// Array of steps
const steps = [step1, step2, step3];

// ----------------------------------------------------------------------------
// Dummy Hooks for Wizard lifecycle events
// ----------------------------------------------------------------------------

const wizardHooks: WizardHooks = {
  onStepEnter: (currentStepId, prevStepId) => {
    action('Step Entered')(currentStepId, prevStepId);
  },
  onStepLeave: (currentStepId, nextStepId) => {
    action('Step Left')(currentStepId, nextStepId);
  },
  onWizardComplete: (stepData) => {
    action('Wizard Completed')(stepData);
  },
};

// ----------------------------------------------------------------------------
// Custom Themes
// ----------------------------------------------------------------------------

const customTheme: Partial<WizardTheme> = {
  container: 'p-8 bg-gray-200 dark:bg-gray-900 rounded-xl shadow-2xl',
  step: 'p-6 bg-white dark:bg-gray-800 rounded-lg',
  activeStep: 'border-4 border-green-500 dark:border-green-300',
  controls: 'flex justify-end mt-6 space-x-4',
  button: 'px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700',
  buttonDisabled: 'opacity-50 cursor-not-allowed',
  error: 'text-red-600 font-bold mt-4',
};

// ----------------------------------------------------------------------------
// Meta configuration for Storybook
// ----------------------------------------------------------------------------

const meta: Meta<typeof Wizard> = {
  title: 'Components/Wizard',
  component: Wizard,
  decorators: [
    (Story) => (
      <div className="p-4 bg-gray-100 min-h-screen">
        <WizardProvider steps={steps} hooks={wizardHooks}>
          <Story />
        </WizardProvider>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Wizard>;

// ----------------------------------------------------------------------------
// Default Wizard Story
// ----------------------------------------------------------------------------

export const DefaultWizard: Story = {
  render: () => <Wizard />,
};

// ----------------------------------------------------------------------------
// Advanced Wizard Story (Custom Theme)
// ----------------------------------------------------------------------------

export const AdvancedWizard: Story = {
  render: () => (
    <WizardProvider steps={steps} hooks={wizardHooks} theme={customTheme}>
      <Wizard />
    </WizardProvider>
  ),
};

// ----------------------------------------------------------------------------
// Error Scenario Story
// This demo forces step two to fail validation (by not setting the proper data).
// In a real scenario, you'd use your `setStepData` hook to supply valid data.
export const WizardWithError: Story = {
  render: () => {
    // Wrap the wizard in the provider; here, step two validation expects the data to be "valid"
    // and we'll not supply it by default, so that an error message shows up.
    return (
      <WizardProvider steps={steps} hooks={wizardHooks}>
        <Wizard />
      </WizardProvider>
    );
  },
};
