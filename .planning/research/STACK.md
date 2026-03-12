# Technology Stack

**Project:** Interactive Artists Team Website
**Researched:** 2026-03-11
**Confidence note:** External search tools unavailable during this session. All findings are based on training data (cutoff August 2025) with confidence levels assigned accordingly. Version numbers should be verified against official docs before pinning.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro | ^5.x | Static site generator / framework | Purpose-built for content-heavy, mostly-static sites. Ships zero JS by default — critical for image-heavy portfolio load times. Has first-class support for React/Vue/Svelte islands when interactivity is needed. Simpler mental model than Next.js for a site with no server-side user sessions or API routes. |
| React | ^19.x | UI component islands | Used selectively via Astro's island architecture for interactive pieces (gallery lightbox, contact form). Not the full-page runtime — just where needed. |
| TypeScript | ^5.x | Type safety across components | Catches prop errors in gallery/portfolio components early. Minimal overhead for a small project; large payoff in maintainability. |

**Why Astro over Next.js:** Next.js is excellent but optimized for apps with dynamic data, authentication, and server-rendered pages. This project is a brochure/portfolio site — content changes infrequently, there are no user sessions, and the primary concern is fast load times and great Lighthouse scores (which directly affect client trust). Astro's output is static HTML with optional hydration exactly where needed. Next.js would require App Router configuration, server components reasoning, and deploy infrastructure for a problem that doesn't need any of it.

**Why not Gatsby:** Gatsby's ecosystem stagnated post-2022. Netlify acquired it but community momentum shifted heavily to Astro. Avoid.

**Why not plain HTML/CSS:** A component system is valuable even for small sites — the portfolio grid, project cards, bio components, and press logos will all benefit from reuse. Astro provides this with minimal overhead.

### Content Management

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Sanity | ^3.x | Headless CMS for all content | The artists need to update projects, bios, and press mentions without touching code. Sanity's Studio v3 is a React app the team can run locally or host on Sanity's CDN. Excellent image pipeline (auto-resize, WebP, focal-point cropping). Free tier is generous for this scale. |

**Why Sanity over alternatives:**
- **vs. Contentful:** Contentful's free tier is severely limited; pricing jumps steeply. Sanity's free tier supports this project indefinitely at small-team scale.
- **vs. Notion/Airtable as CMS:** Fragile, not designed for this, no asset management.
- **vs. Markdown files in Git:** Artists are not developers. A visual editing interface is required for a 2-4 person non-technical team.
- **vs. Storyblok:** Good option but Sanity has a stronger image handling pipeline (Sanity Image URL / `@sanity/image-url`), which is critical for a photo-heavy portfolio.

### Image and Video Handling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Sanity Image Pipeline (`@sanity/image-url`) | ^1.x | Responsive images, WebP conversion, focal-point crops | Sanity's CDN transforms images on-the-fly. Eliminates build-time image processing complexity. |
| Cloudinary (optional, evaluate at build time) | N/A | Video hosting and transformation | If video files are large or numerous, Cloudinary handles transcoding, adaptive bitrate, and responsive video. Sanity does not handle video transformation well. |
| Vimeo (preferred over Cloudinary for video) | N/A | Video hosting | For an artist portfolio, Vimeo is the professional standard. Better player aesthetics, no ads, privacy controls. Embed via iframe or Vimeo Player SDK. Store Vimeo video IDs in Sanity, not raw video files. |

**Recommendation:** Store all videos on Vimeo. Store the Vimeo ID in Sanity. Render via the Vimeo embed. This avoids all video infrastructure complexity and is the industry norm for creative portfolios.

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | ^4.x | Utility-first styling | Tailwind 4 dropped the config file in favor of CSS-native configuration. Fast iteration for layout-heavy portfolio grids. Good for responsive masonry/grid layouts. Astro integrates cleanly via `@astrojs/tailwind`. |

**Why Tailwind over CSS Modules or styled-components:** For a small site with 1-2 developers, Tailwind's colocated styling is faster to iterate. CSS Modules are reasonable but add boilerplate. Styled-components adds runtime JS weight that works against the static-site performance goal.

**Note on Tailwind 4:** Tailwind 4 was released in early 2025 and has significant breaking changes from v3. The `@astrojs/tailwind` integration support for v4 should be verified before adopting. If integration issues exist, Tailwind v3.4.x is a stable fallback. Confidence: MEDIUM — verify compatibility at project start.

### Contact Form

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Resend | Latest | Email delivery for contact form submissions | Developer-friendly API, generous free tier (3,000 emails/month), excellent deliverability. Simpler than Sendgrid for a single-use contact form. |
| React Hook Form | ^7.x | Form state and validation | Lightweight, no re-render on every keystroke, integrates well with Zod for validation. Used in the contact form island component. |
| Zod | ^3.x | Schema validation | Validates contact form fields on both client and server (in the Astro API route). Single source of truth for validation rules. |

**Contact form architecture:** Astro supports API routes (`src/pages/api/contact.ts`) which run server-side on Vercel's edge. The React island submits to this endpoint. The endpoint validates with Zod and sends via Resend. No third-party form service needed (avoids Formspree/Netlify Forms limitations and branding).

**Alternative — Netlify Forms:** If deploying to Netlify, their built-in form handling is zero-config and free for low volume. Acceptable if the team prefers Netlify over Vercel. However it requires Netlify lock-in.

### Hosting and Deployment

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | N/A | Hosting and CI/CD | Best-in-class DX for Astro/Next.js static sites. Git-push deploys, automatic preview URLs per PR, global CDN. Free tier is sufficient for this project indefinitely. The Astro adapter for Vercel (`@astrojs/vercel`) is officially maintained. |

**Why Vercel over Netlify:** Both are excellent. Vercel's edge functions have lower cold-start latency (relevant for the contact form API route). Netlify is a valid alternative if the team has existing Netlify experience.

**Why not self-hosted (VPS/S3):** Adds operational burden for no benefit. This is a marketing site — managed hosting is the right call.

### Analytics

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Plausible Analytics | N/A (hosted SaaS) | Privacy-first traffic analytics | Artists will want to know which projects get the most views, where traffic comes from, and contact form conversion rates. Plausible is GDPR-compliant with no cookie banner required. Lightweight script (~1KB). $9/month. |

**Why not Google Analytics 4:** GA4 requires a cookie consent banner in most jurisdictions, adds ~50KB of script weight, and is overkill for this use case. For a portfolio site, Plausible provides everything needed cleanly.

### Animation (optional, use sparingly)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Motion (formerly Framer Motion) | ^11.x | Page transitions, scroll animations | If the site needs subtle scroll-triggered reveals or hover animations on project cards. Use as an island — import only where animation is needed. |

**Caution:** Heavy animation libraries are a common over-engineering trap for portfolio sites. Only adopt if the design explicitly calls for it. CSS transitions and `@keyframes` handle 80% of needs with zero JS weight. Start with CSS, escalate to Motion only if needed.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Astro | Next.js 15 | Next.js is optimized for dynamic apps; adds App Router/RSC complexity for a static portfolio |
| Framework | Astro | Gatsby | Ecosystem stagnation post-2022; community momentum has moved to Astro |
| CMS | Sanity | Contentful | Free tier too limited; pricing jumps sharply for small team |
| CMS | Sanity | Markdown in Git | Non-technical team needs a visual editing interface |
| CMS | Sanity | Storyblok | Sanity's image pipeline is stronger; better for photo-heavy work |
| Styling | Tailwind CSS | CSS Modules | More boilerplate, slower iteration for small team |
| Styling | Tailwind CSS | Styled-components | Runtime JS weight works against static-site performance goal |
| Email | Resend | Sendgrid | Sendgrid has more complex setup for a single form use case |
| Email | Resend | Netlify Forms | Netlify lock-in; limited customization |
| Video | Vimeo embeds | Self-hosted video | Infrastructure complexity, bandwidth cost, no transcoding |
| Video | Vimeo embeds | YouTube embeds | YouTube ads, less professional aesthetic for artist portfolio |
| Analytics | Plausible | Google Analytics 4 | Cookie consent required; script weight; overkill |
| Hosting | Vercel | Netlify | Both valid; Vercel has lower edge function cold-start latency |

---

## Installation

```bash
# Scaffold Astro project
npm create astro@latest my-project -- --template minimal --typescript strict

# Astro integrations
npx astro add react tailwind vercel

# Sanity CMS
npm create sanity@latest

# Core dependencies
npm install @sanity/image-url @sanity/client

# Form handling
npm install react-hook-form zod

# Email
npm install resend

# Optional: animation
npm install motion
```

---

## Confidence Assessment

| Decision | Confidence | Notes |
|----------|------------|-------|
| Astro as framework | HIGH | Dominant choice for static/content sites as of 2025; Astro 5 released late 2024 |
| Sanity as CMS | HIGH | Strong ecosystem position; v3 is stable and actively maintained |
| Tailwind v4 compatibility with Astro | MEDIUM | Tailwind 4 is recent; integration support should be verified at project start |
| Resend for email | HIGH | Established, recommended widely in the Astro/Next.js community |
| Vimeo for video | HIGH | Industry standard for creative/artist portfolios |
| Vercel for hosting | HIGH | Official Astro adapter; strong track record |
| Plausible for analytics | HIGH | Established privacy-first analytics product |
| Motion (animation) | MEDIUM | Only adopt if design requires it; assess at design phase |

---

## Sources

- Training data (knowledge cutoff August 2025) — all HIGH confidence items reflect ecosystem consensus well-established before cutoff
- Astro documentation: https://docs.astro.build
- Sanity documentation: https://www.sanity.io/docs
- Tailwind CSS v4: https://tailwindcss.com/docs
- Resend documentation: https://resend.com/docs
- Vercel + Astro: https://docs.astro.build/en/guides/deploy/vercel/
- NOTE: External search tools were unavailable during this session. Version numbers and compatibility details should be verified against official documentation before project start.
