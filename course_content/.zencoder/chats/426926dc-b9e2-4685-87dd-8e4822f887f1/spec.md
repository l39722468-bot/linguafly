# Especificación Técnica: Enlace de PDF en Blog

## Contexto Técnico
- **Framework**: Next.js 15 (App Router).
- **Contenido**: Markdown con frontmatter (gray-matter).
- **Renderizado**: `react-markdown` con `remark-gfm`.
- **Almacenamiento Estático**: Carpeta `public/`.

## Enfoque de Implementación

### 1. Almacenamiento del Archivo
- El archivo PDF se almacena en **Supabase Storage** (bucket `blog`).
- URL de descarga: `https://nprqtjljoekoirlrjxlh.supabase.co/storage/v1/object/sign/blog/speech.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMWI1ZDVjZC0wZTgzLTQyMGUtOWI0NC1lZGQwZTMyOWY2NTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJibG9nL3NwZWVjaC5wZGYiLCJpYXQiOjE3NzA2NTM1NDcsImV4cCI6MTc3MTI1ODM0N30.Kbd_9AevqrmmSgZgxiD-gFRzdImD_TJ1EbSNCxgj4hQ`

### 2. Modificación de Contenido
Archivo: `src/content/blog/metodos/reported-speech-ejercicios-pdf.md`

**Cambios en el cuerpo del Markdown:**
- Reemplazar "B1-C1" por "B1-C2" en todos los títulos y textos descriptivos.
- Actualizar los enlaces de descarga para que apunten a la URL firmada de Supabase y mencionen B1-C2.

### 3. Componentes Reutilizables
- Se utilizará el componente `a` ya definido en `MarkdownComponents` dentro de `src/app/blog/[category]/[slug]/page.tsx:190` para renderizar el enlace con los estilos de la plataforma (coral-600, negrita, hover).

## Cambios en la Estructura de Archivos
- No se requieren cambios en la estructura local (se eliminará `public/docs` si fue creado).

## Plan de Verificación
1. **Verificación Visual**: Abrir la ruta del blog localmente y comprobar que los enlaces apuntan a la URL de Supabase.
2. **Prueba de Descarga**: Hacer clic en el enlace y verificar que el archivo PDF se descarga correctamente desde Supabase.
3. **Linting**: Ejecutar `npm run lint` para asegurar que no hay errores de sintaxis en el Markdown o componentes.
