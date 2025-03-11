import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["zjkqxhdpkszybgqtkvye.supabase.co"],
  },
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  }
};

export default nextConfig;
