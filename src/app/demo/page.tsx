'use client';

import React, { useState } from 'react';
import Player2 from './music/Player2';

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <Player2 />
      </div>
    </div>
  );
}
