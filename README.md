# LNC Auto Group — website

Astro + Tailwind v4 static site. Motion: GSAP (ScrollTrigger, SplitText) + Lenis.
Planning notes and decisions: [PLAN.md](PLAN.md).

## Run
```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
```
Node 22.12+ (Astro 6). `vite` is pinned via `overrides` so Tailwind and Astro share one Vite.

## Structure
```
src/data/site.ts        business facts (NAP, hours, ratings, reviews, FAQ) — single source of truth
src/data/builds.ts      builds list → /builds and /builds/[slug]
src/components/         Header, Footer, Logo (flat vector), MediaSlot, BeforeAfter, PageHero, …
src/scripts/motion.ts   all scroll/intro animation (respects prefers-reduced-motion)
src/pages/              routes
public/logo/            logo SVGs (traced from assets-src/logo-silver.png)
```

## Dropping in real photos & video
Every grey/black "Photo slot" / "Video slot" is a `<MediaSlot>` with the shot it needs written on it.
Replace it with media of the same aspect ratio, e.g.

```astro
<!-- before -->
<MediaSlot kind="video" tone="dark" label="Hero film · 15–20s loop" />
<!-- after -->
<video src="/media/hero.mp4" autoplay muted loop playsinline class="size-full object-cover"></video>
```
- Before/after: `<BeforeAfter before="/media/x-before.jpg" after="/media/x-after.jpg" />`
- Scroll-scrubbed footage (Forge-style): `<video data-scrub src="…" muted playsinline preload="auto">` — scrubs with scroll automatically.
- Put files in `public/media/`. Export video H.264 MP4, ≤ 8 MB for the hero.

## Contact form
Set `PUBLIC_FORM_ENDPOINT` (e.g. a Formspree form URL) in `.env`. Without it the form validates and tells visitors to call/text.

## Before launch (CONFIRM list)
- Saturday hours, team names/roles (About), build summaries, "450K+ YouTube" figure.
- Real media for every slot; insurer names if listed.
- 301 redirects: lnccollision.com and lncmotorsport.com → lncautogroup.com.
- lncmotorsport.com currently has injected spam links (hacked WordPress) — clean it or take it down.
