// src/pages/RateUser.js

import React, { useState } from 'react';
import Layout from '../components/PrivateLayout';
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import './RateUser.css';

const RateUser = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [relationship, setRelationship] = useState(null);
  const [relationshipType, setRelationshipType] = useState('');
  const [rating, setRating] = useState(0);
  const [textContent, setTextContent] = useState('');

  // Fetch relationship status on mount
  React.useEffect(() => {
    api.get(`/api/core/relationship/${username}/`)
      .then(response => {
        const relationshipData = response.data.relationship;
        if (relationshipData) {
          setRelationship(relationshipData);
          setRelationshipType(relationshipData.relationship_type);
        }
      })
      .catch(error => {
        console.error('Error fetching relationship:', error);
      });
  }, [username]);

  const handleRelationshipSubmit = (e) => {
    e.preventDefault();
    api.post(`/api/core/relationship/${username}/`, { relationship_type: relationshipType })
      .then(response => {
        setRelationship(response.data.relationship);
      })
      .catch(error => {
        console.error('Error setting relationship:', error);
      });
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    api.post(`/api/core/rate_user/${username}/`, { rating, text_content: textContent })
      .then(() => {
        navigate(`/profile/${username}`);
      })
      .catch(error => {
        console.error('Error submitting rating:', error);
      });
  };

  return (
      <div className="container mt-5">
        <h2>Rate {username}</h2>
        {!relationship ? (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content bg-dark text-white">
                <div className="modal-header">
                  <h5 className="modal-title">Specify Relationship</h5>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleRelationshipSubmit}>
                    <div className="mb-3">
                      <label htmlFor="relationshipType" className="form-label">
                        How are you related to this person?
                      </label>
                      <select
                        className="form-select"
                        id="relationshipType"
                        value={relationshipType}
                        onChange={(e) => setRelationshipType(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select relationship</option>
                        <option value="Acquaintanceship">Acquaintanceship</option>
                        <option value="Friendship">Friendship</option>
                        <option value="Close Friendship">Close Friendship</option>
                        <option value="Family Relationship">Family Relationship</option>
                        <option value="Spousal Relationship">Spousal Relationship</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Save Relationship</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRatingSubmit}>
            <div className="mb-3">
              <label className="form-label">Rating (1-5 Stars)</label>
              <div className="star-rating">
                {[5, 4, 3, 2, 1].map(value => (
                  <React.Fragment key={value}>
                    <input
                      type="radio"
                      id={`star${value}`}
                      name="rating"
                      value={value}
                      checked={rating === value}
                      onChange={() => setRating(value)}
                      required
                    />
                    <label htmlFor={`star${value}`}>&#9733;</label>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="text_content" className="form-label">Feedback</label>
              <textarea
                className="form-control"
                id="text_content"
                name="text_content"
                rows="4"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Rating</button>
          </form>
        )}
        <a href={`/profile/${username}`} className="btn btn-secondary mt-3">Back to Profile</a>
      </div>
  );
};

export default RateUser;
