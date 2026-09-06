# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
Create a Product Requirements Document (PRD) based on the feature description.
Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/35b04a4d-9309-40f9-a589-000ec9687763/requirements.md`.

### [x] Step: Technical Specification
Create a technical specification based on the PRD.
Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/35b04a4d-9309-40f9-a589-000ec9687763/spec.md`.

### [x] Step: Planning
Create a detailed implementation plan.

### [x] Step: Implementation

#### Phase 1: Core Logic & Services
- [x] **Task 1: Update `localCourseService` to support listening exercises**
  - Modify `src/lib/services/local-course-service.ts` to handle `listening-comprehension` and `listening` types.
  - Ensure `audioUrl`, `transcript`, and `duration` are correctly mapped.
  - Update `readingComprehension` mapping to include `vocabularyHelp`.
  - **Verification**: Check if the service correctly converts a JSON with a listening item into a `ListeningExercise` object.

#### Phase 2: Content Enhancement (Pilot)
- [x] **Task 2: Enhance B2 Finanzas Semana 01 Theory**
  - Update `src/content/cursos/trabajo/finanzas/b2/trimestre1/semana01/theory.json` with more in-depth content and economic vocabulary.
  - **Verification**: Verify the theory content appears in the `LessonViewer`.

- [x] **Task 3: Add Economic Article to B2 Finanzas Semana 01**
  - Update `src/content/cursos/trabajo/finanzas/b2/trimestre1/semana01/exercises.json` with a new `readingComprehension` item featuring an economic article and vocabulary tooltips.
  - **Verification**: Verify the article and tooltips appear in the `ReadingRenderer`.

- [x] **Task 4: Add Podcast to B2 Finanzas Semana 01**
  - Update `src/content/cursos/trabajo/finanzas/b2/trimestre1/semana01/exercises.json` with a new `listening-comprehension` item.
  - **Verification**: Verify the podcast audio and transcript appear in the `ListeningRenderer`.

#### Phase 3: Final Review & Cleanup
- [x] **Task 5: Final Verification & Linting**
  - Run `npm run lint` and `npm run typecheck`.
  - Manually test the enhanced lesson in the browser.
  - **Verification**: No linting errors and lesson works as expected.
