# Technical Specification: SEO Fixes for Focus English

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Content**: Markdown/MDX files in `src/content/blog/`
- **Logic**: `src/lib/blog.ts`, `src/app/blog/[category]/[slug]/page.tsx`, `src/app/sitemap.ts`

## Implementation Approach

### 1. Fix Canonical Tags
- Perform a global search in `src/content/blog/` for `canonical: "https://focusonenglish.ai/` and replace with `canonical: "https://www.focus-on-english.com/`.
- Verify if any other incorrect domains are used in canonical tags.

### 2. Fix Broken Internal Links
- Use a script or grep to find all internal blog links in markdown files: `(/blog/...)`.
- For each link, verify that the category in the path matches the `category` frontmatter of the target article.
- Fix identified mismatches.

### 3. Improve Missing Article Handling
- Update `generateMetadata` in `src/app/blog/[category]/[slug]/page.tsx` to return `robots: 'noindex'` or let it throw `notFound()` indirectly if possible, to avoid indexing "Artículo no encontrado" pages.
- Currently, `generateMetadata` returns a title when the article is null. We should improve this.

### 4. Sitemap Verification
- Ensure `src/app/sitemap.ts` only uses canonical URLs. Since it uses `article.category` and `article.slug` from the actual files, it should be correct once the files are corrected.

## Verification Approach
- Run `npm run build` to ensure all static pages can be generated without errors.
- Manually verify the sitemap output at `/sitemap.xml` (can be simulated in dev).
- Use `grep` to verify no more `focusonenglish.ai` references exist in content.
