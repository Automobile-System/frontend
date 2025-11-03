import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow next/image to load from images.unsplash.com
  images: {
    domains: ["images.unsplash.com"],
    // Alternatively you can use remotePatterns if you need fine-grained control:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.unsplash.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
};

export default nextConfig;
