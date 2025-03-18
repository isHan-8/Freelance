// src/utils/api.js

import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Base URL of your backend
  //headers: {
    //'Content-Type': 'application/json',
  //},
  withCredentials: true, // Important for sending cookies if using them
});

// Request interceptor to add the Authorization header
api.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error response status is 401 (Unauthorized) and not already retried
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(
            '/api/accounts/token/refresh/', // Use relative URL if same domain
            { refresh: refreshToken },
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true, // Include cookies if using them
            }
          );
          const newAccessToken = response.data.access;
          sessionStorage.setItem('access_token', newAccessToken);
          api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          console.error('Token refresh failed:', err);
          // Redirect to login if token refresh fails
          window.location.href = '/login';
        }
      } else {
        // No refresh token, redirect to login
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
export default api;
