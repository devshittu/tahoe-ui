'use client';

import { useRef, useEffect } from 'react';
import { Heading } from '../Typography';
import Link from './Link';

const LinkExample = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (linkRef.current) {
      // We can do advanced DOM manipulations or logs
      console.log('Link element:', linkRef.current);
    }
  }, []);

  const handleAnalytics = () => {
    // trackEvent('LinkClick', { destination: '/sale' });
    console.log('Link clicked!');
  };
  return (
    <div className="p-8 space-y-12">
      {/* 1. Basic Code Example */}
      <section>
        <Heading level={2} align="left" color="accent">
          Basic Internal Link
        </Heading>

        <Link href="/about" variant="primary">
          Go to About Page
        </Link>
        <Heading level={2} align="left" color="accent">
          External Link{' '}
        </Heading>

        <Link href="https://stevejob.org" external variant="neutral">
          SteveJob.org
        </Link>
        <Heading level={2} align="left" color="accent">
          External Link{' '}
        </Heading>

        <Link href="https://stevejob.org" external variant="neutral">
          SteveJob.org
        </Link>
        <Heading level={2} align="left" color="accent">
          Active Styling{' '}
        </Heading>

        <nav className="flex space-x-4">
          <Link href="/" activeClassName="text-accent font-semibold">
            Home
          </Link>
          <Link href="/blog" activeClassName="text-accent font-semibold">
            Blog
          </Link>
          <Link href="/contact" activeClassName="text-accent font-semibold">
            Contact
          </Link>
        </nav>

        <Heading level={2} align="left" color="accent">
          Prefetching & Refs{' '}
        </Heading>
        <Link
          ref={linkRef}
          href="/special-offer"
          prefetch={true}
          variant="secondary"
        >
          Special Offer
        </Link>

        <Link href="/sale" onClick={handleAnalytics} variant="secondary">
          Big Sale
        </Link>
        {/* <Paragraph>
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
        </Code> */}
      </section>
    </div>
  );
};

export default LinkExample;
