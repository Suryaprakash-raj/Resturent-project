import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend base URL
});

// Attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// This function will setup the response interceptor with React Router's navigate
export function setupInterceptors(navigate) {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const err = error.response;
      if (err) {
        if (err.status === 401) {
          // Unauthorized (could be token expired or invalid)
          localStorage.removeItem('token');
          toast.error('Unauthorized. Please login again.');
          navigate('/login');
        } else if (err.data?.error === 'jwt expired') {
          // Specific token expired case
          localStorage.removeItem('token');
          toast.error('Session expired. Please log in again.');
          navigate('/login');
        } else if (err.data?.msg) {
          // Other error with message from server
          toast.error(err.data.msg);
        } else {
          toast.error('An error occurred');
        }
      } else {
        toast.error('Network error or server unreachable');
      }
      return Promise.reject(error);
    }
  );
}

export default api;
