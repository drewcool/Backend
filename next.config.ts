import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Allow serving .mjs files from public/js/ with correct MIME type
  async headers() {
    return [
      {
        source: "/js/:path*.mjs",
        headers: [
          { key: "Content-Type", value: "application/javascript" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
