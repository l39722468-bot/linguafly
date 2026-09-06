# Technical Specification: Completion of Second Trimester - Banca y Finanzas

## Context
The project is a Next.js application using TypeScript. Course content is stored as JSON files in `src/content/cursos/trabajo/finanzas/[level]/trimestre2/semana[XX]/`.

## Implementation Approach
We will systematically generate the missing JSON files for levels A1, A2, B1, B2, and C1.

### 1. Structure
For each week (21-24) and each level, we will create:
- `theory.json`: Lessons based on the `FINANCE_SECTOR_CURRICULUM`.
- `exercises.json`: 50 items (Multiple Choice, Fill in Blanks, Reorder).
- `exam.json`: 5-10 items (Weeks 21-23) or 50 items (Week 24).

### 2. File Generation Strategy
- **Weeks 17-19 (All levels)**: Update existing `exam.json` placeholders with real content derived from the corresponding `theory.json`.
- **Week 20 (All levels)**: 
    - Move current `theory.json` and `exercises.json` (Repaso) to Week 23 if appropriate, or replace with new topic content.
    - Update `exam.json` with real content.
- **Weeks 21-23**: Create new directories and JSON files based on the curriculum.
- **Week 24**: Create the final trimester exam.

### 3. Data Schema
All files must adhere to the existing schemas used in `trimestre1`.

#### `theory.json`
```json
{
  "title": "string",
  "sections": [{ "id": "string", "title": "string", "content": "string" }],
  "objectives": ["string"],
  "keyTerms": [{ "term": "string", "definition": "string" }]
}
```

#### `exercises.json` / `exam.json`
```json
{
  "goal": "finanzas",
  "level": "string",
  "trimester": 2,
  "weekId": "string",
  "title": "string",
  "items": [
    {
      "id": "string",
      "type": "multipleChoice | fillBlanks | reorder",
      "prompt": "string",
      "options": ["string"], // for multipleChoice
      "answerIndex": number, // for multipleChoice
      "answers": ["string"], // for fillBlanks
      "sentence": "string", // for reorder
      "explanation": "string"
    }
  ]
}
```

## Verification Plan
- **Linting**: Run `npm run lint` (if available) to ensure JSON syntax is correct if they were part of a build, but since they are pure JSON, we will verify with a basic JSON parser or by ensuring the application loads them.
- **Manual Check**: Verify that the generated IDs are unique and follow the convention.
- **Volume**: Ensure Week 24 has exactly 50 exam items as requested.
