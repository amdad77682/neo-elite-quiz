import axios from 'axios';
import axiosInstance from './axiosConfig';
import StorageService from './storage';
import {
  Teacher,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from './types';

export * from './types';

class ApiService {
  async getTeachers(): Promise<Teacher[]> {
    try {
      console.log('📚 Fetching teachers list...');
      const response = await axiosInstance.get<{teachers: Teacher[]}>('/users/teachers');
      console.log(`✅ Found ${response.data.teachers.length} teachers`);
      return response.data.teachers;
    } catch (error) {
      console.error('❌ Failed to fetch teachers');
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(
          (error.response.data as any).message || 'Failed to fetch teachers',
        );
      }
      throw new Error('Failed to fetch teachers. Please check your connection.');
    }
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      console.log('📝 Registering user...', {
        email: data.email,
        role: data.role,
        name: `${data.first_name} ${data.last_name}`,
      });

      const response = await axiosInstance.post<RegisterResponse>(
        '/register',
        data,
      );

      console.log('✅ Registration successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Registration failed');
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorMessage =
          (error.response.data as any).message ||
          (error.response.data as any).detail ||
          'Registration failed';
        throw new Error(errorMessage);
      }
      throw new Error('Registration failed. Please check your connection.');
    }
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('🔐 Logging in user...', {
        email: data.email,
      });

      const response = await axiosInstance.post<LoginResponse>(
        '/auth/login',
        data,
      );

      // Save token and user data to storage
      await StorageService.saveToken(response.data.access_token);
      await StorageService.saveUser(response.data.user);

      console.log('✅ Login successful:', {
        user: response.data.user,
        token_type: response.data.token_type,
      });
      return response.data;
    } catch (error) {
      console.error('❌ Login failed');
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorMessage =
          (error.response.data as any).message ||
          (error.response.data as any).detail ||
          'Invalid email or password';
        throw new Error(errorMessage);
      }
      throw new Error('Login failed. Please check your connection.');
    }
  }

  async logout(): Promise<void> {
    try {
      console.log('🚪 Logging out user...');

      // Call logout endpoint
      await axiosInstance.post('/auth/logout');

      // Clear stored token and user data
      await StorageService.clearAll();

      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout failed');
      // Clear local data even if API call fails
      await StorageService.clearAll();
      
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorMessage =
          (error.response.data as any).message ||
          (error.response.data as any).detail ||
          'Logout failed';
        throw new Error(errorMessage);
      }
      throw new Error('Logout failed. Please try again.');
    }
  }
}

export default new ApiService();
