// Starter build list taken from LNC's public posts (Instagram, Facebook, Yelp).
// Photos/video are placeholders until the shop sends originals. CONFIRM the
// summaries with the owner before launch.

export type Build = {
  slug: string;
  car: string;
  year?: string;
  division: 'Accident Repair' | 'Customization';
  title: string;
  summary: string;
  work: string[];
  shotList: string[]; // what to photograph for this build
};

export const builds: Build[] = [
  {
    slug: 'aston-martin-collision',
    car: 'Aston Martin',
    division: 'Accident Repair',
    title: 'Hit hard. Fixed the right way.',
    summary:
      'When an Aston Martin gets hit, there’s only one way to fix it — the right way. Repaired to factory procedures and refinished so the repair disappears.',
    work: ['Collision repair', 'OEM-correct parts', 'Color-matched refinish & blend', 'Insurance claim handled'],
    shotList: ['Damage on arrival (3/4 front)', 'Mid-repair in booth', 'Finished, same angle as arrival', 'Paint close-up in sunlight'],
  },
  {
    slug: 'ford-raptor-r',
    car: 'Ford F-150 Raptor R',
    division: 'Accident Repair',
    title: 'Bedside & taillight, back to new.',
    summary:
      'A hard hit to the bedside panel and left taillight — straightened, refinished and matched to the factory finish.',
    work: ['Bedside panel repair', 'Taillight replacement', 'Refinish & clear', 'Claim managed end to end'],
    shotList: ['Bedside damage', 'Finished side profile', 'Taillight detail'],
  },
  {
    slug: 'porsche-718',
    car: 'Porsche 718',
    division: 'Accident Repair',
    title: 'Before. During. Drop the mic.',
    summary: 'A repair the owner documented from start to finish — before, during and after. Their verdict: drop the mic.',
    work: ['Body repair', 'Paint match', 'Final polish'],
    shotList: ['Before', 'During', 'After — same angle'],
  },
  {
    slug: 'bmw-m235i',
    car: 'BMW M235i',
    division: 'Accident Repair',
    title: 'The job other shops wouldn’t touch.',
    summary: 'Deep scratches across multiple panels, corrected without a trace.',
    work: ['Multi-panel scratch repair', 'Refinish & blend', 'Paint correction'],
    shotList: ['Scratch close-ups', 'Finished panel reflections'],
  },
  {
    slug: 'mercedes-s63-coupe',
    car: 'Mercedes-AMG S63 Coupe',
    division: 'Customization',
    title: 'GT-style face, factory fit.',
    summary: 'A GT-style grille conversion for the S63 Coupe — a part LNC supplies, fits and finishes in-house.',
    work: ['GT-style grille', 'Fit & finish', 'Detail'],
    shotList: ['Front 3/4 at night', 'Grille close-up', 'Rolling shot'],
  },
  {
    slug: 'exotic-widebody',
    car: 'Next signature build',
    division: 'Customization',
    title: 'Wide-body, wheels, stance.',
    summary: 'Slot reserved for the next signature customization project — body kit, wheels, suspension and exhaust.',
    work: ['Wide-body install', 'Wheels & suspension', 'Exhaust', 'Custom paint'],
    shotList: ['Hero studio shot', 'Detail: fender flare', 'Rolling shot', 'Interior'],
  },
];
