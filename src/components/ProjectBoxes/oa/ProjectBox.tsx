// src/components/ProjectBox.tsx

'use client';

import React from 'react';
import { FC } from 'react';
import AvatarImage from '@/components/Image/AvatarImage';
import { FiMoreVertical, FiPlus } from 'react-icons/fi';
import { Project } from './types';
import StackedAvatars from '@/components/Image/StackedAvatars';
import StackedAvatar from '@/components/Image/StackedAvatars';

type ViewMode = 'grid' | 'list';

type ProjectBoxProps = {
  project: Project;
  viewMode: ViewMode;
};

const ProjectBox: FC<ProjectBoxProps> = ({ project, viewMode }) => {
  const handleAddParticipant = () => {
    // Implement your add participant logic here
    console.log('Add participant');
  };
  return (
    <div
      className={`project-box ${
        viewMode === 'grid' ? 'w-full lg:w-1/3x md:w-1/2x p-2x' : 'w-full p-2'
      }`}
      style={{
        backgroundColor: project.backgroundColor,
        borderRadius: '30px',
        padding: '16px',
      }}
    >
      <div className="project-box-header flex justify-between items-center mb-4 text-main-color">
        <span className="text-gray-600 text-sm sm:text-base">
          {project.date}
        </span>
        <div className="more-wrapper relative">
          <button className="project-btn-more p-0 h-6 w-6 relative bg-transparent border-none flex-shrink-0">
            <FiMoreVertical className="w-6 h-6 text-currentColor" />
          </button>
        </div>
      </div>
      <div className="project-box-content-header text-center mb-4">
        <p className="box-content-header text-lg sm:text-xl font-bold opacity-70">
          {project.title}
        </p>
        <p className="box-content-subheader text-sm sm:text-base opacity-70">
          {project.subtitle}
        </p>
      </div>
      <div className="box-progress-wrapper flex flex-col flex-1">
        <p className="box-progress-header text-sm sm:text-base font-bold">
          Progress
        </p>
        <div className="box-progress-bar w-full h-1.5 bg-white rounded-full my-2">
          <span
            className="box-progress block h-1.5 rounded-full"
            style={{
              width: `${project.progress.percentage}%`,
              backgroundColor: project.progress.color,
            }}
          ></span>
        </div>
        <p className="box-progress-percentage text-sm sm:text-base font-bold text-right">
          {project.progress.percentage}%
        </p>
      </div>
      <div className="project-box-footer flex justify-between items-center pt-4 relative">
        <div className="participants flex items-center">
          <StackedAvatar
            items={project.participants}
            max={4}
            size="md"
            className="mb-2"
            onAdd={handleAddParticipant}
          />
          <button className="add-participant w-5 h-5 rounded-full border-none bg-white bg-opacity-60 ml-1 flex justify-center items-center">
            <FiPlus className="w-3 h-3 text-main-color" />
          </button>
        </div>
        <div className="days-left text-xs sm:text-sm font-bold rounded-full bg-white bg-opacity-60 px-3 py-1 text-main-color">
          {project.daysLeft} Days Left
        </div>
      </div>
    </div>
  );
};

export default ProjectBox;
