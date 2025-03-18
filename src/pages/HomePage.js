import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container text-center hero-content">
          <h1>Welcome to Charectra</h1>
          <p className="lead">Connect with your friends and explore new connections.</p>
          <Link to="/register" className="btn btn-lg btn-primary">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
