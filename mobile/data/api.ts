import axios from 'axios';
import { Platform } from 'react-native';

// F Android Emulator khasso 10.0.2.2, w f Web khasso localhost
const BASE_URL = 'http://192.168.1.141:3000/api';

export const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
