# Technical Specification: Dynamic Blog System

## 1. Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Content Format**: Markdown (.md) / MDX (.mdx)
- **Metadata Parsing**: `gray-matter`
- **Styling**: Tailwind CSS

## 2. Implementation Approach

### 2.1. Shared Data Access Layer
Create a utility file `src/lib/blog.ts` to centralize file system operations. This avoids duplication between the index page and individual article pages.

**Functions to implement:**
- `getBlogArticles()`: Recursively reads all articles, parses frontmatter, and returns a sorted list.
- `getArticleBySlug(slug: string)`: Finds and returns a single article's content and metadata.
- `getArticlesByCategory(category: string)`: Returns articles filtered by category.

### 2.2. Interface Definition
```typescript
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  readTime: string;
  image?: string;
  keywords?: string[];
  featured?: boolean;
  content: string;
}
```

### 2.3. Index Page Refactoring (`src/app/blog/page.tsx`)
- Replace hardcoded `blogCategories` and `featuredGuide` with calls to `getBlogArticles()`.
- Group articles by category dynamically using the `category` field from frontmatter.
- Select the `featured` article based on the `featured: true` flag (fallback to latest article if none marked).

### 2.4. Article Page Update (`src/app/blog/[slug]/page.tsx`)
- Update to use the shared `getArticleBySlug` and `getBlogArticles` (for `generateStaticParams`).
- Ensure consistent metadata handling.

## 3. Data Model Changes
No database changes required. The "database" is the file system under `src/content/blog/`.

## 4. Delivery Phases
1. **Phase 1: Lib Layer**: Create `src/lib/blog.ts` with core utility functions.
2. **Phase 2: Article Page Refactor**: Update `src/app/blog/[slug]/page.tsx` to use the new library.
3. **Phase 3: Index Page Refactor**: Update `src/app/blog/page.tsx` to be fully dynamic.
4. **Phase 4: Verification**: Test with sample articles and run lint/typecheck.

## 5. Verification Approach
- **Manual Verification**: Add a new `.md` file and verify it appears on the index page.
- **Type Checking**: Run `npm run typecheck` to ensure interface consistency.
- **Linting**: Run `npm run lint`.
