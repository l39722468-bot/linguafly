import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * OpenNext → Cloudflare Workers.
 *
 * staticAssetsIncrementalCache: copia el HTML/RSC prerenderizado a ASSETS.
 * Sin esto, el Worker re-ejecuta las páginas "estáticas" en runtime (sin fs)
 * y el blog queda vacío aunque next build hubiera generado bien el contenido.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
