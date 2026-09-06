# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
### [x] Step: Technical Specification
### [x] Step: Planning

## Implementation Plan: AI Speaking Tutor v2 (Realtime)

### Phase 1: Infrastructure
- [x] **Task 1.1: Audio Utilities**: Create `src/lib/ai/audio-utils.ts` to handle PCM16 conversion and base64 for OpenAI.
- [x] **Task 1.2: Session API**: Create `src/app/api/ai-tutor/session/route.ts` to securely fetch ephemeral client secrets from OpenAI.

### Phase 2: Core Realtime Logic
- [x] **Task 2.1: Realtime Hook**: Create `src/hooks/use-realtime-ai.ts` to manage WebSockets and Web Audio API capturing.
- [x] **Task 2.2: Audio Streaming**: Implement bi-directional streaming (Mic -> WS -> Speakers).
- [x] **Task 2.3: Event Handling**: Implement handlers for transcripts and conversation state.

### Phase 3: UI Implementation
- [x] **Task 3.1: Visualizer**: Create `src/components/metodologias/VoiceVisualizer.tsx` for real-time audio feedback.
- [x] **Task 3.2: Realtime Tutor Component**: Build the `RealtimeAITutor.tsx` UI with tutor/scenario selection.
- [x] **Task 3.3: Page Integration**: Update `src/app/metodologias-innovadoras/ia-conversacion/page.tsx` to use the new realtime version.

### Phase 4: Feedback & Verification
- [x] **Task 4.1: Pronunciation Feedback**: Implement logic to parse and display detailed pronunciation scores.
- [x] **Task 4.2: Final Polish & Verification**: Run `npm run lint` and `npm run type-check`.
