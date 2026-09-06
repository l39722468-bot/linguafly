# Product Requirements Document (PRD) - SEO Content Strategy

## 1. Overview
The goal is to increase domain authority and SEO ranking for Focus English by creating and optimizing high-quality blog content targeting specific high-value keywords related to online English courses.

## 2. Objectives
- Achieve high rankings for the provided list of 100+ SEO-targeted URLs.
- Build internal authority through a "Hub and Spoke" model.
- Convert organic traffic into paid users by linking to pricing and registration pages.
- Ensure all content follows existing project conventions (Markdown, Frontmatter, SEO metadata).

## 3. Target URLs and Categories
The strategy covers several key areas:
- **General SEO**: Level-specific (A1, A2, B1, B2, C1, C2) and general learning methods.
- **Exams**: Cambridge (PET, FCE, CAE, CPE), Aptis, IELTS, TOEFL.
- **Business/Professional**: Interviews, CVs, specialized sectors (Engineering, Health, Hospitality).
- **Travel**: Tourist English, emergency phrases, specific travel scenarios.
- **AI/Tools**: Learning with AI, English learning apps.

## 4. Content Structure Requirements
Each article must include:
- **SEO Optimized Title and Description**: Targeting the main keyword.
- **Keywords List**: For metadata.
- **Hub Linking**: Articles must link to their respective "Hub" (e.g., `/blog/gramatica`, `/blog/habilidades`, `/blog/vocabulario`).
- **Internal Linking**: Use `related_routes` in frontmatter and contextual links in the body.
- **Call to Action (CTA)**: Links to `/precios` and `/registro`.
- **FAQs**: Schema-ready FAQs in the frontmatter.

## 5. Hub and Spoke Model
- **Hubs**: Category pages (Grammar, Skills, Vocabulary) and specific high-level routes (`/rutas/certificaciones-ingles`, `/rutas/ingles-para-trabajo`, etc.).
- **Spokes**: Detailed articles (the URLs provided) that link back to hubs and to each other.

## 6. Functional Requirements
- Content must be written in high-quality Spanish (as per existing files).
- Metadata must be correctly formatted for the Next.js SEO components.
- Slugs must match the provided URLs precisely.

## 7. Non-Functional Requirements
- **Performance**: Content should be optimized for fast loading (standard Markdown).
- **Scalability**: Structure should allow adding more topics easily.

## 8. Success Metrics
- Increase in organic traffic for targeted keywords.
- Improvement in Domain Authority (DA) through internal link equity.
- Higher conversion rate from blog to pricing/registration.
