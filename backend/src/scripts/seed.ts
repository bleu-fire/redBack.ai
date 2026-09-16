import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from '../config/env';
import { UserModel } from '../models/user.model';
import { SpeciesModel } from '../models/species.model';
import { LearningTopicModel } from '../models/learning-topic.model';
import { IdentificationModel } from '../models/identification.model';

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(config.mongoUri);
  console.log(' Connected to database:', config.mongoUri);

  // Clear existing collections
  console.log('Clearing existing test data...');
  await Promise.all([
    UserModel.deleteMany({}),
    SpeciesModel.deleteMany({}),
    LearningTopicModel.deleteMany({}),
    IdentificationModel.deleteMany({}),
  ]);

  // 1. Seed Species
  console.log('Seeding Species...');
  const speciesList = await SpeciesModel.insertMany([
    {
      scientificName: 'Latrodectus hasselti',
      commonName: 'Redback Spider',
      family: 'Theridiidae',
      genus: 'Latrodectus',
      description:
        'A highly venomous spider native to Australia, recognizable by the prominent red stripe on the upper abdomen of females.',
      habitat: 'Dry, sheltered areas, urban habitats, sheds, garages, under outdoor furniture.',
      distribution: 'Throughout Australia.',
      behavior: 'Nocturnal, web-building spider. Generally timid unless provoked.',
      venomInfo:
        'Contains latrotoxin causing latrodectism (severe localized pain, sweating, nausea). Antivenom is widely available.',
      conservationStatus: 'Secure / Common',
      imageUrls: ['/assets/images/spider-3d.png'],
    },
    {
      scientificName: 'Atrax robustus',
      commonName: 'Sydney Funnel-Web Spider',
      family: 'Atracidae',
      genus: 'Atrax',
      description:
        'A large, dark, glossy spider known for its potent venom and aggressive defense display with exposed fangs.',
      habitat: 'Moist sheltered burrows in soil, under rocks and logs, suburban gardens.',
      distribution: 'Within a 100km radius of Sydney, New South Wales.',
      behavior: 'Ground-dwelling nocturnal wanderer during mating season.',
      venomInfo:
        'Delta-hexatoxin. Medical emergency; requires immediate pressure immobilisation bandage and antivenom.',
      conservationStatus: 'Secure',
      imageUrls: ['/assets/images/spider-3d.png'],
    },
    {
      scientificName: 'Heteropoda venatoria',
      commonName: 'Huntsman Spider',
      family: 'Sparassidae',
      genus: 'Heteropoda',
      description:
        'Large, flat-bodied spider with long crab-like legs, excellent agile climbers.',
      habitat: 'Under tree bark, rock crevices, often wanders into houses on walls and ceilings.',
      distribution: 'Widespread across coastal and warm regions of Australia.',
      behavior: 'Active nocturnal hunter. Does not build capture webs.',
      venomInfo:
        'Mildly venomous to humans; causes localized swelling and mild pain. Reluctant to bite.',
      conservationStatus: 'Abundant',
      imageUrls: ['/assets/images/spider-3d.png'],
    },
    {
      scientificName: 'Trichonephila edulis',
      commonName: 'Australian Golden Orb-Weaver',
      family: 'Araneidae',
      genus: 'Trichonephila',
      description:
        'Impressive orb-weaver known for large, permanent circular webs made of golden silk.',
      habitat: 'Open forests, woodlands, coastal shrublands, and suburban gardens.',
      distribution: 'Across all Australian mainland states.',
      behavior: 'Diurnal web-dweller, sits head-down in the center of its web waiting for flying insects.',
      venomInfo:
        'Harmless to humans. Bite causes only mild transient local pain and redness.',
      conservationStatus: 'Common',
      imageUrls: ['/assets/images/spider-3d.png'],
    },
  ]);

  // 2. Seed Test User
  console.log('Seeding Test User...');
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);
  const user = await UserModel.create({
    fullname: 'Alex Explorer',
    email: 'explorer@redback.ai',
    passwordHash,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  });

  // 3. Seed Learning Topics
  console.log('Seeding Learning Topics...');
  await LearningTopicModel.insertMany([
    {
      slug: 'spider-anatomy',
      title: 'Spider Anatomy: Look Closer',
      category: 'Anatomy',
      content:
        'Unlike insects which have three body parts, spiders possess two main segments: the cephalothorax (head and thorax fused) and the abdomen. They have eight walking legs, chelicerae (jaws with fangs), pedipalps (sensory feelers), and spinnerets for producing silk.',
      sourceUrl: 'https://australian.museum/learn/animals/spiders/spider-structure/',
    },
    {
      slug: 'first-aid-and-safety',
      title: 'First Aid: Venom & Bite Protocols',
      category: 'Safety',
      content:
        'For Funnel-web spider bites: Apply a firm Pressure Immobilisation Bandage (PIB) immediately, keep the patient still, and call 000. For Redback spider bites: Apply an ice pack or cold compress to relieve pain, do not bandage firmly, and seek medical attention.',
      sourceUrl: 'https://www.health.gov.au/topics/emergency-health-management/spider-bites',
    },
    {
      slug: 'habitat-coexistence',
      title: 'Sharing Habitats: Spiders in Ecosystems',
      category: 'Ecology',
      content:
        'Spiders are crucial ecosystem engineers that control pest insect populations, including mosquitoes, flies, and garden pests. Learn humane relocation techniques using a jar and card.',
      sourceUrl: 'https://www.environment.nsw.gov.au/topics/animals-and-plants/native-animals/native-animal-facts/spiders',
    },
  ]);

  // 4. Seed an Initial Identification
  console.log('Seeding Sample Identification...');
  await IdentificationModel.create({
    userId: user._id,
    imageUrl: '/uploads/sample-redback.jpg',
    status: 'completed',
    predictions: [
      {
        speciesId: speciesList[0]._id,
        scientificName: speciesList[0].scientificName,
        commonName: speciesList[0].commonName,
        confidence: 0.96,
        confidenceBand: 'high',
      },
      {
        speciesId: speciesList[2]._id,
        scientificName: speciesList[2].scientificName,
        commonName: speciesList[2].commonName,
        confidence: 0.65,
        confidenceBand: 'low',
      },
    ],
  });

  console.log(' Database successfully seeded!');
  console.log('Test User Login:');
  console.log('  Email:    explorer@redback.ai');
  console.log('  Password: password123');
  console.log(`Seeded ${speciesList.length} species and 3 learning topics.`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});

