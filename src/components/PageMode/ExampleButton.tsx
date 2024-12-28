'use client';

import React, { useState } from 'react';
import { useUIComponent } from '@/stores/useUIComponent';
import { DialogExampleTrigger } from '../Dialog/DialogExampleTrigger';
import { WelcomeScreen, WhatsNewScreen } from '@/app/playground/WelcomeScreen';

export function ExampleButton() {
  const [currentScreen, setCurrentScreen] = useState<
    'welcome' | 'whatsNew' | 'mainContent' | null
  >('welcome');

  const handleContinue = () => {
    setCurrentScreen((prev) =>
      prev === 'welcome' ? 'whatsNew' : 'mainContent',
    );
  };
  const { open } = useUIComponent();
  return (
    <>
      <button
        onClick={() =>
          open(
            <div>
              Example Page Mode Content!
              <DialogExampleTrigger />
              <>
                {currentScreen === 'welcome' && (
                  <WelcomeScreen onContinue={handleContinue} />
                )}
                {currentScreen === 'whatsNew' && (
                  <WhatsNewScreen onContinue={handleContinue} />
                )}
                <DialogExampleTrigger />
                <DialogExampleTrigger />
              </>
            </div>,
          )
        }
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Page Mode
      </button>
    </>
  );
}
