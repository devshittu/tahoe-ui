'use client';
import React from 'react';
import Icon from '../illustrations/Icon';
import { FiCommand } from 'react-icons/fi';
import BaseImage from '../Image/BaseImage';

export const LoadingSplash: React.FC = () => {
  return (
    <>
      <div className="flex h-96 justify-center items-center relative">
        <IconBlockScale />
        <IconGrow />
      </div>
    </>
  );
};

interface IconBlockScaleProps {
  logoImage?: string;
  logoColor?: string;
}

export const IconBlockScale: React.FC<IconBlockScaleProps> = ({
  logoImage,
  logoColor = 'text-cyan-500',
}) => (
  <div className="icon block w-44 h-44 p-4 bg-cyan-200 dark:bg-cyan-700 rounded-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
    <div className="flex justify-center items-center h-full">
      {logoImage ? (
        <BaseImage
          src={logoImage}
          alt="Splash Logo"
          fill
          // width={44}
          // height={44}
          priority
          // Using Tailwind classes for object fitting and overriding the default color if needed
          className={`w-full h-full object-contain ${logoColor}`}
        />
      ) : (
        <Icon
          icon={
            <FiCommand
              className="w-12 h-12 overflow-visible animate-loader-dash stroke-current"
              style={{ strokeDasharray: '0 129' }}
            />
          }
        />
      )}
    </div>
  </div>
);

interface IconGrowProps {
  animationDuration?: string;
  animationEasing?: string;
}

export const IconGrow: React.FC<IconGrowProps> = ({
  animationDuration = '2.5s',
  animationEasing = 'cubic-bezier(.8,0,.3,1)',
}) => (
  <div
    className="icon block w-44 h-44 p-4 bg-cyan-200 dark:bg-cyan-700 rounded-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 icon_grow z-0 animate-loader-grow"
    style={{
      animationDuration,
      animationTimingFunction: animationEasing,
    }}
  />
);
// src/components/SplashScreen/loading-splash.tsx
