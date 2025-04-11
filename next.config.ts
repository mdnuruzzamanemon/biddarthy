import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["api.biddarthi.org"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.biddarthi.org",
        pathname: "/**", // Updated to match all paths
      },
      {
        protocol: "https",
        hostname: "*.biddarthi.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
