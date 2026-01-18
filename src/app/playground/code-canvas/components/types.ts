// src/app/playground/code-canvas/components/types.ts
'use client';

/**
 * Generation status
 */
export type GenerationStatus =
  | 'idle'
  | 'generating'
  | 'streaming'
  | 'complete'
  | 'error';

/**
 * A single generation version
 */
export interface GenerationVersion {
  id: string;
  prompt: string;
  code: string;
  timestamp: number;
  status: GenerationStatus;
  error?: string;
  parentId?: string;
}

/**
 * Generation history
 */
export interface GenerationHistory {
  versions: GenerationVersion[];
  currentVersionId: string | null;
}

/**
 * Component library context for generation
 */
export interface ComponentContext {
  name: string;
  description: string;
  imports: string;
  example?: string;
}

/**
 * Prompt suggestion
 */
export interface PromptSuggestion {
  id: string;
  text: string;
  category: 'component' | 'layout' | 'feature' | 'style';
}

/**
 * Export format options
 */
export type ExportFormat = 'code' | 'codesandbox' | 'stackblitz' | 'download';

/**
 * Canvas size configuration
 */
export type CanvasSize = 'compact' | 'default' | 'large';

export interface SizeConfig {
  fontSize: number;
  padding: number;
  borderRadius: number;
  headerHeight: number;
  sidebarWidth: number;
}

export const SIZE_CONFIGS: Record<CanvasSize, SizeConfig> = {
  compact: {
    fontSize: 12,
    padding: 8,
    borderRadius: 8,
    headerHeight: 36,
    sidebarWidth: 240,
  },
  default: {
    fontSize: 14,
    padding: 12,
    borderRadius: 12,
    headerHeight: 44,
    sidebarWidth: 280,
  },
  large: {
    fontSize: 16,
    padding: 16,
    borderRadius: 16,
    headerHeight: 52,
    sidebarWidth: 320,
  },
};

export function getSizeConfig(size: CanvasSize): SizeConfig {
  return SIZE_CONFIGS[size];
}

/**
 * Canvas theme
 */
export type CanvasTheme = 'light' | 'dark' | 'auto';

/**
 * Canvas layout mode
 */
export type CanvasLayout = 'side-by-side' | 'stacked' | 'preview-only';

/**
 * Main CodeCanvas component props
 */
export interface CodeCanvasProps {
  /** Initial prompt */
  initialPrompt?: string;
  /** Component library context for better generation */
  componentLibrary?: ComponentContext[];
  /** Custom API endpoint for generation */
  apiEndpoint?: string;
  /** Use mock mode for demo (no API calls) */
  mockMode?: boolean;
  /** Layout mode */
  layout?: CanvasLayout;
  /** Size variant */
  size?: CanvasSize;
  /** Theme */
  theme?: CanvasTheme;
  /** Show version history sidebar */
  showHistory?: boolean;
  /** Show prompt suggestions */
  showSuggestions?: boolean;
  /** Container height */
  height?: string | number;
  /** Custom class name */
  className?: string;
  /** Callback when code is generated */
  onGenerate?: (code: string, prompt: string) => void;
  /** Callback when code is exported */
  onExport?: (code: string, format: ExportFormat) => void;
}

/**
 * Prompt input props
 */
export interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isGenerating: boolean;
  placeholder?: string;
  suggestions?: PromptSuggestion[];
  size?: CanvasSize;
  className?: string;
}

/**
 * Generation panel props
 */
export interface GenerationPanelProps {
  code: string;
  status: GenerationStatus;
  error?: string;
  onIterate: (prompt: string) => void;
  onCopy: () => void;
  size?: CanvasSize;
  theme?: CanvasTheme;
  className?: string;
}

/**
 * Preview panel props
 */
export interface PreviewPanelProps {
  code: string;
  isGenerating: boolean;
  size?: CanvasSize;
  className?: string;
}

/**
 * History sidebar props
 */
export interface HistorySidebarProps {
  history: GenerationHistory;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  size?: CanvasSize;
  className?: string;
}

/**
 * Export panel props
 */
export interface ExportPanelProps {
  code: string;
  onExport: (format: ExportFormat) => void;
  size?: CanvasSize;
  className?: string;
}

/**
 * Animation configurations
 */
export const CANVAS_ANIMATIONS = {
  fast: { duration: 0.15 },
  normal: { duration: 0.25 },
  spring: { type: 'spring' as const, stiffness: 300, damping: 25 },
};

/**
 * Default prompt suggestions
 */
export const DEFAULT_SUGGESTIONS: PromptSuggestion[] = [
  {
    id: '1',
    text: 'A card with user avatar, name, and bio',
    category: 'component',
  },
  {
    id: '2',
    text: 'A pricing table with 3 tiers',
    category: 'layout',
  },
  {
    id: '3',
    text: 'A login form with email and password',
    category: 'feature',
  },
  {
    id: '4',
    text: 'A dark mode toggle button',
    category: 'component',
  },
  {
    id: '5',
    text: 'A navigation bar with logo and links',
    category: 'layout',
  },
  {
    id: '6',
    text: 'An animated loading spinner',
    category: 'style',
  },
];

/**
 * Tahoe UI component library context
 */
export const TAHOE_COMPONENT_LIBRARY: ComponentContext[] = [
  {
    name: 'Button',
    description: 'A versatile button component with variants',
    imports: "import { Button } from '@/components/Button/Button';",
    example: '<Button variant="primary">Click me</Button>',
  },
  {
    name: 'Input',
    description: 'Text input with validation states',
    imports: "import { Input } from '@/components/Form/Input';",
    example: '<Input placeholder="Enter text..." />',
  },
  {
    name: 'Card',
    description: 'Container with shadow and rounded corners',
    imports: "import { Box } from '@/components/Box';",
    example: '<Box className="p-4 rounded-lg shadow-md">Content</Box>',
  },
  {
    name: 'Flex',
    description: 'Flexbox layout component',
    imports: "import { Flex } from '@/components/Box';",
    example: '<Flex gap={4} align="center">...</Flex>',
  },
  {
    name: 'Stack',
    description: 'Vertical or horizontal stack layout',
    imports: "import { Stack } from '@/components/Box';",
    example: '<Stack gap={2}>...</Stack>',
  },
  {
    name: 'Heading',
    description: 'Typography heading component',
    imports: "import { Heading } from '@/components/Typography';",
    example: '<Heading level={1}>Title</Heading>',
  },
  {
    name: 'Text',
    description: 'Typography text component',
    imports: "import { Text } from '@/components/Typography';",
    example: '<Text>Paragraph text</Text>',
  },
];

/**
 * Mock generated code examples for demo mode
 */
export const MOCK_GENERATIONS: Record<string, string> = {
  card: `import React from 'react';

export default function UserCard() {
  return (
    <div className="max-w-sm rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          alt="User avatar"
          className="h-16 w-16 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Jane Cooper
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Product Designer
          </p>
        </div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Passionate about creating beautiful and intuitive user experiences.
        Currently working on design systems and component libraries.
      </p>
      <div className="mt-4 flex gap-2">
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Follow
        </button>
        <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
          Message
        </button>
      </div>
    </div>
  );
}
`,
  pricing: `import React from 'react';

const plans = [
  {
    name: 'Starter',
    price: '$9',
    description: 'Perfect for small projects',
    features: ['5 projects', '10GB storage', 'Email support'],
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For growing teams',
    features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For large organizations',
    features: ['Unlimited everything', 'Dedicated support', 'Custom integrations', 'SLA'],
  },
];

export default function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={\`relative rounded-2xl border p-6 \${
            plan.popular
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20'
              : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
          }\`}
        >
          {plan.popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
              Most Popular
            </span>
          )}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {plan.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {plan.description}
          </p>
          <p className="mt-4">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              {plan.price}
            </span>
            <span className="text-gray-500 dark:text-gray-400">/month</span>
          </p>
          <ul className="mt-6 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <button
            className={\`mt-6 w-full rounded-lg py-2.5 text-sm font-medium \${
              plan.popular
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
            }\`}
          >
            Get Started
          </button>
        </div>
      ))}
    </div>
  );
}
`,
  login: `import React, { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Welcome back
      </h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Enter your credentials to access your account
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
          </label>
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account?{' '}
        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
          Sign up
        </a>
      </p>
    </div>
  );
}
`,
  navbar: `import React, { useState } from 'react';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-lg font-bold text-white">T</span>
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Tahoe
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Log in
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 px-4 py-4 md:hidden dark:border-gray-800">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <button className="w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300">
              Log in
            </button>
            <button className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
`,
  default: `import React from 'react';

export default function Component() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold">Hello World</h2>
        <p className="mt-2 opacity-90">
          Your component will appear here
        </p>
      </div>
    </div>
  );
}
`,
};

/**
 * Helper to select mock generation based on prompt keywords
 */
export function selectMockGeneration(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();

  if (
    lowerPrompt.includes('card') ||
    lowerPrompt.includes('avatar') ||
    lowerPrompt.includes('user')
  ) {
    return MOCK_GENERATIONS.card;
  }
  if (
    lowerPrompt.includes('pricing') ||
    lowerPrompt.includes('plan') ||
    lowerPrompt.includes('tier')
  ) {
    return MOCK_GENERATIONS.pricing;
  }
  if (
    lowerPrompt.includes('login') ||
    lowerPrompt.includes('form') ||
    lowerPrompt.includes('email') ||
    lowerPrompt.includes('password')
  ) {
    return MOCK_GENERATIONS.login;
  }
  if (
    lowerPrompt.includes('nav') ||
    lowerPrompt.includes('header') ||
    lowerPrompt.includes('menu') ||
    lowerPrompt.includes('logo')
  ) {
    return MOCK_GENERATIONS.navbar;
  }

  return MOCK_GENERATIONS.default;
}
