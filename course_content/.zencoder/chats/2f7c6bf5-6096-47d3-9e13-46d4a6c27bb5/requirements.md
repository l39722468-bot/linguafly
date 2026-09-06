# PRD: Fix Spanish words in A1 Course Units 40+

## Problem Description
In the A1 course, starting from Unit 40, many exercises have words written in Spanish instead of English. The expected behavior is that all text shown to the student should be in English, with a Spanish translation appearing only when the student hovers over the word/phrase.

## Current State
- Many exercises use `[[Spanish Word]]` which renders "Spanish Word" in the UI.
- Some exercises have raw Spanish text outside of any brackets.
- The correct syntax `[[English Word|Spanish Translation]]` is used inconsistently.
- This affects units from 40 to at least 60.

## Requirements
1. **Language Consistency**: All primary text in exercise questions and options must be in English.
2. **Hover Translations**: All English phrases must have a corresponding Spanish translation using the `[[English|Spanish]]` syntax.
3. **Accuracy**: The English text must match the `transcript` field provided in the exercise object whenever possible.
4. **Scope**: All units in `src/lib/course/a1/unit-40.ts` through `unit-60.ts`.

## Constraints
- Do not change the `transcript`, `id`, `type`, `audioUrl`, or other metadata unless absolutely necessary for consistency.
- Maintain the `(_____)` placeholder for multiple-choice and fill-blank questions.
- Ensure the `correctAnswer` still points to the correct option after any text changes.

## Success Criteria
- In the `debug/a1-preview` view, all text for units 40+ is in English.
- Hovering over any word/phrase shows its Spanish translation.
- No Spanish words are visible by default in the exercise content (except for instructions and titles).
