# Spec and build

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:

- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification (Top 700 Keywords)

Assess the task's difficulty and define the approach for selecting the best 700 keywords.

### [x] Step: Implementation (Top 700 Keywords)

1. Filter out keywords containing "gratis".
2. Prioritize categories: Trabajo, Exámenes, Viajes.
3. Select the top 700 keywords.
4. Create `top_700_keywords.md`.

### [x] Step: Selection (Next 70 Keywords)

1. Identify keywords from the priority list that were not in the first 700.
2. Filter out keywords with "gratis" (unless specified otherwise).
3. Select the top 70.
4. Append/Update the keyword list.
