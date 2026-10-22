// Rewrites root-absolute links in the built site (href="/contact") into
// relative ones (href="../contact/"), so the same build works at any path:
// a GitHub Pages project URL (/LNC/), a custom domain, or a local folder.
// 404.html is served at whatever URL was missed, so it gets the site's base
// path instead (BASE_PATH, e.g. "/LNC"; empty on a custom domain).
// Usage: BASE_PATH=/LNC node scripts/relativize.mjs dist
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep, extname } from 'node:path';

const root = process.argv[2] ?? 'dist';
const base = process.env.BASE_PATH;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const fixPath = (path, prefix) => {
  let [p, hash = ''] = path.slice(1).split('#');
  if (hash) hash = '#' + hash;
  let query = '';
  if (p.includes('?')) [p, query] = [p.slice(0, p.indexOf('?')), p.slice(p.indexOf('?'))];
  // Route links stay as folders (served as folder/index.html); files keep their name.
  if (p && !extname(p.replace(/\/$/, '')) && !p.endsWith('/')) p += '/';
  return prefix + p + query + hash || './';
};

let count = 0;
for await (const file of walk(root)) {
  if (file.endsWith('.html')) {
    const rel = relative(root, file);
    const depth = rel.split(sep).length - 1;
    const prefix = rel === '404.html' && base !== undefined ? `${base.replace(/\/$/, '')}/` : depth ? '../'.repeat(depth) : './';
    const src = await readFile(file, 'utf8');
    const out = src.replace(/\b(href|src|action)=(["'])(\/(?!\/)[^"']*)\2/g, (_, a, q, p) => `${a}=${q}${fixPath(p, prefix)}${q}`);
    if (out !== src) (await writeFile(file, out), count++);
  } else if (file.endsWith('.css')) {
    const src = await readFile(file, 'utf8');
    const out = src.replaceAll('url(/assets/', 'url(./');
    if (out !== src) (await writeFile(file, out), count++);
  }
}
console.log(`relativize: rewrote ${count} files in ${root}`);
