# Technical Specification - SEO Fixes

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## Implementation Approach

### 1. 308 Redirects to 301
The user identifies 308 status codes as "errors". In Next.js, `permanent: true` in `next.config.js` results in a 308. 
To achieve 301 redirects, we have two main options:
- **Option A (Middleware)**: Handle redirects manually in `src/middleware.ts` using `NextResponse.redirect(url, 301)`. This gives full control over the status code.
- **Option B (next.config.js)**: Check if we can use `statusCode: 301`. Actually, Next.js supports `statusCode` in redirects if `permanent` is NOT provided.
    ```javascript
    {
      source: '/old',
      destination: '/new',
      statusCode: 301
    }
    ```
    I will verify this approach. If it works, it's cleaner than middleware for static redirects.

### 2. Trailing Slashes
To prevent automatic 308 redirects from `/path/` to `/path`, I will explicitly set `trailingSlash: false` in `next.config.js`. This makes the behavior deterministic.

### 3. Favicon Implementation
I will create a favicon using the brand colors:
- **Colors**: Gradient from `#FF6B6B` (Coral) to `#FF8E53` (Peach).
- **Format**: SVG for better scaling and simplicity.
- **File**: `src/app/icon.svg`. Next.js App Router will automatically detect this and generate the necessary tags.
- **Content**: A rounded square with the gradient and a white "F".

## Source Code Structure Changes
- **Modified**: `next.config.js` (Update redirects to use `statusCode: 301` and set `trailingSlash`).
- **Modified**: `src/app/layout.tsx` (Add favicon metadata if not automatically handled by `icon.svg`).
- **Added**: `src/app/icon.svg` (The favicon design).

## Verification Plan
- **Manual Verification**: Use `curl -I` or browser DevTools to check the status codes of redirected URLs.
- **Favicon Verification**: Verify the favicon appears in the browser tab.
- **Linting**: Run `npm run lint` to ensure no regressions.
