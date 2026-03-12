# Project Research Summary

**Project:** Interactive Artists Team Website
**Domain:** Interactive artist collective / creative agency portfolio site (lead generation)
**Researched:** 2026-03-11
**Confidence:** MEDIUM (HIGH on architecture and stack, MEDIUM on features and pitfalls — external search tools unavailable during all research sessions)

## Executive Summary

This is a marketing and lead-generation site for a small team of interactive artists targeting corporate event buyers, public art commissioners, and cultural institutions. The site's entire purpose is to convert a visitor's impressions of the work into an inquiry via the contact form. Research across all four domains converges on a single architectural stance: static site generation (Astro) with a headless CMS (Sanity) for non-technical content management, Vimeo embeds for video, and a serverless contact form handler (Resend). No application server, no user sessions, no dynamic routes — clean static HTML deployed to a CDN. This is not a complex technical problem; the risk is almost entirely on the product and content side.

The recommended approach is to build in order of dependency and business risk. The content model and media pipeline must be locked before any UI work begins, because artist teams routinely deliver assets late and unstructured — a pitfall that causes more launch delays on portfolio sites than any technical issue. The contact form, though simple technically, is the highest-stakes feature on the site and must be treated as such: built and end-to-end tested early, not appended at the end. The gallery, project detail pages, and category filtering are the core value delivery and should be built first among content pages.

The key risk profile for this project is not technical debt — it is content strategy and conversion design. Research strongly flags the risk of building a beautiful gallery that fails to answer a corporate buyer's core question: "Can these people do what I need?" Every phase should be evaluated against the question: "Does this make it easier for a corporate event buyer to find evidence and place an inquiry?" The other high-risk area is media weight: interactive art photography and video will destroy page load times if the media pipeline is not established as an infrastructure concern at project start, not a post-launch cleanup item.

## Key Findings

### Recommended Stack

Astro 5 is the clear framework choice for this project — it is purpose-built for content-heavy, mostly-static sites and ships zero JavaScript by default, which directly supports the fast load times required to make a good first impression with high-resolution media. React is used selectively as Astro islands (gallery lightbox, contact form) rather than as a full page runtime. Sanity v3 provides the visual CMS interface the non-technical artist team requires, with a strong image pipeline for focal-point cropping and WebP delivery that eliminates build-time image processing complexity. Tailwind CSS v4 handles styling with colocated utilities well-suited to responsive portfolio grids. Vercel hosts the static output with automatic preview deploys.

For the contact form specifically: the form is a React island submitting to an Astro API route, validated with Zod, delivered via Resend. This is a thin, proven stack with no operational overhead. Video lives on Vimeo (the industry standard for creative professionals) with only the Vimeo ID stored in Sanity — no video infrastructure required. Analytics via Plausible provides GDPR-compliant traffic data with no cookie banner and minimal script weight.

One open verification item: Tailwind v4 compatibility with the `@astrojs/tailwind` integration should be confirmed at project start. If integration issues exist, Tailwind v3.4.x is a stable fallback.

**Core technologies:**
- **Astro 5**: Static site generation — zero JS by default, optimal for media-heavy portfolio performance
- **React 19 (islands)**: Selective interactivity for gallery and contact form only
- **TypeScript 5**: Type safety across components — high payoff for content schema correctness
- **Sanity v3**: Headless CMS — visual editing interface for non-technical team, strong image pipeline
- **Tailwind CSS v4**: Utility styling — fast iteration for responsive grid layouts (verify Astro integration at start)
- **Resend**: Email delivery for contact form — proven, generous free tier, developer-friendly
- **Vimeo embeds**: Video hosting — industry standard for creative portfolios, zero video infrastructure
- **Vercel**: Hosting with CI/CD — official Astro adapter, automatic preview URLs, global CDN
- **Plausible**: Privacy-first analytics — GDPR-compliant, no cookie banner, ~1KB script

### Expected Features

The site needs three categories of features: table stakes that corporate buyers expect, differentiators that signal craft level, and a clear set of things to omit entirely.

The must-ship core is: project gallery with category filtering (Installations / Public + Outdoor / Corporate Events), project detail pages with their own URLs, team/about page, contact form with confirmation, and press mentions plus client logo strip. These together constitute the minimum viable portfolio for corporate lead generation. Mobile-responsive layout and fast load times are also non-negotiable — more than 50% of B2B research starts on mobile.

Differentiators that are high-value but low-complexity — and should ship alongside core features rather than being deferred — include: a curated featured project on the homepage (not just chronological), rich project narratives written as case studies rather than captions, one strong attributed client testimonial, and a brief process/capabilities section that answers "what is it like to work with you?" These require no additional technical complexity; they are content and copy decisions.

**Must have (table stakes):**
- Project gallery with category filtering (Installations, Public/Outdoor, Corporate Events) — core reason visitors come
- Project detail pages with unique URLs — required for sharing and SEO
- Team/About page — clients hire people; non-optional for bespoke work
- Contact form with confirmation — the only conversion mechanism on the site
- Press mentions + client logo strip — fastest trust signals for corporate buyers
- Mobile-responsive layout — >50% of B2B research starts on mobile
- Fast load times — large media on slow connections kills conversions

**Should have (differentiators):**
- Featured/hero project on homepage — curated impression, not a content dump
- Rich project narratives (case study format) — elevates perceived craft level
- One strong client testimonial — single attributed quote beats paragraphs of self-description
- Process/capabilities section — reduces friction for corporate buyers unfamiliar with commissioning custom work
- Video-first project hero (autoplay muted loop) — interactive work is experiential; video conveys what photos cannot
- Visible project scale indicators — audience size, venue, client industry signals fit to buyers

**Defer (v2+):**
- Subtle motion / ambient interaction — implement after content is stable; motion should serve content
- Inquiry pre-qualification fields beyond basics — add after first inquiries reveal what information is actually missing
- Additional category tags beyond three primary buckets — add only if portfolio grows significantly

**Anti-features (do not build):**
Blog, social feed embeds, online booking widget, e-commerce, client portal, infinite scroll without filtering, entry popups, chatbot. All add complexity and actively harm conversion or brand positioning.

### Architecture Approach

The architecture is a Jamstack static site with no application server. All pages pre-render at build time using structured content from Sanity. Client-side interactivity is limited to gallery category filtering (using data embedded in the page bundle at build) and the contact form (a React island POSTing to an Astro edge function). No runtime database queries, no authenticated routes, no user sessions. Media is served from Sanity's CDN for images and Vimeo for video. This architecture delivers sub-200ms page loads globally from CDN edge, requires no server operations, and costs near zero to host.

**Major components:**
1. **Home Page** — curated first impression: featured project hero, trust signals (client logos, press strip), single CTA
2. **Work Index** — filterable grid of all projects with client-side category tabs; highest-traffic page
3. **Project Detail** — full media gallery (stills + Vimeo embed), case study narrative, credits, category tag; each project has its own URL
4. **About Page** — team bios with headshots; collective statement; links to Contact
5. **Contact Page** — inquiry form (React island) posting to Astro API route; confirmation state
6. **Global Shell** — navigation, footer, SEO head, font/color tokens; wraps all pages
7. **Content Layer (Sanity)** — source of truth for all projects, bios, press, logos; read only at build time
8. **Form Handler (Astro API + Resend)** — receives POST, validates with Zod, delivers email; no other runtime coupling

### Critical Pitfalls

1. **Gallery-not-sales-tool** — Building a beautiful image gallery that fails to answer a corporate buyer's core question. Prevention: every page headline answers a buyer's question; brand logos appear above the fold on the homepage; a CTA appears above the fold on every page; a corporate events section explicitly addresses scale, logistics, and process.

2. **Media weight destroys first impressions** — Raw high-res photography and self-hosted video bloat page weight to 200MB+. Prevention: establish a strict media pipeline at project start (WebP/AVIF, max 200KB thumbnails, max 800KB full-view), use Vimeo embeds exclusively for video, set Lighthouse LCP < 2.5s as a launch gate, test on throttled 4G before every major content push.

3. **Contact form treated as an afterthought** — The site's only conversion mechanism fails silently (spam folder, blank success state, mobile Safari breakage). Prevention: treat the form as the highest-priority feature; test the full flow end-to-end (including spam folder check) before any other page is signed off; deliver to two team email addresses; use a proven service (Resend); add honeypot spam protection.

4. **Project content arrives late or never** — Artists deliver assets in an unorganized Dropbox dump after design is finalized, forcing rework and delaying launch. Prevention: lock a content specification (exactly which projects, which fields, which deadlines) before design begins; designate one content owner; use a structured intake form.

5. **Mobile experience treated as desktop downscale** — Design happens at 1440px; mobile is checked once with "looks fine." Portrait-crop images are missing; tap targets are too small; gallery doesn't reflow. Prevention: design mobile-first at 375px; require portrait crops for all hero images; test on real iOS and Android devices (not just DevTools) as a launch gate.

## Implications for Roadmap

Based on combined research, seven phases are suggested. The ordering strictly follows the dependency graph from ARCHITECTURE.md, front-loads the highest-risk content and infrastructure decisions (per PITFALLS.md), and keeps the contact form as a first-class concern throughout.

### Phase 1: Foundation and Infrastructure

**Rationale:** Every other phase depends on a working project scaffold, content schema, and media pipeline. These decisions are expensive to reverse — locking them first prevents rework. This is also when the CMS decision and team content workflow must be established (PITFALLS.md Pitfall 10: choosing a CMS the team won't use).
**Delivers:** Astro project scaffold with TypeScript, Tailwind, and Vercel adapter configured; Sanity studio initialized with Project, TeamMember, PressItem, and ClientLogo schemas; media pipeline policy documented (WebP/AVIF targets, Vimeo embed policy); 2–3 sample content entries; local dev and preview deploy working.
**Addresses:** Fast load times, media weight concerns (table stakes from FEATURES.md)
**Avoids:** Pitfall 2 (media weight), Pitfall 10 (wrong CMS choice), Anti-Pattern 1 (custom CMS), Anti-Pattern 3 (self-hosted video)

### Phase 2: Content Specification and Asset Collection

**Rationale:** Design and build cannot proceed without real content. This is not a development phase — it is a content gate. PITFALLS.md identifies late content delivery as one of the most common portfolio site launch blockers. Completing this phase before design ensures layouts are built against real word counts, real aspect ratios, and real asset counts.
**Delivers:** Locked list of launch projects (recommended: 8–12), structured intake form or Sanity entries populated with titles/descriptions/categories/credits for each project, all final media assets uploaded and processed, bios written to agreed template, press mentions and client logos finalized.
**Addresses:** Content requirements from FEATURES.md (project gallery, team page, press section, client logos)
**Avoids:** Pitfall 4 (late content), Pitfall 7 (inconsistent bios), Pitfall 8 (dated or small logos)

### Phase 3: Global Shell and Information Architecture

**Rationale:** Navigation, routing, and page structure depend on content schema (Phase 1) and content count (Phase 2). Building the shell after content is known prevents nav redesigns when real content doesn't fit the planned structure. Category labels must map to buyer logic, not artist taxonomy (PITFALLS.md Pitfall 6).
**Delivers:** Global navigation component (desktop + mobile hamburger), footer with contact link, SEO head component (per-page title/meta/OG), font and color token system, URL structure confirmed (`/work/[slug]`), three category labels validated against buyer personas.
**Addresses:** Clear navigation (table stakes), mobile-responsive layout, favicon and basic SEO meta
**Avoids:** Pitfall 5 (mobile-first), Pitfall 6 (buyer-logic categories), Pitfall 11 (SEO basics), Anti-Pattern 4 (single-page scroll with no URLs)

### Phase 4: Work Index and Project Detail Pages

**Rationale:** The gallery is the core product of the site — the highest-value pages for visitors. Built before the homepage so the homepage can pull real featured projects from content already built. Client-side category filtering goes here, not as a separate phase, because it is tightly coupled to the Work Index data model.
**Delivers:** Work Index page with category filter tabs (client-side, data embedded at build), project card components (title, cover image, category badge, year), Project Detail page (full image gallery, Vimeo embed, case study narrative, credits, client), lazy loading on all gallery images, responsive grid layout.
**Addresses:** Project gallery, project detail pages, category navigation, video-first project hero, rich project storytelling, fast load times
**Avoids:** Pitfall 2 (image optimization on gallery), Pitfall 5 (mobile gallery layout), Anti-Pattern 5 (image optimization), Anti-Pattern 4 (per-project URLs)

### Phase 5: Homepage and Trust Signals

**Rationale:** The homepage is built last among content pages because it aggregates content from every other section (featured projects, client logos, press, process section). Building it after Work Index and Project Detail means it can pull real content rather than placeholders.
**Delivers:** Homepage with featured project hero (curated flag in Sanity), client logo strip (above the fold), press mentions row, process/capabilities brief section, single above-fold CTA ("Get in touch"), one client testimonial, category teaser cards linking to Work Index.
**Addresses:** Featured/hero project, press/awards visual treatment, client logo strip, process section, testimonial, single conversion path (CTA on every page)
**Avoids:** Pitfall 1 (gallery-not-sales-tool), Pitfall 3 (trust signals placement), Pitfall 9 (no path from impressed to contacted)

### Phase 6: About Page and Contact Form

**Rationale:** About and Contact can be built in parallel. The contact form is treated as a first-class feature (not post-launch cleanup), with end-to-end delivery testing as a gate before Phase 7. Rationale for pairing these: both are conversion-adjacent pages that benefit from being designed together — the About page should funnel to Contact.
**Delivers:** About page (team grid with headshots, bios to agreed template, collective statement, CTA to Contact), Contact page (React island form with name/email/message/project type, Zod validation, honeypot spam protection, Astro API route, Resend delivery to two team email addresses, human success confirmation message), end-to-end delivery test including spam folder check on a fresh email address.
**Addresses:** Team/About page, contact form with confirmation, inquiry pre-qualification (optional fields), contact confirmation
**Avoids:** Pitfall 3 (contact form as afterthought), Pitfall 7 (bio consistency)

### Phase 7: Polish, QA, and Launch

**Rationale:** Final hardening pass ensures the site meets quality gates before going live. Accessibility, performance, and SEO are consolidated here rather than scattered across phases — but the Lighthouse performance budget and image pipeline (established in Phase 1) prevent this from being a major rework phase.
**Delivers:** Lighthouse performance audit (LCP < 2.5s gate), real-device mobile test on iOS and Android, throttled 4G connection test, axe/Lighthouse accessibility audit with all critical findings resolved, sitemap.xml generated and submitted to Search Console, JSON-LD organization structured data added, all per-page OG images confirmed, Plausible Analytics script added, full contact form delivery re-verified in production environment.
**Addresses:** Accessible color contrast and readable type, favicon and basic SEO meta, mobile-responsive layout final QA
**Avoids:** Pitfall 2 (final performance gate), Pitfall 5 (real-device mobile test), Pitfall 11 (SEO), Pitfall 12 (accessibility)

### Phase Ordering Rationale

- Infrastructure before content before UI: the content schema must be stable before building components against it; the media pipeline must be in place before any assets are processed
- Content specification as a discrete gate: treating content collection as a phase forces it to happen before design, not after — the single most common cause of portfolio site launch delays
- Work Index before Homepage: the homepage aggregates from other pages; it cannot be built meaningfully until those pages have real content
- Contact form elevated to Phase 6 with explicit end-to-end testing gate: the form is the only conversion mechanism; it gets the same attention as any core feature
- Polish as Phase 7, not an afterthought: image optimization and accessibility are enforced throughout via established pipeline and guidelines, so the final QA pass is verification, not remediation

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1 (Foundation):** Verify Tailwind v4 + `@astrojs/tailwind` integration compatibility before committing to v4; have v3.4.x fallback plan ready. Verify current Sanity v3 + Astro integration docs.
- **Phase 6 (Contact Form):** Verify current Resend API (free tier limits, rate limiting behavior, deliverability reputation) and confirm Cloudflare Turnstile or equivalent CAPTCHA approach compatible with Astro API routes.

Phases with standard patterns (skip additional research):
- **Phase 3 (Shell):** Astro routing, SEO head, and Tailwind responsive layout are thoroughly documented standard patterns.
- **Phase 4 (Gallery):** Static gallery with client-side filtering is a well-documented Astro pattern; no novel integration work.
- **Phase 5 (Homepage):** Composing a homepage from CMS-sourced content is the primary Astro use case; no research needed.
- **Phase 7 (Polish):** Lighthouse, axe, and sitemap generation are all standard tooling with stable documentation.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Astro, Sanity, Vercel, Resend, Vimeo are all stable, well-documented choices with strong community consensus as of August 2025. One open item: Tailwind v4 + Astro integration compatibility. |
| Features | MEDIUM | Patterns are well-established for B2B creative services sites. External search unavailable to verify against current live comparables. Recommend reviewing 5–8 comparable studios before finalizing feature priorities. |
| Architecture | HIGH | Static site + headless CMS + serverless form is a thoroughly documented Jamstack pattern. No novel integration choices. Component boundaries and data flow are straightforward. |
| Pitfalls | MEDIUM | Pitfalls drawn from well-established patterns in creative industry web development. All are high-probability, well-documented failure modes. External verification unavailable; second pass with web search recommended when tools are available. |

**Overall confidence:** MEDIUM-HIGH

The technical decisions are HIGH confidence. The product and conversion-design recommendations are MEDIUM confidence — valid and well-reasoned, but would benefit from validation against live comparable studio sites (Moment Factory, teamLab, Refik Anadol Studio, Es Devlin, Local Projects, Potion Design).

### Gaps to Address

- **Tailwind v4 compatibility**: Verify `@astrojs/tailwind` integration support for v4 at project start. If unresolved, default to Tailwind v3.4.x. This is a Phase 1 decision with no downstream cost if resolved early.
- **Content spec before design**: The content specification (which projects, which fields, exact deadlines) must be locked before design mockups are produced. This is a process constraint, not a technical one — flag it explicitly in the Phase 2 milestone.
- **CMS vs. static files decision**: If the team does not intend to self-manage content (likely for v1), flat MDX files in the repo are simpler than Sanity and eliminate the CMS learning curve. This decision should be made in Phase 1 based on a direct conversation with the team about their content management expectations.
- **Spam protection approach**: Resend honeypot alone may be insufficient. Evaluate Cloudflare Turnstile (no fire-hydrant CAPTCHA) as part of Phase 1 stack confirmation.
- **Video delivery verification**: Vimeo embed behavior (autoplay, privacy controls, mobile playback) should be verified against current Vimeo API behavior, as the research is based on training data from August 2025.

## Sources

### Primary (HIGH confidence)
- Training data on Astro 5 documentation and ecosystem — framework choice, island architecture, API routes
- Training data on Sanity v3 documentation — CMS setup, image pipeline, content schemas
- Training data on Vercel + Astro deployment — hosting, edge functions, adapter
- Architecture patterns from Jamstack and static site best practices — well-established, stable patterns

### Secondary (MEDIUM confidence)
- Training data on B2B creative services portfolio sites — feature expectations, conversion patterns, buyer personas
- Community consensus on portfolio site pitfalls — Smashing Magazine, CSS-Tricks, web.dev, creative industry forums
- Comparable studio site patterns — Moment Factory, teamLab, Refik Anadol Studio, Es Devlin (based on training data; live verification recommended)

### Tertiary (LOW confidence — verify before implementation)
- Tailwind v4 + Astro integration compatibility — verify against current official docs
- Current Resend free tier limits and deliverability — verify against current Resend documentation
- Current Vimeo embed API behavior for mobile autoplay — verify against current Vimeo developer docs
- Cloudflare Turnstile availability and Astro integration — verify

---
*Research completed: 2026-03-11*
*Ready for roadmap: yes*
