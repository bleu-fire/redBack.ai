import fs from 'fs';
import path from 'path';

interface SpeciesQuery {
  folder: string;
  scientificName: string;
  commonName: string;
}

const targetSpecies: SpeciesQuery[] = [
  { folder: 'redback', scientificName: 'Latrodectus hasselti', commonName: 'Redback spider' },
  { folder: 'funnel-web', scientificName: 'Atrax robustus', commonName: 'Sydney funnel-web spider' },
  { folder: 'huntsman', scientificName: 'Heteropoda venatoria', commonName: 'Huntsman spider' },
  { folder: 'mouse-spider', scientificName: 'Missulena occatoria', commonName: 'Red-headed mouse spider' },
  { folder: 'white-tailed', scientificName: 'Lampona cylindrata', commonName: 'White-tailed spider' },
  { folder: 'garden-orb-weaver', scientificName: 'Hortophora transmarina', commonName: 'Australian garden orb-weaver' },
  { folder: 'black-house-spider', scientificName: 'Badumna insignis', commonName: 'Black house spider' },
  { folder: 'st-andrews-cross', scientificName: 'Argiope keyserlingi', commonName: "Saint Andrew's cross spider" },
];

const IMAGES_ROOT = path.resolve(__dirname, '../../images');

async function downloadImage(url: string, destPath: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) return false;
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`  ❌ Failed to download ${url}:`, err);
    return false;
  }
}

async function fetchSpeciesImages(species: SpeciesQuery, count = 5) {
  const targetDir = path.join(IMAGES_ROOT, species.folder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`\n🕷️ Fetching Research Grade photos for ${species.commonName} (${species.scientificName})...`);

  const encodedTaxon = encodeURIComponent(species.scientificName);
  const apiUrl = `https://api.inaturalist.org/v1/observations?taxon_name=${encodedTaxon}&quality_grade=research&photos=true&per_page=10`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      console.warn(`  ⚠️ API error ${res.status} for ${species.scientificName}`);
      return;
    }
    const data: any = await res.json();
    const results = data.results || [];

    let downloaded = 0;
    for (let i = 0; i < results.length && downloaded < count; i++) {
      const observation = results[i];
      const photo = observation?.photos?.[0];
      if (!photo?.url) continue;

      // Convert default square thumbnail URL to medium / large resolution
      const fullResUrl = photo.url.replace('/square.', '/medium.');
      const fileName = `${species.folder}-${downloaded + 1}.jpg`;
      const filePath = path.join(targetDir, fileName);

      process.stdout.write(`  [${downloaded + 1}/${count}] Downloading ${fileName}... `);
      const success = await downloadImage(fullResUrl, filePath);
      if (success) {
        console.log(`✅ (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)`);
        downloaded++;
      } else {
        console.log(`❌`);
      }
    }

    console.log(`  Done: ${downloaded} images saved to images/${species.folder}/`);
  } catch (err) {
    console.error(`  Error fetching observations for ${species.scientificName}:`, err);
  }
}

async function main() {
  console.log('====================================================');
  console.log('🕷️ redBack.ai - Spider Dataset Image Downloader');
  console.log('Source: iNaturalist Open Data (Research Grade)');
  console.log(`Target: ${IMAGES_ROOT}`);
  console.log('====================================================');

  if (!fs.existsSync(IMAGES_ROOT)) {
    fs.mkdirSync(IMAGES_ROOT, { recursive: true });
  }

  for (const s of targetSpecies) {
    await fetchSpeciesImages(s, 5);
  }

  console.log('\n====================================================');
  console.log('🎉 All reference specimen images downloaded successfully!');
  console.log(`Check folder: backend/images/`);
  console.log('====================================================');
}

main();
