// src/pages/EventManage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Form, Button, Alert } from 'react-bootstrap';
import './EventManage.css'; // You can create this CSS file as needed

const EventManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch the event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/${id}/`);
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Error fetching event details.');
      }
    };

    fetchEvent();
  }, [id]);

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/events/${id}/`);
      navigate('/my-events'); // Redirect to your events listing page
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Error deleting event.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/events/${id}/`, eventData);
      setSuccess('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      setError('Error updating event.');
    }
  };

  if (!eventData) {
    return <div className="container mt-5">Loading event details...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Manage Event</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLocation" className="mt-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStartTime" className="mt-3">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="start_time"
            value={eventData.start_time}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEndTime" className="mt-3">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="end_time"
            value={eventData.end_time}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Add other fields like category, price ranges, images, etc., as needed */}

        <Button variant="primary" type="submit" className="mt-4">
          Save Changes
        </Button>
      </Form>

      <Button variant="danger" className="mt-4" onClick={handleDelete}>
        Delete Event
      </Button>
    </div>
  );
};

export default EventManage;
