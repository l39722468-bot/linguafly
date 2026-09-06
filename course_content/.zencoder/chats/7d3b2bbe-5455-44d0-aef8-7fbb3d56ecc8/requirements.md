# Product Requirements Document (PRD) - TOEFL iBT Preparation Course

## Overview
Focus English aims to provide a specialized TOEFL iBT preparation course covering three proficiency levels (B1, B2, C1) over a 36-week period for each. The course will include a specialized placement test to assign students to the correct level and will feature authentic exam-style content (Reading, Listening, Speaking, Writing) with integrated audio.

## Target Audience
- English learners aiming to certify their academic English level via TOEFL iBT.
- Levels: B1 (Intermediate), B2 (Upper-Intermediate), C1 (Advanced).

## Key Features

### 1. Specialized TOEFL Placement Test
- **Goal**: Assess the student's current level (B1, B2, or C1) specifically for TOEFL readiness.
- **Structure**: Multiple-choice, fill-in-the-blanks, and reading comprehension questions with increasing difficulty.
- **Output**: Assignment to one of the 3 TOEFL course tracks.

### 2. 36-Week Course Curriculum (Per Level)
- **Levels**: B1, B2, C1.
- **Weekly Structure**: Each week focuses on specific skills and exam strategies.
- **Skills Covered**: 
    - **Reading**: Academic texts, skimming/scanning, specific question types.
    - **Listening**: Lectures and campus conversations with note-taking practice.
    - **Speaking**: Independent and integrated tasks with templates.
    - **Writing**: Integrated task and Academic Discussion task.
- **Deliverables**:
    - Weekly theory/strategy.
    - Practice exercises (Interactions).
    - Audio scripts and generated audio files.
    - Homework assignments.

### 3. Technical Integration
- **Data Format**: TypeScript modules (`.ts`) in `src/lib/toefl-units/` for better type safety and integration with the audio pipeline.
- **Audio**: Integration with the existing ElevenLabs/OpenAI audio generation scripts.
- **UI**: Integration into the existing Next.js course player.

## User Experience
1. User enters the TOEFL section.
2. User takes the **TOEFL Placement Test**.
3. Based on the score, the user is assigned to the B1, B2, or C1 TOEFL course.
4. User progresses through 36 weeks of content, with weekly modules containing theory, exercises, and audio practice.

## Success Criteria
- Successful generation of 3 x 36 weeks of content.
- All audio files generated and linked correctly.
- Placement test accurately distinguishes between B1, B2, and C1.
- Compliance with the existing project's architectural standards.

## Assumptions & Dependencies
- Access to OpenAI/ElevenLabs API for audio generation.
- The existing course player supports the interaction types required (MCQ, Gap Fill, etc.).
- 36 weeks per level is a fixed requirement from the user.
