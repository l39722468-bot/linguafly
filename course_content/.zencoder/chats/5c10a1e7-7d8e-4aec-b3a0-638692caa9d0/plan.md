# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements (Audit)
Audit the current A1 curriculum state. (completed)

### [x] Step: Technical Specification (Audit)
Define audit script and report structure. (completed)

### [x] Step: Planning (Audit)
Break down audit tasks. (completed)

### [x] Step: Implementation (Audit)
Run audit and generate report. (completed)

### [x] Step: Requirements (Content Completion)
Define the structure and content for missing/incomplete units based on the curriculum.

### [x] Step: Technical Specification (Content Completion)
Define the implementation approach for generating/fixing unit content.

### [x] Step: Planning (Content Completion)
Create a unit-by-unit plan for repair and completion.

### [ ] Step: Implementation (Content Completion)
Execute the repair and completion tasks.

### Implementation Tasks (Audit)

#### [x] Task 1: Audit Script Development
#### [x] Task 2: Curriculum Alignment Validation
#### [x] Task 3: Full Course Audit Execution

---

## Content Completion Phase

### [x] Task 4: Unit 3 Reconstruction (`unit-3.ts`)
Implement 60 exercises for Unit 3 (Verb 'to be': Negatives/Questions + Emotions) using the Mateo narrative. (completed)
- **Subtask**: Exercises 1-20: Vocabulary (Emotions) & Basic Negatives. (completed)
- **Subtask**: Exercises 21-40: Yes/No Questions & Short Answers. (completed)
- **Subtask**: Exercises 41-60: Narrative Synthesis (Hostel Check-in Dialogue). (completed)
- **Verification**: Run `node scripts/audit-a1-curriculum.mjs` and check Unit 3 status. (verified)

### [ ] Task 5: Narrative & Translation Injection (Units 4-29)
Repair units identified in the audit as missing "Mateo" context or translations.
- **Subtask**: Process Units 4, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 27.
- **Subtask**: Inject London/Mateo context into prompts and stimuli.
- **Verification**: Run audit script and verify narrative warnings are reduced.

### [ ] Task 6: Batch Translation Fix (Units 30-60)
Fix the missing `[[English|Spanish]]` patterns in the later units.
- **Subtask**: Process units 30 through 60.
- **Verification**: Run audit script and verify translation warnings are cleared.
