// src/components/Wizard/WizardExample.tsx

import React, { useState } from 'react';
import { WizardProvider } from './WizardProvider';
import Wizard from './Wizard';
import { WizardStep } from './types';
import { useWizardStep } from './hooks/useWizardStep';

// Define the data structure for each step.
interface Step1Data {
  name: string;
}
interface Step2Data {
  email: string;
}

// Define a tuple alias for our wizard steps.
type MySteps = [
  WizardStep<Step1Data>,
  WizardStep<Step2Data>,
  WizardStep<any> // For Step 3, which does not have specific data.
];

// Step 1 Component
const Step1: React.FC = () => {
  // Provide both type arguments: the steps tuple (MySteps) and the step id.
  const { data, setData } = useWizardStep<MySteps, 'step-1'>('step-1');
  const [name, setName] = useState(data?.name || '');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    // Update wizard state for step-1.
    setData({ name: value });
  };

  return (
    <div>
      <h2>Step 1: Personal Details</h2>
      <input
        type="text"
        value={name}
        placeholder="Enter your name (min 3 chars)"
        onChange={handleNameChange}
        className="p-2 border rounded w-full"
      />
    </div>
  );
};

// Step 2 Component
const Step2: React.FC = () => {
  // Provide the steps tuple type and the id 'step-2'.
  const { data, setData } = useWizardStep<MySteps, 'step-2'>('step-2');
  const [email, setEmail] = useState(data?.email || '');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Update wizard state for step-2.
    setData({ email: value });
  };

  return (
    <div>
      <h2>Step 2: Contact Information</h2>
      <input
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={handleEmailChange}
        className="p-2 border rounded w-full"
      />
    </div>
  );
};

// Step 3 Component
const Step3: React.FC = () => {
  // For Step 3, we don't have specific data (so we could use any).
  const { data } = useWizardStep<MySteps, 'step-3'>('step-3');

  return (
    <div>
      <h2>Step 3: Confirmation</h2>
      <p>
        <strong>Name:</strong> {data?.name || 'Not provided'}
      </p>
      <p>
        <strong>Email:</strong> {data?.email || 'Not provided'}
      </p>
    </div>
  );
};

// Define the wizard steps with proper properties.
const steps: WizardStep[] = [
  {
    id: 'step-1',
    title: 'Step 1',
    render: () => <Step1 />,
    // Validate that name exists and has at least 3 characters
    validate: (data: Step1Data) => Boolean(data && data.name && data.name.length >= 3),
  },
  {
    id: 'step-2',
    title: 'Step 2',
    render: () => <Step2 />,
    // Only show Step 2 if Step 1 has a non-empty name.
    condition: (stepData) => !!stepData['step-1']?.name,
    // Validate a simple email pattern.
    validate: (data: Step2Data) =>
      !!data && !!data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email),
  },
  {
    id: 'step-3',
    title: 'Step 3',
    render: () => <Step3 />,
  },
];

// Define a custom theme (optional).
const customTheme = {
  container: 'p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md',
  step: 'my-4',
  controls: 'flex justify-between mt-6',
  button: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
  buttonDisabled: 'opacity-50 cursor-not-allowed',
  error: 'text-red-500 text-sm mt-2',
};

// Main Wizard Example Component
const WizardExample: React.FC = () => {
  return (
    <WizardProvider steps={steps as MySteps} theme={customTheme} hooks={{
      onStepEnter: (current, prev) => console.log(`Entering step ${current} from ${prev}`),
      onStepLeave: (current, next) => console.log(`Leaving step ${current} to ${next}`),
      onWizardComplete: (data) => console.log('Wizard completed with data:', data),
    }}>
      <Wizard />
    </WizardProvider>
  );
};

export default WizardExample;

// // src/components/Wizard/WizardExample.tsx

// import React from 'react';
// import { WizardProvider } from './WizardProvider';
// import Wizard from './Wizard';
// import { WizardStep } from './types';

// // Define step components with render functions.
// const Step1 = () => (
//   <div>
//     <h2>Step 1: Personal Details</h2>
//     <input
//       type="text"
//       placeholder="Enter your name"
//       onChange={(e) => {
//         // For illustration; you’d use useWizardStep to manage data.
//       }}
//     />
//   </div>
// );

// const Step2 = () => (
//   <div>
//     <h2>Step 2: Contact Information</h2>
//     <input type="email" placeholder="Enter your email" />
//   </div>
// );

// const Step3 = () => (
//   <div>
//     <h2>Step 3: Confirmation</h2>
//     <p>Review and confirm your details.</p>
//   </div>
// );

// // Define wizard steps with conditions and validation if needed.
// const steps: WizardStep[] = [
//   {
//     id: 'step-1',
//     title: 'Step 1',
//     render: () => <Step1 />,
//     // Simple validation: require nonempty input (for demo)
//     validate: (data) => data && data.name && data.name.length >= 3,
//   },
//   {
//     id: 'step-2',
//     title: 'Step 2',
//     render: () => <Step2 />,
//     condition: (stepData) => {
//       // Only show step 2 if step 1 data exists
//       return !!stepData['step-1']?.name;
//     },
//   },
//   {
//     id: 'step-3',
//     title: 'Step 3',
//     render: () => <Step3 />,
//   },
// ];

// // Define a custom theme (optional).
// const customTheme = {
//   container: 'p-8 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg',
//   button: 'px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600',
//   buttonDisabled: 'opacity-50 cursor-not-allowed',
//   error: 'text-red-600',
// };

// const WizardExample = () => {
//   return (
//     <WizardProvider
//       steps={steps}
//       theme={customTheme}
//       hooks={{
//         onStepEnter: (current, prev) =>
//           console.log(`Entering ${current} from ${prev}`),
//         onStepLeave: (current, next) =>
//           console.log(`Leaving ${current} to ${next}`),
//         onWizardComplete: (data) =>
//           console.log('Wizard completed with data:', data),
//       }}
//     >
//       <Wizard />
//     </WizardProvider>
//   );
// };

// export default WizardExample;

// // src/components/Wizard/WizardExample.tsx

// 'use client';

// import React, { useState } from 'react';
// import { Wizard, WizardProvider, useWizard, useWizardStep } from './';
// import { WizardStep } from './types';

// const WizardExample: React.FC = () => {
//   // Define the steps for the wizard.
//   const [steps, setSteps] = useState<WizardStep[]>([
//     {
//       id: 'step1',
//       title: 'Basic Information',
//       render: () => <Step1 />,
//     },
//     {
//       id: 'step2',
//       title: 'Preferences',
//       render: () => <Step2 />,
//     },
//     {
//       id: 'step3',
//       title: 'Review & Submit',
//       render: () => <Step3 />,
//     },
//   ]);

//   // Example of dynamically adding a step.
//   const addDynamicStep = () => {
//     setSteps((prevSteps) => [
//       ...prevSteps,
//       {
//         id: 'dynamic',
//         title: 'Dynamic Step',
//         render: () => <DynamicStep />,
//       },
//     ]);
//   };

//   // Example of theming the wizard.
//   const theme = {
//     container: 'bg-gray-100 p-4 rounded-lg shadow-md',
//     step: 'p-6 bg-white rounded-lg border border-gray-300',
//     activeStep: 'border-blue-500',
//     button: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
//     buttonDisabled: 'opacity-50 cursor-not-allowed',
//     controls: 'mt-4 flex justify-between',
//   };

//   return (
//     <WizardProvider steps={steps} theme={theme}>
//       <Wizard />
//       <button
//         onClick={addDynamicStep}
//         className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//       >
//         Add Dynamic Step
//       </button>
//     </WizardProvider>
//   );
// };

// export default WizardExample;

// // Step 1: Basic Information
// const Step1: React.FC = () => {
//   const { setData, data } = useWizardStep<any, 'step1'>('step1');
//   return (
//     <div>
//       <h2 className="text-xl font-bold">Step 1: Basic Information</h2>
//       <label>
//         Name:
//         <input
//           type="text"
//           value={data?.name || ''}
//           onChange={(e) => setData({ name: e.target.value })}
//           className="border p-2 rounded w-full mt-2"
//         />
//       </label>
//     </div>
//   );
// };

// // Step 2: Preferences
// const Step2: React.FC = () => {
//   const { setData, data } = useWizardStep<any, 'step2'>('step2');
//   return (
//     <div>
//       <h2 className="text-xl font-bold">Step 2: Preferences</h2>
//       <label>
//         Choose your preference:
//         <select
//           value={data?.preference || ''}
//           onChange={(e) => setData({ preference: e.target.value })}
//           className="border p-2 rounded w-full mt-2"
//         >
//           <option value="">Select...</option>
//           <option value="option1">Option 1</option>
//           <option value="option2">Option 2</option>
//         </select>
//       </label>
//     </div>
//   );
// };

// // Step 3: Review & Submit
// const Step3: React.FC = () => {
//   const { stepData } = useWizard();
//   return (
//     <div>
//       <h2 className="text-xl font-bold">Step 3: Review & Submit</h2>
//       <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(stepData, null, 2)}</pre>
//     </div>
//   );
// };

// // Dynamic Step
// const DynamicStep: React.FC = () => {
//   return (
//     <div>
//       <h2 className="text-xl font-bold">Dynamic Step</h2>
//       <p>This step was added dynamically.</p>
//     </div>
//   );
// };