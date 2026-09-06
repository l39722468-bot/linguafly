# Technical Specification - Fix Sitemap Redirects

## 1. Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Environment**: Vercel (enforces `www` redirection)

## 2. Implementation Approach
- Update the `baseUrl` constant in `src/app/sitemap.ts` from `https://www.focus-on-english.com` to `https://www.focus-on-english.com`.
- Perform a global search for the old `baseUrl` to ensure consistency across the application (especially in metadata and canonical tags).

## 3. Source Code Structure Changes
- **Modified**: `src/app/sitemap.ts`

## 4. Verification Approach
- Manual check of `src/app/sitemap.ts` code.
- Run `npm run lint` to ensure no regressions.
- (Optional) Use `curl` to verify that the new URLs do not redirect.
