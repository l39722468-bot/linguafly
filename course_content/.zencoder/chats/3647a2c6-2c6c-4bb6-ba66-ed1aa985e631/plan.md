# Implementation Plan: Complete Unit 5 (A1-M1-L5) Exercises

## Tasks
### [x] Step 1: Replace Grammar Placeholders
   - **File**: `src/lib/a1-m1-l5-detailed.ts`
   - **Task**: Update `A1_M1_L5_GRAMMAR_1` (q7-q15) and `A1_M1_L5_GRAMMAR_2` (q7-q15) with real family-themed questions.
   - **Verification**: Check rendering in `/debug/a1-preview/unit-5`.

### [x] Step 2: Replace Reading & Listening Placeholders
   - **File**: `src/lib/a1-m1-l5-detailed.ts`
   - **Task**: Update `A1_M1_L5_READING` (q7-q10) and `A1_M1_L5_LISTENING` (q7-q10) comprehension questions.
   - **Verification**: Check rendering in `/debug/a1-preview/unit-5`.

### [x] Step 3: Replace Vocabulary Placeholders
   - **File**: `src/lib/a1-m1-l5-detailed.ts`
   - **Task**: Update `A1_M1_L5_VOCABULARY_1` (q7-q10) and `A1_M1_L5_VOCABULARY_2` (q7-q10).
   - **Verification**: Check rendering in `/debug/a1-preview/unit-5`.

### [x] Step 4: Replace Advanced Exercise Placeholders
   - **File**: `src/lib/a1-m1-l5-detailed.ts`
   - **Task**: Update `A1_M1_L5_SENTENCE_COMPLETION`, `A1_M1_L5_ERROR_IDENTIFICATION`, `A1_M1_L5_GAP_FILL`, and `A1_M1_L5_COLLOCATION_MATCHING` (replace all placeholders).
   - **Verification**: Check rendering in `/debug/a1-preview/unit-5`.

### [x] Step 5: Fix Exercise Renderer for Flat Exercises
   - **File**: `src/components/ExerciseRenderer.tsx`
   - **Task**: Update the renderer to support exercises where the question and options are directly in the `content` object instead of a `questions` array.
   - **Verification**: Verified that Exercise 2 ("Los Padres") and others in Unit 5 now render correctly.

### [x] Step 6: Final Review & Testing
   - **Task**: Run `npm run lint` and verify all 60 exercises in the preview page.
   - **Task**: Ask user to confirm if all exercises are now showing correctly.
