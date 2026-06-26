# Meridian Estates — Real Estate Developer Website Template

A production-ready, fully responsive **Real Estate Developer / Builder** website template built as a master template for the **Aatmanx** AI-powered website generation platform.

All content is driven by a single structured JSON file (`src/data/siteContent.ts`) so it can be replaced/injected by AI or a questionnaire without touching component code.

---

## Tech Stack

- **React 19** + **TypeScript** (strict)
- **TanStack Start v1** (file-based routing, SSR-ready)
- **Vite 7** build tool
- **Tailwind CSS v4** (CSS-first theme in `src/styles.css`, OKLCH tokens)
- **shadcn/ui** components (Radix primitives)
- **Zod** for form validation
- **Sonner** for toast notifications
- **Lucide** icon library

---

## Getting Started

```bash
# install dependencies
bun install      # or: npm install / pnpm install

# start the dev server
bun dev          # http://localhost:8080

# production build
bun run build
bun run start
```

Node 20+ recommended. Bun is preferred but npm/pnpm work.

---

## Project Structure

```
src/
├── assets/                 # Hero, project & construction imagery
├── components/
│   ├── site/               # Reusable website sections
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Amenities.tsx
│   │   ├── Testimonials.tsx
│   │   ├── LocationAdvantages.tsx
│   │   ├── ConstructionProgress.tsx
│   │   ├── ContactSection.tsx
│   │   ├── SiteVisitForm.tsx
│   │   ├── SiteVisitCTA.tsx
│   │   ├── WhatsAppButton.tsx
│   │   ├── PageHeader.tsx
│   │   ├── Section.tsx
│   │   └── SiteShell.tsx
│   └── ui/                 # shadcn/ui primitives
├── data/
│   └── siteContent.ts      # 🔑 Single source of truth for ALL content
├── routes/                 # TanStack file-based routes
│   ├── __root.tsx
│   ├── index.tsx           # Home
│   ├── about.tsx
│   ├── projects.tsx        # Projects listing
│   ├── projects.$slug.tsx  # Dynamic project detail page
│   ├── construction-updates.tsx
│   ├── site-visit.tsx
│   └── contact.tsx
├── hooks/
├── lib/
└── styles.css              # Tailwind v4 theme + design tokens
```

---

## JSON-Driven Content Model

All copy, projects, amenities, testimonials, construction updates, contact info and form settings live in **`src/data/siteContent.ts`**. To repurpose this template for a different developer, replace the values in that file — no component edits required.

```ts
export type SiteContent = {
  businessName: string;
  tagline: string;
  established: string;
  logoText: string;
  hero: { ... };
  whyChooseUs: { ... };
  amenities: { name; icon; description }[];
  testimonials: { name; role; project; quote }[];
  about: { ... };
  projects: Project[];          // each with gallery, floor plans, status, RERA, etc.
  constructionUpdates: ConstructionUpdate[];
  contact: { address; phone; whatsapp; email; mapEmbedUrl; socials };
  siteVisitSettings: { availableDays; timeSlots; note };
};
```

Icons referenced as strings (e.g. `"ShieldCheck"`) resolve to Lucide icons at render time, so AI/questionnaire output can stay pure JSON.

---

## Pages Included

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, featured projects, why-choose-us, amenities, testimonials, CTA |
| `/projects` | All projects listing with filtering by status |
| `/projects/$slug` | Project detail — overview, gallery, floor plans, amenities, location, construction status |
| `/about` | Company story, mission, vision, leadership |
| `/construction-updates` | Monthly construction progress timeline |
| `/site-visit` | Lead capture form (validated with Zod) |
| `/contact` | Contact details, map, enquiry form |

---

## Design System

- Premium real estate palette: cream / charcoal / gold accent
- Typography: **Cormorant Garamond** (serif headings) + system sans body
- All colors, gradients and shadows are semantic tokens in `src/styles.css` (`@theme`) — no hardcoded color utilities
- Tailwind v4 with `@theme inline` mapping for shadcn compatibility

---

## SEO

- Per-route `head()` metadata (title, description, OG tags, canonical) on every page
- Dynamic OG titles/descriptions for project detail pages from JSON data
- Semantic HTML, single H1 per page, alt text on imagery
- `public/robots.txt` included
- Responsive viewport, lazy-loaded images

---

## Responsiveness

Fully responsive across mobile, tablet and desktop. All sections use Tailwind responsive utilities (`sm:`, `md:`, `lg:`) and a fluid container system.

---

## Integration Notes for Aatmanx / Cursor Handoff

1. **Content swap point**: replace `src/data/siteContent.ts` with AI/questionnaire output that conforms to the `SiteContent` type.
2. **Asset swap point**: images imported in `src/data/siteContent.ts` from `@/assets/*` can be swapped for remote URLs (strings) — the components accept both.
3. **Form endpoint**: `src/components/site/SiteVisitForm.tsx` currently shows a toast on submit. Wire its `onSubmit` handler to your lead-capture API / Lovable Cloud table.
4. **Routing**: TanStack Router file-based — add a file to `src/routes/` and the route tree regenerates automatically.
5. **No external services required** to run — the template is self-contained.

---

## Scripts

| Command | Description |
| --- | --- |
| `bun dev` | Start dev server on port 8080 |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | ESLint |

---

## License

Template intended for internal use within the Aatmanx platform.
