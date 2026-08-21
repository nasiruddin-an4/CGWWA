import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  serverExternalPackages: ['react-pdf', 'pdfjs-dist'],
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    config.module.rules.push({
      test: /pdf\.m?js$/,
      type: 'javascript/auto',
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
