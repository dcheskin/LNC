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

## Hosting (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes the site on every push, once a day (fresh Yelp data) and on demand (Actions → Deploy site → Run workflow).

- One-time: Settings → Pages → Source: **GitHub Actions**. Pages on a private repo needs a paid GitHub plan; otherwise make the repo public.
- Live at `https://<user>.github.io/<repo>/` until a custom domain is added (Settings → Pages → Custom domain, e.g. `lncautogroup.com`, plus the DNS records GitHub lists).
- `scripts/relativize.mjs` makes every link relative after the build, so the same output works on the Pages sub-path and on a custom domain.
- Secrets (Settings → Secrets and variables → Actions): `YELP_API_KEY`, `PUBLIC_FORM_ENDPOINT`.

## Live Yelp numbers & reviews

`src/lib/yelp.ts` pulls the Yelp rating, review count and the 3 newest reviews at build time through the [Yelp Fusion API](https://docs.developer.yelp.com/docs/fusion-intro). Every page that shows Yelp figures (home hero strip, the big review counter, reviews section, /reviews) reads from it.

1. Create a Yelp Fusion app and copy its API key (Yelp's plans are paid after the free trial; a daily rebuild uses ~60 calls a month).
2. For local builds, put it in `.env` (see `.env.example`). Never expose it as `PUBLIC_`.
3. Save the key as the GitHub repository secret `YELP_API_KEY`. The deploy workflow rebuilds the site every morning, so the numbers update on their own.

Without a key the site uses the figures in `src/data/site.ts` (last checked 22 Oct 2026: 5.0 ★, 202 reviews) and the hand-picked reviews. Yelp's API returns review excerpts (not full text); each card links to the full review on Yelp.

## Before launch (CONFIRM list)
- Saturday hours, team names/roles (About), build summaries, "450K+ YouTube" figure.
- Real media for every slot; insurer names if listed.
- 301 redirects: lnccollision.com and lncmotorsport.com → lncautogroup.com.
- lncmotorsport.com currently has injected spam links (hacked WordPress) — clean it or take it down.
