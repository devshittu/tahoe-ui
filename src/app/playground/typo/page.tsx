// src/app/playground/box/page.tsx
'use client';

import {
  Hr,
  Image,
  Link,
  ListItem,
  UnorderedList,
} from '@/components/Typography';
import TypographyExampleUsage from '@/components/Typography/TypographyExampleUsage';
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

    <section>
      <h2 className="text-xl font-semibold">Images</h2>
      {/* Default image */}
      <Image
        src="https://dummyimage.com/576x329"
        alt="description"
        width={300}
        height={200}
        variant="default"
      />

      {/* Rounded with shadow & retina set */}
      <Image
        src="https://dummyimage.com/400x300"
        alt="description"
        width={400}
        height={300}
        variant="shadow"
        grayscale
        blurOnHover
        retina
        className="my-4"
      />

      {/* Circle image */}
      <Image
        src="https://dummyimage.com/384x384"
        alt="circle image"
        width={384} // ~ w-96
        height={384} // ~ h-96
        variant="circle"
        className="my-4"
      />

      {/* Caption image */}
      <Image
        src="https://dummyimage.com/500x300"
        alt="image with caption"
        width={500}
        height={300}
        variant="caption"
        caption="Image caption text here"
      />

      {/* Card-like image with link & overlay text */}
      <Image
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png"
        alt="card image"
        width={400}
        height={250}
        variant="card"
        retina
        caption="Do you want to get notified when a new component is added?"
        link="#"
        className="my-4"
      />
    </section>
  </>
);

export default DemoPage;
