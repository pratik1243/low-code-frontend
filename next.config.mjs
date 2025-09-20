/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
