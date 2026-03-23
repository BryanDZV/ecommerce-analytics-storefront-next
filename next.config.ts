import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

// bundleAnalyzer will only be activated whenever we use the env variable
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
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

export default withBundleAnalyzer(nextConfig);