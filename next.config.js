/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  images: {
    domains: ["osean.online", "www.booking-manager.com"],
  },
  staticPageGenerationTimeout: 1000,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
