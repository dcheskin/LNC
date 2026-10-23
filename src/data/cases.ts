// Before/after cases from the shop's photo folder (Google Drive). Images live in
// public/media/cases/<slug>-before.jpg / -after.jpg, cropped to the same frame
// so the slider lines up. CONFIRM the write-ups with the owner before launch.

export type Case = {
  slug: string;
  car: string;
  division: 'Accident Repair' | 'Customization';
  title: string;
  work: string[];
  before: string; // alt text for the before shot
  after: string;
  shape: 'wide' | 'tall' | 'banner'; // 3:2, 4:5, 2:1 — matches the image files
  build?: string; // slug in builds.ts this case illustrates
};

export const cases: Case[] = [
  {
    slug: 'ferrari-488-spider',
    car: 'Ferrari 488 Spider',
    division: 'Accident Repair',
    title: 'Front end crushed, airbags out. Back to showroom.',
    work: ['Front structure & bumper', 'Hood, headlights, airbags', 'Factory-match white refinish'],
    before: 'White Ferrari 488 Spider with a crushed front end and deployed airbags',
    after: 'The same 488 Spider fully repaired, same angle outside LNC',
    shape: 'wide',
  },
  {
    slug: 'ferrari-488-gtb',
    car: 'Ferrari 488 GTB',
    division: 'Accident Repair',
    title: 'Stripped to the crash structure. Rebuilt from there.',
    work: ['Front crash structure', 'Bumper, hood & lighting', 'Refinish in factory blue'],
    before: 'Blue Ferrari 488 with the front end removed down to the crash structure',
    after: 'The same blue 488 rebuilt and finished outside LNC',
    shape: 'wide',
  },
  {
    slug: 'rolls-royce-cullinan',
    car: 'Rolls-Royce Cullinan',
    division: 'Customization',
    title: 'Wide-body kit, test-fitted, painted, delivered.',
    work: ['Wide-body kit fit', 'Color-matched paint', 'Custom wheels'],
    before: 'Rolls-Royce Cullinan in the LNC shop with the body kit taped for test fit',
    after: 'The finished Cullinan with the painted body kit outside LNC',
    shape: 'tall',
  },
  {
    slug: 'mercedes-s63-silver',
    car: 'Mercedes-AMG S63 Coupe',
    division: 'Customization',
    title: 'GT-style grille, factory fit.',
    work: ['GT-style grille supplied', 'Fit & finish'],
    before: 'Silver Mercedes-AMG S63 Coupe with the factory grille',
    after: 'The same S63 Coupe with a GT-style vertical-slat grille',
    shape: 'banner',
    build: 'mercedes-s63-coupe',
  },
  {
    slug: 'mercedes-s63-black',
    car: 'Mercedes-AMG S63 Coupe',
    division: 'Customization',
    title: 'Same upgrade, in black.',
    work: ['GT-style grille supplied', 'Fit & finish'],
    before: 'Black Mercedes-AMG S63 Coupe with the factory grille',
    after: 'The same black S63 Coupe with a GT-style grille',
    shape: 'banner',
  },
];

export const caseImages = (c: Case) => ({
  before: `/media/cases/${c.slug}-before.jpg`,
  after: `/media/cases/${c.slug}-after.jpg`,
});

export const caseAspect = { wide: 'aspect-[3/2]', tall: 'aspect-[4/5]', banner: 'aspect-[2/1]' } as const;
