import mongoose from 'mongoose';
import { config } from '../config/env';
import Species from '../modules/species/species.model';
import { embeddingService } from '../services/ai/embedding.service';
import { pineconeService } from '../config/pinecone';

const spiderDataset = [
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

async function seedSpecies() {
  try {
    console.log('[Seed] Connecting to MongoDB at', config.mongoUri);
    await mongoose.connect(config.mongoUri);
    console.log('[Seed] Connected to MongoDB.');

    console.log('[Seed] Seeding Australian Spider Species catalog...');
    const pineconeRecords: Array<{ id: string; values: number[]; metadata: any }> = [];

    for (const data of spiderDataset) {
      // 1. Generate 512-D deterministic taxonomic vector embedding
      const profileText = `${data.scientificName} ${data.commonName} ${data.family} ${data.genus} ${data.description} ${data.morphology.keyFeatures.join(' ')}`;
      const vector = embeddingService.generateDeterministicVector(profileText);

      // 2. Upsert into MongoDB
      const doc = await Species.findOneAndUpdate(
        { scientificName: data.scientificName },
        { ...data, vectorId: data.scientificName },
        { upsert: true, new: true }
      );

      console.log(`✅ Seeded species: ${doc.commonName} (${doc.scientificName})`);

      // 3. Prepare Pinecone record
      pineconeRecords.push({
        id: doc._id.toString(),
        values: vector,
        metadata: {
          speciesId: doc._id.toString(),
          scientificName: doc.scientificName,
          commonName: doc.commonName,
          family: doc.family,
          toxicityLevel: doc.toxicityLevel,
        },
      });
    }

    // 4. Upsert into Pinecone Vector DB (if PINECONE_API_KEY is configured)
    if (pineconeService.isConfigured()) {
      console.log('[Seed] Upserting species vectors into Pinecone...');
      await pineconeService.upsertVectors(pineconeRecords);
      console.log('[Seed] Pinecone vector index synchronized!');
    } else {
      console.log('[Seed] Notice: PINECONE_API_KEY not set in .env. Pinecone sync skipped (local cosine matcher active).');
    }

    console.log('[Seed] Completed successfully! Total species in catalog:', spiderDataset.length);
    process.exit(0);
  } catch (err) {
    console.error('[Seed] Error seeding species database:', err);
    process.exit(1);
  }
}

seedSpecies();
