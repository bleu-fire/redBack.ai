import { SpeciesDetail, ClinicalThreatProfile, SizeScaleProfile } from './types';
import { MOROCCAN_SPECIES } from './morocco';
import { AUSTRALIAN_SPECIES } from './australia';

const ALL_SPECIES: SpeciesDetail[] = [...MOROCCAN_SPECIES, ...AUSTRALIAN_SPECIES];

export const getSpeciesById = (id: string): SpeciesDetail | undefined => {
  return ALL_SPECIES.find(
    (s) =>
      s.id.toLowerCase() === id.toLowerCase() ||
      s.scientificName.toLowerCase() === id.toLowerCase() ||
      s.scientificName.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
  );
};

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
