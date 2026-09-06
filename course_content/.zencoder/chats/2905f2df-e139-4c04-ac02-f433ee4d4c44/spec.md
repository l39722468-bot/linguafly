# Technical Specification - Finance Course Completion

## Context
Completion of missing content for Level A1 and A2 (Trimestre 1) of the Finance sector course.

## Implementation Approach
- Use `src/lib/sectors/finance-curriculum.ts` as the source of truth for topics.
- Create JSON files following the structure found in `src/content/cursos/trabajo/finanzas/b1/trimestre1/semana01/`.
- Content will be generated in Spanish/English as per level requirements.

### File Schemas

#### theory.json
```json
{
  "title": "string",
  "sections": [
    {
      "id": "string",
      "title": "string",
      "content": "markdown string"
    }
  ],
  "objectives": ["string"],
  "keyTerms": [
    { "term": "string", "definition": "string" }
  ]
}
```

#### exercises.json / exam.json
```json
{
  "goal": "finanzas",
  "level": "A1 | A2",
  "trimester": 1,
  "weekId": "semanaXX",
  "title": "string",
  "items": [
    {
      "id": "string",
      "type": "multipleChoice",
      "prompt": "string",
      "options": ["string"],
      "answerIndex": number,
      "explanation": "string"
    }
  ]
}
```

## Phases
1. **A1 Generation**: Weeks 1-12.
2. **A2 Generation**: Weeks 1-12.
3. **Verification**: Validate JSON structure and content alignment.

## Verification
- Run `npm run lint` (if available).
- Manual check of a few generated files.
