# Technical Specification - Unit 30 Exercises

## Implementation Approach
1.  **JSON Data**: Update `src/content/cursos/ingles-a1/unit30.json` with the new interactions.
2.  **TS Conversion**: Use `scripts/regenerate-a1-ts-from-premium.mjs` to generate the corresponding TypeScript file `src/lib/course/a1/unit-30.ts`.
3.  **Validation**: Run `npm run validate-exercises` to ensure the generated TS file meets all standards.

## Source Code Changes
- `src/content/cursos/ingles-a1/unit30.json`: Rewrite with 66 interactions covering Module 3.
- `src/lib/course/a1/unit-30.ts`: Regenerated from JSON.
- `scripts/regenerate-a1-ts-from-premium.mjs`: Improved to handle more interaction types correctly.

## Data Model
The exercises follow the `PremiumInteraction` and `Exercise` interfaces defined in the project.
- **JSON Format**: `PremiumInteraction`
- **TS Format**: `Exercise`

## Verification
- Run `node scripts/validate-exercises.mjs` and check for errors in `unit-30.ts`.
