// Before/after cases from the shop's photo folder (Google Drive). Pairs shot
// from the same spot and angle get the drag slider (`layout: 'slider'`, images
// aligned and cropped to the same 2:1 frame); pairs from different angles are
// shown side by side (`layout: 'pair'`, square crops).
// Images live in public/media/cases/<slug>-before.jpg / -after.jpg.
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
  layout?: 'slider' | 'pair'; // default slider
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
    slug: 'ferrari-488-blue',
    car: 'Blue Ferrari 488',
    division: 'Accident Repair',
    title: 'Stripped to the crash structure. Delivered like new.',
    work: ['Front structure & crash parts', 'Bumper, hood & headlights', 'Factory blue refinish'],
    before: 'Blue Ferrari 488 outside LNC with its front end removed down to the crash structure',
    after: 'The same blue 488 finished, bronze wheels, parked outside the LNC shop',
    layout: 'pair',
  },
];

export const caseImages = (c: Case) => ({
  before: `/media/cases/${c.slug}-before.jpg`,
  after: `/media/cases/${c.slug}-after.jpg`,
});
