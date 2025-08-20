import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  matcher: ['/', '/((?!maintenance).*)'],
};

export default nextConfig;
