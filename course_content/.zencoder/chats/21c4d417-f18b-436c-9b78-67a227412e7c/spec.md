# Technical Specification - SEO Hub Content Enhancement

## Architecture Overview
We will implement a file-based CMS for hub content, similar to how blog articles are handled.

### Content Storage
- **Location**: `src/content/hubs/[slug].md`
- **Format**: Markdown with optional frontmatter (title, description, etc.).

### Data Access Layer (`src/lib/blog.ts`)
- Add `getHubContent(keyword: string)`:
    - Normalize the keyword to a slug.
    - Look for a matching file in `src/content/hubs/`.
    - Parse using `gray-matter`.
    - Return the content and metadata.

### UI Layer (`src/app/blog/temas/[keyword]/page.tsx`)
- Call `getHubContent` in the `KeywordHubPage` component.
- If content exists:
    - Render it using `react-markdown` within a container styled with Tailwind's `prose` (via `@tailwindcss/typography`).
    - Position the content before or after the article grid (likely before for SEO "quality content" prominence).
- If no content exists:
    - Maintain current behavior (hero + article grid).

## Implementation Phases

### Phase 1: Infrastructure
- Create `src/content/hubs/` directory.
- Update `src/lib/blog.ts` with `getHubContent`.
- Update `src/app/blog/temas/[keyword]/page.tsx` to handle rendering.

### Phase 2: Content Generation
- Generate high-quality content (~1500 words) for `ejercicios-condicionales-ingles`.
- Create the corresponding markdown file.

### Phase 3: Verification
- Verify the rendering and SEO structure.
- Run `npm run lint` and `npm run type-check`.

## Data Model
```typescript
interface HubContent {
  title?: string;
  description?: string;
  content: string;
}
```
