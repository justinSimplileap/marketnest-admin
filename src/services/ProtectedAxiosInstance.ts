import axios from 'axios';

// Create a Protected Axios instance with default configurations
const ProtectedAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base URL from environment variables
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here if needed
  },
});

// Request interceptor to attach token to headers
ProtectedAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
ProtectedAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized, maybe redirect to login page
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default ProtectedAxiosInstance;
