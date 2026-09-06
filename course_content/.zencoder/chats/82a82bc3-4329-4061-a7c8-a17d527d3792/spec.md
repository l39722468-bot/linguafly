# Technical Specification - SEO Image Error Fixes

## 1. Technical Context
- **Framework**: Next.js 15 (App Router)
- **Image Component**: `next/image`
- **Content**: Markdown files in `src/content/blog/`
- **Storage**: `public/` directory for local assets

## 2. Implementation Approach

### 2.1. Fix og-image.jpg (HTTP 400)
- **Problem**: The file `public/blog/og-image.jpg` is an SVG named as `.jpg`. Next.js image optimizer fails to process it when raster parameters are applied.
- **Solution**: 
    1. Convert the SVG content of `public/blog/og-image.jpg` to a proper JPEG or PNG format.
    2. Maintain the name `og-image.jpg` to avoid breaking existing references, but ensure it is a valid raster image.
    3. Alternatively, rename to `og-image.svg` and update all components to not use `next/image` optimization for this specific file (using `unoptimized` prop).
    4. **Decision**: Convert to a high-quality JPEG (1200x630) to ensure broad compatibility with OpenGraph parsers which sometimes struggle with SVGs.

### 2.2. Fix Broken Pexels Images (HTTP 404)
- **Problem**: Multiple blog posts reference Pexels images that no longer exist.
- **Solution**:
    1. Identify all broken Pexels URLs in `src/content/blog/**/*.md`.
    2. Replace them with valid local images or updated Pexels URLs.
    3. Given the number of errors, it's safer to use a local placeholder or a reliable new image.
    4. For now, I will replace the known broken IDs (`5943714`, `3762224`) with valid alternatives.

## 3. Changes
### 3.1. File System
- Replace `public/blog/og-image.jpg` with a valid JPEG file.

### 3.2. Content Updates
- **File**: `src/content/blog/metodos/voz-pasiva-ingles-guia.md`
    - Update image URL.
- **File**: `src/content/blog/metodos/voz-pasiva-avanzada-guia.md`
    - Update image URL.
- **File**: `src/content/blog/examenes/guia-b2-first-fce.md`
    - Update image URL.

## 4. Verification Plan
- Verify that `https://www.focus-on-english.com/blog/seo/business-english-emails` (and others) no longer show 400 for the OG image.
- Verify that the specific blog posts with broken images now load correctly.
- Run `npm run build` to ensure no issues.
