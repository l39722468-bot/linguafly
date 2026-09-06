# Technical Specification - Debug A1 Unit 1 Preview

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Path**: `src/app/debug/a1-preview/[unitId]/page.tsx`
- **Data Source**: `src/lib/course/a1/unit-*.ts`
- **Rendering Component**: `src/components/ExerciseRenderer.tsx`

## Implementation Approach
1. **Investigation**:
    - Start the dev server and visit `/debug/a1-preview/unit-1`.
    - Observe any console errors or UI glitches.
    - Inspect the `ExerciseRenderer` component to ensure it handles all exercise types present in `unit-1.ts`.
2. **Fix**:
    - Address any data mismatch or rendering logic errors.
3. **Verification**:
    - Manually verify in the browser.
    - Create an E2E test to ensure units render correctly.

## Source Code Structure Changes
None expected, mostly logic fixes in existing files.

## Data Model / API / Interface Changes
None.

## Verification Approach
- **Manual**: Use browser tool to check the page.
- **Automated**: Playwright E2E test.
