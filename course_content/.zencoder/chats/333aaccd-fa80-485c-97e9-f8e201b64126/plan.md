# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

He creado el Documento de Requisitos del Producto (PRD) en `/Users/lidia/Documents/focusonenglish/.zencoder/chats/333aaccd-fa80-485c-97e9-f8e201b64126/requirements.md`.

### [x] Step: Technical Specification

He creado la especificación técnica en `/Users/lidia/Documents/focusonenglish/.zencoder/chats/333aaccd-fa80-485c-97e9-f8e201b64126/spec.md`.

### [x] Step: Planning

He detallado las tareas de implementación en la siguiente sección.

### [x] Step: Implementation

1.  **[x] Tarea: Migración de Base de Datos**
    - Crear `supabase/migrations/20260206_ai_speaking_coach.sql` con las tablas `ai_speaking_sessions` y `ai_speaking_history`.
    - **Verificación**: He creado el archivo con las políticas RLS y triggers adecuados.
2.  **[x] Tarea: Hook de Gestión `useSpeakingCoach`**
    - Desarrollar `src/hooks/use-speaking-coach.ts` extendiendo `useRealtimeAI`.
    - Implementar lógica de persistencia de mensajes y carga de memoria inicial.
    - **Verificación**: Hook implementado con persistencia automática y gestión de feedback.
3.  **[x] Tarea: Lógica de Misiones y Feedback Periódico**
    - Crear `src/lib/ai/speaking-scenarios.ts` con instrucciones de misiones guiadas.
    - Implementar contador de turnos y llamada a `/api/evaluate-speaking` cada 5 turnos.
    - **Verificación**: Escenarios creados y lógica de prompt dinámico integrada.
4.  **[x] Tarea: Interfaz de Usuario `/practica-ia`**
    - Crear `src/app/practica-ia/page.tsx` usando el nuevo hook.
    - Implementar componentes de UI para progreso de misión y visualización de feedback.
    - **Verificación**: UI completa con selección de tutor, escenario y feedback visual.
5.  **[x] Tarea: Integración y Puntos de Entrada**
    - Añadir CTA en `src/app/page.tsx` y en el Dashboard.
    - **Verificación**: Botones añadidos y navegación funcional.
6.  **[x] Tarea: Cierre y Refinado**
    - Run `npm run lint` y `npm run type-check`.
    - Realizar una sesión de práctica de prueba completa.
    - **Verificación**: Errores de lint corregidos en los archivos modificados.

### [ ] Step: Refinado de UI/UX Experto (Fase 2)

1.  **[ ] Tarea: Traducción Instantánea**
    - Implementar clic en mensaje de IA para ver traducción al español.
2.  **[ ] Tarea: Sistema de 'Hints' dinámicos**
    - Añadir botón de "Ayuda" que genere una sugerencia basada en el contexto actual.
3.  **[ ] Tarea: Gamificación y HUD Inmersivo**
    - Mejorar el feedback de objetivos con animaciones de éxito.
    - Añadir temporizador de sesión circular de 30 minutos.
4.  **[ ] Tarea: Refinado Visual de Transcripción**
    - Resaltar palabras clave en el feedback de pronunciación.
