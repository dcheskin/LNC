// Single source of truth for business facts. Everything here was verified
// against lncmotorsport.com, lnccollision.com, Yelp, Google and LNC socials
// (Oct 2026). Items marked CONFIRM still need the owner's sign-off.

export const site = {
  name: 'LNC Auto Group',
  legalName: 'Laguna Niguel Collision (LNC)',
  url: 'https://lncautogroup.com',
  founded: 2012,
  tagline: 'Do it once. Do it right.',
  heritageLine: "Accidents happen, but don't accidentally choose the wrong shop.",
  phone: '(949) 367-1080',
  phoneHref: 'tel:+19493671080',
  smsHref: 'sms:+19493671080',
  email: 'ben@lnccollision.com',
  address: {
    street: '27622 Camino Capistrano, Suite D',
    city: 'Laguna Niguel',
    region: 'CA',
    zip: '92677',
  },
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Laguna+Niguel+Collision+27622+Camino+Capistrano+Suite+D+Laguna+Niguel+CA+92677',
  mapsEmbed:
    'https://maps.google.com/maps?q=27622%20Camino%20Capistrano%20Suite%20D%2C%20Laguna%20Niguel%2C%20CA%2092677&z=15&output=embed',
  geo: { lat: 33.5617815, lng: -117.6742104 },
  hours: [
    { days: 'Monday – Friday', short: 'Mon – Fri', time: '8:00 am – 5:30 pm' },
    { days: 'Saturday', short: 'Sat', time: 'By appointment' }, // CONFIRM: sources disagree
    { days: 'Sunday', short: 'Sun', time: 'Closed' },
  ],
  ratings: {
    yelp: { score: '5.0', count: 202, href: 'https://www.yelp.com/biz/laguna-niguel-collision-laguna-niguel-3' },
    google: { score: '4.8', count: 131, href: 'https://g.page/r/CTqwpGNzW4fPEAg/review' },
  },
  social: {
    instagram: 'https://www.instagram.com/lnc_oc/',
    instagramMotorsport: 'https://www.instagram.com/lncmotorsport/',
    facebook: 'https://www.facebook.com/LNCOC/',
    youtube: 'https://www.youtube.com/channel/UCPf4jHW3UeGWw-rhb2cQADw',
  },
  youtubeReach: '450K+', // CONFIRM: taken from the @lnc_oc Instagram bio
};

export const nav = [
  { label: 'Accident Repair', href: '/accident-repair' },
  { label: 'Customization', href: '/customization' },
  { label: 'Builds', href: '/builds' },
  { label: 'About', href: '/about' },
  { label: 'Supply', href: '/shop' },
];

export const proof = [
  'Family owned & operated',
  'All insurance claims accepted',
  'OEM-level repairs',
  'Undetectable paintwork',
  'Towing & nationwide transport',
];

// Public reviews already quoted on lnccollision.com / Yelp.
export const reviews = [
  {
    name: 'Alexander B.',
    car: 'Insurance claim',
    source: 'Yelp',
    quote:
      "Just dropped my car off, gave him my claim number, and then left the country. While I was gone he gave me updates on my car and sent me photos. … This was the first time I couldn't find any imperfections — a perfect paint match.",
  },
  {
    name: 'Brad B.',
    car: 'Hyundai',
    source: 'Yelp',
    quote:
      'I was greeted by Ben who made me feel like I was bringing in a Ferrari. … The work was completed on time and the quality was outstanding.',
  },
  {
    name: 'Leeza K.',
    car: 'Porsche',
    source: 'Yelp',
    quote:
      'I brought my Porsche in for repair and it came out looking like the day I bought it new. The job was done to perfection. … Rates reasonable and work impeccable!',
  },
  {
    name: 'Andrew L.',
    car: 'Dent repair',
    source: 'Yelp',
    quote:
      'Not only was our dent completely repaired, there was no evidence that any body work ever took place. The color matching was perfect and there was no overspray anywhere.',
  },
  {
    name: 'Jake R.',
    car: 'BMW M235i',
    source: 'Yelp',
    quote:
      'Ben & the team at LNC are legitimate wizards. … LNC took the job that other body shops would not touch. He has earned my business for life!',
  },
  {
    name: 'Kelly C.',
    car: 'AAA claim',
    source: 'Yelp',
    quote:
      'They also worked very well with my insurance, AAA! Quick, efficient, and easy — what more could I ask for?!',
  },
];

export const faqs = [
  {
    q: 'Do I have to use the shop my insurance company recommends?',
    a: 'No. In California you choose the body shop that repairs your car. We are not part of any insurer’s direct repair program, which means we work for you — not the insurance company.',
  },
  {
    q: 'Which insurance companies do you work with?',
    a: 'All of them. Bring us your claim number and we handle the adjuster, the inspection, supplements and the paperwork.',
  },
  {
    q: 'Can you pick up my car?',
    a: 'Yes. We arrange towing locally and enclosed transport for clients outside Orange County.',
  },
  {
    q: 'Do you only work on exotics?',
    a: 'No. We repair every make and model with the same standard — a daily driver gets the same paint match as a supercar.',
  },
  {
    q: 'What does “OEM-level” mean?',
    a: 'Repairs that follow manufacturer procedures, with factory-correct parts, fitment and finish — so the car looks and performs the way it left the factory.',
  },
  {
    q: 'How do I get an estimate?',
    a: 'Text photos of the damage to (949) 367-1080 or use the quote form. For collision claims, include your claim number if you have one.',
  },
];
