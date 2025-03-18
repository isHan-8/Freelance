// src/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Ensure Button is imported
import './Dashboard.css';
import DiscoverCarousel from '../components/DiscoverCarousel';
import TestModal from '../components/TestModal';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [discoverModalOpen, setDiscoverModalOpen] = useState(false);
  const [hasTakenTest, setHasTakenTest] = useState(false);
  const [loadingTestStatus, setLoadingTestStatus] = useState(true);

  useEffect(() => {
    // Fetch current user data
    api.get('/api/accounts/current_user/')
      .then(response => {
        console.log('User data fetched:', response.data); // Debug log
        setUsername(response.data.username);
        // Check if the user has taken the test
        if (response.data.user_test) {
          setHasTakenTest(true);
        } else {
          setHasTakenTest(false);
        }
        setLoadingTestStatus(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoadingTestStatus(false);
      });
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 3) {
        // Fetch search results dynamically when the user types
        api.post('/api/core/search/', { query: searchQuery })
          .then(response => {
            setSearchResults(response.data);
          })
          .catch(error => {
            console.error('Error searching users:', error);
            setSearchResults([]);
          });
      } else {
        setSearchResults([]); // Clear results if search query is too short
      }
    }, 300); // 300ms debounce time to avoid API calls on every keystroke

    // Cleanup the timeout when searchQuery changes (debouncing effect)
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const sendFollowRequest = (userId) => {
    api.post(`/api/accounts/follow-request/send/${userId}/`)
      .then(response => {
        console.log('Follow request sent successfully:', response.data);
        const followRequestId = response.data.follow_request_id;
        // Update the searchResults state to reflect the change
        setSearchResults(prevResults => prevResults.map(user => {
          if (user.id === userId) {
            return { ...user, follow_status: 'requested', follow_request_id: followRequestId };
          }
          return user;
        }));
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.error('Error sending follow request:', error.response.data);
        } else {
          console.error('Error sending follow request:', error.message);
        }
      });
  };

  const cancelFollowRequest = (requestId, userId) => {
    if (!requestId) {
      console.error('No request ID found for canceling the follow request');
      return;
    }
    api.post(`/api/accounts/follow-request/cancel/${requestId}/`)
      .then(() => {
        console.log('Follow request canceled successfully');
        setSearchResults(prevResults => prevResults.map(user => {
          if (user.id === userId) {
            return { ...user, follow_status: 'not_requested', follow_request_id: null };
          }
          return user;
        }));
      })
      .catch(error => {
        console.error('Error cancelling follow request:', error);
      });
  };

  const unfollowUser = (userId) => {
    api.post(`/api/accounts/unfollow/${userId}/`)
      .then(() => {
        console.log('Unfollowed user successfully');
        setSearchResults(prevResults => prevResults.map(user => {
          if (user.id === userId) {
            return { ...user, follow_status: 'not_requested' };
          }
          return user;
        }));
      })
      .catch(error => {
        console.error('Error unfollowing user:', error);
      });
  };

  const openTestModal = () => {
    setDiscoverModalOpen(true);
  };

  const closeTestModal = () => {
    setDiscoverModalOpen(false);
  };

  const handleTestSubmit = () => {
    // After test submission, refresh test status and Discover Carousel
    setHasTakenTest(true);
    // Optionally, refetch Discover Carousel data if necessary
    // Fetch user data again to ensure synchronization with backend
    api.get('/api/accounts/current_user/')
      .then(response => {
        console.log('User data after test submission:', response.data); // Debug log
        if (response.data.user_test) {
          setHasTakenTest(true);
        }
      })
      .catch(error => {
        console.error('Error fetching user data after test submission:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 d-flex justify-content-between align-items-center">
          <h2>Welcome, {username}!</h2>
          <div>
            <Link to="/notifications" className="btn btn-outline-secondary me-2">
              <i className="fas fa-bell"></i> Notifications
            </Link>
            <Link to="/logout" className="btn btn-danger">Logout</Link>
          </div>
        </div>
      </div>

      <div className="custom-search-container mt-4">
  <div className="custom-col">
    <h3 className="custom-heading">Search for Users</h3>
    <input
      name="search"
      className="custom-search-input"
      type="search"
      placeholder="Search by username (min 3 characters)"
      aria-label="Search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on typing
    />
  {/* </div> */}
{/* </div> */}


          {searchResults.length > 0 ? (
            <>
              <h4 className="mt-3">Search Results:</h4>
              <ul className="list-group">
                {searchResults.map(user => (
                  <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {user.username}
                    <div>
                      <Link to={`/profile/${user.username}`} className="btn btn-sm btn-outline-info me-2">View Profile</Link>
                      {user.follow_status === 'following' ? (
                        <button
                          className="btn btn-sm btn-outline-danger me-2"
                          onClick={() => unfollowUser(user.id)}
                        >
                          Unfollow
                        </button>
                      ) : user.follow_status === 'requested' ? (
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => cancelFollowRequest(user.follow_request_id, user.id)}
                        >
                          Cancel Request
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => sendFollowRequest(user.id)}
                        >
                          Send Follow Request
                        </button>
                      )}
                      <Link to={`/rate_user/${user.username}`} className="btn btn-sm btn-outline-warning">
                        Rate
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            searchQuery && searchQuery.length >= 3 && <p className="mt-3 text-danger">No users found.</p>
          )}
        </div>
      </div>

      {/* Discover People Section */}
      <div className="row mt-5">
        <div className="col-md-12">
          <h3>Discover People</h3>
          <DiscoverCarousel />
          {!hasTakenTest && !loadingTestStatus && (
            <p className="mt-3 text-center">
              <Button variant="link" onClick={openTestModal}>
                Take the test to find people of your vibe.
              </Button>
            </p>
          )}
        </div>
      </div>

      {/* Test Modal */}
      <TestModal
        isOpen={discoverModalOpen}
        onRequestClose={closeTestModal}
        onTestSubmit={handleTestSubmit}
      />
    </div>
  );
};

export default Dashboard;
