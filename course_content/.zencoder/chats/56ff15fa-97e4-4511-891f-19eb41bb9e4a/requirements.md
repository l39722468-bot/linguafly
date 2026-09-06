# PRD - Pedagogical Exercise Engine Enrichment

## Objective
Enhance the `ExerciseGenerator` to produce exercises that match the pedagogical quality and UI richness of the static A1 units.

## Requirements
1. **Dynamic Metadata**:
   - Every generated exercise must have a `title` and `instructions`.
   - Instructions should be context-aware (e.g., "Elige la opción correcta" for MC, "Completa el espacio" for Fill-blank).
2. **Pedagogical Explanations**:
   - Replace raw translation strings with natural language explanations in Spanish.
   - Format: `[Context/Grammar rule] + [Translation]`.
3. **UI Compatibility**:
   - Ensure the generated JSON strictly follows the `Exercise` type used by `ExerciseRenderer`.
   - Add support for translations at the question level.
4. **Visual Elements**:
   - Integrate hints or translations that appear when interacting with the exercise.
