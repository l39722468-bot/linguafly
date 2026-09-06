# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
### [x] Step: Technical Specification
### [x] Step: Planning

## Implementation Plan

### Phase 1: Curriculum & Tooling
- [x] **Task 1**: Create `src/lib/a1-redesign-curriculum.ts` defining the 12-unit syllabus with topics and keywords.
- [x] **Task 2**: Create `scripts/verify-a1-mixing.ts` to audit exercise distribution and vocabulary coverage.
- [x] **Task 3**: Create `scripts/generate-a1-varied-course.ts` with batch generation and vocabulary tracking logic.

### Phase 2: Pilot & Verification
- [x] **Task 4**: Generate Units 1-3 using the new script.
- [x] **Task 5**: Run `scripts/verify-a1-mixing.ts` on Units 1-3 and manually review samples.

### Phase 3: Mass Generation
- [x] **Task 6**: Generate Units 4-12.
- [x] **Task 7**: Run final audit on all 12 units.

### Phase 4: Scaling & Finalization
- [ ] **Task 8**: Increase volume of exercises (aiming for variety across 12 units).
- [x] **Task 9**: Archive/Backup existing `unit13-unit34.json` files.
- [x] **Task 10**: Run `npm run validate-exercises` to ensure all new files are valid.
