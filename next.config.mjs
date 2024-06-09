// Import the necessary modules
import nextSitemapConfig from './next-sitemap.config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL,
  },
  // Other Next.js configuration options
};

export default nextConfig;
