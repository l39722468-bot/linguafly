# Especificación Técnica - Sistema de Clústeres SEO

## 1. Contexto Técnico
- **Framework**: Next.js 15 (App Router).
- **Lenguaje**: TypeScript.
- **Gestión de Contenido**: Markdown con `gray-matter`.

## 2. Estructura de Archivos y URLs

### 2.1 Rutas (App Router)
- **HUB**: `/src/app/aprender-ingles/page.tsx` -> URL: `focusonenglish.com/aprender-ingles/`
- **Rutas de Cursos (Dinámicas)**: `/src/app/curso-ingles-[slug]/page.tsx` -> URL: `focusonenglish.com/curso-ingles-a1/`
- **Blog (Existente)**: `/src/app/blog/[category]/[slug]/page.tsx`

### 2.2 Contenido (Markdown)
Nueva estructura en `src/content/seo-pages/`:
```text
src/content/seo-pages/
├── hub.md
└── rutas/
    ├── ingles-a1.md
    ├── ingles-a2.md
    ├── ingles-para-viajar.md
    └── ingles-para-hosteleria.md
```

## 3. Componentes Reutilizables y Nuevos

### 3.1 `SEOPageLayout`
Un layout base para las páginas de clúster que incluya:
- Header simplificado o estándar.
- Sección de contenido renderizado desde Markdown.
- Sidebar con enlaces a otros artículos del clúster (Interlinking).
- CTA flotante de registro.

### 3.2 `JSONLDContainer`
Componente para inyectar esquemas de Google:
- `Course`: Para las páginas de ruta.
- `FAQPage`: Para el HUB y artículos informativos.

## 4. Estrategia de Interlinking (Automatizada)
Se añadirá un campo `related_route` y `is_part_of_cluster` en el frontmatter de los Markdown.
El componente de Blog detectará estos campos y mostrará un bloque de:
> "Si quieres profundizar, echa un vistazo a nuestro [Curso de Inglés A1](...) o vuelve a nuestra guía de [Aprender Inglés](...)"

## 5. Fases de Implementación Técnica
1.  **Infraestructura**: Crear directorios y librerías de utilidad para leer los nuevos Markdown (`lib/seo.ts`).
2.  **Página Pilar**: Implementar el renderizado del HUB.
3.  **Rutas Dinámicas**: Implementar `generateStaticParams` para las rutas de cursos.
4.  **SEO Técnico**: Configurar `sitemap.ts` y metadatos dinámicos.

## 6. Verificación
- Ejecutar `npm run build` para asegurar que las rutas estáticas se generan correctamente.
- Validar Schema Markup con la herramienta de resultados enriquecidos de Google.
