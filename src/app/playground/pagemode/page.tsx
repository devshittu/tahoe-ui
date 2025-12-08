// src/app/playground/box/page.tsx
'use client';

import ProjectBoxes from '@/components/ProjectBoxes/oa/ProjectBoxes';
import ProjectsSection from '@/components/ProjectBoxes/oa/ProjectsSection';
import { Project } from '@/components/ProjectBoxes/oa/types';
import ViewToggle from '@/components/ProjectBoxes/oa/ViewToggle';
import WizardExample from '@/components/Wizard/WizardExample';
import React, { useState } from 'react';

const projects: Project[] = [
  {
    id: '1',
    date: 'December 10, 2020',
    title: 'Web Designing',
    subtitle: 'Prototyping',
    progress: { percentage: 60, color: '#ff942e' },
    color: '#ff942e',
    participants: [
      {
        id: 'p1',
        name: 'Alice',
        avatarUrl: 'https://loremflickr.com/40/40/portrait?random=1',
      },
      {
        id: 'p2',
        name: 'Bob',
        avatarUrl: 'https://loremflickr.com/40/40/portrait?random=2',
      },
    ],
    daysLeft: 2,
    backgroundColor: '#fee4cb',
  },
  {
    id: '2',
    date: 'December 10, 2020',
    title: 'Testing',
    color: '#4f3ff0',
    progress: { percentage: 50, color: '#4f3ff0' },
    subtitle: 'Testing',
    participants: [
      {
        id: 'p3',
        name: 'Charlie',
        avatarUrl: 'https://loremflickr.com/40/40/portrait?random=3',
      },
      {
        id: 'p4',
        name: 'David',
        avatarUrl: 'https://loremflickr.com/40/40/portrait?random=4',
      },
    ],
    daysLeft: 2,
    backgroundColor: '#e9e7fd',
  },
  {
    id: '3',
    date: 'December 10, 2020',
    color: '#096c86',
    subtitle: 'Prototyping',
    title: 'Prototyping',
    progress: { percentage: 80, color: '#096c86' },
    participants: [
      {
        id: 'p5',
        name: 'Eve',
        avatarUrl: 'https://loremflickr.com/40/40/portrait?random=5',
      },
      {
        id: 'p6',
        name: 'Frank',
        avatarUrl: 'https://loremflickr.com/40/40/portrait?random=6',
      },
    ],
    daysLeft: 2,
    backgroundColor: '#dbf6fd',
  },
  {
    id: '4',
    date: 'December 10, 2020',
    color: '#df3670',
    title: 'UI Development',
    subtitle: 'Prototyping',
    progress: { percentage: 20, color: '#df3670' },
    participants: [
      {
        id: 'p7',
        name: 'Grace',
        avatarUrl: 'https://loremflickr.com/40/40/portrait?random=7',
      },
      {
        id: 'p8',
        name: 'Hank',
        avatarUrl: 'https://loremflickr.com/40/40/portrait?random=8',
      },
    ],
    daysLeft: 2,
    backgroundColor: '#ffd3e2',
  },
  {
    id: '5',
    color: '#34c471',
    date: 'December 10, 2020',
    title: 'Data Analysis',
    subtitle: 'Prototyping',
    progress: { percentage: 60, color: '#34c471' },
    participants: [
      {
        id: 'p9',
        name: 'Isaac',
        avatarUrl: 'https://loremflickr.com/40/40/portrait?random=9',
      },
      {
        id: 'p10',
        name: 'Jack',
        avatarUrl: 'https://loremflickr.com/40/40/portrait?random=10',
      },
    ],
    daysLeft: 2,
    backgroundColor: '#c8f7dc',
  },
  {
    id: '6',
    color: '#4067f9',
    date: 'December 10, 2020',
    title: 'Web Designing',
    subtitle: 'Prototyping',
    progress: { percentage: 40, color: '#4067f9' },
    participants: [
      {
        id: 'p11',
        name: 'Karen',
        avatarUrl: 'https://loremflickr.com/40/40/portrait?random=11',
      },
      {
        id: 'p12',
        name: 'Leo',
        avatarUrl: 'https://loremflickr.com/40/40/portrait?random=12',
      },
    ],
    daysLeft: 2,
    backgroundColor: '#d5deff',
  },
];
const DemoPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // const viewMode = 'list';
  return (
    <>

      <WizardExample />

      <div className="container mx-auto p-4 bg-slate-200">
        <ProjectsSection
          projects={projects}
          viewMode={viewMode}
          setViewMode={setViewMode}
        >
          <div className="container mx-auto p-4">
            <ProjectBoxes projects={projects} viewMode={viewMode} />
          </div>
        </ProjectsSection>
      </div>
    </>
  );
};

export default DemoPage;
