# PRD: Completion of Second Trimester - Banca y Finanzas (All Levels)

## Overview
The "Banca y Finanzas" course for levels A1, A2, B1, B2, and C1 is currently incomplete for the second trimester (weeks 13-24). While some content exists up to week 20, many exams are placeholders, and weeks 21-24 are missing entirely.

## Goals
- Provide full educational content for weeks 13-24 for levels A1, A2, B1, B2, and C1.
- Ensure all weeks have Theory, Exercises (50 items), and a complete Exam.
- The final week (Week 24) for each level must be a comprehensive review with a 50-item exam.
- Standardize the trimester length to 12 weeks (ending at week 24).

## Current State Analysis (All Levels)
- **Weeks 13-16**: Generally complete (Theory, 50 Exercises, Exam).
- **Weeks 17-19**: Theory and 50 Exercises exist, but `exam.json` is usually a placeholder.
- **Week 20**: Currently contains "Repaso" (Review) content or incomplete topics. `exam.json` is a placeholder.
- **Weeks 21-24**: Non-existent across all levels.

## Content Strategy
For each level, we will:
1. Complete missing exams for weeks 17-20.
2. Define appropriate topics for weeks 21-23 based on the `FINANCE_SECTOR_CURRICULUM`.
3. Create week 24 as a "Final Trimester Review & Exam".

### Level-Specific Topics for Weeks 21-23 (Draft)
- **A1**: Digital Banking, Customer Service Basics, Common Problems.
- **A2**: Savings Goals, Basic Loans, Simple Economic Trends. (Based on T2 curriculum in `finance-curriculum.ts`).
- **B1**: Tax Basics (VAT), Business Funding, Risk Analysis. (Based on T2 curriculum).
- **B2**: Capital Markets, Forex Risk, Alternative Investments. (Based on T2 curriculum).
- **C1**: Sustainable Investment (ESG), Global Regulation, Risk Management Committees. (Based on T2 curriculum).

## Technical Requirements
- All files must be in JSON format matching existing structures (`theory.json`, `exercises.json`, `exam.json`).
- `exercises.json` must contain 50 items per week.
- `exam.json` for weeks 13-23 must contain 5-10 items.
- `exam.json` for week 24 must contain **50 items**.
- Ids must follow the pattern `fin-[level]-wXX-eY`.
