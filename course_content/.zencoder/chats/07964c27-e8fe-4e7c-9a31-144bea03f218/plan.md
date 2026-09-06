# Plan de Ejecución: Expansión de Oferta Académica Focus English

## Workflow Steps

### [x] Step: Requirements
Review the PRD in `30722476-e7a1-4e00-8980-91a7270cb09e/requirements.md`.
- **Status**: Completed. Perfil de audiencia y líneas de cursos definidas.

### [x] Step: Technical Specification
Review the Spec in `30722476-e7a1-4e00-8980-91a7270cb09e/spec.md`.
- **Status**: Completed. Arquitectura basada en `course_goal` y rutas dinámicas.

### [x] Step: Planning
Create a detailed implementation plan based on the specification.
- **Status**: Completed. Plan de 5 fases definido.

## Implementation Plan

### Phase 1: Content Infrastructure & Data Seeding
- [x] Create SQL migrations for the 3 main lines (Professional, Traveler, Academic).
- [x] Create specialization modules (IT, Finance).
- [x] Create Traveler 90-day path modules.
- [x] Create AI Masterclass and Exam expansion modules.
- [x] Verify database state and ensure migrations are applied.

### Phase 2: Dynamic Routing & Dashboard Integration
- [x] Create dynamic route structure `/dashboard/[goal]/[level]`.
- [x] Implement filtering logic by `course_goal` in curriculum fetching.
- [x] Update dashboard navigation to allow selecting between different course lines.
- [x] Ensure `CurriculumGrid.client.tsx` supports the new modules (via new `CourseCurriculum.client.tsx`).

### Phase 3: Specialized Content Implementation
- [x] Populate IT & Finance lessons with specific exercises and materials.
- [x] Implement the 12-week schedule for the Traveler course.
- [x] Add specific exam preparation content (Cambridge, IELTS, TOEFL) via seed migrations.

### Phase 4: AI Integration & Writing Feedback
- [in_progress] Implement the AI Masterclass UI.
- [ ] Integrate writing templates and AI feedback prompts.
- [ ] Verify the AI evaluation logic with the new course content.

### Phase 5: Quality Assurance & Launch
- [ ] Run `npm run lint` and `npm test`.
- [ ] Perform E2E tests for the new dashboard routes.
- [ ] Final verification of course navigation and content delivery.
