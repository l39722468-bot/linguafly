# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
Create a Product Requirements Document (PRD) based on the feature description.
-   [x] Review existing codebase to understand current architecture and patterns
-   [x] Analyze the feature definition and identify unclear aspects
-   [x] Ask the user for clarifications on aspects that significantly impact scope or user experience
-   [x] Make reasonable decisions for minor details based on context and conventions
-   [x] Save the PRD to `requirements.md`.

### [x] Step: Technical Specification
Create a technical specification based on the PRD.
-   [x] Review existing codebase architecture and identify reusable components
-   [x] Define the implementation approach
-   [x] Save to `spec.md`.

### [x] Step: Planning
Create a detailed implementation plan based on `spec.md`.
-   [x] Break down the work into concrete tasks
-   [x] Each task should reference relevant contracts and include verification steps
-   [x] Replace the Implementation step below with the planned tasks

### [ ] Step: Implementation

#### Task 1: Map and Update Unit 1 Exercises (unit1.json)
-   [ ] Parse `src/lib/a1-m1-l1-detailed.ts` content.
-   [ ] Map all 60 exercises to the `PremiumInteraction` format defined in `UnitData`.
-   [ ] Update `src/content/cursos/ingles-a1/unit1.json` with the new content.
-   [ ] **Verification**: Manually verify JSON structure and content.

#### Task 2: Verify and Fix Unit 1 UI/UX
-   [ ] Start the application server.
-   [ ] Use the browser to navigate to Unit 1 (ingles-a1/unit1).
-   [ ] Check that exercises are displayed correctly (multiple choice, fill blank, reading).
-   [ ] Ensure `[[English|Spanish]]` translations are appearing as tooltips or formatted text.
-   [ ] **Verification**: Browser tool screenshots.

#### Task 3: Test Plan Approval & E2E Testing
-   [ ] Present the test plan to the user.
-   [ ] Create `e2e/unit-1-verification.spec.ts`.
-   [ ] Run the new E2E test.
-   [ ] Run all existing tests to ensure no regressions.
-   [ ] **Verification**: `npm run test:e2e` and `npm run test`.

#### Task 4: Final Verification & Completion
-   [ ] Run `npm run lint` and `npm run typecheck`.
-   [ ] Report completion.
