# Technical Specification: Content Completion & Repair

## 1. Technical Context
- **Format**: TypeScript (`.ts`) files in `src/lib/course/a1/`.
- **Data Structure**: `Exercise[]` array using the `Exercise` interface from `@/lib/exercise-generator`.
- **Automation**: Use specialized generation scripts to maintain consistency in narrative and translation format.

## 2. Implementation Approach

### 2.1. Unit 3 Reconstruction (`unit-3.ts`)
- **Template-based Generation**: Create a set of templates that incorporate the Mateo narrative (hostel check-in, meeting roommates).
- **Exercise Types**: 
    - `multiple-choice`: Grammar and vocabulary checks.
    - `matching`: Translation and concept mapping.
    - `fill-blanks`: Sentence completion in context.
    - `reorder`: Syntax practice for questions and negatives.
- **Audio URLs**: Follow the pattern `audio/a1/unit-3/A1_U3_LX_X.mp3` (placeholders for now).

### 2.2. Narrative & Translation Repair (Units 4-60)
- **Heuristic Transformation**:
    - For units missing translations: Use a translation utility or manual mapping to wrap English terms in `[[English|Spanish]]`.
    - For units missing narrative: Inject "Mateo" or London-based scenarios into existing exercise prompts and stimuli.
- **Validation**: Re-run the `audit-a1-curriculum.mjs` script after each batch of repairs.

## 3. Source Code Structure Changes
- **New File**: `src/lib/course/a1/unit-3.ts`.
- **Modified Files**: All existing `unit-X.ts` files in `src/lib/course/a1/` that failed the audit.

## 4. Verification Approach
1. **Script Validation**: The audit script must return ✅ for `unit-3.ts`.
2. **Manual Review**: Spot-check exercises in the browser (if server is running) to ensure the Mateo narrative feels natural.
3. **Type Checking**: Run `npm run type-check` to ensure no breaking changes in the TS files.
