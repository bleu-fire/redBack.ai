import { IPrediction } from '../../modules/Identification/identification.model';

export const VISION_CONFIG = {
  GEMINI_MODEL: 'gemini-1.5-flash',
  DEFAULT_CONFIDENCE: 0.92,
  HIGH_CONFIDENCE_THRESHOLD: 0.85,
  DEFAULT_FALLBACK_SPECIES: 'Latrodectus tredecimguttatus',
  SAFETY_DISCLAIMER:
    'redBack.ai provides educational species identification assistance only. If bitten by a spider or experiencing severe symptoms, seek immediate emergency medical care.',
};

export interface VisionAnalysisResult {
  topPrediction: IPrediction;
  predictions: IPrediction[];
  uncertaintyLevel: 'low' | 'moderate' | 'high';
  disclaimer: string;
  notes?: string;
  speciesDetails?: any;
}

export interface GeminiMatchResult {
  scientificName?: string;
  commonName?: string;
  confidence?: number;
  visualEvidence?: string[];
}
