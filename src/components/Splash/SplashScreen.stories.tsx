import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SplashScreenWrapper } from './SplashScreenWrapper';
import { AppProvider } from '@/providers/app';
import { SplashScreenConfig } from './types';
import { useSplashStore } from './store/SplashScreenStore';
import { FiCommand } from 'react-icons/fi';
import { TfiLayoutAccordionList } from 'react-icons/tfi';

/**
 * Meta Configuration for SplashScreen Stories
 */
const meta: Meta<typeof SplashScreenWrapper> = {
  title: 'UI/Overlays/SplashScreen',
  component: SplashScreenWrapper,
  decorators: [
    (Story) => (
      <AppProvider>
        <SplashScreenWrapper>
          <Story />
        </SplashScreenWrapper>
      </AppProvider>
    ),
  ],
  parameters: {
    darkMode: {
      current: 'dark',
      dark: {},
      light: {},
    },
  },
};

export default meta;
type Story = StoryObj<typeof SplashScreenWrapper>;

/**
 * Helper Component to Reset SplashScreen
 */
const ResetSplashButton: React.FC = () => {
  const { setHasShownSplash } = useSplashStore();

  const handleReset = () => {
    setHasShownSplash(false);
  };

  return (
    <button
      onClick={handleReset}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
    >
      Reset Splash Screen
    </button>
  );
};

/**
 * Default SplashScreen Story
 */
export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to the App!</h1>
      <p className="mt-4 text-lg">
        This is the main content displayed after the splash screen disappears.
      </p>
    </div>
  ),
};

/**
 * Custom Config SplashScreen Story
 */
export const CustomSplashScreen: Story = {
  render: () => {
    const customConfig: SplashScreenConfig = {
      svgIcon: <TfiLayoutAccordionList />,
      enableGrowingAnimation: true,
      animationDuration: '4s',
      animationEasing: 'ease-in-out',
      colorPreset: 'blue',
      text: 'Welcome to Magic!',
      textColor: 'accent',
      backgroundColor: 'bg-gray-50 dark:bg-gray-900',
    };

    return (
      <SplashScreenWrapper splashConfig={customConfig}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold">Main Application Content</h1>
          <p className="mt-4 text-lg">
            Splash screen was customized with advanced features.
          </p>
        </div>
      </SplashScreenWrapper>
    );
  },
};

/**
 * Reset SplashScreen Story
 */
export const ResetSplashScreen: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Main Application Content</h1>
      <p className="mt-4 text-lg">
        This is the main content displayed after the splash screen disappears.
      </p>
      <ResetSplashButton />
    </div>
  ),
};

/**
 * Themed SplashScreen Story
 */
export const ThemedSplashScreen: Story = {
  render: () => {
    const themeConfig: SplashScreenConfig = {
      logoImage: '/custom-logo.png',
      enableGrowingAnimation: true,
      animationDuration: '3s',
      colorPreset: 'purple',
      backgroundColor: 'bg-slate-800 dark:bg-black',
      text: 'Themed Splash Screen in Dark Mode',
      textColor: 'primary',
    };

    return (
      <SplashScreenWrapper splashConfig={themeConfig}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold">Dark Mode Enabled</h1>
          <p className="mt-4 text-lg">
            The splash screen is themed for dark mode.
          </p>
        </div>
      </SplashScreenWrapper>
    );
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Advanced SplashScreen Story
 */
export const AdvancedSplashScreen: Story = {
  render: () => {
    const advancedConfig: SplashScreenConfig = {
      svgIcon: <FiCommand className="text-blue-500" />,
      enableGrowingAnimation: true,
      animationDuration: '5s',
      animationEasing: 'ease-in',
      colorPreset: 'cyan',
      text: 'Advanced SplashScreen Loading...',
      textColor: 'primary',
      backgroundColor: 'bg-white dark:bg-gray-950',
    };

    return (
      <SplashScreenWrapper splashConfig={advancedConfig}>
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
          <h1 className="text-3xl font-bold">Advanced Features in Action</h1>
          <p className="text-lg">
            This advanced splash screen demonstrates custom animations and text.
          </p>
        </div>
      </SplashScreenWrapper>
    );
  },
};
