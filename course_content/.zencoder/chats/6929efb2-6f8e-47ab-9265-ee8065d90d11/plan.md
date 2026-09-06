# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/6929efb2-6f8e-47ab-9265-ee8065d90d11/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/6929efb2-6f8e-47ab-9265-ee8065d90d11/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/6929efb2-6f8e-47ab-9265-ee8065d90d11/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/6929efb2-6f8e-47ab-9265-ee8065d90d11/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

### [x] Step: Implement Course Progress Logic
Implement `src/lib/course-progress.ts` to fetch uncompleted exercises for a user and course week.
- **Verification**: Run a test script to verify it correctly identifies uncompleted exercises for the admin user.

### [x] Step: Implement API Route
Create `src/app/api/courses/uncompleted-exercises/route.ts` to expose the progress logic via HTTP.
- **Verification**: Use `curl` or a test script to verify the endpoint returns correct data.

### [x] Step: Final Verification
Ensure everything works as expected and perform a final check of the results for the Banking and Finance course (Week 1).
- **Verification**: Final confirmation that uncompleted exercises are correctly listed for the user.
