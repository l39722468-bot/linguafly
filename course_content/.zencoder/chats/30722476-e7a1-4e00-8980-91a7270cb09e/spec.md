# Especificación Técnica: Expansión de Oferta Académica Focus English

## 1. Contexto Técnico
*   **Framework**: Next.js 15 (App Router).
*   **Lenguaje**: TypeScript.
*   **Base de Datos**: Supabase (PostgreSQL).
*   **Estilos**: Tailwind CSS.
*   **Estado actual**: Existen tablas `course_modules`, `course_lessons` y `course_exercises` con soporte para `course_goal` ('trabajo', 'viajes', 'examenes').

## 2. Enfoque de Implementación
La implementación se basará en la estructura de datos existente, extendiendo el contenido para cubrir las nuevas líneas identificadas en el PRD.

### A. Estructura de Datos y Modelado
Utilizaremos el campo `course_goal` de la tabla `course_modules` para segmentar los cursos:
*   `trabajo`: Para la línea Professional.
*   `viajes`: Para la línea Traveler.
*   `examenes`: Para la línea Academic.

### B. Cambios en la Estructura de Código
1.  **Migraciones de Contenido (SQL)**: Crear nuevas migraciones para insertar el esqueleto de los cursos propuestos.
2.  **Rutas de Acceso**: Asegurar que las rutas `/dashboard/[goal]/[level]` carguen correctamente el contenido filtrado por `course_goal`.
3.  **Componentes UI**: Reutilizar `CurriculumGrid.client.tsx` y `WeekCard` para mostrar el progreso en los nuevos cursos.

## 3. Fases de Entrega
1.  **Fase 1: Infraestructura de Contenido**: Creación de los módulos y lecciones iniciales en la base de datos para las 3 líneas.
2.  **Fase 2: Especializaciones IT/Finanzas**: Implementación de los micro-cursos de especialización dentro de la línea `trabajo`.
3.  **Fase 3: Línea Traveler 90 días**: Estructuración de las 12 semanas (90 días) para el curso de viajes.
4.  **Fase 4: Integración de IA**: Creación de la Masterclass y herramientas de soporte basadas en IA.

## 4. Verificación y Calidad
*   **Linting**: `npm run lint` para asegurar consistencia de código.
*   **Pruebas de Integración**: Verificar que el filtrado por `course_goal` en Supabase funciona correctamente.
*   **Validación de Contenido**: Uso de scripts de auditoría existentes para asegurar que el nuevo contenido cumple con los esquemas JSON.
