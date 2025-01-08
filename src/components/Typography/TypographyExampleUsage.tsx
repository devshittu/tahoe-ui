// app/page.tsx
'use client';

import React from 'react';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Span from './Span';
import Lead from './Lead';
import SmallText from './SmallText';
import DisplayLarge from './DisplayLarge';
import DisplayMedium from './DisplayMedium';
import DisplaySmall from './DisplaySmall';
import LinkText from './LinkText';
import Emphasis from './Emphasis';
import Strong from './Strong';
import Highlight from './Highlight';
import Blockquote from './Blockquote';
import Code from './Code';
import Preformatted from './Preformatted';
import TooltipText from './TooltipText';
import Label from './Label';
import Caption from './Caption';
import Badge from './Badge';
import ResponsiveText from './ResponsiveText';
import FluidTypography from './FluidTypography';
import ThemedText from './ThemedText';
import ColorText from './ColorText';
import AccessibleText from './AccessibleText';
import ReadableText from './ReadableText';
import TypographyCodeExample from './TypographyCodeExample';
import LinkExample from '../Link/LinkExample';

const TypographyExampleUsage = () => {
  return (
    <div className="p-8 space-y-12">
      {/* 1. Heading Component */}
      <section>
        <Heading level={1} align="center" color="accent">
          Basic Heading Level 1
        </Heading>
        <Heading
          level={2}
          size="lg"
          weight="bold"
          align="left"
          color="secondary"
          margin="mt-6"
        >
          Advanced Heading Level 2 with Custom Props
        </Heading>
      </section>

      {/* 2. Paragraph Component */}
      <section>
        <Paragraph>
          This is a <Span color="accent">basic paragraph</Span> demonstrating
          the use of the Paragraph component.
        </Paragraph>
        <Paragraph
          fontFamily="secondary"
          fontWeight="light"
          color="secondary"
          align="justify"
          lineHeight="loose"
          letterSpacing="wide"
          textTransform="capitalize"
          textDecoration="underline"
          background="yellow-100"
          margin="mt-4"
        >
          Advanced paragraph with customized font family, weight, color,
          alignment, line height, letter spacing, text transformation,
          decoration, and background.
        </Paragraph>
      </section>

      {/* 3. Span Component */}
      <section>
        <Paragraph>
          This is a paragraph with a <Span fontWeight="bold">bold span</Span>{' '}
          inside.
        </Paragraph>
        <Paragraph>
          Another example with a{' '}
          <Span color="accent" textDecoration="underline">
            colored and underlined span
          </Span>
          .
        </Paragraph>
      </section>

      {/* 4. Lead Component */}
      <section>
        <Lead>This is a basic lead paragraph, serving as an introduction.</Lead>
        <Lead className="bg-gray-100 p-4 rounded">
          Advanced lead paragraph with background, padding, and rounded corners.
        </Lead>
      </section>

      {/* 5. SmallText Component */}
      <section>
        <SmallText>
          This is a basic small text, suitable for disclaimers.
        </SmallText>
        <SmallText className="text-red-500">
          Advanced small text with custom color.
        </SmallText>
      </section>

      {/* 6. Display Components */}
      <section>
        <DisplayLarge>Basic Display Large Text</DisplayLarge>
        <DisplayLarge align="left" color="secondary" margin="my-10">
          Advanced Display Large Text with alignment, color, and custom margin
        </DisplayLarge>

        <DisplayMedium>Basic Display Medium Text</DisplayMedium>
        <DisplayMedium align="right" color="accent" margin="my-8">
          Advanced Display Medium Text with alignment, color, and custom margin
        </DisplayMedium>

        <DisplaySmall>Basic Display Small Text</DisplaySmall>
        <DisplaySmall align="justify" color="primary" margin="my-6">
          Advanced Display Small Text with alignment, color, and custom margin
        </DisplaySmall>
      </section>

      {/* 7. Inline Text Elements */}
      <section>
        <Paragraph>
          Visit{' '}
          <LinkText
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </LinkText>{' '}
          for more information.
        </Paragraph>
        <Paragraph>
          Emphasizing text with <Emphasis>italic styling</Emphasis> for better
          readability.
        </Paragraph>
        <Paragraph>
          Strong text can be rendered as <Strong>bold</Strong> to highlight
          important parts.
        </Paragraph>
        <Paragraph>
          Highlighting text with{' '}
          <Highlight bgColor="yellow-200">background color</Highlight> for
          emphasis.
          <Highlight bgColor="blue-100" textColor="accent" padding="px-2 py-1">
            This text has a custom background, text color, and padding.
          </Highlight>
        </Paragraph>
      </section>

      {/* 8. Specialized Components */}
      {/* <section>
        <Blockquote cite="Albert Einstein">
          Life is like riding a bicycle. To keep your balance you must keep moving.
        </Blockquote>
        <Blockquote>
          A blockquote without citation.
        </Blockquote>

        <Paragraph>
          Inline code example: <Code>const hello = 'world';</Code>
        </Paragraph>
        </section>
        <section>



        <Heading level={4} align="center" color="accent">Basic Preformatted Example</Heading>
      <Preformatted language="python">
        {`def greet(name):
    return f"Hello, {name}!"`}
      </Preformatted>




        <Heading level={4} align="center" color="accent">Advanced Preformatted Example</Heading>
      

        <Paragraph>
          Tooltip example: <TooltipText tooltip="This is additional information" position="top">Hover over me</TooltipText>.
        </Paragraph>



        <Heading level={4} align="center" color="accent">
          Basic Code Example
        </Heading>
      <Code language="javascript">
        {`const greet = (name) => {
  return \`Hello, \${name}!\`;
};`}
      </Code>

        <Heading level={4} align="center" color="accent">
          Advanced Code Example
        </Heading>

      <Code
        language="typescript"
        theme="tomorrow"
        showLineNumbers
        wrapLines
        className="rounded-md overflow-x-auto p-4"
      >
        {`interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = (id: number): User => {
  // Fetch user from database
  return { id, name: 'John Doe', email: 'john.doe@example.com' };
};`}
      </Code>
      </section> */}

      {/* 9. Utility Components */}
      <section>
        <Label>Form Label</Label>
        <Paragraph>
          Example of a <Label color="accent">custom label</Label> within a
          paragraph.
        </Paragraph>

        <Caption>Image caption goes here.</Caption>
        <Caption className="text-gray-700">
          Advanced caption with custom color.
        </Caption>

        <Badge variant="filled" color="accent" size="md">
          New
        </Badge>
        <Badge variant="outlined" color="primary" size="sm" className="ml-2">
          Featured
        </Badge>
        <Badge variant="ghost" color="secondary" size="md" className="ml-2">
          Limited
        </Badge>
      </section>

      {/* 10. Responsive Text Components */}
      <section>
        <ResponsiveText
          sizes={{
            base: 'text-base',
            sm: 'text-sm',
            md: 'text-lg',
            lg: 'text-xl',
            xl: 'text-2xl',
          }}
          weight="regular"
          color="primary"
          align="center"
        >
          This text adjusts its size based on the screen width.
        </ResponsiveText>

        <FluidTypography
          minSize="1rem"
          maxSize="2rem"
          scalingFactor={2.5}
          unit="vw"
          weight="regular"
          color="secondary"
          align="center"
          className="mt-4"
        >
          Fluid typography that scales between 1rem and 2rem based on viewport
          width.
        </FluidTypography>
      </section>

      {/* 11. Themed Components */}
      <section>
        <ThemedText theme="light">
          This text adapts to the light theme.
        </ThemedText>
        <ThemedText theme="dark" className="p-4 rounded">
          This text adapts to the dark theme with padding and rounded corners.
        </ThemedText>
      </section>

      <section>
        <ColorText colorScheme="green">
          This text uses a predefined green color scheme.
        </ColorText>
        <ColorText colorScheme="blue" gradient>
          This text has a blue gradient.
        </ColorText>
        <ColorText colorScheme="purple" opacity={75}>
          This text has a purple color with 75% opacity.
        </ColorText>
      </section>

      {/* 12. Accessibility-Focused Components */}
      <section>
        <AccessibleText
          ariaLabel="Accessible button"
          role="button"
          tabIndex={0}
          focusable
          className="focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Accessible Text with ARIA attributes and focus styles
        </AccessibleText>

        <ReadableText>
          This text is optimized for readability with appropriate font size,
          line height, and color contrast.
        </ReadableText>
      </section>

      <section>
        <LinkExample />
      </section>
      <section>
        <TypographyCodeExample />
      </section>
    </div>
  );
};

export default TypographyExampleUsage;
