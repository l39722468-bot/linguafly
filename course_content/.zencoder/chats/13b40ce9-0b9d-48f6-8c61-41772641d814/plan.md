# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
### [x] Step: Technical Specification
### [x] Step: Planning

### [x] Step: Implementation

#### [x] Task 1: Preserve distractors in `local-course-service.ts`
- **Description**: Update `src/lib/services/local-course-service.ts` to correctly extract `distractors` from the source data for matching exercises.
- **Verification**: Check if `distractors` are present in the exercise object passed to `MatchingRenderer`.

#### [x] Task 2: Implement dynamic option generation in `MatchingRenderer.tsx`
- **Description**: Add logic to generate and shuffle `options` for each matching item using `correctMatch` of all items and individual `distractors`. Use `useMemo` for performance and stability.
- **Verification**: Ensure each item in the matching exercise has a unique set of shuffled options.

#### [x] Task 3: Update `MatchingRenderer.tsx` UI
- **Description**: Update the rendering logic to always display the multiple-choice button grid instead of the text input for matching items.
- **Verification**: Visually confirm the change in the UI for the target lesson.

#### [x] Task 4: Final Verification
- **Description**: Run `npm run lint` and verify the feature works as expected in the browser.
- **Verification**: Success if lint passes and matching exercises are multiple choice.
