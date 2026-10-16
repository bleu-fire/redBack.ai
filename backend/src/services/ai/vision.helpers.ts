import { VisionAnalysisResult } from './vision.types';

export function buildNonSpiderResult(params: {
  subject: string;
  confidence: number;
  visualEvidence?: string[];
  rejectionReason?: string;
  disclaimer?: string;
}): VisionAnalysisResult {
  const {
    subject,
    confidence,
    visualEvidence = [
      `Subject classified as: ${subject}`,
      params.rejectionReason || 'No spider detected in image.',
    ],
    disclaimer = 'No spider detected. redBack.ai is designed specifically for identifying spiders. Please position the camera over an arachnid specimen.',
  } = params;

  return {
    topPrediction: {
      scientificName: 'Non-Arachnid',
      commonName: subject,
      confidence,
      confidenceBand: confidence >= 0.85 ? 'high' : 'moderate',
      rank: 1,
      visualEvidence,
    },
    predictions: [],
    uncertaintyLevel: 'high',
    disclaimer,
    notes: `Subject identified as: ${subject}. Zero spider bite risk.`,
    speciesDetails: {
      commonName: subject,
      scientificName: 'Non-Arachnida',
      family: 'Non-Arachnida',
      genus: 'None',
      habitat: 'Human or domestic environments',
      distribution: 'Global',
      behavior: 'Non-arachnid subject',
      venomInfo: 'This is not a spider. Zero arachnid envenomation risk.',
      toxicityLevel: 'harmless',
      firstAid: 'No spider bite detected.',
      morphology: {
        keyFeatures: [
          `Detected: ${subject}`,
          'No spider fangs, ocular arrangement, or 8-legged morphology detected.',
        ],
      },
    },
  };
}
