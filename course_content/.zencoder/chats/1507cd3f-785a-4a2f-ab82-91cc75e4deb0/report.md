# Final Report - B2 Exercise Randomization

## Overview
The goal of this task was to prevent students from guessing the correct answers in B2 exercises by randomizing the position of correct options in multiple-choice questions and improving the variety of grammatical topics/tenses within each unit.

## Changes Implemented
1. **Randomized Options**: Created and executed a robust script to shuffle `options` and update `correctAnswer` indexes in all 30 B2 unit files.
2. **Improved Grammatical Variety**: 
   - Rearranged exercises in `unit-1.ts` to break up clusters of similar grammar points (e.g., inversions).
   - Verified that multiple-choice exercises across units cover a wide range of tenses (Future Perfect, Future Continuous, Past Perfect, etc.).
3. **Selector-Safe Shuffling**: The script was refined multiple times to handle the specific string-based tagging system (`[[word|translation]]`) used in the codebase without breaking the TypeScript syntax.

## Verification
- **Automated Verification**: Used `grep` to confirm that `correctAnswer` indexes are distributed across 0, 1, and 2, instead of being exclusively 0.
- **E2E Testing**: Implemented a Playwright test (`e2e/b2-randomization.spec.ts`) that verifies the loading and navigation of the B2 preview page.
- **Manual Check**: Verified the integrity of the files with `tsc` and ensured the dev server runs correctly.

## Challenges
- The initial scripting attempt introduced syntax errors by incorrectly parsing the array structure. This was resolved by using a more precise regex and `replace` with a callback function to handle each exercise block individually.
- The project-wide `type-check` command revealed thousands of existing errors, so verification was scoped to the modified files.
