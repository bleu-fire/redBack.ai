export const australianSpidersPart2 = [
  {
    scientificName: 'Lampona cylindrata',
    commonName: 'White-tailed spider',
    family: 'Lamponidae',
    genus: 'Lampona',
    toxicityLevel: 'mild' as const,
    description:
      'Medium-sized spider with an elongated cylindrical body and a distinctive pale white or cream spot on the tip of the abdomen.',
    habitat: 'Under tree bark, leaf litter, and frequently indoors in bedsheets, laundry, and towels.',
    distribution: 'Southern and eastern Australia.',
    behavior: 'Specialist nocturnal vagrant hunter that preys on other spiders, especially black house spiders.',
    venomInfo:
      'Causes localized stinging, redness, and mild swelling. Modern clinical studies have thoroughly disproven links to necrotic ulcers.',
    firstAid:
      'Wash with clean water and antiseptic. Apply a cold ice pack to relieve local inflammation.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: 'Two rows of oval eyes',
      bodyLengthMm: '12–18 mm',
      colors: ['Grey-brown', 'Distinct white tip at rear abdomen'],
      keyFeatures: [
        'Cylindrical cigar-shaped abdomen',
        'Clear white patch at tip of abdomen',
        'Banded reddish legs',
      ],
    },
    imageUrls: ['/assets/images/spider-bg.png'],
  },
  {
    scientificName: 'Hortophora transmarina',
    commonName: 'Australian garden orb-weaver',
    family: 'Araneidae',
    genus: 'Hortophora',
    toxicityLevel: 'harmless' as const,
    description:
      'Large, hairy orb-weaver known for constructing impressive circular wheel-shaped webs between shrubs and trees during summer nights.',
    habitat: 'Gardens, coastal bushland, parks, and suburban trees.',
    distribution: 'Common throughout eastern and northern Australia.',
    behavior: 'Builds large orb webs at dusk and takes them down at dawn, hiding among foliage.',
    venomInfo:
      'Mild and harmless to humans. Bite causes mild temporary local soreness.',
    firstAid:
      'Wash the area with soap and water. Apply cold pack if painful.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: '8 eyes in compact cluster on protruding head',
      bodyLengthMm: '20–25 mm',
      colors: ['Grey-brown', 'Rust', 'Cream leaf pattern'],
      keyFeatures: [
        'Broad triangular stout abdomen with two blunt humps',
        'Hairy legs and carapace',
        'Circular spiral orb web',
      ],
    },
    imageUrls: ['/assets/images/spider-3d.png'],
  },
  {
    scientificName: 'Badumna insignis',
    commonName: 'Black house spider',
    family: 'Desidae',
    genus: 'Badumna',
    toxicityLevel: 'moderate' as const,
    description:
      'Robust, dark spider common in urban settings. Spins a messy, zigzag lace-like web with a funnel-shaped retreat in window frames, gutters, and tree crevices.',
    habitat: 'Window corners, eaves, sheds, fences, and rough tree bark.',
    distribution: 'Common throughout Australia and New Zealand.',
    behavior: 'Timid and rarely leaves its web retreat; waits for insects to touch the lace silk.',
    venomInfo:
      'Venom can cause localized pain, swelling, sweating, and nausea, but is not life-threatening.',
    firstAid:
      'Apply a cold ice pack to the bite area. Seek medical advice if nausea or vomiting develops.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: '8 eyes in two rows',
      bodyLengthMm: '15–18 mm (female), 9–10 mm (male)',
      colors: ['Dark brown to velvety black', 'Light dorsal pattern'],
      keyFeatures: [
        'Velvety textured dark abdomen',
        'Funnel-like lace silk web in structural crevices',
        'Robust legs with fine hairs',
      ],
    },
    imageUrls: ['/assets/images/spider-bg.png'],
  },
  {
    scientificName: 'Argiope keyserlingi',
    commonName: "Saint Andrew's cross spider",
    family: 'Araneidae',
    genus: 'Argiope',
    toxicityLevel: 'harmless' as const,
    description:
      'Graceful orb-weaver famous for the bright white zigzag silk cross (stabilimentum) it weaves in the center of its web, resting with legs paired in four directions.',
    habitat: 'Low shrubs, suburban gardens, and rainforest margins.',
    distribution: 'Eastern Australian coastline from Queensland to New South Wales.',
    behavior: 'Diurnal web dweller; shakes web vigorously when disturbed to confuse predators.',
    venomInfo:
      'Non-toxic to humans; mild bite similar to a bee sting.',
    firstAid:
      'Clean bite site with soap and water.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: '8 eyes with lateral pairs closely situated',
      bodyLengthMm: '10–16 mm',
      colors: ['Silver-yellow and dark brown bands on abdomen'],
      keyFeatures: [
        'Distinctive white silk "X" zigzag cross in web center',
        'Bright horizontal bands on abdomen',
        'Pairs legs together in groups of two',
      ],
    },
    imageUrls: ['/assets/images/spider-logo-3d.png'],
  },
];
