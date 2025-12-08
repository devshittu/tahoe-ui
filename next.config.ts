import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.s3.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos', // Add this
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/storybook/:path*',
        destination: '/storybook/:path*',
      },
      {
        source: '/storybook',
        destination: '/storybook/index.html',
      },
    ];
  },
};

export default nextConfig;

// next.config.ts
