import type { NextConfig } from "next";
import path from "node:path";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// GitHub CI runs lint and type checks without Cloudflare credentials; those
// commands do not need a live Workers runtime. Keep local Next dev integration.
if (process.env.CI !== "true" && process.env.NODE_ENV !== "production") {
  initOpenNextCloudflareForDev();
}

const nextConfig: NextConfig = {
  // Keep tracing inside this independent app, not at the repository root.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
