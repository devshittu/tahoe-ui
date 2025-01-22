import React, { useEffect } from 'react';
import { WizardProvider } from './WizardProvider';
import Wizard from './Wizard';
import { WizardStep } from './types';
import { useWizard, useWizardStep } from './hooks/useWizardStep';
import eventBus, {
  EVENT_STEP_DATA_UPDATE,
  EVENT_STEP_VALIDATE,
  EVENT_STEP_VALIDATION_STATUS,
} from '@/utils/eventBus';

// Define the data structure for each step
type StepData = {
  name?: string;
  email?: string;
};

// Step 1: Name Input
const Step1: React.FC = () => {
  const { data, setData } = useWizardStep<WizardStep<StepData>[], 'step-1'>(
    'step-1',
  );

  useEffect(() => {
    console.log('Step1');
  }, []);
  useEffect(() => {
    const validateStep1 = (data: StepData) =>
      !!data?.name && data.name.length >= 3;

    const listener = ({
      stepId,
      resolve,
    }: {
      stepId: string;
      resolve: (isValid: boolean) => void;
    }) => {
      if (stepId === 'step-1') {
        const isValid = validateStep1(data || {});
        resolve(isValid); // Invoke resolve callback with validation result
        eventBus.emit(EVENT_STEP_VALIDATION_STATUS, { stepId, isValid });
      }
    };

    eventBus.on(EVENT_STEP_VALIDATE, listener);

    // Emit initial validation status
    listener({ stepId: 'step-1', resolve: (isValid) => {} });

    return () => {
      eventBus.off(EVENT_STEP_VALIDATE, listener);
    };
  }, [data]);

  return (
    <div>
      <h2>Step 1: Enter Name</h2>
      <input
        type="text"
        value={data?.name || ''}
        onChange={(e) => setData({ name: e.target.value })}
        placeholder="Your name"
        className="p-2 border rounded w-full"
      />
    </div>
  );
};

// Step 2: Email Input
const Step2: React.FC = () => {
  console.log('Step2');
  const { data, setData } = useWizardStep<WizardStep<StepData>[], 'step-2'>(
    'step-2',
  );
  useEffect(() => {
    console.log('Step2');
  }, []);

  useEffect(() => console.log('Step 2 Mounted'), []);
  useEffect(() => {
    const validateStep2 = (data: StepData) =>
      !!data?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '');

    const listener = ({
      stepId,
      resolve,
    }: {
      stepId: string;
      resolve: (isValid: boolean) => void;
    }) => {
      if (stepId === 'step-2') {
        const isValid = validateStep2(data || {});
        resolve(isValid); // Invoke resolve callback with validation result
        eventBus.emit(EVENT_STEP_VALIDATION_STATUS, { stepId, isValid });
      }
    };

    eventBus.on(EVENT_STEP_VALIDATE, listener);

    // Emit initial validation status
    listener({ stepId: 'step-2', resolve: (isValid) => {} });

    return () => {
      eventBus.off(EVENT_STEP_VALIDATE, listener);
    };
  }, [data]);

  return (
    <div>
      <h2>Step 2: Enter Email</h2>
      <input
        type="email"
        value={data?.email || ''}
        onChange={(e) => setData({ email: e.target.value })}
        placeholder="Your email"
        className="p-2 border rounded w-full"
      />
    </div>
  );
};

// Step 3: Review
// const Step3: React.FC = () => {
//   const { data } = useWizardStep<WizardStep<StepData>[], 'step-3'>('step-3');
//   const [liveData, setLiveData] = React.useState(data || {});

//   console.log('Step3');
//   useEffect(() => {
//     const updateListener = ({ stepId, data }: { stepId: string; data: StepData }) => {
//       setLiveData((prev) => ({ ...prev, [stepId]: data }));
//     };

//     eventBus.on(EVENT_STEP_DATA_UPDATE, updateListener);

//     return () => {
//       eventBus.off(EVENT_STEP_DATA_UPDATE, updateListener);
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Review</h2>
//       <p>
//         <strong>Name:</strong> {liveData?.name || 'Not provided'}
//       </p>
//       <p>
//         <strong>Email:</strong> {liveData?.email || 'Not provided'}
//       </p>
//     </div>
//   );
// };
const Step3: React.FC = () => {
  const { stepData } = useWizard(); // Access aggregated step data from the store
  const [aggregatedData, setAggregatedData] =
    React.useState<Record<string, any>>(stepData);

  useEffect(() => {
    const updateListener = ({
      stepId,
      data,
    }: {
      stepId: string;
      data: any;
    }) => {
      setAggregatedData((prev: Record<string, any>) => ({
        ...prev,
        [stepId]: data, // Merge new data for the specific step
      }));
    };

    // Listen for data updates from the event bus
    eventBus.on(EVENT_STEP_DATA_UPDATE, updateListener);

    return () => {
      // Clean up listener to prevent memory leaks
      eventBus.off(EVENT_STEP_DATA_UPDATE, updateListener);
    };
  }, []);

  return (
    <div>
      <h2>Review All Data</h2>
      <pre className="p-4 bg-gray-100 rounded">
        {JSON.stringify(aggregatedData, null, 2) || 'No data available'}
      </pre>
    </div>
  );
};

// Define the wizard steps
const steps: WizardStep<StepData>[] = [
  { id: 'step-1', title: 'Step 1', render: () => <Step1 /> },
  { id: 'step-2', title: 'Step 2', render: () => <Step2 /> },
  { id: 'step-3', title: 'Review', render: () => <Step3 /> },
];

const WizardExample: React.FC = () => {
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
      lazyRendering={false}
      renderAdjacent
    >
      <Wizard />
    </WizardProvider>
  );
};

export default WizardExample;
// TODO: add dynamic step rendering
// src/components/Wizard/WizardExample.tsx
