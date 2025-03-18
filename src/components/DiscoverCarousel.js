// src/components/DiscoverCarousel.js

import React, { useEffect, useState } from 'react';
import { Carousel, Card, Button } from 'react-bootstrap';
import api from '../utils/api';
import './DiscoverCarousel.css'; // Optional: For additional styling

const DiscoverCarousel = () => {
  const [discoverUsers, setDiscoverUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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


  const fetchDiscoverUsers = async () => {
    try {
      const response = await api.get('/api/core/discover_people/');
      setDiscoverUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching discoverable users:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscoverUsers();
  }, []);

  if (loading) {
    return <p>Loading Discoverable Users...</p>;
  }

  if (error) {
    return <p>Error loading Discoverable Users.</p>;
  }

  if (discoverUsers.length === 0) {
    return <p>No Discoverable Users at the moment.</p>;
  }

  return (
    <Carousel>
      {discoverUsers.map((user) => (
        <Carousel.Item key={user.id}>
          <Card className="text-center">
            <Card.Img variant="top" src={createImageUrl(backendBaseURL, user.profile_picture_url)} alt={`${user.username}'s profile`} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', margin: '20px auto 0' }} />
            <Card.Body>
              <Card.Title>{user.username}</Card.Title>
              <Card.Text>Vibe Score: {user.relative_score}</Card.Text>
              <Button variant="primary" href={`/profile/${user.username}`}>
                View Profile
              </Button>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default DiscoverCarousel;
