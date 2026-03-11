/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["blob.v0.dev", "localhost", "127.0.0.1", "images.unsplash.com"],
    unoptimized: true,
  },
  output: "standalone",
  poweredByHeader: false,
}

module.exports = nextConfig
