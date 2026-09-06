# Product Requirements Document (PRD) - SEO Optimizations

## Overview
Improve SEO and performance of the Focus English platform by implementing `noindex` directives for blocked pages, optimizing large CSS files, and configuring server-side compression.

## Requirements

### 1. SEO: Noindex for Blocked Pages
- Pages listed as `disallow` in `robots.txt` (via `src/app/robots.ts`) must have the `noindex` directive to ensure search engines do not index them even if they find links to them.
- Target paths:
  - `/cuenta/`
  - `/dashboard/`
  - `/api/`
  - `/auth/`
  - `/checkout/`
  - `/admin/`
  - `/curso/`
  - `/demo-course/`
  - `/privacidad`
  - `/terminos`
  - `/lecciondemuestra`

### 2. CSS Optimization
- Analyze and optimize large CSS files, specifically `src/content/content 2/lib/rise/5ad35f88.css` (764KB).
- Goal: Reduce file size through minification, removing unused styles, or splitting if possible.

### 3. Server-side JavaScript Compression
- Ensure server-side compression (gzip/brotli) is enabled for JavaScript and other assets in the Next.js configuration.

## Success Criteria
- Disallowed pages return `<meta name="robots" content="noindex, nofollow">`.
- CSS bundle size is reduced.
- `Content-Encoding` header (gzip or br) is present in server responses for JS/CSS assets.
