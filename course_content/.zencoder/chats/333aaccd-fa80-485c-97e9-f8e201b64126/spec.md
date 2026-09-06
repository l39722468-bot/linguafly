# Technical Specification: AI Speaking Coach

## Technical Context
- **Framework**: Next.js 15 (App Router).
- **Language**: TypeScript.
- **AI/Realtime**: OpenAI Realtime API (WebSockets) via ephemeral tokens.
- **Audio**: Web Audio API for recording and processing.
- **Database**: Supabase (PostgreSQL).
- **Existing Logic**: `useRealtimeAI.ts` for connection, `AIConversationSimulator.tsx` for scenario selection.

## Implementation Approach

### 1. Data Model (Supabase)
New migration `20260206_ai_speaking_coach.sql`:
- **Table `ai_speaking_sessions`**:
    - `id`: UUID (Primary Key)
    - `user_id`: UUID (Foreign Key to users)
    - `scenario_id`: VARCHAR
    - `tutor_id`: VARCHAR
    - `level`: VARCHAR (A1-C2)
    - `status`: VARCHAR ('in_progress', 'completed')
    - `summary`: TEXT (Generated at the end of session for memory)
    - `created_at`: TIMESTAMP
- **Table `ai_speaking_messages`**:
    - `id`: UUID
    - `session_id`: UUID (Foreign Key)
    - `role`: VARCHAR ('user', 'assistant')
    - `content`: TEXT
    - `feedback`: JSONB (Periodic feedback data: score, corrections)
    - `created_at`: TIMESTAMP

### 2. Core Logic Enhancements

#### Wrapper Hook: `useSpeakingCoach`
Extends `useRealtimeAI` to manage:
- **Session Initialization**: Fetches student level from `users` table and previous `summary` from `ai_speaking_sessions`.
- **Guided Prompting**: Constructs a system prompt with the "Mission" and "Memory".
- **Turn Tracking**: Counts turns and elapsed time.
- **Periodic Feedback**: Every 5 user messages, sends a hidden event or uses a separate GPT-4o-mini call to evaluate the last interaction block.
- **Persistence**: Saves messages and session status to Supabase.

#### API Routes
- `POST /api/ai-tutor/session`: Existing, provides ephemeral tokens.
- `POST /api/evaluate-speaking`: Existing, used for the periodic deep-dive evaluation.
- `POST /api/speaking-coach/complete`: New, generates a final session summary and updates user stats.

### 3. UI/UX: `/practica-ia`
A high-fidelity interface based on `RealtimeAITutor.tsx` but with:
- **Mission Progress Bar**: Shows how far the student is from completing the scenario objective.
- **Feedback Overlay**: Appears every few minutes with a summary of metrics (Pronunciation, Fluency, etc.).
- **Live Visualizer**: Improved `VoiceVisualizer`.
- **Session Timer**: Countdown/Up to 30 minutes.

## Delivery Phases

### Phase 1: Infrastructure & Data
- Create Supabase migration.
- Implement session/message persistence logic in a new hook.

### Phase 2: Conversational Engine
- Refine system prompts for "Guided Missions".
- Implement "Memory" injection from previous sessions.

### Phase 3: Periodic Feedback Loop
- Implement turn-based evaluation logic.
- Design and build the feedback UI components.

### Phase 4: Integration & UX
- Build the final `/practica-ia` page.
- Add entry points in the Landing page and Dashboard.

## Verification Approach
- **Lint/Type-Check**: `npm run lint` and `npm run type-check`.
- **Manual Testing**: verify connection, audio recording, AI response, and feedback appearance.
- **Database Check**: Ensure messages and sessions are saved correctly in Supabase.
