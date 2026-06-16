import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the project root to THIS folder. Without this, Next/Turbopack infers
  // the parent ".../AAA" directory (which holds ~15 sibling projects) as the
  // workspace root and watches its entire tree — exhausting RAM/CPU and
  // breaking the `tailwindcss` import resolution. Keep watching scoped here.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aaa-accreditation.org',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dldhco0xk/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
