// Live Yelp numbers and newest reviews, pulled at build time through the
// Yelp Fusion API. The key stays server-side (it is never shipped to the
// browser); without YELP_API_KEY the site falls back to the figures in
// src/data/site.ts, so local builds and previews still work.
//
// Keep it fresh by rebuilding on a schedule (see .github/workflows/refresh.yml).
import { site, reviews as curated } from '../data/site';

export interface Review {
  name: string;
  car: string;
  source: string;
  quote: string;
  rating: number;
  href?: string;
}

export interface YelpData {
  score: string;
  count: number;
  href: string;
  live: boolean;
  reviews: Review[];
}

// Yelp business id for Laguna Niguel Collision (alias: laguna-niguel-collision-laguna-niguel-3).
const BUSINESS = '3L2Q08IHSjh11P8xdZc4kw';
const API = 'https://api.yelp.com/v3/businesses';

const fallback: YelpData = {
  ...site.ratings.yelp,
  live: false,
  reviews: curated.map((r) => ({ ...r, rating: 5 })),
};

let cached: Promise<YelpData> | undefined;

export function getYelp(): Promise<YelpData> {
  return (cached ??= load());
}

async function load(): Promise<YelpData> {
  const key = import.meta.env.YELP_API_KEY ?? process.env.YELP_API_KEY;
  if (!key) return fallback;
  const get = async (path: string) => {
    const res = await fetch(`${API}/${path}`, { headers: { Authorization: `Bearer ${key}`, accept: 'application/json' } });
    if (!res.ok) throw new Error(`Yelp ${path}: ${res.status}`);
    return res.json();
  };
  try {
    const [biz, rev] = await Promise.all([get(BUSINESS), get(`${BUSINESS}/reviews?limit=3&sort_by=newest`)]);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });
    const latest: Review[] = (rev.reviews ?? []).map((r: any) => ({
      name: r.user?.name ?? 'Yelp reviewer',
      car: month.format(new Date(r.time_created.replace(' ', 'T'))),
      source: 'Yelp',
      quote: r.text,
      rating: r.rating,
      href: r.url,
    }));
    return {
      score: Number(biz.rating).toFixed(1),
      count: biz.review_count,
      href: (biz.url as string)?.split('?')[0] ?? site.ratings.yelp.href,
      live: true,
      // Newest from Yelp first, then the hand-picked ones (minus duplicates).
      reviews: [...latest, ...fallback.reviews.filter((c) => !latest.some((l) => l.name === c.name))],
    };
  } catch (err) {
    console.warn(`[yelp] falling back to static figures — ${(err as Error).message}`);
    return fallback;
  }
}
