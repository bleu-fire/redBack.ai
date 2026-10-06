import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { config } from '../config/env';
import Species from '../modules/species/species.model';
import { embeddingService } from '../services/ai/embedding.service';
import { pineconeService } from '../config/pinecone';

const moroccanSpiders = [
  {
    scientificName: 'Latrodectus tredecimguttatus',
    commonName: 'Mediterranean black widow (الأرملة السوداء المتوسطية)',
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
    commonName: 'Mediterranean recluse spider (عنكبوت الكمان / الناسك)',
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
    commonName: 'Gibraltar & Moroccan funnel-web spider (عنكبوت القمع المغربي)',
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
    commonName: 'Radiated wolf spider (عنكبوت الذئب المشع)',
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
  {
    scientificName: 'Argiope lobata',
    commonName: 'Lobed argiope / Silver sun spider (عنكبوت الشمس الفضي الفصي)',
    family: 'Araneidae',
    genus: 'Argiope',
    toxicityLevel: 'harmless' as const,
    description:
      'Striking large orb-weaver with a silver-white scalloped, lobed abdomen. Spins massive vertical circular webs in open sunny scrubland with silk zigzag stabilimenta.',
    habitat: 'Coastal dunes, arid scrub, prickly pear cacti, and olive orchards.',
    distribution: 'Common throughout coastal and semi-arid regions of Morocco (Essaouira, Agadir, Souss valley).',
    behavior: 'Sits head-down at the web center with legs arranged in pairs forming an X.',
    venomInfo: 'Harmless to humans. Beneficial predator controlling grasshoppers and flies.',
    firstAid: 'Clean site with soap and water if accidentally bitten.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: '8 eyes in curved rows',
      bodyLengthMm: '18–25 mm (female)',
      colors: ['Silver white', 'Yellow and black markings', 'Lobed edges'],
      keyFeatures: [
        'Unique deeply scalloped lobed abdominal margins',
        'Brilliant silvery reflective dorsal surface',
        'Large circular orb web with zigzag silk cross',
      ],
    },
    imageUrls: [
      '/images/morocco/lobed-argiope/lobed-argiope-1.jpg',
      '/images/morocco/lobed-argiope/lobed-argiope-2.jpg',
    ],
  },
  {
    scientificName: 'Eusparassus dufouri',
    commonName: 'Mediterranean huntsman spider (عنكبوت الصياد المتوسطي)',
    family: 'Sparassidae',
    genus: 'Eusparassus',
    toxicityLevel: 'mild' as const,
    description:
      'Large, flat, exceptionally fast huntsman spider. Lives under bark and rock crevices, occasionally wandering onto house walls on warm summer nights.',
    habitat: 'Stony arid areas, dry olive groves, stone walls, and rocky slopes.',
    distribution: 'Widespread across Morocco, including Mediterranean and Atlantic coasts and pre-Saharan zones.',
    behavior: 'Nocturnal ambush hunter that catches beetles and roaches. Fast crab-like sideways sprint.',
    venomInfo: 'Mild venom. Bite is non-lethal and causes temporary mild local ache.',
    firstAid: 'Wash with soap and apply ice compress.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: 'Two forward rows of 4 eyes',
      bodyLengthMm: '20–28 mm',
      colors: ['Sandy fawn', 'Grey mottled with dark spots', 'Black band on ventral abdomen'],
      keyFeatures: [
        'Laterigrade crab-style legs',
        'Flattened profile adapted for narrow crevices',
        'Prominent black marking on belly',
      ],
    },
    imageUrls: [
      '/images/morocco/moroccan-huntsman/moroccan-huntsman-1.jpg',
      '/images/morocco/moroccan-huntsman/moroccan-huntsman-2.jpg',
    ],
  },
  {
    scientificName: 'Menemerus semilimbatus',
    commonName: 'Mediterranean jumping spider (العنكبوت القفاز الشائع)',
    family: 'Salticidae',
    genus: 'Menemerus',
    toxicityLevel: 'harmless' as const,
    description:
      'Charming, inquisitive small jumping spider commonly seen patrolling sunlit exterior walls of Moroccan houses. Recognizable by its huge forward-facing camera-like eyes and fuzzy white facial mustache.',
    habitat: 'Sunlit stucco walls, window sills, tree trunks, and garden fences.',
    distribution: 'Found across all Moroccan urban and rural areas.',
    behavior: 'Diurnal active hunter with 360-degree vision. Stalks flies and leaps with precision.',
    venomInfo: 'Completely non-venomous and harmless to humans.',
    firstAid: 'No treatment necessary.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: 'Two massive forward-facing central eyes providing stereoscopic color vision',
      bodyLengthMm: '6–9 mm',
      colors: ['Grey-brown', 'White crescent borders', 'White pedipalps'],
      keyFeatures: [
        'Huge expressive forward-facing eyes',
        'Flat hairy body hugging wall surfaces',
        'Agile jumping movement without webs',
      ],
    },
    imageUrls: [
      '/images/morocco/jumping-spider/jumping-spider-1.jpg',
      '/images/morocco/jumping-spider/jumping-spider-2.jpg',
    ],
  },
  {
    scientificName: 'Uroctea durandi',
    commonName: 'Mediterranean star spider (عنكبوت النجمة المتوسطي)',
    family: 'Oecobiidae',
    genus: 'Uroctea',
    toxicityLevel: 'harmless' as const,
    description:
      'Unique, flattened Mediterranean spider that constructs tent-like silk canopies under stones with radial tripwires. Its dark rounded abdomen displays five distinct bright yellow/orange spots resembling a star pattern.',
    habitat: 'Under flat stones and rock slabs in sunny Mediterranean hillsides and maquis.',
    distribution: 'Mediterranean Morocco and Atlas mountains.',
    behavior: 'Constructs a silk tent with 5–6 exits; ambushes passing ants and beetles.',
    venomInfo: 'Non-toxic to humans.',
    firstAid: 'Wash with water if bitten.',
    conservationStatus: 'Least Concern',
    morphology: {
      eyePattern: 'Compact eye group on anterior carapace',
      bodyLengthMm: '12–16 mm',
      colors: ['Velvety dark brown/black', '5 pale yellow/orange round spots'],
      keyFeatures: [
        'Distinctive 5 yellow spots on dark abdomen',
        'Tent-like silk canopy under rocks',
        'Large feathered anal tubercle with spinnerets',
      ],
    },
    imageUrls: [
      '/images/morocco/star-spider/star-spider-1.jpg',
      '/images/morocco/star-spider/star-spider-2.jpg',
    ],
  },
];

async function seedMoroccanSpecies() {
  console.log('========================================================');
  console.log('🇲🇦 redBack.ai - Moroccan Spider Species Indexer');
  console.log('Gemini Embedder: gemini-embedding-001 (512-D)');
  console.log('========================================================\n');

  try {
    // 1. Connect MongoDB
    console.log('[1/4] Connecting to MongoDB...');
    await mongoose.connect(config.mongoUri);
    console.log('      ✅ Connected to MongoDB at', config.mongoUri);

    const vectorIndexMap: Record<string, { scientificName: string; commonName: string; vector: number[]; toxicity: string }> = {};

    console.log('\n[2/4] Generating Gemini Vector Embeddings & Indexing Species...');
    for (const spider of moroccanSpiders) {
      // Build rich descriptive semantic profile
      const profile = `${spider.commonName} (${spider.scientificName}) ${spider.family} ${spider.genus}. ${spider.description} Habitat: ${spider.habitat}. Features: ${spider.morphology.keyFeatures.join(', ')}. Colors: ${spider.morphology.colors.join(', ')}.`;

      process.stdout.write(`  🕷️ Embedding "${spider.commonName}"... `);
      const vector = await embeddingService.generateEmbedding(profile);
      console.log(`✅ [${vector.length}-D]`);

      // Upsert into MongoDB
      const doc = await Species.findOneAndUpdate(
        { scientificName: spider.scientificName },
        { ...spider, vectorId: spider.scientificName },
        { upsert: true, new: true }
      );

      vectorIndexMap[spider.scientificName] = {
        scientificName: spider.scientificName,
        commonName: spider.commonName,
        toxicity: spider.toxicityLevel,
        vector,
      };
    }

    // 3. Save local vector index file for sub-millisecond in-memory lookups
    console.log('\n[3/4] Saving Local In-Memory Vector Index...');
    const dataDir = path.resolve(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const vectorFilePath = path.join(dataDir, 'morocco-species-vectors.json');
    fs.writeFileSync(vectorFilePath, JSON.stringify(vectorIndexMap, null, 2));
    console.log('      ✅ Saved vector index to:', vectorFilePath);

    // 4. Pinecone Sync (if configured)
    console.log('\n[4/4] Checking Pinecone Vector Database synchronization...');
    if (pineconeService.isConfigured()) {
      console.log('      Syncing with Pinecone cloud index...');
      const pineconeRecords = Object.values(vectorIndexMap).map((item) => ({
        id: item.scientificName,
        values: item.vector,
        metadata: {
          scientificName: item.scientificName,
          commonName: item.commonName,
          toxicityLevel: item.toxicity,
          region: ['Morocco', 'North Africa'],
        },
      }));
      await pineconeService.upsertVectors(pineconeRecords);
      console.log('      ✅ Pinecone synchronized!');
    } else {
      console.log('      ℹ️ Pinecone not configured in .env. Local vector matcher active.');
    }

    console.log('\n========================================================');
    console.log('🎉 Moroccan Spider Knowledge Base & Vector Index Ready!');
    console.log(`Indexed: ${moroccanSpiders.length} species with Gemini Embeddings.`);
    console.log('========================================================');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error indexing Moroccan spider species:', err);
    process.exit(1);
  }
}

seedMoroccanSpecies();
