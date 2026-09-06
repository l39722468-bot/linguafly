# Technical Specification - C1 Level English Course

## 1. Technical Context
- **Language**: TypeScript/JSON
- **Framework**: Next.js (App Router)
- **Content Storage**: JSON files in `src/content/cursos/ingles-c1/`
- **Validation**: Custom validation scripts (`validate-exercises.mjs`)

## 2. Implementation Approach
- Use a script (or manual definition) to define the 30-unit syllabus.
- For each unit, generate a JSON structure containing:
  - `course`: Metadata (unit_id, unit_title, level, etc.)
  - `learning_outcomes`: Array of C1-specific goals.
  - `blocks`: At least one block containing 50 activities.
- Each activity will follow the existing schema:
  - `interaction_id`: `C1_U{unit}_I{index}`
  - `type`: `multiple_choice`, `transformation`, `fill_blanks`, etc.
  - `prompt_es`: Instruction in Spanish.
  - `stimulus_en`: (Optional) Context or sentence in English.
  - `correct_answer`: The expected answer.
  - `explanation`: Contextual explanation for the answer.
  - `concept_tags`: Array of tags (e.g., `grammar`, `vocabulary`).

## 3. Data Model
The JSON structure will match the pattern found in `src/content/cursos/ingles-c1/unit1.json`.

## 4. Delivery Phases
1. **Syllabus Definition**: Define 30 titles and topics.
2. **Unit 1-10 Refinement**: Update existing units to have 50 activities each.
3. **Unit 11-30 Generation**: Create new units with 50 activities each.

## 5. Verification Approach
- Run `npm run validate-exercises` after each unit generation.
- Check unit rendering via browser tool if possible.
