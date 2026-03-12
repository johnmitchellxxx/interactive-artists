---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [astro, sanity, tailwind, react, vite, typescript]

# Dependency graph
requires: []
provides:
  - Astro 6 project scaffold with Sanity v3, React, and Tailwind v4 configured
  - astro.config.mjs with all integrations wired (Tailwind Vite plugin, Sanity, React)
  - src/env.d.ts with astro/client and @sanity/astro/module type references
  - src/styles/global.css with Tailwind v4 @import directive
  - src/layouts/BaseLayout.astro importing global.css
  - src/pages/index.astro placeholder home page
  - sanity.config.ts minimal Studio config
  - .env.example documenting required environment variables
  - Confirmed stack decisions documented in PROJECT.md
affects: [02-sanity-schemas, 03-pages, 04-components, 05-studio, all-phases]

# Tech tracking
tech-stack:
  added:
    - astro@6.0.4 (upgraded from create-astro default to stay on 6.x for Vite 7 compatibility)
    - @sanity/astro@3.3.0
    - @astrojs/react@5.0.0
    - tailwindcss@4.2.1
    - "@tailwindcss/vite@4.2.1"
    - sanity@5.14.1
    - "@sanity/client@7.17.0"
    - "@sanity/image-url@2.0.3"
    - react@19.2.4 + react-dom@19.2.4
  patterns:
    - "Tailwind v4 via @tailwindcss/vite plugin in vite.plugins array (NOT @astrojs/tailwind)"
    - "Sanity Studio embedded with studioBasePath + studioRouterHistory:hash for static builds"
    - "output:static declared explicitly to lock in fully-static build mode"
    - "CI=true in build script — required for Vite 7 non-TTY environments"
    - "loadEnv from vite used to inject PUBLIC_SANITY_* into astro.config.mjs"

key-files:
  created:
    - astro.config.mjs
    - src/env.d.ts
    - src/styles/global.css
    - src/layouts/BaseLayout.astro
    - src/pages/index.astro
    - sanity.config.ts
    - .env.example
    - .gitignore
    - package.json
    - tsconfig.json
  modified:
    - .planning/PROJECT.md

key-decisions:
  - "Astro 6 (not 5): npm create astro installed Astro 6.0.4; Astro 5 + @tailwindcss/vite@4.2.1 caused Vite version mismatch (Astro5 needs Vite6, tailwindcss/vite@4.2.1 needs Vite7) resulting in infinite build hang"
  - "CI=true in build script: Vite 7 progress spinner deadlocks in non-TTY environments without CI flag"
  - "studioRouterHistory:hash for static build: browser-history router mode injects prerender:false route (triggers NoAdapterInstalled), hash mode uses prerender:true"
  - "output:static declared explicitly in astro.config.mjs for clarity even though it is the default"
  - "Sanity Studio minimal config (sanity.config.ts) required even for static builds to prevent @sanity/astro plugin error"

patterns-established:
  - "Pattern 1: All builds run with CI=true (added to npm run build script)"
  - "Pattern 2: Sanity Studio embedded using studioRouterHistory:hash for Astro static output"
  - "Pattern 3: PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET loaded via vite loadEnv in astro.config.mjs"
  - "Pattern 4: env.d.ts dual reference (astro/client + @sanity/astro/module) for full TypeScript support"

requirements-completed: []

# Metrics
duration: 123min
completed: 2026-03-12
---

# Phase 1 Plan 01: Scaffold Foundation Summary

**Astro 6 + Sanity v3 + Tailwind v4 + React static project scaffolded and building in 21s with 2 pages (index + embedded Studio)**

## Performance

- **Duration:** ~123 min (includes extensive build hang debugging)
- **Started:** 2026-03-12T16:08:23Z
- **Completed:** 2026-03-12T19:11:00Z
- **Tasks:** 2 completed
- **Files modified:** 11

## Accomplishments

- Astro 6 project scaffold with all Phase 1 integrations installed and wired
- `npm run build` completes in ~21 seconds, producing 2 pages: `/index.html` and `/studio/index.html`
- Tailwind v4 `@import "tailwindcss"` in global.css imported by BaseLayout
- Stack decisions (Tailwind v4, Sanity v3, static output, embedded Studio) documented in PROJECT.md

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Astro project and install all Phase 1 integrations** - `28e1f09` (feat)
2. **Task 2: Document confirmed stack decision in PROJECT.md** - `c4ddcec` (feat)

## Files Created/Modified

- `astro.config.mjs` - Astro config with Sanity + React + Tailwind Vite plugin; loadEnv for env vars; output:static; studioRouterHistory:hash
- `src/env.d.ts` - Triple-slash refs for astro/client and @sanity/astro/module
- `src/styles/global.css` - Tailwind v4 entry point with `@import "tailwindcss"`
- `src/layouts/BaseLayout.astro` - HTML shell layout importing global.css
- `src/pages/index.astro` - Placeholder home page with Tailwind classes (black bg, white text)
- `src/layouts/BaseLayout.astro` - Base layout with global.css import
- `sanity.config.ts` - Minimal Sanity Studio config (required by @sanity/astro)
- `.env.example` - Documents PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET
- `.gitignore` - Excludes .env, .env.local, dist/, node_modules/, .astro/
- `package.json` - All dependencies + CI=true in build script
- `.planning/PROJECT.md` - Key Decisions table updated with 4 confirmed stack decisions

## Decisions Made

- **Astro 6 instead of Astro 5:** npm create astro installed Astro 6.0.4. @tailwindcss/vite@4.2.1 requires Vite 7, but Astro 5.x requires Vite 6. Keeping Astro 6 avoids the version mismatch that caused infinite build hangs.
- **CI=true in build script:** Vite 7's interactive progress spinner deadlocks when stdout is not a TTY (no interactive terminal). Adding CI=true disables the spinner and allows the build to complete in non-interactive environments.
- **studioRouterHistory:hash for static output:** @sanity/astro's default browser-history router injects a prerender:false route which triggers Astro's NoAdapterInstalled error. The hash router injects prerender:true, compatible with static builds.
- **output:static explicit:** Added to astro.config.mjs for clarity even though it is the default, to make the intent unambiguous.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Astro 5 + @tailwindcss/vite version conflict causing build hang**
- **Found during:** Task 1 (build verification)
- **Issue:** @tailwindcss/vite@4.2.1 requires Vite 7.3.1; Astro 5.x requires Vite 6.4.1. npm resolved to Vite 7 at the top level, creating a version mismatch that caused Vite 7 environments API to deadlock with Astro 5's build pipeline.
- **Fix:** Upgraded to Astro 6.0.4 (which natively requires Vite ^7.3.1), resolving the incompatibility.
- **Files modified:** package.json, package-lock.json
- **Verification:** `npm run build` completes successfully

**2. [Rule 1 - Bug] Vite 7 build hangs in non-TTY environments**
- **Found during:** Task 1 (build verification)
- **Issue:** Vite 7's progress spinner uses an interactive terminal update pattern that deadlocks when stdout is not a TTY (i.e., when run in CI or piped environments). The esbuild service starts but the build never progresses.
- **Fix:** Added `CI=true` to the `build` script in package.json, which disables Vite's interactive spinner.
- **Files modified:** package.json
- **Verification:** `npm run build` exits 0 in ~21 seconds

**3. [Rule 1 - Bug] @sanity/astro browser-history router incompatible with static output**
- **Found during:** Task 1 (first build attempt)
- **Issue:** @sanity/astro's default browser-history router injects a route with prerender:false, which triggers Astro's NoAdapterInstalled error when no SSR adapter is configured.
- **Fix:** Added `studioRouterHistory: 'hash'` to the Sanity integration config (the option name was `studioRouterHistory`, not `routerHistory`). Hash mode injects prerender:true.
- **Files modified:** astro.config.mjs
- **Verification:** Build completes and produces /studio/index.html

**4. [Rule 2 - Missing Critical] sanity.config.ts required but not in plan**
- **Found during:** Task 1 (integration testing)
- **Issue:** @sanity/astro requires a sanity.config.ts in the project root — without it, the Vite plugin throws an error during build setup.
- **Fix:** Created minimal sanity.config.ts using PROJECT_ID and DATASET from env.
- **Files modified:** sanity.config.ts (created)
- **Verification:** Build succeeds

---

**Total deviations:** 4 auto-fixed (2 Rule 1 bugs, 1 Rule 1 bug with option name correction, 1 Rule 2 missing critical)
**Impact on plan:** All auto-fixes necessary for build to work. No scope creep. The final config matches the plan's intent (Tailwind v4, Sanity embedded, static output).

## Issues Encountered

- Significant debugging required to identify root causes of build hang (approximately 90 minutes). Root causes: Vite 7 non-TTY deadlock and Astro 5 version mismatch. Both resolved.

## User Setup Required

Before any Sanity content queries will work, the user needs to:
1. Create a Sanity project at sanity.io (free tier)
2. Copy `.env.example` to `.env` and fill in `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET`
3. Add CORS origins for `localhost:4321` and their production domain in Sanity dashboard

See `.env.example` for the required variables.

## Next Phase Readiness

- All integrations installed and wired — next plans can import `sanityClient` from `sanity:client`
- Tailwind v4 active — utility classes apply in browser
- BaseLayout ready for page templates
- sanity.config.ts ready for schema type additions
- No blockers for Phase 1 Plan 02 (Sanity schemas)
