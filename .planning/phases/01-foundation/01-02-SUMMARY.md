---
phase: 01-foundation
plan: 02
subsystem: infra
tags: [sanity, groq, typescript, schema, image-url]

# Dependency graph
requires:
  - phase: 01-foundation/01-01
    provides: Astro 6 scaffold with @sanity/astro configured, sanity:client virtual module available, sanity.config.ts stub at project root
provides:
  - All 4 Sanity document schemas (project, teamMember, pressItem, clientLogo) in src/sanity/schemaTypes/
  - Barrel export schemaTypes[] in src/sanity/schemaTypes/index.ts
  - sanity.config.ts with name, title, all 4 schema types registered
  - urlFor() image URL helper in src/sanity/imageUrl.ts typed with SanityImageSource
  - Centralized GROQ queries (projectsQuery, teamQuery, pressQuery, logosQuery) in src/sanity/queries.ts
affects: [03-pages, 04-components, 05-studio, all-phases]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "All Sanity schemas use defineType + defineField from 'sanity' package"
    - "Image fields with hotspot:true on project.mainImage and teamMember.photo"
    - "clientLogo.logo has hotspot:false (logos need no focal point cropping)"
    - "GROQ queries centralized in queries.ts — never write inline GROQ in page frontmatter"
    - "urlFor() wraps @sanity/image-url builder — never pass Sanity images to Astro <Image />"
    - "sanity:client virtual module imported in imageUrl.ts for image builder initialization"

key-files:
  created:
    - src/sanity/schemaTypes/project.ts
    - src/sanity/schemaTypes/teamMember.ts
    - src/sanity/schemaTypes/pressItem.ts
    - src/sanity/schemaTypes/clientLogo.ts
    - src/sanity/schemaTypes/index.ts
    - src/sanity/imageUrl.ts
    - src/sanity/queries.ts
  modified:
    - sanity.config.ts

key-decisions:
  - "Stub .env.local (gitignored) created with placeholder projectId to unblock build — pre-existing failure from Plan 01 (no .env present)"
  - "sanity.config.ts dataset uses null-coalescing fallback (?? 'production') instead of non-null assertion (!) for robustness"

patterns-established:
  - "Pattern 5: All GROQ queries in src/sanity/queries.ts — import named exports in page files"
  - "Pattern 6: urlFor() from src/sanity/imageUrl.ts for all Sanity image rendering"
  - "Pattern 7: Schema barrel export via src/sanity/schemaTypes/index.ts — sanity.config.ts imports schemaTypes array"

requirements-completed: []

# Metrics
duration: 4min
completed: 2026-03-12
---

# Phase 1 Plan 02: Sanity Schemas Summary

**4 Sanity document schemas (project/teamMember/pressItem/clientLogo) with hotspot images, barrel export, Studio config, urlFor() image utility, and centralized GROQ queries**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-12T18:16:53Z
- **Completed:** 2026-03-12T18:20:41Z
- **Tasks:** 2 completed
- **Files modified:** 8

## Accomplishments

- 4 Sanity document schemas created with correct field names, types, validation, and ordering
- sanity.config.ts updated to register all 4 schema types — Studio will load all document types once credentials are available
- urlFor() image URL helper created using `sanity:client` virtual module — ready for Phase 2 pages
- Centralized GROQ queries for all 4 content types — Phase 2 pages import named exports instead of inline strings
- `npm run build` passes in ~19s producing 2 pages

## Task Commits

Each task was committed atomically:

1. **Task 1: Create all four Sanity schema files and barrel export** - `8ba5ec6` (feat)
2. **Task 2: Update sanity.config.ts, add imageUrl utility and GROQ queries** - `2cd7eea` (feat)

## Files Created/Modified

- `src/sanity/schemaTypes/project.ts` - Project document: title, slug, category (3 options), mainImage (hotspot:true + alt), description, order
- `src/sanity/schemaTypes/teamMember.ts` - TeamMember document: name, role, photo (hotspot:true + alt), bio, order
- `src/sanity/schemaTypes/pressItem.ts` - PressItem document: publication, quote, url, date
- `src/sanity/schemaTypes/clientLogo.ts` - ClientLogo document: name, logo (hotspot:false + alt), order
- `src/sanity/schemaTypes/index.ts` - Barrel export: `export const schemaTypes = [project, teamMember, pressItem, clientLogo]`
- `src/sanity/imageUrl.ts` - urlFor() helper using @sanity/image-url builder + sanity:client
- `src/sanity/queries.ts` - Centralized GROQ: projectsQuery, teamQuery, pressQuery, logosQuery
- `sanity.config.ts` - Added name/title fields, imported schemaTypes barrel, changed dataset to null-coalescing fallback

## Decisions Made

- **Stub .env.local for build:** The build was already failing before this plan because no `.env` file existed with real Sanity credentials. A gitignored `.env.local` stub with a placeholder projectId was created to unblock the build verification step. This does not affect production — users still need real credentials.
- **Dataset null-coalescing:** Changed `process.env.PUBLIC_SANITY_DATASET!` to `process.env.PUBLIC_SANITY_DATASET ?? 'production'` in sanity.config.ts for robustness (matches the plan spec).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created .env.local stub to unblock build verification**
- **Found during:** Task 1 (build verification)
- **Issue:** No `.env` file present in project (pre-existing from Plan 01 — user was told to create it manually). Without `PUBLIC_SANITY_PROJECT_ID`, the Sanity client throws "Configuration must contain projectId" during prerender of `/studio`.
- **Fix:** Created gitignored `.env.local` with `PUBLIC_SANITY_PROJECT_ID=placeholder-for-build` and `PUBLIC_SANITY_DATASET=production` so the build can complete without real credentials.
- **Files modified:** `.env.local` (gitignored, not committed)
- **Verification:** `npm run build` exits 0 in ~19 seconds

---

**Total deviations:** 1 auto-fixed (1 Rule 3 blocking)
**Impact on plan:** Auto-fix necessary for build verification only. No scope creep. Real credentials still required for actual Sanity content queries.

## Issues Encountered

None — plan executed cleanly once the pre-existing missing `.env` was addressed.

## User Setup Required

Before Sanity Studio and content queries will work:
1. Create a Sanity project at sanity.io (free tier)
2. Copy `.env.example` to `.env` and fill in `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET`
3. Add CORS origins for `localhost:4321` and production domain in Sanity dashboard
4. In Sanity Studio (`/studio`), create content documents using the 4 registered schemas

## Next Phase Readiness

- All schema data contracts defined — Phase 2 page work can begin without revisiting the schema layer
- `urlFor()` utility ready for image rendering in all Phase 2 pages
- GROQ query strings named and typed correctly — Phase 3 pages import from `src/sanity/queries.ts`
- sanity.config.ts registered — Studio will display all 4 document types once real projectId is configured
- No blockers for Phase 1 Plan 03

---
*Phase: 01-foundation*
*Completed: 2026-03-12*

## Self-Check: PASSED

All 9 files verified present on disk. Both task commits (8ba5ec6, 2cd7eea) confirmed in git log.
