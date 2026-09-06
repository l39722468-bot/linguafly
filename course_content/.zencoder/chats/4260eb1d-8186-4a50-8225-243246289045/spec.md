# Technical Specification - Ultra-Intelligent Adaptive Learning Engine

## 1. Context
- **Language**: TypeScript / Node.js (Next.js 15)
- **Database**: Supabase (PostgreSQL)
- **AI Services**: OpenAI (GPT-4o), ElevenLabs (TTS)
- **Existing Assets**: Exercises in `src/content/cursos/*.json` and `src/lib/*-units/*.ts`.

## 2. Architecture Overview

### 2.1. Content Registry
To handle content from A1 to C2 efficiently, we will implement a `GlobalContentProvider` that can resolve interactions from both JSON files and TypeScript modules.
- **Unified Interaction Schema**: Ensuring all sources return a standard `Interaction` object.

### 2.2. UltraAdaptiveEngine (Core Logic)
Located in `src/lib/course-engine/ultra-adaptive-engine.ts`.
- **State Analysis**: Fetches user mastery, SRS due items, and recent session performance (accuracy, time).
- **Selection Algorithm**:
    1. **Check SRS**: If items are due, prioritize them (20-30% of session).
    2. **Check "Stuck" State**: If the user failed a concept recently, inject a "scaffolding" interaction (lower complexity).
    3. **Check "Boredom" State**: If accuracy is 100% and time is low, jump complexity or level.
    4. **Diversity Check**: Ensure the next exercise is a different type/skill than the previous one.
    5. **Sector Weighting**: Boost probability of exercises matching user's `learning_goals` or `bio` keywords.

### 2.3. Data Model Changes
- **`user_adaptive_session` (New Table)**:
    - `id`, `user_id`, `current_state` (JSONB: { accuracy_streak, last_complexity, last_skill, session_start }).
- **`user_mastery` (Existing)**: Used for concept-level tracking.
- **`user_srs` (Existing)**: Used for spaced repetition.

### 2.4. API Layer
- `POST /api/adaptive/next`: 
    - Input: `userId`.
    - Output: `Interaction` + `sessionMeta`.
- `POST /api/adaptive/evaluate`: 
    - Input: `userId`, `interactionId`, `response`, `timeTaken`.
    - Output: `isCorrect`, `feedback`, `explanation`, `masteryUpdate`.

## 3. Implementation Phases

### Phase 1: Global Content Provider
- Implement a service that indexes all A1-C2 material.
- Add metadata (level, skill, complexity) to all existing exercises if missing.

### Phase 2: UltraAdaptiveEngine Logic
- Implement the selection algorithm with Stuck/Boredom detection.
- Integrate SM-2 logic for SRS interleaving.

### Phase 3: Real-time Enrichment
- Integrate TTS (Text-to-Speech) in the evaluation/next route for exercises without audio.

### Phase 4: Frontend "Infinite Flow"
- Create `UltraPracticeClient` component.
- Implement a smooth transition between exercises with "Bonus" and "Success" animations.

## 4. Verification
- **Unit Tests**: Test the selection logic with various user performance profiles.
- **API Tests**: Verify the next/evaluate loop correctly updates Supabase.
- **Lint/Typecheck**: Run `npm run lint` and `npm run typecheck`.
