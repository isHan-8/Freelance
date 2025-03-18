// src/pages/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Optional: Create this file for specific styles

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
};

export default NotFound;
