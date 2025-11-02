import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true }, // disable Next image optimizer on Workers
};

export default nextConfig;
