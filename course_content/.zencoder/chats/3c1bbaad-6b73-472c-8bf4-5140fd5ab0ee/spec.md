# Technical Specification: SEO Strategy for "Cursos Online Inglés B1"

## 1. Technical Context
- **Framework**: Next.js 15 (App Router).
- **Language**: TypeScript.
- **Content Management**: Markdown files in `src/content/seo-pages` for static SEO pages and Supabase for dynamic SEO phrases.
- **Styling**: Tailwind CSS.
- **Icons**: Lucide React.

## 2. Implementation Approach
We will use the existing SEO infrastructure defined in `src/lib/seo.ts` and `src/content/seo-pages`.

### 2.1. Pillar Page Implementation
- **File**: `src/content/seo-pages/cursos-online-ingles-b1.md`
- **Pattern**: Create a comprehensive Markdown file with frontmatter for SEO metadata (title, description, keywords, FAQs).
- **Structure**:
  - H1: Cursos Online de Inglés B1: Consigue tu Título Oficial.
  - Sections: What is B1, Syllabus, Benefits of our Platform, FAQ.

### 2.2. Supporting Content (Topic Cluster)
- **Files**: Create 3-5 Markdown files in `src/content/seo-pages/rutas/` to support the pillar.
  - `preparacion-examen-b1-cambridge.md`
  - `gramatica-ingles-b1-guia.md`
  - `vocabulario-b1-ingles-trabajo.md`
- **Internal Linking**: Each file will include a `related_routes` field in frontmatter or explicit links in the content pointing to the pillar page.

### 2.3. Data Model / Interface Changes
No changes needed to `SEOPage` interface in `src/lib/seo.ts` as it already supports:
- `slug`, `title`, `description`, `keywords`, `faqs`, `content`, `canonical`, `related_routes`.

### 2.4. SEO Components
- Ensure `<SEOHeader />` (if exists) or equivalent in `layout.tsx` consumes the data from `getSEOPageBySlug`.
- Implement **JSON-LD Schema** injection in the pillar page component.

## 3. Delivery Phases
- **Phase 1: Content Foundation**: Create the Pillar Page and core Metadata.
- **Phase 2: Cluster Expansion**: Create supporting "Spoke" pages with internal links.
- **Phase 3: Technical Optimization**: Implement FAQ and Course Schema.

## 4. Verification Approach
- **Lint**: `npm run lint`
- **Types**: `npm run typecheck`
- **SEO Validation**: Check generated HTML for `title`, `meta description`, `canonical` tags, and `Schema.org` markup.
