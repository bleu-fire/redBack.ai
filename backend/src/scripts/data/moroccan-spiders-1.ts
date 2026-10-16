export const moroccanSpidersPart1 = [
  {
    scientificName: 'Latrodectus tredecimguttatus',
    commonName: 'Mediterranean black widow',
    family: 'Theridiidae',
    genus: 'Latrodectus',
    toxicityLevel: 'deadly' as const,
    description:
      'The Mediterranean black widow (Malmignatte) is the most dangerous venomous spider in Morocco and North Africa. The female features a shiny black globular body with 13 distinct orange or bright red spots on the dorsal abdomen.',
    habitat: 'Dry Mediterranean scrub, agricultural fields, stone walls, and sheltered burrows.',
    distribution: 'Found throughout Morocco, particularly in warm rural and coastal plains.',
    behavior: 'Constructs tangled cobwebs near ground level. Shy and non-aggressive unless touched or squeezed.',
    venomInfo:
      'Highly neurotoxic venom containing alpha-latrotoxin. Causes intense spreading muscular pain, abdominal spasms, profuse sweating, and latrodectism. Requires immediate emergency medical care.',
    firstAid:
      'Keep patient calm and still. Apply a cold pack wrapped in cloth to reduce pain. Do NOT apply a tourniquet. Seek urgent hospital emergency care.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: '8 small eyes in two rows',
      bodyLengthMm: '10–15 mm (female), 4–7 mm (male)',
      colors: ['Glossy black', '13 red or orange spots', 'Light borders around spots'],
      keyFeatures: [
        'Globular pea-sized black abdomen with 13 red/orange spots',
        'Tangled irregular ground web',
        'Long slender dark legs',
      ],
    },
    imageUrls: [
      '/images/morocco/mediterranean-black-widow/mediterranean-black-widow-1.jpg',
      '/images/morocco/mediterranean-black-widow/mediterranean-black-widow-2.jpg',
    ],
  },
  {
    scientificName: 'Loxosceles rufescens',
    commonName: 'Mediterranean recluse spider',
    family: 'Sicariidae',
    genus: 'Loxosceles',
    toxicityLevel: 'danger' as const,
    description:
      'Medium-sized yellowish-brown spider common inside Moroccan homes. Famous for the dark violin-shaped marking on the carapace and having only 6 eyes arranged in three pairs (dyads).',
    habitat: 'Under furniture, behind baseboards, dark closets, cellars, and stone piles.',
    distribution: 'Widespread across all Moroccan cities (Casablanca, Marrakech, Fes, Tangier, Rabat).',
    behavior: 'Nocturnal recluse hunter; hides during daylight and only bites defensively when trapped in clothing or bedsheets.',
    venomInfo:
      'Cytotoxic and hemolytic venom containing sphingomyelinase D. Can cause localized dermonecrosis (skin breakdown) and slow-healing ulcers (loxoscelism).',
    firstAid:
      'Clean bite thoroughly with soap and water. Apply cold compress and elevate affected limb. Seek medical evaluation promptly.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: '6 eyes in three distinct pairs (dyads)',
      bodyLengthMm: '7–10 mm (body)',
      colors: ['Fawn brown', 'Tan', 'Dark brown violin marking'],
      keyFeatures: [
        'Distinct dark violin/fiddle motif behind head',
        'Uniformly colored slender legs without bands',
        'Only 6 eyes instead of 8',
      ],
    },
    imageUrls: [
      '/images/morocco/mediterranean-recluse/mediterranean-recluse-1.jpg',
      '/images/morocco/mediterranean-recluse/mediterranean-recluse-2.jpg',
    ],
  },
  {
    scientificName: 'Macrothele calpeiana',
    commonName: 'Gibraltar & Moroccan funnel-web spider',
    family: 'Macrothelidae',
    genus: 'Macrothele',
    toxicityLevel: 'danger' as const,
    description:
      'One of the largest spiders in North Africa and Europe. Large, robust, glossy jet-black spider with long rear spinnerets that weaves extensive funnel sheets under cork oaks and rocks.',
    habitat: 'Cork oak forests, rocky ravines, olive groves, and wooded mountain slopes.',
    distribution: 'Northern Morocco (Rif mountains, Chefchaouen, Tetouan, Tangier) and Southern Iberian Peninsula.',
    behavior: 'Defensive when disturbed; raises front legs and exposes large downward-facing fangs.',
    venomInfo:
      'Delivers a painful, deep mechanical bite due to large chelicerae. Mildly toxic to humans, causing burning pain, swelling, and localized redness.',
    firstAid:
      'Disinfect bite site with antiseptic. Apply cold compress for swelling and monitor for infection.',
    conservationStatus: 'Protected Species (EU Habitats Directive)',
    morphology: {
      eyePattern: 'Compact central eye cluster',
      bodyLengthMm: '25–40 mm (female)',
      colors: ['Jet glossy black', 'Dark chocolate brown abdomen'],
      keyFeatures: [
        'Very large robust black body',
        'Exceptionally long rear spinnerets',
        'Large funnel-shaped retreat under rocks or logs',
      ],
    },
    imageUrls: [
      '/images/morocco/moroccan-funnel-web/moroccan-funnel-web-1.jpg',
      '/images/morocco/moroccan-funnel-web/moroccan-funnel-web-2.jpg',
    ],
  },
  {
    scientificName: 'Hogna radiata',
    commonName: 'Radiated wolf spider',
    family: 'Lycosidae',
    genus: 'Hogna',
    toxicityLevel: 'mild' as const,
    description:
      'Large, athletic ground spider featuring radiating dark stripes from the center of its head. Active nocturnal hunter that stalks prey with excellent forward vision.',
    habitat: 'Dry stony pastures, gardens, wheat fields, and roadsides.',
    distribution: 'Ubiquitous across Morocco from coastal plains to Middle and High Atlas foothills.',
    behavior: 'Active ground sprinter; does not construct webs. Females carry egg sacs attached to their spinnerets.',
    venomInfo:
      'Mild venom harmless to humans. Bite causes localized brief stinging similar to a bee sting.',
    firstAid: 'Wash with clean water and apply soothing antiseptic cream.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: 'Large prominent forward-facing posterior median eyes',
      bodyLengthMm: '18–25 mm',
      colors: ['Grey-brown', 'Yellowish radiating lines', 'Spotted underside'],
      keyFeatures: [
        'Radiating spoke-like stripes on carapace',
        'Stocky strong hairy legs',
        'Fast running gait across open ground',
      ],
    },
    imageUrls: [
      '/images/morocco/wolf-spider/wolf-spider-1.jpg',
      '/images/morocco/wolf-spider/wolf-spider-2.jpg',
    ],
  },
];
