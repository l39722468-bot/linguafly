# Technical Specification - Unit 1 Exercises Completion

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Content Storage**:
  - TS files: `src/lib/course/a1/unit-*.ts` (Used by the frontend)
  - JSON files: `src/content/cursos/ingles-a1/unit*.json` (To be kept in sync)
- **Exercise Types**: `multiple-choice`, `fill-blank`, `sentence-building`, `matching`, `reading`, etc.

## Implementation Approach
1.  **Unit Content Update (TS)**:
    - Use the logic from `update_unit_1.mjs` to generate a clean set of 60 exercises for `src/lib/course/a1/unit-1.ts`.
    - Ensure all exercises follow the `[[English|Spanish]]` format for translated text.
2.  **Unit Content Update (JSON)**:
    - Convert the newly generated TS content back to the JSON format used in `src/content/cursos/ingles-a1/unit1.json`.
    - Ensure the JSON structure matches the existing schema (including `blocks` and `learning_outcomes`).
3.  **Verification**:
    - Run `npm run validate-exercises` to ensure the new JSON content is valid.
    - Manually verify the unit loads correctly in the browser at `/curso-a1/unit-1`.

## Source Code Structure Changes
- **Modified**: `src/lib/course/a1/unit-1.ts` (reset to 60 clean exercises).
- **Modified**: `src/content/cursos/ingles-a1/unit1.json` (synced with the TS content).

## Data Model Changes
- No changes to the underlying data model, but the exercise IDs and content will be standardized to follow the `a1-u1-e*` pattern (or consistent `A1_U1_I*` if preferred).

## Delivery Phases
1.  **Phase 1**: Update `unit-1.ts` using `update_unit_1.mjs` (Done, but will re-verify).
2.  **Phase 2**: Create a conversion script to update `unit1.json` from the new `unit-1.ts`.
3.  **Phase 3**: Run validation and verification.

## Verification Approach
- **Validation**: `npm run validate-exercises`
- **Manual**: Browse `/curso-a1/unit-1` and check for duplicates or formatting issues.
