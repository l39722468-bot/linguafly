# Generated blog data (Cloudflare Workers)

Produced by `scripts/export-blog-data.ts` during `npm run cf:build` / `npm run export:blog-data`.

Workers have no filesystem access to `src/content/blog`. These JSON files are imported
by `src/lib/blog.ts` and `src/lib/blog-course-map.ts` so the blog and exercise map work
at the edge.

Regenerate after adding or editing markdown articles before relying on the CF fallback.
