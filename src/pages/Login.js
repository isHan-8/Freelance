// src/pages/Login.js

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Ensure correct import path
import './Auth.css';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // For navigation after successful login
  const { login: loginContext } = useContext(AuthContext); // Destructure login from context

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear previous errors
    setErrors({});

    // Make API call to login
    api.post('/api/accounts/login/', formData)
      .then(response => {
        // Login successful
        const { access, refresh, user } = response.data;
        // Store tokens and user data
        loginContext({ access, refresh, user }); // Update context
        // Redirect to Feed page
        navigate('/feed'); // Redirect to the Feed page
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrors(error.response.data); // Display validation errors
        } else {
          console.error('Login error:', error);
          alert('An unexpected error occurred.');
        }
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-center mb-4">Login to Charectra</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              name="username"
              className={`form-control ${errors.detail ? 'is-invalid' : ''}`}
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.detail && <div className="invalid-feedback">{errors.detail}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className={`form-control ${errors.detail ? 'is-invalid' : ''}`}
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.detail && <div className="invalid-feedback">{errors.detail}</div>}
          </div>

          {/* Remember Me Checkbox */}
          <div className="form-check mb-3">
            <input
              name="remember"
              type="checkbox"
              className="form-check-input"
              id="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="remember">Remember Me</label>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </div>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
