import sys; sys.path.insert(0,'scripts/media')
from grade import *
O='public/media/'  # run from the repo root
jobs = {
 # name: (src, ratio, cx, cy, zoom, grade kwargs, long)
 'home-repair':  ('IMG_0425.JPG', 16/11, 0.5, 0.55, 1.0, dict(contrast=0.14, sat=1.02, warm=0.2, split=0.6, clarity=0.4, vignette=0.22, denoise=3, highlights=0.25), 1800),
 'home-custom':  ('GT2_Conversion_034.JPG', 16/11, 0.5, 0.55, 1.04, dict(contrast=0.18, sat=1.04, warm=0.25, split=0.8, clarity=0.3, vignette=0.3, exposure=-0.25, highlights=0.4), 1800),
 'claim-1':      ('NATH7940.JPG', 4/5, 0.5, 0.5, 1.0, dict(contrast=0.14, sat=1.02, split=0.5, clarity=0.35, vignette=0.25), 1400),
 'claim-2':      ('IMG_0339.JPG', 4/5, 0.5, 0.5, 1.0, dict(contrast=0.14, sat=1.02, warm=0.1, split=0.6, clarity=0.4, vignette=0.25, denoise=3, highlights=0.3), 1600),
 'claim-3':      ('DSC00093.JPEG', 4/5, 0.5, 0.55, 1.0, dict(contrast=0.1, sat=1.03, warm=0.15, split=0.5, clarity=0.25, vignette=0.2), 1600),
 'about-shop':   ('IMG_E6621.HEIC', 4/3, 0.5, 0.46, 1.0, dict(contrast=0.12, sat=1.04, warm=0.1, split=0.5, clarity=0.35, vignette=0.2, denoise=3, highlights=0.3), 1800),
 'about-detail': ('IMG_0338.JPG', 4/5, 0.5, 0.45, 1.0, dict(contrast=0.16, sat=0.98, warm=0.1, split=0.7, clarity=0.45, vignette=0.28, denoise=3, highlights=0.2), 1600),
 'repair-choice':('BLLQ0770.JPEG', 4/5, 0.5, 0.6, 1.0, dict(contrast=0.12, sat=1.04, warm=0.15, split=0.6, clarity=0.3, vignette=0.22, highlights=0.2), 1600),
 'case-blue-before': ('blue 488 jp before.jpg', 1/1, 0.5, 0.72, 1.0, dict(contrast=0.12, sat=1.03, split=0.5, clarity=0.3, vignette=0.2), 1400),
 'case-blue-after':  ('blue 488 jp after.jpg', 1/1, 0.5, 0.5, 1.0, dict(contrast=0.12, sat=1.03, split=0.5, clarity=0.3, vignette=0.2), 1400),
}
only = sys.argv[1:] or jobs
for k in only:
    src,r,cx,cy,z,g,L = jobs[k]
    im = grade(crop(load(src), r, cx, cy, z), **g)
    print(k, save(im, O+{'case-blue-before':'cases/ferrari-488-blue-before','case-blue-after':'cases/ferrari-488-blue-after'}.get(k,k)+'.jpg', L))
