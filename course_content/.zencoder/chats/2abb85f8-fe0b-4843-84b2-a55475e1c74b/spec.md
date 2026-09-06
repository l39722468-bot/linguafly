# Technical Specification: AI Speaking Tutor v2 (Realtime)

## Technical Context
- **Language/Framework**: TypeScript, Next.js 15 (App Router)
- **Styling**: Tailwind CSS, Lucide React (icons), Framer Motion (animations)
- **API**: OpenAI Realtime API (WebSocket-based)
- **Audio**: Web Audio API (PCM16 encoding, 24kHz sample rate)
- **Backend**: Next.js API Routes (Edge runtime preferred where possible)

## Implementation Approach

### 1. Backend: Session Management
To avoid exposing the main `OPENAI_API_KEY` to the client, we will implement a "Relay" pattern.
- **API Route**: `src/app/api/ai-tutor/session/route.ts`
- **Function**: Fetch an ephemeral session token from OpenAI and return it to the frontend.
- **Model**: `gpt-4o-realtime-preview-2024-12-17`

### 2. Frontend: Realtime Communication
We will use a custom hook `useRealtimeAI` to manage the complexity of:
- **WebSocket Lifecycle**: Connecting, authenticating with the ephemeral token, and handling events.
- **Audio Capturing**: Using `navigator.mediaDevices.getUserMedia` and an `AudioWorklet` or `ScriptProcessorNode` to stream raw audio bytes.
- **Audio Playback**: Streaming received audio chunks from OpenAI into a playback buffer.
- **Event Handling**: Parsing `conversation.item.created`, `response.audio_transcript.delta`, and `response.audio.delta`.

### 3. Audio Processing Utilities
- **`src/lib/ai/audio-utils.ts`**:
    - Convert `Float32Array` (browser audio) to `Int16Array` (OpenAI format).
    - Handle base64 encoding/decoding for the WebSocket protocol.

### 4. UI/UX Components
- **`RealtimeAITutor`**: The main container.
- **`VoiceVisualizer`**: A canvas-based or CSS-based wave visualizer.
- **`TranscriptStream`**: A scrolling view of the ongoing conversation.
- **`FeedbackPanel`**: A slide-over or card-based UI for showing pronunciation scores and corrections.

## Source Code Structure Changes

### New Files
- `src/app/api/ai-tutor/session/route.ts`
- `src/components/metodologias/RealtimeAITutor.tsx`
- `src/components/metodologias/VoiceVisualizer.tsx`
- `src/hooks/use-realtime-ai.ts`
- `src/lib/ai/audio-utils.ts`

### Modified Files
- `src/app/metodologias-innovadoras/ia-conversacion/page.tsx`: Switch from `AIConversationSimulator` to `RealtimeAITutor`.

## Data Model / API Changes
- **Session API**: Returns `{ client_secret: { value: string } }`.
- **Realtime Events**: We will handle standard OpenAI Realtime events:
    - `session.update`: Configure voice, instructions, and tools.
    - `input_audio_buffer.append`: Send user audio.
    - `response.create`: Trigger AI response if VAD is not used or to manual trigger.

## Delivery Phases

### Phase 1: Infrastructure (Foundation)
- Implement `api/ai-tutor/session`.
- Implement audio conversion utilities.
- Setup basic WebSocket connection logic.

### Phase 2: Core Logic (Voice-to-Voice)
- Implement audio streaming from mic to WebSocket.
- Implement audio streaming from WebSocket to speakers.
- Handle basic turn-taking.

### Phase 3: Enhanced UI & Scenarios
- Build the `RealtimeAITutor` UI.
- Integrate `TUTOR_PROMPTS` and Scenario selection.
- Add audio visualization.

### Phase 4: Feedback & Verification
- Implement real-time transcript display.
- Add pronunciation and grammar feedback parsing.
- Run tests and linting.

## Verification Approach
- **Manual Test**: Confirm audio flows bi-directionally without major lag.
- **Cross-browser**: Test on Chrome and Safari (iOS support is critical).
- **Tooling**: `npm run lint` and `npm run type-check`.
