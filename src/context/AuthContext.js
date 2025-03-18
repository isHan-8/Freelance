// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import api from '../utils/api';
import {jwtDecode} from 'jwt-decode'; // Correct default import

export const AuthContext = createContext();

// Define and export useAuth hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user');
    setUser(null);
  };

  // Function to check if the token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      console.error('Invalid token:', error);
      return true;
    }
  };

  // Function to refresh access token
  const refreshAccessToken = useCallback(async () => {
    const refreshToken = sessionStorage.getItem('refresh_token');
    if (!refreshToken) {
      handleLogout();
      return;
    }

    try {
      const response = await api.post('/api/accounts/token/refresh/', {
        refresh: refreshToken,
      });
      sessionStorage.setItem('access_token', response.data.access);
      const newAccessToken = response.data.access;

      // Fetch the user profile again with the new token
      const userResponse = await api.get('/api/accounts/current_user/', {
        headers: { Authorization: `Bearer ${newAccessToken}` },
      });
      setUser(userResponse.data);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      handleLogout(); // If token refresh fails, clear the session.
    }
  }, []);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = sessionStorage.getItem('access_token');
      const refreshToken = sessionStorage.getItem('refresh_token');

      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);

      if (accessToken && !isTokenExpired(accessToken)) {
        try {
          const response = await api.get('/api/accounts/current_user/', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
          handleLogout(); // If an error occurs, clear the session.
        }
      } else if (refreshToken) {
        // Try to refresh the access token if it is expired
        await refreshAccessToken();
      }
      setLoading(false);
    };

    fetchUser();
  }, [refreshAccessToken]);

  // Function to handle login
  const login = (data) => {
    sessionStorage.setItem('access_token', data.access);
    sessionStorage.setItem('refresh_token', data.refresh);
    sessionStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  // Function to handle logout
  const logout = async () => {
    try {
      await api.post('/api/accounts/logout/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
    handleLogout();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
