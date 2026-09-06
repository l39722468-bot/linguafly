# PRD - Optimización SEO y Corrección de Redirecciones 301

## 1. Objetivo
Mejorar el SEO y la salud técnica de la web mediante la eliminación de errores 301, la optimización de enlaces internos y la limpieza de archivos redundantes.

## 2. Problemas Identificados
- **Enlaces internos obsoletos**: Muchos artículos del blog y componentes de la UI apuntan a rutas antiguas (ej. `/registro`, `/login`, `/precios`) que provocan redirecciones 301.
- **Archivos de contenido duplicados**: Existen archivos `.md` en `src/content/blog` que actúan como "source" de una redirección 301 pero que aún residen en el sistema de archivos, lo que puede causar confusión e indexación errónea si Next.js no maneja la prioridad correctamente o si se eliminan las reglas de redirección.
- **Carga de rastreo (Crawl Budget)**: Las redirecciones 301 innecesarias consumen tiempo de los motores de búsqueda y ralentizan la experiencia del usuario.
- **Redirecciones a Home (/)**: Varias rutas antiguas redirigen a la página de inicio sin ofrecer una alternativa relevante (Soft 404).

## 3. Alcance de la Tarea
- **Auditoría de Enlaces Internos**: Localizar y reemplazar todos los enlaces internos que apunten a rutas definidas como `source` en `next.config.js`.
- **Limpieza de Contenido**: Eliminar archivos `.md`/`.mdx` en `src/content/blog` que correspondan a rutas de origen (sources) de redirecciones 301, asegurando que su contenido esté preservado en el destino.
- **Consolidación de Redirecciones**: Verificar que no existan cadenas de redirección (A -> B -> C) y aplanarlas (A -> C, B -> C).
- **Mejora de Destinos**: Evaluar las redirecciones que apuntan a `/` y, si es posible, redirigirlas a una categoría o artículo relacionado.
- **Consistencia de Trailing Slash**: Asegurar que todos los enlaces internos sigan la convención `trailingSlash: false`.

## 4. Criterios de Aceptación
1. No debe haber enlaces internos en el código fuente (`tsx`, `ts`, `md`, `mdx`) que apunten a rutas que resulten en un 301 definido en `next.config.js`.
2. Los archivos redundantes en `src/content/blog` que son origen de redirecciones deben ser eliminados.
3. El sitemap no debe contener ninguna URL que redireccione (301).
4. Todas las redirecciones 301 deben llevar a una página existente (200 OK).

## 5. Riesgos
- Eliminar un archivo `.md` cuya redirección no esté correctamente configurada en `next.config.js`.
- Romper enlaces en producción si la redirección falla.
