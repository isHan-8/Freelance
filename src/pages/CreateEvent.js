// src/pages/CreateEvent.jsx

import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import './CreateEvent.css';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    start_time: '',
    end_time: '',
    minimum_user_score: '',
    category: '',
    is_featured: false,
  });
  const [images, setImages] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [newPriceRange, setNewPriceRange] = useState({ name: '', price: '', availability: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleAddPriceRange = () => {
    if (newPriceRange.name && newPriceRange.price && newPriceRange.availability) {
      setPriceRanges([...priceRanges, newPriceRange]);
      setNewPriceRange({ name: '', price: '', availability: '' });
    } else {
      setError('Please fill all fields for the ticket class.');
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError('');

    // Prepare form data
    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('description', eventData.description);
    formData.append('location', eventData.location);
    formData.append('start_time', eventData.start_time);
    formData.append('end_time', eventData.end_time);
    if (eventData.minimum_user_score) {
      formData.append('minimum_user_score', eventData.minimum_user_score);
    }
    formData.append('category', eventData.category);
    formData.append('is_featured', eventData.is_featured);

    // Append images
    images.forEach((image) => {
      formData.append('images', image);
    });

    // Append price ranges as JSON string
    formData.append('price_ranges', JSON.stringify(priceRanges));

    try {
        const response = await api.post('/api/events/', formData);
        navigate(`/events/${response.data.id}`);
      } catch (err) {
        console.error('Error creating event:', err.response.data);
        // Display specific error messages
        if (err.response && err.response.data) {
          const errorData = err.response.data;
          let errorMessage = 'Error creating event. Please check your input.';
          if (errorData.title) {
            errorMessage = `Title: ${errorData.title.join(' ')}`;
          } else if (errorData.images) {
            errorMessage = `Images: ${errorData.images.non_field_errors.join(' ')}`;
          } else if (errorData.price_ranges) {
            errorMessage = `Price Ranges: ${errorData.price_ranges.non_field_errors.join(' ')}`;
          }
          setError(errorMessage);
        } else {
          setError('Error creating event. Please check your input.');
        }
      }
    };

  return (
    <div className="container mt-5">
      <h2>Create Event</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleCreateEvent}>
        <Form.Group controlId="title">
          <Form.Label>Event Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Event Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            value={eventData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="start_time">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="start_time"
            value={eventData.start_time}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="end_time">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="end_time"
            value={eventData.end_time}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="minimum_user_score">
          <Form.Label>Minimum User Rating (Optional)</Form.Label>
          <Form.Control
            type="number"
            name="minimum_user_score"
            value={eventData.minimum_user_score}
            onChange={handleInputChange}
            min="0"
            max="5"
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={eventData.category}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="is_featured">
          <Form.Check
            type="checkbox"
            label="Feature this event"
            name="is_featured"
            checked={eventData.is_featured}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="images">
          <Form.Label>Event Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
          />
        </Form.Group>

        <hr />

        <h4>Ticket Classes</h4>
        {priceRanges.length > 0 && (
          <ul>
            {priceRanges.map((priceRange, index) => (
              <li key={index}>
                {priceRange.name} - ${priceRange.price} ({priceRange.availability} tickets)
              </li>
            ))}
          </ul>
        )}

        <Form.Group controlId="price_range_name">
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={newPriceRange.name}
            onChange={(e) => setNewPriceRange({ ...newPriceRange, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="price_range_price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={newPriceRange.price}
            onChange={(e) => setNewPriceRange({ ...newPriceRange, price: e.target.value })}
            min="0"
          />
        </Form.Group>

        <Form.Group controlId="price_range_availability">
          <Form.Label>Availability</Form.Label>
          <Form.Control
            type="number"
            name="availability"
            value={newPriceRange.availability}
            onChange={(e) => setNewPriceRange({ ...newPriceRange, availability: e.target.value })}
            min="1"
          />
        </Form.Group>

        <Button variant="secondary" onClick={handleAddPriceRange}>
          Add Ticket Class
        </Button>

        <hr />

        <Button variant="primary" type="submit">
          Create Event
        </Button>
      </Form>
    </div>
  );
};

export default CreateEvent;
