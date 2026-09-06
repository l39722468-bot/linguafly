# Technical Specification: Rediseño del Curso Inglés A1

## 1. Contexto Técnico
- **Frontend**: Next.js 15, React 19, Tailwind CSS.
- **Renderizado**: `PremiumCourseSession.tsx` es el componente principal para unidades A1 Premium.
- **Almacenamiento**: Archivos JSON estáticos en `src/content/cursos/ingles-a1/unit[1-30].json`.
- **Nuevas Funcionalidades**: Soporte para `word-search` y `crossword` en el sistema Premium.

## 2. Cambios en Estructura de Datos
Se utilizará el esquema definido en `types/premium-course.ts` para las unidades.

### Formato de Word Search
```json
{
  "interaction_id": "U1_I49",
  "type": "word-search",
  "prompt_es": "Encuentra las palabras de la unidad",
  "words": ["HELLO", "NAME", ...],
  "gridSize": 10,
  "clues": [
    { "word": "HELLO", "clue": "Un saludo" }
  ]
}
```

### Formato de Crossword
```json
{
  "interaction_id": "U1_I50",
  "type": "crossword",
  "prompt_es": "Completa el crucigrama",
  "items": [
    { "word": "NAME", "clue": "Lo que usas para identificarte", "direction": "across", "row": 0, "col": 0 }
  ]
}
```

## 3. Implementación de Renderizado
Se modificará `src/components/course/exercises/PremiumSession.tsx` para incluir los casos `word-search` y `crossword` en la función `renderInteraction`.

## 4. Generación de Contenido
Se desarrollará un script robusto en Python (`scripts/rebuild-a1-course.py`) que:
1. Utilice un banco de datos pedagógico para 30 temas.
2. Genere 50 ejercicios por unidad con distribución variada:
   - 10 Multiple Choice
   - 10 Matching (Traducción / Emojis)
   - 10 Transformation (Fill-blank)
   - 10 True/False o Reorder
   - 5 Word Searches (distribuidos)
   - 5 Crosswords (distribuidos)
3. Asegure que los IDs sean únicos y consistentes.

## 5. Fases de Entrega
1. **Fase 1**: Actualizar `PremiumSession.tsx` con soporte para Word Search y Crossword.
2. **Fase 2**: Crear el script de generación de contenido.
3. **Fase 3**: Generar las 30 unidades y verificar integridad.

## 6. Verificación
- **Linting**: `npm run lint` para asegurar que los cambios en TypeScript son correctos.
- **Validación JSON**: `scripts/validate-exercises.mjs` para verificar la estructura de los archivos generados.
