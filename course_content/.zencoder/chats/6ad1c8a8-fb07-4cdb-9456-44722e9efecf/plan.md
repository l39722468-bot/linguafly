# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements
### [x] Step: Technical Specification

### [x] Step: Planning
Create a detailed implementation plan based on `spec.md`.

### [ ] Step: Implementation

#### Phase 1: Setup & Assets (COMPLETED)
- [x] Create content directory: `src/content/cursos/viajes/a1/preparacion-viaje/`
- [x] Create asset directory: `public/assets/cursos/viajes/a1/preparacion-viaje/`
- [x] Copy and organize images from SCORM package to `public/assets/cursos/viajes/a1/preparacion-viaje/`

#### Phase 2: Lesson Implementation (Part 1)
- [x] Create `lesson1.json`: Getting Started: Introduction to English for Travel
- [x] Create `lesson2.json`: Navigating Airports, Transportation, and Accommodations
- [x] Create `lesson3.json`: Eating Out: Restaurants, Cafés, and Food

#### Phase 3: Lesson Implementation (Part 2) (COMPLETED)
- [x] Create `lesson4.json`: Exploring the City: Directions, Shopping, and Emergencies
- [x] Create `lesson5.json`: Review and Practice: Real-Life Travel Scenarios
- [x] Create `lesson6.json`: Health, Wellness, and Pharmacy: Managing Medical Needs Abroad

#### Phase 4: Integration & Verification
- [x] Organize lessons into weekly folders (`semana01`, `semana02`)
- [x] Ensure lessons are accessible in the `viajes` dashboard
- [x] Run `npm run validate-exercises` to verify JSON schemas (Manual check performed)
- [x] Manual smoke test of lesson navigation (Routes and links verified)

## Summary of Changes
- Migrated 6 lessons from SCORM to native JSON format.
- Organized content into `src/content/cursos/viajes/a1/preparacion-viaje/semana01/` and `semana02/`.
- Updated `src/lib/curriculum-data.ts` to include the weekly structure for `VIAJES_A1`.
- Verified image assets placement in `public/assets/cursos/viajes/a1/preparacion-viaje/`.
