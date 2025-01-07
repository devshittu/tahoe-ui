// src/components/Typography/Preformatted.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Preformatted, { PreformattedProps } from './Preformatted';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof Preformatted> = {
  title: 'Typography/Preformatted',
  component: Preformatted,
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
      description: 'Code snippet to display within the Preformatted component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'console.log("Hello, World!");' },
      },
    },
    language: {
      control: 'select',
      options: ['javascript', 'python', 'html', 'css', 'bash', 'none'],
      description: 'Programming language for syntax highlighting.',
      table: {
        type: {
          summary: `'javascript' | 'python' | 'html' | 'css' | 'bash' | 'none'`,
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
type Story = StoryObj<PreformattedProps>;

/**
 * Default Preformatted story demonstrating basic usage.
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
 * Preformatted with Python Language.
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
 * Preformatted with HTML Language.
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
 * Preformatted with CSS Language.
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
 * Preformatted with Bash Language.
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
 * Preformatted with No Language.
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
 * Preformatted with Tomorrow Theme.
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
 * Preformatted with Line Numbers.
 */
export const WithLineNumbers: Story = {
  args: {
    children: `function greet() {
  console.log(&quot;Hello, World!&quot;);
}`,
    language: 'javascript',
    theme: 'default',
    showLineNumbers: true,
    wrapLines: false,
  },
};

/**
 * Preformatted with Wrapped Lines.
 */
export const WrappedLines: Story = {
  args: {
    children: `const veryLongVariableName = "This is a very long line of code that should be wrapped within the preformatted block to demonstrate line wrapping functionality in the component."`,
    language: 'javascript',
    theme: 'default',
    showLineNumbers: false,
    wrapLines: true,
  },
};

/**
 * Preformatted with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    children: `const x = 10;\nconst y = 20;\nconsole.log(x + y);`,
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
 * Showcase Story demonstrating multiple Preformatted usages together.
 */
export const Showcase: Story = {
  render: (args: PreformattedProps) => (
    <div className="space-y-6">
      {/* 1) Default Preformatted */}
      <Preformatted {...args}>
        console.log(&quot;Hello, World!&quot;);
      </Preformatted>

      {/* 2) Python Language */}
      <Preformatted {...args} language="python">
        print(&quot;Hello, World!&quot;)
      </Preformatted>

      {/* 3) HTML Language */}
      <Preformatted {...args} language="html">
        &lt;div&gt;Hello World&lt;/div&gt;
      </Preformatted>

      {/* 4) CSS Language */}
      <Preformatted {...args} language="css">
        color: red;
      </Preformatted>

      {/* 5) Bash Language */}
      <Preformatted {...args} language="bash">
        ls -la
      </Preformatted>

      {/* 6) No Language */}
      <Preformatted {...args} language="none">
        Some inline code without language.
      </Preformatted>

      {/* 7) Tomorrow Theme */}
      <Preformatted {...args} theme="tomorrow">
        console.log(&quot;Hello, Tomorrow Theme!&quot;);
      </Preformatted>

      {/* 8) With Line Numbers */}
      <Preformatted {...args} showLineNumbers={true}>
        {`function greet() {
  console.log("Hello, World!");
}`}
      </Preformatted>

      {/* 9) Wrapped Lines */}
      <Preformatted {...args} wrapLines={true}>
        {`const veryLongVariableName = "This is a very long line of code that should be wrapped within the preformatted block to demonstrate line wrapping functionality in the component."`}
      </Preformatted>

      {/* 10) Custom ClassName */}
      <Preformatted
        {...args}
        theme="custom"
        showLineNumbers={true}
        wrapLines={true}
        className="bg-purple-100 text-purple-800 p-4 rounded-lg"
      >
        {`const x = 10;
const y = 20;
console.log(x + y);`}
      </Preformatted>

      {/* 11) Combined Props */}
      <Preformatted
        {...args}
        language="python"
        theme="custom"
        showLineNumbers={true}
        wrapLines={true}
        className="bg-green-100 text-green-800 p-4 rounded-md"
        ariaLabel="Python function to greet a user"
      >
        {`def greet(name):
            print("Hello, \${name}!")`}
      </Preformatted>
    </div>
  ),
};
