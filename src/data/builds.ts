// Builds shown on /builds, /builds/[slug], the home "Hall of fame" table and
// /customization. Photos come from the shop's "Photos from iCloud-LNC" Drive
// folder, resized to 2000px, EXIF/GPS stripped and vanity plates blurred:
// public/media/builds/<slug>/NN.jpg. After adding photos run scripts/subjects.py.
// Write-ups describe only what the photos show. CONFIRM details (model year,
// kit/wheel brands, what was repaired) with the owner before launch.

export type Stage = 'Before' | 'During' | 'After';
// Framing for crops is automatic (subject boxes from scripts/subjects.py).
export type Photo = { src: string; alt: string; stage?: Stage };

export type Build = {
  slug: string;
  car: string;
  division: 'Accident Repair' | 'Customization';
  title: string;
  summary: string;
  work: string[];
  photos: Photo[]; // story order: before → during → after
  cover: number; // index into photos for cards (cropped to 4:5 / 16:10)
  hero: number; // index into photos for the wide hero on the build page (21:9)
};

const p = (slug: string, n: number, alt: string, stage?: Stage): Photo => ({
  src: `/media/builds/${slug}/${String(n).padStart(2, '0')}.jpg`,
  alt,
  stage,
});

export const builds: Build[] = [
  {
    slug: 'lamborghini-urus-purple',
    car: 'Purple Lamborghini Urus',
    division: 'Customization',
    title: 'Wide, loud and purple.',
    summary:
      'A Urus taken wide: bolt-on fender flares, carbon hood and aero, black wheels and a gloss purple finish, fitted and painted in-house.',
    work: ['Widebody flares fitted', 'Carbon hood & aero', 'Gloss purple finish', 'Wheels & stance'],
    photos: [
      p('lamborghini-urus-purple', 1, 'Purple Lamborghini Urus with carbon hood and grey widebody flares, front three-quarter view outside LNC', 'During'),
      p('lamborghini-urus-purple', 2, 'Purple Urus side profile in the LNC shop, flares fitted and in primer', 'During'),
      p('lamborghini-urus-purple', 3, 'Purple Urus rear three-quarter view in the shop, widebody flares fitted', 'During'),
      p('lamborghini-urus-purple', 4, 'Purple Urus rear three-quarter view outside the shop', 'During'),
      p('lamborghini-urus-purple', 5, 'Finished purple Urus head-on in the LNC lot, flares painted to match', 'After'),
    ],
    cover: 0,
    hero: 0,
  },
  {
    slug: 'rolls-royce-wraith',
    car: 'Rolls-Royce Wraith',
    division: 'Accident Repair',
    title: 'Front and rear hits. No trace left.',
    summary:
      'The Wraith came in with a crushed front end and a damaged rear quarter. Repaired, refinished in black and handed back looking like it never happened.',
    work: ['Front-end structure & bumper', 'Rear quarter panel', 'Black refinish & blend', 'Insurance claim handled'],
    photos: [
      p('rolls-royce-wraith', 2, 'Black Rolls-Royce Wraith in the shop with a crushed front bumper and grille area', 'Before'),
      p('rolls-royce-wraith', 3, 'The Wraith from the rear, quarter panel stripped and in primer during repair', 'During'),
      p('rolls-royce-wraith', 1, 'The finished Rolls-Royce Wraith outside LNC, side and rear three-quarter view', 'After'),
    ],
    cover: 2,
    hero: 2,
  },
  {
    slug: 'mclaren-720s-purple',
    car: 'McLaren 720S',
    division: 'Customization',
    title: 'Satin purple, copper wheels.',
    summary: 'A 720S in a satin purple finish with copper wheels and carbon aero. Doors up, it stops traffic in the lot.',
    work: ['Satin purple finish', 'Copper wheels', 'Carbon aero', 'Detail'],
    photos: [
      p('mclaren-720s-purple', 1, 'Satin purple McLaren 720S with copper wheels and doors up in the LNC lot', 'After'),
      p('mclaren-720s-purple', 2, 'Purple McLaren 720S front three-quarter view in front of the LNC building', 'After'),
    ],
    cover: 0,
    hero: 0,
  },
  {
    slug: 'ferrari-roma',
    car: 'Ferrari Roma',
    division: 'Accident Repair',
    title: 'Rear end gone. Rebuilt from the inside out.',
    summary:
      'A hard rear hit took out the Roma’s quarter panel, trunk area and bumper. Rebuilt structurally, primed, matched to the factory blue and finished to Ferrari standard.',
    work: ['Rear structure & quarter panel', 'Trunk floor & bumper', 'Factory-blue refinish', 'Final polish'],
    photos: [
      p('ferrari-roma', 2, 'Blue Ferrari Roma in the shop with the rear quarter and trunk area torn open', 'Before'),
      p('ferrari-roma', 3, 'The Roma outside LNC with the rebuilt rear in grey primer', 'During'),
      p('ferrari-roma', 1, 'The finished blue Ferrari Roma, front three-quarter view in the LNC lot', 'After'),
    ],
    cover: 2,
    hero: 2,
  },
  {
    slug: 'lamborghini-huracan-white',
    car: 'White Lamborghini Huracán',
    division: 'Customization',
    title: 'Carbon face, big wing.',
    summary:
      'A white Huracán with a full carbon front end, vented hood, carbon rear wing and black wheels — fitted, painted and aligned in-house.',
    work: ['Carbon front bumper & hood', 'Rear wing', 'Paint & fit', 'Black wheels'],
    photos: [
      p('lamborghini-huracan-white', 4, 'White Huracán in the shop with the new carbon front end being fitted', 'During'),
      p('lamborghini-huracan-white', 1, 'Finished white Lamborghini Huracán with carbon hood, front three-quarter view outside LNC', 'After'),
      p('lamborghini-huracan-white', 2, 'White Huracán from the other front corner, carbon aero visible', 'After'),
      p('lamborghini-huracan-white', 3, 'White Huracán rear three-quarter view showing the carbon rear wing', 'After'),
    ],
    cover: 1,
    hero: 1,
  },
  {
    slug: 'lamborghini-urus-white',
    car: 'White Lamborghini Urus',
    division: 'Customization',
    title: 'Widebody, all in white.',
    summary:
      'A widebody Urus with carbon hood vents, a new front bumper and black wheels — the flares body-matched in white so the kit reads as factory.',
    work: ['Widebody kit fitted', 'Body-matched white paint', 'Carbon hood vents', 'Black wheels'],
    photos: [
      p('lamborghini-urus-white', 4, 'White Urus in the shop with the widebody kit fitted and taped for paint', 'During'),
      p('lamborghini-urus-white', 1, 'Finished white widebody Lamborghini Urus, front three-quarter view', 'After'),
      p('lamborghini-urus-white', 2, 'White widebody Urus, front three-quarter view from the other side', 'After'),
      p('lamborghini-urus-white', 3, 'White widebody Urus side profile in front of the LNC wall logo', 'After'),
    ],
    cover: 1,
    hero: 1,
  },
  {
    slug: 'porsche-911-gt3',
    car: 'Porsche 911 GT3',
    division: 'Accident Repair',
    title: 'Down to the wiring. Back to blue.',
    summary:
      'A blue 911 GT3 repaired down to the interior and wiring, then refinished and reassembled. It left on a set of white wheels.',
    work: ['Body repair', 'Interior & wiring removed and refitted', 'Blue refinish', 'Wheels'],
    photos: [
      p('porsche-911-gt3', 2, 'Blue Porsche 911 GT3 on stands in the LNC shop', 'During'),
      p('porsche-911-gt3', 3, 'The GT3 interior stripped to the wiring during repair', 'During'),
      p('porsche-911-gt3', 1, 'The finished blue Porsche 911 on white wheels in the LNC shop', 'After'),
    ],
    cover: 2,
    hero: 2,
  },
  {
    slug: 'lamborghini-huracan-orange',
    car: 'Orange Lamborghini Huracán',
    division: 'Customization',
    title: 'Carbon aero, LNC banner.',
    summary: 'An orange Huracán with a carbon hood and front lip, a big rear wing and an LNC windshield banner.',
    work: ['Carbon hood & front lip', 'Rear wing', 'Fit & finish', 'Windshield banner'],
    photos: [
      p('lamborghini-huracan-orange', 1, 'Orange Lamborghini Huracán with carbon hood and LNC windshield banner, outside the shop', 'After'),
      p('lamborghini-huracan-orange', 2, 'Orange Huracán head-on inside the LNC shop', 'After'),
      p('lamborghini-huracan-orange', 3, 'Orange Huracán side view in the LNC lot', 'After'),
    ],
    cover: 2,
    hero: 2,
  },
  {
    slug: 'lamborghini-huracan-green',
    car: 'Green Lamborghini Huracán',
    division: 'Customization',
    title: 'Carbon hood, bronze wheels.',
    summary: 'A lime-green Huracán with a vented carbon hood and bronze wheels.',
    work: ['Carbon hood', 'Bronze wheels', 'Fit & finish'],
    photos: [
      p('lamborghini-huracan-green', 1, 'Lime-green Lamborghini Huracán with bronze wheels, front three-quarter view in the LNC lot', 'After'),
      p('lamborghini-huracan-green', 2, 'Green Huracán head-on, carbon hood and bronze wheels', 'After'),
    ],
    cover: 0,
    hero: 0,
  },

];

export const coverOf = (b: Build) => b.photos[b.cover];
export const heroOf = (b: Build) => b.photos[b.hero];
