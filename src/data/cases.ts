// Before/after cases from the shop's photo folder (Google Drive). Only pairs shot
// from the same spot and angle belong here, so the slider reveals the work and
// nothing else. Images live in public/media/cases/<slug>-before.jpg / -after.jpg,
// aligned to each other and cropped to the same 2:1 frame.
// CONFIRM the write-ups with the owner before launch.

export type Case = {
  slug: string;
  car: string;
  division: 'Accident Repair' | 'Customization';
  title: string;
  work: string[];
  before: string; // alt text for the before shot
  after: string;
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
  },
  {
    slug: 'mercedes-s63-silver',
    car: 'Mercedes-AMG S63 Coupe',
    division: 'Customization',
    title: 'GT-style grille, factory fit.',
    work: ['GT-style grille supplied', 'Fit & finish'],
    before: 'Silver Mercedes-AMG S63 Coupe with the factory grille',
    after: 'The same S63 Coupe with a GT-style vertical-slat grille',
    build: 'mercedes-s63-coupe',
  },
];

export const caseImages = (c: Case) => ({
  before: `/media/cases/${c.slug}-before.jpg`,
  after: `/media/cases/${c.slug}-after.jpg`,
});
