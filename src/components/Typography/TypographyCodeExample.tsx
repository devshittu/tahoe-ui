'use client';

import React from 'react';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Code from './Code';
import Preformatted from './Preformatted';
import Badge from './Badge';
import InlineCode from './InlineCode';
import { MarqueeText } from './MarqueeText';

const TypographyCodeExample = () => {
  return (
    <div className="p-8 space-y-12">
      {/* 1. Basic Code Example */}
      <section>
        <Heading level={2} align="left" color="accent">
          Basic InlineCode Example
        </Heading>

        <Paragraph>
          To declare a constant in JavaScript, use the{' '}
          <InlineCode>const</InlineCode> keyword.
        </Paragraph>

        <Heading level={2} align="left" color="accent">
          Basic AdvancedInlineCode Example
        </Heading>
        <Paragraph>
          In React, you can manage state using the{' '}
          <InlineCode language="javascript" ariaLabel="useState hook">
            useState
          </InlineCode>{' '}
          hook for functional components.
        </Paragraph>

        <Heading level={2} align="left" color="accent">
          Basic Code Example
        </Heading>
        <Paragraph>Below is a simple JavaScript function:</Paragraph>
        <Code language="javascript">
          {`const add = (a, b) => {
  return a + b;
};`}
        </Code>
      </section>

      {/* 2. Advanced Code Example with Line Numbers and Custom Theme */}
      <section>
        <Heading level={2} align="left" color="accent">
          Advanced Code Example
        </Heading>
        <Paragraph>
          Below is a TypeScript interface with line numbers and a custom theme:
        </Paragraph>
        <Preformatted
          language="typescript"
          theme="tomorrow"
          showLineNumbers
          wrapLines
          className="bg-gray-900 text-white p-4 rounded-lg"
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
        </Preformatted>
      </section>

      {/* 3. Code Example with Unsupported Language (Graceful Fallback) */}
      <section>
        <Heading level={2} align="left" color="accent">
          Code Example with Unsupported Language
        </Heading>
        <Paragraph>
          If an unsupported language is provided, Prism.js will render the code
          without highlighting:
        </Paragraph>
        <Code language="unknown">
          {`This is some code in an unsupported language.`}
        </Code>
      </section>

      {/* 4. Preformatted Code with Long Lines and Overflow Handling */}
      <section>
        <Heading level={2} align="left" color="accent">
          Preformatted Code with Long Lines
        </Heading>
        <Paragraph>
          This example demonstrates how the component handles long lines of code
          with horizontal scrolling:
        </Paragraph>
        <Preformatted
          language="css"
          showLineNumbers
          wrapLines={false}
          className=" p-4 rounded-lg"
        >
          {`.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin: 0 auto;
  max-width: 1200px;
  background-color: #f9f9f9;
  border: 1px solid #eaeaea;
}`}
        </Preformatted>
      </section>

      {/* 5. Code Example with Custom Class Names */}
      <section>
        <Heading level={2} align="left" color="accent">
          Code Example with Custom Class Names
        </Heading>
        <Paragraph>
          You can pass additional Tailwind classes to further customize the code
          block:
        </Paragraph>
        <Code
          language="jsx"
          theme="tomorrow"
          showLineNumbers
          className="shadow-lg"
        >
          {`const App = () => {
  return (
    <div className="container">
      <h1>Hello, World!</h1>
    </div>
  );
};`}
        </Code>
      </section>

      {/* 6. Badge Example within Code */}
      <section>
        <Heading level={2} align="left" color="accent">
          Code Example with Badge
        </Heading>
        <Paragraph>
          You can integrate badges or other components within or around your
          code blocks:
        </Paragraph>
        <div className="flex items-center space-x-2">
          <Badge variant="filled" color="accent" size="md">
            New
          </Badge>
          <Preformatted
            language="python"
            showLineNumbers
            wrapLines
            className="bg-gray-800 text-green-400 p-4 rounded-lg"
          >
            {`def greet(name):
    return f"Hello, {name}!"`}
          </Preformatted>
        </div>
      </section>
      <section>
        <Heading level={2} align="left" color="accent">
          Code Example MarqueeText
        </Heading>
        <main className="p-6 space-y-6">
          {/* 1) Basic usage: lazy on hover, resets on mouse leave */}
          <MarqueeText
            className="max-w-[250px]"
            speed={6}
            direction="left"
            cycles="infinite"
          >
            Hover me to see the marquee animation. Leave me to reset to start.
          </MarqueeText>

          {/* 2) Auto-run (lazyHover=false) => warns about CPU usage if repeated thousands of times */}
          <MarqueeText
            className="max-w-[300px]"
            lazyHover={false}
            speed={5}
            cycles={2}
            direction="right"
          >
            This marquee auto-runs if truncated, loops 2 times, then stops.
            After that, no more marquee.
          </MarqueeText>

          {/* 3) Using RTL + resetOnMouseLeave is optional (defaults to true) */}
          <MarqueeText className="max-w-[200px]" rtl direction="left" speed={7}>
            {
              'مرحباً! نص عربي طويل. Hover => slides, mouse leave => reset to start.'
            }
          </MarqueeText>
        </main>
      </section>
    </div>
  );
};

export default TypographyCodeExample;
