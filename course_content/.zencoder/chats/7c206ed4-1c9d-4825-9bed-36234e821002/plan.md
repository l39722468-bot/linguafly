# Implementation Plan: SEO Content Expansion

## Workflow Steps

### [x] Step: Requirements
Create a Product Requirements Document (PRD) based on the feature description.
- PRD created in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7c206ed4-1c9d-4825-9bed-36234e821002/requirements.md`

### [x] Step: Technical Specification
Create a technical specification based on the PRD.
- Spec created in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7c206ed4-1c9d-4825-9bed-36234e821002/spec.md`

### [x] Step: Planning
Create a detailed implementation plan.

### [x] Step: Implementation

#### Phase 1: Audit
- [x] Create a script to count words in all blog articles and output a report.
- [x] Identify which articles are currently under 750 words.

#### Phase 2: Category Reclassification (Removing SEO Category)
- [x] Map all articles in `src/content/blog/seo/` to `examenes`, `metodos`, `trabajo`, or `viajes`.
- [x] Move articles to their new directories, overwriting duplicates if the SEO version is more complete.
- [x] Update frontmatter (`category` and `canonical`) for all moved articles.
- [x] Remove `src/content/blog/seo/` directory.

#### Phase 3: Content Expansion (Remaining Articles)
- [x] Expanded `src/content/blog/trabajo/mejores-apps-ingles-trabajo.md` (959 words).
- [x] Expanded `src/content/blog/metodos/ia-acelerar-aprendizaje-ingles.md` (877 words).
- [x] Expanded `src/content/blog/trabajo/ingles-networking-eventos-internacionales.md` (781 words).
- [x] Expanded `src/content/blog/trabajo/ingles-presentaciones-impacto.md` (765 words).
- [x] Expanded `src/content/blog/trabajo/negociacion-ingles-tecnicas-clave.md` (840 words).
- [x] Expanded `src/content/blog/trabajo/redaccion-emails-profesionales-ingles.md` (771 words).
- [x] Expanded `src/content/blog/viajes/frases-ingles-emergencias-viajes.md` (800 words).
- [x] Expanded `src/content/blog/trabajo/linkedin-ingles-guia.md` (808 words).
- [x] Resolved 404 issue and updated `next.config.js` redirects.
- [x] Expanded `src/content/blog/metodos/reported-speech-guia-uso.md` (~800 words).
- [x] Expanded `src/content/blog/metodos/gramatica-ingles-b1-guia.md` (~850 words).
- [x] Expanded `src/content/blog/metodos/voz-pasiva-ingles-guia.md` (~800 words).
- [x] Expanded `src/content/blog/metodos/ingles-a1.md` (~900 words).
- [x] Expanded `src/content/blog/metodos/ingles-c1.md` (~900 words).
- [x] Expanded `src/content/blog/metodos/ingles-a2.md` (~900 words).
- [x] Expanded `src/content/blog/metodos/ingles-b2.md` (~1000 words).
- [x] Expanded `src/content/blog/trabajo/vocabulario-negocios-ingles-profesional.md` (~1100 words).
- [x] Expanded `src/content/blog/trabajo/emails-profesionales-ingles.md` (~1000 words).
- [x] Expanded `src/content/blog/metodos/cursos-online-ingles-b1.md` (~900 words).
- [x] Expanded `src/content/blog/trabajo/entrevista-trabajo-exito.md` (~1100 words).
- [x] Expanded `src/content/blog/trabajo/presentaciones-ingles-guia.md` (~1000 words).
- [x] Expanded `src/content/blog/viajes/ingles-para-camareros-guia.md` (~1100 words).
- [x] Expanded `src/content/blog/viajes/curso-de-ingles-para-viajar.md` (1033 words).
- [x] Expanded `src/content/blog/examenes/aptis-a2-guia-completa.md` (1071 words).
- [x] Expanded `src/content/blog/examenes/guia-linguaskill-cambridge.md` (1071 words).
- [x] Expanded `src/content/blog/examenes/trucos-writing-c1-advanced.md` (959 words).
- [x] Expanded `src/content/blog/examenes/guia-precios-cambridge-2026.md` (1021 words).
- [x] Ensure all moved articles reach the 750-word threshold.
- [x] Expand any other articles in other categories that are under 750 words.

#### Phase 5: Redirects Cleanup
- [x] Added 301 redirects for legacy URLs (SEO silo, old blog paths, and specific article migrations) in `next.config.js`.

#### Phase 6: Final Validation
- [x] Run a final word count audit.
- [x] Run `npm run build` to verify site integrity.
