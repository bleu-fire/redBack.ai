import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function fixIdentImages() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://172.22.11.130:27017/redback_db');
  const coll = mongoose.connection.collection('identifications');
  const records = await coll.find({}).toArray();
  console.log('Total identification records:', records.length);

  const speciesImages: Record<string, string> = {
    'Hogna radiata': '/images/morocco/wolf-spider/wolf-spider-1.jpg',
    'Latrodectus hasselti': '/images/redback/redback-1.jpg',
    'Atrax robustus': '/images/funnel-web/funnel-web-1.jpg',
    'Heteropoda venatoria': '/images/huntsman/huntsman-1.jpg',
    'Missulena occatoria': '/images/mouse-spider/mouse-spider-1.jpg',
    'Latrodectus tredecimguttatus': '/images/morocco/mediterranean-black-widow/mediterranean-black-widow-1.jpg',
    'Loxosceles rufescens': '/images/morocco/mediterranean-recluse/mediterranean-recluse-1.jpg',
    'Menemerus semilimbatus': '/images/morocco/jumping-spider/jumping-spider-1.jpg',
    'Argiope lobata': '/images/morocco/lobed-argiope/lobed-argiope-1.jpg',
    'Macrothele calpeiana': '/images/morocco/moroccan-funnel-web/moroccan-funnel-web-1.jpg',
  };

  let count = 0;
  for (const r of records) {
    const sciName = r.topPrediction?.scientificName;
    if (sciName && speciesImages[sciName]) {
      await coll.updateOne({ _id: r._id }, { $set: { imageUrl: speciesImages[sciName] } });
      count++;
    }
  }
  console.log(`Updated real image URLs for ${count} identification records`);
  await mongoose.disconnect();
}

fixIdentImages();
