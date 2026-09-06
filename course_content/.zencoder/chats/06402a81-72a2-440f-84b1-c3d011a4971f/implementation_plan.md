# Implementation Plan - Course Expansion

## Phase 1: UI Cleanup
- [ ] Modify `src/components/course/DuolingoUnitViewer.tsx` to remove the lesson list.
- [ ] Modify `src/components/course/exercises/PremiumDuolingoSession.tsx` to remove block transitions.

## Phase 2: Content Migration Script
- [ ] Create `scripts/expand-duolingo-units.mjs` to:
    - Parse SQL files.
    - Transform exercises to JSON format.
    - Merge existing blocks in JSON files.
    - Append new exercises.
- [ ] Run the script for all 30 units.

## Phase 3: Verification
- [ ] Run `npm run lint`.
- [ ] Verify Unit 1 and Unit 30 manually in the browser.
