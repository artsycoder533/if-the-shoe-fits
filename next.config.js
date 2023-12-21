/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com'
      },
      {
        protocol: 'https',
        hostname: 'shopify-shop-assets.storage.googleapis.com'
      }
    ],
  },
};

module.exports = nextConfig;
