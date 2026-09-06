# Product Requirements Document (PRD): A1 Administration Redesign

## 1. Overview
The A1 Administration course will be completely restructured to provide a more engaging and professional learning experience through interactive slides and explanatory videos. This redesign focuses on foundational workplace communication skills.

## 2. Goals
- **Professionalism**: High-quality video content and structured lessons.
- **Engagement**: Interactive slides that keep students active during theory sessions.
- **Workplace Focus**: Real-world scenarios involving greetings, interviews, emails, and meetings.

## 3. Curriculum Structure
- **Level**: A1 (Beginner)
- **Duration**: 9 months (36 weeks / 3 trimesters)
- **Frequency**: 3 lessons per week (Total: 108 lessons)
- **Core Pillars**:
    - **Greetings & Onboarding**: First impressions and office etiquette.
    - **Interviews**: Basic self-introduction and answering simple professional questions.
    - **Emails**: Writing short, professional messages and understanding common subject lines.
    - **Meetings**: Understanding basic agendas and participating in simple discussions.

## 4. Lesson Format (Interactive Slides)
Each lesson will consist of:
1.  **Explanatory Video**: A professional video introducing the topic (embedded via `videoUrl`).
2.  **Theory Slides**: Concise content cards with audio support.
3.  **Interactive Checks**: Simple "check-your-understanding" questions (Multiple Choice/True-False) integrated within the flow.
4.  **Practice Exercises**: A dedicated practice section following the theory.

## 5. Technical Requirements
- **Content Model**: Lessons must support a sequence of "slides" (sections) and a primary video.
- **Media Pipeline**: Leverage the existing pipeline to generate videos (slides + TTS) where live-action video is not available.
- **Data Migration**: Existing A1 content will be archived or updated to the new format.

## 6. Trimester Breakdown (Preliminary)
- **Trimester 1 (Weeks 1-12)**: Greetings, Numbers, Personal Information, Basic Office Tools.
- **Trimester 2 (Weeks 13-24)**: Interviews (Basic), Job Descriptions, Daily Routines at Work.
- **Trimester 3 (Weeks 25-36)**: Professional Emails (Short), Meetings (Basics), Professional Farewell/Review.

## 7. Assumptions
- Lessons will be served via the current `LessonViewer.tsx` component, which will be enhanced if necessary to support the "interactive slides" flow.
- "Professional explanatory videos" will primarily be generated using the Media Pipeline (TTS + Slides) or sourced from verified educational content.
