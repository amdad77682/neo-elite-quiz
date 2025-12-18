import axios, {AxiosInstance, AxiosError} from 'axios';
import StorageService from './storage';

// For Android emulator, use 10.0.2.2 instead of localhost
// For physical device, use your computer's IP address (e.g., 192.168.1.100)
const API_BASE_URL = 'http://10.0.2.2:8000/api/v1';

const handleError = (error: AxiosError): void => {
  if (error.response) {
    // Server responded with error status
    console.error('❌ API Error Response:', {
      status: error.response.status,
      statusText: error.response.statusText,
      url: error.config?.url,
      data: error.response.data,
    });
    console.error('Full error response:', JSON.stringify(error.response, null, 2));
  } else if (error.request) {
    // Request made but no response received
    console.error('❌ API No Response:', {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      message: 'No response received from server',
      error: error.message,
      code: error.code,
    });
    console.error('Full error request:', JSON.stringify(error.request, null, 2));
  } else {
    // Error setting up request
    console.error('❌ API Request Setup Error:', {
      message: error.message,
      url: error.config?.url,
    });
  }
};

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
axiosInstance.interceptors.request.use(
  async config => {
    // Add token to headers if available
    const token = await StorageService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const requestInfo = {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      data: config.data,
      params: config.params,
      headers: config.headers,
    };
    console.log('🚀 API Request:', requestInfo);
    console.log('Full request config:', JSON.stringify(requestInfo, null, 2));
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    console.error('Full request error:', JSON.stringify(error, null, 2));
    return Promise.reject(error);
  },
);

// Response interceptor for logging
axiosInstance.interceptors.response.use(
  response => {
    console.log('✅ API Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  error => {
    handleError(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
