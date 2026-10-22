# LNC Auto Group — Website Plan (draft v1)

Status: **v1 built** (see README.md to run it). Decisions below supersede the proposal where they differ.

## 0. Decisions (22 Oct 2026)
| # | Question | Answer |
|---|---|---|
| 1 | Division name | **Accident Repair** (+ Customization) |
| 2 | Light vs dark | Light pages, dark hero/film/footer |
| 3 | Logo | New silver LNC AUTO GROUP mark is final. Asked for "3D / juicy", then revised: **keep it clean (Singer-style), no cheap 3D** → flat monochrome vector, traced from the render |
| 4 | Claims | "OEM-level" (not "OEM-certified"). **Drop "10,000 families"** |
| 5 | Merch | Placeholder ("LNC Supply — first drop coming soon") |
| 6 | Media | Leave labelled slots with art direction for each photo/video |
| 7 | Domain | LNCAutoGroup.com — yes |
| — | Look & motion refs | Layout: Boden Autohaus · Restraint/type: Singer · Motion: Forge Automotive (smooth scroll, preloader, line reveals, pinned 01/03 sequence, horizontal build rail, scroll-scrub-ready video) |


---

## 1. What we're working from

**Obsidian "Canvas 1" (owner's direction)**
- Master brand: **LNC AUTO GROUP** (domain idea: LNCAutoGroup.com; keep lnccollision.com + lncmotorsport.com redirecting so SEO isn't lost).
- Two divisions on the owner's handwritten sheet: **Collision | Customization**. "Performance" is crossed out. A sticky note says **"Auto Repair instead of collision"**, and the green note next to Collision looks like "Car Accident". So the label for division #1 is still open (see Q1).
- Proof points the owner wrote down: Family owned & operated · 5-star reputation · All insurances accepted · OEM-level repairs & undetectable paintwork · "Show it loud": photos, YouTube, reviews · "10,000 families served".
- Brand guidance in the canvas notes: modernize, don't replace. Keep the teal + deep blue + red DNA, but simpler, with black / charcoal / white / brushed silver around it. Merch should feel like a lifestyle label, not body-shop swag.
- Reference mockup (AI render): dark, serif "DRIVEN BY EXCELLENCE / EST. MMXII", cross ornament, 3 service tiles, Featured Builds, About, icon strip, "Quality over quantity. Do it once. Do it right."
- New silver "LNC / AUTO GROUP" logo render.

**Customer's style reference: Boden Autohaus (Irvine)**. Their homepage is light and clean: a full-bleed driving video hero, a thin nav over the video, lots of white space, rounded image cards, very wide, heavy display type, a featured builds carousel, a merch strip, 3 review cards and a minimal centered footer. The color accent is used in very few places.

**Facts from lncmotorsport.com, lnccollision.com and socials (verified 22 Oct 2026)**
| Item | Value |
|---|---|
| Legal / DBA | Laguna Niguel Collision (LNC) — "LNC Collision & Car Customization" |
| Founded | 2012 (LinkedIn) → matches "EST. MMXII" |
| Address | 27622 Camino Capistrano, Suite D, Laguna Niguel, CA 92677 |
| Phone (call/text) | (949) 367-1080 |
| Email | ben@lnccollision.com |
| Hours | Mon–Fri 8:00–5:30 · Sat: sources disagree (see Q7) |
| People | Ben (estimates / customer contact), Dmitriy Solovyev (co-owner), Vlad (YouTube "LNC Motorsport") |
| Reviews | Yelp **5.0 ★ (186)**, Google **4.8 ★ (~131)** |
| Social | IG @lnc_oc, IG @lncmotorsport, FB /LNCOC (2.5K), YouTube "LNC Motorsport" (IG bio says 450K+) |
| Positioning copy | "Accidents happen, but don't accidentally choose the wrong shop." · "Not a volume production / 'preferred' shop, not part of any DRP network" · "We work for YOU, not the insurance company" · "You get to choose your body shop (CA law)" |
| IG bio claims | Exotic collision & customization · OEM-level repairs & undetectable paintwork · Nationwide transport · All insurance claims accepted · We handle towing |
| Service list (LinkedIn) | Collision, auto body, custom paint, PPG-certified paint, aluminum & frame repair, dent removal, conversions, wide-body, body kits, fender flares, wheels/tires, suspension, exhaust, tint, windshield, mechanical/engine/transmission, service & maintenance |
| Merch (current WooCommerce) | Hats, tees ("What happen, nothing happen"), beanie, plate frames, S63 grille |

> ⚠️ **lncmotorsport.com has been hacked.** Its footer contains injected casino/betting spam links (Russian and Turkish). This hurts SEO and trust right now. Fix or take it down whether or not the new site ships.

---

## 2. Design direction (proposal)

**Structure from Boden, details from LNC.** The canvas mockup's dark, serif, "global luxury" look is a starting point, but the customer asked for Boden-clean. I'd merge the two:

- **Mostly light.** Pages are white / off-white (#F5F5F3) with plenty of space. The hero video, a "Featured Build" band and the footer are full-bleed and near-black (#0B0B0C), so the site still feels premium. *(Alternative: all-dark like the mockup. See Q2.)*
- **Type.** A wide, heavy grotesk for headlines (Boden energy, matches the logo's speed lines), set in uppercase with tight tracking and used sparingly. A neutral grotesk for body text. No serif, no ornaments.
- **Color.** Mostly neutral: black, white and brushed silver from the new logo. The OG LNC teal / deep blue / red appear only as a thin 3-stripe signature (as in the mockup's footer logo) and on one accent color for CTAs.
- **Imagery is the hero.** Real LNC builds and repairs, shot well. Before/after sliders on collision work make the "undetectable paintwork" claim visible. Avoid stock exotics and AI renders on the live site.
- **Two clear doors.** The hero splits into **Collision** (calm, reassuring, insurance-first) and **Customization** (bold, build-driven). Someone with a crashed Camry and someone wanting a wide-body Huracán both feel at home.
- **Motion.** Subtle: hero video, fade/slide reveals, image hover zoom. Respects reduced-motion settings.

Note: the `design-taste-frontend` skill you mentioned **isn't installed in this session** (I searched the skills directories). I'll apply the same principles directly. If it lives in another environment, add it to the repo under `.claude/skills/` and I'll follow it exactly.

---

## 3. Sitemap & page content

```
/                     Home
/collision            Accident & Collision Repair  (name TBD, Q1)
/collision/insurance  Insurance claims: how it works
/customization        Customization & Builds
/builds               Featured Builds gallery (filter: Collision / Custom / Make)
/builds/[slug]        Single build: story, before/after, specs, video
/about                Family story, est. 2012, team, the shop
/reviews              Yelp + Google highlights
/shop                 Merch (link out or embedded, Q6)
/contact              Get a Quote / Start a Claim
/faq                  FAQ
(phase 2) /areas/*    Local SEO pages: Laguna Niguel, Laguna Beach, Newport, Dana Point, Mission Viejo, San Clemente…
```

**Home (top → bottom)**
1. Nav: logo · Collision · Customization · Builds · About · Shop · **Get a Quote** (+ click-to-call/text on mobile)
2. Hero: full-bleed muted video of LNC work. Headline (e.g. *"Do it once. Do it right."*) and two CTAs: **Start a Claim** / **Plan a Build**
3. Trust bar: ★ 5.0 Yelp (186) · ★ 4.8 Google · Family owned since 2012 · All insurance accepted · Nationwide transport
4. Two division cards: Collision / Customization (image, 1-line promise, link)
5. Featured Builds carousel (Boden-style rounded cards)
6. Before/After slider: proof of "undetectable paintwork"
7. "Your car, your choice" insurance explainer (CA law, not a DRP shop, we deal with the adjuster), 3 steps
8. YouTube band: latest video plus subscriber count
9. Reviews: 3 cards with real quotes and names
10. Merch strip: 3–4 products, "lifestyle label" photography
11. Visit: map, hours, address, call/text
12. Footer: logo, divisions, socials, legal

**Contact / quote form:** name, phone, email, preferred contact (call/text/email), service type (collision/customization/other), vehicle year/make/model, insurance carrier + claim # (optional), photo upload (up to 10), message. Sends email to Ben (and SMS alert, Q8).

---

## 4. Tech proposal

- **Astro + Tailwind** (static, very fast, strong SEO, easy to host). Small islands of JS only for the carousel, before/after slider and form.
- **Content as files** (Markdown/JSON per build) to start. Add a headless CMS (Sanity or Decap) in phase 2 if the shop wants to post builds without a developer.
- **Hosting:** Vercel or Netlify (free/low tier is enough). DNS moves to point LNCAutoGroup.com at it, with 301 redirects from both old domains.
- **Forms:** Formspree/Resend + Cloudflare Turnstile spam protection, photo uploads to storage.
- **SEO:** LocalBusiness / AutoBodyShop schema, per-page meta, sitemap, Open Graph images, Google Business Profile link-up.
- **Analytics:** Plausible or GA4, with call/text/form conversion events.

---

## 5. Estimate

Build time assumes the content in §6 arrives on time. **Getting real photos and video is the critical path, not code.**

| Phase | Work | Effort |
|---|---|---|
| 0. Discovery | Answer §6, gather assets, domain/DNS access, review links | Owner: ~1 wk calendar |
| 1. Design system + Home | Tokens, type, components, full homepage in code (desktop + mobile), review round | 1.5–2 days |
| 2. Inner pages | Collision, Insurance, Customization, Builds index + template, About, Reviews, FAQ, Contact | 2–2.5 days |
| 3. Function | Quote form + uploads, carousel, before/after, YouTube embed, map, merch link-up | 1 day |
| 4. SEO & launch | Schema, meta, sitemap, analytics, redirects, perf/a11y pass (Lighthouse 90+), go-live | 1 day |
| **Total build** | | **~6–7 working days** (~45–55 hrs) |
| Optional | CMS for builds (+1 day) · local SEO area pages (+1 day) · Shopify merch store (+1–2 days) · clean up the hacked WP site (+0.5 day) | |

**Realistic calendar: 2–3 weeks** from answers to launch, mostly waiting on content and feedback.

---

## 6. Questions to answer before building

**Brand & positioning**
1. **Division name:** "Collision", "Accident Repair" or "Auto Repair"? The sticky note says "Auto Repair instead of collision". Do they also do general mechanical/maintenance, or only accident work?
2. **Light (Boden) or dark (mockup)?** My recommendation: light pages with dark hero and footer.
3. Is the new silver **LNC AUTO GROUP logo final**? We'll need vector files (SVG/AI). Is the OG teal/blue/red stripe still part of the brand?
4. **Tagline:** keep "Accidents happen, but don't accidentally choose the wrong shop", switch to "Do it once. Do it right." or use both (one per division)?
5. **Claims we must be able to back up:** "10,000 families served", "OEM-certified" (which OEMs?), PPG certified, "nationwide transport", "European team". The mockup also showed Los Angeles / New York / London / Dubai / Tokyo and a cross ornament. I'll leave out anything not confirmed.

**Scope**
6. **Merch:** keep selling? Options: (a) link to a separate Shopify store, (b) Shopify Buy Buttons embedded, (c) "coming soon / drop" page. And WooCommerce on lncmotorsport.com: retire it?
7. **Saturday hours:** "by appointment", 9–12, or closed? (Sources disagree.) And is the **Laguna Canyon Rd, Laguna Beach** address on LinkedIn still active?
8. Where should quote requests go: email only (ben@), SMS too, or into a CRM/shop-management tool they already use?
9. Do they want online booking, or is "request a quote, we call/text you back" enough?
10. English only, or also Spanish / Russian?

**Content (the critical path)**
11. **Photos/video:** can they share the raw files behind the YouTube/IG content? We need ~1 hero video clip (10–20 s, horizontal), 8–12 featured builds (3–6 photos each), 4–6 before/after pairs, shop/team photos.
12. Which **builds** to feature first? List make/model plus one line on what was done.
13. **Team:** who appears on About (Ben, Dmitriy, Vlad…), with photos and a short family story?
14. **Insurance carriers** to name (logos need care, text names are safer)?

**Access**
15. Is **LNCAutoGroup.com** owned or available? Who controls DNS for lnccollision.com and lncmotorsport.com?
16. Is the Google Business Profile and Yelp access with the owner (for linking reviews and fixing hours)?

---

## 7. Next step

Once §6 is answered (even partly), I'll start Phase 1 and push the homepage to this branch with a live preview. Missing photos get labeled placeholders, which are swapped out before launch.
