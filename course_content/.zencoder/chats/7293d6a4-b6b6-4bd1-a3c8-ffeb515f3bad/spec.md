# Technical Specification - B1 Course Redesign

## 1. Technical Context
- **Language**: TypeScript / Next.js
- **Dependencies**: React, Framer Motion (for UI), Lucide React (icons)
- **Data Storage**: Local TypeScript files in `src/lib/course/b1/` and global lexicon in `src/lib/course/engine/lexicon.ts`.

## 2. Implementation Approach

### 2.1. Content Structure
- Redefine `B1_COURSE` in `src/lib/course/b1/index.ts`.
- Create/Update 30 unit files (`unit-1.ts` to `unit-30.ts`) in `src/lib/course/b1/`.
- Each unit file will export a `UNIT_X_EXERCISES` array containing 50 `Exercise` objects.

### 2.2. All-Word Translation System
To achieve 100% translation coverage with dotted underlines:
1.  **Enhanced `TranslatedText` Component**:
    - Modify `src/components/course/exercises/TranslatedText.tsx` to handle a new inline syntax: `[[English word|Spanish translation]]`.
    - The component will first check the `GLOBAL_LEXICON`. If no match is found, it will look for the `[[...]]` pattern and extract the translation.
2.  **Lexicon Expansion**:
    - Add common B1 level vocabulary to `src/lib/course/engine/lexicon.ts` to reduce redundancy in exercise strings.

### 2.3. Exercise Generation Strategy
- Use a script (similar to `scripts/generate-a1-unit1-exercises.ts`) to programmatically generate exercises using an LLM (GPT-4o).
- The prompt will strictly enforce the inclusion of translations for all words using the `[[word|translation]]` syntax where the global lexicon doesn't cover it.

## 3. Source Code Changes
- `src/lib/course/b1/`: New/Updated exercise files.
- `src/components/course/exercises/TranslatedText.tsx`: Support for inline translation syntax.
- `src/lib/course/engine/lexicon.ts`: Expanded vocabulary.

## 4. Delivery Phases
- **Phase 1**: Update `TranslatedText` component and verify with a mock exercise.
- **Phase 2**: Generate Unit 1 (50 exercises) using the updated strategy.
- **Phase 3**: Batch generation of Units 2-10.
- **Phase 4**: Batch generation of Units 11-20.
- **Phase 5**: Batch generation of Units 21-30.
- **Phase 6**: Final curriculum integration and UI verification.

## 5. Verification Approach
- **Lint**: `npm run lint`
- **Testing**:
  - Unit tests for `TranslatedText` parser.
  - E2E tests for navigating the new B1 units and verifying translation tooltips appear on hover.
