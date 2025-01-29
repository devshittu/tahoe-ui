// src/components/ProjectsSection.tsx

'use client';

import React from 'react';
import { FC } from 'react';
import ViewToggle from './ViewToggle';
import { Project } from './types';

import { DisplaySmall, Heading } from '@/components/Typography';

type ProjectsSectionProps = {
  projects: Project[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  children?: React.ReactNode;

  title?: string;
  date?: string;
};

const ProjectsSection: FC<ProjectsSectionProps> = ({
  title = `Projects`,
  date = 'Dec 12',
  projects,
  viewMode,
  setViewMode,
  children,
}) => {
  // Calculate project counts
  const inProgress = projects.filter(
    (project) => project.progress.percentage < 100,
  ).length;
  const upcoming = projects.length - inProgress;
  const totalProjects = projects.length;

  // Get current date for header (adjust as needed)
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="projects-section bg-projects-section dark:bg-dark-projects-section rounded-[32px] p-8 md:p-8 sm:p-6 flex flex-col h-full">
      {/* Projects Header */}
      <div className="projects-section-header sticky top-0 bg-projects-section dark:bg-dark-projects-section z-10 py-4x">
        {/* Section Header */}
        <div className="projects-section-header flex justify-between items-center mb-6 sm:mb-4">
          <Heading level={2} color="accent">
            {title}
          </Heading>
          <DisplaySmall color="secondary">{currentDate}</DisplaySmall>
        </div>
      </div>

      {/* Projects Status and View Toggle */}
      <div className="projects-section-line flex flex-col md:flex-row justify-between items-center mb-8">
        {/* Status Bar */}
        <div className="projects-status flex space-x-4 mb-4 md:mb-0">
          <div className="item-status relative flex flex-col items-start">
            <span className="status-number text-2xl md:text-2xl sm:text-xl font-bold text-main-color dark:text-dark-main-color">
              {inProgress}
            </span>
            <span className="status-type text-lg md:text-lg sm:text-base text-secondary-color dark:text-dark-secondary-color">
              In Progress
            </span>
          </div>
          <div className="item-status relative flex flex-col items-start">
            <span className="status-number text-2xl md:text-2xl sm:text-xl font-bold text-main-color dark:text-dark-main-color">
              {upcoming}
            </span>
            <span className="status-type text-lg md:text-lg sm:text-base text-secondary-color dark:text-dark-secondary-color">
              Upcoming
            </span>
          </div>
          <div className="item-status relative flex flex-col items-start">
            <span className="status-number text-2xl md:text-2xl sm:text-xl font-bold text-main-color dark:text-dark-main-color">
              {totalProjects}
            </span>
            <span className="status-type text-lg md:text-lg sm:text-base text-secondary-color dark:text-dark-secondary-color">
              Total Projects
            </span>
          </div>
        </div>

        {/* View Toggle */}
        <div className="view-actions">
          <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
        </div>
      </div>

      {/* Project Boxes */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default ProjectsSection;
