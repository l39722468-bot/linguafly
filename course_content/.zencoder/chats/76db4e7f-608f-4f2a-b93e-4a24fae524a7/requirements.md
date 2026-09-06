# Product Requirements Document (PRD) - SEO & Authority Enhancements

## 1. Overview
This project aims to improve the Domain Authority (DA) and conversion rate of the Focus English blog by optimizing its macrostructure, enhancing EEAT (Experience, Expertise, Authoritativeness, and Trustworthiness) signals, and integrating high-conversion elements into the content flow.

## 2. Problem Statement
The current blog structure, while functional, hides high-value topic clusters under deep URL paths (`/blog/temas/...`) and lacks strong signals of individual author expertise. Additionally, the transition from informational content to product conversion (paid courses) is not sufficiently friction-less or visually prominent.

## 3. Goals & Objectives
- **Boost Authority**: Rank higher for keywords like "curso de ingles", "preparar examenes oficiales", and "aprender ingles".
- **Increase Conversion**: Drive more users from blog articles to the `/planes` page.
- **Improve EEAT**: Establish real author identities and organizational authority.
- **Optimize Structure**: Implement a more effective Pillar-Cluster internal linking model.

## 4. Key Features & Requirements

### 4.1. Enhanced EEAT (Experience, Expertise, Authoritativeness, Trustworthiness)
- **Author Profiles**: Create a dedicated author system with bios, social links, and expertise fields.
- **Author Pages**: Individual pages for each author (`/blog/autor/[slug]`) listing their credentials and articles.
- **Article Attribution**: Update blog post headers to link to author profiles.
- **Organization Schema**: Enhance existing `Organization` and `EducationalOrganization` schema with more specific details.

### 4.2. Conversion-Focused UI/UX
- **In-Post Conversion Widgets**: Reusable components to be embedded in Markdown/MDX that show course offers, pricing, and "Call to Action" buttons related to the post category.
- **Smart Sidebar**: A conversion-oriented sidebar that changes based on the article's category (e.g., showing Exam Prep courses for exam-related posts).

### 4.3. Macrostructure & Topic Clusters
- **Pillar Page Refinement**: Enhance the `/aprender-ingles` hub and ensure it acts as the central authority node.
- **SEO Hubs Improvement**: Ensure `/blog/temas/[keyword]` (Hubs) have enough unique content and are prioritized in the sitemap.
- **Internal Linking**: Implement a more robust "Topic Cluster" linking section at the bottom of articles.

### 4.4. Schema & Technical SEO
- **Course Schema**: Implement `Course` schema for articles that serve as landing pages for specific levels (A1, B2, etc.).
- **Breadcrumb Optimization**: Ensure breadcrumbs are perfectly aligned with the URL structure and semantically correct in JSON-LD.
- **Image Optimization**: Ensure all blog images use `next/image` with proper `priority` for Hero sections and `lazy` loading for body images.

## 5. Success Metrics
- Increase in organic traffic for targeted high-conversion keywords.
- Higher click-through rate (CTR) from blog posts to the `/planes` page.
- Improvement in "Core Web Vitals" (specifically LCP for blog posts).

## 6. Assumptions & Constraints
- Content is managed via Markdown files in `src/content/blog`.
- Framework is Next.js 15 (App Router).
- Styling uses Tailwind CSS.
