# Requirements Document - Unit 1 Exercises Completion

## Problem Statement
The exercises for Unit 1 of the English A1 course are currently "unconfigured" or in a sub-optimal state (75 exercises instead of the standard 60, containing numerous duplicates and inconsistent formatting).

## Goals
1.  **Standardization**: Ensure Unit 1 has exactly 60 high-quality exercises as per course specifications.
2.  **Uniqueness**: Remove duplicate exercises and ensure a diverse range of scenarios.
3.  **Formatting**: Follow the standard format used by `ExerciseRenderer` (including `[[English|Spanish]]` translations for all English terms).
4.  **Audio Support**: Ensure all exercises have corresponding audio (pending user confirmation on API usage).

## Proposed Solution
- Use the `update_unit_1.mjs` script (or equivalent logic) to replace the current 75 exercises in `src/lib/course/a1/unit-1.ts` with 60 high-quality, unique exercises.
- Verify that the exercises follow the `[[English|Spanish]]` format for all English text.
- Update `unit1.json` in `src/content/cursos/ingles-a1/` if necessary for consistency (though it appears `unit-1.ts` is the primary source for the frontend).

## Unclear Aspects / Questions
1.  **Audio Generation**: Should I run the audio generation script (`scripts/generate-course-audio-a1.ts`) for the new exercises? This uses external APIs (OpenAI/ElevenLabs).
2.  **JSON vs TS**: Is `unit1.json` still needed, or is the system fully migrated to TS files in `src/lib/course/`?
3.  **Reading Exercises**: The specifications mention reading exercises with a two-phase navigation. I should ensure some of the 60 exercises follow this format.

## Success Criteria
- `src/lib/course/a1/unit-1.ts` contains exactly 60 exercises.
- No duplicates exist in the unit.
- All English text includes Spanish translations in the `[[English|Spanish]]` format.
- The unit works correctly in the browser at `/curso-a1/unit-1`.
