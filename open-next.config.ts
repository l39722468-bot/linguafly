import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Config mínima OpenNext → Cloudflare Workers.
 * Más adelante se puede activar incremental cache en R2:
 *   import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
 *   export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });
 */
export default defineCloudflareConfig();
