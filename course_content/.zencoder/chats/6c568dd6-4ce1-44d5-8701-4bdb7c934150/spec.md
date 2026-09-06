# Technical Specification - Duolingo Course Audit

## Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Data Store**: JSON files in `src/content/cursos/duolingo-a1/`
- **UI Component**: `DuolingoUnitViewer.tsx`

## Audit Strategy

### 1. Automated JSON Validation
I will write a script to:
- Load all 30 JSON files.
- Validate they are valid JSON.
- Check for required fields (`course`, `blocks`, etc.).
- Validate each interaction type against its expected schema.
- Specifically check that `correct_answer` exists and is valid for the type (e.g., if it's an ID, it must exist in `options`).

### 2. UI Component Enhancement
- **Fix Missing Types**: Implement `categorization` in `DuolingoUnitViewer.tsx`.
- **Refine Logic**: Ensure `handleCheckAnswer` correctly validates all types.
- **Audio Support**: Ensure `playAudio` is called where appropriate and `audioUrl` is used if present.

### 3. Content Fixes
- Fix any identified data errors (wrong answers, missing options, typos).

## Implementation Approach

### Phase 1: Tooling & Initial Audit
- Create a temporary script (or use a one-liner) to scan all JSONs for common errors.
- Identify all unique interaction types used across 30 units.

### Phase 2: UI Fixes
- Update `DuolingoUnitViewer.tsx` to support `categorization`.
- Review and fix `handleCheckAnswer` and `renderInteraction` for any inconsistencies.

### Phase 3: Content Correction
- Iterate through each unit and fix any logical or pedagogical errors found during Phase 1.

## Verification Approach
- **Linting**: Run `npm run lint` to ensure component changes are valid.
- **Manual Verification**: Test a few units in the browser (if possible) or verify via unit test mocks.
- **Schema Re-validation**: Run the audit script again after fixes.
