# Technical Specification - SEO Content Strategy

## 1. Technical Context
- **Framework**: Next.js 15 (App Router).
- **Language**: TypeScript.
- **Content Format**: Markdown (.md) with YAML Frontmatter.
- **Styling**: Tailwind CSS (used in components rendering the markdown).
- **Content Location**: `src/content/blog/` (and subdirectories).

## 2. Implementation Approach
The strategy follows a **Hub and Spoke** internal linking model.
- **Hubs**: Main category pages (Grammar, Vocabulary, Skills) and specialized routes.
- **Spokes**: Detailed SEO-optimized articles that link back to hubs.

### Mapping Strategy
Articles will be distributed across existing and new directories in `src/content/blog/`:
- `seo/`: General level-based guides (A1-C2) and niche professional topics.
- `metodos/`: General learning methods, apps, and AI tools.
- `examenes/`: Certification-specific content.
- `trabajo/`: Business English, interviews, and CVs.
- `viajes/`: Travel-specific guides and phrases.

## 3. Data Model (Frontmatter Schema)
All new articles must adhere to the following frontmatter structure for compatibility with `src/lib/blog.ts`:

```yaml
category: "category_name" # (e.g., seo, metodos, examenes, trabajo, viajes)
date: "YYYY-MM-DD"
author: "Focus English"
title: "SEO Optimized Title | Focus English"
description: "Compelling meta description (150-160 characters)."
keywords: ["keyword 1", "keyword 2", "keyword 3"]
canonical: "https://www.focus-on-english.com/blog/temas/slug"
related_routes: ["slug-1", "slug-2"]
faqs:
  - question: "Question text?"
    answer: "Answer text."
```

## 4. Source Code Structure Changes
No changes to the application logic are required. The implementation is purely content-based:
- Add multiple `.md` files to `src/content/blog/`.
- Organize files into subdirectories for better management.

## 5. Delivery Phases
Due to the large number of URLs, implementation will be divided into thematic batches:
1. **Phase 1**: Levels & General SEO (A1-C2, general online courses).
2. **Phase 2**: Professional & Business English (Interviews, CVs, specialized sectors).
3. **Phase 3**: Exams & Certifications (Cambridge, Aptis, IELTS, TOEFL).
4. **Phase 4**: Travel & Survival English.
5. **Phase 5**: Tools & AI (Apps, AI tutoring).

## 6. Verification Approach
- **Linting**: Ensure no broken links in Markdown files.
- **Content Validation**: Use `npm run validate-exercises` (if applicable) and manual check for frontmatter consistency.
- **SEO Audit**: Verify that `canonical` URLs and `keywords` match the requirements.
- **Internal Linking**: Check that `related_routes` point to valid existing slugs.
