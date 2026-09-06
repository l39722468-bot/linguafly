# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/885c8354-62ea-4c0b-901c-4e8057e32036/requirements.md`.

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/885c8354-62ea-4c0b-901c-4e8057e32036/spec.md`.

### [ ] Step: Implementation

#### Phase 1: Infrastructure and Types
- [x] Create directory `src/lib/sectors/admin-a2/`
- [x] Define `DetailedAdminWeek` and related interfaces in `src/lib/sectors/admin-a2/types.ts`
- [x] Create `index.ts` in `admin-a2/` to export the curriculum structure
- [x] Update `src/lib/sectors/admin-curriculum.ts` to reference the new A2 structure

#### Phase 2: Trimester 1 (Weeks 1-12)
- [ ] Implement Week 1-4 (Month 1: Reception)
- [ ] Implement Week 5-8 (Month 2: Equipment)
- [ ] Implement Week 9-12 (Month 3: Correspondence & Review)
- [ ] Generate first batch of 25 exercises (Grammar/Vocab focus)

#### Phase 3: Trimester 2 (Weeks 13-24)
- [ ] Implement Week 13-16 (Month 4: Phone Handling)
- [ ] Implement Week 17-20 (Month 5: Calendar)
- [ ] Implement Week 21-24 (Month 6: Emails & Review)
- [ ] Implement "Inbox Simulator" and "Switchboard" exercise types

#### Phase 4: Trimester 3 (Weeks 25-36)
- [ ] Implement Week 25-28 (Month 7: Customer Support)
- [ ] Implement Week 29-32 (Month 8: Documentation)
- [ ] Implement Week 33-36 (Month 9: Meetings & Final Project)
- [ ] Implement "Stress-Test AI" scenarios

#### Phase 5: Transversal Systems & Polish
- [ ] Implement Spaced Repetition (Flashback) logic
- [ ] Build the Cumulative Admin Glossary
- [ ] Implement the Admin Portfolio (Asset generation)
- [ ] Final validation and linting
