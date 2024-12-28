// 'use client';

// import React, { ReactNode } from 'react';
// import Text from './Text';

// type HighlightProps = {
//   children: ReactNode;
//   bgColor?: string;
//   textColor?: 'primary' | 'secondary' | 'accent' | string;
//   padding?: string;
//   className?: string;
// };

// const Highlight = ({
//   children,
//   bgColor = 'yellow-200',
//   textColor = 'primary',
//   padding = 'px-1',
//   className = '',
// }: HighlightProps) => {
//   return (
//     <Text
//       background={bgColor}
//       color={textColor}
//       padding={padding}
//       className={className}
//     >
//       {children}
//     </Text>
//   );
// };

// export default Highlight;

'use client';

import React, { ReactNode } from 'react';
import Text from './Text';
import clsx from 'clsx';

type HighlightProps = {
  children: ReactNode;
  bgColor?: string;
  textColor?: 'primary' | 'secondary' | 'accent' | string;
  padding?: string;
  className?: string;
};

const Highlight = ({
  children,
  bgColor = 'yellow-200',
  textColor = 'primary',
  padding = 'px-1',
  className = '',
}: HighlightProps) => {
  const computedClassName = clsx(
    `bg-${bgColor}`,
    `text-${textColor}`,
    padding,
    className
  );

  return (
    <Text className={computedClassName}>
      {children}
    </Text>
  );
};

export default Highlight;


// src/components/Typography/Highlight.tsx