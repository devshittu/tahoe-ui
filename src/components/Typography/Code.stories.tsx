// src/components/Typography/Code.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Code, { CodeProps } from './Code';
import { AppProvider } from '@/providers/app';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const meta: Meta<typeof Code> = {
  title: 'Typography/Code',
  component: Code,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and max width for better visualization */}
        <div className="p-4 space-y-6 max-w-2xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    children: 'console.log("Hello, World!");',
    language: 'javascript',
    theme: 'default',
    showLineNumbers: false,
    className: '',
    wrapLines: false,
    ariaLabel: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Code snippet to display within the Code component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'console.log("Hello, World!");' },
      },
    },
    language: {
      control: 'select',
      options: [
        'javascript',
        'python',
        'html',
        'css',
        'bash',
        'jsx',
        'typescript',
        'none',
      ],
      description: 'Programming language for syntax highlighting.',
      table: {
        type: {
          summary: `'javascript' | 'python' | 'html' | 'css' | 'bash' | 'jsx' | 'typescript' | 'none'`,
        },
        defaultValue: { summary: `'javascript'` },
      },
    },
    theme: {
      control: 'select',
      options: ['default', 'tomorrow', 'custom'],
      description: 'Theme for the code block.',
      table: {
        type: { summary: `'default' | 'tomorrow' | 'custom'` },
        defaultValue: { summary: `'default'` },
      },
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'If true, displays line numbers alongside the code.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    wrapLines: {
      control: 'boolean',
      description:
        'If true, wraps long lines of code instead of horizontally scrolling.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for accessibility.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CodeProps>;

/**
 * Default Code story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'console.log("Hello, World!");',
    language: 'javascript',
    theme: 'default',
    showLineNumbers: false,
    wrapLines: false,
  },
};

/**
 * Code with Python Language.
 */
export const PythonLanguage: Story = {
  args: {
    children: 'print("Hello, World!")',
    language: 'python',
    theme: 'default',
    showLineNumbers: false,
    wrapLines: false,
  },
};

/**
 * Code with HTML Language.
 */
export const HTMLLanguage: Story = {
  args: {
    children: '<div>Hello World</div>',
    language: 'html',
    theme: 'default',
    showLineNumbers: false,
    wrapLines: false,
  },
};

/**
 * Code with CSS Language.
 */
export const CSSLanguage: Story = {
  args: {
    children: 'color: red;',
    language: 'css',
    theme: 'default',
    showLineNumbers: false,
    wrapLines: false,
  },
};

/**
 * Code with Bash Language.
 */
export const BashLanguage: Story = {
  args: {
    children: 'ls -la',
    language: 'bash',
    theme: 'default',
    showLineNumbers: false,
    wrapLines: false,
  },
};

/**
 * Code with JSX Language.
 */
export const JSXLanguage: Story = {
  args: {
    children: '<App />',
    language: 'jsx',
    theme: 'default',
    showLineNumbers: false,
    wrapLines: false,
  },
};

/**
 * Code with TypeScript Language.
 */
export const TypeScriptLanguage: Story = {
  args: {
    children: 'const x: number = 10;',
    language: 'typescript',
    theme: 'default',
    showLineNumbers: false,
    wrapLines: false,
  },
};

/**
 * Code with No Language.
 */
export const NoLanguage: Story = {
  args: {
    children: 'Some inline code without language.',
    language: 'none',
    theme: 'default',
    showLineNumbers: false,
    wrapLines: false,
  },
};

/**
 * Code with Tomorrow Theme.
 */
export const TomorrowTheme: Story = {
  args: {
    children: 'console.log("Hello, Tomorrow Theme!");',
    language: 'javascript',
    theme: 'tomorrow',
    showLineNumbers: false,
    wrapLines: false,
  },
};

/**
 * Code with Line Numbers.
 */
export const WithLineNumbers: Story = {
  args: {
    children: `function greet() {
  console.log("Hello, World!");
}`,
    language: 'javascript',
    theme: 'default',
    showLineNumbers: true,
    wrapLines: false,
  },
};

/**
 * Code with Wrapped Lines.
 */
export const WrappedLines: Story = {
  args: {
    children: `const veryLongVariableName = "This is a very long line of code that should be wrapped within the code block to demonstrate line wrapping functionality in the component."`,
    language: 'javascript',
    theme: 'default',
    showLineNumbers: false,
    wrapLines: true,
  },
};

/**
 * Code with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    children: `const x = 10;
const y = 20;
console.log(x + y);`,
    language: 'javascript',
    theme: 'custom',
    showLineNumbers: true,
    wrapLines: true,
    className: 'bg-purple-100 text-purple-800 p-4 rounded-lg',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling and functionality.
 */
export const CombinedProps: Story = {
  args: {
    children: `def greet(name):
    print(f"Hello, {name}!")`,
    language: 'python',
    theme: 'custom',
    showLineNumbers: true,
    wrapLines: true,
    className: 'bg-green-100 text-green-800 p-4 rounded-md',
    ariaLabel: 'Python function to greet a user',
  },
};

/**
 * Showcase Story demonstrating multiple Code usages together.
 */
export const Showcase: Story = {
  render: (args: CodeProps) => (
    <div className="space-y-6">
      {/* 1) Default Code */}
      <Code {...args}>console.log(&quot;Hello, World!&quot;);</Code>

      {/* 2) Python Language */}
      <Code {...args} language="python">
        print(&quot;Hello, World!&quot;)
      </Code>

      {/* 3) HTML Language */}
      <Code {...args} language="html">
        &lt;div&gt;Hello World&lt;/div&gt;
      </Code>

      {/* 4) CSS Language */}
      <Code {...args} language="css">
        color: red;
      </Code>

      {/* 5) Bash Language */}
      <Code {...args} language="bash">
        ls -la
      </Code>

      {/* 6) JSX Language */}
      <Code {...args} language="jsx">
        &lt;App /&gt;
      </Code>

      {/* 7) TypeScript Language */}
      <Code {...args} language="typescript">
        const x: number = 10;
      </Code>

      {/* 8) No Language */}
      <Code {...args} language="none">
        Some inline code without language.
      </Code>

      {/* 9) Tomorrow Theme */}
      <Code {...args} theme="tomorrow">
        console.log(&quot;Hello, Tomorrow Theme!&quot;);
      </Code>

      {/* 10) With Line Numbers */}
      <Code {...args} showLineNumbers={true}>
        {`function greet() {
  console.log("Hello, World!");
}`}
      </Code>

      {/* 11) Wrapped Lines */}
      <Code {...args} wrapLines={true}>
        {`const veryLongVariableName = "This is a very long line of code that should be wrapped within the code block to demonstrate line wrapping functionality in the component."`}
      </Code>

      {/* 12) Custom ClassName */}
      <Code
        {...args}
        theme="custom"
        showLineNumbers={true}
        wrapLines={true}
        className="bg-purple-100 text-purple-800 p-4 rounded-lg"
      >
        {`const x = 10;
const y = 20;
console.log(x + y);`}
      </Code>

      {/* 13) Combined Props */}
      <Code
        {...args}
        language="python"
        theme="custom"
        showLineNumbers={true}
        wrapLines={true}
        className="bg-green-100 text-green-800 p-4 rounded-md"
        ariaLabel="Python function to greet a user"
      >
        {`def greet(name):
            print(f"Hello, {name}!")`}
      </Code>
    </div>
  ),
};
