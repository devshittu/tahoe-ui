import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import WizardProvider from './WizardProvider';
import Wizard from './Wizard';
import { WizardStep, WizardHooks, WizardConfig } from './types';
import { useWizard } from './hooks/useWizardStep';
import eventBus, {
  EVENT_STEP_VALIDATE,
  EVENT_STEP_VALIDATION_STATUS,
  EVENT_STEP_DATA_UPDATE,
  EVENT_WIZARD_COMPLETE,
} from '@/utils/eventBus';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

/**
 * Meta Configuration for Wizard Stories
 */
const meta: Meta<typeof Wizard> = {
  title: 'UI/Components/Wizard',
  component: Wizard,
  decorators: [
    (Story) => (
      <WizardProvider
        steps={[]} // Placeholder; steps will be defined in individual stories
        hooks={{
          onStepEnter: (current, prev) =>
            console.log(`Entering step ${current} from ${prev}`),
          onStepLeave: (current, next) =>
            console.log(`Leaving step ${current} to ${next}`),
          onWizardComplete: (data) =>
            console.log('Wizard completed with data:', data),
        }}
        config={{
          lazyRendering: false,
          renderAdjacent: true,
        }}
      >
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
          <Story />
        </div>
      </WizardProvider>
    ),
  ],
  args: {
    theme: {
      container:
        'p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md',
      step: 'p-4 bg-gray-50 dark:bg-gray-700 rounded-md',
      activeStep: 'border-2 border-blue-500 dark:border-blue-300',
      controls: 'flex justify-between mt-4',
      button: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
      buttonDisabled: 'opacity-50 cursor-not-allowed',
      error: 'text-red-500 mt-4',
      description: 'text-sm text-gray-600 dark:text-gray-300 mt-2',
      title: 'text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2',
    },
  },
  argTypes: {
    theme: {
      control: false, // Complex object; control via individual properties if needed
      description: 'Custom theme for the Wizard component.',
    },
    config: {
      control: false, // Complex object; control via individual properties if needed
      description: 'Configuration options for the Wizard behavior.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Wizard>;

/**
 * Step 1: Name Input Component
 */
const Step1: React.FC = () => {
  const { setStepData } = useWizard();

  const [name, setName] = useState('');

  useEffect(() => {
    console.log('Step 1 Mounted');
  }, []);

  useEffect(() => {
    const validateStep1 = (name: string) => name.length >= 3;

    const listener = ({
      stepId,
      resolve,
    }: {
      stepId: string;
      resolve: (isValid: boolean) => void;
    }) => {
      if (stepId === 'step-1') {
        const isValid = validateStep1(name);
        resolve(isValid);
        eventBus.emit(EVENT_STEP_VALIDATION_STATUS, { stepId, isValid });
      }
    };

    eventBus.on(EVENT_STEP_VALIDATE, listener);

    // Initial validation
    listener({ stepId: 'step-1', resolve: (isValid) => {} });

    return () => {
      eventBus.off(EVENT_STEP_VALIDATE, listener);
    };
  }, [name]);

  useEffect(() => {
    setStepData('step-1', { name });
    eventBus.emit(EVENT_STEP_DATA_UPDATE, { stepId: 'step-1', data: { name } });
  }, [name, setStepData]);

  return (
    <div>
      <h2>Step 1: Enter Your Name</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="p-2 border rounded w-full mt-2"
      />
    </div>
  );
};

/**
 * Step 2: Email Input Component
 */
const Step2: React.FC = () => {
  const { setStepData } = useWizard();

  const [email, setEmail] = useState('');

  useEffect(() => {
    console.log('Step 2 Mounted');
  }, []);

  useEffect(() => {
    const validateStep2 = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const listener = ({
      stepId,
      resolve,
    }: {
      stepId: string;
      resolve: (isValid: boolean) => void;
    }) => {
      if (stepId === 'step-2') {
        const isValid = validateStep2(email);
        resolve(isValid);
        eventBus.emit(EVENT_STEP_VALIDATION_STATUS, { stepId, isValid });
      }
    };

    eventBus.on(EVENT_STEP_VALIDATE, listener);

    // Initial validation
    listener({ stepId: 'step-2', resolve: (isValid) => {} });

    return () => {
      eventBus.off(EVENT_STEP_VALIDATE, listener);
    };
  }, [email]);

  useEffect(() => {
    setStepData('step-2', { email });
    eventBus.emit(EVENT_STEP_DATA_UPDATE, {
      stepId: 'step-2',
      data: { email },
    });
  }, [email, setStepData]);

  return (
    <div>
      <h2>Step 2: Enter Your Email</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        className="p-2 border rounded w-full mt-2"
      />
    </div>
  );
};

/**
 * Step 3: Review Data Component
 */
const Step3: React.FC = () => {
  const { stepData } = useWizard();

  const [aggregatedData, setAggregatedData] =
    useState<Record<string, any>>(stepData);

  useEffect(() => {
    // Initialize aggregatedData with existing stepData
    setAggregatedData(stepData);

    const updateListener = ({
      stepId,
      data,
    }: {
      stepId: string;
      data: any;
    }) => {
      setAggregatedData((prev) => ({
        ...prev,
        [stepId]: data,
      }));
    };

    eventBus.on(EVENT_STEP_DATA_UPDATE, updateListener);

    return () => {
      eventBus.off(EVENT_STEP_DATA_UPDATE, updateListener);
    };
  }, [stepData]);

  return (
    <div>
      <h2>Step 3: Review Your Information</h2>
      <pre className="p-4 bg-gray-100 dark:bg-gray-700 rounded mt-2">
        {JSON.stringify(aggregatedData, null, 2) || 'No data available'}
      </pre>
    </div>
  );
};

/**
 * Helper Function to Define Wizard Steps
 */
const getWizardSteps = (): WizardStep<any>[] => [
  {
    id: 'step-1',
    title: 'Name',
    render: () => <Step1 />,
    lazy: false,
    meta: {
      description: 'Please enter your full name.',
      analytics: { event: 'step1_viewed' },
    },
  },
  {
    id: 'step-2',
    title: 'Email',
    render: () => <Step2 />,
    lazy: false,
    meta: {
      description: 'Please enter a valid email address.',
      analytics: { event: 'step2_viewed' },
    },
  },
  {
    id: 'step-3',
    title: 'Review',
    render: () => <Step3 />,
    lazy: false,
    meta: {
      description: 'Review your entered information before submission.',
      analytics: { event: 'step3_viewed' },
    },
  },
];

/**
 * Basic Wizard Story
 * Demonstrates a simple wizard with three steps.
 */
export const BasicWizard: Story = {
  render: () => {
    const steps = getWizardSteps();

    return (
      <WizardProvider
        steps={steps}
        hooks={{
          onStepEnter: (current, prev) =>
            console.log(`Entering step ${current} from ${prev}`),
          onStepLeave: (current, next) =>
            console.log(`Leaving step ${current} to ${next}`),
          onWizardComplete: (data) =>
            console.log('Wizard completed with data:', data),
        }}
        config={{
          lazyRendering: false,
          renderAdjacent: true,
        }}
      >
        <Wizard />
      </WizardProvider>
    );
  },
};

/**
 * Validated Wizard Story
 * Demonstrates a wizard where each step requires validation before proceeding.
 */
export const ValidatedWizard: Story = {
  render: () => {
    const steps = getWizardSteps();

    return (
      <WizardProvider
        steps={steps}
        hooks={{
          onStepEnter: (current, prev) =>
            console.log(`Entering step ${current} from ${prev}`),
          onStepLeave: (current, next) =>
            console.log(`Leaving step ${current} to ${next}`),
          onWizardComplete: (data) =>
            console.log('Wizard completed with data:', data),
        }}
        config={{
          lazyRendering: false,
          renderAdjacent: true,
        }}
      >
        <Wizard />
      </WizardProvider>
    );
  },
};

/**
 * Conditional Wizard Story
 * Demonstrates a wizard with conditional steps based on user input.
 */
export const ConditionalWizard: Story = {
  render: () => {
    const steps: WizardStep<any>[] = [
      {
        id: 'step-1',
        title: 'Name',
        render: () => <Step1 />,
        lazy: false,
        meta: {
          description: 'Please enter your full name.',
          analytics: { event: 'step1_viewed' },
        },
      },
      {
        id: 'step-2',
        title: 'Email',
        render: () => <Step2 />,
        lazy: false,
        condition: (data) => !!data['step-1']?.name,
        meta: {
          description: 'Please enter a valid email address.',
          analytics: { event: 'step2_viewed' },
        },
      },
      {
        id: 'step-3',
        title: 'Review',
        render: () => <Step3 />,
        lazy: false,
        meta: {
          description: 'Review your entered information before submission.',
          analytics: { event: 'step3_viewed' },
        },
      },
      {
        id: 'step-4',
        title: 'Additional Info',
        render: () => (
          <div>
            <h2>Step 4: Additional Information</h2>
            <p>Please provide any additional information.</p>
            <input
              type="text"
              placeholder="Additional Info"
              className="p-2 border rounded w-full mt-2"
            />
          </div>
        ),
        lazy: false,
        condition: (data) => data['step-1']?.name?.startsWith('A'),
        meta: {
          description:
            'Provide additional information if your name starts with A.',
          analytics: { event: 'step4_viewed' },
        },
      },
    ];

    return (
      <WizardProvider
        steps={steps}
        hooks={{
          onStepEnter: (current, prev) =>
            console.log(`Entering step ${current} from ${prev}`),
          onStepLeave: (current, next) =>
            console.log(`Leaving step ${current} to ${next}`),
          onWizardComplete: (data) =>
            console.log('Wizard completed with data:', data),
        }}
        config={{
          lazyRendering: true,
          renderAdjacent: false,
        }}
      >
        <Wizard />
      </WizardProvider>
    );
  },
};

/**
 * Themed Wizard Story
 * Demonstrates a wizard with a custom theme.
 */
export const ThemedWizard: Story = {
  render: () => {
    const steps = getWizardSteps();

    const customTheme = {
      container:
        'p-8 bg-gradient-to-r from-indigo-500 to-purple-500 dark:bg-gradient-to-r dark:from-indigo-700 dark:to-purple-700 rounded-lg shadow-2xl w-full max-w-lg',
      step: 'p-6 bg-white dark:bg-gray-800 rounded-md shadow-inner',
      activeStep: 'border-4 border-yellow-400 dark:border-yellow-200',
      controls: 'flex justify-between mt-6',
      button: 'px-5 py-3 bg-yellow-400 text-black rounded hover:bg-yellow-500',
      buttonDisabled: 'opacity-60 cursor-not-allowed',
      error: 'text-red-400 mt-4',
      description: 'text-sm text-gray-700 dark:text-gray-300 mt-2',
      title: 'text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3',
    };

    return (
      <WizardProvider
        steps={steps}
        hooks={{
          onStepEnter: (current, prev) =>
            console.log(`Entering step ${current} from ${prev}`),
          onStepLeave: (current, next) =>
            console.log(`Leaving step ${current} to ${next}`),
          onWizardComplete: (data) =>
            console.log('Wizard completed with data:', data),
        }}
        theme={customTheme}
        config={{
          lazyRendering: false,
          renderAdjacent: true,
        }}
      >
        <Wizard />
      </WizardProvider>
    );
  },
};

/**
 * Advanced Wizard Story
 * Demonstrates an advanced wizard with multiple steps, validation, conditional rendering, and custom hooks.
 */
export const AdvancedWizard: Story = {
  render: () => {
    const steps: WizardStep<any>[] = [
      {
        id: 'step-1',
        title: 'Name',
        render: () => <Step1 />,
        lazy: false,
        meta: {
          description: 'Please enter your full name.',
          analytics: { event: 'step1_viewed' },
        },
      },
      {
        id: 'step-2',
        title: 'Email',
        render: () => <Step2 />,
        lazy: false,
        condition: (data) => !!data['step-1']?.name,
        meta: {
          description: 'Please enter a valid email address.',
          analytics: { event: 'step2_viewed' },
        },
      },
      {
        id: 'step-3',
        title: 'Review',
        render: () => <Step3 />,
        lazy: false,
        meta: {
          description: 'Review your entered information before submission.',
          analytics: { event: 'step3_viewed' },
        },
      },
      {
        id: 'step-4',
        title: 'Feedback',
        render: () => (
          <div>
            <h2>Step 4: Provide Feedback</h2>
            <textarea
              placeholder="Your feedback"
              className="p-2 border rounded w-full mt-2 h-32"
            ></textarea>
          </div>
        ),
        lazy: true,
        condition: (data) => data['step-2']?.email?.endsWith('@example.com'),
        meta: {
          description: 'Provide feedback if you have any.',
          analytics: { event: 'step4_viewed' },
        },
      },
    ];

    const customHooks: WizardHooks = {
      onStepEnter: (current, prev) =>
        console.log(`Entering step ${current} from ${prev}`),
      onStepLeave: (current, next) =>
        console.log(`Leaving step ${current} to ${next}`),
      onWizardComplete: (data) =>
        console.log('Wizard completed with data:', data),
    };

    const customConfig: WizardConfig = {
      lazyRendering: true,
      renderAdjacent: true,
    };

    const customTheme = {
      container:
        'p-8 bg-gradient-to-r from-green-400 to-blue-500 dark:bg-gradient-to-r dark:from-green-700 dark:to-blue-700 rounded-lg shadow-2xl w-full max-w-2xl',
      step: 'p-6 bg-white dark:bg-gray-800 rounded-md shadow-inner',
      activeStep: 'border-4 border-green-400 dark:border-green-200',
      controls: 'flex justify-between mt-6',
      button: 'px-5 py-3 bg-green-400 text-white rounded hover:bg-green-500',
      buttonDisabled: 'opacity-60 cursor-not-allowed',
      error: 'text-red-400 mt-4',
      description: 'text-sm text-gray-700 dark:text-gray-300 mt-2',
      title: 'text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3',
    };

    return (
      <WizardProvider
        steps={steps}
        hooks={customHooks}
        theme={customTheme}
        config={customConfig}
      >
        <Wizard />
      </WizardProvider>
    );
  },
};
// src/components/Wizard/Wizard.stories.tsx
