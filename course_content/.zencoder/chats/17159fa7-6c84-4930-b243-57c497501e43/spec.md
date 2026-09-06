# Technical Specification: Focus English AI Lab

## 1. Technical Context
- **Framework**: Next.js 15+ (App Router).
- **Language**: TypeScript.
- **AI Services**: 
    - OpenAI GPT-4o (Mission logic, personality, and real-time evaluation).
    - OpenAI Whisper-1 (Speech-to-Text).
    - OpenAI TTS-1 or ElevenLabs (Text-to-Speech).
- **Styling**: Tailwind CSS + Framer Motion (for immersive UI).
- **Database**: Supabase (tracking mission progress and XP).

## 2. Implementation Approach
We will build a new module `/src/app/ai-lab` that hosts the interactive mission experience. It will reuse the logic from `AIConversationSimulator` but with a real backend and a goal-oriented engine.

### Key Patterns:
- **API Strategy**: Similar to `/api/evaluate-speaking`, we will create a streaming API for AI responses to ensure low latency.
- **Component Architecture**: 
    - `MissionManager`: Orchestrates the mission state (Briefing -> Roleplay -> Evaluation).
    - `AIInterface`: Handlers for STT, TTS, and message display.
    - `MissionEvaluator`: Final assessment of goal completion and soft skills.

## 3. Source Code Structure Changes
- `src/app/ai-lab/page.tsx`: Main entry point for the AI Lab.
- `src/app/ai-lab/missions/[id]/page.tsx`: Dynamic route for specific missions.
- `src/app/api/ai-lab/chat/route.ts`: API for real-time mission conversation.
- `src/app/api/ai-lab/evaluate/route.ts`: API for final mission scoring.
- `src/components/ai-lab/`:
    - `MissionCard.tsx`: For selecting missions.
    - `VoiceInterface.tsx`: Specialized recording/playback for the Lab.
    - `MissionFeedback.tsx`: Visual breakdown of performance.
- `src/lib/ai/mission-engine.ts`: Logic to handle mission goals and branching.

## 4. Data Model & API Changes

### New `ExerciseType`:
- Add `ai-mission` to `ExerciseType` in `src/lib/exercise-types.ts`.

### Mission Definition Object:
```typescript
interface AIMission {
  id: string;
  title: string;
  sector: 'tech' | 'marketing' | 'travel' | 'exams' | 'finance' | 'healthcare';
  level: CEFRLevel;
  goal: string;
  persona: {
    name: string;
    personality: string;
    accent: string;
  };
  initialMessage: string;
  successCriteria: string[]; // Key goals to achieve
}
```

### Database (Supabase):
- `user_missions`: Tracks completed missions, scores, and feedback.

## 5. Delivery Phases

### Phase 2.1: Infrastructure & API (Foundation)
- Create the `ai-mission` type and catalog.
- Implement the streaming chat API with goal tracking.
- Set up the basic `/ai-lab` page structure.

### Phase 2.2: Interactive UI & Voice (Experience)
- Build the `VoiceInterface` with STT/TTS integration.
- Implement the mission briefing and wrap-up screens.
- Add Framer Motion animations for "Mission Mode" immersion.

### Phase 2.3: Content & Evaluation (Polishing)
- Create a seed set of 10 missions across different sectors.
- Implement the soft-skills evaluation logic (politeness, cultural nuance).
- Integrate rewards (XP/Badges) with existing gamification system.

## 6. Verification Approach
- **Lint**: `npm run lint`
- **Type-Check**: `npm run type-check`
- **Unit Tests**: Test `mission-engine.ts` for goal detection accuracy.
- **E2E Tests**: Playwright scripts to simulate a full mission flow (briefing to completion).
