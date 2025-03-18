// src/pages/EditDatingProfile.js

import React, { useState, useEffect } from 'react';
import Layout from '../components/PrivateLayout';
import api from '../utils/api';

const EditDatingProfile = () => {
  const [formData, setFormData] = useState({
    birthday: '',
    gender: '',
    sexual_orientation: '',
    interested_in: '',
    bio: '',
    job_title: '',
    company: '',
    education: '',
    images: [],
    audio_prompts: [],
  });
  const [datingProfile, setDatingProfile] = useState({});

  useEffect(() => {
    // Fetch existing profile data
    api.get('/api/dating/profile/')
      .then(response => {
        setFormData(response.data);
        setDatingProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching dating profile:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prevData => ({
        ...prevData,
        [name]: files,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit formData to backend
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images' || key === 'audio_prompts') {
        for (let i = 0; i < formData[key].length; i++) {
          data.append(key, formData[key][i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    });

    api.post('/api/dating/edit_profile/', data)
      .then(() => {
        // Redirect or show success message
      })
      .catch(error => {
        console.error('Error editing profile:', error);
      });
  };

  return (
    <Layout>
      <div className="container">
        <h2>Edit Your Dating Profile</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Form fields similar to CreateDatingProfileForm */}
          {/* Existing Images */}
          <div className="mb-3">
            <label className="form-label">Current Images:</label>
            <div className="row">
              {datingProfile.images && datingProfile.images.map(image => (
                <div key={image.id} className="col-md-3">
                  <img src={image.image_url} className="img-thumbnail" alt="Profile image of user" />
                </div>
              ))}
            </div>
          </div>
          {/* Upload New Images */}
          <div className="mb-3">
            <label className="form-label">Upload New Images</label>
            <input
              type="file"
              name="images"
              className="form-control"
              multiple
              onChange={handleChange}
            />
            <small className="form-text text-muted">Uploading new images will replace the existing ones.</small>
          </div>
          {/* Other form fields */}
          {/* ... */}
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <a href="/dating/home" className="btn btn-secondary">Cancel</a>
        </form>
      </div>
    </Layout>
  );
};

export default EditDatingProfile;
