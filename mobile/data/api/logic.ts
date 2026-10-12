import api from "./api";

export interface GetAllUser {
  id_: string;
  name: string;
  email: string;
  role: string;
}

export interface ISpecies {
  _id: string;
  scientificName: string;
  commonName: string;
  family: string;
  genus: string;
  description?: string;
  habitat: string;
  distribution: string;
  behavior: string;
  venomInfo: string;
  toxicityLevel?: 'harmless' | 'mild' | 'moderate' | 'danger' | 'deadly';
  firstAid?: string;
  morphology?: {
    eyePattern?: string;
    bodyLengthMm?: string;
    colors?: string[];
    keyFeatures?: string[];
  };
  conservationStatus?: string;
  imageUrls: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface FetchSpeciesParams {
  page?: number;
  limit?: number;
  search?: string;
  family?: string;
  region?: string;
}

export interface SpeciesResponse {
  status: string;
  results: number;
  data: ISpecies[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IIdentificationRecord {
  _id: string;
  userId?: string;
  imageUrl: string;
  status: string;
  uncertaintyLevel?: 'low' | 'moderate' | 'high';
  topPrediction?: {
    speciesId?: string;
    scientificName: string;
    commonName: string;
    confidence: number;
    confidenceBand?: string;
    visualEvidence?: string[];
  };
  predictions: any[];
  disclaimer: string;
  notes?: string;
  speciesDetails?: ISpecies;
  createdAt?: string;
  updatedAt?: string;
}

export interface IdentificationResponse {
  status: string;
  message?: string;
  data: {
    identification?: IIdentificationRecord;
    topPrediction: {
      speciesId?: string;
      scientificName: string;
      commonName: string;
      confidence: number;
      confidenceBand: 'high' | 'moderate' | 'low';
      visualEvidence?: string[];
    };
    predictions: any[];
    uncertaintyLevel: 'low' | 'moderate' | 'high';
    disclaimer: string;
    notes?: string;
    speciesDetails?: ISpecies;
  };
}

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const LoginUser = loginUser;

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const fetchAllSpecies = async (params?: FetchSpeciesParams): Promise<SpeciesResponse> => {
  const response = await api.get('/species', { params });
  return response.data;
};

export const fetchSpeciesById = async (id: string): Promise<ISpecies> => {
  const response = await api.get(`/species/${id}`);
  return response.data.data;
};

export const fetchAllIdentifications = async (): Promise<IIdentificationRecord[]> => {
  const response = await api.get('/identification');
  return response.data.data;
};

export const fetchIdentificationById = async (id: string): Promise<IIdentificationRecord> => {
  const response = await api.get(`/identification/${id}`);
  return response.data.data;
};

export const saveObservationToBackend = async (data: Partial<IIdentificationRecord>): Promise<IIdentificationRecord> => {
  const response = await api.post('/identification', data);
  return response.data.data;
};

export const uploadSpiderImage = async (imageUri: string, notes?: string): Promise<IdentificationResponse> => {
  let targetUri = imageUri;

  // Optimize image dimensions and compression to save bandwidth and fit Groq token limits
  try {
    const { manipulateAsync, SaveFormat } = await import('expo-image-manipulator');
    const manipulated = await manipulateAsync(
      imageUri,
      [{ resize: { width: 640 } }],
      { compress: 0.72, format: SaveFormat.JPEG }
    );
    if (manipulated?.uri) {
      targetUri = manipulated.uri;
    }
  } catch (optErr) {
    console.warn('[uploadSpiderImage] Optimization skipped, using original uri:', optErr);
  }

  const formData = new FormData();
  const filename = targetUri.split('/').pop() || 'spider.jpg';
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image/jpeg';

  formData.append('image', {
    uri: targetUri,
    name: filename,
    type,
  } as any);

  if (notes) {
    formData.append('notes', notes);
  }

  const response = await api.post('/identification/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const askNaturalistAI = async (
  message: string,
  speciesContext?: { name: string; scientific: string }
): Promise<string> => {
  const response = await api.post('/ai/chat', {
    message,
    context: speciesContext,
  });
  return response.data.reply;
};

export const fetchLearningModules = async (): Promise<any[]> => {
  const response = await api.get('/learning/modules');
  return response.data.data;
};

export const fetchLearningModuleById = async (id: string): Promise<any> => {
  const response = await api.get(`/learning/modules/${id}`);
  return response.data.data;
};

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
  if (fam.includes('theridiidae') || fam.includes('hexathelidae') || fam.includes('macrothelidae') || tox === 'deadly' || tox === 'danger') {
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
    description: sp.description || `${sp.commonName} (${sp.scientificName}) is a spider of the ${sp.family} family.`,
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