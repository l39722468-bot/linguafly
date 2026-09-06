# Fix Spanish words in A1 Course Units 40+

The goal is to ensure all words in the exercise questions and options are in English, with Spanish translations available on hover using the `[[English|Spanish]]` syntax. Currently, many exercises have Spanish words written directly or inside `[[Spanish]]` brackets.

## Phase 1: Assessment & Requirements
- [x] Identify the location of A1 course units (`src/lib/course/a1/unit-*.ts`)
- [x] Analyze the current syntax and identify the bug (`[[Spanish]]` instead of `[[English|Spanish]]`)
- [x] Create a Product Requirements Document (PRD)

## Phase 2: Technical Specification
- [x] Define the correction logic (compare with `transcript`, use LLM or regex if possible)
- [x] Save to `spec.md`

## Phase 3: Planning
- [x] Create detailed implementation steps for each unit range

## Phase 4: Implementation
- [x] Fix units 40-42
- [x] Fix units 43-45
- [x] Fix units 46-48
- [x] Fix units 49-51
- [x] Fix units 52-54
- [x] Fix units 55-57
- [x] Fix units 58-60

## Phase 5: Verification
- [x] Run linting and type checking
- [ ] (Optional) Run E2E tests if approved
- [x] Manual verification via browser for a few samples
- [x] Build verification and syntax error fixes

## Phase 6: Completion
- [x] All units 40-60 fixed with correct `[[English|Spanish]]` syntax
- [x] Build successful
- [x] Changes committed to main branch
