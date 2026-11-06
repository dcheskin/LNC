// LNC Motorsport YouTube channel (Vlad). Figures read from the channel page
// on 5 Nov 2026 — update now and then.
export const channel = {
  name: 'LNC Motorsport',
  handle: '@LNCVlad',
  url: 'https://www.youtube.com/@LNCVlad',
  subscribe: 'https://www.youtube.com/@LNCVlad?sub_confirmation=1',
  subscribers: '456K',
  videos: '464',
  totalViews: '68.7M', // vidIQ, 4 Nov 2026: 68,769,780
  about:
    'Hello! My name is Vlad. I started YouTube because I wanted to share my automobile lifestyle through the lenses with like-minded people and supercar fans! New videos coming out weekly.',
};

export type Video = { id: string; title: string; views: string; length: string };

// The channel's nine most-viewed videos, most viewed first (vidIQ + the
// channel's "Popular videos", checked 6 Nov 2026).
export const popular: Video[] = [
  { id: 'KV9pGtThwG8', title: 'Rebuilding crashed Ferrari 488 in 20 minutes', views: '7.6M', length: '20:50' },
  { id: 'oBJhjkVvN7o', title: 'Rebuilding a wrecked Ferrari 488 from Copart — Part 2', views: '3.9M', length: '14:18' },
  { id: 'R6LRNIckAEw', title: 'Rebuilding a salvage Mercedes S550 — S65 AMG conversion', views: '2.9M', length: '14:44' },
  { id: 'wDaWyugUiLs', title: 'Rebuilding a salvage Rolls-Royce in 12 minutes', views: '2.6M', length: '11:44' },
  { id: 'bJMWCttutVQ', title: 'Rebuilding a salvage Lamborghini Huracán in 10 minutes', views: '1.9M', length: '10:31' },
  { id: 'oGDygeDzOsg', title: 'Rebuilding crashed Porsche Cayenne Turbo in 16 minutes', views: '1.5M', length: '16:55' },
  { id: 'tGJCQEUhlfE', title: 'Rebuilding crashed McLaren 650S Spider in 15 minutes', views: '1.2M', length: '' },
  { id: 'TyiGUrUpa_w', title: 'I bought a wrecked 2019 Mercedes S560 for myself', views: '1.1M', length: '41:44' },
  { id: '3us3bTtpfEU', title: '2008 Mercedes S550 — S63 AMG W221 conversion', views: '910K', length: '' },
];

export const recent: Video[] = [
  { id: 'ihbMAkw6pTY', title: 'I bought a wrecked Lamborghini… you won’t believe the transformation', views: '77K', length: '1:03:18' },
  { id: 'CmCOZdhdoWc', title: 'Texas subscriber sent me his crashed Porsche… the rebuild shocked him', views: '33K', length: '' },
];

export const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
