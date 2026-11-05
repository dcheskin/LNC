// Drop-in media: put a file in public/media/ named after its slot (e.g.
// hero.mp4, film.mp4, customization.mp4) and the matching MediaSlot shows it
// instead of the placeholder on the next build. An image with the same name
// (hero.jpg) becomes the video's poster frame, or the photo for a photo slot.
// Optional <name>-portrait.mp4 is a vertical cut served to portrait screens
// (phones); landscape screens get <name>.mp4.
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'public', 'media');
const VIDEO = { mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime' } as const;
const IMAGE = ['webp', 'jpg', 'jpeg', 'png', 'avif'];

const find = (name: string, exts: readonly string[]) => {
  for (const ext of exts) {
    for (const file of [`${name}.${ext}`, `${name}.${ext.toUpperCase()}`]) {
      if (existsSync(join(DIR, file))) return { file, ext };
    }
  }
};

export function findVideo(name: string) {
  const v = find(name, Object.keys(VIDEO));
  if (!v) return undefined;
  const poster = find(name, IMAGE);
  const p = find(`${name}-portrait`, Object.keys(VIDEO));
  return {
    src: `/media/${v.file}`,
    type: VIDEO[v.ext as keyof typeof VIDEO],
    poster: poster && `/media/${poster.file}`,
    portrait: p && { src: `/media/${p.file}`, type: VIDEO[p.ext as keyof typeof VIDEO] },
  };
}

export function findImage(name: string) {
  const img = find(name, IMAGE);
  return img && `/media/${img.file}`;
}

// Pixel size of a JPEG in public/ (reads the SOF marker), e.g. to pick a tile
// shape for a photo gallery. Returns undefined for anything it can't parse.
import { readFileSync } from 'node:fs';
export function jpegSize(publicPath: string): { w: number; h: number } | undefined {
  try {
    const b = readFileSync(join(process.cwd(), 'public', publicPath));
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) return;
      const m = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
      i += 2 + len;
    }
  } catch {}
}
