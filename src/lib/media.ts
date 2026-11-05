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
