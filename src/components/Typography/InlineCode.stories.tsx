// src/components/Typography/InlineCode.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InlineCode, { InlineCodeProps } from './InlineCode';
import { AppProvider } from '@/providers/app';

const meta: Meta<typeof InlineCode> = {
  title: 'Typography/InlineCode',
  component: InlineCode,
  decorators: [
    (Story) => (
      <AppProvider>
        {/* Container with padding and max width for better visualization */}
        <div className="p-4 space-y-6 max-w-xl border border-gray-200 rounded-lg">
          <Story />
        </div>
      </AppProvider>
    ),
  ],
  args: {
    children: 'const x = 10;',
    language: 'javascript',
    className: '',
    ariaLabel: '',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Code snippet to display within the InlineCode component.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'const x = 10;' },
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
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
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
type Story = StoryObj<InlineCodeProps>;

/**
 * Default InlineCode story demonstrating basic usage.
 */
export const Default: Story = {
  args: {
    children: 'const x = 10;',
    language: 'javascript',
  },
};

/**
 * InlineCode with Python Language.
 */
export const PythonLanguage: Story = {
  args: {
    children: 'print("Hello, World!")',
    language: 'python',
  },
};

/**
 * InlineCode with HTML Language.
 */
export const HTMLLanguage: Story = {
  args: {
    children: '<div>Hello World</div>',
    language: 'html',
  },
};

/**
 * InlineCode with CSS Language.
 */
export const CSSLanguage: Story = {
  args: {
    children: 'color: red;',
    language: 'css',
  },
};

/**
 * InlineCode with Bash Language.
 */
export const BashLanguage: Story = {
  args: {
    children: 'ls -la',
    language: 'bash',
  },
};

/**
 * InlineCode with No Language.
 */
export const NoLanguage: Story = {
  args: {
    children: 'Some inline code without language.',
    language: 'none',
  },
};

/**
 * InlineCode with Custom ClassName.
 */
export const CustomClassName: Story = {
  args: {
    children: 'const y = 20;',
    language: 'javascript',
    className: 'bg-yellow-100 text-black px-2 rounded',
  },
};

/**
 * InlineCode with ARIA Label.
 */
export const WithAriaLabel: Story = {
  args: {
    children: 'const z = 30;',
    language: 'javascript',
    ariaLabel: 'JavaScript variable declaration',
  },
};

/**
 * Combined Props Example.
 * Demonstrates multiple props applied together for enhanced styling and accessibility.
 */
export const CombinedProps: Story = {
  args: {
    children: 'const sum = a + b;',
    language: 'javascript',
    className: 'bg-green-100 text-green-800 px-2 rounded-md',
    ariaLabel: 'JavaScript code snippet for summing two variables',
  },
};

/**
 * Showcase Story demonstrating multiple InlineCode usages together.
 */
export const Showcase: Story = {
  render: (args: InlineCodeProps) => (
    <div className="space-y-4">
      {/* 1) Default InlineCode */}
      <InlineCode {...args}>const x = 10;</InlineCode>

      {/* 2) Python Language */}
      <InlineCode {...args} language="python">
        print(&quot;Hello, World!&quot;)
      </InlineCode>

      {/* 3) HTML Language */}
      <InlineCode {...args} language="html">
        &lt;div&gt;Hello World&lt;/div&gt;
      </InlineCode>

      {/* 4) CSS Language */}
      <InlineCode {...args} language="css">
        color: red;
      </InlineCode>

      {/* 5) Bash Language */}
      <InlineCode {...args} language="bash">
        ls -la
      </InlineCode>

      {/* 6) No Language */}
      <InlineCode {...args} language="none">
        Some inline code without language.
      </InlineCode>

      {/* 7) Custom ClassName */}
      <InlineCode {...args} className="bg-yellow-100 text-black px-2 rounded">
        const y = 20;
      </InlineCode>

      {/* 8) With ARIA Label */}
      <InlineCode {...args} ariaLabel="JavaScript variable declaration">
        const z = 30;
      </InlineCode>

      {/* 9) Combined Props */}
      <InlineCode
        {...args}
        className="bg-green-100 text-green-800 px-2 rounded-md"
        ariaLabel="JavaScript code snippet for summing two variables"
      >
        const sum = a + b;
      </InlineCode>
    </div>
  ),
};
