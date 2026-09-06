# Spec and build - B2 Exercise Randomization

## Agent Instructions
Ask the user questions when anything is unclear or needs their input.

---

## Workflow Steps

### [x] Step: Technical Specification
Assess the task's difficulty and create a technical specification.
- Save to `/Users/lidia/Documents/focusonenglish/focusonenglish/.zencoder/chats/1507cd3f-785a-4a2f-ab82-91cc75e4deb0/spec.md`

### [x] Step: Implementation

#### Phase 1: Analysis & Scripting
1. [x] Analyze the current distribution of grammar topics in B2 units.
2. [x] Create a utility script to shuffle `multiple-choice` options and update `correctAnswer` in all B2 unit files.
3. [x] Run the script and verify changes.

#### Phase 2: Grammatical Variety Adjustment
1. [x] Review sequences of exercises in B2 units.
2. [x] Reorder exercises if necessary to avoid predictable sequences of the same grammar point.
3. [x] Ensure distractors (incorrect options) are plausible and varied.

#### Phase 3: Verification
1. [x] Run `npm run lint` and `npm run typecheck` (checked specific files due to project-wide errors).
2. [x] Manually verify randomization on `/debug/b2-preview` (via E2E navigation).
3. [x] Obtain approval for E2E tests and implement them.
4. [x] Write final report.
