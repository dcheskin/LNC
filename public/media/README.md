# Site media — drop files here

Upload a file with one of these names and it replaces the placeholder on the
site automatically (live about 2 minutes after the upload).

| File name            | Where it shows                              | Tips                                   |
|----------------------|---------------------------------------------|----------------------------------------|
| `hero.mp4`           | Home page, full-screen behind the headline  | 10–20 s loop, no sound needed          |
| `film.mp4`           | Home page, "Every build, on film" band      | 10–15 s montage                        |
| `customization.mp4`  | Customization page, top film                | 20–30 s                                |

Optional: `hero-portrait.mp4` (any slot name + `-portrait`) is a vertical cut
shown on phones held upright; everything else gets the landscape file.

Optional: a still image with the same name (`hero.jpg`, `film.jpg`, …) is shown
while the video loads.

## Case photos (before / after)

Each case on the site has a folder in `cases/`, named after it. Put two photos
in it, `before.jpg` and `after.jpg` — same angle, same light — and the
before/after slider for that case shows them (Builds page, the case's own page,
Accident Repair page). `after.jpg` is also the case's cover on the Builds grid.

| Folder                          | Case                       |
|---------------------------------|----------------------------|
| `cases/aston-martin-collision/` | Aston Martin               |
| `cases/ford-raptor-r/`          | Ford F-150 Raptor R        |
| `cases/porsche-718/`            | Porsche 718                |
| `cases/bmw-m235i/`              | BMW M235i                  |
| `cases/mercedes-s63-coupe/`     | Mercedes-AMG S63 Coupe     |
| `cases/exotic-widebody/`        | Next signature build       |

New case: add it to `src/data/builds.ts` (the `slug` is the folder name).
Photos: JPG or WebP, about 2000 px wide, under 1 MB each.

**Format:** MP4 (H.264), 1920×1080 or smaller, ideally under 15 MB.
iPhone `.mov` files in HEVC won't play in every browser — export as MP4.

**How to upload:** on github.com open this folder (`public/media`) →
**Add file → Upload files** → drag the video in → **Commit changes**.
GitHub's web upload takes files up to 25 MB (100 MB is the hard limit).
