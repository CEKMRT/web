/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Other Next.js configuration options
};

export default nextConfig;
