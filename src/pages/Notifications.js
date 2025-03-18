// src/pages/Notifications.js

import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import './Notifications.css';
import { useAuth } from '../context/AuthContext';

const Notifications = () => {
  const { user, loading: authLoading } = useAuth();
  const [sentRequests, setSentRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && user) {
      api.get('/api/core/notifications/')
        .then(response => {
          const { incoming_requests, sent_requests } = response.data;
          setIncomingRequests(incoming_requests);
          setSentRequests(sent_requests);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching notifications:', error);
          setError('Failed to load notifications.');
          setLoading(false);
        });
    }
  }, [authLoading, user]);

  const cancelFollowRequest = (requestId) => {
    api.post(`/api/accounts/follow-request/cancel/${requestId}/`)
      .then(() => {
        setSentRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
      })
      .catch(error => {
        console.error('Error cancelling follow request:', error);
      });
  };

  const acceptFollowRequest = (requestId) => {
    api.post(`/api/accounts/follow-request/accept/${requestId}/`)
      .then(() => {
        setIncomingRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
      })
      .catch(error => {
        console.error('Error accepting follow request:', error);
      });
  };

  const deleteFollowRequest = (requestId) => {
    api.post(`/api/accounts/follow-request/delete/${requestId}/`)
      .then(() => {
        setIncomingRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
      })
      .catch(error => {
        console.error('Error deleting follow request:', error);
      });
  };

  if (authLoading || loading) {
    return (
      <div className="container mt-5">
        <h2>Notifications</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <h2>Notifications</h2>
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Notifications</h2>

      <div className="row mt-4">
        <div className="col-md-6">
          <h3>Follow Requests Sent</h3>
          {sentRequests.length > 0 ? (
            <ul className="list-group">
              {sentRequests.map(request => (
                <li key={request.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <Link to={`/profile/${request.receiver_username}`}>{request.receiver_username}</Link>
                  <button
                    onClick={() => cancelFollowRequest(request.id)}
                    className="btn btn-sm btn-outline-warning"
                  >
                    Cancel Request
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No follow requests sent.</p>
          )}
        </div>

        <div className="col-md-6">
          <h3>Incoming Follow Requests</h3>
          {incomingRequests.length > 0 ? (
            <ul className="list-group">
              {incomingRequests.map(request => (
                <li key={request.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <Link to={`/profile/${request.sender_username}`}>{request.sender_username}</Link>
                  <div>
                    <button
                      onClick={() => acceptFollowRequest(request.id)}
                      className="btn btn-sm btn-outline-success me-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => deleteFollowRequest(request.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No incoming follow requests.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
