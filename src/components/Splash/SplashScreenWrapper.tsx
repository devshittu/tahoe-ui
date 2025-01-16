// 'use client';
// import React, { ReactNode } from 'react';
// import withSplashScreen from './HOC/withSplashScreen';

// type SplashScreenWrapperProps = {
//   children: ReactNode;
// };

// export const SplashScreenWrapper: React.FC<SplashScreenWrapperProps> = ({
//   children,
// }) => {
//   const ChildrenComponent: React.FC<SplashScreenWrapperProps> = ({
//     children,
//   }) => <>{children}</>;

//   const ChildrenWithSplash = withSplashScreen(ChildrenComponent);

//   return <ChildrenWithSplash>{children}</ChildrenWithSplash>;
// };

// export default SplashScreenWrapper;
// src/components/SplashScreen/SplashScreenWrapper.tsx
'use client';
import React, { ReactNode } from 'react';
import withSplashScreen from './HOC/withSplashScreen';
import type { SplashScreenConfig } from './types';

export type SplashScreenWrapperProps = {
  children: ReactNode;
  /** Optional configuration for the splash screen */
  splashConfig?: SplashScreenConfig;
};

export const SplashScreenWrapper: React.FC<SplashScreenWrapperProps> = ({
  children,
  splashConfig,
}) => {
  const ChildrenComponent: React.FC<SplashScreenWrapperProps> = ({
    children,
    splashConfig,
  }) => <>{children}</>;

  const ChildrenWithSplash = withSplashScreen(ChildrenComponent);

  return (
    <ChildrenWithSplash splashConfig={splashConfig}>
      {children}
    </ChildrenWithSplash>
  );
};
// Path: src/components/SplashScreen/SplashScreenWrapper.tsx
