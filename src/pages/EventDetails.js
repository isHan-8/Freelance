// src/pages/EventDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Carousel, Button, Modal, Alert } from 'react-bootstrap';
import './EventDetails.css';
import { formatInTimeZone } from 'date-fns-tz'; // Import formatInTimeZone

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); // For React Router v6

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/${id}/`);
        setEvent(response.data);
        setIsFollowing(response.data.is_following);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await api.get('/api/accounts/current_user/');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchEvent();
    fetchCurrentUser();
  }, [id]);

  // Check if the current user is the organizer
  const isOrganizer = currentUser && event && currentUser.id === event.organizer.id;

  const handleFollowHost = async () => {
    try {
      if (isFollowing) {
        await api.post(`/api/events/${id}/unfollow_host/`);
        setIsFollowing(false);
      } else {
        await api.post(`/api/events/${id}/follow_host/`);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error following/unfollowing host:', error);
    }
  };

  const handleBook = () => {
    setShowBookingModal(true);
  };

// src/pages/EventDetails.jsx

const handleBookingConfirm = async () => {
    if (!selectedPriceRange) {
      setBookingError('Please select a ticket class.');
      return;
    }
  
    try {
      const response = await api.post('/api/tickets/', {
        event_id: event.id,
        price_range_id: selectedPriceRange.id,
      });
      setBookingSuccess('Ticket booked successfully!');
      setShowBookingModal(false);
    } catch (error) {
      console.error('Error booking ticket:', error.response.data);
      setBookingError(error.response.data.non_field_errors || 'Error booking ticket.');
    }
  };
  
  const navigateToManagementPage = () => {
    navigate(`/events/${id}/manage`); // Adjust the path as needed
  };

  const handleDeleteEvent = async () => {
    try {
      await api.delete(`/api/events/${id}/`);
      // Redirect to a page after deletion
      navigate('/my-events');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (!event || !currentUser) {
    return <div className="container mt-5">Loading event details...</div>;
  }

  const userRating = event.minimum_user_score;

  // Format event start and end times
  const timeZone = 'Asia/Kolkata'; // Replace with your desired time zone

  const formattedStartTime = formatInTimeZone(event.start_time, timeZone, 'dd MMM yyyy, hh:mm a');
  const formattedEndTime = formatInTimeZone(event.end_time, timeZone, 'dd MMM yyyy, hh:mm a');

  return (
    <div className="container mt-5 event-details-page">
      {/* Image Carousel */}
      <Carousel>
        {event.images.map((image) => (
          <Carousel.Item key={image.id}>
            <img
              className="d-block w-100 event-image"
              src={image.image}
              alt={event.title}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Event Description */}
      <div className="event-description mt-4">
        <h2>{event.title}</h2>
        <p><strong>Start Date:</strong> {formattedStartTime}</p>
        <p><strong>End Date:</strong> {formattedEndTime}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p>{event.description}</p>
      </div>

      {/* Host Details */}
      <div className="host-details mt-4">
        <h4>Organized by:</h4>
        <div className="host-info">
          {isOrganizer ? (
            <span>Myself</span>
          ) : (
            <Link to={`/profile/${event.organizer.username}`}>
              {event.organizer.username}
            </Link>
          )}
          {event.organizer_rating && (
            <p>Rating: {event.organizer_rating}/5</p>
          )}
          {!isOrganizer && (
            <Button variant="primary" onClick={handleFollowHost}>
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          )}
          {isOrganizer && (
            <>
              <Button variant="secondary" onClick={navigateToManagementPage}>
                Manage Event
              </Button>
              <Button variant="danger" onClick={handleDeleteEvent}>
                Delete Event
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Minimum Rating Requirement */}
      {userRating && (
        <Alert variant="info" className="mt-4">
          Minimum user rating required to book this event: {userRating}/5
        </Alert>
      )}

      {/* Booking Button */}
      {!isOrganizer && (
        <Button variant="success" className="mt-3" onClick={handleBook}>
          Book Now
        </Button>
      )}

      {/* Booking Success Message */}
      {bookingSuccess && (
        <Alert variant="success" className="mt-3">
          {bookingSuccess}
        </Alert>
      )}

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Ticket Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bookingError && (
            <Alert variant="danger">
              {bookingError}
            </Alert>
          )}
          {event.price_ranges.length > 0 ? (
            <div className="price-ranges">
              {event.price_ranges.map((priceRange) => (
                <div key={priceRange.id} className="price-range-option">
                  <input
                    type="radio"
                    id={`priceRange-${priceRange.id}`}
                    name="priceRange"
                    value={priceRange.id}
                    onChange={() => setSelectedPriceRange(priceRange)}
                  />
                  <label htmlFor={`priceRange-${priceRange.id}`}>
                    {priceRange.name} - ${priceRange.price} ({priceRange.availability} tickets left)
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <p>No ticket classes available for this event.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBookingConfirm}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventDetails;
