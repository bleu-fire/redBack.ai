export interface SpeciesDetail {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  genus: string;
  region: 'Morocco' | 'Australia';
  category: 'Venomous' | 'Harmless' | 'Jumping' | 'Funnel-web' | 'Orb-weaver' | 'Wolf' | 'Trapdoor';
  toxicityLevel: 'deadly' | 'danger' | 'mild' | 'harmless';
  badgeText: string;
  badgeType: 'danger' | 'moss' | 'gold';
  serverImage?: string;
  localImageFallback: any;
  description: string;
  habitat: string;
  distribution: string;
  behavior: string;
  venomInfo: string;
  firstAid: string;
  size: string;
  lifespan: string;
  diet: string;
  activity: string;
  morphology: {
    eyePattern: string;
    bodyLengthMm: string;
    colors: string[];
    keyFeatures: string[];
  };
  confusionWith?: string[];
}

export interface ClinicalThreatProfile {
  score: 0 | 1 | 2 | 3 | 4 | 5;
  levelTitle: string;
  summary: string;
  humanRisk: string;
  petRisk: string;
  symptomTimeline: string;
  immediateAction: string;
  relocationAdvice: string;
  isMedicalEmergency: boolean;
}

export interface SizeScaleProfile {
  bodyMm: number;
  legSpanMm: number;
  comparisonText: string;
}
