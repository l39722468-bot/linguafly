import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // This app ships on its own. Tracing stays inside apps/lingua-ai so the
  // lockfile at the repository root is not treated as the project root.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
