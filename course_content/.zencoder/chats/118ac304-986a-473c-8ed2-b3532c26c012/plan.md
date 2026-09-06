# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
Debug the word ordering exercises in Unit 2 (B2 Preview). The words are not appearing.

### [x] Step: Technical Specification
- Identify why `DragDropExercise` fails to render words in Unit 2.
- Cause: `DragDropExercise` expects `sentences` or direct fields in `content`, but Unit 2 uses `questions` array.
- Solution: Update `DragDropExercise` to support `questions` array by mapping it to `sentences` internal state.

### [x] Step: Planning
- [x] Analyze `DragDropExercise.tsx` and `unit-2.ts` data format.
- [x] Modify `DragDropExercise.tsx` to handle `questions` array.
- [x] Verify fix by running the dev server and checking visually (or just implement if confident).
- [x] Commit and push changes as requested by user.

### [x] Step: Implementation

#### Task 1: Update DragDropExercise.tsx
Update the component to handle both the old format (direct `content` fields or `sentences` array) and the new format (`questions` array).

#### Task 2: Verification
Manually verify if possible or rely on code analysis.
**Result**: Verified with screenshot from dev server.

#### Task 3: Commit and Push
Perform `git commit` and `git push`.
**Commit**: `9b1c2cf0`