// src/pages/ViewDatingProfile.js

import React, { useState, useEffect } from 'react';
import Layout from '../components/PrivateLayout';
import api from '../utils/api';
import { useParams } from 'react-router-dom';
import './ViewDatingProfile.css';

const ViewDatingProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get(`/api/dating/profile/${userId}/`)
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching dating profile:', error);
      });
  }, [userId]);

  if (!profile) {
    return <Layout><div>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mt-5">
        <h2>{profile.user.full_name || profile.user.username}</h2>
        {/* Carousel for images */}
        <div id="profileCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {profile.images.map((image, index) => (
              <div key={image.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={image.image_url} className="d-block w-100" alt={`Slide ${index}`} />
              </div>
            ))}
          </div>
          {profile.images.length > 1 && (
            <>
              <button className="carousel-control-prev" type="button" data-bs-target="#profileCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#profileCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
              </button>
            </>
          )}
        </div>

        {/* About Me */}
        <h3>About Me</h3>
        {profile.answers.map(answer => (
          <p key={answer.id}><strong>{answer.question_text}</strong>: {answer.answer_text}</p>
        ))}

        {/* Audio Prompts */}
        {profile.audio_prompts.length > 0 && (
          <>
            <h3>Audio Prompts</h3>
            {profile.audio_prompts.map(audio => (
              <div key={audio.id}>
                <p><strong>{audio.prompt_text}</strong></p>
                <audio controls>
                  <source src={audio.audio_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ViewDatingProfile;
