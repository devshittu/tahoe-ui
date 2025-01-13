import React from 'react';

type IconProps = {
  icon: JSX.Element;
  foregroundColor?: string;
  backgroundColor?: string;
  useBackground?: boolean;
  size?: number;
  rounded?: 'full' | 'half' | 'none';
  className?: string;
  strokeWidth?: number;
};

const Icon = ({
  icon,
  size = 24,
  rounded = 'none',
  useBackground = false,
  ...props
}: IconProps) => {
  const roundedStyle = () => {
    if (rounded === 'full') return 'rounded-full';
    else if (rounded === 'half') return 'rounded-md';
    else return 'rounded-none';
  };
  return (
    <span
      className={`flex justify-center items-center 
      ${roundedStyle()} 
      ${useBackground && 'bg-slate-200 dark:bg-slate-700'}
      `}
    >
      {React.cloneElement(icon, {
        ...props,
      })}
    </span>
  );
};

export default Icon;
