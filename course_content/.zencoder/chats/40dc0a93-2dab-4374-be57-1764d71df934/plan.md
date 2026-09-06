# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/40dc0a93-2dab-4374-be57-1764d71df934/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/40dc0a93-2dab-4374-be57-1764d71df934/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/40dc0a93-2dab-4374-be57-1764d71df934/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/40dc0a93-2dab-4374-be57-1764d71df934/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

### [ ] Step: Implementation

#### M1: Actualización de enlaces en componentes UI
- [x] Actualizar `/registro`, `/login`, `/precios`, `/contact` en archivos `.tsx`

#### M2: Actualización de enlaces en archivos Markdown
- [x] Reemplazar `/registro` por `/cuenta/registro` en todo `src/content/blog`
- [x] Reemplazar `/login` por `/cuenta/login` en todo `src/content/blog`
- [x] Reemplazar `/precios` por `/planes` en todo `src/content/blog`
- [x] Corregir enlaces específicos de artículos del blog que apuntan a rutas 301

#### M3: Limpieza de archivos redundantes
- [x] Eliminar archivos `.md` en `src/content/blog` que ya tienen redirección 301
  - [x] `src/content/blog/trabajo/business-english-emails.md`
  - [x] `src/content/blog/trabajo/entrevistas-trabajo-ingles-guia.md`
  - [x] `src/content/blog/trabajo/ingles-derecho-legal-guia.md`
  - [x] `src/content/blog/trabajo/ingles-finanzas-economia-guia.md`
  - [x] `src/content/blog/trabajo/ingles-marketing-ventas-guia.md`
  - [x] `src/content/blog/trabajo/ingles-trabajar-extranjero-guia.md`
  - [x] `src/content/blog/trabajo/entrevista-trabajo-ingles-preguntas.md`
  - [x] `src/content/blog/trabajo/vocabulario-negocios-ingles-esencial.md`
  - [x] `src/content/blog/trabajo/cv-ingles-guia.md`
  - [x] `src/content/blog/trabajo/guia-definitiva-curso-ingles-profesional.md`
  - [x] `src/content/blog/trabajo/ingles-entrevistas-remotas-exito.md`
  - [x] `src/content/blog/trabajo/negociaciones-ingles-guia.md`
  - [x] `src/content/blog/trabajo/reuniones-ingles-guia.md`
  - [x] `src/content/blog/viajes/guia-definitiva-viajes.md`
  - [x] `src/content/blog/viajes/ingles-aeropuertos-checklist.md`
  - [x] `src/content/blog/viajes/ingles-hoteles-guia.md`
  - [x] `src/content/blog/viajes/ingles-para-viajar-guia.md`
  - [x] `src/content/blog/viajes/ingles-restaurantes-guia.md`
  - [x] `src/content/blog/viajes/como-preparar-ingles-viaje-largo.md`
  - [x] `src/content/blog/viajes/inmigracion-ingles-guia.md`
  - [x] `src/content/blog/viajes/supervivencia-ingles-transporte-publico.md`
  - [x] `src/content/blog/examenes/guia-examen-aptis.md`
  - [x] `src/content/blog/examenes/ielts-vs-toefl-diferencias.md`
  - [x] `src/content/blog/examenes/guia-precios-cambridge-2026.md`

#### M4: Verificación Final
- [x] Ejecutar `npm run lint` (verificadas inconsistencias externas, cambios SEO seguros)
- [x] Verificar sitemap localmente (basado en escaneo dinámico de archivos)
- [x] Corregir enlaces internos rotos en archivos Markdown restantes

