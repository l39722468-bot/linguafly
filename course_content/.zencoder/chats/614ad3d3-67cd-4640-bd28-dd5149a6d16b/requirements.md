# Product Requirements Document (PRD) - Pedagogical Audit & Content Optimization

## 1. Goal
Ensure that the content in `/practica-inteligente` (Intelligent Practice) meets official Cambridge pedagogical standards, eliminates redundancies, fixes technical inconsistencies, and provides a balanced learning experience across all levels (A1-C2).

## 2. Identified Issues
Based on the initial audit:
- **Redundancy (A2)**: Extreme repetition of basic terms (e.g., "Place of birth" repeated 20+ times in Unit 1).
- **ID Collisions**: Inconsistent `interaction_id` naming across different levels (e.g., `U1_I1` appearing in both A2 and B1).
- **Content Gap (C2)**: High-level units (C2) are severely lacking content (units with only 3-4 exercises).
- **AI Artifacts**: Presence of placeholders like `r1`, `r2` in options, indicating lack of human-in-the-loop validation.

## 3. Requirements
### 3.1 Content Quality
- **Pedagogical Logic**: Every exercise must follow a clear learning objective aligned with Cambridge/CEFR standards.
- **Variety**: Eliminate verbatim repetitions within the same unit. Ensure a mix of exercise types (matching, multiple choice, fill in the blanks, etc.).
- **Level Appropriateness**:
    - A1/A2: Focus on foundations without overwhelming repetition.
    - B1/B2: Focus on functional language and common errors.
    - C1/C2: Focus on nuance, precision, and advanced stylistic control.

### 3.2 Technical Consistency
- **Unique IDs**: Every `interaction_id` must be unique across the entire platform (e.g., `A2_U1_I1` instead of `U1_I1`).
- **Data Integrity**: Remove all AI placeholders (`r1`, `r2`, etc.) and replace them with meaningful pedagogical content.

## 4. Scope
- Audit all files in `src/content/cursos/`.
- Target levels: `ingles-a1`, `ingles-a2`, `ingles-b1`, `ingles-b2`, `ingles-c1`, `ingles-c2`.

## 5. Success Criteria
- No duplicate exercise signatures within units.
- Globally unique interaction IDs.
- C2 units expanded to have at least 10-15 high-quality interactions each.
- All AI placeholders replaced with valid options.
