# PRD - Mejora de Metodologías Innovadoras

## Descripción del Problema
La sección de "Metodologías Innovadoras" en la plataforma Focus on English presenta varios problemas técnicos y de contenido:
1. **Links Rotos**: El acceso a "Aprendizaje Basado en Proyectos" falla debido a un espacio en la URL (`/proyecto s`).
2. **Páginas Deshabilitadas**: La mayoría de las subpáginas de metodologías están deshabilitadas (`.disabled`).
3. **Experiencia Incompleta**: Aunque existen componentes base, las páginas no están integradas correctamente en el flujo de navegación.

## Objetivos
1. Corregir todos los errores de navegación (404s).
2. Habilitar y completar las páginas de metodologías.
3. Asegurar una experiencia de usuario coherente y fluida.

## Requerimientos Funcionales
### 1. Corrección de Navegación
- Eliminar el espacio en la URL de Proyectos en `src/app/metodologias-innovadoras/page.tsx`.
- Renombrar todos los archivos `.disabled` a `.tsx` para activarlos.

### 2. Implementación de Páginas
Cada metodología debe cargar su componente correspondiente:
- **Proyectos**: `ProjectBasedLearning.tsx`
- **Gamificación**: `MicrolearningGamification.tsx`
- **Social**: `SocialImmersion.tsx`
- **IA Conversacional**: `RealtimeAITutor.tsx` (ya existe pero requiere revisión de estilo)
- **Realidad Aumentada**: `AugmentedRealityVocabulary.tsx`
- **Pronunciación**: `PronunciationFeedback.tsx`

### 3. Consistencia de Diseño
- Todas las subpáginas deben incluir un botón de "Volver" o navegación hacia el hub principal.
- Asegurar que los gradientes y estilos coincidan con la marca Focus on English.

## Requerimientos Técnicos
- Framework: Next.js (App Router).
- Estilos: Tailwind CSS.
- Iconos: Lucide React.

## Criterios de Aceptación
1. Al hacer clic en cualquier tarjeta de `metodologias-innovadoras`, el usuario llega a la página correspondiente sin errores 404.
2. Cada página muestra contenido relevante y funcional (interactividad básica).
3. No hay archivos `.disabled` en la ruta `src/app/metodologias-innovadoras/`.
