# Technical Specification: Curriculum Compliance Audit

## 1. Technical Context
- **Language**: TypeScript/JavaScript (for the audit script).
- **Format**: JSON (`unitX.json` files).
- **Source Files**: `src/content/cursos/ingles-a1/unit[1-60].json`.
- **References**: `course-specifications.md`.

## 2. Implementation Approach
I will create a Node.js-based audit utility (or a set of Bash commands using `jq`) to systematically validate the units. 

### Audit Rules
- **Quantity Check**: Count the number of interactions in each unit (target: 60).
- **Translation Check**: Verify that all `stimulus_en`, `options`, `transcript`, and `prompt_es` strings follow the `[[English|Spanish]]` format where applicable.
- **Mastery Tag Validation**: Ensure `mastery_tag` values align with the unit objectives defined in `course-specifications.md`.
- **Structural Check**:
    - Identify `type: "reading"` exercises and verify the 2-phase structure.
    - Identify `listening` and `speaking` exercises (assuming `type: "listening"` or `type: "speaking"` based on standard patterns).
- **Randomization Check**: Analyze the `correct_answer` distribution across options (A, B, C).

## 3. Source Code Structure Changes
No changes to the application core. A temporary or utility script will be used.
- **Audit Script**: `scripts/audit-a1-curriculum.mjs`.
- **Report**: `/.zencoder/chats/5c10a1e7-7d8e-4aec-b3a0-638692caa9d0/audit-report.md`.

## 4. Delivery Phases
1. **Phase 1: Structure & Quantity Validation**: Verify exercise counts and basic JSON integrity.
2. **Phase 2: Translation & Format Audit**: Check for missing translations and incorrect formatting.
3. **Phase 3: Pedagogical & Curriculum Alignment**: Verify vocabulary/grammar tags against the specifications.
4. **Phase 4: Final Report Generation**: Compile all findings into the audit report.

## 5. Verification Approach
- Run the audit script and inspect the output.
- Manual spot-checks on flagged exercises to confirm accuracy.
