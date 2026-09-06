# Product Requirements Document (PRD) - Fix Sitemap Redirects

## 1. Problem Statement
The XML sitemap currently contains URLs that result in a 307 (Temporary Redirect) status code. Specifically, URLs are defined without the `www.` prefix, while the production environment (Vercel) redirects all traffic to the `www.` subdomain. This is suboptimal for SEO as search engines prefer direct links to the final canonical URLs.

## 2. Goals
- Eliminate all 3XX redirects in the `sitemap.xml`.
- Ensure all URLs in the sitemap use the canonical `https://www.focus-on-english.com` base URL.

## 3. Scope
- Modify `src/app/sitemap.ts`.
- Audit other potential occurrences of hardcoded non-www URLs that might affect SEO (e.g., metadata, canonical tags).

## 4. Technical Constraints
- Must maintain the existing structure and logic of the sitemap generation.
- Must ensure that all dynamic routes (blog, courses) also use the correct base URL.

## 5. Success Criteria
- The generated `sitemap.xml` contains only URLs starting with `https://www.focus-on-english.com`.
- No 307 redirects are encountered when fetching URLs listed in the sitemap.
