# Technical Specification - Course Migration: Travel Preparation

## Context
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Progress tracking)
- **Source**: Articulate Rise SCORM Package (`essential-english-for-spanish-speakers-travel-preparation-course-scorm12-70CCdo0r`)

## Implementation Approach

### 1. Data Model & Storage
- Create a new course structure under `src/content/cursos/viajes/a1/preparacion-viaje/`.
- **Lessons**: Create 5 JSON files (`lesson1.json` to `lesson5.json`) following the `Lesson` interface in `src/lib/exercise-types.ts`.
- **Quiz**: Create `exam.json` for the final assessment.

### 2. Block Mapping (Articulate to Next.js)
| Articulate Block | Next.js Mapping (`TheorySlide`) | Notes |
|------------------|-------------------------------|-------|
| Image            | `explanation` with `imageUrl` | Use images from SCORM assets. |
| Text             | `explanation` with `content`  | Use Markdown for formatting. |
| List             | `explanation` with Markdown   | Convert Articulate lists to `-` or `1.` |
| Accordion        | `explanation` with Markdown   | Use bold headers for each section. |
| Continue Button  | N/A                           | Handled by slide transitions in `TheorySlideViewer`. |
| Multiple Choice  | `multiple-choice` question    | Map to `interactiveCheck` or `exercises`. |

### 3. Asset Management
- **Source Path**: `essential-english-for-spanish-speakers-travel-preparation-course-scorm12-70CCdo0r/scormcontent/assets/`
- **Destination Path**: `public/assets/cursos/viajes/preparacion-viaje/`
- Assets will be referenced using absolute URLs in the JSON files.

### 4. Integration
- Ensure the course is discoverable in the `viajes` dashboard.
- Update `src/app/cursos/viajes/page.tsx` if manual entry is required (check if it's dynamic).
- Use `LessonClient` and `LessonViewer` for rendering.

### 5. Verification Plan
- **Automated**: Run `npm run validate-exercises` to ensure JSON files match schemas.
- **Manual**: Verify each lesson renders correctly in the browser.
- **Progress**: Ensure Supabase records completion correctly.

## Delivery Phases
1. **Phase 1**: Asset migration and folder setup.
2. **Phase 2**: JSON creation for Lessons 1-3.
3. **Phase 3**: JSON creation for Lessons 4-5 and Exam.
4. **Phase 4**: Dashboard integration and verification.
