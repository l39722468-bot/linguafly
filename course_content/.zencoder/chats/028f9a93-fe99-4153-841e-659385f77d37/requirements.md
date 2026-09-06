# Product Requirements Document (PRD): SEO Fixes for Focus English

## Overview
The goal of this task is to resolve SEO issues identified by SE Ranking, specifically "Non-canonical pages in the sitemap XML" and "Duplicate page titles (Artículo no encontrado)".

## Problem Description
1.  **Incorrect Canonical Tags**: Some blog articles have `canonical` frontmatter pointing to the old domain `focusonenglish.ai` instead of the current `www.focus-on-english.com`.
2.  **Broken Internal Links**: Links within blog posts are using incorrect category paths (e.g., `/blog/trabajo/cursos-online-ingles-b1` instead of `/blog/metodos/cursos-online-ingles-b1`), leading to 404-like pages that still return a "200 OK" status with the title "Artículo no encontrado".
3.  **Sitemap Inconsistency**: The sitemap might be including URLs that redirect or have incorrect canonicals.

## Requirements
- All `canonical` tags in blog frontmatter must point to `https://www.focus-on-english.com` or be relative to it.
- All internal blog links `(/blog/[category]/[slug])` must be verified and corrected to use the actual category assigned to the target article.
- The `generateMetadata` function in the blog page should handle missing articles in a way that doesn't create duplicate "Artículo no encontrado" titles for the crawler (e.g., by ensuring `notFound()` is handled correctly or using `robots: 'noindex'` for missing pages).

## Success Criteria
- No "Non-canonical pages" errors in SE Ranking for the sitemap.
- No "Duplicate title" errors for "Artículo no encontrado".
- All internal links correctly navigate to existing blog posts.
