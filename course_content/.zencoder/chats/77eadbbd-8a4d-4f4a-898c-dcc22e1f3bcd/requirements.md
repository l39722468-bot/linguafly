# Product Requirements Document (PRD) - Course Route Cleanup and Debug Integration

## 1. Goal
Clean up the existing course routes and transition to a new structure based on the `/debug` prefix for level previews.

## 2. Scope
- **Removal**: Eliminate all current routes in `/curso/` (A1-C2).
- **Migration/Preservation**: Focus on the new routes starting with `/debug`.
- **Identified Debug Routes**:
    - `/debug/a1-preview/[unitId]`
    - `/debug/a2-preview/[unitId]`
    - `/debug/b1-preview/[unitId]`
    - `/debug/b2-preview/[unitId]`
    - `/debug/c1-preview/[unitId]`
    - `/debug/weeks/[weekId]`
    - `/debug/engine`

## 3. Requirements
- Delete the directory `src/app/curso`.
- Ensure the `/debug` routes are functional (though they might need reference updates if they link back to `/curso`).
- Identify if any other "production" routes like `/dashboard/general/[level]` should also be removed or redirected. (Assumption: User said "todas estas rutas que me indicas hay que eliminarlas", referring to the ones I listed previously which included both `/curso` and `/dashboard/general`).

## 4. Unclear Aspects
- Should the `/debug` routes be renamed to something more user-facing like `/preview` or remain as `/debug`?
- Should we also delete `/dashboard/general/[level]`? (Assumption: Yes, as per user's last message).
- Is C2 missing from the debug routes? (Only A1-C1 were found in `/debug`).

## 5. Next Steps
- Confirm with user about the removal of `/dashboard/general`.
- Confirm if C2 should be added to `/debug`.
- Create Technical Spec.
