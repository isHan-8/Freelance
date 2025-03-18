// src/pages/Events.jsx

import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const userIsAuthenticated = !!localStorage.getItem('access_token');

  // Fetch events from the API when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/api/events/');
        setEvents(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchTickets = async () => {
      try {
        const response = await api.get('/api/tickets/my_tickets/');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchEvents();
    if (userIsAuthenticated) {
      fetchTickets();
    }
    setLoading(false);
  }, [userIsAuthenticated]);

  // Display a loading message while fetching events
  if (loading) {
    return <div className="container mt-5"><h3>Loading events...</h3></div>;
  }

  return (
    <div className="container mt-5">
      <h2>Upcoming Events</h2>

      {/* Create Event Button */}
      {userIsAuthenticated && (
        <div className="mb-4">
          <Link to="/events/create" className="btn btn-success">Create Event</Link>
        </div>
      )}

      {/* Booked Tickets Section */}
      {userIsAuthenticated && tickets.length > 0 && (
        <div className="booked-tickets-section mb-5">
          <h3>Your Booked Tickets</h3>
          <div className="row">
            {tickets.map(ticket => (
              <div key={ticket.id} className="col-md-4 mb-4">
                <div className="card ticket-card">
                  <div className="card-body">
                    <h5 className="card-title">{ticket.event.title}</h5>
                    <p className="card-text">
                      <strong>Date:</strong> {new Date(ticket.event.start_time).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                      <strong>Class:</strong> {ticket.price_range.name}
                    </p>
                    <Link to={`/tickets/${ticket.id}`} className="btn btn-primary">
                      View Ticket
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display a message if no events are available */}
      {events.length === 0 ? (
        <p>No upcoming events available.</p>
      ) : (
        <div className="row">
          {/* Map through the events and display them */}
          {events.map(event => (
            <div key={event.id} className="col-md-4 mb-4">
              <div className="card event-card">
                {/* Display event image if available */}
                {event.images && event.images.length > 0 && (
                  <img
                    src={event.images[0].image}
                    className="card-img-top"
                    alt={event.title}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text"><strong>Date:</strong> {new Date(event.start_time).toLocaleDateString()}</p>
                  <p className="card-text"><strong>Location:</strong> {event.location}</p>
                  <p className="card-text">{event.description}</p>
                  <Link to={`/events/${event.id}`} className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
