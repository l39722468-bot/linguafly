# Technical Specification - 300 A1 Exercises (Unit 1 Focus)

## 1. Technical Context
- **Framework**: Next.js 15 (Node.js runtime for scripts).
- **AI Provider**: OpenAI (GPT-4o).
- **Storage**: TypeScript library file.
- **Validation**: Existing JSON schema and course auditing scripts.

## 2. Implementation Approach

### 2.1. Scenario Matrix Strategy
To avoid repetitiveness, we will generate exercises by rotating through a multidimensional matrix of variables:

| Dimension | Options |
|-----------|---------|
| **Sub-Topic** | Greetings, Personal Info, Family, House, Daily Routine, Days/Months |
| **Context** | Business, Casual, Formal, Travel, Shopping, Academic |
| **Location** | London, New York, Madrid (Spanish context), Tokyo, Virtual/Online |
| **Persona** | Student, Teacher, Manager, Tourist, Family Member, Friend |
| **Exercise Type** | `multiple-choice`, `fill-blank`, `matching`, `sentence-building`, `word-search`, `crossword` |

### 2.2. Context Injector Script
We will create `scripts/generate-a1-unit1-exercises.ts` which will:
1.  Iterate 300 times.
2.  Pick a unique combination from the Scenario Matrix for each iteration.
3.  Inject a "Context Seed" into the `ExerciseGenerator` prompt.
    - Example: "Context: A meeting between a Japanese tourist and a Spanish receptionist in a hotel in Barcelona."
4.  Use a local `HashSet` of generated exercise titles/questions to check for duplicates before saving.

### 2.3. Prompt Engineering Enhancements
We will modify the prompt to explicitly demand:
- **Unique Characters**: Use diverse names (not just John/Mary).
- **Varied Sentence Structures**: Avoid starting every sentence with "I am..." or "He is...".
- **Spanish Explanations**: Ensure clear, pedagogically sound explanations in Spanish.

## 3. Source Code Changes

### 3.1. New Files
- `scripts/generate-a1-unit1-exercises.ts`: Batch generation logic.
- `src/lib/generated-a1-unit1-exercises.ts`: Resulting exercise database.

### 3.2. Modified Files
- `src/lib/ai/exercise-generator.ts`: Potentially add a `customContext` parameter to `GenerateExerciseRequest`.

## 4. Delivery Phases

### Phase 1: Prototype (10 exercises)
- Generate 10 exercises across different types.
- Verify quality and variety.
- Update `requirements.md` and `spec.md` if adjustments are needed.

### Phase 2: Batch Generation (290 exercises)
- Run the generation script in batches of 50 to monitor performance and quality.
- Verify uniqueness using the content hash system.

### Phase 3: Validation & Integration
- Run `npm run validate-exercises`.
- Integrate into the A1 course viewer.

## 5. Verification Approach
- **Linting**: `npm run lint`.
- **Validation**: `node scripts/validate-exercises.mjs`.
- **Manual Spot Check**: Review 10 random exercises for pedagogical accuracy.
