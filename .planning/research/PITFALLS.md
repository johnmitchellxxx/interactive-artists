# Domain Pitfalls

**Domain:** Interactive artist / creative collective portfolio + marketing website
**Project:** Interactive Artists Team Website
**Researched:** 2026-03-11
**Confidence Note:** External web search and Context7 were unavailable during this research pass. All findings are drawn from training-data knowledge of this domain (cutoff August 2025). Confidence is MEDIUM on well-established patterns, LOW on anything that would require live verification. Flag this file for a second-pass review if web tools become available.

---

## Critical Pitfalls

Mistakes that cause rewrites, lost inquiries, or client-facing embarrassment.

---

### Pitfall 1: Treating the Site as a Gallery, Not a Sales Tool

**What goes wrong:** The site looks stunning in isolation but fails to answer the one question a corporate buyer has: "Can these people do the thing I need?" Visitors get lost in beautiful images with no clear narrative thread — no explanation of what work costs, what scale is feasible, or how hiring actually works. The contact form never rings.

**Why it happens:** Artists naturally optimize for aesthetic self-expression. The corporate-events market (the highest-value segment named in PROJECT.md) is transactional: the buyer is often an event manager or brand team with a brief, a budget range, and a deadline. They need confidence signals fast, not an immersive experience.

**Consequences:** High bounce rate from corporate/event buyers; inquiries skew to low-budget or misaligned clients.

**Prevention:**
- Write every page headline as if answering a corporate buyer's question: "We build large-scale interactive experiences for brand events, public spaces, and corporate environments."
- Include a dedicated "Corporate Events" or "Hire Us" section that explicitly addresses scale, logistics, and process.
- Place a CTA ("Get in touch") above the fold on every page — not just the contact page.
- Show brand logos prominently on the homepage; they do the trust-building work for corporate buyers faster than any copy.

**Detection (warning signs):**
- Drafts of the homepage lead with personal artist statements rather than service descriptions.
- The contact form is only reachable via the nav — not surfaced inline.
- "Press" and "Clients" sections are buried or deprioritized.

**Phase mapping:** Address in the content strategy and information architecture phase before any visual design is finalized.

---

### Pitfall 2: Media Weight Destroys First Impressions

**What goes wrong:** Interactive artists produce high-resolution video and photography — the natural instinct is to feature it prominently, raw and full-quality. The result is a homepage that takes 8–15 seconds to load on a typical connection, especially on mobile. Potential clients who arrived from a search result or an email link bounce before a single image renders.

**Why it happens:** Developers and designers working locally or on fast connections don't feel the pain. Video autoplays with no lazy-loading; images are uploaded at camera resolution (4–8 MB each); no CDN is in place.

**Consequences:** Google Core Web Vitals failures hurt SEO; corporate buyers on corporate networks (which sometimes throttle media) never see the work; mobile experience is unusable.

**Prevention:**
- Establish a strict media pipeline at project start: all images converted to WebP/AVIF, max 200 KB for thumbnails, max 800 KB for full-view. No exceptions for "hero" images.
- Video: use Vimeo or YouTube embeds with poster images, never self-hosted autoplay video files. This offloads bandwidth, CDN, and transcoding.
- Implement `loading="lazy"` on all below-fold images from day one, not as a retrofit.
- Set a Lighthouse performance budget (LCP < 2.5s) before launch and treat failures as blocking.
- Test on a throttled 4G connection before every major content push.

**Detection (warning signs):**
- Team supplies raw files from cameras or Adobe Premiere exports and asks to "just upload them."
- Design comps show hero video backgrounds with no fallback strategy.
- No CDN decision has been made by mid-build.

**Phase mapping:** Media pipeline decisions and tooling must be locked in the infrastructure/foundation phase. Not retroactively fixable without re-processing all assets.

---

### Pitfall 3: Contact Form as an Afterthought

**What goes wrong:** The contact form is the single conversion mechanism for the entire site (per PROJECT.md scope). Yet it is frequently built last, tested minimally, and fails silently — submissions go to a spam folder, the success state is a blank page, or the form breaks on mobile Safari. The team doesn't discover this until weeks after launch.

**Why it happens:** Forms feel like plumbing, not product. They get 20 minutes of effort on a project where the gallery got 20 hours.

**Consequences:** Real inquiries lost permanently (email-based contact means no dashboard to recover missed leads); reputation damage if a referred prospect follows up asking "I tried your contact form."

**Prevention:**
- Treat the contact form as the highest-priority feature, not a post-launch cleanup item.
- Test the full flow — submission → email delivery → spam folder check — before any other page is signed off.
- Use a proven delivery service (Resend, SendGrid, Postmark, Formspree) with delivery receipts — not `mail()` or a generic SMTP credential.
- Add server-side validation, honeypot spam protection, and a CAPTCHA alternative that doesn't require clicking fire hydrants (e.g., Cloudflare Turnstile).
- Send a copy to at least two team member email addresses to avoid a single point of failure.
- Write a clear, human success message. "Your message has been sent. We'll respond within 2 business days." Not "Success: 200 OK."

**Detection (warning signs):**
- Form infrastructure decision is deferred to "figure out later."
- No one has decided which email address(es) receive submissions.
- Form is only smoke-tested from the developer's own email, which is whitelisted.

**Phase mapping:** Form delivery infrastructure must be decided in the stack/foundation phase. End-to-end delivery testing (including spam folder check on a fresh address) must be a launch gate.

---

### Pitfall 4: Project Documentation Arrives Late or Never

**What goes wrong:** The site is built with placeholder content, launching date slips waiting for bios and project descriptions, or the team delivers assets in one giant Dropbox dump with no organization. Development and design stall; launch is delayed weeks.

**Why it happens:** Artists are busy with active projects. Writing about past work feels lower priority. The assumption is "we can add content later" — but "later" becomes never, or arrives so late that it forces rework.

**Consequences:** Launch delays; designers produce layouts that don't fit actual content (a 3-sentence bio when the layout assumed 150 words); launch with half the projects missing and never retrofitted.

**Prevention:**
- Define a content specification before design begins: exactly which projects will be featured (name a number: e.g., 8 projects at launch), what fields each project needs (title, category, 2–3 photos, 1 video URL, 150-word description, client name, year), and a hard deadline for delivery.
- Build the site against real content from day one, or at minimum use Lorem Ipsum with the exact word counts and aspect ratios that the team has committed to.
- Designate one person on the team as the content owner. Not "everyone" — one person.
- Use a simple content intake form (Notion, Airtable, or a shared Google Sheet) to collect structured project data, not email threads.

**Detection (warning signs):**
- Team says "we'll get you the content soon" with no specific date or format agreed.
- Design mockups use stock photography as placeholders.
- No one has discussed which 8–12 projects will be featured at launch.

**Phase mapping:** Content spec and delivery deadline must be locked before design phase begins. Content intake tooling should be set up in the foundation phase.

---

### Pitfall 5: Mobile Experience Treated as Desktop Downscale

**What goes wrong:** Interactive art is photographed and filmed for large formats. The natural design instinct produces landscape-oriented hero images, horizontal scrolling project timelines, and 3-column grids that shrink to unreadable on a phone. Yet many event managers and brand buyers first view a site on mobile (often from a forwarded link during a meeting).

**Why it happens:** Design happens on large monitors. Mobile is checked at the end with a "looks fine" assessment that ignores thumb-reach zones, portrait-format video playback, and image cropping.

**Consequences:** Professional embarrassment if a potential client tries to show the site to a colleague on their phone; lost bookmarks because the mobile experience didn't hold attention.

**Prevention:**
- Design mobile-first. Start with the 375px viewport, not the 1440px one. Promote this constraint explicitly at project kickoff.
- Portrait-crop all key images for mobile display; the hero image that's a wide landscape panorama of an installation needs a separate focal-point crop for mobile.
- Test every page on a real iOS and Android device — not just DevTools responsive mode — before sign-off.
- Ensure tap targets are minimum 44x44px; test the contact form on a real phone keyboard.

**Detection (warning signs):**
- Design deliverables are desktop-only mockups with no mobile variants.
- Hero images are supplied only as wide landscape crops.
- "We'll handle mobile with responsive CSS" is the only mobile plan.

**Phase mapping:** Mobile constraints must be established in design phase. Real-device testing is a launch gate.

---

## Moderate Pitfalls

---

### Pitfall 6: Project Categories That Don't Map to How Buyers Think

**What goes wrong:** Projects are organized by the artists' internal taxonomy ("Series A," "Generative Work," "2022") rather than by the categories that buyers search for ("Corporate Events," "Public Installations," "Outdoor / Temporary Art"). A brand events buyer scanning for "something like what we saw at [brand conference]" can't self-filter.

**Prevention:**
- Use the three categories named in PROJECT.md (installations, public/outdoor, corporate events) as the primary filtering axis.
- Each project card should display its category at a glance — don't require clicking into a project to discover it was a corporate event.
- Secondary metadata (year, client, scale) is useful but should be secondary to type.

**Phase mapping:** Information architecture phase, before any front-end work begins.

---

### Pitfall 7: Individual Artist Profiles That Don't Support Team Credibility

**What goes wrong:** Bios read as solo artist statements ("My practice explores...") rather than as team member introductions. A corporate buyer hiring a team of 2–4 people needs to trust the collective, not evaluate each artist individually. Mismatched bio lengths and inconsistent photo styles make the team look ad hoc.

**Prevention:**
- Establish a bio template: name, role in the collective, background, 2–3 notable projects. Same word count and structure for each member.
- Commission or coordinate headshots in a consistent style (same background, same lighting treatment) rather than using whatever photo each artist prefers.
- Lead bio pages with how each person contributes to client projects, not with gallery solo exhibition history.

**Phase mapping:** Content spec phase (before design) and content delivery gate.

---

### Pitfall 8: Press and Logos Section That Feels Fake or Dated

**What goes wrong:** A "As seen in" or "Clients include" section with logos too small to read, or press mentions from 2018 presented without dates, actively undermines credibility rather than building it. It signals that the team hasn't worked recently.

**Prevention:**
- Show only logos that are recognizable to the target market (corporate events buyers know brand names, not regional newspaper logos).
- Date all press mentions. Prefer the last 3 years; archive older ones.
- If the client list is short, show fewer logos at larger size — a single well-placed Fortune 500 logo beats a grid of 20 tiny obscure logos.

**Phase mapping:** Content spec phase — define exactly which logos and press mentions will be shown before building the section.

---

### Pitfall 9: No Clear Path from "Impressed" to "Contacted"

**What goes wrong:** The site creates a strong impression of the work, then leaves the visitor to figure out how to act on it. The contact page is in the nav but never surfaced contextually — no "Like what you see? Let's talk" prompt after a project gallery, no CTA in the footer, no inline prompt on the team page.

**Prevention:**
- After every major section (project gallery, team page, client logos), include a short contextual CTA that connects what was just seen to the contact form.
- The footer should always include contact info or a link to the contact form — this is a standard pattern corporate buyers rely on.
- The contact form page itself should answer the question "What happens next?" — set expectations for response time.

**Phase mapping:** Information architecture and UX design phases.

---

## Minor Pitfalls

---

### Pitfall 10: Choosing a CMS That the Team Won't Actually Use

**What goes wrong:** A developer-friendly headless CMS (Contentful, Sanity) is selected because it's technically elegant, but the artists find it intimidating and stop updating content after month one. The site goes stale.

**Prevention:**
- If the team will self-manage content, use a CMS with a WYSIWYG interface they can navigate without developer help (Craft CMS, Payload with a clean UI, or even a well-configured Notion-to-static pipeline).
- If the team won't self-manage content (likely for v1 given the static site direction in PROJECT.md), don't build a CMS at all — static files are simpler and won't break.
- Decide upfront: is this a "developer manages all content updates" or "team manages content" site? The answer determines the CMS choice entirely.

**Phase mapping:** Stack decision phase.

---

### Pitfall 11: SEO Basics Ignored on a Static Site

**What goes wrong:** Static sites are fast but often lack structured metadata. Every page gets the same title tag, there are no Open Graph images (so social shares look blank), and no sitemap is submitted. For a portfolio site, SEO is secondary to referral traffic — but brand event buyers do Google "[city] interactive art installation corporate events."

**Prevention:**
- Each project page needs a unique `<title>`, `<meta description>`, and Open Graph image.
- Generate a `sitemap.xml` at build time and submit it to Google Search Console.
- Use semantic HTML (proper heading hierarchy, `<article>`, `<figure>`) — this is free SEO with zero extra tooling.
- Add structured data (JSON-LD) for the organization: name, location, contact. Low effort, moderate SEO benefit.

**Phase mapping:** Build phase — not a launch blocker but a launch gate checklist item.

---

### Pitfall 12: Accessibility as an Afterthought

**What goes wrong:** An arts/portfolio site with heavy media often skips alt text, uses low-contrast text over images, and breaks keyboard navigation. This is both an ethical failure and a risk — corporate clients who require accessibility compliance in vendor materials will notice.

**Prevention:**
- All images require meaningful alt text describing the artwork, not just "photo."
- Videos must have captions if they include spoken content.
- Minimum contrast ratio of 4.5:1 for all body text.
- Run axe or Lighthouse accessibility audit before launch; fix all critical-level findings.

**Phase mapping:** Ongoing during build; audit before launch.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Stack / infrastructure | CMS choice doesn't match team's technical comfort | Decide static vs. managed in the first phase; revisit only if team explicitly requests self-management |
| Content specification | Late or unstructured asset delivery causes launch delay | Lock content spec (fields, counts, deadlines) before design begins |
| Information architecture | Category structure reflects artist logic, not buyer logic | Validate category labels against the corporate events buyer persona |
| Design | Desktop-first layout that degrades on mobile | Mobile-first design constraint; portrait crops for all hero images |
| Media pipeline | Raw high-res assets uploaded directly | Establish WebP/AVIF pipeline and video-embed policy at infrastructure phase |
| Build — contact form | Silent delivery failures, no spam protection | End-to-end delivery test (including spam folder) is a launch gate |
| Build — project pages | Per-page metadata missing or duplicated | Unique title/OG image per page is a launch checklist item |
| Launch / QA | Site tested only on developer's setup | Real-device mobile test and throttled-network test required |

---

## Sources

**Confidence level: MEDIUM** — These pitfalls are drawn from well-established patterns in creative industry web development documented through August 2025. External web search was unavailable during this research pass. The pitfalls described are consistent with publicly documented post-mortems, agency retrospectives, and community discussions on:

- Smashing Magazine (portfolio site performance, CMS selection anti-patterns)
- CSS-Tricks / web.dev (Core Web Vitals, lazy loading, WebP adoption)
- General UX literature on B2B service site conversion (corporate buyer decision patterns)
- Recurring community discussion in creative industry forums (Are.na, Dribbble community posts, Sidebar.io) on portfolio conversion failures

**Recommendation:** Run a second-pass verification with web search tools when available to confirm the media pipeline recommendations (WebP/AVIF adoption rates, Vimeo embed behavior) and form delivery service options reflect current 2026 ecosystem state.
