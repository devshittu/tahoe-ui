// src/app/playground/box/page.tsx
'use client';

import { BaseBox, StackBox } from '@/components/Box';
import AvatarImage from '@/components/Image/AvatarImage';
import BaseImage from '@/components/Image/BaseImage';
import CardImage from '@/components/Image/CardImage';
import {
  Heading,
  Hr,
  Link,
  ListItem,
  UnorderedList,
} from '@/components/Typography';
import TypographyExampleUsage from '@/components/Typography/TypographyExampleUsage';
import { Span } from 'next/dist/trace';
import React, { useState } from 'react';

const DemoPage = () => (
  <>
    <TypographyExampleUsage />

    <section>
      <h1 className="text-3xl font-bold">Typography Demo</h1>
      <Hr thickness="thin" color="blue" />
    </section>

    <section>
      <h2 className="text-xl font-semibold">Links</h2>
      <Link href="/about" underline external className="ml-4">
        External About Page
      </Link>
    </section>

    <section>
      <h2 className="text-xl font-semibold">Lists</h2>
      <UnorderedList className="ml-4">
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </UnorderedList>
    </section>

    <StackBox direction="row" gap="6" className="max-w-md text-center">
      <BaseBox>
        <Heading level={4}>Base Image Component</Heading>
        <BaseImage
          src="https://dummyimage.com/500x300"
          alt="Sample Image"
          width={600}
          height={400}
          shape="rounded"
          fallback={{ fallbackSrc: '/images/fallback.jpg' }}
          onLoaded={() => console.log('Image Loaded')}
          onErrorFallback={() => console.log('Fallback also failed')}
          className="shadow-md"
        />
      </BaseBox>
      <BaseBox>
        <Heading level={4}>AvatarImage Component</Heading>
        <AvatarImage
          src="https://dummyimage.com/100x100"
          alt="User 1"
          size="md"
          width={100}
          height={100}
          border
          shape="rounded"
        />
        <AvatarImage
          src="https://dummyimage.com/100x100"
          alt="User 2"
          size="lg"
          width={100}
          height={100}
        />
      </BaseBox>
      <BaseBox>
        <Heading level={4}>CardImage Demo</Heading>
        <CardImage
          src="https://dummyimage.com/400x250"
          alt="Card Image"
          width={400}
          height={250}
          overlayText={<span className="text-lg">Overlay Content</span>}
          overlayPosition="bottom"
          overlayBgColor="bg-black bg-opacity-40"
          caption="This is a caption for the card image."
        />
      </BaseBox>
    </StackBox>
  </>
);

export default DemoPage;
