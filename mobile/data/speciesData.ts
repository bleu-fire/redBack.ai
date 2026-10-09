export interface SpeciesDetail {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  genus: string;
  region: 'Morocco' | 'Australia';
  category: 'Venomous' | 'Harmless' | 'Jumping' | 'Funnel-web' | 'Orb-weaver' | 'Wolf' | 'Trapdoor';
  toxicityLevel: 'deadly' | 'danger' | 'mild' | 'harmless';
  badgeText: string;
  badgeType: 'danger' | 'moss' | 'gold';
  serverImage?: string;
  localImageFallback: any;
  description: string;
  habitat: string;
  distribution: string;
  behavior: string;
  venomInfo: string;
  firstAid: string;
  size: string;
  lifespan: string;
  diet: string;
  activity: string;
  morphology: {
    eyePattern: string;
    bodyLengthMm: string;
    colors: string[];
    keyFeatures: string[];
  };
  confusionWith?: string[];
}

export const SPECIES_CATALOG: SpeciesDetail[] = [
  // --- MOROCCAN SPECIES (8 Species) ---
  {
    id: 'latrodectus-tredecimguttatus',
    name: 'Mediterranean Black Widow',
    scientificName: 'Latrodectus tredecimguttatus',
    family: 'Theridiidae',
    genus: 'Latrodectus',
    region: 'Morocco',
    category: 'Venomous',
    toxicityLevel: 'deadly',
    badgeText: 'Deadly',
    badgeType: 'danger',
    serverImage: '/images/morocco/mediterranean-black-widow/mediterranean-black-widow-1.jpg',
    localImageFallback: require('@/assets/images/spider-3d.png'),
    description:
      'The Mediterranean black widow (Malmignatte) is the most medically significant venomous spider in Morocco and North Africa. Females feature a glossy black globular abdomen adorned with 13 vivid orange-red spots, occasionally bordered with fine white rings.',
    habitat: 'Arid scrublands, wheat fields, dry stone walls, and sheltered burrows under olive groves.',
    distribution: 'Widespread across Morocco: Chaouia plains, Marrakech-Safi, Souss-Massa, and Mediterranean coastal slopes.',
    behavior: 'Constructs tangled cobwebs close to the ground. Extremely shy and non-aggressive; bites only when pressed against skin.',
    venomInfo:
      'Potent neurotoxic alpha-latrotoxin causing severe systemic latrodectism: excruciating abdominal muscle cramps, profuse diaphoresis, and hypertension.',
    firstAid:
      'Keep patient calm and still. Apply a cold pack wrapped in cloth. Do NOT apply a tourniquet. Transfer urgently to hospital emergency care or contact the Moroccan Anti-Poison Center (CAPM: 0537-68-64-64).',
    size: '10–15 mm (female)',
    lifespan: '1–3 years',
    diet: 'Grasshoppers, beetles, crawling insects',
    activity: 'Nocturnal',
    morphology: {
      eyePattern: '8 small eyes in two parallel rows',
      bodyLengthMm: '10–15 mm (female), 4–7 mm (male)',
      colors: ['Glossy black', '13 red/orange spots', 'Fine white borders'],
      keyFeatures: [
        'Globular pea-sized black abdomen with 13 red spots',
        'Irregular tangled ground web',
        'Long slender black legs',
      ],
    },
  },
  {
    id: 'loxosceles-rufescens',
    name: 'Mediterranean Recluse Spider',
    scientificName: 'Loxosceles rufescens',
    family: 'Sicariidae',
    genus: 'Loxosceles',
    region: 'Morocco',
    category: 'Venomous',
    toxicityLevel: 'danger',
    badgeText: 'Danger',
    badgeType: 'danger',
    serverImage: '/images/morocco/mediterranean-recluse/mediterranean-recluse-1.jpg',
    localImageFallback: require('@/assets/images/spider-bg.png'),
    description:
      'A medium-sized yellowish-tan spider commonly found in Moroccan dwellings. Widely known as the violin spider due to the unmistakable dark fiddle motif on its carapace and having only 6 eyes in 3 dyads.',
    habitat: 'Inside buildings, behind furniture, baseboards, dark closets, cellars, and stone piles.',
    distribution: 'Every major Moroccan metropolitan center including Casablanca, Fes, Tangier, Rabat, and Marrakech.',
    behavior: 'Reclusive nocturnal prowler. Hides during daylight hours and bites defensively when crushed in sheets or shoes.',
    venomInfo:
      'Cytotoxic sphingomyelinase D venom causing dermonecrotic loxoscelism: localized tissue ulceration and slow-healing necrosis.',
    firstAid:
      'Clean bite thoroughly with antiseptic soap and cool water. Apply cold compress and elevate the affected limb. Seek medical evaluation promptly.',
    size: '7–10 mm (body)',
    lifespan: '1–2 years',
    diet: 'Silverfish, roaches, small insects',
    activity: 'Nocturnal',
    morphology: {
      eyePattern: '6 eyes arranged in three distinct pairs (dyads)',
      bodyLengthMm: '7–10 mm',
      colors: ['Tan', 'Fawn brown', 'Dark brown violin marking'],
      keyFeatures: [
        'Violin marking on cephalothorax',
        'Slender uniformly colored legs with no banding',
        '6 eyes instead of standard 8',
      ],
    },
  },
  {
    id: 'macrothele-calpeiana',
    name: 'Moroccan Funnel-Web Spider',
    scientificName: 'Macrothele calpeiana',
    family: 'Macrothelidae',
    genus: 'Macrothele',
    region: 'Morocco',
    category: 'Funnel-web',
    toxicityLevel: 'danger',
    badgeText: 'Protected',
    badgeType: 'gold',
    serverImage: '/images/morocco/moroccan-funnel-web/moroccan-funnel-web-1.jpg',
    localImageFallback: require('@/assets/images/spider-bg.png'),
    description:
      'One of the largest spiders in the Mediterranean basin. A heavy-bodied, glossy jet-black funnel-web spider with exceptionally long rear spinnerets. It is legally protected across parts of its European and North African range.',
    habitat: 'Cork oak forests, mountain gorges, olive groves, and damp rock fissures.',
    distribution: 'Northern Morocco: Rif Mountains, Chefchaouen, Tetouan, and Tangier peninsula.',
    behavior: 'Constructs dense sheet funnels under boulders and fallen logs. Rears up aggressively with raised fangs when disturbed.',
    venomInfo:
      'Mechanical puncture is painful due to large chelicerae. Venom causes localized burning pain, erythema, and mild swelling.',
    firstAid:
      'Wash thoroughly with antiseptic. Apply cold compress to reduce swelling. Monitor for secondary bacterial infection.',
    size: '25–40 mm (female)',
    lifespan: '4–7 years',
    diet: 'Large beetles, millipedes, crickets',
    activity: 'Nocturnal',
    morphology: {
      eyePattern: 'Compact central tubercle',
      bodyLengthMm: '25–40 mm',
      colors: ['Glossy jet black', 'Dark chocolate abdomen'],
      keyFeatures: [
        'Very large robust dark body',
        'Prominent elongated rear spinnerets',
        'Extensive silk retreat under rocks',
      ],
    },
  },
  {
    id: 'argiope-lobata',
    name: 'Lobed Argiope',
    scientificName: 'Argiope lobata',
    family: 'Araneidae',
    genus: 'Argiope',
    region: 'Morocco',
    category: 'Orb-weaver',
    toxicityLevel: 'harmless',
    badgeText: 'Harmless',
    badgeType: 'moss',
    serverImage: '/images/morocco/lobed-argiope/lobed-argiope-1.jpg',
    localImageFallback: require('@/assets/images/spider-3d.png'),
    description:
      'A spectacular orb-weaver with deeply scalloped, scalloped lobed abdominal margins. Silvery-white dorsal carapace reflects intense desert sunlight.',
    habitat: 'Arid meadows, coastal dunes, xerophytic scrub, and agricultural borders.',
    distribution: 'Throughout Morocco, especially coastal regions from Tangier down to Agadir and inland valleys.',
    behavior: 'Spins large vertical orb webs decorated with a bold zigzag silk stabilimentum. Hangs head-down at web center.',
    venomInfo: 'Harmless to humans. Mild venom adapted solely for immobilizing flying insects.',
    firstAid: 'No medical treatment necessary. Mild redness fades within minutes.',
    size: '18–25 mm (female)',
    lifespan: '1 year',
    diet: 'Grasshoppers, wasps, flying beetles',
    activity: 'Diurnal',
    morphology: {
      eyePattern: '8 eyes in curved rows',
      bodyLengthMm: '18–25 mm',
      colors: ['Silvery white', 'Yellow and black scalloped lobes'],
      keyFeatures: [
        'Deeply scalloped, lobed abdomen',
        'Zigzag silk stabilimentum in web center',
        'Legs banded in black and gold',
      ],
    },
  },
  {
    id: 'hogna-radiata',
    name: 'Radiated Wolf Spider',
    scientificName: 'Hogna radiata',
    family: 'Lycosidae',
    genus: 'Hogna',
    region: 'Morocco',
    category: 'Wolf',
    toxicityLevel: 'harmless',
    badgeText: 'Harmless',
    badgeType: 'moss',
    serverImage: '/images/morocco/radiated-wolf-spider/radiated-wolf-spider-1.jpg',
    localImageFallback: require('@/assets/images/spider-logo-3d.png'),
    description:
      'A large, agile ground spider with radiating dark lines on the carapace. Females carry their egg sac attached to their spinnerets and transport hatchlings on their backs.',
    habitat: 'Dry open ground, olive orchards, gardens, and sandy river beds.',
    distribution: 'Common throughout northern and central Morocco, Middle Atlas and coastal plains.',
    behavior: 'Active nocturnal cursorial hunter. Does not spin capture webs; chases down insects with immense speed.',
    venomInfo: 'Mild venom. Bite feels similar to a mild bee sting with minor localized redness.',
    firstAid: 'Wash with soap and water. Cold compress if irritated.',
    size: '15–25 mm',
    lifespan: '1–2 years',
    diet: 'Crickets, grasshoppers, ground beetles',
    activity: 'Nocturnal / crepuscular',
    morphology: {
      eyePattern: '8 eyes with two large forward-facing anterior median eyes',
      bodyLengthMm: '15–25 mm',
      colors: ['Fawn grey', 'Dark radiating radial lines on carapace'],
      keyFeatures: [
        'Radiating spoke lines on carapace',
        'Powerful cursorial running legs',
        'Mother carries spiderlings on dorsal abdomen',
      ],
    },
  },
  {
    id: 'menemerus-semilimbatus',
    name: 'Moroccan Wall Jumping Spider',
    scientificName: 'Menemerus semilimbatus',
    family: 'Salticidae',
    genus: 'Menemerus',
    region: 'Morocco',
    category: 'Jumping',
    toxicityLevel: 'harmless',
    badgeText: 'Harmless',
    badgeType: 'moss',
    serverImage: '/images/morocco/menemerus-jumping-spider/menemerus-jumping-spider-1.jpg',
    localImageFallback: require('@/assets/images/spider-logo-3d.png'),
    description:
      'A charismatic, fuzzy jumping spider ubiquitous on sun-warmed walls across Moroccan riads and cities. Possesses exceptional binocular stereoscopic vision with massive anterior eyes.',
    habitat: 'Sunlit exterior walls, stucco buildings, patios, and stone fences.',
    distribution: 'Extremely abundant across all Moroccan urban and rural settlements.',
    behavior: 'Curious, day-active hunter. Stalks flies and leaps with pinpoint hydraulic accuracy using silk dragline.',
    venomInfo: 'Completely harmless to humans. Incapable of piercing human skin.',
    firstAid: 'None needed. Safe, beneficial household predator.',
    size: '6–9 mm',
    lifespan: '1 year',
    diet: 'Houseflies, mosquitoes, small gnats',
    activity: 'Diurnal (sun lover)',
    morphology: {
      eyePattern: 'Enormous forward-facing headlights (Salticid layout)',
      bodyLengthMm: '6–9 mm',
      colors: ['Flecked grey', 'White border around carapace', 'Tan chevrons'],
      keyFeatures: [
        'Huge expressive anterior median eyes',
        'Fuzzy flat body adapted for walls',
        'Agile stalking and jumping motion',
      ],
    },
  },
  {
    id: 'moggridgea-pseudocrinita',
    name: 'Moroccan Trapdoor Spider',
    scientificName: 'Moggridgea pseudocrinita',
    family: 'Migidae',
    genus: 'Moggridgea',
    region: 'Morocco',
    category: 'Trapdoor',
    toxicityLevel: 'harmless',
    badgeText: 'Rare',
    badgeType: 'gold',
    serverImage: '/images/morocco/moggridgea-trapdoor/moggridgea-trapdoor-1.jpg',
    localImageFallback: require('@/assets/images/spider-bg.png'),
    description:
      'An ancient lineage mygalomorph spider that excavates subterranean tubular burrows sealed with a camouflaged hinged cork door crafted from silk and soil moss.',
    habitat: 'Mossy earthen banks, shaded ravines, and humid mountain slopes of the Rif and Atlas.',
    distribution: 'Endemic and localized to specialized humid microhabitats in northern Morocco.',
    behavior: 'Sedentary ambusher. Sits behind cracked door sensing vibrations through radial trip lines.',
    venomInfo: 'Mild venom. Non-aggressive and non-toxic to humans.',
    firstAid: 'Clean bite site if mechanically punctured.',
    size: '12–18 mm',
    lifespan: '5–10 years',
    diet: 'Ground invertebrates, ants, beetles',
    activity: 'Nocturnal',
    morphology: {
      eyePattern: 'Compact eye cluster on front carapace',
      bodyLengthMm: '12–18 mm',
      colors: ['Chestnut brown', 'Dark polished carapace'],
      keyFeatures: [
        'Stocky mygalomorph fangs pointing downwards',
        'Short stout digging legs',
        'Hinged wafer door burrow',
      ],
    },
  },
  {
    id: 'uroctea-durandi',
    name: 'European Tent-Web Spider',
    scientificName: 'Uroctea durandi',
    family: 'Oecobiidae',
    genus: 'Uroctea',
    region: 'Morocco',
    category: 'Harmless',
    toxicityLevel: 'harmless',
    badgeText: 'Harmless',
    badgeType: 'moss',
    serverImage: '/images/morocco/uroctea-tent-web/uroctea-tent-web-1.jpg',
    localImageFallback: require('@/assets/images/spider-bg.png'),
    description:
      'A distinctive Mediterranean spider with an oval flattened abdomen bearing 5 conspicuous cream-yellow spots. Builds a circular tent-like silk pavilion under flat rocks.',
    habitat: 'Rocky hillsides, under flat limestone slabs, dry garrigue scrub.',
    distribution: 'Atlas mountain foothills and Mediterranean coastal plains.',
    behavior: 'Constructs a five-to-six cornered tent held with tension trip cords radiating outward.',
    venomInfo: 'Harmless to humans. Mild venom.',
    firstAid: 'No action required.',
    size: '10–16 mm',
    lifespan: '2 years',
    diet: 'Ants, silverfish, small ground insects',
    activity: 'Nocturnal',
    morphology: {
      eyePattern: '8 compact eyes',
      bodyLengthMm: '10–16 mm',
      colors: ['Jet black to dark grey', '5 yellow/cream spots on abdomen'],
      keyFeatures: [
        'Flattened disc-like body',
        '5 cream spots on dorsal abdomen',
        'Star-like silk tent shelter',
      ],
    },
  },

  // --- AUSTRALIAN SPECIES (8 Species) ---
  {
    id: 'latrodectus-hasselti',
    name: 'Redback Spider',
    scientificName: 'Latrodectus hasselti',
    family: 'Theridiidae',
    genus: 'Latrodectus',
    region: 'Australia',
    category: 'Venomous',
    toxicityLevel: 'danger',
    badgeText: 'Venomous',
    badgeType: 'danger',
    serverImage: '/images/redback/redback-1.jpg',
    localImageFallback: require('@/assets/images/spider-3d.png'),
    description:
      'The redback spider is an iconic Australian venomous species. Recognizable by the spherical black body of the female with a prominent longitudinal crimson stripe on the upper abdomen and an hourglass on the underside.',
    habitat: 'Dry sheltered areas, outdoor sheds, mailboxes, under eaves and garden furniture.',
    distribution: 'Ubiquitous across all Australian states in urban, rural, and bush settings.',
    behavior: 'Constructs irregular, tangled cobwebs. Shy and rarely leaves web unless provoked.',
    venomInfo:
      'Alpha-latrotoxin causing latrodectism: localized excruciating pain, profuse localized sweating, hypertension, and nausea. Highly effective antivenom available nationwide.',
    firstAid:
      'Apply a cold ice pack wrapped in cloth to reduce pain. Do NOT use a pressure immobilization bandage. Seek emergency medical care immediately.',
    size: '10–14 mm (female)',
    lifespan: '2–3 years',
    diet: 'Insects, small lizards caught in web',
    activity: 'Nocturnal',
    morphology: {
      eyePattern: '8 eyes arranged in two rows of 4',
      bodyLengthMm: '10–14 mm (female), 3–4 mm (male)',
      colors: ['Glossy black', 'Crimson red stripe', 'Orange-red hourglass'],
      keyFeatures: [
        'Globose pea-shaped black abdomen',
        'Distinct longitudinal crimson stripe',
        'Irregular tangled web silk',
      ],
    },
  },
  {
    id: 'atrax-robustus',
    name: 'Sydney Funnel-Web Spider',
    scientificName: 'Atrax robustus',
    family: 'Atracidae',
    genus: 'Atrax',
    region: 'Australia',
    category: 'Funnel-web',
    toxicityLevel: 'deadly',
    badgeText: 'Deadly',
    badgeType: 'danger',
    serverImage: '/images/funnel-web/funnel-web-1.jpg',
    localImageFallback: require('@/assets/images/spider-bg.png'),
    description:
      'One of the worlds most dangerous spiders. Robust, stocky dark brown to jet-black body with a hairless glossy carapace and large downward-pointing fangs.',
    habitat: 'Moist sheltered burrows under logs, rocks, and suburban Sydney gardens.',
    distribution: 'Within a 160 km radius of Sydney, New South Wales, Australia.',
    behavior: 'Aggressive when threatened; raises forelegs and displays venom drops on fangs.',
    venomInfo:
      'Delta-atracotoxin neurotoxin attacking the nervous system, causing rapid autonomic storm. Potentially fatal within hours without antivenom.',
    firstAid:
      'Apply a firm Pressure Immobilization Bandage (PIB) over the entire bitten limb immediately, exactly as for a snakebite. Keep victim completely still and call emergency services (000) instantly.',
    size: '15–35 mm',
    lifespan: 'Up to 20 years (females)',
    diet: 'Beetles, cockroaches, small vertebrates',
    activity: 'Nocturnal',
    morphology: {
      eyePattern: 'Compact eye cluster on elevated tubercle',
      bodyLengthMm: '15–35 mm',
      colors: ['Glossy jet-black', 'Dark plum/brown abdomen'],
      keyFeatures: [
        'Smooth glossy hairless carapace',
        'Downward-pointing large fangs',
        'Funnel-shaped silk tripwire burrow',
      ],
    },
  },
  {
    id: 'heteropoda-venatoria',
    name: 'Huntsman Spider',
    scientificName: 'Heteropoda venatoria',
    family: 'Sparassidae',
    genus: 'Heteropoda',
    region: 'Australia',
    category: 'Harmless',
    toxicityLevel: 'harmless',
    badgeText: 'Common',
    badgeType: 'moss',
    serverImage: '/images/huntsman/huntsman-1.jpg',
    localImageFallback: require('@/assets/images/spider-bg.png'),
    description:
      'Large, flat-bodied spider renowned for its immense leg-span and fast crab-like sideways movement. Gentle insect predator beneficial to homes.',
    habitat: 'Under loose tree bark, rock crevices, and occasionally behind indoor picture frames.',
    distribution: 'Widespread across Australia and tropical/subtropical regions.',
    behavior: 'Active nocturnal hunter that does not build webs; stalks prey with superb speed.',
    venomInfo:
      'Mild venom. Bite may cause temporary local soreness or mild swelling, but is not medically dangerous.',
    firstAid: 'Wash bite site with soap and water. Apply a cold compress to relieve discomfort.',
    size: '20–30 mm body (up to 150 mm legspan)',
    lifespan: '2 years',
    diet: 'Cockroaches, moths, house insects',
    activity: 'Nocturnal',
    morphology: {
      eyePattern: 'Two forward-facing rows of 4 eyes each',
      bodyLengthMm: '20–30 mm',
      colors: ['Mottled grey', 'Brown', 'Fawn'],
      keyFeatures: [
        'Laterigrade crab-like legs extending sideways',
        'Flattened body for narrow crevices',
        'Extremely rapid sprint speed',
      ],
    },
  },
  {
    id: 'missulena-occatoria',
    name: 'Red-Headed Mouse Spider',
    scientificName: 'Missulena occatoria',
    family: 'Actinopodidae',
    genus: 'Missulena',
    region: 'Australia',
    category: 'Venomous',
    toxicityLevel: 'danger',
    badgeText: 'Danger',
    badgeType: 'danger',
    serverImage: '/images/mouse-spider/mouse-spider-1.jpg',
    localImageFallback: require('@/assets/images/spider-3d.png'),
    description:
      'Stocky, robust ground spider with a wide head and prominent fangs. Males feature a bright crimson-red cephalothorax and gunmetal blue abdomen.',
    habitat: 'Open forest, woodland, and suburban lawns in silk-lined trapdoor burrows.',
    distribution: 'Across mainland Australia from western slopes to coastal areas.',
    behavior: 'Males wander during daylight after rain seeking females; can be defensive.',
    venomInfo:
      'Potent neurotoxin similar to funnel-web venom. May cause severe systemic envenomation. Responds effectively to funnel-web antivenom.',
    firstAid:
      'Apply Pressure Immobilization Bandage (PIB) and seek immediate emergency medical care.',
    size: '15–30 mm',
    lifespan: '10–15 years',
    diet: 'Insects, small skinks',
    activity: 'Diurnal wandering (males), nocturnal (females)',
    morphology: {
      eyePattern: 'Eyes widely spaced across the front',
      bodyLengthMm: '15–30 mm',
      colors: ['Bright crimson head (male)', 'Gunmetal blue abdomen', 'Glossy black (female)'],
      keyFeatures: [
        'Bulbous brightly colored head',
        'Massive vertical downward fangs',
        'Deep burrow with oval trapdoors',
      ],
    },
  },
  {
    id: 'badumna-insignis',
    name: 'Black House Spider',
    scientificName: 'Badumna insignis',
    family: 'Desidae',
    genus: 'Badumna',
    region: 'Australia',
    category: 'Harmless',
    toxicityLevel: 'mild',
    badgeText: 'Mild',
    badgeType: 'gold',
    serverImage: '/images/black-house-spider/black-house-spider-1.jpg',
    localImageFallback: require('@/assets/images/spider-bg.png'),
    description:
      'Dark, robust spider that builds untidy lacy webs with characteristic funnel-like entrance holes around window corners and fence posts.',
    habitat: 'Window corners, tree trunks, gutters, sheds, and brick walls.',
    distribution: 'Widespread across southern and eastern Australia.',
    behavior: 'Timid and rarely leaves the silk retreat; rushes out only to snare entangled insects.',
    venomInfo: 'Mildly toxic. May cause localized pain, mild swelling, and occasional nausea in sensitive individuals.',
    firstAid: 'Wash with antiseptic soap. Apply ice pack to relieve pain.',
    size: '12–18 mm',
    lifespan: '2 years',
    diet: 'Flies, beetles, moths',
    activity: 'Nocturnal',
    morphology: {
      eyePattern: '8 eyes in two rows',
      bodyLengthMm: '12–18 mm',
      colors: ['Dark charcoal black', 'Velvety grey abdomen'],
      keyFeatures: [
        'Untidy lacy silk web with round tunnel entrance',
        'Velvety dark body',
        'Squat sturdy legs',
      ],
    },
  },
  {
    id: 'trichonephila-plumipes',
    name: 'Golden Orb-Weaver',
    scientificName: 'Trichonephila plumipes',
    family: 'Araneidae',
    genus: 'Trichonephila',
    region: 'Australia',
    category: 'Orb-weaver',
    toxicityLevel: 'harmless',
    badgeText: 'Harmless',
    badgeType: 'moss',
    serverImage: '/images/st-andrews-cross/st-andrews-cross-1.jpg',
    localImageFallback: require('@/assets/images/spider-3d.png'),
    description:
      'Renowned for weaving enormous golden-yellow webs up to 1.5 meters wide between trees. Female has distinctive tufts of black bristles on long yellow-banded legs.',
    habitat: 'Coastal bushland, suburban parks, and rainforest fringes.',
    distribution: 'Eastern Australia from Queensland to coastal New South Wales.',
    behavior: 'Maintains permanent giant aerial web in high light canopies. Non-aggressive.',
    venomInfo: 'Harmless to humans. Mild localized reaction if bitten defensively.',
    firstAid: 'Wash with soap and cold water.',
    size: '20–35 mm (female)',
    lifespan: '1 year',
    diet: 'Cicadas, dragonflies, large insects',
    activity: 'Diurnal',
    morphology: {
      eyePattern: '8 small eyes',
      bodyLengthMm: '20–35 mm',
      colors: ['Olive grey', 'Yellow banded legs with black hair tufts'],
      keyFeatures: [
        'Golden shimmering silk web',
        'Brushed hair tufts on jointed legs',
        'Large elongated cylindrical abdomen',
      ],
    },
  },
  {
    id: 'araneus-diadematus',
    name: 'Garden Orb-Weaver',
    scientificName: 'Araneus diadematus',
    family: 'Araneidae',
    genus: 'Araneus',
    region: 'Australia',
    category: 'Orb-weaver',
    toxicityLevel: 'harmless',
    badgeText: 'Common',
    badgeType: 'moss',
    serverImage: '/images/garden-orb-weaver/garden-orb-weaver-1.jpg',
    localImageFallback: require('@/assets/images/spider-3d.png'),
    description:
      'Plump, triangular-bodied orb-weaver seen in suburban gardens during late summer and autumn. Spins classic spiral webs each evening and consumes them by dawn.',
    habitat: 'Gardens, shrubs, between tree branches, and verandahs.',
    distribution: 'Temperate regions worldwide and widespread across Australia.',
    behavior: 'Constructs wheel-shaped orb web at dusk. Hides under leaves during peak daytime heat.',
    venomInfo: 'Harmless to humans. Mild bite with minor stinging sensation.',
    firstAid: 'Cold water wash and gentle soothing lotion.',
    size: '12–20 mm',
    lifespan: '1 year',
    diet: 'Moths, flies, mosquitoes',
    activity: 'Nocturnal / crepuscular',
    morphology: {
      eyePattern: '8 eyes in two curved rows',
      bodyLengthMm: '12–20 mm',
      colors: ['Brown', 'Mottled beige', 'Cross-shaped dorsal pattern'],
      keyFeatures: [
        'Classic circular orb web',
        'Stout triangular abdomen',
        'Spiny banded legs',
      ],
    },
  },
  {
    id: 'lampona-cylindrata',
    name: 'White-Tailed Spider',
    scientificName: 'Lampona cylindrata',
    family: 'Lamponidae',
    genus: 'Lampona',
    region: 'Australia',
    category: 'Harmless',
    toxicityLevel: 'mild',
    badgeText: 'Harmless',
    badgeType: 'moss',
    serverImage: '/images/white-tailed/white-tailed-1.jpg',
    localImageFallback: require('@/assets/images/spider-bg.png'),
    description:
      'Cigar-shaped dark reddish-grey spider with a distinctive white spot at the tip of the abdomen. Extensive medical studies have disproven the myth that its bite causes necrotic ulcers.',
    habitat: 'Under tree bark, leaf litter, inside houses behind curtains and in folded laundry.',
    distribution: 'Widespread throughout southern Australia and Tasmania.',
    behavior: 'Specialized nomadic spider predator that hunts other spiders (like black house spiders) at night.',
    venomInfo:
      'Causes short-lived localized stinging pain, red welts, and minor itchiness. Does NOT cause skin necrosis or ulceration.',
    firstAid: 'Wash with soap and water. Apply a cold compress to relieve local irritation.',
    size: '12–18 mm',
    lifespan: '1–2 years',
    diet: 'Other spiders (vagrant predator)',
    activity: 'Nocturnal',
    morphology: {
      eyePattern: '8 eyes in two rows',
      bodyLengthMm: '12–18 mm',
      colors: ['Dark grey to velvety black', 'Distinct white terminal spot'],
      keyFeatures: [
        'Cylindrical cigar-shaped abdomen',
        'Distinct white spot at rear abdomen tip',
        'Banded reddish-brown legs',
      ],
    },
  },
];

export const getSpeciesById = (id: string): SpeciesDetail | undefined => {
  return SPECIES_CATALOG.find(
    (s) =>
      s.id.toLowerCase() === id.toLowerCase() ||
      s.scientificName.toLowerCase() === id.toLowerCase() ||
      s.scientificName.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
  );
};

export interface ClinicalThreatProfile {
  score: 0 | 1 | 2 | 3 | 4 | 5;
  levelTitle: string;
  summary: string;
  humanRisk: string;
  petRisk: string;
  symptomTimeline: string;
  immediateAction: string;
  relocationAdvice: string;
  isMedicalEmergency: boolean;
}

export interface SizeScaleProfile {
  bodyMm: number;
  legSpanMm: number;
  comparisonText: string;
}

export function getClinicalThreat(species: SpeciesDetail): ClinicalThreatProfile {
  const id = species.id.toLowerCase();
  
  if (id.includes('atrax') || id === 'sydney-funnel-web') {
    return {
      score: 5,
      levelTitle: 'Level 5: Critical Neurotoxin',
      summary: 'Rapidly acting delta-atracotoxins targeting cellular ion channels. Requires immediate hospital admission and antivenom.',
      humanRisk: 'Life-threatening medical emergency. Causes profuse sweating, facial grimacing, severe spasms, and pulmonary edema.',
      petRisk: 'Extremely dangerous to primates and dogs. Seek immediate veterinary antivenom.',
      symptomTimeline: '10m: Numbness & tingling ➔ 25m: Heavy sweating & spasms ➔ 1h: Systemic neurotoxic crisis',
      immediateAction: 'Apply firm Pressure Immobilization Bandage (PIB) from digits up the entire limb. Keep patient 100% immobile. Call 000 immediately.',
      relocationAdvice: 'DO NOT attempt to capture with home cups. Species rears into high threat posture and strikes repeatedly. Call professional wildlife handlers.',
      isMedicalEmergency: true,
    };
  }

  if (id.includes('latrodectus') || id.includes('redback') || id.includes('black-widow')) {
    return {
      score: 4,
      levelTitle: 'Level 4: Severe Latrodectism',
      summary: 'Potent presynaptic alpha-latrotoxins causing massive calcium influx and neurotransmitter release throughout the nervous system.',
      humanRisk: 'Excruciating local and regional pain, drenched localized sweating, rigid board-like abdominal spasms, nausea, and hypertension.',
      petRisk: 'Extremely dangerous for domestic cats and small dogs. Seek urgent veterinary evaluation.',
      symptomTimeline: '15m: Burning ache at puncture marks ➔ 45m: Localized sweating & abdominal cramps ➔ 2h: Systemic latrodectism syndrome',
      immediateAction: 'Apply ice pack wrapped in clean cloth to relieve acute pain. NEVER use pressure bandage (it dramatically intensifies local suffering). Call CAPM or 13 11 26.',
      relocationAdvice: 'Shy and slow-moving off their web. Trap using a tall plastic container and stiff cardboard. Never touch tangled cobweb scaffolding with bare hands.',
      isMedicalEmergency: true,
    };
  }

  if (id.includes('loxosceles') || id.includes('recluse')) {
    return {
      score: 3,
      levelTitle: 'Level 3: Cytotoxic Necrosis',
      summary: 'Sphingomyelinase D enzymes degrade cell membranes and microvasculature, leading to localized ischemic tissue necrosis.',
      humanRisk: 'Often painless initial bite. Develops into a painful red blister with central blanching ("bullseye") followed by slow-healing ulceration.',
      petRisk: 'Moderate risk. Causes open cutaneous sores requiring professional wound cleaning and antibiotics.',
      symptomTimeline: '2h: Mild redness ➔ 12h: Blistering with central pallor ➔ 48h: Potential necrotic crater development',
      immediateAction: 'Wash thoroughly with disinfectant soap. Elevate bitten extremity. Apply cool compress (NEVER apply heat pads). Consult a physician within 24h.',
      relocationAdvice: 'Fast runner and photophobic. They hide in dark closets, shoes, and baseboards. Trap quickly with an inverted clear container.',
      isMedicalEmergency: false,
    };
  }

  if (id.includes('macrothele') || id.includes('funnel-web')) {
    return {
      score: 3,
      levelTitle: 'Level 3: Deep Traumatic Bite',
      summary: 'Massive robust fangs deliver high venom volume. Severe mechanical puncture and intense local pain, but not lethal to healthy adults.',
      humanRisk: 'Severe localized pain, deep aching puncture wounds, and transient swelling lasting 6 to 12 hours.',
      petRisk: 'Painful punctures to dogs and cats; monitor for secondary bacterial infection.',
      symptomTimeline: '0m: Instant sharp puncture pain ➔ 30m: Swelling & deep radiating ache ➔ 6h: Gradual subsiding',
      immediateAction: 'Disinfect puncture sites. Apply cool compress and confirm tetanus vaccine booster status.',
      relocationAdvice: 'Strictly protected ecological treasure under Moroccan and European wildlife law. Never kill. Guide gently into a deep box using a soft brush.',
      isMedicalEmergency: false,
    };
  }

  if (id.includes('hogna') || id.includes('wolf') || id.includes('olios') || id.includes('orb-weaver') || id.includes('argiope') || id.includes('lampona')) {
    return {
      score: 1,
      levelTitle: 'Level 1: Mild Wasp-Sting Tier',
      summary: 'Benign predatory venom evolved for insect prey. Incapable of causing systemic medical damage in human beings.',
      humanRisk: 'Localized pinch with transient redness and minor stinging similar to a minor wasp sting, resolving within 30 to 60 minutes.',
      petRisk: 'Safe for pets. Non-toxic to cats and dogs.',
      symptomTimeline: '5m: Local pinch sensation ➔ 20m: Mild pink welt ➔ 1h: Complete spontaneous recovery',
      immediateAction: 'Wash with clean soap and water. Apply a cool damp washcloth if itchy.',
      relocationAdvice: 'Active garden wanderer. Trap using a cup and paper and release into outdoor garden shrubs where it consumes garden insect pests.',
      isMedicalEmergency: false,
    };
  }

  // Level 0: Harmless Friends (Jumping spiders, etc.)
  return {
    score: 0,
    levelTitle: 'Level 0: Harmless Pest Ally',
    summary: 'Completely safe beneficial arachnid. Tiny fangs cannot pierce human skin, or venom has zero effect on mammalian tissue.',
    humanRisk: 'Zero threat to humans. Highly curious, docile species that actively controls mosquitoes and indoor pests.',
    petRisk: '100% safe for cats, dogs, and children.',
    symptomTimeline: 'Zero envenomation. No symptoms possible.',
    immediateAction: 'No action required. Welcome in riads, homes, and patios as free, eco-friendly pest control.',
    relocationAdvice: 'Coax gently onto an open hand or paper. They will calmly walk or hop into a safe garden spot.',
    isMedicalEmergency: false,
  };
}

export function getSizeScale(species: SpeciesDetail): SizeScaleProfile {
  const id = species.id.toLowerCase();
  
  if (id.includes('menemerus') || species.category === 'Jumping') {
    return {
      bodyMm: 8,
      legSpanMm: 14,
      comparisonText: 'Small & compact: easily fits on top of an ordinary fingernail.',
    };
  }
  if (id.includes('latrodectus') || id.includes('redback') || id.includes('black-widow')) {
    return {
      bodyMm: 13,
      legSpanMm: 32,
      comparisonText: 'The round abdomen is the size of a large pea; legs span roughly the diameter of a 1 Dirham / $1 coin.',
    };
  }
  if (id.includes('loxosceles')) {
    return {
      bodyMm: 10,
      legSpanMm: 28,
      comparisonText: 'Slim, violin-shaped body; total leg span sits neatly inside a bottle cap.',
    };
  }
  if (id.includes('atrax') || id === 'sydney-funnel-web') {
    return {
      bodyMm: 38,
      legSpanMm: 68,
      comparisonText: 'Heavy, robust build: span extends across an entire human palm, wider than two coins side-by-side.',
    };
  }
  if (id.includes('macrothele')) {
    return {
      bodyMm: 32,
      legSpanMm: 60,
      comparisonText: 'Impressive deep velvety spider: larger than a matchbox with long spinnerets at the rear.',
    };
  }
  if (id.includes('hogna') || id.includes('wolf')) {
    return {
      bodyMm: 24,
      legSpanMm: 55,
      comparisonText: 'Athletic ground hunter: leg span roughly matches the width of a smartphone screen.',
    };
  }
  if (id.includes('argiope')) {
    return {
      bodyMm: 22,
      legSpanMm: 48,
      comparisonText: 'Distinct lobed silhouette: sits proudly in the center of broad zigzag garden webs.',
    };
  }

  return {
    bodyMm: 16,
    legSpanMm: 35,
    comparisonText: 'Medium garden arachnid: total footprint comparable to an average bottle cap.',
  };
}

