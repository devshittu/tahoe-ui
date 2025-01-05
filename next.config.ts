import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: true,
  images: {
    domains: [
      'flowbite.s3.amazonaws.com', // Add external image domains here
      'your-other-domain.com', // Include any other domains hosting images
      'dummyimage.com', // Include any other domains hosting images
      'i.scdn.co',
    ],
  },
};

export default nextConfig;
