# Technical Specification: Unit 1 Exercise Expansion

## Technical Context
- **Language**: TypeScript/JSON
- **Framework**: Next.js 15 (App Router)
- **Data Location**: `src/content/cursos/ingles-a1/unit1.json`
- **Source Data**: `src/lib/a1-m1-l1-detailed.ts`
- **Validation**: Playwright E2E tests

## Implementation Approach
We will replace the minimal `unit1.json` (2 exercises) with a full version containing 60 exercises derived from `src/lib/a1-m1-l1-detailed.ts`.

### Mapping Strategy
The `Exercise` objects in `src/lib/a1-m1-l1-detailed.ts` need to be mapped to the `PremiumInteraction` format used in `UnitData`.

1.  **Multiple Choice**:
    - `id` -> `interaction_id`
    - `question` -> `stimulus_en` (with `[[English|Spanish]]` translations preserved)
    - `options` -> `options` (mapped to `{ id, text }`)
    - `correctAnswer` -> `correct_answer` (id of the option)
    - `explanation` -> `explanation`
    - `type: 'multiple-choice'` -> `type: 'multiple_choice'`
    - `prompt_es`: "Elige la respuesta correcta."

2.  **Fill Blank**:
    - `id` -> `interaction_id`
    - `question` -> `stimulus_en` (replace `___` with `_______`)
    - `correctAnswer` -> `correct_answer` (string)
    - `type: 'fill-blank'` -> `type: 'fill_blank'`
    - `prompt_es`: "Completa la oración."

3.  **True/False**:
    - Map to `multiple_choice` with options "True" and "False".

4.  **Reading Comprehension**:
    - `id` -> `interaction_id`
    - `transcript` -> `stimulus_en`
    - `content.questions` -> mapped to sub-interactions or individual interactions following the reading.
    - *Note*: The standard format for reading in this project uses a specific `type: 'reading'` or similar. We will ensure it follows the two-phase system.

### Data Structure
The `unit1.json` will follow this structure:
```json
{
  "course": {
    "unit_id": "unit1",
    "unit_title": "Greetings and Personal Information",
    "level": "A1",
    "total_duration_minutes": 60,
    "language_ui": "es-ES",
    "target_language": "en"
  },
  "learning_outcomes": [...],
  "blocks": [
    {
      "block_id": "B1",
      "title": "Greetings & Basics",
      "content": [
        // 60 interactions here
      ]
    }
  ]
}
```

## Source Code Structure Changes
- Modify `src/content/cursos/ingles-a1/unit1.json` directly.

## Verification Approach
1.  **Linting**: Run `npm run lint` to ensure JSON and TS standards.
2.  **E2E Testing**:
    - Create a Playwright test `e2e/unit-1-verification.spec.ts`.
    - Verify that the unit loads correctly.
    - Verify that at least 5 different exercises are present.
    - Verify that translations `[[|]]` are rendered correctly (visual check via browser if possible).
3.  **Manual Verification**: Open the application and navigate to Unit 1 to ensure UI/UX consistency.
