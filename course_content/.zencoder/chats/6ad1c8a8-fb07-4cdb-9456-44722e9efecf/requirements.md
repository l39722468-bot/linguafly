# Product Requirements Document (PRD) - Course Migration (Articulate Rise to Next.js)

## Project Overview
Migrate the "Essential English for Spanish Speakers: Travel Preparation Course" from an Articulate Rise (SCORM) format to the native Next.js platform.

## Goals
1. Replicate the course structure and content in the existing `focusonenglish` architecture.
2. Maintain the interactive learning experience (lessons, exercises, media).
3. Leverage existing AI-driven evaluation and content schemas.

## Course Content Structure
Based on `course_data.json`, the course consists of:
- **Title**: Essential English for Spanish Speakers: Travel Preparation Course
- **Lessons**:
    1. Getting Started: Introduction to English for Travel
    2. The English Alphabet: Your Travel Tool
    3. Essential Greetings and Introductions for Travelers
    4. Key Travel Vocabulary and Phrases
    5. Practice and Review: Putting it All Together
- **Quiz**: Final Assessment

## Feature Requirements

### 1. Content Block Types
Replicate the following Articulate Rise blocks:
- **Image Blocks**: Hero images and overlay images.
- **Text Blocks**: Headings and paragraphs.
- **List Blocks**: Numbered lists for objectives and steps.
- **Interactive Blocks**: 
    - **Continue Buttons**: Progress gating (requires completing previous blocks).
    - **Accordion/Tabs**: For exploring phonetic details and examples.
- **Exercise Blocks**:
    - **Multiple Choice**: Basic comprehension checks.
    - **Matching (to be confirmed)**: Matching words to definitions or images.

### 2. Media Management
- Use images found in `scormcontent/assets/`.
- Maintain AI prompts for future asset regeneration.

### 3. Navigation & Progress
- Sequential lesson progression.
- Integration with the existing `aula` or `cursos` navigation.
- Progress tracking (likely using Supabase as per existing patterns).

## Technical Constraints
- **Category**: The course will be located in `cursos/viajes/`.
- **Progress Tracking**: Use the project's native system with **Supabase**.
- **Interactivity**: Standard navigation (to be refined if "Continue" gating is needed).
- Must follow the existing JSON schemas in `schemas/`.
