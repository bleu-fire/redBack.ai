export const australianSpidersPart1 = [
  {
    scientificName: 'Latrodectus hasselti',
    commonName: 'Redback spider',
    family: 'Theridiidae',
    genus: 'Latrodectus',
    toxicityLevel: 'danger' as const,
    description:
      'The redback spider is an iconic Australian venomous species. Recognizable by the spherical black body of the female with a prominent longitudinal red stripe on the upper abdomen and an hourglass on the underside.',
    habitat: 'Dry, sheltered areas, outdoor sheds, mailboxes, under eaves and garden furniture.',
    distribution: 'Found throughout Australia in urban and regional areas.',
    behavior: 'Constructs irregular, tangled cobwebs. Shy and rarely leaves its web unless disturbed.',
    venomInfo:
      'Contains alpha-latrotoxin. Causes severe localized pain, intense sweating, nausea, and latrodectism. Highly effective antivenom is available throughout Australia.',
    firstAid:
      'Apply a cold ice pack wrapped in cloth to reduce pain. Do NOT use a pressure immobilization bandage. Seek emergency medical care immediately.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: '8 eyes arranged in two rows of 4',
      bodyLengthMm: '10–14 mm (female), 3–4 mm (male)',
      colors: ['Glossy black', 'Crimson red stripe', 'Orange-red hourglass'],
      keyFeatures: [
        'Globose pea-shaped black abdomen',
        'Distinctive longitudinal crimson stripe on dorsal abdomen',
        'Irregular tangled web silk',
      ],
    },
    imageUrls: ['/assets/images/spider-3d.png', '/assets/images/spider-bg.png'],
  },
  {
    scientificName: 'Atrax robustus',
    commonName: 'Sydney funnel-web spider',
    family: 'Atracidae',
    genus: 'Atrax',
    toxicityLevel: 'deadly' as const,
    description:
      'One of the worlds most dangerous spiders. Robust, stocky dark brown to jet-black body with a hairless glossy carapace and large downward-pointing fangs.',
    habitat: 'Moist sheltered burrows under logs, rocks, and suburban gardens.',
    distribution: 'Within a 160 km radius of Sydney, New South Wales, Australia.',
    behavior: 'Aggressive when threatened; raises forelegs and displays venom drops on fangs.',
    venomInfo:
      'Delta-atracotoxin neurotoxin. Attacks the human nervous system, causing rapid autonomic storm. Potentially fatal within hours without antivenom.',
    firstAid:
      'Apply a firm Pressure Immobilization Bandage (PIB) over the entire bitten limb immediately, exactly as for a snakebite. Keep victim completely still and call emergency services (000) instantly.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: 'Compact eye cluster on elevated tubercle',
      bodyLengthMm: '15–35 mm',
      colors: ['Glossy jet-black', 'Dark plum/brown abdomen'],
      keyFeatures: [
        'Smooth glossy hairless carapace',
        'Large powerful chelicerae with downward-pointing fangs',
        'Distinctive funnel-shaped silk tripwire burrow',
      ],
    },
    imageUrls: ['/assets/images/spider-bg.png'],
  },
  {
    scientificName: 'Heteropoda venatoria',
    commonName: 'Huntsman spider',
    family: 'Sparassidae',
    genus: 'Heteropoda',
    toxicityLevel: 'harmless' as const,
    description:
      'Large, flat-bodied spider known for its immense leg-span and fast crab-like sideways movement. Gentle insect predator beneficial to homes.',
    habitat: 'Under loose tree bark, rock crevices, and occasionally behind indoor picture frames.',
    distribution: 'Widespread across all Australian states and tropical/subtropical regions.',
    behavior: 'Active nocturnal hunter that does not build webs; stalks prey with superb speed.',
    venomInfo:
      'Mild venom. Bite may cause temporary local soreness or mild swelling, but is not medically dangerous to humans.',
    firstAid:
      'Wash bite site with soap and water. Apply a cold compress to relieve mild discomfort.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: 'Two forward-facing rows of 4 eyes each',
      bodyLengthMm: '20–30 mm body (up to 150 mm legspan)',
      colors: ['Mottled grey', 'Brown', 'Fawn'],
      keyFeatures: [
        'Laterigrade crab-like legs extending sideways',
        'Flattened body adapted for narrow crevices',
        'Extremely rapid sprint speed',
      ],
    },
    imageUrls: ['/assets/images/spider-bg.png'],
  },
  {
    scientificName: 'Missulena occatoria',
    commonName: 'Red-headed mouse spider',
    family: 'Actinopodidae',
    genus: 'Missulena',
    toxicityLevel: 'danger' as const,
    description:
      'Stocky, robust ground spider with a wide head and prominent fangs. Males feature a bright crimson-red cephalothorax and gunmetal blue abdomen.',
    habitat: 'Open forest, woodland, and suburban lawns in silk-lined trapdoor burrows.',
    distribution: 'Found across mainland Australia, particularly inland and coastal regions.',
    behavior: 'Day-wandering males in autumn/winter searching for females.',
    venomInfo:
      'Contains venom with properties closely resembling funnel-web venom. Potentially dangerous to young children.',
    firstAid:
      'Treat with a firm Pressure Immobilization Bandage (PIB) as for a funnel-web bite. Seek urgent hospital assessment.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: 'Widely spaced eyes across the anterior head margin',
      bodyLengthMm: '15–30 mm',
      colors: ['Bright red head (male)', 'Gunmetal blue abdomen', 'Glossy black (female)'],
      keyFeatures: [
        'Broad high bulbous head region',
        'Large fangs with robust chelicerae',
        'Short robust legs',
      ],
    },
    imageUrls: ['/assets/images/spider-logo-3d.png'],
  },
];
