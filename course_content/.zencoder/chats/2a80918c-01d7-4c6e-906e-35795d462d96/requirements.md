# Product Requirements Document (PRD) - Focus English

## 1. Vision & Goals
**Vision**: A mobile-first platform for learning English with short, visual, and practical lessons, immediate feedback, and gamification.
**Product Name**: Focus English
**Target Audience**: Adults, adolescents, and children.
**Level**: Starting with A1 (official CEFR aligned).

## 2. Core Features (MVP)

### 2.1 Interactive Learning Experience
- **Micro-lessons**: Short lessons (3-7 minutes) focused on "can-do" objectives.
- **Activity Types**:
    - **Flashcards**: Image + Audio + SRS (Spaced Repetition System).
    - **Multiple Choice**: Visual options with immediate feedback.
    - **Drag & Drop**: Sentence building (ordering words) and matching.
    - **Listening**: Authentic audio with transcripts and comprehension questions.
    - **Speaking**: Voice recording with AI feedback on pronunciation.
    - **Writing**: Short tasks with automatic correction and model examples.

### 2.2 User Flows & Experience
- **Onboarding**: Goal setting, level assessment, and schedule reminders.
- **Course Navigation**: Module -> Lesson -> Activity hierarchy.
- **Progression**: Visual progress tracking (%), streaks, points, and badges.
- **SRS (Spaced Repetition)**: Automated review of difficult words and frequent errors.

### 2.3 Management & Roles
- **Student Role**: Access courses, track progress, and practice.
- **Professor/Creator Role**:
    - **Editor WYSIWYG**: Tool to create modules, lessons, and activities without coding.
    - **Media Management**: Upload audio and images.
- **Admin Role**: User management, analytics dashboard, and payment oversight.

### 2.4 Payments & Monetization
- **Freemium Model**: Initial lessons free, premium subscription to unlock full content.
- **Stripe Integration**: Handling recurring payments and subscriptions.

## 3. Technical Requirements
- **Platform**: Web (mobile-first responsive).
- **Stack**: Next.js 15, TypeScript, Tailwind CSS, Supabase (Auth/DB/Storage).
- **Performance**: < 2s load time for main screens, efficient audio streaming.
- **Accessibility**: Subtitles, high contrast, and keyboard navigation.

## 4. Success Metrics
- **North Star**: "Successfully completed lessons per active user per week".
- **Retention**: D1, D7, and D30 retention rates.
- **Conversion**: Freemium to Paid conversion rate.
