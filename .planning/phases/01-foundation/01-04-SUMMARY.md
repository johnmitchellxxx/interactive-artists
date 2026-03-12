---
phase: 01-foundation
plan: "04"
subsystem: ui
tags: [astro, sanity, groq, image-url, tailwind]

# Dependency graph
requires:
  - phase: 01-foundation/01-01
    provides: Astro project with Sanity integration, sanity:client virtual module, BaseLayout
  - phase: 01-foundation/01-02
    provides: Sanity schemas, urlFor() image builder, projectsQuery GROQ query
  - phase: 01-foundation/01-03
    provides: Real Sanity credentials in .env/.env.local (projectId wrigijsj, dataset production)
provides:
  - Home page that fetches live projects from Sanity and renders CDN images with WebP/AVIF negotiation
  - Proven end-to-end data path: Astro frontmatter -> sanityClient.fetch -> GROQ -> Sanity CDN image
affects: [02-design, all future page-level phases]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Sanity data fetching pattern: sanityClient.fetch<T[]>(query) in Astro frontmatter"
    - "CDN image pattern: urlFor(image).width(800).auto('format').quality(75).url() on <img src>"
    - "Empty-state pattern: check array length before rendering grid, show helpful /studio link"

key-files:
  created: []
  modified:
    - src/pages/index.astro

key-decisions:
  - "Do NOT use Astro's <Image /> component for Sanity-hosted images — use urlFor() with <img> tag instead"
  - "auto('format') enables WebP/AVIF content negotiation via Sanity CDN; AVIF may appear as image/webp on first load (lazy encoding — expected)"
  - "Graceful empty-state on home page links directly to /studio for easy content entry"

patterns-established:
  - "Page data fetching: import query from src/sanity/queries.ts, fetch via sanityClient.fetch<T[]> in frontmatter"
  - "Image rendering: always use urlFor(image).auto('format') with plain <img> tag, never Astro Image component"

requirements-completed: []

# Metrics
duration: 4min
completed: 2026-03-12
---

# Phase 1 Plan 4: Sanity Data Integration Summary

**Home page wired to fetch live Sanity projects and render CDN images with WebP/AVIF negotiation via urlFor().auto('format')**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-12T22:46:35Z
- **Completed:** 2026-03-12T22:50:00Z
- **Tasks:** 1 automated + 1 human-verified (pre-approved via context)
- **Files modified:** 1

## Accomplishments

- Replaced placeholder home page with live Sanity data fetch using `sanityClient.fetch<Project[]>(projectsQuery)`
- Renders project images via `urlFor(image).width(800).auto('format').quality(75).url()` — full CDN pipeline with WebP/AVIF content negotiation
- Graceful empty state when no projects exist, with a link to /studio
- `npm run build` passes (exit code 0, 2 pages built in ~25s)
- Human verification confirmed: Sanity Studio loaded with 4 schema types, "Test Project" document with image published and visible on home page with cdn.sanity.io URL containing auto=format

## Task Commits

Each task was committed atomically:

1. **Task 1: Update home page to fetch and render Sanity projects with CDN images** - `e570076` (feat)
2. **Task 2: Verify Sanity Studio loads and sample project renders with CDN image** - Human-verified (pre-approved via user context; "Test Project" document with image confirmed published)

**Plan metadata:** (docs commit — this summary)

## Files Created/Modified

- `src/pages/index.astro` - Updated from static placeholder to live Sanity data-fetching page with project grid and CDN image rendering

## Decisions Made

- Use `urlFor(image).auto('format')` with a plain `<img>` tag instead of Astro's `<Image />` component for all Sanity-hosted images. This is required because Astro's Image component cannot handle Sanity's CDN URLs and would break format negotiation.
- `auto('format')` delivers image/webp or image/avif depending on browser support. On first load, AVIF may be served as image/webp due to Sanity's lazy AVIF encoding — this is expected behavior, not a bug.
- Empty-state handling: when the projects array is empty, a message with a link to /studio is shown so content entry is friction-free.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Pre-existing deprecation warning from `@sanity/image-url`: "The default export has been deprecated. Use the named export `createImageUrlBuilder` instead." This originates in `src/sanity/imageUrl.ts` established in Plan 02 and is out of scope for this plan. Logged as a deferred item for a future cleanup plan. Build still passes — warning only.

## User Setup Required

None - no external service configuration required beyond what was established in Plan 03.

## Next Phase Readiness

- Full Astro-to-Sanity data path proven: client -> GROQ query -> CDN image pipeline all working
- Phase 1 Foundation complete — all 4 plans (01-01 through 01-04) done
- Ready for Phase 2 design implementation
- Deferred: upgrade `imageUrl.ts` to use named `createImageUrlBuilder` export (cosmetic warning, no functional impact)

---
*Phase: 01-foundation*
*Completed: 2026-03-12*
