# Product Requirements Document: Website Overhaul & Feature Completion

## 1. Introduction
The objective is to refine the Focus English platform by consolidating the codebase, completing pending features (Level Test, Dashboard), and improving the overall user experience through better AI feedback and progress visualization.

## 2. Goals
- **Maintainability**: Clean up redundant routes and disabled files.
- **Engagement**: Provide students with a clear view of their progress.
- **Conversion**: Ensure the level test leads directly to personalized course recommendations and CRM lead capture.
- **Consistency**: Unified authentication flow.

## 3. Features & Scope

### 3.1. Codebase Consolidation
- Remove all `.disabled` and `.bak` files from `src/app`.
- Unify authentication routes: Migrate `/signin` and `/signup` to `/cuenta/login` and `/cuenta/registro` (or vice versa) to avoid duplication.
- Standardize folder structure for `aula` and `cursos`.

### 3.2. Enhanced Student Dashboard
- Implement a "Progress Overview" component in `/dashboard`.
- Integrate data from `api/evaluate-*` to show performance metrics (Speaking, Writing, Grammar).
- Add a "Next Lesson" shortcut based on user progress.

### 3.3. Full Level Test Integration
- Complete the `test-nivel` functionality.
- Sync results directly with HubSpot CRM.
- Automated redirect to the recommended course (`/cursos/[goal]/[level]`) upon completion.

### 3.4. AI Feedback Refinement
- Update prompts in `src/app/api/evaluate-*` to provide actionable, pedagogical feedback.
- Ensure consistent scoring across different exercise types.

## 4. Non-Functional Requirements
- **Performance**: Ensure the dashboard loads metrics efficiently.
- **SEO**: Maintain metadata integrity during route consolidation.

## 5. Success Criteria
- Zero redundant/disabled files in production.
- Functional level test that creates/updates a HubSpot contact.
- Dashboard displaying at least two progress metrics.
