import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Base path for Traefik path-based routing (set via env or default to empty for local dev)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
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
