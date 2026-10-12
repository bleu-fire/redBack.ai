import { embeddingService } from './embedding.service';
import { visionAIService } from './vision.service';
import Species from '../../modules/species/species.model';

jest.mock('../../modules/species/species.model');

describe('AI Vector & Vision Service Suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('generates consistent deterministic embeddings and preserves similarity', () => {
    const vec1 = embeddingService.generateDeterministicVector(
      'Latrodectus hasselti redback spider danger venom'
    );
    const vec2 = embeddingService.generateDeterministicVector(
      'Latrodectus redback female black red stripe'
    );
    const vec3 = embeddingService.generateDeterministicVector(
      'Huntsman spider harmless grey tree bark'
    );

    expect(vec1.length).toBe(512);
    expect(vec2.length).toBe(512);

    const simRelated = embeddingService.calculateCosineSimilarity(vec1, vec2);
    const simUnrelated = embeddingService.calculateCosineSimilarity(vec1, vec3);

    expect(simRelated).toBeGreaterThan(simUnrelated);
  });

  it('analyzes spider image metadata and outputs safety disclaimer & predictions', async () => {
    (Species.find as any).mockReturnValue({
      lean: jest.fn().mockResolvedValue([
        {
          _id: 'spec_1',
          scientificName: 'Latrodectus tredecimguttatus',
          commonName: 'Mediterranean Black Widow',
          toxicityLevel: 'danger',
          venomInfo: 'Neurotoxic alpha-latrotoxin',
          habitat: 'Dry stony fields',
        },
      ]),
    });

    const result = await visionAIService.analyzeSpiderImage({
      userNotes: 'Mediterranean Black Widow',
    });

    expect(result.topPrediction).toBeDefined();
    expect(result.topPrediction.scientificName).toBe('Latrodectus tredecimguttatus');
    expect(result.topPrediction.confidence).toBeGreaterThan(0.5);
    expect(result.uncertaintyLevel).toBeDefined();
    expect(result.disclaimer).toContain('redBack.ai provides educational species identification');
  });
});
