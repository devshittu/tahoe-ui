'use client';

import React, { useEffect } from 'react';
import { withSplashScreen } from './HOC/withSplashScreen';
import type { SplashConfig } from './splash-config';
import { useSplashStore } from './store/splash-store';

type SplashScreenWrapperProps = {
  children: React.ReactNode;
  config?: Partial<SplashConfig>;
};

export const SplashScreenWrapper: React.FC<SplashScreenWrapperProps> = ({
  children,
  config = {},
}) => {
  const { setConfig } = useSplashStore();

  useEffect(() => {
    setConfig(config);
  }, [config, setConfig]);

  const ChildrenComponent: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <>{children}</>;

  const ChildrenWithSplash = withSplashScreen(ChildrenComponent);

  return <ChildrenWithSplash>{children}</ChildrenWithSplash>;
};

export default SplashScreenWrapper;

// src/components/Splash/SplashScreenWrapper.tsx
