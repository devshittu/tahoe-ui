'use client';

import React from 'react';

type StyledTextProps = {
  text: string;
  highlight: string;
  highlightClass?: string;
  className?: string;
};

export const StyledText: React.FC<StyledTextProps> = ({
  text,
  highlight,
  highlightClass = 'text-red-500',
  className = '',
}) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className={highlightClass}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
};
