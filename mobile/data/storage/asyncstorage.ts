import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserData {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

class AsyncStorageManagement {
  // 1. Save Token
  setToken = async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
  };

  // 2. Get Token (MUST return the token)
  getToken = async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  // 3. Remove Token
  removeToken = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  };

  // 4. Save User Data
  setUserData = async (userData: UserData): Promise<void> => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error setting user data:', error);
    }
  };

  // 5. Get User Data (MUST parse the string back into an object)
  getUserdata = async (): Promise<UserData | null> => {
    try {
      const data = await AsyncStorage.getItem('userData');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  // 6. Clear all auth data on logout
  remove_All_Logout = async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove(['authToken', 'userData']);
    } catch (error) {
      console.error('Error clearing auth data on logout:', error);
    }
  };
}

export default new AsyncStorageManagement();