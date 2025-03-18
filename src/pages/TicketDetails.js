// src/pages/TicketDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import './TicketDetails.css';

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await api.get(`/api/tickets/${id}/`);
        setTicket(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ticket:', error);
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) {
    return <div className="container mt-5"><h3>Loading ticket details...</h3></div>;
  }

  if (!ticket) {
    return <div className="container mt-5"><h3>Ticket not found or you do not have permission to view it.</h3></div>;
  }

  return (
    <div className="container mt-5">
      <h2>Ticket Details</h2>
      <div className="ticket-details">
        <h3>{ticket.event.title}</h3>
        <p><strong>Date:</strong> {new Date(ticket.event.start_time).toLocaleString()}</p>
        <p><strong>Location:</strong> {ticket.event.location}</p>
        <p><strong>Class:</strong> {ticket.price_range.name}</p>
        <p><strong>Price:</strong> ${ticket.price_range.price}</p>
        <p><strong>Booked On:</strong> {new Date(ticket.booking_date).toLocaleString()}</p>
        <div className="qr-code">
          <h4>QR Code:</h4>
          <img src={ticket.qr_code} alt="Ticket QR Code" />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
