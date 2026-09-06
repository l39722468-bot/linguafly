# Product Requirements Document (PRD) - C1 Level English Course

## 1. Goal
Create a comprehensive C1 level English course consisting of 30 units, with each unit containing 50 activities. The course should follow the structure and style of existing courses in the Focus English platform.

## 2. Scope
- **Level**: C1 (Advanced)
- **Course Structure**: 30 Units
- **Activities per Unit**: 50
- **Total Activities**: 1500
- **Format**: JSON files located in `src/content/cursos/ingles-c1/`
- **Unit Content**: Each unit should have a title, learning outcomes, and blocks of activities.
- **Activity Types**: Should include `multiple_choice`, `transformation`, `fill_blanks`, and other types supported by the platform.
- **Language**: UI in Spanish (`es-ES`), Target Language in English (`en`).

## 3. Implementation Phases
### Phase 1: Syllabus Definition
- Create a list of 30 units with neutral themes and specific topics (grammar, vocabulary, skills).
- Topics should cover all aspects required for C1 level (CEFR).

### Phase 2: Unit Generation
- Create JSON files for each unit.
- Each unit must contain 50 interactions/activities.
- Activities should be varied in type and complexity.

## 4. Technical Constraints
- Must use the existing JSON schema for units.
- Must follow the file naming convention (`unit1.json`, `unit2.json`, etc.).
- Activities must have unique `interaction_id`s.

## 5. Verification
- Use `npm run validate-exercises` to ensure content quality and schema compliance.
- Visual verification via the platform's preview/debug routes.
