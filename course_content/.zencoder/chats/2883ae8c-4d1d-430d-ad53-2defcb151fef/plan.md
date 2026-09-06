# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2883ae8c-4d1d-430d-ad53-2defcb151fef/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2883ae8c-4d1d-430d-ad53-2defcb151fef/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2883ae8c-4d1d-430d-ad53-2defcb151fef/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

Create a detailed implementation plan based on `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2883ae8c-4d1d-430d-ad53-2defcb151fef/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function) or too broad (entire feature).

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `/Users/lidia/Documents/focusonenglish/.zencoder/chats/2883ae8c-4d1d-430d-ad53-2defcb151fef/plan.md`.

### [x] Step: Implementation

#### Phase A: Infrastructure & API
- [x] **Task A1**: Implement `POST /api/ai-tutor/chat`. Logic should include system prompt selection for different tutors and JSON response format for feedback.
- [x] **Task A2**: Implement `POST /api/ai-tutor/tts`. Integration with ElevenLabs API using the `elevenlabs-node` or direct fetch.

#### Phase B: UI Core & Speech
- [x] **Task B1**: Refactor `AIConversationSimulator.tsx` state management to handle real message history and API calls.
- [x] **Task B2**: Integrate Web Speech API for real-time speech-to-text in the simulator.
- [x] **Task B3**: Implement audio playback queue to handle AI responses sequentially.

#### Phase C: Hybrid Feedback & Experience
- [x] **Task C1**: Implement the "Feedback Sidebar/Pop-up" in the UI to show corrections from the AI response.
- [x] **Task C2**: Refine System Prompts to ensure high-quality English teaching context and subtle feedback.

#### Phase D: Verification & Polish
- [x] **Task D1**: Perform end-to-end testing of the conversation flow.
- [x] **Task D2**: Run `npm run lint` and fix any UI/UX inconsistencies.
