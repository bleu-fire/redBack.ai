import axios from 'axios';
import { Platform } from 'react-native';

import Constants from 'expo-constants';
import { useStore } from '@/store/stores';

// Get current computer IP (dynamic via Expo hostUri or current Wi-Fi IP)
const getBaseUrl = () => {
  const hostUri = Constants.expoConfig?.hostUri;
  const ip = hostUri ? hostUri.split(':')[0] : '192.168.1.31';
  return `http://${ip}:3000/api`;
};

const BASE_URL = getBaseUrl();
console.log('API BASE_URL:', BASE_URL);

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Automatically inject Authorization token from Zustand store
api.interceptors.request.use((config) => {
  const token = useStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
