/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  images: {
    domains: ['osean.online'],
  },
  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
