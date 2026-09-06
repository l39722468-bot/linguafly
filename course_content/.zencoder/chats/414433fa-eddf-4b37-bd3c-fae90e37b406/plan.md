# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. [x] Review existing codebase to understand current architecture and patterns
2. [x] Analyze the feature definition and identify unclear aspects
3. [x] Ask the user for clarifications on aspects that significantly impact scope or user experience
4. [x] Make reasonable decisions for minor details based on context and conventions
5. [x] If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/414433fa-eddf-4b37-bd3c-fae90e37b406/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/414433fa-eddf-4b37-bd3c-fae90e37b406/requirements.md`.

1. [x] Review existing codebase architecture and identify reusable components
2. [x] Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/414433fa-eddf-4b37-bd3c-fae90e37b406/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/414433fa-eddf-4b37-bd3c-fae90e37b406/spec.md`.

1. [x] Break down the work into concrete tasks
2. [x] Each task should reference relevant contracts and include verification steps
3. [x] Replace the Implementation step below with the planned tasks

### [in_progress] Step: Implementation

#### Phase 1: Core Components
- [x] Update `Exercise` and `Lesson` interfaces in `src/lib/exercise-types.ts` to support `theorySlides`.
- [x] Create `TheorySlideViewer` component to render interactive slides.
- [x] Integrate `TheorySlideViewer` into `LessonViewer.tsx`.

#### Phase 2: Week 1 Content (Greetings)
- [x] Create `semana01/lesson1.json`, `lesson2.json`, `lesson3.json` in A1 Administration.
- [x] Prepare assets for Week 1 (narration scripts, slide images placeholder).
- [x] Configure and run Media Pipeline for Week 1 videos.

#### Phase 3: Scaling & Integration (Trimester 1)
- [x] Implement batch generation script for A1 content.
- [in_progress] Populate Trimester 1 (Weeks 1-12).
    - [x] Weeks 1-9: Content, Media, and Web Integration completed.
        - [x] Moved videos to `public/videos/courses/admin-a1/`.
        - [x] Integrated JSON files into `src/content/cursos/trabajo/administracion/a1/`.
        - [x] Updated `LessonViewer` for local video playback.
    - [pending] Weeks 10-12: Placeholder generation and media pipeline execution.

