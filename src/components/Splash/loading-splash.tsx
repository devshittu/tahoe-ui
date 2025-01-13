'use client';
import Icon from '../illustrations/Icon';
import { FiCommand } from "react-icons/fi";


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

export const IconBlockScale = () => (
  <div
    className={`icon block w-44 h-44 p-4  bg-cyan-200 dark:bg-cyan-700 text-cyan-500 rounded-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`}
  >
    <div className={`flex justify-center items-center h-full`}>
      <Icon
        icon={
          <>
          <FiCommand
              className="w-12 h-12 overflow-visible animate-loader-dash stroke-current"
              style={{
                strokeDasharray: '0 129',
              }} />
          </>
        }
      />
    </div>
  </div>
);
export const IconGrow = () => (
  <div
    className={` icon block w-44 h-44 p-4 bg-cyan-200 dark:bg-cyan-700 rounded-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   
        icon_grow z-0 animate-loader-grow
        `}
  />
);

// src/components/Splash/loading-splash.tsx
