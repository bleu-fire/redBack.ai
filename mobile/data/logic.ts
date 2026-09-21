import api from "./api";

export interface GetAllUser  {
    id_:string;
    name:string;
    email:string;
    role:string;
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

// --- Species API ---
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