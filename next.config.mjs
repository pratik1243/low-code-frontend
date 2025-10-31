/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // experimental: {
  //   optimizeCss: true,
  // },
  images: {
    domains: ["low-code-backend.vercel.app", "localhost"],    
  },
};

export default nextConfig;
