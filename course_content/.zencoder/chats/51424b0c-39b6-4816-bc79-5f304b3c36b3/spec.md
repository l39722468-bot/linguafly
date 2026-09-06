# Technical Specification: Website Overhaul & Feature Completion

## 1. Technical Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase / PostgreSQL
- **External APIs**: HubSpot (CRM), OpenAI (Evaluation), Stripe (Payments)

## 2. Implementation Approach

### 2.1. Codebase Cleanup
- **Cleanup Script**: Use a bash command to identify and remove `*.disabled` and `*.bak` files.
- **Auth Consolidation**: 
    - Keep `src/app/cuenta/login` and `src/app/cuenta/registro`.
    - Delete `src/app/signin`, `src/app/signup`.
    - Update all internal links and redirects to point to the new consolidated routes.

### 2.2. Level Test CRM Integration
- **New API Endpoint**: `POST /api/level-test/submit`
    - Accepts user email (optional), name, score, level, and answers.
    - Uses `lib/crm/hubspot.ts` (to be verified/created) to create or update a contact in HubSpot with custom properties: `last_cefr_level`, `last_test_score`.
- **Frontend Update**: 
    - Update `LevelTestInteractive.tsx` to include a lead capture form (Email/Name) at the end of the test.
    - Call the new submit endpoint.
    - Redirect to `/cursos/[goal]/[level]` based on the result.

### 2.3. Dynamic Student Dashboard
- **Data Fetching**: Replace `mockUserData` with a Server Component or a `useEffect` hook fetching from `/api/user/progress`.
- **State Management**: Use Supabase to track XP, lessons completed, and average scores from AI evaluations.
- **UI Components**: Create a `ProgressChart` using a lightweight library or CSS-based progress rings for the dashboard.

### 2.4. AI Evaluation Prompt Engineering
- Refine `systemPrompt` in `src/lib/ai/evaluator.ts`:
    - Add instructions to provide "Next Steps" or "Key Areas to Improve".
    - Standardize the feedback tone to be encouraging yet professional.
    - Include examples of "Good" vs "Needs Improvement" feedback in the system message.

## 3. Data Model Changes (Supabase)
- **`user_progress` table**:
    - `user_id` (UUID)
    - `xp` (Integer)
    - `level` (String)
    - `lessons_completed` (Integer)
    - `average_score` (Float)
- **`evaluations` table**:
    - `user_id` (UUID)
    - `type` (String: writing/speaking)
    - `score` (Integer)
    - `feedback` (Text)
    - `created_at` (Timestamp)

## 4. Delivery Phases
1. **Phase A**: Codebase Consolidation (Removal of redundant files & route unification).
2. **Phase B**: Level Test Backend & CRM Sync.
3. **Phase C**: Dashboard Data Integration (Real data instead of mock).
4. **Phase D**: AI Feedback Refinement & Final Polishing.

## 5. Verification Plan
- **Linting**: `npm run lint`
- **Type Checking**: `npm run typecheck`
- **E2E Tests**: Run `npx playwright test` (especially for auth and level test flow).
- **Manual Verification**: Verify HubSpot contact creation after a test run.
