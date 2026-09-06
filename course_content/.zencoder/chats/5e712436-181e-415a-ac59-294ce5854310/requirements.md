# Product Requirements Document (PRD): English for Travel (A1) Course

## 1. Goal
Create a comprehensive English course specifically designed for travelers with zero initial knowledge of English (A1 level). The course should provide practical tools to handle real-life travel situations.

## 2. Scope
- **Level**: A1 (Beginner).
- **Format**: 60 Units (Weeks) of content.
- **Quantity**: 100 exercises per unit (Total: 6,000 exercises).
- **Target Route**: `http://localhost:5436/dashboard/viajes/a1`.

## 3. Target Audience
- Spanish speakers planning to travel to English-speaking countries.
- Zero or very low level of English.
- Need for practical, immediate communication tools.

## 4. Key Features
- **Specialized Curriculum**: Content focused 100% on travel (Airports, Hotels, Restaurants, Directions, Shopping, Emergencies).
- **Excellent UX**: Clear, interactive exercises with immediate feedback.
- **Variety of Exercises**: Matching, Multiple Choice, Fill in the Blanks, Reorder Words, etc.
- **Progress Tracking**: Integration with existing dashboard and progress systems.

## 5. Content Structure (Proposed)
The 60 units will be divided into 4 trimesters (15 units each) or 5 trimesters (12 units each).
Recommended: **4 Trimesters of 15 units** to cover approximately 15 months if taken weekly, or faster if intensive.

### Trimester 1: Survival & Basics (Units 1-15)
- Airport, Passport Control, Greetings, Numbers, Basic Questions.
### Trimester 2: Movement & Accommodation (Units 16-30)
- Hotel Check-in, Transportation (Taxi, Bus, Train), Directions, City Exploration.
### Trimester 3: Dining & Social (Units 31-45)
- Restaurants, Cafes, Ordering Food, Making Friends, Shopping.
### Trimester 4: Problems & Experiences (Units 46-60)
- Emergencies, Health/Pharmacy, Lost Items, Sightseeing, Future Travel Plans.

## 6. Technical Requirements
- Exercises stored as JSON files in `src/content/cursos/viajes/a1/`.
- Curriculum metadata defined in `src/lib/curriculum-data.ts`.
- Database integration via Supabase (`course_modules`, `course_lessons`, `course_exercises`) to support the dashboard view.
- Support for exercise types: `matching`, `multiple-choice`, `fill-blank`, `reorder_words`, `short_writing`, `reading`, `listening`.

## 7. Unclear Aspects & Decisions
- **Decision**: Organizing into 4 Trimesters (15 units each).
- **Decision**: Using an automated generation script (Python/TS) to produce the 6,000 exercises, as manual creation is unfeasible.
- **Assumption**: Audio generation will be handled as a separate follow-up task using existing scripts (`generate-course-audio.ts`).
