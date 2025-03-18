// src/pages/EditProfile.js

import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    bio: '',
    website: '',
    profile_picture: null,
    email: '',
  });
  const [currentProfilePictureUrl, setCurrentProfilePictureUrl] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // For handling validation errors

  useEffect(() => {
    // Fetch current user data
    api.get('/api/accounts/current_user/')
      .then(response => {
        setFormData({
          username: response.data.username || '',
          full_name: response.data.full_name || '',
          bio: response.data.bio || '',
          website: response.data.website || '',
          email: response.data.email || '',
        });
        setCurrentProfilePictureUrl(response.data.profile_picture_url);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prevData => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

// src/pages/EditProfile.js

const handleSubmit = (e) => {
  e.preventDefault();
  // Clear previous errors
  setErrors({});

  // Submit formData to backend
  const data = new FormData();
  Object.keys(formData).forEach(key => {
    data.append(key, formData[key]);
  });

  api.put('/api/accounts/edit_profile/', data)
    .then(() => {
      // Redirect to the profile page
      navigate(`/profile/${formData.username}`);
    })
    .catch(error => {
      if (error.response && error.response.data) {
        setErrors(error.response.data); // Set validation errors
        console.error('Validation errors:', error.response.data);
      } else {
        console.error('Error editing profile:', error);
      }
    });
    


    api.put('/api/accounts/edit_profile/', data)
      .then(() => {
        // Redirect to the profile page
        navigate(`/profile/${formData.username}`);
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrors(error.response.data); // Set validation errors
        } else {
          console.error('Error editing profile:', error);
        }
      });
  };
  const handleDeleteProfilePicture = () => {
    api.post('/api/accounts/delete_profile_picture/')
      .then((response) => {
        const { profile_picture_url } = response.data;
        setCurrentProfilePictureUrl(profile_picture_url);
        setFormData(prevData => ({
          ...prevData,
          profile_picture: null,
        }));
      })
      .catch(error => {
        console.error('Error deleting profile picture:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Display current profile picture */}
        <div className="mb-3 text-center">
          {currentProfilePictureUrl && (
            <img src={currentProfilePictureUrl} alt="Current Profile Picture" className="img-thumbnail" />
          )}
        </div>
        {/* Form fields */}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            name="username"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            name="full_name"
            className="form-control"
            value={formData.full_name}
            onChange={handleChange}
          />
          {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Bio</label>
          <textarea
            name="bio"
            className="form-control"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
          {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Website</label>
          <input
            name="website"
            className={`form-control ${errors.website ? 'is-invalid' : ''}`}
            value={formData.website}
            onChange={handleChange}
          />
          {errors.website && <div className="invalid-feedback">{errors.website}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        {/* Option to upload a new profile picture */}
        <div className="mb-3">
          <label className="form-label">Profile Picture</label>
          <input
            type="file"
            name="profile_picture"
            className="form-control"
            onChange={handleChange}
          />
          {errors.profile_picture && <div className="invalid-feedback">{errors.profile_picture}</div>}
        </div>
        {/* Option to delete the current profile picture */}
        {currentProfilePictureUrl && (
          <div className="mb-3 text-center">
            <button type="button" onClick={handleDeleteProfilePicture} className="btn btn-danger">Delete Profile Picture</button>
          </div>
        )}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
