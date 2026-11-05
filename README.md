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
src/data/builds.ts      builds + their photos → /builds and /builds/[slug]
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
- Before/after cases ("What we did" on /builds, plus the home and /accident-repair sliders): add an entry to `src/data/cases.ts` and drop `public/media/cases/<slug>-before.jpg` + `-after.jpg`, shot from the same spot and angle, aligned and cropped to the same 2:1 frame. Strip EXIF/GPS before committing phone photos.
- Builds (/builds, build pages, home "Hall of fame", /customization): each entry in `src/data/builds.ts` lists its photos in story order (Before → During → After) plus which one is the card `cover` and the page `hero`. Photos live in `public/media/builds/<slug>/NN.jpg` — resize to ~2000px, strip EXIF/GPS and blur readable plates first. Then run `python3 scripts/subjects.py` (needs `pip install "rembg[cpu]" opencv-python-headless`): it cuts out the car/person and writes the soft-focus layers and subject boxes used by `<SubjectPhoto>` (sharp car, blurred surroundings until hover/tap; crops are framed so the car is never cut).
- Scroll-scrubbed footage (Forge-style): `<video data-scrub src="…" muted playsinline preload="auto">` — scrubs with scroll automatically.
- Put files in `public/media/`. Export video H.264 MP4, ≤ 8 MB for the hero.

## Contact form
"Send request" on Get a Quote emails the request to ben@lnccollision.com with the photos attached. The page sends it in the background (no page change, usually 2–4 s) to a small Google Apps Script web app that runs under your Google account: free, and on Google's servers. Photos are shrunk in the browser first (≈1600 px JPEG) so uploads are quick on a phone.

One-time setup (≈3 minutes) — the code and steps are in `apps-script/quote-mailer.gs`:
1. https://script.google.com → **New project** → paste the file → Save.
2. **Deploy → New deployment →** type **Web app**; Execute as **Me**, Who has access **Anyone** → Deploy → Authorize.
3. Put the Web app URL (`https://script.google.com/macros/s/…/exec`) in `src/data/site.ts` → `quoteEndpoint` (or the `PUBLIC_FORM_ENDPOINT` repo secret) and redeploy.

Until that URL is set, the form asks visitors to call or text.

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
