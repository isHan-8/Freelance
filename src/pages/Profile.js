// src/pages/Profile.js

import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Added Link
import './Profile.css';
import PostCard from '../components/PostCard';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [section, setSection] = useState('posts');
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalUsers, setModalUsers] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [traits, setTraits] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const backendBaseURL = process.env.REACT_APP_API_BASE_URL;

  const createImageUrl = (baseUrl, imagePath) => {
    // Remove "api/" from the base URL if present
    let modifiedBaseUrl = baseUrl.replace(/\/api\/?$/, '');
    // Ensure that there is exactly one slash between the base URL and the image path
    if (modifiedBaseUrl.endsWith('/') && imagePath.startsWith('/')) {
      return `${modifiedBaseUrl}${imagePath.substring(1)}`;
    } else if (!modifiedBaseUrl.endsWith('/') && !imagePath.startsWith('/')) {
      return `${modifiedBaseUrl}/${imagePath}`;
    } else {
      return `${modifiedBaseUrl}${imagePath}`;
    }
  };

  useEffect(() => {
    // Fetch current user data
    api.get('/api/accounts/current_user/')
      .then(response => {
        setCurrentUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching current user:', error);
      });
  }, []);

  const handleFollowersClick = () => {
    setModalType('followers');
    setShowModal(true);
    fetchModalUsers('followers');
  };

  const handleFollowingClick = () => {
    setModalType('following');
    setShowModal(true);
    fetchModalUsers('following');
  };

  const fetchModalUsers = async (type) => {
    try {
      const endpoint = `/api/accounts/profile/${username}/${type}/`;
      const response = await api.get(endpoint);
      setModalUsers(response.data);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      setModalUsers([]);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalUsers([]);
  };

  const removeFollower = (userId) => {
    api.post(`/api/accounts/remove_follower/${userId}/`)
      .then(() => {
        setModalUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        setFollowersCount(prevCount => prevCount - 1);
      })
      .catch(error => {
        console.error('Error removing follower:', error);
      });
  };

  const toggleFollow = (userId) => {
    const user = modalUsers.find(u => u.id === userId);
    if (user.is_following === 'following') {
      api.post(`/api/accounts/unfollow/${userId}/`)
        .then(() => {
          setModalUsers(prevUsers => prevUsers.map(u => {
            if (u.id === userId) {
              return { ...u, is_following: 'not_following' };
            }
            return u;
          }));
        })
        .catch(error => {
          console.error('Error unfollowing user:', error);
        });
    } else if (user.is_following === 'not_following' || user.is_following === 'request_sent') {
      api.post(`/api/accounts/follow-request/send/${userId}/`)
        .then(() => {
          setModalUsers(prevUsers => prevUsers.map(u => {
            if (u.id === userId) {
              return { ...u, is_following: 'request_sent' };
            }
            return u;
          }));
        })
        .catch(error => {
          console.error('Error sending follow request:', error);
        });
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/api/accounts/profile/${username}/`);
        setUserProfile(response.data.user_profile);
        setFollowersCount(response.data.follower_count);
        setFollowingCount(response.data.following_count);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setUserProfile(null);
      }
    };

    fetchUserProfile();

    // Fetch ratings
    const fetchUserRatings = async () => {
      try {
        const response = await api.get(`/api/core/ratings/${username}/`);
        setRatings(response.data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setRatings([]);
      }
    };

    fetchUserRatings();

    // Fetch traits
    const fetchUserTraits = async () => {
      try {
        const response = await api.get(`/api/core/traits/${username}/`);
        setTraits(response.data);
      } catch (error) {
        console.error('Error fetching traits:', error);
        setTraits([]);
      }
    };

    fetchUserTraits();
  }, [username]);

  if (!userProfile) {
    return (
      <div className="container mt-5">
        <h2>Profile not found</h2>
      </div>
    );
  }

  const {
    username: userName,
    profile_picture_url,
    full_name,
    bio,
    website,
    average_score,
    posts,
  } = userProfile;

  return (
    <div className="container mt-5">
      <div className="profile-header d-flex align-items-center">
        <img
          src={profile_picture_url}
          alt={`${userName}'s profile`}
          className="profile-image me-4"
        />

        <div className="profile-info flex-grow-1">
          <h2>{userName}</h2>

          {/* Conditional Rendering for Buttons */}
          <div className="mt-2">
            {currentUser && currentUser.username === userName ? (
              // Logged-in user's own profile
              <Link to="/edit_profile" className="btn btn-primary me-2">
                Edit Profile
              </Link>
            ) : (
              // Another user's profile
              <Link to={`/rate_user/${userName}`} className="btn btn-warning me-2">
                Rate
              </Link>
            )}
          </div>

          {/* Existing profile stats and bio */}
          <div className="profile-stats mt-2 d-flex align-items-center">
            <div className="me-4 text-center">
              <h4 className="stat-number">{posts ? posts.length : 0}</h4>
              <p className="stat-label">Posts</p>
            </div>
            <div className="me-4 text-center">
              <button
                type="button"
                className="btn btn-link text-decoration-none p-0 followers-button"
                onClick={handleFollowersClick}
              >
                <h4 className="stat-number">{followersCount}</h4>
                <p className="stat-label">Followers</p>
              </button>
            </div>
            <div className="me-4 text-center">
              <button
                type="button"
                className="btn btn-link text-decoration-none p-0 following-button"
                onClick={handleFollowingClick}
              >
                <h4 className="stat-number">{followingCount}</h4>
                <p className="stat-label">Following</p>
              </button>
            </div>
            {average_score !== undefined && (
              <div className="text-center">
                <div className="average-rating d-flex align-items-center justify-content-center">
                  <span className="rating-number">{average_score.toFixed(1)}</span>
                  <i className="fas fa-star text-warning ms-2"></i>
                </div>
                <p className="stat-label">Average Rating</p>
              </div>
            )}
          </div>

          <div className="profile-bio mt-3">
            <strong>{full_name}</strong>
            <p>{bio}</p>
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-website"
              >
                {website}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="section-buttons d-flex justify-content-center my-4">
        <button
          className={`btn btn-dark me-2 ${section === 'posts' ? 'active' : ''}`}
          onClick={() => setSection('posts')}
        >
          Posts
        </button>
        <button
          className={`btn btn-dark me-2 ${section === 'reviews' ? 'active' : ''}`}
          onClick={() => setSection('reviews')}
        >
          Reviews
        </button>
        <button
          className={`btn btn-dark ${section === 'traits' ? 'active' : ''}`}
          onClick={() => setSection('traits')}
        >
          Traits
        </button>
      </div>

      {section === 'posts' && (
        <div className="post-grid row">
          {userProfile.posts && userProfile.posts.length > 0 ? (
            userProfile.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      )}

      {section === 'reviews' && (
        <div className="rating-section">
          <h3>Ratings</h3>
          {ratings.length > 0 ? (
            <ul className="list-group">
              {ratings.map((rating) => (
                <li key={rating.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{rating.rater_username}</strong>
                      <p>{rating.comment}</p>
                      {rating.traits && rating.traits.length > 0 && (
                        <p>
                          <strong>Traits:</strong>{' '}
                          {rating.traits.map(trait => trait.name).join(', ')}
                        </p>
                      )}
                      <small className="text-muted">
                        Rated on {new Date(rating.created_at).toLocaleDateString()}
                      </small>
                    </div>
                    <div>
                      <span>{'⭐'.repeat(Math.round(rating.given_score))}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No ratings available.</p>
          )}
        </div>
      )}

      {section === 'traits' && (
        <div className="trait-section">
          <h3>Traits</h3>
          {traits.length > 0 ? (
            <div className="row">
              {traits.map((trait) => (
                <div key={trait.id} className="col-md-3 col-sm-6 mb-4">
                  <div className="trait-item text-center">
                    <div className="trait-circle" style={{ borderColor: '#007bff' }}>
                      <span className="trait-rating">{trait.average_rating.toFixed(1)}</span>
                    </div>
                    <p className="mt-2">{trait.name}</p>
                    <p className="text-muted">{trait.num_ratings} ratings</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No traits available.</p>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{modalType === 'followers' ? 'Followers' : 'Following'}</h3>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <div className="user-list">
              {modalUsers.length > 0 ? (
                <ul className="list-group">
                  {modalUsers.map((user) => (
                    <li
                      key={user.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div
                        className="d-flex align-items-center user-item"
                        onClick={() => {
                          navigate(`/profile/${user.username}`);
                          closeModal();
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <img
                          src={createImageUrl(backendBaseURL, user.profile_picture_url)}
                          alt={user.username}
                          className="user-avatar me-2"
                        />
                        <span className="user-link">{user.username}</span>
                      </div>
                      {user.username !== currentUser?.username && (
                        <>
                          {modalType === 'followers' && currentUser.username === username && (
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeFollower(user.id)}
                            >
                              Remove
                            </button>
                          )}
                          {modalType === 'following' && (
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFollow(user.id);
                              }}
                            >
                              {user.is_following === 'following'
                                ? 'Following'
                                : user.is_following === 'request_sent'
                                ? 'Request Sent'
                                : 'Follow'}
                            </button>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No users found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
