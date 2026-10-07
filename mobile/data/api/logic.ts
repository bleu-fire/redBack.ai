import api from "./api";
// auth Api 
export interface GetAllUser  {
    id_:string;
    name:string;
    email:string;
    role:string;
}
//  intefaces Species API 
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

export const fetchAllUser = async (): Promise<GetAllUser[]> => {
  try {
    const GetAll = await api.get("/auth/users");
    return GetAll.data.data.users;
  } catch (error: any) {
    console.error("FetchAllUser error:", error.response?.data || error.message);
    throw error;
  }
};


export const LoginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', {
    email: email,
    password: password,
  });
  return response.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', {
    name,
    email,
    password,
  });
  return response.data;
};



export const fetchAllSpecies = async (params?: FetchSpeciesParams): Promise<SpeciesResponse> => {
  try {
    const response = await api.get('/species', { params });
    return response.data;
  } catch (error: any) {
    console.error('fetchAllSpecies error:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchSpeciesById = async (id: string): Promise<ISpecies> => {
  try {
    const response = await api.get(`/species/${id}`);
    return response.data.data;
  } catch (error: any) {
    console.error('fetchSpeciesById error:', error.response?.data || error.message);
    throw error;
  }
};

export interface IdentificationResponse {
  status: string;
  data: {
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

export const uploadSpiderImage = async (imageUri: string, notes?: string): Promise<IdentificationResponse> => {
  try {
    const formData = new FormData();
    const filename = imageUri.split('/').pop() || 'spider.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('image', {
      uri: imageUri,
      name: filename,
      type,
    } as any);

    if (notes) {
      formData.append('notes', notes);
    }

    const response = await api.post('/identifications/detect', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('uploadSpiderImage error:', error.response?.data || error.message);
    throw error;
  }
};

export const askNaturalistAI = async (message: string, speciesContext?: { name: string; scientific: string }): Promise<string> => {
  try {
    const response = await api.post('/ai/chat', {
      message,
      context: speciesContext,
    });
    return response.data.reply;
  } catch (error: any) {
    console.error('askNaturalistAI error:', error.response?.data || error.message);
    throw error;
  }
};