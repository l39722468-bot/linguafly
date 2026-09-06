# Technical Specification - Mejora de Metodologías Innovadoras

## Contexto Técnico
- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Estado**: Client-side State (React hooks)

## Enfoque de Implementación
El objetivo es transformar la sección de "Metodologías Innovadoras" de un conjunto de archivos deshabilitados y enlaces rotos a una experiencia de usuario completa y funcional.

### 1. Corrección de Rutas (Navegación)
- Corregir el typo en `src/app/metodologias-innovadoras/page.tsx` cambiando `/metodologias-innovadoras/proyecto s` por `/metodologias-innovadoras/proyectos`.
- Renombrar archivos `.disabled` para que Next.js los reconozca como rutas válidas.

### 2. Activación de Páginas
Cada página en `src/app/metodologias-innovadoras/[slug]/page.tsx` debe importar y renderizar su componente correspondiente desde `src/components/metodologias/`.

| Ruta | Componente |
|------|------------|
| `/proyectos` | `ProjectBasedLearning` |
| `/gamificacion` | `MicrolearningGamification` |
| `/social` | `SocialImmersion` |
| `/ia-conversacion` | `RealtimeAITutor` |
| `/realidad-aumentada` | `AugmentedRealityVocabulary` |
| `/pronunciacion` | `PronunciationFeedback` |

### 3. Mejora de la Experiencia de Usuario (UX)
- **Navegación de Retorno**: Añadir un botón de "Volver" consistente en todas las subpáginas para facilitar el regreso al hub de metodologías.
- **Layout**: Mantener el diseño basado en contenedores con `max-w-7xl` para consistencia.

## Cambios en la Estructura de Código
- `src/app/metodologias-innovadoras/page.tsx`: Corregir `methodologies[0].href`.
- `src/app/metodologias-innovadoras/proyectos/page.tsx.disabled` -> `page.tsx`
- `src/app/metodologias-innovadoras/gamificacion/page.tsx.disabled` -> `page.tsx`
- `src/app/metodologias-innovadoras/social/page.tsx.disabled` -> `page.tsx`
- `src/app/metodologias-innovadoras/realidad-aumentada/page.tsx.disabled` -> `page.tsx`
- `src/app/metodologias-innovadoras/pronunciacion/page.tsx.disabled` -> `page.tsx`

## Fases de Entrega
1. **Fase 1**: Corrección de enlaces y activación de rutas (Renombrar archivos).
2. **Fase 2**: Integración de componentes y validación de renderizado.
3. **Fase 3**: Adición de navegación de retorno y pulido visual.

## Verificación
- Ejecutar `npm run build` para asegurar que no hay errores de tipado o de rutas.
- Verificación manual de la navegación entre el hub y las subpáginas.
- Pruebas de responsividad básica.
