// lib/typography-data.ts
// Typography component documentation data

import type { ComponentData, ComponentApiProp } from './data';

// ============ Core Components ============

export const textComponent: ComponentData = {
  id: 'text',
  name: 'Text',
  description:
    'Base inline text component with comprehensive typography controls. Renders a semantic <span> element with forwardRef support.',
  api: [
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Content to display.',
    },
    {
      name: 'fontFamily',
      type: "'primary' | 'secondary' | 'mono'",
      description: 'Font family to apply.',
      default: "'primary'",
    },
    {
      name: 'fontWeight',
      type: "'light' | 'regular' | 'bold' | 'extrabold'",
      description: 'Font weight.',
      default: "'regular'",
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'accent' | 'muted' | 'inherit'",
      description: 'Text color from design system.',
      default: "'primary'",
    },
    {
      name: 'align',
      type: "'left' | 'center' | 'right' | 'justify'",
      description: 'Text alignment.',
    },
    {
      name: 'lineHeight',
      type: "'tight' | 'normal' | 'loose' | 'relaxed'",
      description: 'Line height.',
      default: "'normal'",
    },
    {
      name: 'letterSpacing',
      type: "'tight' | 'normal' | 'wide'",
      description: 'Letter spacing.',
      default: "'normal'",
    },
    {
      name: 'textTransform',
      type: "'uppercase' | 'lowercase' | 'capitalize' | 'none'",
      description: 'Text transformation.',
      default: "'none'",
    },
    {
      name: 'textDecoration',
      type: "'underline' | 'line-through' | 'none'",
      description: 'Text decoration.',
      default: "'none'",
    },
    {
      name: 'truncate',
      type: 'boolean',
      description: 'Truncate with ellipsis on overflow.',
      default: 'false',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  previewComponentCode: `
    <style>
      .text-demo { font-family: system-ui, sans-serif; }
      .text-primary { color: #1f2937; }
      .text-secondary { color: #6b7280; }
      .text-accent { color: #3b82f6; }
      .text-bold { font-weight: 700; }
      .text-mono { font-family: ui-monospace, monospace; }
      body.dark .text-primary { color: #f3f4f6; }
      body.dark .text-secondary { color: #9ca3af; }
    </style>
    <div class="text-demo" style="display: flex; flex-direction: column; gap: 0.75rem;">
      <span class="text-primary">Default text with primary color</span>
      <span class="text-secondary">Secondary color for muted content</span>
      <span class="text-accent text-bold">Bold accent text for emphasis</span>
      <span class="text-mono text-primary">Monospace font for code</span>
      <span class="text-primary" style="text-decoration: underline;">Underlined text decoration</span>
    </div>
  `,
  codeSnippet: `
import { Text } from '@/components/Typography';

// Basic usage
<Text>Default text content</Text>

// With styling props
<Text fontWeight="bold" color="accent">
  Bold accent text
</Text>

// Monospace font
<Text fontFamily="mono" color="secondary">
  const code = 'example';
</Text>

// Combined props
<Text
  fontWeight="bold"
  letterSpacing="wide"
  textTransform="uppercase"
  color="primary"
>
  Styled heading text
</Text>
`,
};

export const headingComponent: ComponentData = {
  id: 'heading',
  name: 'Heading',
  description:
    'Semantic heading component supporting h1-h6 levels with anchor link support via id prop. Uses forwardRef for DOM access.',
  api: [
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Heading content.',
    },
    {
      name: 'level',
      type: '1 | 2 | 3 | 4 | 5 | 6',
      description: 'Heading level (h1-h6).',
      default: '1',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'",
      description: 'Visual size (independent of level).',
      default: "'xl'",
    },
    {
      name: 'weight',
      type: "'light' | 'regular' | 'bold' | 'extrabold'",
      description: 'Font weight.',
      default: "'bold'",
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'accent' | 'muted' | 'inherit'",
      description: 'Text color.',
      default: "'primary'",
    },
    {
      name: 'align',
      type: "'left' | 'center' | 'right' | 'justify'",
      description: 'Text alignment.',
      default: "'left'",
    },
    {
      name: 'margin',
      type: 'string',
      description: 'Margin classes.',
      default: "'my-4'",
    },
    {
      name: 'truncate',
      type: 'boolean',
      description: 'Truncate with ellipsis.',
      default: 'false',
    },
    {
      name: 'id',
      type: 'string',
      description: 'ID for anchor links. Adds scroll-mt-20 class.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  previewComponentCode: `
    <style>
      .heading-demo h1 { font-size: 2.25rem; font-weight: 700; margin: 0.5rem 0; color: #1f2937; }
      .heading-demo h2 { font-size: 1.875rem; font-weight: 700; margin: 0.5rem 0; color: #1f2937; }
      .heading-demo h3 { font-size: 1.5rem; font-weight: 600; margin: 0.5rem 0; color: #1f2937; }
      .heading-demo h4 { font-size: 1.25rem; font-weight: 600; margin: 0.5rem 0; color: #6b7280; }
      body.dark .heading-demo h1, body.dark .heading-demo h2, body.dark .heading-demo h3 { color: #f3f4f6; }
      body.dark .heading-demo h4 { color: #9ca3af; }
    </style>
    <div class="heading-demo">
      <h1>Heading Level 1</h1>
      <h2>Heading Level 2</h2>
      <h3>Heading Level 3</h3>
      <h4>Heading Level 4 (secondary)</h4>
    </div>
  `,
  codeSnippet: `
import { Heading } from '@/components/Typography';

// Basic headings
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section Title</Heading>
<Heading level={3}>Subsection</Heading>

// With anchor link (for navigation)
<Heading level={2} id="getting-started">
  Getting Started
</Heading>

// Custom size independent of level
<Heading level={3} size="xl" weight="extrabold">
  Visually large h3
</Heading>

// Centered with accent color
<Heading level={2} align="center" color="accent">
  Featured Section
</Heading>
`,
};

export const paragraphComponent: ComponentData = {
  id: 'paragraph',
  name: 'Paragraph',
  description:
    'Block-level text component using semantic <p> element. Includes default margin and full typography controls.',
  api: [
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Paragraph content.',
    },
    {
      name: 'fontFamily',
      type: "'primary' | 'secondary' | 'mono'",
      description: 'Font family.',
      default: "'primary'",
    },
    {
      name: 'fontWeight',
      type: "'light' | 'regular' | 'bold' | 'extrabold'",
      description: 'Font weight.',
      default: "'regular'",
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'accent' | 'muted' | 'inherit'",
      description: 'Text color.',
      default: "'primary'",
    },
    {
      name: 'align',
      type: "'left' | 'center' | 'right' | 'justify'",
      description: 'Text alignment.',
      default: "'left'",
    },
    {
      name: 'lineHeight',
      type: "'tight' | 'normal' | 'loose' | 'relaxed'",
      description: 'Line height.',
      default: "'normal'",
    },
    {
      name: 'letterSpacing',
      type: "'tight' | 'normal' | 'wide'",
      description: 'Letter spacing.',
      default: "'normal'",
    },
    {
      name: 'textTransform',
      type: "'uppercase' | 'lowercase' | 'capitalize' | 'none'",
      description: 'Text transformation.',
      default: "'none'",
    },
    {
      name: 'textDecoration',
      type: "'underline' | 'line-through' | 'none'",
      description: 'Text decoration.',
      default: "'none'",
    },
    {
      name: 'truncate',
      type: 'boolean',
      description: 'Truncate with ellipsis.',
      default: 'false',
    },
    {
      name: 'margin',
      type: 'string',
      description: 'Margin classes.',
      default: "'my-2'",
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  previewComponentCode: `
    <style>
      .para-demo p { margin: 0.75rem 0; color: #374151; line-height: 1.625; }
      .para-demo .secondary { color: #6b7280; }
      .para-demo .justified { text-align: justify; }
      body.dark .para-demo p { color: #d1d5db; }
      body.dark .para-demo .secondary { color: #9ca3af; }
    </style>
    <div class="para-demo">
      <p>This is a standard paragraph with default styling. It uses the primary font family and regular weight.</p>
      <p class="secondary">Secondary colored paragraph for supporting text that needs less visual prominence.</p>
      <p class="justified">Justified paragraph alignment distributes text evenly across the full width, creating clean edges on both sides for a formal appearance.</p>
    </div>
  `,
  codeSnippet: `
import { Paragraph } from '@/components/Typography';

// Basic paragraph
<Paragraph>
  Standard paragraph with default styling.
</Paragraph>

// With typography controls
<Paragraph
  lineHeight="loose"
  color="secondary"
  align="justify"
>
  A longer paragraph with loose line height for
  improved readability in body text.
</Paragraph>

// Custom margin
<Paragraph margin="my-6">
  Paragraph with larger vertical margins.
</Paragraph>
`,
};

// ============ Semantic Elements ============

export const strongComponent: ComponentData = {
  id: 'strong',
  name: 'Strong',
  description:
    'Semantic <strong> element for important text. Renders with bold font weight by default.',
  api: [
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Content to emphasize.',
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'accent' | 'muted' | 'inherit'",
      description: 'Text color.',
      default: "'primary'",
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  previewComponentCode: `
    <style>
      .strong-demo { font-family: system-ui; color: #374151; line-height: 1.75; }
      .strong-demo strong { font-weight: 700; color: #1f2937; }
      body.dark .strong-demo { color: #d1d5db; }
      body.dark .strong-demo strong { color: #f3f4f6; }
    </style>
    <p class="strong-demo">
      This paragraph contains <strong>strongly emphasized</strong> text that indicates importance using semantic HTML.
    </p>
  `,
  codeSnippet: `
import { Strong, Paragraph } from '@/components/Typography';

<Paragraph>
  Please read the <Strong>important notice</Strong> before proceeding.
</Paragraph>

// With custom color
<Strong color="accent">Critical information</Strong>
`,
};

export const emphasisComponent: ComponentData = {
  id: 'emphasis',
  name: 'Emphasis',
  description:
    'Semantic <em> element for stressed emphasis. Renders with italic style by default.',
  api: [
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Content to emphasize.',
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'accent' | 'muted' | 'inherit'",
      description: 'Text color.',
      default: "'primary'",
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  previewComponentCode: `
    <style>
      .em-demo { font-family: system-ui; color: #374151; line-height: 1.75; }
      .em-demo em { font-style: italic; }
      body.dark .em-demo { color: #d1d5db; }
    </style>
    <p class="em-demo">
      The word <em>emphasis</em> indicates stress or importance in a sentence.
    </p>
  `,
  codeSnippet: `
import { Emphasis, Paragraph } from '@/components/Typography';

<Paragraph>
  You <Emphasis>must</Emphasis> complete this step before continuing.
</Paragraph>

// With custom color
<Emphasis color="accent">technical term</Emphasis>
`,
};

export const highlightComponent: ComponentData = {
  id: 'highlight',
  name: 'Highlight',
  description:
    'Semantic <mark> element for highlighted/marked text. Supports multiple background colors.',
  api: [
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Content to highlight.',
    },
    {
      name: 'bgColor',
      type: "'yellow' | 'green' | 'blue' | 'pink' | 'purple'",
      description: 'Background highlight color.',
      default: "'yellow'",
    },
    {
      name: 'textColor',
      type: "'primary' | 'secondary' | 'accent' | 'muted' | 'inherit'",
      description: 'Text color.',
      default: "'primary'",
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  previewComponentCode: `
    <style>
      .highlight-demo { font-family: system-ui; color: #374151; display: flex; flex-wrap: wrap; gap: 0.5rem; }
      .highlight-demo mark { padding: 0.125rem 0.375rem; border-radius: 0.25rem; color: #1f2937; }
      .bg-yellow { background-color: #fef08a; }
      .bg-green { background-color: #bbf7d0; }
      .bg-blue { background-color: #bfdbfe; }
      .bg-pink { background-color: #fbcfe8; }
      .bg-purple { background-color: #e9d5ff; }
      body.dark .highlight-demo { color: #d1d5db; }
      body.dark .highlight-demo mark { color: #1f2937; }
    </style>
    <div class="highlight-demo">
      <mark class="bg-yellow">Yellow highlight</mark>
      <mark class="bg-green">Green highlight</mark>
      <mark class="bg-blue">Blue highlight</mark>
      <mark class="bg-pink">Pink highlight</mark>
      <mark class="bg-purple">Purple highlight</mark>
    </div>
  `,
  codeSnippet: `
import { Highlight, Paragraph } from '@/components/Typography';

<Paragraph>
  Search results for <Highlight>typography</Highlight> found.
</Paragraph>

// Different colors
<Highlight bgColor="green">Success</Highlight>
<Highlight bgColor="blue">Info</Highlight>
<Highlight bgColor="pink">Warning</Highlight>
<Highlight bgColor="purple">Note</Highlight>

// With custom padding via className
<Highlight bgColor="yellow" className="px-2 py-1">
  Important notice
</Highlight>
`,
};

// ============ Links ============

export const linkComponent: ComponentData = {
  id: 'link',
  name: 'Link',
  description:
    'Navigation link component built on Next.js Link. Supports internal/external links with variants.',
  api: [
    { name: 'href', type: 'string', description: 'Link destination URL.' },
    { name: 'children', type: 'React.ReactNode', description: 'Link content.' },
    {
      name: 'external',
      type: 'boolean',
      description: 'Opens in new tab with security attributes.',
      default: 'false',
    },
    {
      name: 'underline',
      type: 'boolean',
      description: 'Show underline decoration.',
      default: 'true',
    },
    {
      name: 'variant',
      type: "'default' | 'muted' | 'accent'",
      description: 'Visual style variant.',
      default: "'default'",
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  previewComponentCode: `
    <style>
      .link-demo { font-family: system-ui; display: flex; flex-direction: column; gap: 0.75rem; }
      .link-demo a { transition: opacity 0.2s; }
      .link-demo a:hover { opacity: 0.8; }
      .link-default { color: #3b82f6; text-decoration: underline; }
      .link-muted { color: #6b7280; text-decoration: underline; }
      .link-accent { color: #8b5cf6; text-decoration: underline; }
      .link-no-underline { text-decoration: none; }
      body.dark .link-default { color: #60a5fa; }
      body.dark .link-muted { color: #9ca3af; }
      body.dark .link-accent { color: #a78bfa; }
    </style>
    <div class="link-demo">
      <a href="#" class="link-default">Default link with underline</a>
      <a href="#" class="link-muted">Muted variant for secondary links</a>
      <a href="#" class="link-accent">Accent variant for emphasis</a>
      <a href="#" class="link-default link-no-underline">Link without underline</a>
    </div>
  `,
  codeSnippet: `
import { Link } from '@/components/Typography';

// Internal link
<Link href="/about">About Us</Link>

// External link (opens in new tab)
<Link href="https://github.com" external>
  GitHub
</Link>

// Variants
<Link href="/docs" variant="default">Documentation</Link>
<Link href="/help" variant="muted">Help Center</Link>
<Link href="/features" variant="accent">New Features</Link>

// Without underline
<Link href="/home" underline={false}>
  Clean link style
</Link>
`,
};

// ============ Form Elements ============

export const labelComponent: ComponentData = {
  id: 'label',
  name: 'Label',
  description:
    'Semantic <label> element for form fields. Supports htmlFor linking and required indicator.',
  api: [
    { name: 'children', type: 'React.ReactNode', description: 'Label text.' },
    {
      name: 'htmlFor',
      type: 'string',
      description: 'ID of the associated form element.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg'",
      description: 'Text size.',
      default: "'sm'",
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'accent' | 'muted' | 'inherit'",
      description: 'Text color.',
      default: "'primary'",
    },
    {
      name: 'fontWeight',
      type: "'light' | 'regular' | 'bold' | 'extrabold'",
      description: 'Font weight.',
      default: "'bold'",
    },
    {
      name: 'required',
      type: 'boolean',
      description: 'Shows red asterisk indicator.',
      default: 'false',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  previewComponentCode: `
    <style>
      .label-demo { font-family: system-ui; display: flex; flex-direction: column; gap: 1rem; }
      .label-demo label { display: block; font-weight: 600; color: #374151; font-size: 0.875rem; margin-bottom: 0.25rem; }
      .label-demo .required::after { content: ' *'; color: #ef4444; }
      .label-demo input { padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; width: 100%; max-width: 250px; }
      body.dark .label-demo label { color: #f3f4f6; }
      body.dark .label-demo input { background: #374151; border-color: #4b5563; color: #f3f4f6; }
    </style>
    <div class="label-demo">
      <div>
        <label for="name">Full Name</label>
        <input type="text" id="name" placeholder="John Doe" />
      </div>
      <div>
        <label for="email" class="required">Email Address</label>
        <input type="email" id="email" placeholder="john@example.com" />
      </div>
    </div>
  `,
  codeSnippet: `
import { Label } from '@/components/Typography';

// Basic label
<Label htmlFor="username">Username</Label>
<input id="username" type="text" />

// Required field
<Label htmlFor="email" required>
  Email Address
</Label>
<input id="email" type="email" />

// Different sizes
<Label size="xs">Extra small label</Label>
<Label size="lg">Large label</Label>

// Custom styling
<Label color="secondary" fontWeight="regular">
  Optional field
</Label>
`,
};

// ============ UI Elements ============

export const tooltipTextComponent: ComponentData = {
  id: 'tooltip-text',
  name: 'TooltipText',
  description:
    'Text with hover tooltip. Fully accessible with keyboard support, ARIA attributes, and configurable positioning.',
  api: [
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Trigger content.',
    },
    {
      name: 'tooltip',
      type: 'string',
      description: 'Tooltip text to display.',
    },
    {
      name: 'position',
      type: "'top' | 'bottom' | 'left' | 'right'",
      description: 'Tooltip position.',
      default: "'top'",
    },
    {
      name: 'delay',
      type: 'number',
      description: 'Show delay in milliseconds.',
      default: '300',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  previewComponentCode: `
    <style>
      .tooltip-demo { font-family: system-ui; display: flex; gap: 2rem; flex-wrap: wrap; }
      .tooltip-trigger { position: relative; cursor: help; border-bottom: 1px dashed #6b7280; color: #374151; }
      .tooltip-box { position: absolute; background: #1f2937; color: white; padding: 0.5rem 0.75rem; border-radius: 0.375rem; font-size: 0.75rem; white-space: nowrap; z-index: 50; }
      .tooltip-top { bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 0.5rem; }
      .tooltip-bottom { top: 100%; left: 50%; transform: translateX(-50%); margin-top: 0.5rem; }
      body.dark .tooltip-trigger { color: #d1d5db; border-color: #9ca3af; }
    </style>
    <div class="tooltip-demo">
      <span class="tooltip-trigger">
        Hover me (top)
        <span class="tooltip-box tooltip-top">Tooltip on top</span>
      </span>
      <span class="tooltip-trigger">
        Hover me (bottom)
        <span class="tooltip-box tooltip-bottom">Tooltip on bottom</span>
      </span>
    </div>
  `,
  codeSnippet: `
import { TooltipText, Paragraph } from '@/components/Typography';

<Paragraph>
  Read our <TooltipText tooltip="Terms and conditions apply">
    terms of service
  </TooltipText> for more details.
</Paragraph>

// Different positions
<TooltipText tooltip="Above" position="top">Top</TooltipText>
<TooltipText tooltip="Below" position="bottom">Bottom</TooltipText>
<TooltipText tooltip="Left side" position="left">Left</TooltipText>
<TooltipText tooltip="Right side" position="right">Right</TooltipText>

// Custom delay
<TooltipText tooltip="Quick tooltip" delay={100}>
  Fast hover
</TooltipText>
`,
};

export const badgeComponent: ComponentData = {
  id: 'badge',
  name: 'Badge',
  description:
    'Small label component for status, categories, or counts. Supports multiple variants and colors.',
  api: [
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Badge content.',
    },
    {
      name: 'variant',
      type: "'filled' | 'outlined' | 'ghost'",
      description: 'Visual style.',
      default: "'filled'",
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'",
      description: 'Color scheme.',
      default: "'primary'",
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Badge size.',
      default: "'md'",
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  previewComponentCode: `
    <style>
      .badge-demo { font-family: system-ui; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
      .badge { display: inline-flex; align-items: center; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
      .badge-filled-primary { background: #3b82f6; color: white; }
      .badge-filled-success { background: #22c55e; color: white; }
      .badge-filled-warning { background: #f59e0b; color: white; }
      .badge-filled-error { background: #ef4444; color: white; }
      .badge-outlined { background: transparent; border: 1px solid currentColor; }
      .badge-outlined-primary { color: #3b82f6; }
      .badge-ghost { background: transparent; }
      .badge-ghost-primary { color: #3b82f6; }
    </style>
    <div class="badge-demo">
      <span class="badge badge-filled-primary">Primary</span>
      <span class="badge badge-filled-success">Success</span>
      <span class="badge badge-filled-warning">Warning</span>
      <span class="badge badge-filled-error">Error</span>
      <span class="badge badge-outlined badge-outlined-primary">Outlined</span>
      <span class="badge badge-ghost badge-ghost-primary">Ghost</span>
    </div>
  `,
  codeSnippet: `
import { Badge } from '@/components/Typography';

// Filled variants (default)
<Badge color="primary">New</Badge>
<Badge color="success">Active</Badge>
<Badge color="warning">Pending</Badge>
<Badge color="error">Failed</Badge>

// Outlined variant
<Badge variant="outlined" color="primary">
  Featured
</Badge>

// Ghost variant
<Badge variant="ghost" color="accent">
  Beta
</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
`,
};

// ============ Specialized ============

export const colorTextComponent: ComponentData = {
  id: 'color-text',
  name: 'ColorText',
  description:
    'Text with predefined color schemes and optional gradient support. Uses static Tailwind classes for JIT safety.',
  api: [
    { name: 'children', type: 'React.ReactNode', description: 'Text content.' },
    {
      name: 'colorScheme',
      type: "'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink' | 'indigo' | 'gray'",
      description: 'Color scheme.',
      default: "'blue'",
    },
    {
      name: 'gradient',
      type: 'boolean',
      description: 'Apply gradient effect.',
      default: 'false',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  previewComponentCode: `
    <style>
      .color-demo { font-family: system-ui; display: flex; flex-direction: column; gap: 0.5rem; font-weight: 600; }
      .text-blue { color: #3b82f6; }
      .text-green { color: #22c55e; }
      .text-red { color: #ef4444; }
      .text-purple { color: #8b5cf6; }
      .text-gradient-blue { background: linear-gradient(to right, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .text-gradient-green { background: linear-gradient(to right, #22c55e, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    </style>
    <div class="color-demo">
      <span class="text-blue">Blue color scheme</span>
      <span class="text-green">Green color scheme</span>
      <span class="text-red">Red color scheme</span>
      <span class="text-purple">Purple color scheme</span>
      <span class="text-gradient-blue">Blue gradient text</span>
      <span class="text-gradient-green">Green gradient text</span>
    </div>
  `,
  codeSnippet: `
import { ColorText } from '@/components/Typography';

// Solid colors
<ColorText colorScheme="blue">Blue text</ColorText>
<ColorText colorScheme="green">Green text</ColorText>
<ColorText colorScheme="red">Red text</ColorText>
<ColorText colorScheme="purple">Purple text</ColorText>

// Gradient text
<ColorText colorScheme="blue" gradient>
  Blue gradient effect
</ColorText>

<ColorText colorScheme="purple" gradient>
  Purple gradient effect
</ColorText>

// With opacity via className
<ColorText colorScheme="blue" className="opacity-75">
  Semi-transparent blue
</ColorText>
`,
};

// ============ All Typography Components ============

export const typographyComponents: ComponentData[] = [
  // Core
  textComponent,
  headingComponent,
  paragraphComponent,
  // Semantic
  strongComponent,
  emphasisComponent,
  highlightComponent,
  // Links
  linkComponent,
  // Form
  labelComponent,
  // UI
  tooltipTextComponent,
  badgeComponent,
  // Specialized
  colorTextComponent,
];

export default typographyComponents;
