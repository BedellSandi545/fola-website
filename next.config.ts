import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Required allowlist since Next.js 16. 70 for large photography, 80 for portraits/logos.
    qualities: [70, 80],
    formats: ["image/avif", "image/webp"],
  },
  // One canonical host: www.folacreativeagency.com permanently redirects to the apex
  // domain, keeping the path and query, so search engines index a single copy.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.folacreativeagency.com" }],
        destination: "https://folacreativeagency.com/:path*",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
