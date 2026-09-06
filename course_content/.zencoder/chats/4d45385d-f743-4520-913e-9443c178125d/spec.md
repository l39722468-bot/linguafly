# Technical Specification - JS Compression Optimization

## Technical Context
- **Framework**: Next.js 15.1.3 (App Router)
- **Deployment**: Vercel
- **DNS/Proxy**: Cloudflare
- **Issue**: Auditors report that JavaScript chunks (e.g., `main-app-*.js`) are served uncompressed (~700KB), affecting LCP and PageSpeed scores.

## Implementation Approach
The goal is to ensure that static assets are served using **Brotli** or **Gzip** compression. Since the site uses Cloudflare as a proxy for Vercel, the optimization must be coordinated between both layers.

### 1. Next.js Configuration
- Verify `compress: true` in `next.config.js` (Already present).
- Optimize `headers` in `next.config.js` to ensure proper `Cache-Control` for static assets, which helps Cloudflare identify and compress them.

### 2. Cloudflare Configuration (Manual Steps)
- **Brotli**: Enable in `Speed > Optimization`.
- **Auto Minify**: Enable for JS/CSS in `Speed > Optimization`.
- **Polish/Mirage**: (Optional) For images, but ensures the edge is optimizing.

### 3. Vercel Configuration
- Check for `vercel.json` overrides that might affect asset delivery.

## Source Code Structure Changes
- Modify `next.config.js` to include explicit caching headers for static assets if necessary.

## Verification Approach
- **CURL command**: `curl -I -H "Accept-Encoding: br" https://www.focus-on-english.com/_next/static/chunks/main-app-caa5651c97f6ae84.js`
- Look for `content-encoding: br` or `gzip`.
- Check `content-length` vs the report's ~700KB.
- Run `npm run lint` and `npm run build` locally to ensure no regressions.
