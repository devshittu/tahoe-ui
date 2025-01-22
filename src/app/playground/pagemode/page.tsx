// src/app/playground/box/page.tsx
'use client';

import { ExampleButton } from '@/components/PageMode/ExampleButton';
import WizardExample from '@/components/Wizard/WizardExample';
import React, { useState } from 'react';

const DemoPage = () => (
  <>
    <ExampleButton />

    <WizardExample />
  </>
);

export default DemoPage;
