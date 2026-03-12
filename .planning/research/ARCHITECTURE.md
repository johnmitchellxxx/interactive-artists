# Architecture Patterns

**Domain:** Interactive artist portfolio / small creative team marketing site
**Researched:** 2026-03-11
**Confidence:** HIGH (well-established domain with stable structural patterns)

## Recommended Architecture

A static site with content sourced from either flat files or a headless CMS, deployed to a CDN. No application server is needed for v1. The contact form is the only dynamic surface — handled by a third-party form service or a single serverless function. This matches the PROJECT.md decision toward a static site and keeps hosting costs near zero.

```
┌─────────────────────────────────────────────────────────┐
│                    Visitor's Browser                    │
│  Home → Work Index → Project Detail → About → Contact  │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP (static assets from CDN)
┌────────────────────▼────────────────────────────────────┐
│              Static Site (CDN / Edge)                   │
│  HTML + CSS + JS bundles, images, video thumbnails      │
└────────────────────┬────────────────────────────────────┘
                     │ build-time data fetch
┌────────────────────▼────────────────────────────────────┐
│           Content Layer (build-time source)             │
│  Markdown/MDX files  OR  Headless CMS (e.g. Sanity)    │
│  Projects, Team, Press, Client logos                    │
└─────────────────────────────────────────────────────────┘
                     │ contact form POST only
┌────────────────────▼────────────────────────────────────┐
│         Form Handler (serverless or 3rd-party)          │
│  Formspree / Resend / single edge function              │
└─────────────────────────────────────────────────────────┘
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **Home Page** | First impression: hero reel, category teaser cards, trust signals (client logos, press strip) | Links to Work Index, About, Contact |
| **Work Index** | Filterable grid of all projects; categories: Installations, Public/Outdoor, Corporate Events | Each card links to Project Detail |
| **Project Detail** | Full media gallery (photos + video), description, credits, category tag | Back to Work Index; may link to adjacent project |
| **About Page** | Team bios (2–4 members) with headshots; optional short studio statement | Links to Contact |
| **Contact Page** | Inquiry form (name, email, message, optional project type); form submission to handler | Submits to Form Handler |
| **Press / Clients Section** | Logo wall of brands/clients; press quotes or media mentions | Can live on Home or as standalone section; no outbound data |
| **Navigation / Shell** | Global nav, footer, meta tags, SEO head | Wraps every page; reads site-wide config |
| **Content Layer** | Source of truth for all project data, bios, press, logos | Read at build time by framework; never queried at runtime |
| **Form Handler** | Receives POST, emails team, returns success/error | Receives from Contact Page; no other coupling |
| **Media / Asset CDN** | Serves images and video thumbnails at edge | Consumed by Work Index and Project Detail |

### Data Flow

Build-time (static generation):
```
Content Layer (files or CMS)
  → Framework build step
    → Work Index page (all projects, metadata only)
    → Project Detail pages (one per project, full content)
    → About page (team bios)
    → Home page (featured projects subset, client logos, press)
    → All pages compiled to static HTML + JS bundles
      → Deployed to CDN
```

Runtime (browser):
```
Visitor requests URL
  → CDN serves static HTML (< 200ms globally)
    → Browser hydrates any interactive components
      → Filtering/search on Work Index (client-side, data embedded at build)
      → Contact form user input
        → POST to Form Handler
          → Handler emails team
          → Handler returns 200 or error to browser
```

Media flow:
```
Raw photos/videos (team-supplied)
  → Upload to asset storage (CDN or CMS media library)
    → Build step embeds optimized URLs into HTML
      → Browser fetches media from CDN directly
```

No runtime database queries. No authenticated routes. No user sessions.

## Patterns to Follow

### Pattern 1: Content-driven Static Generation
**What:** Every page is pre-rendered at build time using structured content (projects, bios, press). Dynamic filtering is done client-side using data embedded in the page bundle.
**When:** Always for this project — content changes infrequently, performance matters for first impressions, hosting is free-tier.
**Why:** A potential corporate client landing on a slow site immediately undermines the "impressive creative team" pitch. Static pages load in under 200ms from CDN globally.
**Example content schema:**
```typescript
// Project content model
interface Project {
  slug: string;
  title: string;
  category: 'installation' | 'public-outdoor' | 'corporate-event';
  coverImage: string;
  gallery: string[];       // ordered image URLs
  videoEmbed?: string;     // YouTube/Vimeo embed ID
  description: string;     // rich text or markdown
  year: number;
  client?: string;
  featured: boolean;       // appears on Home page
}

// Team member model
interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  headshot: string;
  order: number;
}
```

### Pattern 2: Category-first Work Organization
**What:** Projects are tagged with exactly one primary category (Installations / Public+Outdoor / Corporate Events). The Work Index displays all projects with client-side filter tabs — no page reload needed.
**When:** Always for this project; these three categories map directly to distinct buyer types (gallery/museum, city/municipality, corporate procurement).
**Why:** A corporate event buyer scanning for "have they done events like mine?" should reach that evidence in one click without wading through installation work.

### Pattern 3: Trust Signal Placement
**What:** Client logos and press mentions appear on the Home page (above the fold on desktop) and optionally on a dedicated Press page. They are static image assets — no live feed, no API.
**When:** The moment the site has more than 3 client logos worth showing.
**Why:** Corporate buyers evaluate credibility in the first 10 seconds. Logos from recognizable brands do more work than any body copy.

### Pattern 4: Single Conversion Path
**What:** Every page has exactly one primary CTA: "Get in touch" / "Hire us" → Contact page. No secondary actions compete with it.
**When:** Always for this project.
**Why:** Portfolio sites that push visitors toward multiple actions (newsletter, social, shop, booking) dilute the primary conversion. This team's goal is inquiry volume, not engagement metrics.

### Pattern 5: Serverless / Third-party Form Only
**What:** Contact form POSTs to a hosted form service (Formspree, Netlify Forms, or a single edge function using Resend/Postmark). No Express server, no database.
**When:** v1 and likely v2 — only revisit if the team needs CRM integration or automated follow-up sequences.
**Why:** Running a Node server for a contact form is significant operational overhead with no benefit at this scale.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Custom CMS Built In-House
**What:** Building an admin interface for the team to update their own content.
**Why bad:** Doubles the scope of v1. Markdown files in a Git repo or a free-tier Sanity studio are sufficient and require zero custom code. A bespoke CMS will never be as good as an existing tool and will become a maintenance burden.
**Instead:** Use file-based content (MDX/YAML) committed to the repo, or a free-tier headless CMS. The team can update via CMS UI or a PR — either is fine.

### Anti-Pattern 2: Heavy JavaScript Framework for a Brochure Site
**What:** Shipping a full client-side SPA (e.g., a vanilla React SPA with client-side routing) with no SSG/SSR.
**Why bad:** Time-to-first-paint suffers, SEO requires extra configuration, and the complexity provides no benefit when content is static.
**Instead:** Use a framework that generates static HTML by default (Next.js with static export, Astro, or similar). JavaScript enhancement should be additive, not load-bearing.

### Anti-Pattern 3: Embedding Full Video Files Directly
**What:** Self-hosting large video files in the repo or on the same CDN as the site.
**Why bad:** Bandwidth costs spike, Git repos bloat, and video performance is worse than a dedicated video host.
**Instead:** Upload to Vimeo (standard for creative professionals) or YouTube (unlisted if preferred). Embed via iframe or lite-embed component. Thumbnail images can still live on the asset CDN.

### Anti-Pattern 4: Monolithic Single-Page Scroll Without Navigation
**What:** Building the entire site as one long scroll with no discrete page URLs (common in "creative" templates).
**Why bad:** SEO suffers — each project can't be linked to individually. Press coverage and client referrals want to share a specific project URL. Analytics can't distinguish what visitors are actually interested in.
**Instead:** Each project gets its own URL (`/work/[slug]`). Home page can use scroll-section navigation as an enhancement, but deep links must work.

### Anti-Pattern 5: Skipping Image Optimization
**What:** Serving full-resolution JPEGs/PNGs directly from the content source.
**Why bad:** Artist work photography is typically 20–50MB raw files. Unoptimized, a project gallery page could be 200MB+. First impressions on mobile will be painful.
**Instead:** Use framework-native image optimization (Next.js `<Image>`, Astro's image integration, or Cloudinary) to serve correctly-sized, WebP/AVIF images with lazy loading. This is a build-time concern, not a runtime server.

## Scalability Considerations

| Concern | At launch (small portfolio) | At 30+ projects | At 100+ projects |
|---------|---------------------------|-----------------|-----------------|
| Build time | Negligible (< 30s) | Still fast (< 60s) | Consider incremental static regeneration |
| Content management | Markdown files in repo is fine | Headless CMS becomes worthwhile | Headless CMS required |
| Media storage | Framework CDN or CMS built-in | Dedicated asset CDN (Cloudinary free tier) | Cloudinary or similar required |
| Form volume | Formspree free tier (50 submissions/month) | Paid tier or custom handler | Light CRM integration |
| Team size | 2-4 people editing directly | Same | Same — this site doesn't need multi-role auth |

## Suggested Build Order

This ordering respects component dependencies: shell before pages, content model before UI, non-dynamic before dynamic.

1. **Project scaffold + routing** — Set up framework, define URL structure, verify static export works. Everything else depends on this.
2. **Content model + sample data** — Define `Project`, `TeamMember`, `PressItem`, `ClientLogo` schemas with 2–3 sample entries each. Data shapes must be stable before building UI against them.
3. **Global shell** — Navigation, footer, SEO head component, font/color tokens. All pages depend on this.
4. **Work Index page** — Core portfolio surface. Highest-value page for visitors. Build with static data first, add filter tabs after.
5. **Project Detail page** — Depends on Work Index data model. Image gallery + optional video embed.
6. **Home page** — Depends on featured project data, client logo data, press data. Build last among content pages so it can pull real content.
7. **About page** — Depends on TeamMember content model. Relatively independent.
8. **Contact page + form handler** — Can be built in parallel with About. Integrate form service last (needs live environment to test delivery).
9. **Press / Clients section** — Can be embedded in Home or extracted to its own page; build after Home exists.
10. **Polish pass** — Responsive QA, image optimization audit, Lighthouse performance run, meta/OG tags.

## Sources

- Architecture patterns based on established static site and Jamstack conventions (HIGH confidence — stable domain)
- Content model design based on standard creative portfolio information architecture (HIGH confidence)
- Anti-patterns derived from common failure modes in portfolio/brochure sites (HIGH confidence — well-documented in the field)
- Scalability thresholds are estimates based on typical static site generator behavior and CDN/form service free tier limits (MEDIUM confidence — verify specific service limits before committing)
