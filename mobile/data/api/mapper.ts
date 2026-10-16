import { ISpecies } from './types';

export const speciesDtoToSpeciesDetail = (sp: ISpecies): any => {
  const isMoroccan =
    (sp.distribution && sp.distribution.toLowerCase().includes('morocco')) ||
    (sp.habitat && sp.habitat.toLowerCase().includes('mediterranean')) ||
    sp.scientificName.includes('tredecimguttatus') ||
    sp.scientificName.includes('calpeiana') ||
    sp.scientificName.includes('rufescens') ||
    sp.scientificName.includes('radiata') ||
    sp.scientificName.includes('lobata') ||
    sp.scientificName.includes('semilimbatus') ||
    sp.scientificName.includes('durandi') ||
    sp.scientificName.includes('dufouri');

  const tox = (sp.toxicityLevel || 'mild') as any;
  let badgeText = 'Low Risk';
  let badgeType: 'danger' | 'moss' | 'gold' = 'gold';

  if (tox === 'deadly' || tox === 'danger') {
    badgeText = tox === 'deadly' ? 'Emergency' : 'Danger';
    badgeType = 'danger';
  } else if (tox === 'harmless') {
    badgeText = 'Harmless';
    badgeType = 'moss';
  }

  let category: any = 'Harmless';
  const fam = (sp.family || '').toLowerCase();
  const com = (sp.commonName || '').toLowerCase();
  if (
    fam.includes('theridiidae') ||
    fam.includes('hexathelidae') ||
    fam.includes('macrothelidae') ||
    tox === 'deadly' ||
    tox === 'danger'
  ) {
    category = 'Venomous';
  } else if (fam.includes('salticidae') || com.includes('jumping')) {
    category = 'Jumping';
  } else if (fam.includes('lycosidae') || com.includes('wolf')) {
    category = 'Wolf';
  } else if (fam.includes('araneidae') || com.includes('orb')) {
    category = 'Orb-weaver';
  } else if (fam.includes('sparassidae') || com.includes('huntsman')) {
    category = 'Harmless';
  }

  return {
    id: sp._id || sp.scientificName.toLowerCase().replace(/\s+/g, '-'),
    name: sp.commonName,
    scientificName: sp.scientificName,
    family: sp.family || 'Araneae',
    genus: sp.genus || sp.scientificName.split(' ')[0] || '',
    region: isMoroccan ? 'Morocco' : 'Australia',
    category,
    toxicityLevel: tox === 'moderate' ? 'mild' : tox,
    badgeText,
    badgeType,
    serverImage: sp.imageUrls?.[0] || undefined,
    localImageFallback: require('@/assets/images/spider-3d.png'),
    description:
      sp.description ||
      `${sp.commonName} (${sp.scientificName}) is a spider of the ${sp.family} family.`,
    habitat: sp.habitat || 'Varied natural habitats',
    distribution: sp.distribution || (isMoroccan ? 'Morocco & Mediterranean Basin' : 'Australia'),
    behavior: sp.behavior || 'Active hunter or web builder',
    venomInfo: sp.venomInfo || 'Non-venomous to humans',
    firstAid: sp.firstAid || 'Clean wound with antiseptic soap and water. Apply cold pack.',
    size: sp.morphology?.bodyLengthMm ? `${sp.morphology.bodyLengthMm} mm` : '10-25 mm',
    lifespan: '1-3 years',
    diet: 'Insects, small invertebrates',
    activity: 'Nocturnal / crepuscular',
    morphology: {
      eyePattern: sp.morphology?.eyePattern || 'Standard ocular arrangement',
      bodyLengthMm: sp.morphology?.bodyLengthMm || '15',
      colors: sp.morphology?.colors || ['Brown', 'Black'],
      keyFeatures: sp.morphology?.keyFeatures || [sp.commonName, sp.family],
    },
    confusionWith: ['Look-alike spider species'],
  };
};
