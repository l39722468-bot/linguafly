# Technical Specification - A2 Course Expansion

## 1. Technical Context
- **Language**: Python 3.x
- **Storage**: JSON files in `src/content/cursos/ingles-a2/`
- **Dependency**: standard `json`, `os`, `random` libraries.

## 2. Implementation Approach
We will leverage and significantly expand the existing `scripts/expand-a2-course.py` script.

### Key Enhancements to the Script:
1.  **Unit Range**: Increase `UNITS_COUNT` from 30 to 60.
2.  **Exercise Volume**: Increase `EXERCISES_PER_UNIT` to 500.
3.  **Pedagogical Data Expansion**:
    - Currently, `PEDAGOGICAL_DATA` only has 2 units populated.
    - We will populate all 60 units based on the syllabus themes.
    - For each unit, we will provide a pool of at least 20-30 grammar points, 30-50 vocabulary words, 30-50 sentences, and 10-20 communication scenarios.
    - This will ensure enough variety to generate 500 exercises with acceptable levels of repetition.
4.  **Exercise Generation Logic**:
    - The existing `generate_exercises` function uses a modulo-based type selection. This is acceptable, but we can refine it to ensure a balanced distribution of all 7 types.
    - Types: `multiple_choice`, `matching`, `transformation`, `true_false`, `reorder_words`, `multiple_choice` (comm), `short_writing`.

## 3. Source Code Structure Changes
No changes to the application source code. All changes are in:
- `scripts/expand-a2-course.py`: Major update to content and configuration.
- `src/content/cursos/ingles-a2/*.json`: Overwritten with expanded content.

## 4. Data Model Changes
The output JSON structure remains compatible with the current `UnitData` and `PremiumInteraction` types:
```json
{
  "course": {
    "unit_id": "U1",
    "unit_title": "...",
    ...
  },
  "blocks": [
    {
      "block_id": "B1",
      "title": "...",
      "content": [
        { "interaction_id": "U1_I1", "type": "...", ... },
        ...
      ]
    }
  ]
}
```

## 5. Delivery Phases
1.  **Phase 1: Content Curation**: Define the pedagogical data for units 1-60 (Grammar, Vocab, Sentences).
2.  **Phase 2: Script Update**: Modify `scripts/expand-a2-course.py` with the new data and settings.
3.  **Phase 3: Execution**: Run the script to generate all 30,000 exercises.
4.  **Phase 4: Verification**: Use `npm run validate-exercises` (if available) or a custom script to ensure all files are valid JSON and follow the expected schema.

## 6. Verification Approach
- **Command**: `python scripts/expand-a2-course.py`
- **Linter/Validator**: Run `scripts/validate-exercises.mjs` to check the generated files.
- **Manual Spot Check**: Inspect a few random units to ensure content quality and variety.
