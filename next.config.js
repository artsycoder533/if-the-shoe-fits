/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    domains: ["cdn.shopify.com", "gid://shopify/MediaImage/"],
  },
  experimental: {
    serverActions: true,
  },
};
