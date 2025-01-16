// src/components/SplashScreen/SplashScreen.stories.tsx

import React, { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SplashScreenWrapper } from './SplashScreenWrapper';
import { AppProvider } from '@/providers/app';
import { useSplashStore } from './store/SplashScreenStore';

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
    // Enable dark mode in Storybook
    darkMode: {
      // Overrides the default theme for dark mode
      current: 'dark',
      dark: {
        /* custom dark theme settings if any */
      },
      light: {
        /* custom light theme settings if any */
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SplashScreenWrapper>;

/**
 * Helper Component to Reset SplashScreen
 * This allows us to programmatically reset the splash screen in certain stories.
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
 * Displays the splash screen on initial load, then shows the main content after 2 seconds.
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
 * Reset SplashScreen Story
 * Allows users to reset the splash screen and observe its reappearance.
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
 * Demonstrates the splash screen in dark mode.
 * Ensure that Storybook's Dark Mode addon is enabled.
 */
export const ThemedSplashScreen: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Themed App Content</h1>
      <p className="mt-4 text-lg">
        This is the main content displayed after the themed splash screen
        disappears.
      </p>
    </div>
  ),
  parameters: {
    // Override the default theme to dark for this story
    backgrounds: { default: 'dark' },
  },
};

/**
 * Multiple SplashScreens Story
 * Allows users to show and hide the splash screen multiple times.
 */
export const MultipleSplashScreens: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-3xl font-bold">Multiple SplashScreen Control</h1>
      <p className="text-lg">
        Use the button below to reset and display the splash screen again.
      </p>
      <ResetSplashButton />
    </div>
  ),
};
