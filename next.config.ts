import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.biddarthi.org",
        pathname: "/uploads/**", // Adjust this based on your API response
      },
      {
        protocol: "https",
        hostname: "biddarthi-backend.pirhotech.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
