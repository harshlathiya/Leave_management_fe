"use client"
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem('jwt');
    if (token) {
      // Attach the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default apiClient;
