# Technical Specification: Curso de Administración Inglés A2 (36 Semanas)

## 1. Contexto Técnico
- **Framework**: Next.js 15 (App Router).
- **Lenguaje**: TypeScript.
- **Base de Datos**: Supabase (PostgreSQL).
- **IA/Contenido**: Integración con OpenAI/ElevenLabs (vía scripts existentes) para generación de audios y validación de contenido.
- **Estado Actual**: Existe `src/lib/sectors/admin-curriculum.ts` con una estructura básica A1/A2/B1/B2.

## 2. Enfoque de Implementación
Se optará por una arquitectura modular y escalable que permita la generación programática de las 36 semanas sin sobrecargar un solo archivo.

### Estrategia de Archivos
1.  **Archivo Maestro**: Actualizar `src/lib/sectors/admin-curriculum.ts` para que la entrada `A2` apunte a una estructura de 36 semanas.
2.  **Módulos Semanales**: Crear un nuevo directorio `src/lib/sectors/admin-a2/` que contendrá archivos individuales por semana (ej. `week-01.ts`, `week-02.ts`) para mantener la mantenibilidad.
3.  **Tipado Extendido**: Extender `CurriculumModule` en `src/lib/curriculum-data.ts` (si es necesario) para incluir los nuevos campos de UX (Bite-sized grammar, Roadmap, etc.).

## 3. Cambios en el Modelo de Datos
Se añadirá una interfaz extendida para soportar los nuevos requerimientos:

```typescript
export interface DetailedAdminWeek {
  weekNumber: number;
  title: string;
  roadmap: string; // UX Learning Roadmap
  theory: {
    objectives: string[];
    grammar: {
      title: string;
      explanation: string;
      miniCheck: Question; // UX Mini-check
    };
    vocabulary: {
      term: string;
      translation: string;
      phonetic: string;
      audioUrl?: string;
    }[];
    functionalLanguage: string[];
    professionalTip: string;
  };
  exercises: Exercise[]; // Array de 2 ejercicios por semana (Total 72 + 3 evaluaciones = 75)
}
```

## 4. Estructura de Código Propuesta
```text
src/lib/sectors/
├── admin-a2/
│   ├── week-01.ts
│   ├── week-02.ts
│   ...
│   ├── week-36.ts
│   └── index.ts (Expone el array completo de 36 semanas)
├── admin-curriculum.ts (Importa de admin-a2/index.ts)
```

## 5. Fases de Entrega
- **Fase 1**: Definición de la estructura de carpetas e interfaces (Semana 1).
- **Fase 2**: Implementación del Trimestre 1 (Semanas 1-12) y primer set de ejercicios (25%).
- **Fase 3**: Implementación del Trimestre 2 (Semanas 13-24) e integración de simuladores de Inbox/Phone.
- **Fase 4**: Implementación del Trimestre 3 (Semanas 25-36) y Proyecto Final.
- **Fase 5**: Implementación de sistemas transversales (Repaso espaciado, Glosario, Portafolio).

## 6. Verificación y Calidad
- **Linting**: `npm run lint` para asegurar consistencia de tipos.
- **Validación de IA**: Script de auditoría para verificar que el vocabulario no excede el nivel A2.
- **Unit Tests**: Pruebas de renderizado para los nuevos tipos de ejercicios (Drag & Drop, Inbox Simulator).
