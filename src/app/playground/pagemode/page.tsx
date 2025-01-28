// src/app/playground/box/page.tsx
'use client';

import { ExampleButton } from '@/components/PageMode/ExampleButton';
import ProjectBoxes from '@/components/ProjectBoxes/ProjectBoxes';
import WizardExample from '@/components/Wizard/WizardExample';
import React, { useState } from 'react';

const DemoPage = () => (
  <>
    <ExampleButton />

    <WizardExample />

    <ProjectBoxes
      viewMode="grid"
      projects={[
        {
          date: 'December 10, 2020',
          title: 'Web Design',
          subtitle: 'Prototyping',
          progress: 75,
          color: '#fee4cb',
          participants: [
            'https://loremflickr.com/40/40/portrait?random=1',
            'https://loremflickr.com/40/40/face?random=2',
          ],
          daysLeft: 2,
        },
        {
          date: 'December 11, 2020',
          title: 'Mobile App',
          subtitle: 'User Testing',
          progress: 45,
          color: '#e9e7fd',
          participants: [
            'https://loremflickr.com/40/40/person?random=3',
            'https://loremflickr.com/40/40/human?random=4',
          ],
          daysLeft: 3,
        },
        {
          date: 'December 12, 2020',
          title: 'Backend API',
          subtitle: 'Development',
          progress: 90,
          color: '#c8f7dc',
          participants: [
            'https://loremflickr.com/40/40/developer?random=5',
            'https://loremflickr.com/40/40/coder?random=6',
          ],
          daysLeft: 1,
        },
        {
          date: 'December 13, 2020',
          title: 'Database Design',
          subtitle: 'Optimization',
          progress: 65,
          color: '#ffd3e2',
          participants: [
            'https://loremflickr.com/40/40/tech?random=7',
            'https://loremflickr.com/40/40/server?random=8',
          ],
          daysLeft: 4,
        },
        {
          date: 'December 14, 2020',
          title: 'DevOps Pipeline',
          subtitle: 'CI/CD Setup',
          progress: 80,
          color: '#d5deff',
          participants: [
            'https://loremflickr.com/40/40/cloud?random=9',
            'https://loremflickr.com/40/40/network?random=10',
          ],
          daysLeft: 2,
        },
        {
          date: 'December 15, 2020',
          title: 'UI Components',
          subtitle: 'Implementation',
          progress: 95,
          color: '#dbf6fd',
          participants: [
            'https://loremflickr.com/40/40/designer?random=11',
            'https://loremflickr.com/40/40/artist?random=12',
          ],
          daysLeft: 5,
        },
      ]}
    />

    <ProjectBoxes
      viewMode="list"
      projects={[
        {
          date: 'December 16, 2020',
          title: 'E-commerce Platform',
          subtitle: 'Checkout Flow',
          progress: 55,
          color: '#e2d3ff',
          participants: [
            'https://loremflickr.com/40/40/ecommerce?random=13',
            'https://loremflickr.com/40/40/shopping?random=14',
          ],
          daysLeft: 3,
        },
        {
          date: 'December 17, 2020',
          title: 'Analytics Dashboard',
          subtitle: 'Data Visualization',
          progress: 70,
          color: '#cbf7d4',
          participants: [
            'https://loremflickr.com/40/40/analytics?random=15',
            'https://loremflickr.com/40/40/data?random=16',
          ],
          daysLeft: 2,
        },
      ]}
    />
  </>
);

export default DemoPage;
