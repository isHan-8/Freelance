// src/pages/CreatePost.js

import React, { useState } from 'react';
import './CreatePost.css';
import api from '../utils/api'; // Import your API utility

const CreatePost = () => {
  const [activeTab, setActiveTab] = useState('short');
  const [shortFormData, setShortFormData] = useState({
    content: '',
    media: null,
  });
  const [longFormData, setLongFormData] = useState({
    title: '',
    description: '',
    video: null,
    thumbnail: null,
  });
  const [previewMedia, setPreviewMedia] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Helper function to create object URLs for previews
  const createPreviewURL = (file) => {
    return file ? URL.createObjectURL(file) : null;
  };

  // Handle changes for short-form posts
  const handleShortChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setShortFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      setPreviewMedia(createPreviewURL(file));
    } else {
      setShortFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle changes for long-form content
  const handleLongChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setLongFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      // Set appropriate previews based on field name
      if (name === 'video') {
        setPreviewVideo(createPreviewURL(file));
      } else if (name === 'thumbnail') {
        setPreviewThumbnail(createPreviewURL(file));
      }
    } else {
      setLongFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle submission for short-form posts
  const handleShortSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append('content', shortFormData.content);
    if (shortFormData.media) {
      formData.append('media', shortFormData.media);
    }

    try {
      const response = await api.post('/api/feed/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Reset form and preview
      setShortFormData({ content: '', media: null });
      setPreviewMedia(null);
      setSuccessMessage('Post created successfully!');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
    }
  };

  // Handle submission for long-form content
  const handleLongSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append('title', longFormData.title);
    formData.append('description', longFormData.description);
    if (longFormData.video) {
      formData.append('video', longFormData.video);
    }
    if (longFormData.thumbnail) {
      formData.append('thumbnail', longFormData.thumbnail);
    }

    try {
      const response = await api.post('/api/feed/longform/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Reset form and previews
      setLongFormData({ title: '', description: '', video: null, thumbnail: null });
      setPreviewVideo(null);
      setPreviewThumbnail(null);
      setSuccessMessage('Long-form content created successfully!');
    } catch (err) {
      console.error('Error creating long-form content:', err);
      setError('Failed to create long-form content. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a Post</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <ul className="nav nav-tabs" id="postTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'short' ? 'active' : ''}`}
            onClick={() => setActiveTab('short')}
            type="button"
            role="tab"
            aria-selected={activeTab === 'short'}
          >
            Posts
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'long' ? 'active' : ''}`}
            onClick={() => setActiveTab('long')}
            type="button"
            role="tab"
            aria-selected={activeTab === 'long'}
          >
            Longs
          </button>
        </li>
      </ul>
      <div className="tab-content">
        {activeTab === 'short' && (
          <div className="tab-pane fade show active" role="tabpanel">
            <form onSubmit={handleShortSubmit} encType="multipart/form-data">
              <div className="form-group media-preview mt-4">
                <label htmlFor="mediaUploadShort" className="upload-label">
                  {previewMedia ? (
                    shortFormData.media.type.startsWith('image') ? (
                      <img src={previewMedia} alt="Preview" className="img-preview" />
                    ) : (
                      <video src={previewMedia} controls className="img-preview" />
                    )
                  ) : (
                    <div className="upload-placeholder">
                      <i className="fas fa-plus fa-2x"></i>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  name="media"
                  id="mediaUploadShort"
                  className="d-none"
                  accept="image/*,video/*"
                  onChange={handleShortChange}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="content">Caption</label>
                <textarea
                  name="content"
                  className="form-control"
                  id="content"
                  rows="3"
                  placeholder="Write a caption..."
                  value={shortFormData.content}
                  onChange={handleShortChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Post
              </button>
            </form>
          </div>
        )}
        {activeTab === 'long' && (
          <div className="tab-pane fade show active" role="tabpanel">
            <form onSubmit={handleLongSubmit} encType="multipart/form-data">
              <div className="form-group media-preview mt-4">
                <label htmlFor="mediaUploadLong" className="upload-label long">
                  {previewVideo ? (
                    <video src={previewVideo} controls className="img-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  name="video"
                  id="mediaUploadLong"
                  className="d-none"
                  accept="video/*"
                  onChange={handleLongChange}
                  required
                />
              </div>
              {previewVideo && (
                <div className="form-group mt-3">
                  <label htmlFor="thumbnail">Thumbnail</label>
                  <label htmlFor="thumbnailUpload" className="upload-label">
                    {previewThumbnail ? (
                      <img src={previewThumbnail} alt="Thumbnail Preview" className="img-preview" />
                    ) : (
                      <div className="upload-placeholder">
                        <i className="fas fa-plus fa-2x"></i>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnailUpload"
                    className="d-none"
                    accept="image/*"
                    onChange={handleLongChange}
                    required
                  />
                </div>
              )}
              <div className="form-group mt-3">
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter the title"
                  value={longFormData.title}
                  onChange={handleLongChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder="Write a description..."
                  value={longFormData.description}
                  onChange={handleLongChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Create Longs
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
