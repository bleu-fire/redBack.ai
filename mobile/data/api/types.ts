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

export interface SourceReference {
  id?: string;
  title: string;
  scientificName?: string;
  family?: string;
  sourceType?: 'species_catalog' | 'field_guide' | 'clinical_protocol' | 'document';
  section?: string;
  pageOrChunk?: string;
  citation: string;
  snippet?: string;
}

export interface ChatResponse {
  status: string;
  reply: string;
  sources: SourceReference[];
}

export interface IConversationMessageItem {
  role: 'user' | 'assistant';
  content: string;
  sources?: SourceReference[];
  timestamp?: string;
}

export interface IConversationSummary {
  _id: string;
  userId?: string;
  title: string;
  speciesContext?: {
    name?: string;
    scientific?: string;
    family?: string;
  };
  messages: IConversationMessageItem[];
  createdAt?: string;
  updatedAt?: string;
}


