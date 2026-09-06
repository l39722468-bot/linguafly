# Especificación Técnica - Corrección de Redirecciones 301 y SEO

## 1. Contexto Técnico
- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Contenido**: Markdown (`src/content/blog`)
- **Configuración de Redirecciones**: `next.config.js`

## 2. Enfoque de Implementación

### Fase 1: Actualización de Enlaces Internos (Código y Contenido)
Utilizaremos herramientas de búsqueda y reemplazo para actualizar las rutas obsoletas por sus destinos finales.
- **Rutas Críticas**:
    - `/precios` -> `/planes`
    - `/registro` -> `/cuenta/registro`
    - `/signin`, `/login` -> `/cuenta/login`
    - `/signup`, `/register` -> `/cuenta/registro`
    - `/forgot-password` -> `/cuenta/recuperar`
    - `/contact` -> `/contacto`
    - `/blog/seo/:slug` -> `/blog/metodos/:slug` (y otras específicas)

### Fase 2: Limpieza de Archivos de Contenido Redundantes
Eliminaremos los archivos físicos en `src/content/blog` que ya no deberían ser servidos directamente y que tienen una redirección 301 activa.
- **Archivos a eliminar (ejemplos identificados)**:
    - `src/content/blog/trabajo/business-english-emails.md` (Redirige a `emails-profesionales-ingles.md`)
    - `src/content/blog/trabajo/entrevistas-trabajo-ingles-guia.md` (Redirige a `entrevista-trabajo-exito.md`)
    - `src/content/blog/viajes/guia-definitiva-viajes.md` (Redirige a `ingles-para-viajar.md`)

### Fase 3: Optimización de Redirecciones Genéricas
Revisaremos las redirecciones que apuntan a la Home (`/`) para ver si pueden ser más específicas.
- `/metodologia` -> `/` (Mantener si no hay página de metodología, pero actualizar enlaces internos)
- `/cursos` -> `/` (Actualizar enlaces a `/planes` o `/aprender-ingles` si es más relevante)

## 3. Cambios en la Estructura de Código
- No se esperan cambios en la arquitectura, solo en el contenido de archivos `.tsx` y `.md`.

## 4. Verificación
- **Linting**: `npm run lint` para asegurar que no hay errores de sintaxis.
- **Pruebas de Redirección**: Verificar manualmente o mediante scripts que las rutas antiguas redirigen correctamente y las nuevas devuelven 200 OK.
- **Sitemap**: Ejecutar build local para verificar que el sitemap generado solo contiene URLs 200 OK.

## 5. Fases de Entrega (Milestones)
1. **M1**: Reemplazo masivo de enlaces internos en componentes UI.
2. **M2**: Reemplazo masivo de enlaces internos en archivos Markdown.
3. **M3**: Eliminación de archivos `.md` obsoletos.
4. **M4**: Verificación final y limpieza de `next.config.js` (si aplica).
