import fs from 'fs';
import path from 'path';

interface MoroccanSpecies {
  folder: string;
  scientificName: string;
  commonName: string;
  arabicName: string;
  toxicity: string;
}

const moroccanSpiderCatalog: MoroccanSpecies[] = [
  {
    folder: 'mediterranean-black-widow',
    scientificName: 'Latrodectus tredecimguttatus',
    commonName: 'Mediterranean black widow',
    arabicName: 'الأرملة السوداء المتوسطية',
    toxicity: 'High neurotoxic (Alpha-latrotoxin)',
  },
  {
    folder: 'mediterranean-recluse',
    scientificName: 'Loxosceles rufescens',
    commonName: 'Mediterranean recluse spider (Violin spider)',
    arabicName: 'عنكبوت الكمان / الناسك المتوسطي',
    toxicity: 'Medically significant cytotoxic (Necrotic)',
  },
  {
    folder: 'moroccan-funnel-web',
    scientificName: 'Macrothele calpeiana',
    commonName: 'Gibraltar & Moroccan funnel-web spider',
    arabicName: 'عنكبوت القمع المغربي / الأندلسي',
    toxicity: 'Painful bite, aggressive, impressive size',
  },
  {
    folder: 'wolf-spider',
    scientificName: 'Hogna radiata',
    commonName: 'Radiated wolf spider',
    arabicName: 'عنكبوت الذئب المشع',
    toxicity: 'Mild, fast ground hunter',
  },
  {
    folder: 'lobed-argiope',
    scientificName: 'Argiope lobata',
    commonName: 'Lobed argiope / Silver sun spider',
    arabicName: 'عنكبوت الشمس الفضي الفصي',
    toxicity: 'Harmless garden predator',
  },
  {
    folder: 'moroccan-huntsman',
    scientificName: 'Eusparassus dufouri',
    commonName: 'Mediterranean huntsman spider',
    arabicName: 'عنكبوت الصياد المتوسطي',
    toxicity: 'Mild bite, non-lethal, very fast',
  },
  {
    folder: 'jumping-spider',
    scientificName: 'Menemerus semilimbatus',
    commonName: 'Mediterranean jumping spider',
    arabicName: 'العنكبوت القفاز الشائع',
    toxicity: 'Completely harmless, curious',
  },
  {
    folder: 'star-spider',
    scientificName: 'Uroctea durandi',
    commonName: 'Mediterranean star spider',
    arabicName: 'عنكبوت النجمة المتوسطي',
    toxicity: 'Harmless, lives under rocks',
  },
];

const MOROCCO_IMAGES_ROOT = path.resolve(__dirname, '../../images/morocco');

async function downloadImage(url: string, destPath: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) return false;
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`  ❌ Failed download from ${url}:`, err);
    return false;
  }
}

async function fetchSpeciesImages(species: MoroccanSpecies, count = 8) {
  const targetDir = path.join(MOROCCO_IMAGES_ROOT, species.folder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`\n🇲🇦 Fetching ${species.commonName} (${species.arabicName}) [${species.scientificName}]...`);

  const encodedTaxon = encodeURIComponent(species.scientificName);
  const apiUrl = `https://api.inaturalist.org/v1/observations?taxon_name=${encodedTaxon}&quality_grade=research&photos=true&per_page=15`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      console.warn(`  ⚠️ API error ${res.status}`);
      return;
    }
    const data: any = await res.json();
    const results = data.results || [];

    let downloaded = 0;
    for (let i = 0; i < results.length && downloaded < count; i++) {
      const observation = results[i];
      const photo = observation?.photos?.[0];
      if (!photo?.url) continue;

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

    console.log(`  Done: ${downloaded} images saved to images/morocco/${species.folder}/`);
  } catch (err) {
    console.error(`  Error for ${species.scientificName}:`, err);
  }
}

async function main() {
  console.log('========================================================');
  console.log('🇲🇦 redBack.ai - Moroccan Spider Biodiversity Dataset');
  console.log('Source: iNaturalist Open Data (Research Grade)');
  console.log(`Target: ${MOROCCO_IMAGES_ROOT}`);
  console.log('========================================================');

  if (!fs.existsSync(MOROCCO_IMAGES_ROOT)) {
    fs.mkdirSync(MOROCCO_IMAGES_ROOT, { recursive: true });
  }

  for (const s of moroccanSpiderCatalog) {
    await fetchSpeciesImages(s, 8);
  }

  console.log('\n========================================================');
  console.log('🎉 Moroccan Spider Dataset successfully assembled!');
  console.log(`Explore images at: backend/images/morocco/`);
  console.log('========================================================');
}

main();
