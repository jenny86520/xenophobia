/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEST_PUBLIC_SERVER_HOST: process.env.NEST_PUBLIC_SERVER_HOST,
  },
};

module.exports = nextConfig;
