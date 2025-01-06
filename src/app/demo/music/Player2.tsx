// app/components/Player2.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import styles from './Player2.module.css';

// Define the Track type
type Track = {
  artist: string;
  name: string;
  albumArt: string;
};

// Sample track data
const track: Track = {
  artist: 'Flume',
  name: 'Say It',
  albumArt: 'https://i.scdn.co/image/9dcbd30dbe0c621cbaeae427cf80eff9877b4fcd',
};

const Player2: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(10); // Example progress

  // Toggle play/pause state
  const togglePlay = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className="player relative">
      {/* Info Bar */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            id="info"
            className="info absolute top-0 left-2.5 right-2.5 bg-white bg-opacity-50 p-4 pl-28 rounded-[15px] transition-all duration-500 z-0"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -70 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.5 }}
          >
            <span className="artist block text-gray-800 text-base mb-1">
              {track.artist}
            </span>
            <span className="name block text-gray-500 text-sm mb-2">
              {track.name}
            </span>
            <div className="progress-bar bg-gray-300 h-0.5 w-full relative">
              <motion.div
                className="bar bg-red-500 h-full absolute left-0 top-0"
                style={{ width: `${progress}%` }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Panel */}
      <motion.div
        id="control-panel"
        className={`control-panel relative bg-white rounded-[15px] w-72 h-20 z-10 shadow-lg`}
      >
        {/* Album Art */}
        <motion.div
          className={`album-art absolute left-5 -top-4 h-20 w-20 rounded-[50%] overflow-hidden ${styles.albumArt}`}
          animate={{
            boxShadow: isActive
              ? '0px 0px 20px 5px rgba(0, 0, 0, 0.2)'
              : '0px 0px 20px 5px rgba(0, 0, 0, 0)',
            transform: isActive ? 'scale(1.2)' : 'scale(1)',
            rotate: isActive ? 360 : 0,
          }}
          transition={
            isActive
              ? {
                  rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                  boxShadow: { duration: 0.5 },
                  transform: { duration: 0.5 },
                }
              : { duration: 0.5 }
          }
        >
          {/* The actual image is handled by ::before in CSS */}
          <Image
            src={track.albumArt}
            alt={`${track.artist} - ${track.name}`}
            width={80}
            height={80}
            className="object-cover hidden" // Hidden since background image is used
          />
        </motion.div>

        {/* Controls */}
        <div className="controls flex justify-end items-center h-full px-4 space-x-2">
          {/* Previous Button */}
          <button
            className="prev p-2 bg-white rounded-lg hover:bg-gray-200 transition-colors duration-300"
            aria-label="Previous"
          >
            <FaBackward className="w-5 h-5 text-gray-700" />
          </button>

          {/* Play/Pause Button */}
          <button
            id="play"
            className="play p-2 bg-white rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
            onClick={togglePlay}
            aria-label={isActive ? 'Pause' : 'Play'}
          >
            {isActive ? (
              <FaPause className="w-5 h-5 text-gray-700" />
            ) : (
              <FaPlay className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Next Button */}
          <button
            className="next p-2 bg-white rounded-lg hover:bg-gray-200 transition-colors duration-300"
            aria-label="Next"
          >
            <FaForward className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Player2;

// src/app/demo/music/Player2.tsx
