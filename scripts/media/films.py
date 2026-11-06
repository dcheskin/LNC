import sys; sys.path.insert(0,'scripts/media')
from film import render
O='public/media/'  # run from the repo root
G=dict(contrast=0.14, sat=1.03, warm=0.2, split=0.8, clarity=0.2, vignette=0.32, exposure=-0.1, highlights=0.25)
which = sys.argv[1]
if which=='film':
    sh=[
     dict(src='F430 Scuderia (2 of 26).JPG', a=(0.5,0.55,1.0), b=(0.5,0.58,1.12)),
     dict(src='F430 Scuderia (15 of 26).JPG', a=(0.42,0.5,1.12), b=(0.58,0.5,1.12)),
     dict(src='Ferrari F430 (5 of 35).JPG', a=(0.5,0.5,1.0), b=(0.5,0.55,1.14)),
     dict(src='F430 Scuderia (11 of 26).JPG', a=(0.55,0.5,1.15), b=(0.45,0.5,1.05)),
     dict(src='F430 Scuderia (18 of 26).JPG', a=(0.45,0.55,1.15), b=(0.45,0.55,1.0)),
     dict(src='Ferrari F430 (8 of 35).JPG', a=(0.5,0.45,1.0), b=(0.5,0.45,1.15)),
     dict(src='F430 Scuderia (14 of 26).JPG', a=(0.45,0.5,1.0), b=(0.55,0.5,1.1)),
     dict(src='F430 Scuderia (19 of 26).JPG', a=(0.5,0.6,1.0), b=(0.52,0.62,1.12)),
    ]
    render(sh, O+'film.mp4', 1920, 1080, dur=2.5, xf=0.7, crf=26, g=G)
    shp=[
     dict(src='Ferrari F430 (15 of 35).JPG', a=(0.5,0.55,1.0), b=(0.5,0.6,1.1)),
     dict(src='F430 Scuderia (15 of 26).JPG', a=(0.55,0.5,1.0), b=(0.6,0.5,1.08)),
     dict(src='F430 Scuderia (2 of 26).JPG', a=(0.52,0.55,1.0), b=(0.52,0.58,1.1)),
     dict(src='Ferrari F430 (23 of 35).JPG', a=(0.5,0.5,1.0), b=(0.5,0.55,1.1)),
     dict(src='F430 Scuderia (18 of 26).JPG', a=(0.36,0.55,1.1), b=(0.36,0.55,1.0)),
     dict(src='Ferrari F430 (29 of 35).JPG', a=(0.5,0.5,1.0), b=(0.5,0.45,1.1)),
     dict(src='Ferrari F430 (8 of 35).JPG', a=(0.5,0.45,1.0), b=(0.5,0.45,1.12)),
    ]
    render(shp, O+'film-portrait.mp4', 720, 1280, dur=2.5, xf=0.7, crf=26, g=G)
elif which=='custom':
    D=dict(G, exposure=-0.2)
    sh=[
     dict(src='GT2_Conversion_034.JPG', a=(0.45,0.55,1.05), b=(0.55,0.55,1.05), g=dict(exposure=-0.3)),
     dict(src='IMG_7755.JPG', a=(0.5,0.62,1.0), b=(0.5,0.64,1.12), g=dict(denoise=4)),
     dict(src='GT2_Conversion_041.JPG', a=(0.45,0.5,1.0), b=(0.5,0.5,1.12), g=dict(exposure=-0.35)),
     dict(src='Ferrari F430 (28 of 35).JPG', a=(0.4,0.5,1.05), b=(0.6,0.5,1.05)),
     dict(src='F430 Scuderia (7 of 26).JPG', a=(0.6,0.5,1.0), b=(0.6,0.5,1.14)),
     dict(src='DSC00090.JPEG', a=(0.5,0.45,1.0), b=(0.5,0.42,1.1)),
     dict(src='Ferrari F430 (13 of 35).JPG', a=(0.5,0.55,1.0), b=(0.5,0.55,1.15)),
     dict(src='GT2_Conversion_003.JPG', a=(0.5,0.45,1.15), b=(0.5,0.45,1.0), g=dict(exposure=-0.35)),
    ]
    render(sh, O+'customization.mp4', 1920, 822, dur=2.8, xf=0.8, crf=25, g=D)
