# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/30722476-e7a1-4e00-8980-91a7270cb09e/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/30722476-e7a1-4e00-8980-91a7270cb09e/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/30722476-e7a1-4e00-8980-91a7270cb09e/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/30722476-e7a1-4e00-8980-91a7270cb09e/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

### [x] Step: Task 1 - Content Skeleton Migration
Create SQL migrations to seed the basic structure (modules and lessons) for the 3 course lines: Professional, Traveler, and Academic.

### [x] Step: Task 2 - IT & Finance Specialization
Implement the specific lessons and exercises for the IT and Finance modules within the Professional line.

### [x] Step: Task 3 - Traveler's 90-day Path
Populate the 12-week curriculum for the Traveler course with specific situational exercises.

### [x] Task 4 - AI Integration & Masterclass
Develop the Masterclass content and integrate AI feedback prompts into the lesson structure.

### [x] Task 5 - Writing Task & AI Feedback UI
Implement the `writingTask` exercise type and integrate it with the `/api/evaluate-writing` endpoint for real-time feedback.

### [x] Task 6 - Gamification & Specialized Badges
Expand the badge system with milestone badges for each specialization (Executive, Digital Nomad, Scholar, AI Pioneer).

### [x] Task 7 - Certification Generation Logic
60. Implement the logic to determine specialization completion and automatically issue certificates, including a public certificate viewer.

### [x] Task 8 - Traveler A1 60-Unit Course Generation
61. Generate and seed 60 situational lessons (units) for Travelers A1.
62. Create 100 exercises per lesson (6,000 exercises total) focusing on real travel scenarios.

### [in_progress] Task 9 - Course Migration & UI Optimization
63. Migrate course to `/curso/viajes-a1` route.
64. [x] Fix Internal Server Error (500) due to SSR/Data validation issues.
65. [in_progress] Optimize Course Curriculum UI to handle 60 units effectively.
66. [ ] Final verification of course flow and traveler experience.
