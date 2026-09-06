# Technical Specification: Pedagogical Content Completion (Phase 2)

## 1. Schema Evolution
To support Cambridge-style tasks, we will extend `src/lib/course-engine/schema.ts` with the following specific schemas:

### Word Formation (`word_formation`)
- **Base Word**: The root word (e.g., "DANGER") provided to the student.
- **Stimulus Text**: A sentence with a gap where the derivative must fit.
- **Target**: Ensure strict validation of the single correct derivative.

### Key Word Transformation (`key_word_transformation`)
- **Original Sentence**: The sentence to be rewritten.
- **Key Word**: The word that MUST be used in the transformation.
- **Sentence Constraint**: Limit of 3-6 words (standard FCE/CAE constraint).
- **Correct Answer**: The full transformed segment.

### Open Cloze (`open_cloze`)
- **Text with Gaps**: A short text (70-100 words) with multiple numbered gaps.
- **Gap Validation**: Unlike `fill_blanks`, these usually only accept a single functional word (preposition, pronoun, article).

## 2. Content Generation Pipeline
1. **Source Generation**: High-quality CEFR-aligned texts (Creative Commons or AI-generated with human-in-the-loop review).
2. **Metadata Tagging**: 
   - Mandatory `mastery_tag` for every interaction (e.g., `grammar:inversion`, `vocabulary:collocations`).
   - `complexity` mapping: B2 (2), C1 (3), C2 (4).
3. **Audio Pipeline**: Automatic generation using ElevenLabs for high-level prosody for C1/C2 listening tasks.

## 3. Structural Standards for A1-C2
- **Unit Minimums**: Each JSON unit must contain at least 15 interactions.
- **Skill Mix**: 
    - 5 Grammar focus tasks.
    - 5 Vocabulary focus tasks.
    - 5 "Use of English" / Skills tasks.

## 4. Verification & Validation
- **JSON Schema**: Every new unit MUST pass `npx ts-node scripts/validate-unit.ts` (new script to be created).
- **Pedagogical Audit**: Automated check for "forbidden" words (Spanish interference) in C1/C2 English-only instructions.
