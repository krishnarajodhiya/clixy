import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow image optimization from Supabase
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
