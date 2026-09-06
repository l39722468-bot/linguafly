# Technical Specification: English A2 Course Implementation

## 1. Context
This specification details the technical approach for implementing a 60-unit English A2 course with 100 exercises per unit (total 6,000 exercises) based on the provided reference material.

## 2. Infrastructure & Storage
- **Directory**: All content will reside in `src/content/cursos/ingles-a2/`.
- **File Format**: Standardized JSON files named `unit1.json` through `unit60.json`.
- **Data Model**: Follow the `UnitData` and `PremiumInteraction` interfaces defined in `src/types/premium-course.ts`.
- **Discovery**: The `premiumCourseServerService.ts` will automatically discover these files based on the directory structure.

## 3. Content Distribution Strategy
The 60 units will be divided into 6 thematic modules (10 units each):

| Module | Units | Primary Topics |
| :--- | :--- | :--- |
| **1. Adjectives Foundation** | 1-10 | Position, Plural rules, Basic descriptions. |
| **2. Feelings & Qualities** | 11-20 | -ed vs -ing adjectives, permanent vs temporal states. |
| **3. Actions & Frequency** | 21-30 | Adjectives vs Adverbs, Adverbs of frequency position. |
| **4. Connecting Ideas** | 31-40 | Connectors (while, whereas, since, etc.), complex structures. |
| **5. Comparing the World** | 41-50 | Comparatives, Superlatives, Irregulars, Superlatives + Present Perfect. |
| **6. Mastery & Nuance** | 51-60 | Enough, Common Mistakes cleanup, Level Review. |

## 4. Exercise Types Mapping
To reach 100 exercises per unit, we will use a mix of:
- `multiple_choice` (30%): Testing grammar rules and vocabulary.
- `reorder_words` (30%): Crucial for word order (adjectives, frequency adverbs).
- `matching` (20%): Vocabulary pairs and Spanish-English translations.
- `fill_blank` (20%): Contextual gap filling.

## 5. Generation Approach
- **Scripted Generation**: A dedicated script `scripts/generate-a2-course.ts` will be created to generate the JSON files procedurally.
- **Templates**: The script will use localized templates based on the provided reference material to generate 100 variations per unit.
- **Interaction IDs**: Will follow the pattern `A2_UX_IY` (e.g., `A2_U1_I100`).

## 6. Verification Plan
- **Schema Validation**: Run `npm run validate-exercises` to ensure all generated JSONs match the required schema.
- **Route Testing**: Verify that `/curso/ingles-a2` correctly renders the progress bar and unit list.
- **Unit Testing**: Spot-check exercises in units 1, 30, and 60 to ensure content accuracy and variation.
