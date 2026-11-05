"""Build the layers <SubjectPhoto> needs for each photo in public/media.

For every photo: <name>-fg.webp (car/person cut out, transparent elsewhere),
<name>-blur.jpg (soft-focus copy shown until hover) and the subject's bounding
box in src/data/photo-meta.json (used to frame crops so the car is never cut).
Photos listed in DEPTH also get <name>-bg.jpg / <name>-bg-blur.jpg with the
subject painted out, so the cutout can move over it on hover.

Needs: pip install "rembg[cpu]" opencv-python-headless pillow
Run:   python3 scripts/subjects.py   (from the repo root; ~10 s per photo)
"""
import glob, json, os, sys
import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

PUB = 'public'
PHOTOS = sorted(glob.glob(f'{PUB}/media/builds/*/[0-9][0-9].jpg')) + [
    f'{PUB}/media/team/family.jpg',
    f'{PUB}/media/cases/mercedes-s63-silver-before.jpg',
    f'{PUB}/media/cases/mercedes-s63-silver-after.jpg',
]
DEPTH = {f'{PUB}/media/team/family.jpg'}
# Shots with no single car/person to isolate (e.g. an interior): shown plain.
PLAIN = {f'{PUB}/media/builds/porsche-911-gt3/03.jpg'}
META = 'src/data/photo-meta.json'
only = set(sys.argv[1:])

meta = json.load(open(META)) if os.path.exists(META) else {}
session = new_session('birefnet-general-lite')

def blurred(im):
    small = im.copy(); small.thumbnail((960, 960))
    return small.filter(ImageFilter.GaussianBlur(small.width / 90))

for path in PHOTOS:
    key = path[len(PUB):]
    if only and key not in only: continue
    base = path[:-4]
    im = Image.open(path).convert('RGB')
    if path in PLAIN:
        for ext in ('-fg.webp', '-blur.jpg'):
            if os.path.exists(base + ext): os.remove(base + ext)
        meta[key] = {'w': im.width, 'h': im.height, 'box': [0, 0, 1, 1], 'plain': True}
        print(key, 'plain'); continue
    mask = remove(im, session=session, only_mask=True, post_process_mask=True).convert('L')
    a = np.asarray(mask)
    ys, xs = np.where(a > 128)
    W, H = im.size
    box = [round(float(v), 4) for v in (xs.min() / W, ys.min() / H, (xs.max() + 1) / W, (ys.max() + 1) / H)] if len(xs) else [0, 0, 1, 1]
    fg = im.copy(); fg.putalpha(mask)
    fg.save(base + '-fg.webp', quality=82, method=6)
    # Paint the subject out before blurring, so the soft-focus layer has no
    # smeared copy of the car glowing around the sharp cutout.
    import cv2
    hard = cv2.dilate((a > 128).astype(np.uint8) * 255, np.ones((9, 9), np.uint8))
    hw, hh = W // 2, H // 2
    filled = cv2.inpaint(cv2.resize(np.asarray(im)[:, :, ::-1], (hw, hh)), cv2.resize(hard, (hw, hh)), 9, cv2.INPAINT_TELEA)
    bg = Image.fromarray(cv2.resize(filled, (W, H))[:, :, ::-1])
    bg = Image.composite(im, bg, Image.fromarray(255 - hard))  # original pixels outside the subject
    entry = {'w': W, 'h': H, 'box': box}
    if path in DEPTH:
        bg.save(base + '-bg.jpg', quality=78, optimize=True)
        blurred(bg).save(base + '-bg-blur.jpg', quality=70, optimize=True)
        entry['depth'] = True
    blurred(bg).save(base + '-blur.jpg', quality=70, optimize=True)
    meta[key] = entry
    print(key, box, flush=True)

json.dump(dict(sorted(meta.items())), open(META, 'w'), indent=1)
