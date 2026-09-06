# Technical Specification - Focus English Platform

## 1. Technical Context
- **Language**: TypeScript (v5.7.2)
- **Framework**: Next.js 15 (App Router)
- **UI & Styling**: Tailwind CSS, Framer Motion, Lucide React, Radix UI
- **Backend**: Supabase (Auth, Database, Storage)
- **State Management**: React Context / Hooks
- **Payments**: Stripe

## 2. Implementation Approach

### 2.1 Interactive Activities
We will leverage `framer-motion` for high-quality interactions and animations.
- **Flashcards**: Uses `framer-motion` for 3D flip effects. Integrated with SRS.
- **Drag & Drop**: Uses `framer-motion` for smooth dragging and reordering.
- **Speaking**: Uses Web Speech API or OpenAI Whisper for analysis (already partially implemented in `EnhancedSpeakingExercise.tsx`).

### 2.2 User Progress & SRS
- **SRS Implementation**: A new table `user_srs` will track the mastery of vocabulary and grammar items using a modified SuperMemo-2 algorithm.
- **Progress Tracking**: Enhanced `useGamification` hook to handle lesson-level progression.

### 2.3 Onboarding Flow
- A multi-step client-side form to capture:
  - User goals (Work, Travel, Exams)
  - Current English level (Placement test trigger)
  - Preferred study time

### 2.4 Professor Panel (Editor WYSIWYG)
- A dashboard for creators to build courses.
- **Block-based Editor**: Users can add "blocks" (Text, Audio, Image, Exercise).
- **Exercise Builder**: UI to configure parameters for the 10+ supported exercise types.

## 3. Source Code Structure Changes

### 3.1 New Components
- `src/components/exercises/FlashcardExercise.tsx`: SRS-ready flashcards.
- `src/components/exercises/DragDropExercise.tsx`: Word ordering and matching.
- `src/components/player/LessonPlayer.tsx`: Main container for lesson delivery.
- `src/components/editor/CourseEditor.tsx`: Main WYSIWYG editor component.
- `src/components/onboarding/OnboardingFlow.tsx`: Multi-step onboarding.

### 3.2 New App Routes
- `src/app/onboarding/page.tsx`: Entry point for new users.
- `src/app/cursos/[courseId]/[lessonId]/page.tsx`: Dynamic lesson delivery.
- `src/app/admin/editor/page.tsx`: Course management dashboard.
- `src/app/admin/editor/[courseId]/page.tsx`: Course-specific editor.

### 3.3 Database Schema (Supabase)
- `courses`: Metadata for courses.
- `modules`: Metadata for modules linked to courses.
- `lessons`: Metadata for lessons linked to modules.
- `activities`: JSON definition of activities linked to lessons.
- `user_srs`: Tracking for spaced repetition.
- `user_onboarding`: Captured onboarding data.

## 4. Delivery Phases

### Phase 1: Core Interactive Components
- Implement Flashcards and Drag & Drop components.
- Enhance `ExerciseRenderer` to support these new types.

### Phase 2: User Onboarding
- Build the onboarding flow and data capture.
- Implement the basic placement test integration.

### Phase 3: Lesson Player & Progress
- Create the dynamic lesson player route.
- Implement SRS logic and progress persistence.

### Phase 4: Professor Panel (MVP)
- Implement the basic Course/Module/Lesson CRUD.
- Build the WYSIWYG activity editor.

## 5. Verification Approach
- **Linting**: `npm run lint`
- **Type-checking**: `npm run type-check`
- **Unit Testing**: Jest for SRS algorithm and component logic.
- **E2E Testing**: Playwright for onboarding and lesson completion flows.
