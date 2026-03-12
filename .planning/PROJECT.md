# Interactive Artists Team Website

## What This Is

A marketing and portfolio website for a small collective of 2–4 interactive artists. It showcases their work in installations, public/outdoor art, and corporate events, and converts visitors into clients via a contact form.

## Core Value

Potential clients should immediately understand who we are, be impressed by our work, and know how to hire us.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Visitors can browse past projects (photos/videos) organized by type
- [ ] Visitors can learn about each team member via individual bios and headshots
- [ ] Visitors can contact the team via an email contact form to inquire about hiring
- [ ] Visitors can view press mentions and client/brand logos to build trust
- [ ] Work spans installations, public/outdoor pieces, and corporate events

### Out of Scope

- Online booking/scheduling — contact form is sufficient for v1
- E-commerce / print sales — not the business model
- Blog / news feed — not mentioned as a priority

## Context

- Small team (2–4 artists), so individual profiles matter
- Corporate events is a key market alongside gallery/public work
- Strong content assets available: photos/videos, bios, press, client logos
- Primary conversion action: get a visitor to send a contact form inquiry

## Constraints

- **Content**: Team will supply photos, videos, bios, press clippings, and client logos
- **Contact**: Email-based inquiry (no booking system needed)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Contact form over booking link | Keeps v1 simple; bespoke work benefits from a conversation first | — Pending |
| Static site (likely) | Portfolio site with no dynamic data needs; fast and cheap to host | — Pending |
| Tailwind v4 via @tailwindcss/vite | @astrojs/tailwind is officially deprecated for Tailwind v4; v4 Vite plugin is the current approach per official Astro docs (confirmed 2026-03-11) | Confirmed — using Tailwind v4 |
| Sanity v3 (not MDX) | Team manages images and structured content (Project, TeamMember, PressItem, ClientLogo) edited by non-developers; MDX is code-first and not appropriate for this content model | Confirmed — using Sanity v3 |
| Static output (no @astrojs/vercel adapter) | Portfolio site has no dynamic data needs; static builds are faster, cheaper, and score higher on Lighthouse; Vercel auto-detects Astro static output | Confirmed — static output |
| Embedded Sanity Studio at /studio | One deploy, one repo; simpler for small teams vs. separate Sanity project deploy | Confirmed — embedded Studio |

---
*Last updated: 2026-03-12 after Phase 1 Plan 01 scaffold*
