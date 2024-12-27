
// src/components/Typography/WelcomeScreen.tsx
'use client';

import React from 'react';
import { FlexBox, StackBox, BaseBox } from '@/components/Box'; 
import {
  Heading,
  Paragraph,
  Span,
  LinkText,
} from '@/components/Typography';

type ScreenProps = {
  onContinue: () => void;
};

export const WelcomeScreen: React.FC<ScreenProps> = ({ onContinue }) => {
  return (
    <FlexBox
      // theme="dark"
      direction="col"
      align="center"
      justify="center"
      className="min-h-screen w-full px-6 md:px-12"
    >
      <StackBox direction="col" gap="6" className="max-w-md text-center">
        <BaseBox as="img"
          src="/apple-music-icon.png"
          alt="Apple Music Logo"
          width="auto"
          height="auto"
          className="mx-auto w-16 h-16"
        />

        <Heading level={1}>
          Welcome to <Span className="text-red-500">Apple Music</Span>
        </Heading>

        <Paragraph className="text-gray-400 text-sm md:text-base">
          Play millions of songs and thousands of playlists ad-free on all your devices.
          Download music to listen offline. Experience sound all around you with Spatial Audio.
        </Paragraph>

        <StackBox direction="col" gap="2" className="text-xs text-gray-400">
          <Paragraph>
            Your searches, browsing, purchases, and device trust score help improve the service
            and prevent fraud. If you subscribe, we also use your music library and what you play
            to personalize your experience and send you notifications.
          </Paragraph>
          <Paragraph>
            Your device serial number may be used to check eligibility for offers, and your device
            phone number may be used to check for Music subscriptions through your mobile network
            provider.{' '}
            <LinkText href="/data-management" className="text-red-500 underline">
              See how your data is managed.
            </LinkText>
          </Paragraph>
        </StackBox>

        <BaseBox as="button"
          onClick={onContinue}
          className="w-full py-2 bg-red-500 rounded-lg font-medium text-sm text-white hover:bg-red-600 transition-all"
        >
          Continue
        </BaseBox>
      </StackBox>
    </FlexBox>
  );
};

export const WhatsNewScreen: React.FC<ScreenProps> = ({ onContinue }) => {
  return (
    <FlexBox
      theme="dark"
      direction="col"
      align="center"
      justify="center"
      className="min-h-screen w-full px-6 md:px-12"
    >
      <StackBox direction="col" gap="6" className="max-w-md text-center">
        <Heading level={1}>{"What's New in Apple Music"}</Heading>

        <StackBox direction="col" gap="4">
          <FlexBox align="center" gap="3">
            <BaseBox
              className="w-8 h-8 bg-red-500 flex items-center justify-center rounded-full"
            >
              <Span className="text-white text-lg font-bold">*</Span>
            </BaseBox>
            <Paragraph className="text-sm md:text-base">
              <Span fontWeight="bold">Favourite Songs Playlist:</Span>{' '}
              Favourite a song, and it will be added to your Favourite Songs Playlist.
            </Paragraph>
          </FlexBox>

          <FlexBox align="center" gap="3">
            <BaseBox
              className="w-8 h-8 bg-red-500 flex items-center justify-center rounded-full"
            >
              <Span className="text-white text-lg font-bold">+</Span>
            </BaseBox>
            <Paragraph className="text-sm md:text-base">
              <Span fontWeight="bold">Now in Your Library:</Span>{' '}
              Music you favourite is automatically added to your library.
            </Paragraph>
          </FlexBox>
        </StackBox>

        <BaseBox as="button"
          onClick={onContinue}
          className="w-full py-2 bg-red-500 rounded-lg font-medium text-sm text-white hover:bg-red-600 transition-all"
        >
          Continue
        </BaseBox>
      </StackBox>
    </FlexBox>
  );
};