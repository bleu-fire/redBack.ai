import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Species from '../modules/species/species.model';

const imageMap: Record<string, string[]> = {
  // Australian species
  'latrodectus hasselti': [
    '/images/redback/redback-1.jpg',
    '/images/redback/redback-2.jpg',
    '/images/redback/redback-3.jpg',
  ],
  'atrax robustus': [
    '/images/funnel-web/funnel-web-1.jpg',
    '/images/funnel-web/funnel-web-2.jpg',
    '/images/funnel-web/funnel-web-3.jpg',
  ],
  'heteropoda venatoria': [
    '/images/huntsman/huntsman-1.jpg',
    '/images/huntsman/huntsman-2.jpg',
    '/images/huntsman/huntsman-3.jpg',
  ],
  'missulena occatoria': [
    '/images/mouse-spider/mouse-spider-1.jpg',
    '/images/mouse-spider/mouse-spider-2.jpg',
    '/images/mouse-spider/mouse-spider-3.jpg',
  ],
  'lampona cylindrata': [
    '/images/white-tailed/white-tailed-1.jpg',
    '/images/white-tailed/white-tailed-2.jpg',
    '/images/white-tailed/white-tailed-3.jpg',
  ],
  'hortophora transmarina': [
    '/images/garden-orb-weaver/garden-orb-weaver-1.jpg',
    '/images/garden-orb-weaver/garden-orb-weaver-2.jpg',
    '/images/garden-orb-weaver/garden-orb-weaver-3.jpg',
  ],
  'badumna insignis': [
    '/images/black-house-spider/black-house-spider-1.jpg',
    '/images/black-house-spider/black-house-spider-2.jpg',
    '/images/black-house-spider/black-house-spider-3.jpg',
  ],
  'argiope keyserlingi': [
    '/images/st-andrews-cross/st-andrews-cross-1.jpg',
    '/images/st-andrews-cross/st-andrews-cross-2.jpg',
    '/images/st-andrews-cross/st-andrews-cross-3.jpg',
  ],

  // Moroccan species
  'latrodectus tredecimguttatus': [
    '/images/morocco/mediterranean-black-widow/mediterranean-black-widow-1.jpg',
    '/images/morocco/mediterranean-black-widow/mediterranean-black-widow-2.jpg',
  ],
  'loxosceles rufescens': [
    '/images/morocco/mediterranean-recluse/mediterranean-recluse-1.jpg',
    '/images/morocco/mediterranean-recluse/mediterranean-recluse-2.jpg',
  ],
  'macrothele calpeiana': [
    '/images/morocco/moroccan-funnel-web/moroccan-funnel-web-1.jpg',
    '/images/morocco/moroccan-funnel-web/moroccan-funnel-web-2.jpg',
  ],
  'argiope lobata': [
    '/images/morocco/lobed-argiope/lobed-argiope-1.jpg',
    '/images/morocco/lobed-argiope/lobed-argiope-2.jpg',
  ],
  'hogna radiata': [
    '/images/morocco/wolf-spider/wolf-spider-1.jpg',
    '/images/morocco/wolf-spider/wolf-spider-2.jpg',
  ],
  'cerbalus aravaensis': [
    '/images/morocco/moroccan-huntsman/moroccan-huntsman-1.jpg',
    '/images/morocco/moroccan-huntsman/moroccan-huntsman-2.jpg',
  ],
  'menemerus semilimbatus': [
    '/images/morocco/jumping-spider/jumping-spider-1.jpg',
    '/images/morocco/jumping-spider/jumping-spider-2.jpg',
  ],
  'acanthepeira stellata': [
    '/images/morocco/star-spider/star-spider-1.jpg',
    '/images/morocco/star-spider/star-spider-2.jpg',
  ],
};

async function updateSpeciesImages() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://172.22.11.130:27017/redback_db';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const allSpecies = await Species.find({});
    console.log(`Found ${allSpecies.length} species in database`);

    let updatedCount = 0;
    for (const sp of allSpecies) {
      const key = sp.scientificName.toLowerCase().trim();
      const imgs = imageMap[key];
      if (imgs && imgs.length > 0) {
        sp.imageUrls = imgs;
        await sp.save();
        updatedCount++;
        console.log(`Updated images for ${sp.commonName} (${sp.scientificName}): ${imgs[0]}`);
      }
    }

    console.log(`\nSuccessfully updated real images for ${updatedCount} species!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Failed to update species images:', err);
    process.exit(1);
  }
}

updateSpeciesImages();
