// src/pages/DatingHome.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import api from '../utils/api';
import CreateDatingProfileForm from './CreateDatingProfileForm';

const DatingHome = () => {
  const [profiles, setProfiles] = useState([]);
  const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfiles = () => {
    setLoading(true);
    api.get('/api/dating/profiles/potential_matches/')
      .then(matchesResponse => {
        if (Array.isArray(matchesResponse.data)) {
          setProfiles(matchesResponse.data);
        } else {
          console.error('Unexpected response structure:', matchesResponse.data);
          setError('Unexpected response from server.');
          setProfiles([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching potential matches:', error);
        setError('Error fetching potential matches. Please try again later.');
        setLoading(false);
      });
  };

  useEffect(() => {
    api.get('/api/dating/profiles/')
      .then(response => {
        if (Array.isArray(response.data) && response.data.length === 0) {
          // User does not have a dating profile
          setShowCreateProfileModal(true);
          setLoading(false);
        } else {
          // User has a dating profile, fetch potential matches
          refreshProfiles();
        }
      })
      .catch(error => {
        console.error('Error fetching dating profiles:', error);
        setError('Error fetching profiles. Please try again later.');
        setLoading(false);
      });
  }, []);

  const showProfile = (index) => {
    if (profiles[index]) {
      return (
        <div className="card dating-card" data-user-id={profiles[index].user_id}>
          {profiles[index].images && profiles[index].images.length > 0 ? (
            <img src={profiles[index].images[0].image_url} className="card-img-top" alt="Profile" />
          ) : (
            <img src="/default_profile_image.jpg" className="card-img-top" alt="Default Profile" />
          )}
          <div className="card-body">
            <h5 className="card-title">
              {profiles[index].user.full_name || profiles[index].user.username}, {profiles[index].age}
            </h5>
            {profiles[index].bio && <p className="card-text">{profiles[index].bio}</p>}
            {/* Additional profile details */}
            <a href={`/dating/profile/${profiles[index].user_id}`} className="btn btn-link">View Full Profile</a>
          </div>
        </div>
      );
    } else {
      return <p>No more profiles.</p>;
    }
  };

  const likeProfile = (isSuperLike = false) => {
    if (profiles[currentIndex]) {
      const userId = profiles[currentIndex].user_id;
      api.post(`/api/dating/like/${userId}/`, { is_super_like: isSuperLike })
        .then(() => {
          nextProfile();
        })
        .catch(error => {
          console.error('Error liking profile:', error);
          setError('Error liking profile. Please try again.');
        });
    }
  };

  const dislikeProfile = () => {
    if (profiles[currentIndex]) {
      const userId = profiles[currentIndex].user_id;
      api.post(`/api/dating/dislike/${userId}/`)
        .then(() => {
          nextProfile();
        })
        .catch(error => {
          console.error('Error disliking profile:', error);
          setError('Error disliking profile. Please try again.');
        });
    }
  };

  const nextProfile = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const rewindProfile = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  return (
    <div className="container mt-5">
      <h2>Discover People</h2>

      {loading ? (
        <p>Loading profiles...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          {profiles.length > 0 ? (
            <>
              <div id="datingCards">
                {showProfile(currentIndex)}
              </div>
              {/* Swipe Buttons */}
              <div className="swipe-buttons mt-3">
                <button onClick={rewindProfile} className="btn btn-secondary me-2"><i className="fa-solid fa-undo"></i></button>
                <button onClick={dislikeProfile} className="btn btn-danger me-2"><i className="fa-solid fa-times"></i></button>
                <button onClick={() => likeProfile(true)} className="btn btn-primary me-2"><i className="fa-solid fa-star"></i></button>
                <button onClick={() => likeProfile()} className="btn btn-success"><i className="fa-solid fa-heart"></i></button>
              </div>
            </>
          ) : (
            <p>No profiles available.</p>
          )}
        </>
      )}

      {/* Show modal if needed */}
      {showCreateProfileModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateDatingProfileForm
              onClose={() => setShowCreateProfileModal(false)}
              onSuccess={() => {
                setShowCreateProfileModal(false);
                // Optionally, refresh the page or fetch profiles again
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DatingHome;
