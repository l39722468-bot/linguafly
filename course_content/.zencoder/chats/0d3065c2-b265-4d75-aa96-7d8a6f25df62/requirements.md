# Product Requirements Document (PRD): Dynamic Blog System

## 1. Goal
The primary goal is to transition the current hardcoded blog index page into a fully dynamic system that automatically discovers and displays articles stored as Markdown files in the `src/content/blog/` directory.

## 2. Target Audience
- Students and professionals looking for specialized English learning content.
- Content managers who want to add new articles without modifying code.

## 3. Key Features
- **Automatic Article Discovery**: Recursively read all `.md` and `.mdx` files from `src/content/blog/`.
- **Dynamic Index Page**: Replace hardcoded `blogCategories` and `featuredGuide` in `src/app/blog/page.tsx` with data fetched from the file system.
- **Categorization**: Automatically group articles based on the `category` field in their frontmatter.
- **Sorting**: Display articles within categories sorted by their `date` in descending order.
- **Featured Article Selection**: Support a `featured: true` flag in frontmatter to determine which article appears in the hero section.
- **SEO Optimization**: Ensure meta titles and descriptions are dynamically generated from article metadata.
- **Breadcrumb & Schema Support**: Maintain existing JSON-LD and breadcrumb functionality using dynamic data.

## 4. Success Criteria
- Adding a new Markdown file to `src/content/blog/` automatically updates the blog index page.
- The blog index page maintains its current design and layout but uses dynamic data.
- SEO scores (via Lighthouse or similar tools) remain high or improve.

## 5. Constraints
- Must use existing Next.js 15 patterns and libraries (e.g., `gray-matter`).
- Must preserve the existing styling and UI components.
