# Ken Burns montage: graded stills, eased camera moves, crossfades, seamless loop.
import sys, subprocess, numpy as np
sys.path.insert(0,'.')
from grade import load, grade
from PIL import Image

def ease(t): return t*t*(3-2*t)

def prep(src, W, H, g):
    im = load(src)
    # scale so the frame fits with headroom for the move, then grade once
    s = max(W*1.35/im.width, H*1.35/im.height, 1e-9)
    s = min(s, 1.0) if im.width*im.height > 0 else s
    if s < 1: im = im.resize((round(im.width*s), round(im.height*s)), Image.LANCZOS)
    return grade(im, **g)

def frame(im, W, H, cx, cy, zoom):
    R = W/H; iw, ih = im.size
    if iw/ih > R: h = ih/zoom; w = h*R
    else: w = iw/zoom; h = w/R
    x = min(max(cx*iw - w/2, 0), iw-w); y = min(max(cy*ih - h/2, 0), ih-h)
    return np.asarray(im.resize((W,H), Image.BICUBIC, box=(x,y,x+w,y+h))).astype(np.float32)

def render(shots, out, W, H, fps=30, dur=2.4, xf=0.6, crf=25, g=None):
    imgs = [prep(s['src'], W, H, {**(g or {}), **s.get('g',{})}) for s in shots]
    seg = dur - xf; n = len(shots); total = int(round(seg*n*fps))
    p = subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(fps),'-i','-',
        '-c:v','libx264','-preset','slow','-crf',str(crf),'-pix_fmt','yuv420p','-movflags','+faststart','-an',out], stdin=subprocess.PIPE)
    def at(i, t):  # shot i at local time t in [0,dur]
        s = shots[i]; u = ease(min(max(t/dur,0),1))
        a, b = s['a'], s['b']
        return frame(imgs[i], W, H, *(a[k]+(b[k]-a[k])*u for k in range(3)))
    for f in range(total):
        T = f/fps; i = int(T//seg); t = T - i*seg
        cur = at(i % n, t + xf)
        if t > seg - xf:
            k = ease((t - (seg - xf))/xf)
            cur = cur*(1-k) + at((i+1) % n, t - (seg - xf))*k
        p.stdin.write(cur.clip(0,255).astype(np.uint8).tobytes())
    p.stdin.close(); p.wait()
    return imgs
