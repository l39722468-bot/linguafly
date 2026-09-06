# Product Requirements Document (PRD) - Course Deployment (A1-C2)

## Goal
Deploy functional language courses for levels A1, A2, B1, B2, C1, and C2 in Focus English.

## Current State
- **A1, A2, B1**: Content is in JSON format (`src/content/cursos/`). Pages load data via `premiumCourseServerService`.
- **B2, C1, C2**: Content is in TypeScript format (`src/lib/{level}-units/`). Pages import units directly.
- **Routing**: All levels have established routes in `src/app/curso/{level}/`.
- **Database**: User progress is tracked in Supabase.

## Requirements
1. **Verification**: Ensure all 60 units for each level (A1-C2) are present and correctly formatted.
2. **Consistency**: Ensure all course pages follow the established design and logic (progress tracking, navigation).
3. **Redundancy Cleanup**: Investigate why B2 has both JSON and TS versions and ensure the most complete one is used.
4. **Deployment Readiness**: Commit all changes to the repository to allow for deployment.

## Unclear Aspects
- Whether to unify all levels to a single format (JSON or TS). *Decision: Keep current formats to avoid major refactoring unless necessary.*
- Whether to run content generation scripts. *Decision: Only if units are found missing.*

## Success Criteria
- All routes `/curso/ingles-a1` to `/curso/ingles-c2` are functional and show 60 units.
- All units can be accessed and their exercises are rendered correctly.
- Commit is made to the repository.
