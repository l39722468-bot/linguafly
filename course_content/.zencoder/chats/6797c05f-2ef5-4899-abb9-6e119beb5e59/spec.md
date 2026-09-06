# Technical Specification - Blog 404 Error Checker

## 1. Technical Context
- **Language**: JavaScript/Node.js (ES Modules to match existing scripts).
- **Dependencies**: `fs`, `path`, `matter` (gray-matter), `fetch` (native in Node 18+).
- **Environment**: Local development/CI environment.

## 2. Implementation Approach
A new script `scripts/check-404s.mjs` will be created.

### 2.1. Valid Route Discovery
The script will identify valid internal routes by:
1. Scanning `src/app` for static routes.
2. Parsing `src/content/blog` and `src/content/hubs` to generate dynamic routes.
3. Mimicking the logic in `src/app/sitemap.ts`.

### 2.2. Link Extraction
Use regex to find Markdown links `[text](url)` and HTML-style links `<a href="url">`.

### 2.3. Link Verification
- **Internal Links**:
  - Normalize the URL (remove trailing slashes, anchors, query params).
  - Check if it exists in the "Valid Routes" set.
- **External Links**:
  - Use `fetch(url, { method: 'HEAD' })`.
  - If `HEAD` fails or returns 405/501, fallback to `GET` with a small timeout.
  - Report any response code >= 400 as a potential error.

### 2.4. Report Format
Console output with summary:
- Total links checked.
- Total broken internal links.
- Total broken external links.
- Detailed list of errors: `File -> Link -> Status`.

## 3. Source Code Structure Changes
- New file: `scripts/check-404s.mjs`.
- (Optional) Update `package.json` to add `check-404s` script.

## 4. Verification Plan
- Run the script locally: `node scripts/check-404s.mjs`.
- Manually verify a few reported errors to ensure accuracy.
- Check that it correctly identifies known good links as valid.
