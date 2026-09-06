# Product Requirements Document (PRD) - Academic Content Expansion

## Goal
Expand existing academic articles and create 5 new ones with high-quality Cambridge-style material, SEO optimization, and "downloadable" (print-friendly) Markdown lists.

## Target Audience
- English learners (A1-C1 levels) preparing for official exams (Cambridge, TOEFL, IELTS) or professional use.

## Feature Scope

### 1. Expansion of Existing Articles
- **Articles to expand**:
  - `phrasal-verbs-guia-b2.md`: Add 150-200 phrasal verbs list.
  - `present-perfect-vs-past-simple.md`
  - `verbos-modales-ingles-guia.md`
  - `preposiciones-movimiento-ingles.md`
  - `voz-pasiva-ingles-guia.md`
  - `reglas-pronunciacion-ingles.md`
  - `vocabulario-ropa-ingles.md`
- **Content Requirements**:
  - Cambridge-level academic depth.
  - Practical examples and usage tips.
  - A "Downloadable List" section (Markdown-formatted table/list for easy copying/printing).

### 2. Creation of 5 New Articles
- **Topics**:
  1. **Conditionals (Zero, First, Second, Third)**: Comprehensive guide with 50+ examples.
  2. **Reported Speech**: Rules, changes in tenses, and common reporting verbs.
  3. **Passive Voice (Deep Dive)**: Advanced structures (it is said that..., have something done).
  4. **Relative Clauses**: Defining vs Non-defining, relative pronouns, and omitting "who/that".
  5. **Business English Vocabulary**: 100+ essential phrases for meetings, emails, and negotiations.
- **SEO Keywords**: Use keywords from `seo-keyword-categorization.json` (e.g., "ejercicios de gramatica", "vocabulario en ingles", "ingles comercial").

### 3. Technical Implementation
- Content stored as Markdown in `src/content/blog/metodos/` or `src/content/blog/trabajo/`.
- Use existing Frontmatter patterns (title, description, excerpt, keywords, author, date, image, category).
- Add a specific section `### 📥 Material de Estudio (Versión Imprimible)` at the end of each article.

## Success Criteria
- All 7 existing grammar articles expanded with significant material and lists.
- 5 new articles created and integrated into the blog.
- SEO keywords naturally integrated into the content.
- Cambridge-style academic tone maintained throughout.
