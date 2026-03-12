# Roadmap: Interactive Artists Team Website

## Overview

Three phases take this project from an empty repo to a live lead-generation site. Phase 1 locks the foundation — Astro scaffold, Sanity CMS, media pipeline, and Vercel CI/CD — before any UI is built. Phase 2 delivers every content-facing page visitors see: the project gallery with hover animations, team bios, client logos, and press mentions. Phase 3 delivers the site's only conversion mechanism — the contact form — and gates launch on verified end-to-end delivery and performance quality.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Project scaffold, CMS, media pipeline, and Vercel CI/CD in place
- [ ] **Phase 2: Content Pages** - Gallery, team bios, trust signals — everything visitors browse
- [ ] **Phase 3: Contact & Launch** - Contact form end-to-end, QA gates, and go-live

## Phase Details

### Phase 1: Foundation
**Goal**: A working Astro project connected to Sanity, deployable to Vercel, with the media pipeline and content schemas defined before any UI work begins
**Depends on**: Nothing (first phase)
**Requirements**: None (infrastructure prerequisite — no v1 user-facing requirements, but all subsequent phases depend on this)
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` starts the local site with no errors and renders a placeholder home page
  2. Sanity Studio is accessible and contains schemas for Project, TeamMember, PressItem, and ClientLogo
  3. A sample project entry in Sanity with an uploaded image renders on the local site with correct WebP/AVIF output
  4. Pushing to the main branch triggers a Vercel preview deploy that passes without errors
  5. The stack decision (Tailwind v4 vs v3.4.x, MDX vs Sanity) is confirmed and documented in PROJECT.md
**Plans**: 5 plans

Plans:
- [ ] 01-01-PLAN.md — Scaffold Astro project with Tailwind v4 + Sanity integrations; document stack decision in PROJECT.md
- [ ] 01-02-PLAN.md — Define all 4 Sanity schemas, sanity.config.ts, imageUrl utility, and centralized GROQ queries
- [ ] 01-03-PLAN.md — (Checkpoint) Create Sanity project on sanity.io and configure local .env credentials
- [ ] 01-04-PLAN.md — Wire placeholder home page to Sanity data fetch; verify CDN image pipeline end-to-end
- [ ] 01-05-PLAN.md — (Checkpoint) Initialize git, push to GitHub, connect Vercel, set env vars, verify live deploy

### Phase 2: Content Pages
**Goal**: Visitors can browse the team's work, learn who they are, and see social proof — the full read-only experience is live and mobile-responsive
**Depends on**: Phase 1
**Requirements**: GALL-01, GALL-02, TEAM-01, TRST-01, TRST-02
**Success Criteria** (what must be TRUE):
  1. Visitor can view project images in a carousel or grouped grid layout on the homepage and/or a dedicated work page
  2. Mousing over a project image triggers a visible animation (scale, reveal, or overlay)
  3. Visitor can view each artist's photo, name, and bio — one section or page per team member
  4. Visitor can see a grid or row of past client/brand logos somewhere on the site (above the fold on the homepage)
  5. Visitor can read press mentions or media coverage — quotes, publication names, or links — on the site
**Plans**: TBD

### Phase 3: Contact & Launch
**Goal**: Visitors can send an inquiry to the team, the team receives it by email, and the site passes quality gates before going live
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. Visitor can submit a contact form with their name and email as required fields and receive a visible confirmation message
  2. Visitor can optionally select a project type (Installation / Public art / Corporate event) and add a free-text description before submitting
  3. Team receives the form submission as a formatted email at their address within 2 minutes of submission (verified on a fresh email address including spam folder check)
  4. Site loads a representative page in under 2.5 seconds LCP on throttled 4G (verified via Lighthouse)
  5. Site renders correctly on real iOS and Android devices at 375px viewport width
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/5 | Not started | - |
| 2. Content Pages | 0/TBD | Not started | - |
| 3. Contact & Launch | 0/TBD | Not started | - |
