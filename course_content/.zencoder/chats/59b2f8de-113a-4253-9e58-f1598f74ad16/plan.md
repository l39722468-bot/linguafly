# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
### [x] Step: Technical Specification
### [x] Step: Planning

1. [x] Break down the work into concrete tasks
2. [x] Update the implementation steps below

### [x] Step: Implementation (Phase 1: Pilot Week)

1. **File Structure Setup**
   - [x] Create directory `src/content/cursos/viajes/a1/trimestre1/semana01/`
   - [x] Create initial empty JSON files (`theory.json`, `lesson1.json`, `lesson2.json`, `lesson3.json`, `exercises.json`, `exam.json`)

2. **Content Authoring (Semana 01: The First Steps)**
   - [x] Implement `theory.json`: Alphabet and basic greetings.
   - [x] Implement `lesson1.json`: Airport information desk dialogue.
   - [x] Implement `lesson2.json`: Hotel check-in (spelling name).
   - [x] Implement `lesson3.json`: Essential courtesies at a café.
   - [x] Implement `exercises.json`: Visual and auditory matching.
   - [x] Implement `exam.json`: Final weekly assessment.

3. **Curriculum & Infrastructure Integration**
   - [x] Register the "Travel A1" course in `src/lib/curriculum-data.ts`.
   - [x] Refactor `localCourseService` for generic course support.
   - [x] Implement dynamic routes for `viajes` in `src/app/cursos/viajes/`.

4. **Verification**
   - [x] Validate JSON structure.
   - [x] Check `localhost:3000` for pilot week visibility.
   - [x] Run `npm run lint`.
