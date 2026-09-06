# Spec and build

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:

- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification

Assess the task's difficulty, as underestimating it leads to poor outcomes.

- easy: Straightforward implementation, trivial bug fix or feature
- medium: Moderate complexity, some edge cases or caveats to consider
- hard: Complex logic, many caveats, architectural considerations, or high-risk changes

Create a technical specification for the task that is appropriate for the complexity level.

Save the output to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/7a115f74-994b-4be7-9276-5b290ea0b80c/spec.md`.

---

### [x] Step: Implementation

Implement the task according to the technical specification and general engineering best practices.

1. [x] **Investigation**: Start dev server and check `/debug/a1-preview/unit-1` in browser.
2. [x] **Analysis**: Identified hydration errors (nested buttons, `new Date()` in SSR) and potential dynamic import issues.
3. [x] **Fix**: 
    - Fixed nested buttons in `ExerciseRenderer.tsx`.
    - Added hydration guard for date rendering.
    - Updated dynamic import to use relative path.
    - Added `aria-hidden` to Tooltips for better accessibility.
4. [x] **Verification**: Confirmed the fix in the browser via Playwright.
5. [x] **Test Plan Approval**: Obtained approval for E2E tests.
6. [x] **E2E Testing**: Wrote and ran Playwright tests in `e2e/unit-preview-fix.spec.ts`.
7. [x] **Report**: Wrote final report in `report.md`.
8. [x] **Deployment**: Commit and push changes. Commit: `2d4f2fe8`

---

### [x] Step: Individual Unit Verification (Units 2-30)

Verify that each unit renders correctly in the preview and commit any specific fixes.

1. [x] **Verification Script**: Created `e2e/all-units-check.spec.ts` to batch test all 30 units for hydration errors and rendering.
2. [x] **Unit-by-Unit Fix & Commit**: Iterated through all 30 units, standardized formatting, fixed data inconsistencies in Units 29 & 30, and committed/pushed each unit individually as requested.

---

### [ ] Step: Build Fix

Resolve build errors caused by temporary/backup files.

1. [x] **Cleanup**: Remove any leftover `.bak` files.
2. [x] **Verification**: Run `npm run build` to ensure the project compiles correctly.

---

### [x] Step: UI Fixes (Translation Syntax & Hydration)

Fix visible `[[text|translation]]` syntax and remaining hydration issues.

1. [x] **Markdown Component**: Refactored `Markdown.tsx` to always apply `TranslatedText` to text nodes, ensuring `[[text|translation]]` is parsed even when vocabulary is empty.
2. [x] **Exercise Titles**: Updated `DragDropExercise.tsx` and `MatchingExercise.tsx` to wrap titles in `TranslatedText`.
3. [x] **Final Deployment**: Commit and push the fixes.

---

### [x] Step: Remove Speaking Exercises (Units 1-30)

Remove all exercises of type `speaking-analysis` from the A1 course files.

1. [x] **Unit-by-Unit Removal**: Iterate through all 30 units and remove speaking exercises.
2. [x] **Commit & Push**: Commit and push changes for each unit individually.
