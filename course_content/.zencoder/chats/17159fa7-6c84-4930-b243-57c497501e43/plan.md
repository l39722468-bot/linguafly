# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. [x] Review existing codebase to understand current architecture and patterns
2. [x] Analyze the feature definition and identify unclear aspects
3. [x] Ask the user for clarifications on aspects that significantly impact scope or user experience
4. [x] Make reasonable decisions for minor details based on context and conventions
5. [x] If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/17159fa7-6c84-4930-b243-57c497501e43/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/17159fa7-6c84-4930-b243-57c497501e43/requirements.md`.

1. [x] Review existing codebase architecture and identify reusable components
2. [x] Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/17159fa7-6c84-4930-b243-57c497501e43/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

1. [x] Break down the work into concrete tasks
2. [x] Each task should reference relevant contracts and include verification steps
3. [x] Replace the Implementation step below with the planned tasks

### [ ] Step: Implementation

#### Phase 1: Foundation & Data Model
- [ ] **Task 1: Define `ai-mission` and Mission Catalog**
  - Add `ai-mission` to `ExerciseType` and create initial `MISSION_CATALOG` in `src/lib/exercise-types.ts`.
  - Verification: `npm run type-check`
- [ ] **Task 2: Implement Mission Engine Logic**
  - Create `src/lib/ai/mission-engine.ts` to handle goal tracking and mission state.
  - Verification: Unit test for goal detection logic.

#### Phase 2: API Development
- [ ] **Task 3: Create Streaming Chat API**
  - Implement `src/app/api/ai-lab/chat/route.ts` with OpenAI streaming and goal analysis.
  - Verification: Manual test with Postman/Curl.
- [ ] **Task 4: Create Mission Evaluation API**
  - Implement `src/app/api/ai-lab/evaluate/route.ts` for final mission scoring and feedback.
  - Verification: Manual test with sample conversation data.

#### Phase 3: Frontend UI Components
- [ ] **Task 5: AI Lab Dashboard & Mission Cards**
  - Create `src/app/ai-lab/page.tsx` and `src/components/ai-lab/MissionCard.tsx`.
  - Verification: Visual check of the dashboard.
- [ ] **Task 6: Interactive Mission Interface**
  - Implement `src/app/ai-lab/missions/[id]/page.tsx` and `src/components/ai-lab/VoiceInterface.tsx`.
  - Verification: Full interaction flow (text-based) in browser.

#### Phase 4: Voice & Polishing
- [ ] **Task 7: Voice Integration (STT/TTS)**
  - Integrate Whisper (STT) and OpenAI TTS into the `VoiceInterface`.
  - Verification: Manual test of recording and AI audio response.
- [ ] **Task 8: Gamification & Rewards Integration**
  - Connect mission completion to the existing XP/Badge system.
  - Verification: XP increase after mission completion.
- [ ] **Task 9: Final Content & Polish**
  - Add 10 diverse missions (Tech, Marketing, Travel, Exams) and refine UI animations with Framer Motion.
  - Verification: Final E2E test of the complete flow.
