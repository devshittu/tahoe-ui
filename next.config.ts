import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
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
