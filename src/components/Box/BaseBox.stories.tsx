import type { Meta, StoryObj } from '@storybook/react';
import BaseBox, { BaseBoxProps } from './BaseBox';

const meta: Meta<BaseBoxProps> = {
  title: 'Components/Box/BaseBox',
  component: BaseBox,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: { type: 'text' },
      description: 'HTML element to render as',
      defaultValue: 'div',
    },
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark', 'custom'],
      description: 'Theme of the box',
      defaultValue: 'custom',
    },
    width: {
      control: { type: 'select' },
      options: ['full', '1/2', '1/3', '1/4', 'auto'],
      description: 'Width of the box',
    },
    height: {
      control: { type: 'select' },
      options: ['full', 'screen', 'auto'],
      description: 'Height of the box',
    },
    minWidth: {
      control: { type: 'select' },
      options: ['0', 'full'],
      description: 'Minimum width of the box',
    },
    minHeight: {
      control: { type: 'select' },
      options: ['0', 'screen'],
      description: 'Minimum height of the box',
    },
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Maximum width of the box',
    },
    maxHeight: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Maximum height of the box',
    },
    padding: {
      control: { type: 'select' },
      options: ['0', '1', '2', '4', '6', '8'],
      description: 'Padding inside the box',
    },
    margin: {
      control: { type: 'select' },
      options: ['0', '1', '2', '4', '6', '8'],
      description: 'Margin outside the box',
    },
    border: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Border size of the box',
    },
    borderColor: {
      control: { type: 'select' },
      options: ['gray-200', 'gray-300', 'blue-500'],
      description: 'Border color of the box',
    },
    borderStyle: {
      control: { type: 'select' },
      options: ['solid', 'dashed', 'dotted'],
      description: 'Border style of the box',
    },
    background: {
      control: { type: 'select' },
      options: ['white', 'gray-100', 'blue-50'],
      description: 'Background color of the box',
    },
    shadow: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Shadow level of the box',
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Border radius of the box',
    },
    position: {
      control: { type: 'select' },
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      description: 'Positioning of the box',
    },
    top: {
      control: { type: 'text' },
      description: 'Top offset for positioned box',
    },
    right: {
      control: { type: 'text' },
      description: 'Right offset for positioned box',
    },
    bottom: {
      control: { type: 'text' },
      description: 'Bottom offset for positioned box',
    },
    left: {
      control: { type: 'text' },
      description: 'Left offset for positioned box',
    },
    overflow: {
      control: { type: 'select' },
      options: ['visible', 'hidden', 'scroll', 'auto'],
      description: 'Overflow behavior of the box',
    },
    children: {
      control: 'text',
      description: 'Content of the box',
      defaultValue: 'BaseBox Content',
    },
    className: {
      control: 'text',
      description: 'Additional custom classes',
    },
    role: {
      control: 'text',
      description: 'ARIA role',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label',
    },
  },
};

export default meta;
type Story = StoryObj<BaseBoxProps>;

const Template: Story = {
  args: {
    children: 'BaseBox Content',
  },
};

export const Default = { ...Template };

export const LightTheme = {
  ...Template,
  args: {
    theme: 'light',
    children: 'Light Themed BaseBox',
  },
};

export const DarkTheme = {
  ...Template,
  args: {
    theme: 'dark',
    children: 'Dark Themed BaseBox',
  },
};

export const CustomTheme = {
  ...Template,
  args: {
    theme: 'custom',
    children: 'Custom Themed BaseBox',
  },
};

export const WithSizing = {
  ...Template,
  args: {
    width: '1/2',
    height: 'auto',
    children: 'BaseBox with custom sizing',
  },
};

export const WithSpacing = {
  ...Template,
  args: {
    padding: '4',
    margin: '2',
    children: 'BaseBox with padding and margin',
  },
};

export const WithBorders = {
  ...Template,
  args: {
    border: 'md',
    borderColor: 'blue-500',
    borderStyle: 'solid',
    children: 'BaseBox with borders',
  },
};

export const WithBackgroundAndShadow = {
  ...Template,
  args: {
    background: 'gray-100',
    shadow: 'lg',
    children: 'BaseBox with background and shadow',
  },
};

export const Positioned = {
  ...Template,
  args: {
    position: 'absolute',
    top: '10px',
    left: '20px',
    children: 'Positioned BaseBox',
  },
};

// src/components/Box/BaseBox.stories.tsx
