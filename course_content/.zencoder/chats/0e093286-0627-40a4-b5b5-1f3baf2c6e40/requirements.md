# Product Requirements Document (PRD) - English A1 Course "Fun & Stimulating"

## 1. Overview
The goal is to create a comprehensive English A1 level course designed specifically for users who are not naturally attracted to language learning. The course will feature 100 thematic units, each containing 200 exercises, totaling 20,000 exercises. This course will **replace** the existing A1 course.

## 2. Target Audience
- Individuals with A1 level English (Beginners).
- Users who find traditional language learning boring or frustrating.
- Users looking for a gamified and stimulating experience.

## 3. Core Requirements
- **Quantity**: 100 Units, each with 200 exercises.
- **Level**: CEFR A1 (Basic).
- **Tone**: Fun, engaging, stimulating, and "game-like".
- **Content**:
    - Rich and extensive vocabulary.
    - Basic grammar (A1).
    - Varied exercise types to maintain engagement.
- **Platform Compatibility**: Must work with the existing `PremiumUnitViewer` and `PremiumSession` components.
- **Audio**: All exercises must have audio generated from the start.

## 4. Feature Definition & Analysis
### Exercise Types (Fun & Stimulating)
- **Mystery Box (Multiple Choice)**: Guess the word based on a funny description.
- **Emoji Translation (Matching)**: Match phrases with emoji sequences.
- **The Detective (Error Correction/True-False)**: Find the absurdity or the grammatical "impostor".
- **Speed Builder (Reorder Words)**: Quickly assemble sentences to "win" a scenario.
- **Word Hunt (Word Search)**: Find hidden vocabulary.
- **Scenario Challenges (Short Writing)**: Practical (and often funny) writing prompts.
- **Odd One Out**: Identify the word that doesn't belong in a wacky group.

### Thematic Units (Summary of 100 Units)
1. **Survival (Units 1-20)**: Zombie Apocalypse, Desert Island, Lost in the Big City, Ordering Weird Pizza.
2. **Pop Culture & Tech (Units 21-40)**: Superhero Training, Viral Videos, Space Explorers, Future Gadgets.
3. **Wonders & Mysteries (Units 41-60)**: Incredible Animals, Haunted Houses, World Records, Secret Societies.
4. **Life & Humour (Units 61-80)**: School Excuses, Bad Hair Days, Talking Pets, Extreme Sports.
5. **Adventure (Units 81-100)**: Time Travel, Deep Sea Diving, Jungle Safari, Mission to Mars.

## 5. Implementation Strategy
- **Content Generation**: A Python script will generate the 100 JSON files (20,000 exercises) using a rich pedagogical database of A1 content mixed with "fun" templates.
- **Audio Pipeline**: Integrate with `generate-course-audio.ts` or a similar script to batch-generate MP3 files for all 20,000 interactions.
- **Directory**: Overwrite `src/content/cursos/ingles-a1/`.
- **Validation**: Ensure compliance with `UnitData` and `PremiumInteraction` types.

## 6. Constraints
- **Performance**: 200 exercises per JSON file might make them large (approx. 500KB-1MB each). The frontend must handle this without lag.
- **Storage**: 20,000 audio files will require significant storage space and bandwidth.

## 7. Assumptions
- The UI language for instructions will be Spanish (`es-ES`).
- We have access to an LLM or a large database to generate unique content for 20,000 exercises without excessive repetition.
