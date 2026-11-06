# Photo finishing for the LNC site: crop to frame, grade, sharpen, vignette, strip EXIF.
import numpy as np, cv2
from PIL import Image, ImageOps, ImageFilter
import pillow_heif; pillow_heif.register_heif_opener()
import os
RAW=os.environ.get('LNC_RAW', 'drive-photos').rstrip('/')+'/'  # folder with the Drive "photos" originals

def load(name):
    return ImageOps.exif_transpose(Image.open(RAW+name)).convert('RGB')

def crop(im, ratio, cx=0.5, cy=0.5, zoom=1.0):
    """Largest box of `ratio` (w/h) centred near (cx,cy), optionally zoomed in."""
    W,H = im.size
    if W/H > ratio: h=H; w=H*ratio
    else: w=W; h=W/ratio
    w/=zoom; h/=zoom
    x=min(max(cx*W-w/2,0),W-w); y=min(max(cy*H-h/2,0),H-h)
    return im.crop((round(x),round(y),round(x+w),round(y+h)))

def grade(im, contrast=0.12, lift=0.02, sat=1.05, warm=0.0, split=0.0, clarity=0.35,
          vignette=0.18, exposure=0.0, denoise=0, highlights=0.0, shadows=0.0):
    a = np.asarray(im).astype(np.float32)/255.0
    if denoise:
        a = cv2.fastNlMeansDenoisingColored((a*255).astype(np.uint8), None, denoise, denoise, 5, 15).astype(np.float32)/255.0
    a = a*(2**exposure)
    lum = (0.2126*a[...,0]+0.7152*a[...,1]+0.0722*a[...,2])[...,None]
    # shadows / highlights recovery
    if shadows: a = a + shadows*(1-lum)**3*a.clip(0.02)*1.5
    if highlights: a = a - highlights*(lum**3)*0.5
    # filmic S-curve around mid-grey
    x = a.clip(0,1)
    a = x + contrast*(x - 0.5)*(1 - np.abs(2*x - 1))*2
    a = lift + a*(1-lift)
    # saturation
    lum = (0.2126*a[...,0]+0.7152*a[...,1]+0.0722*a[...,2])[...,None]
    a = lum + (a-lum)*sat
    # warmth + split tone (warm highlights, cool shadows)
    a[...,0] += warm*0.04; a[...,2] -= warm*0.04
    if split:
        hl = lum**2; sh = (1-lum)**2
        a[...,0] += split*0.03*hl[...,0]; a[...,2] -= split*0.02*hl[...,0]
        a[...,2] += split*0.03*sh[...,0]; a[...,0] -= split*0.01*sh[...,0]
    a = a.clip(0,1)
    out = Image.fromarray((a*255+0.5).astype(np.uint8))
    if clarity:
        r = max(2, int(min(out.size)/180))
        out = out.filter(ImageFilter.UnsharpMask(radius=r*2, percent=int(clarity*22), threshold=3))
        out = out.filter(ImageFilter.UnsharpMask(radius=1.0, percent=int(clarity*70), threshold=3))
    if vignette:
        w,h = out.size
        yy,xx = np.mgrid[0:h,0:w].astype(np.float32)
        d = np.sqrt(((xx-w/2)/(w/2))**2 + ((yy-h/2)/(h/2))**2)/1.414
        m = 1 - vignette*np.clip((d-0.35)/0.65,0,1)**1.6
        b = np.asarray(out).astype(np.float32)*m[...,None]
        out = Image.fromarray(b.clip(0,255).astype(np.uint8))
    return out

def blur_box(im, box, r=18):
    """Blur a region (fractions x0,y0,x1,y1), e.g. a readable licence plate."""
    W,H=im.size; b=(int(box[0]*W),int(box[1]*H),int(box[2]*W),int(box[3]*H))
    reg=im.crop(b).filter(ImageFilter.GaussianBlur(r)); im=im.copy(); im.paste(reg,b); return im

def save(im, path, long=1800, q=82):
    im = im.copy(); im.thumbnail((long,long), Image.LANCZOS)
    im.save(path, 'JPEG', quality=q, optimize=True, progressive=True)  # no exif passed → stripped
    return im.size
