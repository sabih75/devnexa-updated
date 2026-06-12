import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Uncomment this line if you are exporting static files for Hostinger static hosting
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
