'use client';
import React, { useState } from 'react';
import { WelcomeScreen, WhatsNewScreen } from './WelcomeScreen';

const PlaygroundPage = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'whatsNew'| 'mainContent'>(
    'welcome',
  );

  const handleContinue = () => {
    setCurrentScreen((prev) =>
      prev === 'welcome' ? 'whatsNew' : 'mainContent',
    );
  };

  return (
    <>
      {currentScreen === 'welcome' && (
        <WelcomeScreen onContinue={handleContinue} />
      )}
      {currentScreen === 'whatsNew' && (
        <WhatsNewScreen onContinue={handleContinue} />
      )}
    </>
  );
};

export default PlaygroundPage;
