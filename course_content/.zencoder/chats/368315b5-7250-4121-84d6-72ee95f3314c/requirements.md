# Requirements - SEO Fixes (308 Redirects & Favicon)

## Overview
The goal is to improve the website's SEO by resolving 308 Permanent Redirect errors and adding a missing favicon.

## Goals
1. **Resolve 308 Redirect Errors**: 
    - Identify the cause of 308 redirects (Next.js default for permanent redirects and trailing slash auto-redirects).
    - Convert permanent redirects from 308 to 301 if requested by the user's SEO requirements (as 308 is often flagged by older SEO tools).
    - Ensure internal linking consistency to avoid unnecessary redirects.
2. **Add Favicon**:
    - Create a favicon that matches the brand identity (specifically the "F" logo seen in the Navigation component).
    - Configure the website to correctly display the favicon across all pages.

## Requirements
### 1. 308 Redirects
- Analyze `next.config.js` redirects.
- Since Next.js `permanent: true` defaults to 308, we will explore options to force 301 or ensure that the user is okay with 308 if it's the modern standard. However, given the prompt "solucionar errores 308", we will aim to provide 301 status codes where possible or eliminate the source of the redirect.
- Check trailing slash configuration. Setting `trailingSlash: false` (default) or `true` explicitly can help manage these redirects.
- Update internal links if they are pointing to redirected URLs.

### 2. Favicon
- Generate an `apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png`, and `favicon.ico` or a single `favicon.svg`.
- The design should be a rounded rectangle with a gradient from `#FF6B6B` to `#FF8E53` and a white "F" in the center.
- Update `src/app/layout.tsx` metadata to include the icons.

## Unclear Aspects
- The user specifically asked to "solucionar errores 308". I will assume this means they want 301 instead of 308 for the permanent redirects defined in `next.config.js`, or they want to fix trailing slash redirects.
- Favicon assets: I will generate them programmatically or use a simple SVG if preferred.

## Proposed Changes
- Modify `next.config.js` to handle redirects or use `middleware.ts` for 301 redirects if necessary.
- Add favicon files to `/public`.
- Update `src/app/layout.tsx` with icon metadata.
