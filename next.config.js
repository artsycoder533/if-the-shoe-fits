/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    domains: [
      "cdn.shopify.com",
      "gid://shopify/MediaImage/",
      "shopify-shop-assets.storage.googleapis.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};
