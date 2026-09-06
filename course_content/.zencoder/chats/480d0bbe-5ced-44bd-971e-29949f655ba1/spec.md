# Technical Specification: Fix SEO Indexing Issues

## 1. Context
- **Language**: TypeScript / Next.js
- **Content**: Markdown files with gray-matter frontmatter
- **Location**: `src/content/blog/`
- **Sitemap**: `src/app/sitemap.ts`

## 2. Implementation Approach

### 2.1. Update Article Dates
Iterate through all Markdown files in `src/content/blog/viajes/` and `src/content/blog/trabajo/` and update any `date` that is in the future. We will set them to `2026-01-30` or earlier.

### 2.2. Enhance Sitemap Logic
Modify `src/app/sitemap.ts` to use the `date` from the blog articles as the `lastModified` property.

### 2.3. Add Internal Links
Identify high-traffic pages (like `/aprender-ingles`) and ensure they link to the specific blog categories or articles that are having trouble being indexed.

## 3. Detailed Tasks

### Task 1: Fix Frontmatter Dates
- Search for all `.md` files in `src/content/blog`.
- Replace `date: "2026-02-..."` with `date: "2026-01-30"`.

### Task 2: Update `sitemap.ts`
- Modify the sitemap generation logic to use `new Date(article.date)` for `lastModified`.

### Task 3: Content Audit (Minor)
- Review the content of affected articles for "thin content" signals.
- Ensure `title` tags are unique and descriptive.

## 4. Verification Approach
- **Local Sitemap Check**: Run the dev server and check `http://localhost:3000/sitemap.xml` to verify `lastmod` dates.
- **Metadata Check**: Visit several blog posts locally and inspect the `<meta property="article:published_time">` tag.
- **Build Verification**: Run `npm run build` to ensure no regressions in static generation.
