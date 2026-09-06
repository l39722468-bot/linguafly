# PRD: SEO Audit for Focus English Blog

## Background
Focus English uses a Next.js 15 blog with Markdown-based content. SEO is a critical driver for traffic, and while basic SEO features are implemented (Metadata, JSON-LD, Sitemap), a comprehensive audit is needed to ensure maximum visibility and compliance with 2026 SEO best practices.

## Objectives
1.  **Analyze** the current SEO implementation in the blog.
2.  **Identify** gaps in metadata, structured data, and content structure.
3.  **Propose** and implement improvements to enhance search engine visibility.
4.  **Ensure** all blog posts follow a consistent SEO-friendly pattern.

## Requirements

### 1. Metadata Audit & Enhancement
- **Dynamic Titles**: Ensure the "2026" year inclusion logic is working correctly for all articles.
- **Description/Excerpts**: Audit all existing `.md` files to ensure they have high-quality excerpts (meta descriptions).
- **Keywords**: Ensure `keywords` field is present and relevant in all markdown frontmatter.
- **OpenGraph/Twitter**: Verify that social images and tags are correctly generated for all posts.

### 2. Content Structure Audit
- **Heading Hierarchy**: Ensure markdown content uses a correct H1-H6 hierarchy.
- **Image Alts**: The current markdown-to-html converter does not handle image `alt` attributes for images *inside* the content. This must be fixed.
- **Internal Linking**: Identify opportunities for internal linking within existing blog posts to improve domain authority distribution.
- **Table of Contents**: Ensure the `TableOfContents` component is correctly integrated and accessible.

### 3. Structured Data (JSON-LD)
- **Article Schema**: Verify all fields are correctly populated, especially `datePublished` and `author`.
- **Breadcrumb Schema**: Ensure the hierarchy matches the URL silo structure.
- **FAQ Schema**: Check if any blog posts would benefit from FAQ schema injection.

### 4. Technical SEO
- **Sitemap**: Verify all blog categories and articles are included in `sitemap.xml`.
- **Robots.txt**: Ensure proper crawling rules are set.
- **Canonical Tags**: Confirm canonical tags point to the primary URL.
- **Core Web Vitals**: Ensure images use Next.js `Image` component with appropriate `alt` and `loading` strategies.

## Success Metrics
- 100% of blog posts have complete frontmatter (title, excerpt, keywords, category, author, date, image).
- Markdown-to-HTML converter handles image `alt` tags and proper heading hierarchy.
- Validated JSON-LD schemas with no errors.
- Correct Sitemap and Robots.txt configuration.

## User Clarifications Needed
- Should we add specific social share metadata for WhatsApp/Telegram specifically, or is OG/Twitter enough? (Assumption: OG/Twitter is sufficient).
- Are there specific target keywords for each category we should prioritize?
