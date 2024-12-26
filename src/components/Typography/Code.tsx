// 'use client';

// import React, { ReactNode, useEffect, useRef } from 'react';
// import Prism from 'prismjs';
// import 'prismjs/components/prism-jsx'; // Import additional languages as needed
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css'; // If using line numbers
// import 'prismjs/plugins/line-numbers/prism-line-numbers'; // Line numbers plugin
// import Text from './Text';

// type CodeProps = {
//   children: ReactNode;
//   language?: string;
//   theme?: 'default' | 'tomorrow' | 'custom';
//   showLineNumbers?: boolean;
//   className?: string;
//   wrapLines?: boolean;
// };

// const themeClasses: Record<CodeProps['theme'], string> = {
//   default: 'prism',
//   tomorrow: 'prism-tomorrow',
//   custom: '', // Add custom theme classes if any
// };

// const Code = ({
//   children,
//   language = 'javascript',
//   theme = 'default',
//   showLineNumbers = false,
//   className = '',
//   wrapLines = false,
// }: CodeProps) => {
//   const codeRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     if (codeRef.current) {
//       Prism.highlightElement(codeRef.current);
//     }
//   }, [children, language]);

//   return (
//     <pre
//       className={`${themeClasses[theme]} ${
//         showLineNumbers ? 'line-numbers' : ''
//       } ${wrapLines ? 'whitespace-pre-wrap' : 'whitespace-pre'} ${className}`}
//     >
//       <code ref={codeRef} className={`language-${language}`}>
//         {children}
//       </code>
//     </pre>
//   );
// };

// export default Code;

// src/components/Typography/Code.tsx// src/components/Typography/Code.tsx
'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx'; // Import additional languages as needed
import 'prismjs/components/prism-css'; // CSS
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'; // Line numbers CSS
import 'prismjs/plugins/line-numbers/prism-line-numbers'; // Line numbers plugin
import clsx from 'clsx';
import BaseBox from '../Box/BaseBox';

type CodeProps = {
  children: ReactNode;
  language?: string;
  theme?: 'default' | 'tomorrow' | 'custom';
  showLineNumbers?: boolean;
  className?: string;
  wrapLines?: boolean;
  ariaLabel?: string;
} & React.HTMLAttributes<HTMLElement>;

const themeClasses: Record<CodeProps['theme'], string> = {
  default: 'prism',
  tomorrow: 'prism-tomorrow',
  custom: '',
};

const Code = ({
  children,
  language = 'javascript',
  theme = 'default',
  showLineNumbers = false,
  className,
  wrapLines = false,
  ariaLabel,
  ...props
}: CodeProps) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children, language]);

  return (
    <BaseBox
      as="pre"
      className={clsx(
        themeClasses[theme],
        showLineNumbers ? 'line-numbers' : '',
        wrapLines ? 'whitespace-pre-wrap' : 'whitespace-pre',
        'overflow-x-auto',
        className
      )}
      aria-label={ariaLabel}
      suppressHydrationWarning
      {...props}
    >
      <code ref={codeRef} className={`language-${language}`}>
        {children}
      </code>
    </BaseBox>
  );
};

export default Code;
// src/components/Typography/Code.tsx