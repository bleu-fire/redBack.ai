import api from './api';
import {
  GetAllUser,
  ISpecies,
  FetchSpeciesParams,
  SpeciesResponse,
  IIdentificationRecord,
  IdentificationResponse,
  SourceReference,
} from './types';
import { speciesDtoToSpeciesDetail } from './mapper';

export * from './types';
export { speciesDtoToSpeciesDetail };

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

export const saveObservationToBackend = async (
  data: Partial<IIdentificationRecord>
): Promise<IIdentificationRecord> => {
  const response = await api.post('/identification', data);
  return response.data.data;
};

export const uploadSpiderImage = async (
  imageUri: string,
  notes?: string
): Promise<IdentificationResponse> => {
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
): Promise<{ reply: string; sources: SourceReference[] }> => {
  const response = await api.post('/ai/chat', {
    message,
    context: speciesContext,
  });
  return {
    reply: response.data.reply || '',
    sources: response.data.sources || [],
  };
};

export const fetchLearningModules = async (): Promise<any[]> => {
  const response = await api.get('/learning/modules');
  return response.data.data;
};

export const fetchLearningModuleById = async (id: string): Promise<any> => {
  const response = await api.get(`/learning/modules/${id}`);
  return response.data.data;
};

// Persistent Conversation Management (RAB-11)
export const createConversation = async (
  title?: string,
  speciesContext?: { name?: string; scientific?: string; family?: string },
  initialMessage?: string
): Promise<any> => {
  const response = await api.post('/ai/conversations', {
    title,
    speciesContext,
    message: initialMessage,
  });
  return response.data.data;
};

export const fetchUserConversations = async (): Promise<any[]> => {
  const response = await api.get('/ai/conversations');
  return response.data.data;
};

export const fetchConversationById = async (id: string): Promise<any> => {
  const response = await api.get(`/ai/conversations/${id}`);
  return response.data.data;
};

export const sendConversationMessage = async (
  conversationId: string,
  message: string
): Promise<{ reply: string; sources: SourceReference[]; data: any }> => {
  const response = await api.post(`/ai/conversations/${conversationId}/messages`, { message });
  return {
    reply: response.data.reply,
    sources: response.data.sources || [],
    data: response.data.data,
  };
};

export const deleteConversation = async (id: string): Promise<boolean> => {
  await api.delete(`/ai/conversations/${id}`);
  return true;
};