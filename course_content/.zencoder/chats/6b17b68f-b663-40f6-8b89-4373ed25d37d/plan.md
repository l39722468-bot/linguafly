# Plan de Optimización SEO y Estabilización Técnica

## Fase 1: Auditoría e Infraestructura SEO
- [x] Crear script de auditoría SEO `scripts/audit-blog-seo.mjs`
- [x] Configurar `sitemap.ts` dinámico para blogs y cursos
- [x] Configurar `robots.txt` profesional
- [x] Integrar `generateArticleSchema` y `generateCourseSchema` en `src/lib/schemas.ts`
- [x] Integrar script de auditoría en `package.json`

## Fase 2: Optimización de Contenido y Metadatos
- [x] Auditar artículos existentes y corregir fallos de SEO (Meta descripción, H1, Keywords)
- [x] Optimizar `generateMetadata` para incluir el año 2026 dinámicamente
- [x] Implementar **FAQ Schema** dinámico para artículos del blog con preguntas frecuentes

## Fase 3: Estabilización Técnica y Visual
- [x] Configuración de **Tailwind Typography** (`prose`) para renderizado consistente
- [x] Limpieza de CSS conflictivo en `globals.css`
- [x] Refactorización de `ReactMarkdown` en la página de artículos
- [x] **Verificación Final de Visibilidad**: Confirmar que todos los componentes (Tablas, Callouts) se ven correctamente.

## Fase 4: Verificación Final
- [x] Ejecutar `npm run lint` y `npm run type-check` (Errores de Blog corregidos)
- [x] Validar sitemap en local
- [x] Notificar al usuario para validación final de visibilidad
