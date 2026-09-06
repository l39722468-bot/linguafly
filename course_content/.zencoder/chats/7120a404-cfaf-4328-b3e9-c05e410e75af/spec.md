# Technical Specification - Course Deployment (A1-C2)

## Technical Context
- **Frontend**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Data Storage**:
  - JSON files in `src/content/cursos/` (A1, A2, B1)
  - TypeScript files in `src/lib/{level}-units/` (B2, C1, C2)
- **Database**: Supabase (User progress tracking in `user_interaction_progress`)

## Implementation Approach
We will proceed with a level-by-level audit to ensure all 60 units are present and functional. We will not perform a format migration (JSON to TS or vice versa) to minimize risk, as both systems are currently functional.

### Course Architecture
1. **JSON-based (A1, A2, B1)**:
   - Metadata and units loaded via `premiumCourseServerService.ts`.
   - UI: `PremiumUnitViewer.tsx`.
2. **TS-based (B2, C1, C2)**:
   - Units imported directly from `lib`.
   - UI: `B2UnitSession.tsx`, `C1UnitSession.tsx`, `C2UnitSession.tsx`.

## Changes
### Source Code Structure
- No structural changes planned. 
- Potential cleanup of `src/content/cursos/ingles-b2` if confirmed redundant.

### Data Model
- No changes to Supabase schema.

## Delivery Phases
1. **Phase 1: Audit & Fix (A1-B1)**: 
   - Verify 60 units in `src/content/cursos/`.
   - Verify `premiumCourseServerService` loads them correctly.
2. **Phase 2: Audit & Fix (B2-C2)**:
   - Verify 60 units in `src/lib/`.
   - Check for content quality (repetitiveness check).
3. **Phase 3: Integration Verification**:
   - Verify cross-navigation and progress tracking.
4. **Phase 4: Final Commit**:
   - Stage and commit all course-related files.

## Verification Approach
- **Visual Check**: Access each course home page.
- **Unit Check**: Attempt to load unit 1 and unit 60 of each level.
- **Console Check**: Monitor for parsing or loading errors during navigation.
- **Build Check**: Run `npm run build` to ensure no static generation failures for course routes.
