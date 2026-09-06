# PRD: Completion of Finance Course Trimester 1 Exercises

## Overview
The goal is to complete the exercises for the first trimester of the "Banca y Finanzas" (Banking and Finance) course. Currently, the content only goes up to Week 8 for both B1 and B2 levels, while a full trimester is expected to have 12 weeks (3 months).

## Target Audience
- Students of the Banking and Finance course at B1 and B2 levels.

## Requirements
- Generate content for Weeks 9, 10, 11, and 12 for B1 level.
- Generate content for Weeks 9, 10, 11, and 12 for B2 level.
- Generate content for Weeks 1 through 12 for C1 level.
- Each week must include:
    - `theory.json`: Theoretical content based on the curriculum.
    - `exercises.json`: At least 20-50 practice exercises matching the theory.
    - `exam.json`: A weekly exam to test the week's knowledge.

## Curriculum Alignment
The content must align with `src/lib/sectors/finance-curriculum.ts`:
- **B1 Trimestre 1**: Fundamentos Bancarios y Atención al Cliente.
    - Topics: Account management, products (cards, loans), security/digital banking, customer service.
- **B2 Trimestre 1**: Reporting Corporativo y Auditoría.
    - Topics: P&L/Balance Sheet analysis, variance analysis, auditing/compliance, KPIs.
- **C1 Trimestre 1**: Estrategia de Capital y Valoración.
    - Topics: Financial modeling, valuation (DCF, Multiples), Capital structure, WACC, Long-term planning.

## Technical Constraints
- Follow the existing JSON structure found in `src/content/cursos/trabajo/finanzas/`.
- Ensure IDs are unique and follow the established naming convention (e.g., `fin-b1-w9-1`).
- Language: English (for content) with Spanish (for some descriptions if needed, though existing content is mostly English).

## Success Criteria
- Files for weeks 9-12 exist for B1 and B2 in the corresponding directories.
- Content is pedagogically sound and follows the curriculum.
- JSON files are valid and follow the schema.
