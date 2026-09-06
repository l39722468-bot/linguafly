# Technical Specification: Phrases Section Improvements

## 1. Context
- **Language**: TypeScript / Next.js 15 (App Router).
- **Styling**: Tailwind CSS.
- **Icons**: Lucide React.
- **Data**: Supabase (via `phraseService`).

## 2. Implementation Approach

### 2.1. Update `/aprender-ingles/page.tsx`
- Add a 5th card to the "Explora por Categoría" grid.
- **Icon**: `MessageCircle` or `Sparkles`.
- **Colors**: Use the `coral` theme to match the primary CTA.
- **Content**:
    - **Title**: "Frases en Inglés"
    - **Description**: "Miles de frases útiles categorizadas para cada situación real."
    - **Link**: `/frases-en-ingles`

### 2.2. Update `src/components/sections/Navigation.tsx`
- Add a new link "Frases" between "Blog" and "Test de Nivel" in both desktop and mobile versions.
- Ensure consistent styling with other navigation links.

### 2.3. Optimization of Phrases Spoke Pages (`src/app/frases-en-ingles/[slug]/page.tsx`)
- Verify internal linking from Spoke pages to related Hubs or Courses.
- Add a "Recommended Course" section at the bottom of each category page to drive conversions and interlinking. For example, if the category is "Viajes", link to `/curso-ingles-para-viajar`.

## 3. Detailed Changes

### 3.1. `src/app/aprender-ingles/page.tsx`
Update the `div` grid from `lg:grid-cols-4` to `lg:grid-cols-5` (or keep 4 and let it wrap, but 5 might look better or we can use `lg:grid-cols-3` if we want larger cards).
*Decision*: Keep it flexible. Adding a 5th item will naturally wrap if using `grid-cols-4`, but we can adjust to `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for a better fit of 5 items (2-3 or 3-2).

### 3.2. `src/components/sections/Navigation.tsx`
- Desktop: Add `<Link href="/frases-en-ingles">Frases</Link>`.
- Mobile: Add `<Link href="/frases-en-ingles">Frases</Link>`.

## 4. Verification Plan
- **Manual Check**: Verify that the new links appear and lead to the correct pages.
- **Linting**: Run `npm run lint` to ensure no regressions.
- **Build**: Run `npm run build` to verify pre-rendering of new links and routes.
