import type { NextConfig } from 'next';

const nextConfig = {
  // This sets an "allow list" to define from where we can get our images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Page where we'll be getting the images from
        hostname: 'images.unsplash.com',
        port: '',
        // Wildcard to represent that any url will be able
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
