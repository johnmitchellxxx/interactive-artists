# Feature Landscape

**Domain:** Interactive artist collective / creative agency portfolio site (lead generation)
**Researched:** 2026-03-11
**Confidence note:** Web search and external tools were unavailable during this research session. All findings are drawn from training data on this domain (creative agency, artist portfolio, and B2B marketing websites). Confidence is MEDIUM overall — the patterns are well-established and stable, but phase-specific validation against live comparable sites is recommended before finalizing.

---

## Table Stakes

Features users expect from a professional creative services site. Missing any of these and the visitor loses trust or can't complete the conversion action.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Project/work gallery | Core reason visitors come — they want to see work before hiring | Medium | Must support photo + video. Needs filtering by category (installations, public art, corporate events). Lazy loading is required for performance. |
| Project detail pages | Single project view with full story: concept, process, outcome, media | Medium | Each project needs its own URL for sharing and SEO. Title, description, rich media (stills + video), credits. |
| Category / work-type navigation | Corporate clients scan by "events" not "all work" | Low | Three buckets match the collective's actual work: Installations, Public/Outdoor Art, Corporate Events. |
| Team / About page | Clients hiring bespoke creative work want to know who they're hiring | Low | Headshots, names, individual bios, and a collective statement. 2–4 artists means this is compact but non-optional. |
| Contact form | Primary conversion action for the whole site | Low | Name, email, message minimum. Optional: project type selector. Must deliver email reliably. Spam protection required. |
| Contact confirmation / thank-you | Users need to know the form worked | Low | Inline success state or redirect to confirmation page. Sets expectation on response time. |
| Press / media mentions | Social proof; corporate clients especially want this | Low | List of publication names + article titles + dates. Links optional but preferred. |
| Client / brand logo strip | Fastest trust signal for corporate prospects | Low | Logos of recognizable brands/orgs they've worked with. Alt text for accessibility. |
| Mobile-responsive layout | >50% of B2B research starts on mobile; corporate decision-makers use phones | Medium | Full layout reflow required — gallery, video, forms all must work on small screens. |
| Fast load times | Large media (video, hi-res photos) on slow connections kills conversions | Medium | Requires image optimization, lazy loading, video hosted on CDN (Vimeo/YouTube embed vs self-host). |
| Clear navigation | Visitors must find Work, About, and Contact in under 3 seconds | Low | Simple top nav or hamburger on mobile. Max 5–6 nav items. |
| Favicon and basic SEO meta | Signals professionalism; affects discoverability | Low | Title tags, meta descriptions, OG image for social sharing. Not a full SEO campaign — just baseline hygiene. |
| Accessible color contrast and readable type | Legal exposure and professional expectation | Low | WCAG AA contrast minimum. Body text at readable sizes. |

---

## Differentiators

Features that set the site apart from generic portfolio templates and signal that this collective is at the craft level corporate clients want to pay for. These are not expected but create a strong impression.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Rich project storytelling | "Behind the work" narrative (brief, challenge, approach, outcome) elevates perceived craft | Low–Medium | A 3–5 sentence project narrative with labeled sections makes the portfolio feel like case studies, not just a gallery. Particularly effective for corporate clients. |
| Video-first project hero | Interactive/installation work is experiential — video conveys what photos cannot | Medium | Autoplay muted loop for hero/featured project. Must degrade gracefully on slow connections. |
| Visible project scale indicators | Corporate clients need to know if this collective can handle their budget/scope | Low | Include audience size, venue scale, or client industry where possible. Doesn't need to be a formal spec sheet — a line of context is enough. |
| Work categorized by client type, not just medium | "We've done this for a Fortune 500 company" lands differently than "we do corporate events" | Low | Tags or badges like "Brand Activation," "Public Commission," "Museum Installation" signal fit to different buyers. |
| Subtle motion / ambient interaction | The site itself demonstrates that the team understands interactivity | Medium–High | Parallax, entrance animations, or cursor-reactive elements signal craft without overwhelming content. Must be tasteful — not a distraction. |
| Featured / hero project spotlight | Surface the most impressive or relevant work at the top rather than chronological defaults | Low | Manually curated "featured" flag on 1–3 projects shown on homepage. Avoids burying the best work. |
| Process or capabilities section | Answers "what is it like to work with you?" before the first call | Low | A brief section (not a full page) covering how the collective takes a brief, what a typical engagement looks like, and what they need from a client. Reduces friction for corporate buyers who aren't used to commissioning custom work. |
| Inquiry pre-qualification in the contact form | Helps the team avoid irrelevant inquiries and sets expectations with serious prospects | Low | Optional fields: project type (dropdown), approximate timeline, how they heard about the team. Not required — just helpful. |
| Press/awards section with visual treatment | A logoed press row reads better than a text list | Low | Logo + publication name + headline snippet. One row of recognizable names (even 3–4) builds credibility fast. |
| Social proof quote or testimonial | One powerful client quote beats a paragraph of self-description | Low | A single attributed quote from a recognizable client/brand. Keep it minimal — 1–2 is better than a carousel of 10. |

---

## Anti-Features

Features commonly found on creative websites that actively harm this collective's goals, or add complexity without proportionate value.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Blog / news feed | Adds ongoing content burden with no clear conversion path; most artist blogs go stale and read as neglected | Add "press" section with external coverage — earns the same trust signal with zero writing overhead |
| Social media feed embed | Live feeds go stale, break, or show off-brand content; they're a distraction from conversion | Link to social profiles from footer — don't embed |
| Online booking / scheduling widget | Bespoke commissioned work requires a conversation, not a calendar slot; premature booking signals commodity service | Contact form inquiry is the right first step; scheduling can happen over email |
| E-commerce / print shop | Not the business model; adds complexity and payment infrastructure | Out of scope entirely |
| Client login / portal | Unnecessary complexity for a 2–4 person team; project management belongs in a dedicated tool | Use project management tools (Notion, Linear, email) for in-flight clients |
| Visitor counter or "projects completed" ticker | Feels dated and gimmicky; corporate clients don't find this credible | Let the client logos and press coverage do the trust work |
| Overly complex animation framework | Heavy motion libraries (GSAP ScrollTrigger gone wild, Three.js scenes) that slow page load and distract from work | Use tasteful, performant transitions; the work itself should be the spectacle |
| Chatbot / live chat widget | Adds noise to a minimal site; corporate inquiries don't happen in real time | Contact form with clear response time expectation is cleaner |
| Infinite scroll gallery without filtering | Dumps all projects on one page; corporate clients can't self-select relevant work | Category-filtered grid or tab navigation |
| Popup/modal on entry | Interrupts first impression before the user has seen anything; hostile to the creative professional brand | No popups. Ever. |

---

## Feature Dependencies

```
Project gallery → Project detail pages (gallery cards link to detail)
Project detail pages → Category filtering (details carry category tags)
Category filtering → Homepage featured projects (featured = curated subset of gallery)
Contact form → Contact confirmation (form needs a post-submit state)
Press section → Client logo strip (both live in a trust/credibility zone — design together)
Team bios → About page (bios are a section of About, not a separate page)
Video-first hero → Fast load / CDN strategy (video embeds must use hosted CDN, not self-hosted)
Process/capabilities section → Contact form (capabilities section primes the user before they fill out the form)
```

---

## MVP Recommendation

### Must ship for launch

1. **Project gallery with category filtering** — the core product of the site; without this there is nothing to show
2. **Project detail pages** — required for sharing work by URL and telling the full story
3. **Team / About page** — clients hire people; this is non-negotiable for bespoke work
4. **Contact form with confirmation** — the entire conversion purpose of the site
5. **Press mentions + client logo strip** — fastest trust signals; likely single section on homepage
6. **Mobile-responsive layout + fast load** — table stakes for professional credibility

### Ship next (high value, low complexity)

7. **Featured/hero project on homepage** — makes the homepage a curated impression, not a dump
8. **Rich project narratives** — upgrading gallery captions to case-study-style descriptions; transforms a gallery into a portfolio
9. **One strong testimonial** — single attributed quote from a recognizable client
10. **Process/capabilities brief section** — reduces friction for corporate buyers unfamiliar with commissioning

### Defer

| Feature | Reason to Defer |
|---------|-----------------|
| Subtle motion / ambient interaction | Implement after content is stable; motion should serve content, not paper over incomplete content |
| Inquiry pre-qualification fields | Contact form works without them; add after first 10–20 inquiries reveal what info is actually missing |
| Work categorized by client type (tags beyond 3 buckets) | Start with 3 categories from PROJECT.md; add tags if the portfolio grows or client segments diverge |

---

## Sources

**Note:** External web search was unavailable during this research session. Findings are based on:
- Training data on creative agency portfolio sites, B2B marketing patterns, and artist collective websites (MEDIUM confidence — stable domain, well-established patterns)
- PROJECT.md requirements and constraints (HIGH confidence — first-party)

Recommended validation: Review 5–8 live comparable sites (e.g., Moment Factory, teamLab, Refik Anadol Studio, Es Devlin, Local Projects, Potion Design) before finalizing feature priorities. Corporate-facing interactive studios at varying scales represent the clearest comparables for this collective's positioning.
