// src/app/playground/box/page.tsx
'use client';

import { DialogExampleTrigger } from '@/components/Dialog/DialogExampleTrigger';
import { ExampleButton } from '@/components/PageMode/ExampleButton';
import TypographyExampleUsage from '@/components/Typography/TypographyExampleUsage';
import React, { useState } from 'react';

const DemoPage = () => (
  <>
    <DialogExampleTrigger />
    <TypographyExampleUsage />
  </>
);

export default DemoPage;
