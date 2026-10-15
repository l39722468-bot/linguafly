import type { NextConfig } from "next";
import path from "node:path";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Keep tracing inside this independent app, not at the repository root.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
