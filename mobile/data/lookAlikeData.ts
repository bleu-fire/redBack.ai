export interface LookAlikeInfo {
  name: string;
  scientificName: string;
  traits: string[];
  riskText: string;
  differentiator: string;
}

export interface SpecimenTrait {
  text: string;
  isDanger?: boolean;
}

export const getLookAlike = (name: string): LookAlikeInfo => {
  const lower = name.toLowerCase();
  if (lower.includes('redback') || lower.includes('latrodectus') || lower.includes('widow')) {
    return {
      name: 'False Widow',
      scientificName: 'Steatoda grossa',
      traits: ['Pale beige markings', 'Globular brown body'],
      riskText: 'Low Risk',
      differentiator:
        'Redbacks display a vivid crimson dorsal stripe, whereas False Widows have beige markings and mild venom.',
    };
  }
  if (lower.includes('funnel') || lower.includes('atrax') || lower.includes('hadronyche')) {
    return {
      name: 'Black House Spider',
      scientificName: 'Badumna insignis',
      traits: ['Grey velvet abdomen', 'Lacy sheet webbing'],
      riskText: 'Low Risk',
      differentiator:
        'Funnel-webs have massive downward strike fangs and glossy carapaces, while Black House spiders have dull velvety abdomens.',
    };
  }
  if (lower.includes('white-tail') || lower.includes('lampona')) {
    return {
      name: 'Black House Spider',
      scientificName: 'Badumna insignis',
      traits: ['Rounded body shape', 'No white abdomen tip'],
      riskText: 'Low Risk',
      differentiator:
        'White-tailed spiders have an elongated cylindrical body with a white tip and hunt actively on foot.',
    };
  }
  if (lower.includes('wolf') || lower.includes('tasmanian')) {
    return {
      name: 'Nursery Web Spider',
      scientificName: 'Dolomedes sp.',
      traits: ['Tapered leg stance', 'Nursery dome web'],
      riskText: 'Harmless',
      differentiator:
        'Wolf spiders possess 2 prominent posterior median eyes for pursuit hunting and do not spin webs.',
    };
  }
  if (lower.includes('huntsman') || lower.includes('sparassidae')) {
    return {
      name: 'Wolf Spider',
      scientificName: 'Lycosidae',
      traits: ['Compact stout legs', 'Ground pursuit stance'],
      riskText: 'Low Risk',
      differentiator:
        'Huntsman spiders have crab-like sideways leg articulation adapted for flat surfaces, unlike Wolf spiders.',
    };
  }
  return {
    name: 'Common Look-Alike',
    scientificName: 'Similar taxon',
    traits: ['Subtle pattern variance', 'Different web structure'],
    riskText: 'Low Risk',
    differentiator:
      'Inspect dorsal color patterns, leg articulation angles, and web structure to confirm distinction.',
  };
};

export const getIdentifiedTraits = (name: string): SpecimenTrait[] => {
  const lower = name.toLowerCase();
  if (lower.includes('redback')) {
    return [
      { text: 'Crimson dorsal stripe' },
      { text: 'Spherical black body' },
    ];
  }
  if (lower.includes('funnel')) {
    return [
      { text: 'Glossy dark carapace' },
      { text: 'Downward strike fangs' },
    ];
  }
  if (lower.includes('white-tail')) {
    return [
      { text: 'Distinct white tip' },
      { text: 'Cylindrical abdomen' },
    ];
  }
  return [
    { text: 'Key dorsal pattern' },
    { text: 'Matching field morphology' },
  ];
};
