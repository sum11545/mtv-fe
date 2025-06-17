/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
