// src/pages/CreateDatingProfileForm.js

import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './CreateDatingProfileForm.css';
import { FaPlus } from 'react-icons/fa';

const CreateDatingProfileForm = ({ onClose, onSuccess }) => {
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
    answers: {},
  });

  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    api.get('/api/dating/questions/')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];

      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prevPreviews => {
          const newPreviews = [...prevPreviews];
          newPreviews[index] = reader.result;
          return newPreviews;
        });
      };
      reader.readAsDataURL(file);

      // Update formData
      setFormData(prevData => {
        const newImages = [...prevData.images];
        newImages[index] = file;
        return { ...prevData, images: newImages };
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prevData => ({
        ...prevData,
        [name]: files,
      }));
    } else if (name.startsWith('answer_')) {
      setFormData(prevData => ({
        ...prevData,
        answers: {
          ...prevData.answers,
          [name]: value,
        },
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    // Add validation for each step if needed
    if (currentStep === 1) {
      if (!formData.images[0]) {
        alert('Please upload at least the first image.');
        return;
      }
    }
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data for submission
    const data = new FormData();

    // Append images
    formData.images.forEach((file, index) => {
      if (file) {
        data.append('images', file);
      }
    });

    // Append other form data
    Object.keys(formData).forEach(key => {
      if (key !== 'images' && key !== 'audio_prompts' && key !== 'answers') {
        data.append(key, formData[key]);
      }
    });

    // Append audio prompts
    formData.audio_prompts.forEach((file, index) => {
      if (file) {
        data.append('audio_prompts', file);
      }
    });

    // Append answers
    Object.keys(formData.answers).forEach(key => {
      data.append(`answers[${key}]`, formData.answers[key]);
    });

    api.post('/api/dating/profiles/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        // Handle success
        if (onSuccess) onSuccess();
      })
      .catch(error => {
        console.error('Error creating profile:', error);
        // Handle errors
      });
  };

  return (
    <div className="create-profile-form">
      <button type="button" className="close-button" onClick={onClose}>&times;</button>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Step Indicators */}
        <div className="step-indicator">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
          <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>4</div>
        </div>

        {/* Step 1: Upload Photos */}
        {currentStep === 1 && (
          <div className="step-content">
            <h3>Upload Photos</h3>
            <div className="image-upload-grid">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`image-card ${index === 0 ? 'large' : ''}`}
                  style={{ gridArea: index === 0 ? 'large' : `small${index}` }}
                >
                  {imagePreviews[index] ? (
                    <img src={imagePreviews[index]} alt={`Upload ${index + 1}`} />
                  ) : (
                    <label htmlFor={`image-upload-${index}`} className="upload-placeholder">
                      <FaPlus size={index === 0 ? 40 : 24} />
                      <input
                        type="file"
                        id={`image-upload-${index}`}
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                        required={index === 0} // First image is required
                        style={{ display: 'none' }}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
            <small className="form-text text-muted">First image is required. You can upload more images now or later.</small>
            <div className="navigation-buttons">
              <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {/* Step 2: Personal Details */}
        {currentStep === 2 && (
          <div className="step-content">
            <h3>About You</h3>
            {/* Birthday */}
            <div className="mb-3">
              <label className="form-label">Birthday</label>
              <input
                type="date"
                name="birthday"
                className="form-control"
                value={formData.birthday}
                onChange={handleChange}
                required
              />
            </div>
            {/* Gender */}
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non_binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Sexual Orientation */}
            <div className="mb-3">
              <label className="form-label">Sexual Orientation</label>
              <select
                name="sexual_orientation"
                className="form-control"
                value={formData.sexual_orientation}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select your orientation</option>
                <option value="straight">Straight</option>
                <option value="gay">Gay</option>
                <option value="lesbian">Lesbian</option>
                <option value="bisexual">Bisexual</option>
                <option value="pansexual">Pansexual</option>
                <option value="asexual">Asexual</option>
                <option value="queer">Queer</option>
                <option value="questioning">Questioning</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Interested In */}
            <div className="mb-3">
              <label className="form-label">Interested In</label>
              <select
                name="interested_in"
                className="form-control"
                value={formData.interested_in}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select preference</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="everyone">Everyone</option>
              </select>
            </div>
            {/* Bio */}
            <div className="mb-3">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                className="form-control"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
            {/* Job Title */}
            <div className="mb-3">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                name="job_title"
                className="form-control"
                value={formData.job_title}
                onChange={handleChange}
              />
            </div>
            {/* Company */}
            <div className="mb-3">
              <label className="form-label">Company</label>
              <input
                type="text"
                name="company"
                className="form-control"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            {/* Education */}
            <div className="mb-3">
              <label className="form-label">Education</label>
              <input
                type="text"
                name="education"
                className="form-control"
                value={formData.education}
                onChange={handleChange}
              />
            </div>
            <div className="navigation-buttons">
              <button type="button" className="btn btn-secondary me-2" onClick={handleBack}>Back</button>
              <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Answer Questions */}
        {currentStep === 3 && (
          <div className="step-content">
            <h3>Answer Questions</h3>
            {questions.map(question => (
              <div key={question.id} className="mb-3">
                <label className="form-label">{question.question_text} (Optional)</label>
                <textarea
                  name={`answer_${question.id}`}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="navigation-buttons">
              <button type="button" className="btn btn-secondary me-2" onClick={handleBack}>Back</button>
              <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {/* Step 4: Audio Prompts */}
        {currentStep === 4 && (
          <div className="step-content">
            <h3>Audio Prompts</h3>
            <div className="mb-3">
              <label className="form-label">Audio Prompts</label>
              <input
                type="file"
                name="audio_prompts"
                className="form-control"
                multiple
                accept="audio/*"
                onChange={handleChange}
              />
            </div>
            <div className="navigation-buttons">
              <button type="button" className="btn btn-secondary me-2" onClick={handleBack}>Back</button>
              <button type="submit" className="btn btn-success">Finish</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateDatingProfileForm;
