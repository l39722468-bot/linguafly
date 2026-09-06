# Technical Specification - SEO Optimizations

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & static CSS files

## Implementation Approach

### 1. Noindex Directive
- We will use the Next.js `metadata` API to add `robots: { index: false, follow: false }` to the targeted routes.
- Since many of these are directories, we can apply the metadata in their top-level `layout.tsx` or a root-level `page.tsx` within those directories.
- For paths like `/privacidad` and `/terminos`, we will edit their specific `page.tsx`.

### 2. CSS Optimization
- Examine `src/content/content 2/lib/rise/5ad35f88.css`.
- If it's a third-party library file that is not minified, we will minify it.
- If it contains many unused styles, we will try to purge them or suggest moving to Tailwind if feasible, but for now, minification is the primary target.

### 3. Server-side Compression
- Update `next.config.js` to include `compress: true`. Next.js enables this by default, but explicitly setting it ensures it's active.

## Delivery Phases

### Phase 1: SEO - Noindex
- Identify `layout.tsx` or `page.tsx` for all disallowed routes.
- Apply `metadata` with `noindex`.

### Phase 2: CSS Optimization
- Minify `src/content/content 2/lib/rise/5ad35f88.css`.
- Check other CSS files for potential optimization.

### Phase 3: Server Configuration
- Update `next.config.js`.

## Verification Plan
- **Noindex**: Use `curl` or check the source of the rendered pages to confirm the presence of `<meta name="robots" content="noindex, nofollow">`.
- **CSS**: Compare file sizes before and after.
- **Compression**: Use `curl -I -H "Accept-Encoding: gzip" [URL]` and check for `content-encoding: gzip`.
