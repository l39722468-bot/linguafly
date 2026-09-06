# Plan - SEO Image Error Fixes

## Implementation Tasks

### 1. Fix Local OG Image (400 Error)
- [x] Read `public/blog/og-image.jpg` content to confirm it's SVG (Done during investigation)
- [x] Convert `public/blog/og-image.jpg` (SVG) to a real JPEG (1200x630) using `magick`
- [x] Verify the file is now a JPEG: `file public/blog/og-image.jpg`

### 2. Fix Broken Pexels Images (404 Error)
- [x] Update `src/content/blog/metodos/voz-pasiva-ingles-guia.md`: Replace broken Pexels image `5943714` with a valid alternative.
- [x] Update `src/content/blog/metodos/voz-pasiva-avanzada-guia.md`: Replace broken Pexels image `5943714` with a valid alternative.
- [x] Update `src/content/blog/examenes/guia-b2-first-fce.md`: Replace broken Pexels image `3762224` with a valid alternative.
- [x] Search for other occurrences of these IDs or other Pexels 404s if any.

### 3. Verification
- [x] Check if images are referenced correctly in the markdown files.
- [x] Final check of the affected URLs.

### 4. Canonical URLs
- [x] Add `canonical` field support to `BlogPost` interface and parsing logic in `src/lib/blog.ts`.
- [x] Update metadata generation in `src/app/blog/[category]/[slug]/page.tsx` to use the canonical field.
- [x] Add canonical tags to requested travel guides in `src/content/blog/viajes/`.

### 6. Title Optimization (60-70 chars)
- [x] Optimize static page titles (Planes, Frases, Contacto, etc.)
- [x] Optimize blog post titles in `src/content/blog/`
- [x] Optimize category/topic page titles in `src/app/blog/[category]/page.tsx` or similar

### 7. Bug Fixes
- [x] Fix metadata export error in `src/app/tutor-privado/page.tsx` by separating client logic into `TutorPrivadoClient.tsx`.
- [x] Verify build success after the fix.
