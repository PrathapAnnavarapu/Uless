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
    // remotePatterns is the preferred modern way
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This is a wildcard: allows ANY https domain
      },
    ],
    // Keep domains for specific legacy support if needed
    domains: ["blob.v0.dev", "localhost", "127.0.0.1", "images.unsplash.com", "share.google"],
    unoptimized: true,
  },
  output: "standalone",
  poweredByHeader: false,
}

module.exports = nextConfig