# Product Requirements Document (PRD): Curriculum Compliance Audit

## 1. Overview
The goal is to perform a comprehensive audit of the English A1 course exercises (Units 1-60) to ensure they strictly align with the pedagogical and technical specifications defined in `course-specifications.md`.

## 2. Feature Description
A systematic review of all `unitX.json` files to verify:
- **Quantity**: Exactly 60 exercises per unit.
- **Content Alignment**: Vocabulary and grammar must match the unit's specific goals.
- **Pedagogical Standards**: 
    - No trivial or obvious answers.
    - Mandatory full translations using the `[[English|Spanish]]` format.
    - Randomized answer distribution.
- **Structural Integrity**: 
    - Reading exercises must follow the two-phase system (Transcript -> Questions).
    - Inclusion of listening and speaking components as specified.
- **Progressive Difficulty**: Exercises should move from recognition to production within each unit.

## 3. Key Requirements
- **Automated/Semi-automated Audit**: A script or systematic process to scan JSON files and flag discrepancies.
- **Detailed Reporting**: A report highlighting which units or exercises fail to meet specific criteria.
- **Mastery Tags**: Verification that `mastery_tag` values accurately reflect the unit's focus.

## 4. Unclear Aspects & Clarifications
- **Listening/Speaking Exercises**: In the JSON structure, how are listening and speaking exercises identified? (e.g., `type: "listening"`, `type: "speaking"`, or via `mastery_tag`?)
- **Audit Output**: Where should the audit report be saved? (e.g., `audit-report.md`).
- **Correction Scope**: Should the agent only report issues or also attempt to fix them? (Initial phase: Report only).

## 5. Success Criteria
- 100% of the units are audited.
- Discrepancies are clearly documented.
- The course structure is validated against `course-specifications.md`.
