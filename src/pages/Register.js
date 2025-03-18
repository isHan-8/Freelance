// src/pages/Register.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Ensure correct import path
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // For navigation after successful registration

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear previous errors
    setErrors({});

    // Make API call to register
    api.post('/api/accounts/register/', formData)
      .then(response => {
        // Registration successful
        alert(response.data.message); // Or handle as per your UI design
        navigate('/login'); // Redirect to login page
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrors(error.response.data); // Display validation errors
        } else {
          console.error('Registration error:', error);
          alert('An unexpected error occurred.');
        }
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-center mb-4">Register on Charectra</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              name="username"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Full Name Field */}
          <div className="mb-3">
            <label htmlFor="full_name" className="form-label">Full Name</label>
            <input
              name="full_name"
              className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
              id="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
            <input
              name="confirm_password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`} // Assuming password errors cover both
              id="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-block">Register</button>
          </div>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
