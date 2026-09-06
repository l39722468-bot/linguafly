# Technical Specification: Finance Course Trimester 1 Completion

## Technical Context
- **Language**: English (content), JSON (format).
- **Directory Structure**: `src/content/cursos/trabajo/finanzas/[level]/trimestre1/semana[XX]/`.
- **Files per week**: `theory.json`, `exercises.json`, `exam.json`.

## Implementation Approach
1.  **Level B1 (Weeks 9-12)**:
    - Focus on finishing the "Fundamentos Bancarios y Atención al Cliente" module.
    - Week 9: Review of digital banking security.
    - Week 10: Advanced customer service (conflict resolution).
    - Week 11: Final review of Trimester 1 topics.
    - Week 12: Trimester 1 Final Exam.
2.  **Level B2 (Weeks 9-12)**:
    - Focus on finishing the "Reporting Corporativo y Auditoría" module.
    - Week 9: Internal audit procedures.
    - Week 10: KPIs and Dashboards.
    - Week 11: Final review of Trimester 1 topics.
    - Week 12: Trimester 1 Final Exam.
3.  **Level C1 (Weeks 1-12)**:
    - Create full content for "Estrategia de Capital y Valoración".
    - Weeks 1-3: Financial modeling foundations.
    - Weeks 4-6: Valuation techniques (DCF, Multiples).
    - Weeks 7-9: Capital structure and WACC.
    - Weeks 10-12: Strategic planning and final assessment.

## Data Models
### theory.json
```json
{
  "title": "string",
  "content": "markdown string",
  "objectives": ["string"],
  "keyTerms": [{"term": "string", "definition": "string"}]
}
```

### exercises.json
```json
{
  "goal": "finanzas",
  "level": "string",
  "trimester": 1,
  "weekId": "string",
  "title": "string",
  "description": "string",
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

### exam.json
Similar structure to `exercises.json` but usually fewer items (e.g., 20) and used for assessment.

## Verification Approach
- Use `node` to validate JSON syntax for all generated files.
- Verify IDs are unique across the new files.
- Manual spot-check of content quality and curriculum alignment.
