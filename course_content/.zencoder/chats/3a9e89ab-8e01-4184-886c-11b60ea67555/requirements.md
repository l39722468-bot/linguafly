# Requirements - Fix Missing Translations in Units 30-60

## Problem Statement
Starting from Unit 30, the course exercise files (`src/lib/course/a1/unit-X.ts`) are missing translations or have incomplete translation tags.
- Many strings are in plain text (Spanish or English) without the `[[English|Spanish]]` wrapper.
- Many translation tags are empty on one side, e.g., `[[Word|]]`.
- This prevents the "Translate" feature of the application from working correctly for these units.

## Goals
- Wrap all relevant strings (titles, instructions, questions, options, explanations) in the `[[English|Spanish]]` format.
- Ensure that the "Translate" feature works consistently across all units from 30 to 60.
- Automate the process where possible using a script and potentially an LLM for bulk translation of missing parts.

## Scope
- Files: `src/lib/course/a1/unit-30.ts` through `src/lib/course/a1/unit-60.ts`.
- Fields to check: `title`, `instructions`, `question`, `options`, `explanation`, `transcript`.

## Acceptance Criteria
- No more empty translation tags like `[[Text|]]` or `[[|Text]]` in the target units.
- All titles and instructions are wrapped in `[[English|Spanish]]`.
- The application correctly displays English by default and Spanish on toggle for these units.
