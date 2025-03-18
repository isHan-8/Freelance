// src/pages/ViewLongFormContent.js

import React, { useState, useEffect } from 'react';
import Layout from '../components/PrivateLayout';
import api from '../utils/api';
import { useParams } from 'react-router-dom';
import './ViewLongFormContent.css';

const ViewLongFormContent = () => {
  const { contentId } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    api.get(`/api/long_form/${contentId}/`)
      .then(response => {
        setContent(response.data);
      })
      .catch(error => {
        console.error('Error fetching long-form content:', error);
      });
  }, [contentId]);

  if (!content) {
    return <Layout><div>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mt-5">
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        {/* Video Player */}
        <div className="video-container">
          <video controls className="video-player">
            <source src={content.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </Layout>
  );
};

export default ViewLongFormContent;
