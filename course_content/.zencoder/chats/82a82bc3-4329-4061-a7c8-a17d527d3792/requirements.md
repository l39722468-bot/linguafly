# Requirements - SEO Image Error Fixes

## 1. Context
The website is experiencing multiple SEO errors related to images. Specifically:
- **HTTP 400 Errors**: Occurring on local images, specifically `/blog/og-image.jpg`.
- **HTTP 404 Errors**: Occurring on external images from Pexels that are no longer available.

These errors affect SEO ranking and user experience as images fail to load correctly through Next.js Image Optimization.

## 2. Identified Issues
### 2.1. Local Image Error (400)
- **Problem**: `/public/blog/og-image.jpg` is actually an SVG file but has a `.jpg` extension.
- **Cause**: Next.js `next/image` fails to optimize an SVG when it's requested with raster-specific parameters (width, quality) and a mismatched extension.
- **Impact**: Default OG images for blog posts are failing.

### 2.2. External Image Error (404)
- **Problem**: External Pexels images (e.g., `https://images.pexels.com/photos/5943714/...`) are returning 404.
- **Impact**: Various blog posts have broken images.

## 3. Goals
- Fix the `400` errors for local blog images.
- Fix the `404` errors for broken external images by replacing them with working ones or local fallbacks.
- Ensure all blog posts have a valid OG image.
- Ensure all blog posts have valid content images.

## 4. Proposed Solutions
### 4.1. Fix og-image.jpg
- Option A: Rename the file to `og-image.svg` and update references.
- Option B: Convert the SVG to a real JPEG/PNG and keep the name (better for OG compatibility in some platforms).
- Option C: Replace it with a new valid JPEG/PNG placeholder.

### 4.2. Fix broken Pexels images
- Find alternative images on Pexels or Unsplash.
- Ideally, move to local images for better control.

## 5. Verification
- All image URLs reported in the error log should return HTTP 200 (or be processed successfully by `_next/image`).
- Run `npm run build` to ensure no image-related issues during build if static generation is used.
